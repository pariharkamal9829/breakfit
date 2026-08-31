/**
 * ProductCard.js — BreakFit
 * Renders product cards and triggers animated Cart Drawer on add-to-cart.
 */
(function () {
  'use strict';

  /* ── Cart Drawer (slide-in from right) ────────────────────── */
  var _drawerEl = null;
  var _drawerOpen = false;

  function _ensureDrawer() {
    if (_drawerEl) return;

    _drawerEl = document.createElement('div');
    _drawerEl.className = 'cart-drawer';
    _drawerEl.id = 'cart-drawer';
    _drawerEl.setAttribute('aria-hidden', 'true');
    _drawerEl.innerHTML =
      '<div class="cart-drawer__overlay" id="cart-drawer-overlay"></div>' +
      '<div class="cart-drawer__panel">' +
        '<div class="cart-drawer__header">' +
          '<div class="cart-drawer__title">' +
            '<i class="ri-shopping-bag-3-fill"></i>' +
            '<span>Your Cart</span>' +
            '<span class="cart-drawer__count" id="cdr-count">0</span>' +
          '</div>' +
          '<button class="cart-drawer__close" id="cart-drawer-close" aria-label="Close cart"><i class="ri-close-line"></i></button>' +
        '</div>' +
        '<div class="cart-drawer__items" id="cdr-items"></div>' +
        '<div class="cart-drawer__footer">' +
          '<div class="cart-drawer__subtotal">' +
            '<span>Subtotal</span>' +
            '<strong id="cdr-subtotal">₹0</strong>' +
          '</div>' +
          '<p class="cart-drawer__free-ship" id="cdr-free-ship"></p>' +
          '<a href="checkout.html" class="btn btn--primary" style="width:100%;justify-content:center;margin-bottom:10px">' +
            '<i class="ri-shield-check-line"></i> Checkout Securely' +
          '</a>' +
          '<a href="cart.html" class="btn btn-outline" style="width:100%;justify-content:center">' +
            '<i class="ri-shopping-cart-line"></i> View Full Cart' +
          '</a>' +
          '<div class="cart-drawer__trust">' +
            '<span><i class="ri-shield-check-line"></i> Secure</span>' +
            '<span><i class="ri-truck-line"></i> Free over ₹999</span>' +
            '<span><i class="ri-whatsapp-line"></i> WhatsApp support</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(_drawerEl);

    /* Close events */
    document.getElementById('cart-drawer-close').addEventListener('click', _closeDrawer);
    document.getElementById('cart-drawer-overlay').addEventListener('click', _closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') _closeDrawer(); });
  }

  function _openDrawer() {
    _ensureDrawer();
    _renderDrawerItems();
    _drawerEl.classList.add('open');
    _drawerEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    _drawerOpen = true;
  }

  function _closeDrawer() {
    if (!_drawerEl) return;
    _drawerEl.classList.remove('open');
    _drawerEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    _drawerOpen = false;
  }

  function _renderDrawerItems() {
    if (!_drawerEl) return;
    var cart      = window.CartStore ? CartStore.getCart() : [];
    var subtotal  = window.CartStore ? CartStore.getSubtotal() : 0;
    var countEl   = document.getElementById('cdr-count');
    var itemsEl   = document.getElementById('cdr-items');
    var subEl     = document.getElementById('cdr-subtotal');
    var shipEl    = document.getElementById('cdr-free-ship');

    var totalQty  = cart.reduce(function (a, i) { return a + i.quantity; }, 0);
    if (countEl) countEl.textContent = totalQty;
    if (subEl)   subEl.textContent   = '₹' + subtotal;

    /* Free shipping progress */
    if (shipEl) {
      if (subtotal >= 999) {
        shipEl.innerHTML = '<i class="ri-gift-line"></i> 🎉 You got <strong>FREE delivery!</strong>';
        shipEl.className = 'cart-drawer__free-ship free';
      } else {
        var remaining = 999 - subtotal;
        var pct = Math.round((subtotal / 999) * 100);
        shipEl.innerHTML =
          '<span>Add <strong>₹' + remaining + '</strong> more for free delivery</span>' +
          '<div class="ship-progress"><div class="ship-progress__bar" style="width:' + pct + '%"></div></div>';
        shipEl.className = 'cart-drawer__free-ship';
      }
    }

    if (!itemsEl) return;
    if (cart.length === 0) {
      itemsEl.innerHTML =
        '<div class="cdr-empty">' +
          '<i class="ri-shopping-cart-line"></i>' +
          '<p>Your cart is empty</p>' +
          '<a href="categories.html" class="btn btn--primary btn-sm">Shop Now</a>' +
        '</div>';
      return;
    }

    itemsEl.innerHTML = cart.map(function (item) {
      return '<div class="cdr-item" data-id="' + item.id + '" data-variant="' + item.variant + '">' +
        '<div class="cdr-item__img">' +
          '<img src="' + item.image + '" alt="' + (window.sanitizeHTML ? sanitizeHTML(item.name) : item.name) + '" loading="lazy">' +
        '</div>' +
        '<div class="cdr-item__info">' +
          '<p class="cdr-item__name">' + (window.sanitizeHTML ? sanitizeHTML(item.name) : item.name) + '</p>' +
          '<p class="cdr-item__variant">' + item.variant + '</p>' +
          '<div class="cdr-item__actions">' +
            '<div class="cdr-item__qty">' +
              '<button class="cdr-qty-btn cdr-qty-minus" aria-label="Decrease">−</button>' +
              '<span class="cdr-qty-val">' + item.quantity + '</span>' +
              '<button class="cdr-qty-btn cdr-qty-plus" aria-label="Increase">+</button>' +
            '</div>' +
            '<span class="cdr-item__price">₹' + (item.price * item.quantity) + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="cdr-item__remove" aria-label="Remove"><i class="ri-delete-bin-line"></i></button>' +
      '</div>';
    }).join('');

    /* Bind qty & remove */
    itemsEl.querySelectorAll('.cdr-item').forEach(function (row) {
      var id      = row.dataset.id;
      var variant = row.dataset.variant;

      row.querySelector('.cdr-qty-minus').addEventListener('click', function (e) {
        e.stopPropagation();
        var item = CartStore.getCart().find(function (i) { return i.id === id && i.variant === variant; });
        if (item) CartStore.updateQuantity(id, variant, item.quantity - 1);
      });

      row.querySelector('.cdr-qty-plus').addEventListener('click', function (e) {
        e.stopPropagation();
        var item = CartStore.getCart().find(function (i) { return i.id === id && i.variant === variant; });
        if (item) CartStore.updateQuantity(id, variant, item.quantity + 1);
      });

      row.querySelector('.cdr-item__remove').addEventListener('click', function (e) {
        e.stopPropagation();
        CartStore.removeItem(id, variant);
      });
    });
  }

  /* Listen to cart updates to refresh drawer when open */
  document.addEventListener('cart:updated', function () {
    if (_drawerOpen) _renderDrawerItems();
  });

  /* ── render card ── */
  function render(product, container) {
    var discountPct = product.originalPrice
      ? Math.round((1 - (product.variants[0] ? product.variants[0].price : product.price) / product.originalPrice) * 100)
      : 0;

    var badgeHTML = '';
    if (product.badge) {
      var bClass = {
        'Bestseller': 'badge--bestseller',
        'New':        'badge--new',
        'Sale':       'badge--sale',
        'Organic':    'badge--organic'
      }[product.badge] || 'badge--new';
      badgeHTML = '<span class="product-card__badge ' + bClass + '">' + product.badge + '</span>';
    }

    var discountBadge = discountPct >= 5
      ? '<span class="product-card__discount">−' + discountPct + '%</span>'
      : '';

    var stars     = window.renderStars ? window.renderStars(product.rating) : '';
    var origHTML  = product.originalPrice
      ? '<span class="product-card__price-original">₹' + product.originalPrice + '</span>'
      : '';

    var displayPrice = product.variants && product.variants[0] ? product.variants[0].price : product.price;

    /* Gym/health tags */
    var gymTags = [];
    if (product.tags) {
      var tagMap = { 'protein': '💪 High Protein', 'omega-3': '🧠 Omega-3', 'vitamin-e': '✨ Vit E', 'organic': '🌿 Organic', 'energy': '⚡ Energy', 'antioxidants': '🔬 Antioxidants' };
      product.tags.slice(0, 2).forEach(function (t) { if (tagMap[t]) gymTags.push(tagMap[t]); });
    }
    var tagsHTML = gymTags.length
      ? '<div class="product-card__tags">' + gymTags.map(function (t) { return '<span class="pcard-tag">' + t + '</span>'; }).join('') + '</div>'
      : '';

    var card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-animate', '');
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', product.name);

    card.innerHTML =
      '<div class="product-card__image-wrapper">' +
        badgeHTML +
        discountBadge +
        '<img class="product-card__image" src="' + product.images[0] + '" ' +
             'alt="' + product.name + '" loading="lazy" width="400" height="400">' +
        '<button class="product-card__wishlist" aria-label="Add to wishlist"><i class="ri-heart-line"></i></button>' +
      '</div>' +
      '<div class="product-card__body">' +
        '<div class="product-card__origin"><i class="ri-map-pin-line"></i>' + (product.origin || '') + '</div>' +
        '<h3 class="product-card__name">' + product.name + '</h3>' +
        tagsHTML +
        '<div class="product-card__rating">' +
          stars +
          '<span class="product-card__review-count">(' + (product.reviewCount || 0) + ')</span>' +
        '</div>' +
        '<div class="product-card__price">' +
          '<span class="product-card__price-current">₹' + displayPrice + '</span>' +
          origHTML +
        '</div>' +
        '<button class="product-card__quick-add" type="button">' +
          '<i class="ri-shopping-cart-line"></i><span>Add to Cart</span>' +
        '</button>' +
      '</div>';

    if (container) container.appendChild(card);
    attachEvents(card, product);
    return card;
  }

  function attachEvents(cardEl, product) {
    /* Card click → product page */
    cardEl.addEventListener('click', function (e) {
      if (e.target.closest('.product-card__quick-add') || e.target.closest('.product-card__wishlist')) return;
      window.location.href = 'product.html?id=' + product.id;
    });

    /* Quick-add → open drawer */
    var quickAdd = cardEl.querySelector('.product-card__quick-add');
    if (quickAdd) {
      quickAdd.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!window.CartStore) return;

        var defaultVariant = product.variants && product.variants[0] ? product.variants[0] : null;
        if (!defaultVariant || !defaultVariant.inStock) {
          if (window.ToastNotification) ToastNotification.show({ message: 'Out of stock.', type: 'error' });
          return;
        }

        CartStore.addItem({
          id:       product.id,
          name:     product.name,
          price:    defaultVariant.price,
          quantity: 1,
          variant:  defaultVariant.label,
          image:    product.images[0],
          slug:     product.slug
        });

        /* Animate button */
        quickAdd.classList.add('adding');
        quickAdd.innerHTML = '<i class="ri-check-line"></i><span>Added!</span>';
        setTimeout(function () {
          quickAdd.classList.remove('adding');
          quickAdd.innerHTML = '<i class="ri-shopping-cart-line"></i><span>Add to Cart</span>';
        }, 1600);

        /* Open cart drawer */
        _openDrawer();
      });
    }

    /* Wishlist */
    var wishBtn = cardEl.querySelector('.product-card__wishlist');
    if (wishBtn) {
      wishBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('is-active');
        var icon = this.querySelector('i');
        if (icon) icon.className = this.classList.contains('is-active') ? 'ri-heart-fill' : 'ri-heart-line';
      });
    }
  }

  window.ProductCard = { render: render, attachEvents: attachEvents, openCartDrawer: _openDrawer, closeCartDrawer: _closeDrawer };
})();
