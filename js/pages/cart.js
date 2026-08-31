/**
 * cart.js — Cart page controller
 * Requirements: 1.4, 3.4, 3.5, 3.6, 6.5, 7.5
 */
(function () {
  'use strict';

  var SHIPPING_THRESHOLD = 999;
  var SHIPPING_COST = 99;
  var PROMO_CODE = 'BREAK10';
  var PROMO_DISCOUNT = 0.10;
  var _promoApplied = false;
  var _qtyInstances = {};

  function _renderCartItems() {
    var cart = CartStore.getCart();
    var itemsEl = document.getElementById('cart-items');
    var layoutEl = document.getElementById('cart-layout');
    var emptyEl = document.getElementById('empty-cart');
    if (!itemsEl) return;

    if (cart.length === 0) {
      if (layoutEl) layoutEl.style.display = 'none';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (layoutEl) layoutEl.style.display = 'grid';
    if (emptyEl) emptyEl.style.display = 'none';

    // Check OOS
    var hasOOS = cart.some(function (item) {
      var product = window.PRODUCTS && PRODUCTS.find(function (p) { return p.id === item.id; });
      if (!product) return false;
      var variant = product.variants.find(function (v) { return v.label === item.variant; });
      return variant && !variant.inStock;
    });

    var checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      if (hasOOS) {
        checkoutBtn.setAttribute('disabled', 'true');
        checkoutBtn.setAttribute('title', 'Remove out-of-stock items to proceed');
      } else {
        checkoutBtn.removeAttribute('disabled');
      }
    }

    // Destroy old qty instances
    _qtyInstances = {};
    itemsEl.innerHTML = '';

    cart.forEach(function (item, index) {
      var product = window.PRODUCTS && PRODUCTS.find(function (p) { return p.id === item.id; });
      var variant  = product && product.variants.find(function (v) { return v.label === item.variant; });
      var oos      = variant && !variant.inStock;
      var containerId = 'qty-cart-' + index;

      var div = document.createElement('div');
      div.className = 'cart-item' + (oos ? ' cart-item--oos' : '');
      div.innerHTML =
        '<div class="cart-item__img">' +
          '<a href="product.html?id=' + item.id + '">' +
            '<img src="' + item.image + '" alt="' + sanitizeHTML(item.name) + '" loading="lazy">' +
          '</a>' +
        '</div>' +
        '<div class="cart-item__info">' +
          '<p class="cart-item__name"><a href="product.html?id=' + item.id + '">' + sanitizeHTML(item.name) + '</a></p>' +
          '<p class="cart-item__variant">' + sanitizeHTML(item.variant) + '</p>' +
          (oos ? '<span class="oos-badge">Out of Stock</span>' : '') +
          '<div class="cart-item__qty-wrap">' +
            '<div id="' + containerId + '"></div>' +
            '<button class="cart-item__remove" data-id="' + item.id + '" data-variant="' + item.variant + '" aria-label="Remove item"><i class="ri-delete-bin-line"></i></button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-item__price">' +
          '<div class="cart-item__price-unit">₹' + item.price + ' each</div>' +
          '<div class="cart-item__price-line">₹' + (item.price * item.quantity) + '</div>' +
        '</div>';
      itemsEl.appendChild(div);

      // Init qty selector
      var instance = QuantitySelector.init(containerId, item.quantity, 1, 99);
      if (instance) {
        _qtyInstances[containerId] = instance;
        instance.onChange(function (val) {
          CartStore.updateQuantity(item.id, item.variant, val);
        });
      }

      // Remove button
      div.querySelector('.cart-item__remove').addEventListener('click', function () {
        CartStore.removeItem(this.dataset.id, this.dataset.variant);
      });
    });

    _updateSummary();
  }

  function _updateSummary() {
    var subtotal  = CartStore.getSubtotal();
    var shipping  = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    var discount  = _promoApplied ? Math.round(subtotal * PROMO_DISCOUNT) : 0;
    var total     = subtotal + shipping - discount;

    var subEl      = document.getElementById('summary-subtotal');
    var shipEl     = document.getElementById('summary-shipping');
    var discEl     = document.getElementById('summary-discount');
    var discLine   = document.getElementById('discount-line');
    var totalEl    = document.getElementById('summary-total');

    if (subEl)    subEl.textContent  = '₹' + subtotal;
    if (shipEl)   shipEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
    if (discEl)   discEl.textContent = '−₹' + discount;
    if (discLine) discLine.style.display = _promoApplied ? 'flex' : 'none';
    if (totalEl)  totalEl.textContent = '₹' + total;
  }

  function _bindPromoCode() {
    var btn   = document.getElementById('apply-promo-btn');
    var input = document.getElementById('promo-input');
    var msg   = document.getElementById('promo-msg');
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      var code = input.value.trim().toUpperCase();
      if (code === PROMO_CODE) {
        _promoApplied = true;
        if (msg) { msg.textContent = '✓ Promo applied! 10% discount added.'; msg.className = 'promo-msg success'; }
        btn.disabled = true;
        input.disabled = true;
        _updateSummary();
      } else {
        _promoApplied = false;
        if (msg) { msg.textContent = 'Invalid promo code. Try BREAK10.'; msg.className = 'promo-msg error'; }
        _updateSummary();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919323242591', 'Hello! I have a question about my order.');

    _renderCartItems();
    _bindPromoCode();

    document.addEventListener('cart:updated', function () {
      _renderCartItems();
    });
  });
})();
