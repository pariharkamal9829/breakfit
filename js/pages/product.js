/**
 * product.js — Product detail page controller
 * Requirements: 1.3, 4.5, 4.6, 2.5
 */
(function () {
  'use strict';

  var _product = null;
  var _selectedVariant = null;
  var _qtyInstance = null;

  function _getProductId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function _findProduct(id) {
    if (!window.PRODUCTS) return null;
    return PRODUCTS.find(function (p) { return p.id === id; }) || null;
  }

  function _renderVariants(product) {
    var container = document.getElementById('variant-btns');
    var labelEl   = document.getElementById('selected-variant-label');
    if (!container || !product.variants) return;

    _selectedVariant = product.variants[0];
    if (labelEl) labelEl.textContent = _selectedVariant.label;

    product.variants.forEach(function (v, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'variant-btn' + (i === 0 ? ' selected' : '') + (!v.inStock ? ' oos' : '');
      btn.textContent = v.label + (!v.inStock ? ' — Out of Stock' : '');
      btn.disabled = !v.inStock;
      btn.addEventListener('click', function () {
        if (!v.inStock) return;
        _selectedVariant = v;
        container.querySelectorAll('.variant-btn').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        if (labelEl) labelEl.textContent = v.label;
        document.getElementById('product-price').textContent = '₹' + v.price;
      });
      container.appendChild(btn);
    });
  }

  function _renderMeta(product) {
    var el = document.getElementById('product-meta');
    if (!el) return;
    el.innerHTML =
      '<span><strong>Origin:</strong> ' + product.origin + '</span>' +
      '<span><strong>Category:</strong> ' + product.category.charAt(0).toUpperCase() + product.category.slice(1) + '</span>';
  }

  function _renderTabs(product) {
    var descEl = document.getElementById('tab-description');
    var nutrEl = document.getElementById('tab-nutrition');

    if (descEl) descEl.innerHTML = '<p style="line-height:1.8;color:var(--color-text-secondary)">' + (product.longDescription || product.shortDescription) + '</p>';

    if (nutrEl && product.nutritionFacts && product.nutritionFacts.length) {
      var rows = product.nutritionFacts.map(function (n) {
        return '<tr><td>' + n.nutrient + '</td><td>' + n.per100g + '</td></tr>';
      }).join('');
      nutrEl.innerHTML = '<table class="nutrition-table"><thead><tr><th>Nutrient</th><th>Per 100g</th></tr></thead><tbody>' + rows + '</tbody></table>';
    }

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById('tab-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function _renderRelated(product) {
    var grid = document.getElementById('related-products');
    if (!grid || !window.PRODUCTS || !window.ProductCard) return;
    var related = PRODUCTS.filter(function (p) {
      return p.category === product.category && p.id !== product.id;
    }).slice(0, 4);
    related.forEach(function (p) { ProductCard.render(p, grid); });
  }

  function _bindAddToCart() {
    var btn = document.getElementById('add-to-cart-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!_selectedVariant || !_selectedVariant.inStock) {
        ToastNotification.show({ message: 'Please select an available size.', type: 'error' });
        return;
      }
      var qty = _qtyInstance ? _qtyInstance.getValue() : 1;
      CartStore.addItem({
        id:       _product.id,
        name:     _product.name,
        price:    _selectedVariant.price,
        quantity: qty,
        variant:  _selectedVariant.label,
        image:    _product.images[0],
        slug:     _product.slug
      });
      ToastNotification.show({
        message:  qty + ' × ' + _product.name + ' (' + _selectedVariant.label + ') added!',
        type:     'success',
        action:   { label: 'View Cart', href: 'cart.html' }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919876543210', 'Hello! I have a question about a product.');

    var id = _getProductId();
    if (!id) { window.location.href = 'index.html'; return; }

    _product = _findProduct(id);
    if (!_product) { window.location.href = 'index.html'; return; }

    // Breadcrumb
    var bcName = document.getElementById('breadcrumb-name');
    if (bcName) bcName.textContent = _product.name;
    document.title = _product.name + ' — BreakFit';

    // Badge
    var badgeEl = document.getElementById('product-badge');
    if (badgeEl && _product.badge) {
      badgeEl.innerHTML = '<span class="product-card__badge badge--' + _product.badge.toLowerCase() + '">' + _product.badge + '</span>';
    }

    // Title
    var titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = _product.name;

    // Rating
    var ratingEl = document.getElementById('product-rating');
    if (ratingEl && window.renderStars) {
      ratingEl.innerHTML = renderStars(_product.rating) + '<span class="rating-text">(' + _product.reviewCount + ' reviews)</span>';
    }

    // Price
    var priceEl    = document.getElementById('product-price');
    var origEl     = document.getElementById('product-original-price');
    var discountEl = document.getElementById('product-discount');
    var basePrice  = _product.variants && _product.variants[0] ? _product.variants[0].price : _product.price;
    if (priceEl) priceEl.textContent = '₹' + basePrice;
    if (origEl && _product.originalPrice) {
      origEl.textContent = '₹' + _product.originalPrice;
      var saved = Math.round((1 - basePrice / _product.originalPrice) * 100);
      if (discountEl) discountEl.textContent = saved + '% off';
    }

    // Short description
    var sdEl = document.getElementById('product-short-desc');
    if (sdEl) sdEl.textContent = _product.shortDescription;

    // Gallery
    ProductGallery.init(_product.images, 'product-gallery');

    // Variants
    _renderVariants(_product);

    // Quantity selector
    _qtyInstance = QuantitySelector.init('qty-selector-container', 1, 1, 20);

    // Meta
    _renderMeta(_product);

    // Tabs
    _renderTabs(_product);

    // Reviews
    ReviewsSection.init(_product.id, 'reviews-container');

    // Related
    _renderRelated(_product);

    // Add to cart
    _bindAddToCart();

    // Wishlist
    var wishBtn = document.getElementById('wishlist-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', function () {
        this.classList.toggle('is-active');
        var icon = this.querySelector('i');
        if (icon) icon.className = this.classList.contains('is-active') ? 'ri-heart-fill' : 'ri-heart-line';
        if (this.classList.contains('is-active')) {
          ToastNotification.show({ message: 'Added to wishlist!', type: 'success', duration: 2000 });
        }
      });
    }

    initScrollAnimations();
  });
})();
