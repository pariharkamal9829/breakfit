/**
 * checkout.js — Checkout page controller (3-step flow)
 * Requirements: 3.7, 6.1, 6.2, 6.3, 6.4, 6.5
 */
(function () {
  'use strict';

  var SHIPPING_THRESHOLD = 999;
  var SHIPPING_COST = 99;
  var _currentStep = 1;
  var _shippingData = {};
  var _paymentMethod = '';

  function _getField(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

  function _showError(field, msg) {
    var errEl = document.getElementById('err-' + field);
    var inputEl = document.getElementById(field) || document.querySelector('[name="' + field + '"]');
    if (errEl) errEl.textContent = msg;
    if (inputEl && inputEl.parentElement) inputEl.parentElement.classList.add('has-error');
  }

  function _clearErrors() {
    document.querySelectorAll('.form-error').forEach(function (e) { e.textContent = ''; });
    document.querySelectorAll('.form-group.has-error').forEach(function (g) { g.classList.remove('has-error'); });
  }

  function _goToStep(step) {
    for (var i = 1; i <= 3; i++) {
      var el = document.getElementById('checkout-step-' + i);
      if (el) el.style.display = i === step ? 'block' : 'none';
    }
    _currentStep = step;

    // Update step indicator
    document.querySelectorAll('.step').forEach(function (s) {
      var n = parseInt(s.dataset.step);
      s.classList.remove('step--active', 'step--completed');
      if (n === step) s.classList.add('step--active');
      else if (n < step) s.classList.add('step--completed');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function _renderCheckoutSummary() {
    var cart = CartStore.getCart();
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
    if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
    if (totEl)  totEl.textContent  = '₹' + total;
  }

  function _renderOrderReview() {
    var reviewEl = document.getElementById('order-review');
    if (!reviewEl) return;

    var cart = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    var itemsHTML = cart.map(function (item) {
      return '<div style="display:flex;justify-content:space-between;padding:4px 0">' +
        '<span>' + sanitizeHTML(item.name) + ' (' + sanitizeHTML(item.variant) + ') × ' + item.quantity + '</span>' +
        '<strong>₹' + (item.price * item.quantity) + '</strong>' +
      '</div>';
    }).join('');

    reviewEl.innerHTML =
      '<div class="order-review-section"><h4>Items</h4>' + itemsHTML + '</div>' +
      '<div class="order-review-section"><h4>Delivery Address</h4>' +
        '<p>' + sanitizeHTML(_shippingData.firstName) + ' ' + sanitizeHTML(_shippingData.lastName) + '<br>' +
        sanitizeHTML(_shippingData.address1) + (_shippingData.address2 ? ', ' + sanitizeHTML(_shippingData.address2) : '') + '<br>' +
        sanitizeHTML(_shippingData.city) + ', ' + sanitizeHTML(_shippingData.state) + ' — ' + sanitizeHTML(_shippingData.pincode) + '<br>' +
        sanitizeHTML(_shippingData.phone) + '</p>' +
      '</div>' +
      '<div class="order-review-section"><h4>Payment</h4><p>' + sanitizeHTML(_paymentMethod.toUpperCase()) + '</p></div>' +
      '<div class="order-review-section"><h4>Total</h4>' +
        '<div style="display:flex;justify-content:space-between"><span>Subtotal</span><span>₹' + subtotal + '</span></div>' +
        '<div style="display:flex;justify-content:space-between"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : '₹' + shipping) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.1rem;margin-top:8px"><span>Total</span><span>₹' + total + '</span></div>' +
      '</div>';
  }

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

    var rules = {
      firstName: { required: true, label: 'First name' },
      lastName:  { required: true, label: 'Last name' },
      email:     { required: true, email: true, label: 'Email' },
      phone:     { required: true, phone: true, label: 'Mobile number' },
      address1:  { required: true, label: 'Address' },
      city:      { required: true, label: 'City' },
      state:     { required: true, label: 'State' },
      pincode:   { required: true, pattern: /^\d{6}$/, patternMsg: 'Pincode must be 6 digits.', label: 'Pincode' }
    };

    var result = FormValidator.validate(data, rules);
    if (!result.valid) {
      Object.keys(result.errors).forEach(function (field) { _showError(field, result.errors[field]); });
      var firstErr = document.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    _shippingData = data;
    return true;
  }

  function _placeOrder() {
    var orderId = 'BF-' + Math.floor(100000 + Math.random() * 900000);
    var cart    = CartStore.getCart();
    var subtotal = CartStore.getSubtotal();
    var shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var total    = subtotal + shipping;

    // Hide form, show confirmation
    document.getElementById('checkout-step-3').style.display = 'none';
    document.getElementById('checkout-summary-col').style.display = 'none';
    var confirmed = document.getElementById('order-confirmed');
    if (confirmed) confirmed.style.display = 'block';

    var orderIdEl = document.getElementById('confirmed-order-id');
    if (orderIdEl) orderIdEl.textContent = orderId;

    var summaryEl = document.getElementById('confirmed-summary');
    if (summaryEl) {
      summaryEl.innerHTML =
        '<div style="background:var(--color-bg-alt);border-radius:var(--radius-lg);padding:var(--space-5);margin-top:var(--space-4);text-align:left">' +
        cart.map(function (item) {
          return '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:var(--text-sm)">' +
            '<span>' + sanitizeHTML(item.name) + ' × ' + item.quantity + '</span>' +
            '<strong>₹' + (item.price * item.quantity) + '</strong>' +
          '</div>';
        }).join('') +
        '<div style="display:flex;justify-content:space-between;border-top:1px solid var(--color-border);padding-top:8px;margin-top:8px;font-weight:700">' +
          '<span>Total</span><span>₹' + total + '</span>' +
        '</div>' +
        '</div>';
    }

    // Update step indicator to all completed
    document.querySelectorAll('.step').forEach(function (s) { s.classList.add('step--completed'); s.classList.remove('step--active'); });

    CartStore.clearCart();

    ToastNotification.show({ message: 'Order placed! Order ID: ' + orderId, type: 'success', duration: 6000 });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919876543210', 'Hello! I need help with my order.');

    // Redirect if cart is empty
    if (CartStore.getItemCount() === 0) {
      window.location.href = 'cart.html';
      return;
    }

    _renderCheckoutSummary();

    // Check OOS
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
      ToastNotification.show({ message: 'Your cart has out-of-stock items. Please update your cart.', type: 'error', duration: 5000 });
    }

    // Step 1 → 2
    document.getElementById('step1-continue-btn').addEventListener('click', function () {
      if (_validateStep1()) _goToStep(2);
    });

    // Step 2 back
    document.getElementById('step2-back-btn').addEventListener('click', function () { _goToStep(1); });

    // Step 2 → 3
    document.getElementById('step2-continue-btn').addEventListener('click', function () {
      var selected = document.querySelector('input[name="payment"]:checked');
      var errEl = document.getElementById('err-payment');
      if (!selected) {
        if (errEl) errEl.style.display = 'block';
        return;
      }
      if (errEl) errEl.style.display = 'none';
      _paymentMethod = selected.value;
      _renderOrderReview();
      _goToStep(3);
    });

    // Step 3 back
    document.getElementById('step3-back-btn').addEventListener('click', function () { _goToStep(2); });

    // Place order
    document.getElementById('place-order-btn').addEventListener('click', _placeOrder);
  });
})();
