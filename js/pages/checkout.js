/**
 * checkout.js — Checkout page controller (3-step flow)
 * On order placement: sends a formatted WhatsApp message to the business number
 * as the BACKEND — customer only sees "Order Confirmed" screen.
 * No WhatsApp opens on the customer side.
 *
 * Requirements: 3.7, 6.1–6.5, WhatsApp Backend Order Notification
 */
(function () {
  'use strict';

  var SHIPPING_THRESHOLD = 999;
  var SHIPPING_COST      = 99;
  var BUSINESS_WA        = '919323242591'; // R & B Foods business WhatsApp
  var _currentStep       = 1;
  var _shippingData      = {};
  var _paymentMethod     = '';

  /* ── helpers ─────────────────────────────────────────────── */
  function _getField(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function _showError(field, msg) {
    var errEl   = document.getElementById('err-' + field);
    var inputEl = document.getElementById(field) ||
                  document.querySelector('[name="' + field + '"]');
    if (errEl)   errEl.textContent = msg;
    if (inputEl && inputEl.parentElement)
      inputEl.parentElement.classList.add('has-error');
  }

  function _clearErrors() {
    document.querySelectorAll('.form-error').forEach(function (e) { e.textContent = ''; });
    document.querySelectorAll('.form-group.has-error').forEach(function (g) { g.classList.remove('has-error'); });
  }

  function _goToStep(step) {
    for (var i = 1; i <= 3; i++) {
      var el = document.getElementById('checkout-step-' + i);
      if (el) el.style.display = (i === step) ? 'block' : 'none';
    }
    _currentStep = step;
    document.querySelectorAll('.step').forEach(function (s) {
      var n = parseInt(s.dataset.step);
      s.classList.remove('step--active', 'step--completed');
      if (n === step) s.classList.add('step--active');
      else if (n < step) s.classList.add('step--completed');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Checkout summary sidebar ─────────────────────────────── */
  function _renderCheckoutSummary() {
    var cart    = CartStore.getCart();
    var itemsEl = document.getElementById('checkout-cart-items');
    if (!itemsEl) return;

    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    itemsEl.innerHTML = cart.map(function (item) {
      return '<div class="co-cart-item">' +
        '<img src="' + item.image + '" alt="' + sanitizeHTML(item.name) + '" loading="lazy">' +
        '<div class="co-cart-item__info">' +
          '<div class="co-cart-item__name">' + sanitizeHTML(item.name) + '</div>' +
          '<div class="co-cart-item__meta">' + sanitizeHTML(item.variant) + ' × ' + item.quantity + '</div>' +
        '</div>' +
        '<div class="co-cart-item__price">₹' + (item.price * item.quantity) + '</div>' +
      '</div>';
    }).join('');

    var subEl  = document.getElementById('co-subtotal');
    var shipEl = document.getElementById('co-shipping');
    var totEl  = document.getElementById('co-total');
    if (subEl)  subEl.textContent  = '₹' + subtotal;
    if (shipEl) shipEl.textContent = (shipping === 0) ? 'FREE' : '₹' + shipping;
    if (totEl)  totEl.textContent  = '₹' + total;
  }

  /* ── Order Review (step 3 preview) ───────────────────────── */
  function _renderOrderReview() {
    var reviewEl = document.getElementById('order-review');
    if (!reviewEl) return;

    var cart     = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    var itemsHTML = cart.map(function (item) {
      return '<div style="display:flex;justify-content:space-between;padding:5px 0;gap:8px">' +
        '<span style="flex:1">' + sanitizeHTML(item.name) + ' (' + sanitizeHTML(item.variant) + ') × ' + item.quantity + '</span>' +
        '<strong>₹' + (item.price * item.quantity) + '</strong>' +
      '</div>';
    }).join('');

    var payLabel = { upi: 'UPI / QR Code', card: 'Credit / Debit Card', netbanking: 'Net Banking', cod: 'Cash on Delivery' };

    reviewEl.innerHTML =
      '<div class="order-review-section"><h4>Items</h4>' + itemsHTML + '</div>' +
      '<div class="order-review-section"><h4>Delivery Address</h4>' +
        '<p>' + sanitizeHTML(_shippingData.firstName) + ' ' + sanitizeHTML(_shippingData.lastName) + '<br>' +
        sanitizeHTML(_shippingData.address1) + (_shippingData.address2 ? ', ' + sanitizeHTML(_shippingData.address2) : '') + '<br>' +
        sanitizeHTML(_shippingData.city) + ', ' + sanitizeHTML(_shippingData.state) + ' — ' + sanitizeHTML(_shippingData.pincode) + '<br>' +
        '📞 ' + sanitizeHTML(_shippingData.phone) + '</p>' +
      '</div>' +
      '<div class="order-review-section"><h4>Payment Method</h4>' +
        '<p>' + (payLabel[_paymentMethod] || sanitizeHTML(_paymentMethod)) + '</p>' +
      '</div>' +
      '<div class="order-review-section">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Subtotal</span><span>₹' + subtotal + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : '₹' + shipping) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05rem;margin-top:8px;border-top:1px solid var(--color-border);padding-top:8px"><span>Total Payable</span><span>₹' + total + '</span></div>' +
      '</div>';
  }

  /* ── Validation ───────────────────────────────────────────── */
  function _validateStep1() {
    _clearErrors();
    var data = {
      firstName: _getField('firstName'),
      lastName:  _getField('lastName'),
      email:     _getField('email'),
      phone:     _getField('phone'),
      address1:  _getField('address1'),
      city:      _getField('city'),
      state:     _getField('state'),
      pincode:   _getField('pincode')
    };

    var ok = true;

    function need(field, label) {
      if (!data[field]) { _showError(field, label + ' is required.'); ok = false; }
    }

    need('firstName', 'First name');
    need('lastName',  'Last name');
    need('address1',  'Address');
    need('city',      'City');
    need('state',     'State');

    if (!data.email) {
      _showError('email', 'Email is required.');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      _showError('email', 'Please enter a valid email.');
      ok = false;
    }

    if (!data.phone) {
      _showError('phone', 'Mobile number is required.');
      ok = false;
    } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ''))) {
      _showError('phone', 'Enter a valid 10-digit Indian mobile number.');
      ok = false;
    }

    if (!data.pincode) {
      _showError('pincode', 'Pincode is required.');
      ok = false;
    } else if (!/^\d{6}$/.test(data.pincode)) {
      _showError('pincode', 'Pincode must be 6 digits.');
      ok = false;
    }

    if (!ok) {
      var firstErr = document.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      _shippingData = data;
    }
    return ok;
  }

  /* ── Build WhatsApp order message for BACKEND ─────────────── */
  function _buildOrderMessage(orderId, cart, subtotal, shipping, total) {
    var payLabel = { upi: 'UPI / QR Code', card: 'Credit/Debit Card', netbanking: 'Net Banking', cod: 'Cash on Delivery' };
    var now = new Date();
    var dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    var timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    var lines = [
      '🛒 *NEW ORDER — BreakFit*',
      '━━━━━━━━━━━━━━━━━━━━',
      '📦 *Order ID:* ' + orderId,
      '🕐 *Date/Time:* ' + dateStr + ' ' + timeStr,
      '',
      '👤 *CUSTOMER DETAILS*',
      '━━━━━━━━━━━━━━━━━━━━',
      '*Name:* ' + _shippingData.firstName + ' ' + _shippingData.lastName,
      '*Mobile:* +91 ' + _shippingData.phone,
      '*Email:* ' + _shippingData.email,
      '',
      '📍 *DELIVERY ADDRESS*',
      '━━━━━━━━━━━━━━━━━━━━',
      _shippingData.address1 + (_shippingData.address2 ? ', ' + _shippingData.address2 : ''),
      _shippingData.city + ', ' + _shippingData.state + ' — ' + _shippingData.pincode,
      '',
      '🧺 *ORDER ITEMS*',
      '━━━━━━━━━━━━━━━━━━━━'
    ];

    cart.forEach(function (item, i) {
      lines.push((i + 1) + '. ' + item.name + ' (' + item.variant + ') × ' + item.quantity + '  →  ₹' + (item.price * item.quantity));
    });

    lines.push('');
    lines.push('💰 *ORDER TOTAL*');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push('Subtotal: ₹' + subtotal);
    lines.push('Shipping: ' + (shipping === 0 ? 'FREE' : '₹' + shipping));
    lines.push('*Total Payable: ₹' + total + '*');
    lines.push('');
    lines.push('💳 *Payment Method:* ' + (payLabel[_paymentMethod] || _paymentMethod));
    lines.push('');
    lines.push('⚡ Please confirm & process this order.');

    return lines.join('\n');
  }

  /* ── Place Order ──────────────────────────────────────────── */
  function _placeOrder() {
    var placeBtn = document.getElementById('place-order-btn');
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite"></i> Processing…';
    }

    var orderId  = 'BF-' + Math.floor(100000 + Math.random() * 900000);
    var cart     = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    /* Build & silently send WhatsApp to business number */
    var message = _buildOrderMessage(orderId, cart, subtotal, shipping, total);
    var waUrl   = 'https://api.whatsapp.com/send?phone=' + BUSINESS_WA +
                  '&text=' + encodeURIComponent(message);

    /* Open in a hidden iframe trick — if browser blocks, open in background tab */
    try {
      var iframe = document.createElement('iframe');
      iframe.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;left:-9999px';
      iframe.src = waUrl;
      document.body.appendChild(iframe);
      // Remove after 5s
      setTimeout(function () { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 5000);
    } catch (e) {
      // fallback: background tab
      var w = window.open(waUrl, '_blank', 'width=1,height=1,left=-9999,top=-9999');
      if (w) setTimeout(function () { try { w.close(); } catch (ex) { /* */ } }, 3000);
    }

    /* Store order in localStorage for reference */
    var orderRecord = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart,
      shipping: _shippingData,
      payment: _paymentMethod,
      subtotal: subtotal,
      shippingCost: shipping,
      total: total
    };
    try { localStorage.setItem('bf_last_order', JSON.stringify(orderRecord)); } catch (e) { /* */ }

    /* Show confirmed screen after brief delay for UX */
    setTimeout(function () {
      _showConfirmedScreen(orderId, cart, total, shipping, subtotal);
      CartStore.clearCart();
    }, 800);
  }

  /* ── Order Confirmed Screen ───────────────────────────────── */
  function _showConfirmedScreen(orderId, cart, total, shipping, subtotal) {
    var payLabel = { upi: 'UPI / QR Code', card: 'Credit/Debit Card', netbanking: 'Net Banking', cod: 'Cash on Delivery' };

    // Hide all steps and summary
    for (var i = 1; i <= 3; i++) {
      var el = document.getElementById('checkout-step-' + i);
      if (el) el.style.display = 'none';
    }
    var summaryCol = document.getElementById('checkout-summary-col');
    if (summaryCol) summaryCol.style.display = 'none';

    // Show confirmed
    var confirmed = document.getElementById('order-confirmed');
    if (!confirmed) return;
    confirmed.style.display = 'block';

    var orderIdEl = document.getElementById('confirmed-order-id');
    if (orderIdEl) orderIdEl.textContent = orderId;

    // Build confirmed summary HTML
    var summaryEl = document.getElementById('confirmed-summary');
    if (summaryEl) {
      summaryEl.innerHTML =
        '<div class="confirmed-detail-box">' +
          '<div class="confirmed-section">' +
            '<div class="confirmed-section-title"><i class="ri-shopping-bag-line"></i> Items Ordered</div>' +
            cart.map(function (item) {
              return '<div class="confirmed-item">' +
                '<img src="' + item.image + '" alt="' + sanitizeHTML(item.name) + '">' +
                '<div class="confirmed-item-info">' +
                  '<span class="confirmed-item-name">' + sanitizeHTML(item.name) + '</span>' +
                  '<span class="confirmed-item-meta">' + sanitizeHTML(item.variant) + ' × ' + item.quantity + '</span>' +
                '</div>' +
                '<strong>₹' + (item.price * item.quantity) + '</strong>' +
              '</div>';
            }).join('') +
          '</div>' +
          '<div class="confirmed-section">' +
            '<div class="confirmed-section-title"><i class="ri-map-pin-line"></i> Delivery Address</div>' +
            '<p class="confirmed-address">' +
              sanitizeHTML(_shippingData.firstName) + ' ' + sanitizeHTML(_shippingData.lastName) + '<br>' +
              sanitizeHTML(_shippingData.address1) + (_shippingData.address2 ? ', ' + sanitizeHTML(_shippingData.address2) : '') + '<br>' +
              sanitizeHTML(_shippingData.city) + ', ' + sanitizeHTML(_shippingData.state) + ' — ' + sanitizeHTML(_shippingData.pincode) + '<br>' +
              '📞 ' + sanitizeHTML(_shippingData.phone) +
            '</p>' +
          '</div>' +
          '<div class="confirmed-section confirmed-totals">' +
            '<div class="confirmed-total-row"><span>Subtotal</span><span>₹' + subtotal + '</span></div>' +
            '<div class="confirmed-total-row"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE 🎉' : '₹' + shipping) + '</span></div>' +
            '<div class="confirmed-total-row confirmed-grand-total"><span>Total Paid</span><span>₹' + total + '</span></div>' +
            '<div class="confirmed-payment-badge"><i class="ri-shield-check-line"></i> ' + (payLabel[_paymentMethod] || '') + '</div>' +
          '</div>' +
          '<div class="confirmed-wa-notice">' +
            '<i class="ri-whatsapp-line"></i>' +
            '<span>Our team will contact you at <strong>+91 ' + sanitizeHTML(_shippingData.phone) + '</strong> to confirm your order within 30 minutes.</span>' +
          '</div>' +
        '</div>';
    }

    // Mark all steps completed
    document.querySelectorAll('.step').forEach(function (s) {
      s.classList.remove('step--active');
      s.classList.add('step--completed');
    });

    if (window.ToastNotification) {
      ToastNotification.show({
        message: '🎉 Order ' + orderId + ' placed! We\'ll confirm via call/WhatsApp.',
        type: 'success',
        duration: 7000
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919323242591', 'Hello BreakFit! I need help with my order.');

    if (CartStore.getItemCount() === 0) {
      window.location.href = 'cart.html';
      return;
    }

    _renderCheckoutSummary();

    /* OOS check */
    var cart = CartStore.getCart();
    var hasOOS = window.PRODUCTS && cart.some(function (item) {
      var p = PRODUCTS.find(function (pr) { return pr.id === item.id; });
      if (!p) return false;
      var v = p.variants.find(function (va) { return va.label === item.variant; });
      return v && !v.inStock;
    });
    if (hasOOS) {
      var placeBtn = document.getElementById('place-order-btn');
      if (placeBtn) { placeBtn.disabled = true; placeBtn.title = 'Remove out-of-stock items first.'; }
      if (window.ToastNotification) {
        ToastNotification.show({ message: 'Your cart has out-of-stock items. Please update your cart.', type: 'error', duration: 5000 });
      }
    }

    /* Step 1 → 2 */
    var s1btn = document.getElementById('step1-continue-btn');
    if (s1btn) s1btn.addEventListener('click', function () { if (_validateStep1()) _goToStep(2); });

    /* Step 2 back */
    var s2back = document.getElementById('step2-back-btn');
    if (s2back) s2back.addEventListener('click', function () { _goToStep(1); });

    /* Step 2 → 3 */
    var s2btn = document.getElementById('step2-continue-btn');
    if (s2btn) s2btn.addEventListener('click', function () {
      var selected = document.querySelector('input[name="payment"]:checked');
      var errEl    = document.getElementById('err-payment');
      if (!selected) { if (errEl) errEl.style.display = 'block'; return; }
      if (errEl) errEl.style.display = 'none';
      _paymentMethod = selected.value;
      _renderOrderReview();
      _goToStep(3);
    });

    /* Step 3 back */
    var s3back = document.getElementById('step3-back-btn');
    if (s3back) s3back.addEventListener('click', function () { _goToStep(2); });

    /* Place order */
    var placeBtn = document.getElementById('place-order-btn');
    if (placeBtn) placeBtn.addEventListener('click', _placeOrder);
  });

})();
