/**
 * home.js — Home page controller for BreakFit
 * Requirements: 1.1, 8.1
 */

(function () {
  'use strict';

  // ── Hero slides data ─────────────────────────────────────────────────
  var HERO_SLIDES = [
    {
      image:      'https://picsum.photos/seed/hero1/1400/700',
      headline:   'Nature\'s Finest,<br>Delivered Fresh',
      subtext:    'Premium dry fruits and nuts sourced from the world\'s best farms — straight to your door.',
      ctaLabel:   'Shop Now',
      ctaHref:    'categories.html',
      accentColor:'#8B5E3C'
    },
    {
      image:      'https://picsum.photos/seed/hero2/1400/700',
      headline:   'Power Your Day<br>the Natural Way',
      subtext:    'From energising almonds to creamy cashews — fuel your mornings with the goodness of nature.',
      ctaLabel:   'Explore Products',
      ctaHref:    'categories.html',
      accentColor:'#D4A853'
    },
    {
      image:      'https://picsum.photos/seed/hero3/1400/700',
      headline:   'Gifting Made<br>Naturally Special',
      subtext:    'Premium dry fruit hampers for festivals, family, and every occasion worth celebrating.',
      ctaLabel:   'View Collections',
      ctaHref:    'categories.html',
      accentColor:'#4A7C59'
    }
  ];

  function renderCategoryCards() {
    var grid = document.getElementById('categories-grid');
    if (!grid || !window.CATEGORIES) return;

    CATEGORIES.filter(function (c) { return c.slug !== 'all'; }).forEach(function (cat, i) {
      var card = document.createElement('a');
      card.href = 'categories.html?category=' + cat.slug;
      card.className = 'category-card';
      card.setAttribute('data-animate', '');
      card.setAttribute('data-delay', String(i * 80));
      card.innerHTML =
        '<div class="category-card__img">' +
          '<img src="' + cat.image + '" alt="' + cat.name + '" loading="lazy">' +
        '</div>' +
        '<div class="category-card__body">' +
          '<h3>' + cat.name + '</h3>' +
          '<p>' + cat.productCount + ' products</p>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function renderFeaturedProducts() {
    var grid = document.getElementById('featured-products');
    if (!grid || !window.PRODUCTS || !window.ProductCard) return;

    var featured = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 8);
    featured.forEach(function (product) {
      ProductCard.render(product, grid);
    });
  }

  function bindNewsletterForm() {
    var form = document.getElementById('home-newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (window.ToastNotification) {
        ToastNotification.show({ message: 'Welcome! Your 10% discount code is BREAK10 🎉', type: 'success', duration: 5000 });
      }
      if (input) input.value = '';
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919876543210', 'Hello BreakFit! I\'d like to know more about your products.');
    HeroSlider.init('hero-slider-container', HERO_SLIDES);

    renderCategoryCards();
    renderFeaturedProducts();
    bindNewsletterForm();
    initScrollAnimations();
  });

})();
