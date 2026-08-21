/**
 * ProductCard.js
 * Reusable product card component for BreakFit.
 * Exposed as window.ProductCard (no ES modules).
 *
 * Requirements: 2.2, 8.2, 10.2
 */

(function () {
  'use strict';

  /**
   * Render a product card into a container element.
   * @param {Object}      product    Product data object
   * @param {HTMLElement} container  Parent element to append the card into
   * @returns {HTMLElement} The created card element
   */
  function render(product, container) {
    var badgeHTML = '';
    if (product.badge) {
      var badgeClass = 'badge--' + product.badge.toLowerCase();
      badgeHTML = '<span class="product-card__badge ' + badgeClass + '">' + product.badge + '</span>';
    }

    var stars = window.renderStars ? window.renderStars(product.rating) : '';
    var reviewCount = product.reviewCount ? '(' + product.reviewCount + ')' : '';

    var originalPriceHTML = product.originalPrice
      ? '<span class="product-card__price-original">&#x20B9;' + product.originalPrice + '</span>'
      : '';

    // Use first variant price as base price display
    var displayPrice = product.variants && product.variants[0] ? product.variants[0].price : product.price;

    var card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-animate', '');
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', product.name);

    card.innerHTML =
      '<div class="product-card__image-wrapper">' +
        badgeHTML +
        '<img class="product-card__image" src="' + product.images[0] + '" ' +
             'alt="' + product.name + '" loading="lazy" width="400" height="400">' +
        '<button class="product-card__wishlist" aria-label="Add to wishlist">' +
          '<i class="ri-heart-line"></i>' +
        '</button>' +
      '</div>' +
      '<div class="product-card__body">' +
        '<h3 class="product-card__name">' + product.name + '</h3>' +
        '<div class="product-card__rating">' +
          stars +
          '<span class="product-card__review-count">' + reviewCount + '</span>' +
        '</div>' +
        '<div class="product-card__price">' +
          '<span class="product-card__price-current">&#x20B9;' + displayPrice + '</span>' +
          originalPriceHTML +
        '</div>' +
        '<button class="product-card__quick-add btn btn--primary" type="button">' +
          '<i class="ri-shopping-cart-line"></i> Add to Cart' +
        '</button>' +
      '</div>';

    if (container) container.appendChild(card);
    attachEvents(card, product);
    return card;
  }

  /**
   * Attach click events to a rendered product card.
   * @param {HTMLElement} cardEl   The card element
   * @param {Object}      product  Product data object
   */
  function attachEvents(cardEl, product) {
    // Navigate to product page on card click
    cardEl.addEventListener('click', function (e) {
      // Don't navigate if quick-add or wishlist was clicked
      if (e.target.closest('.product-card__quick-add') || e.target.closest('.product-card__wishlist')) return;
      window.location.href = 'product.html?id=' + product.id;
    });

    // Quick-add to cart
    var quickAdd = cardEl.querySelector('.product-card__quick-add');
    if (quickAdd) {
      quickAdd.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!window.CartStore) return;

        var defaultVariant = product.variants && product.variants[0] ? product.variants[0] : null;
        if (!defaultVariant || !defaultVariant.inStock) {
          if (window.ToastNotification) {
            ToastNotification.show({ message: 'This product is currently out of stock.', type: 'error' });
          }
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

        if (window.ToastNotification) {
          ToastNotification.show({
            message:  product.name + ' added to cart!',
            type:     'success',
            duration: 3000,
            action:   { label: 'View Cart', href: 'cart.html' }
          });
        }

        // Visual feedback on button
        quickAdd.innerHTML = '<i class="ri-check-line"></i> Added!';
        quickAdd.style.background = 'var(--color-accent)';
        setTimeout(function () {
          quickAdd.innerHTML = '<i class="ri-shopping-cart-line"></i> Add to Cart';
          quickAdd.style.background = '';
        }, 1500);
      });
    }

    // Wishlist toggle
    var wishlistBtn = cardEl.querySelector('.product-card__wishlist');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('is-active');
        var icon = this.querySelector('i');
        if (icon) {
          icon.className = this.classList.contains('is-active') ? 'ri-heart-fill' : 'ri-heart-line';
        }
      });
    }
  }

  window.ProductCard = { render: render, attachEvents: attachEvents };
})();
