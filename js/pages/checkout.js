/**
 * checkout.js — BreakFit checkout (3-step flow)
 *
 * ORDER FLOW:
 *  Step 1 → Shipping details (phone accepts +91XXXXXXXXXX or plain 10-digit)
 *  Step 2 → Payment: UPI/QR (parihar09@slc) OR Cash on Delivery
 *  Step 3 → Review & Place Order
 *  On Place Order:
 *    → WhatsApp opens pre-filled with complete order → customer taps Send
 *    → Message arrives at +91 9887494512
 */

(function () {
  'use strict';

  var BUSINESS_WA        = '919887494512';
  var SHIPPING_THRESHOLD = 999;
  var SHIPPING_COST      = 99;

  var _currentStep   = 1;
  var _shippingData  = {};
  var _paymentMethod = '';

  /* ── helpers ── */
  function _q(id) { return document.getElementById(id); }
  function _getField(id) { var el = _q(id); return el ? el.value.trim() : ''; }

  function _showError(field, msg) {
    var errEl   = _q('err-' + field);
    var inputEl = _q(field) || document.querySelector('[name="' + field + '"]');
    if (errEl)   errEl.textContent = msg;
    if (inputEl && inputEl.parentElement) inputEl.parentElement.classList.add('has-error');
  }

  function _clearErrors() {
    document.querySelectorAll('.form-error').forEach(function (e) { e.textContent = ''; });
    document.querySelectorAll('.form-group.has-error').forEach(function (g) { g.classList.remove('has-error'); });
  }

  function _goToStep(step) {
    for (var i = 1; i <= 3; i++) {
      var el = _q('checkout-step-' + i);
      if (el) el.style.display = (i === step) ? 'block' : 'none';
    }
    _currentStep = step;
    document.querySelectorAll('.step').forEach(function (s) {
      var n = parseInt(s.dataset.step);
      s.classList.remove('step--active', 'step--completed');
      if (n === step)    s.classList.add('step--active');
      else if (n < step) s.classList.add('step--completed');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── sidebar summary ── */
  function _renderCheckoutSummary() {
    var cart    = CartStore.getCart();
    var itemsEl = _q('checkout-cart-items');
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

    if (_q('co-subtotal')) _q('co-subtotal').textContent = '₹' + subtotal;
    if (_q('co-shipping')) _q('co-shipping').textContent = shipping === 0 ? 'FREE 🎉' : '₹' + shipping;
    if (_q('co-total'))    _q('co-total').textContent    = '₹' + total;
  }

  /* ── order review (step 3) ── */
  function _renderOrderReview() {
    var reviewEl = _q('order-review');
    if (!reviewEl) return;

    var cart     = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    var itemsHTML = cart.map(function (item) {
      return '<div class="review-line">' +
        '<span>' + sanitizeHTML(item.name) + ' <em>(' + sanitizeHTML(item.variant) + ')</em> × ' + item.quantity + '</span>' +
        '<strong>₹' + (item.price * item.quantity) + '</strong>' +
      '</div>';
    }).join('');

    reviewEl.innerHTML =
      '<div class="order-review-section"><h4><i class="ri-shopping-bag-line"></i> Items</h4>' + itemsHTML + '</div>' +
      '<div class="order-review-section"><h4><i class="ri-map-pin-line"></i> Delivery Address</h4>' +
        '<p>' +
          sanitizeHTML(_shippingData.firstName) + ' ' + sanitizeHTML(_shippingData.lastName) + '<br>' +
          sanitizeHTML(_shippingData.address1) +
          (_shippingData.address2 ? ', ' + sanitizeHTML(_shippingData.address2) : '') + '<br>' +
          sanitizeHTML(_shippingData.city) + ', ' + sanitizeHTML(_shippingData.state) +
          ' — ' + sanitizeHTML(_shippingData.pincode) + '<br>' +
          '<i class="ri-phone-line"></i> +91 ' + sanitizeHTML(_shippingData.phone) + '<br>' +
          '<i class="ri-mail-line"></i> ' + sanitizeHTML(_shippingData.email) +
        '</p>' +
      '</div>' +
      '<div class="order-review-section"><h4><i class="ri-bank-card-line"></i> Payment</h4>' +
        '<p>' + _paymentLabel(_paymentMethod) + '</p>' +
      '</div>' +
      '<div class="order-review-section review-totals">' +
        '<div class="review-line"><span>Subtotal</span><span>₹' + subtotal + '</span></div>' +
        '<div class="review-line"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : '₹' + shipping) + '</span></div>' +
        '<div class="review-line review-grand"><span>Total Payable</span><span>₹' + total + '</span></div>' +
      '</div>';
  }

  function _paymentLabel(val) {
    return { upi: 'UPI / QR Code  (parihar09@slc)', cod: 'Cash on Delivery' }[val] || val;
  }

  /* ── PHONE NORMALISER ──
     Strips +91 or 91 prefix, returns bare 10-digit or original for validation.
  ── */
  function _normalisePhone(raw) {
    var s = raw.replace(/\s+/g, '').replace(/[-().]/g, '');
    /* strip leading +91 or 91 (when followed by 10 digits) */
    if (/^\+91[6-9]\d{9}$/.test(s))  return s.slice(3);   /* +91XXXXXXXXXX */
    if (/^91[6-9]\d{9}$/.test(s))    return s.slice(2);   /* 91XXXXXXXXXX  */
    return s;
  }

  /* ── VALIDATION (Step 1) ── */
  function _validateStep1() {
    _clearErrors();

    var rawPhone = _getField('phone');
    var phone    = _normalisePhone(rawPhone);

    var data = {
      firstName : _getField('firstName'),
      lastName  : _getField('lastName'),
      email     : _getField('email'),
      phone     : phone,
      address1  : _getField('address1'),
      address2  : _getField('address2'),
      city      : _getField('city'),
      state     : _getField('state'),
      pincode   : _getField('pincode')
    };

    var ok = true;
    function need(f, label) { if (!data[f]) { _showError(f, label + ' is required.'); ok = false; } }

    need('firstName', 'First name');
    need('lastName',  'Last name');
    need('address1',  'Address');
    need('city',      'City');
    need('state',     'State');

    if (!data.email) {
      _showError('email', 'Email is required.'); ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      _showError('email', 'Please enter a valid email.'); ok = false;
    }

    if (!rawPhone) {
      _showError('phone', 'Mobile number is required.'); ok = false;
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      _showError('phone', 'Enter a valid Indian mobile number (with or without +91).'); ok = false;
    }

    if (!data.pincode) {
      _showError('pincode', 'Pincode is required.'); ok = false;
    } else if (!/^\d{6}$/.test(data.pincode)) {
      _showError('pincode', 'Pincode must be 6 digits.'); ok = false;
    }

    if (!ok) {
      var firstErr = document.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      _shippingData = data;
    }
    return ok;
  }

  /* ── BUILD WHATSAPP MESSAGE ── */
  function _buildWhatsAppMessage(orderId, cart, subtotal, shipping, total) {
    var now     = new Date();
    var dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    var timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    /* Compact, card-style WhatsApp message */
    var itemLines = cart.map(function (item, i) {
      return (i + 1) + '. ' + item.name + ' × ' + item.quantity +
             ' (' + item.variant + ') — *₹' + (item.price * item.quantity) + '*';
    }).join('\n');

    var msg =
      '�️ *BreakFit — New Order*\n' +
      '📋 #' + orderId + '  |  🕐 ' + dateStr + ', ' + timeStr + '\n\n' +

      '👤 ' + _shippingData.firstName + ' ' + _shippingData.lastName +
      '  📞 +91 ' + _shippingData.phone + '\n' +
      '✉️ ' + _shippingData.email + '\n\n' +

      '📍 *Deliver to:*\n' +
      _shippingData.address1 +
      (_shippingData.address2 ? ', ' + _shippingData.address2 : '') + '\n' +
      _shippingData.city + ', ' + _shippingData.state + ' — ' + _shippingData.pincode + '\n\n' +

      '🧺 *Items:*\n' + itemLines + '\n\n' +

      '💰 Subtotal: ₹' + subtotal +
      '  |  🚚 Ship: ' + (shipping === 0 ? 'FREE' : '₹' + shipping) + '\n' +
      '✅ *Total: ₹' + total + '*\n\n' +

      '💳 *Payment:* ' + _paymentLabel(_paymentMethod) +
      (_paymentMethod === 'upi' ? '\n🏦 UPI ID: parihar09@slc' : '') + '\n\n' +

      '⚡ Please confirm & ship to address above.';

    return msg;
  }

  /* ── PLACE ORDER ── */
  function _placeOrder() {
    var placeBtn = _q('place-order-btn');
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.innerHTML = '<i class="ri-loader-4-line co-spin"></i> Processing…';
    }

    var orderId  = 'BF' + Date.now().toString().slice(-6);
    var cart     = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    var message = _buildWhatsAppMessage(orderId, cart, subtotal, shipping, total);
    var waUrl   = 'https://wa.me/' + BUSINESS_WA + '?text=' + encodeURIComponent(message);

    try {
      localStorage.setItem('bf_last_order', JSON.stringify({
        id: orderId, date: new Date().toISOString(),
        items: cart, shipping: _shippingData,
        payment: _paymentMethod, subtotal: subtotal,
        shippingCost: shipping, total: total
      }));
    } catch (e) { /* ignore */ }

    setTimeout(function () {
      CartStore.clearCart();
      _showConfirmedScreen(orderId, cart, subtotal, shipping, total, waUrl);
      /* Open WhatsApp — opens app on mobile, web.whatsapp.com on desktop */
      window.open(waUrl, '_blank');
    }, 700);
  }

  /* ── ORDER CONFIRMED SCREEN ── */
  function _showConfirmedScreen(orderId, cart, subtotal, shipping, total, waUrl) {
    for (var i = 1; i <= 3; i++) {
      var el = _q('checkout-step-' + i);
      if (el) el.style.display = 'none';
    }
    var sidebar = _q('checkout-summary-col');
    if (sidebar) sidebar.style.display = 'none';

    var confirmed = _q('order-confirmed');
    if (!confirmed) return;
    confirmed.style.display = 'block';

    var orderIdEl = _q('confirmed-order-id');
    if (orderIdEl) orderIdEl.textContent = '#' + orderId;

    var summaryEl = _q('confirmed-summary');
    if (summaryEl) {
      var payIcon = _paymentMethod === 'upi' ? '📱' : '💵';

      summaryEl.innerHTML =

        /* ── WhatsApp send CTA ── */
        '<div class="co-wa-cta">' +
          '<div class="co-wa-cta__icon"><i class="ri-whatsapp-line"></i></div>' +
          '<div class="co-wa-cta__body">' +
            '<strong>Tap Send to confirm your order!</strong>' +
            '<p>WhatsApp is open with your order pre-filled. Just tap <em>Send</em>.</p>' +
          '</div>' +
          '<a href="' + waUrl + '" target="_blank" rel="noopener" class="btn co-wa-btn">' +
            '<i class="ri-whatsapp-line"></i> Send on WhatsApp' +
          '</a>' +
        '</div>' +

        /* ── Order card ── */
        '<div class="co-order-card">' +

          /* Card header strip */
          '<div class="co-card-header">' +
            '<div class="co-card-header__left">' +
              '<span class="co-card-badge"><i class="ri-checkbox-circle-fill"></i> Order Confirmed</span>' +
              '<h3 class="co-card-order-id">#' + orderId + '</h3>' +
            '</div>' +
            '<div class="co-card-header__right">' +
              '<span class="co-card-date">' + new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) + '</span>' +
            '</div>' +
          '</div>' +

          /* Items */
          '<div class="co-card-section">' +
            '<div class="co-card-section-label"><i class="ri-shopping-bag-3-line"></i> Items</div>' +
            cart.map(function (item) {
              return '<div class="co-card-item">' +
                '<img src="' + item.image + '" alt="' + sanitizeHTML(item.name) + '" loading="lazy">' +
                '<div class="co-card-item__info">' +
                  '<span class="co-card-item__name">' + sanitizeHTML(item.name) + '</span>' +
                  '<span class="co-card-item__meta">' + sanitizeHTML(item.variant) + ' · Qty ' + item.quantity + '</span>' +
                '</div>' +
                '<span class="co-card-item__price">₹' + (item.price * item.quantity) + '</span>' +
              '</div>';
            }).join('') +
          '</div>' +

          /* Two-col: address + payment */
          '<div class="co-card-row2">' +

            '<div class="co-card-section">' +
              '<div class="co-card-section-label"><i class="ri-map-pin-2-line"></i> Deliver To</div>' +
              '<p class="co-card-address">' +
                '<strong>' + sanitizeHTML(_shippingData.firstName) + ' ' + sanitizeHTML(_shippingData.lastName) + '</strong><br>' +
                sanitizeHTML(_shippingData.address1) +
                (_shippingData.address2 ? ', ' + sanitizeHTML(_shippingData.address2) : '') + '<br>' +
                sanitizeHTML(_shippingData.city) + ', ' + sanitizeHTML(_shippingData.state) + ' ' + sanitizeHTML(_shippingData.pincode) + '<br>' +
                '<span class="co-card-phone"><i class="ri-phone-fill"></i> +91 ' + sanitizeHTML(_shippingData.phone) + '</span>' +
              '</p>' +
            '</div>' +

            '<div class="co-card-section">' +
              '<div class="co-card-section-label"><i class="ri-secure-payment-line"></i> Payment</div>' +
              '<div class="co-card-payment">' +
                '<span class="co-card-pay-icon">' + payIcon + '</span>' +
                '<div>' +
                  '<span class="co-card-pay-method">' + _paymentLabel(_paymentMethod) + '</span>' +
                  (_paymentMethod === 'upi'
                    ? '<span class="co-card-pay-upi">parihar09@slc</span>'
                    : '') +
                '</div>' +
              '</div>' +
            '</div>' +

          '</div>' +

          /* Total bar */
          '<div class="co-card-total-bar">' +
            '<div class="co-card-total-line">' +
              '<span>Subtotal</span><span>₹' + subtotal + '</span>' +
            '</div>' +
            '<div class="co-card-total-line">' +
              '<span>Shipping</span><span>' + (shipping === 0 ? '<em>FREE 🎉</em>' : '₹' + shipping) + '</span>' +
            '</div>' +
            '<div class="co-card-total-line co-card-grand">' +
              '<span>Total Paid</span><span>₹' + total + '</span>' +
            '</div>' +
          '</div>' +

          /* Fallback note */
          '<div class="co-card-fallback">' +
            '<i class="ri-information-line"></i>' +
            '<span>WhatsApp didn\'t open? ' +
              '<a href="' + waUrl + '" target="_blank" rel="noopener">Click here</a>' +
              ' or call <a href="tel:+919887494512">+91 9887494512</a>.' +
            '</span>' +
          '</div>' +

        '</div>' + /* end co-order-card */

        /* Actions */
        '<div class="co-confirmed-actions">' +
          '<a href="index.html"      class="btn btn--primary btn-lg"><i class="ri-home-line"></i> Home</a>' +
          '<a href="categories.html" class="btn btn--secondary btn-lg"><i class="ri-store-2-line"></i> Shop More</a>' +
        '</div>';
    }

    document.querySelectorAll('.step').forEach(function (s) {
      s.classList.remove('step--active');
      s.classList.add('step--completed');
    });

    if (window.ToastNotification) {
      ToastNotification.show({
        message: '🎉 Order #' + orderId + ' placed! Check WhatsApp to confirm.',
        type: 'success', duration: 8000
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof initHeader === 'function') initHeader();
    if (typeof initFooter === 'function') initFooter();
    if (window.WhatsAppWidget)
      WhatsAppWidget.init('919887494512', 'Hello BreakFit! I need help with my order.');

    if (!window.CartStore || CartStore.getItemCount() === 0) {
      window.location.href = 'cart.html';
      return;
    }

    _renderCheckoutSummary();

    var cart   = CartStore.getCart();
    var hasOOS = window.PRODUCTS && cart.some(function (item) {
      var p = PRODUCTS.find(function (pr) { return pr.id === item.id; });
      if (!p) return false;
      var v = p.variants.find(function (va) { return va.label === item.variant; });
      return v && !v.inStock;
    });
    if (hasOOS) {
      var pb = _q('place-order-btn');
      if (pb) { pb.disabled = true; pb.title = 'Remove out-of-stock items first.'; }
      if (window.ToastNotification)
        ToastNotification.show({ message: 'Your cart has out-of-stock items. Please update your cart first.', type: 'error', duration: 6000 });
    }

    var s1btn   = _q('step1-continue-btn');
    var s2back  = _q('step2-back-btn');
    var s2btn   = _q('step2-continue-btn');
    var s3back  = _q('step3-back-btn');
    var placeBtn = _q('place-order-btn');

    /* Show/hide UPI ID box when UPI radio is toggled */
    document.querySelectorAll('input[name="payment"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        var upiBox = _q('upi-id-box');
        if (upiBox) upiBox.style.display = (radio.value === 'upi' && radio.checked) ? 'block' : 'none';
      });
    });

    if (s1btn)   s1btn.addEventListener('click',   function () { if (_validateStep1()) _goToStep(2); });
    if (s2back)  s2back.addEventListener('click',  function () { _goToStep(1); });
    if (s2btn)   s2btn.addEventListener('click',   function () {
      var selected = document.querySelector('input[name="payment"]:checked');
      var errEl    = _q('err-payment');
      if (!selected) { if (errEl) errEl.style.display = 'block'; return; }
      if (errEl) errEl.style.display = 'none';
      _paymentMethod = selected.value;
      _renderOrderReview();
      _goToStep(3);
    });
    if (s3back)   s3back.addEventListener('click',  function () { _goToStep(2); });
    if (placeBtn) placeBtn.addEventListener('click', _placeOrder);
  });

})();
