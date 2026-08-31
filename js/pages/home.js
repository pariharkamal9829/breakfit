/**
 * home.js — Home page controller for BreakFit
 * Upgraded: cinematic hero slides with real food photography,
 * polished section rendering, and newsletter binding.
 */

(function () {
  'use strict';

  // ── Hero slides — real Unsplash food photography ─────────────────────────
  var HERO_SLIDES = [
    {
      image:      'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=1600&h=800&fit=crop&q=95&auto=format',
      label:      'Premium Quality · Farm to Door',
      headline:   'Nature\'s <em>Finest</em>,<br>Delivered Fresh',
      subtext:    'Premium cashews, almonds, walnuts & more — sourced from the world\'s best farms, straight to your door across India.',
      ctaLabel:   'Shop Now',
      ctaHref:    'categories.html',
      badge:      '★★★★★  Trusted by 10,000+ customers',
      accentColor:'#1A5C33'
    },
    {
      image:      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=1600&h=800&fit=crop&q=95&auto=format',
      label:      'Superfoods · 100% Natural',
      headline:   'Power Your Day<br>the <em>Natural</em> Way',
      subtext:    'High-protein almonds, omega-3 walnuts, energy-rich dates — the daily nutrition your body deserves, every morning.',
      ctaLabel:   'Explore Products',
      ctaHref:    'categories.html',
      badge:      '🌿  No preservatives · No additives',
      accentColor:'#1A5C33'
    },
    {
      image:      'https://images.unsplash.com/photo-1593358278257-2ca1b23773ac?w=1600&h=800&fit=crop&q=95&auto=format',
      label:      'Festival & Corporate Gifting',
      headline:   'Gifting Made<br><em>Naturally</em> Special',
      subtext:    'Premium dry fruit hampers for Diwali, Eid, weddings, and every occasion worth celebrating with health and love.',
      ctaLabel:   'View Collections',
      ctaHref:    'categories.html',
      badge:      '🎁  Custom gift boxes available',
      accentColor:'#1A5C33'
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
          '<p>' + cat.productCount + ' product' + (cat.productCount !== 1 ? 's' : '') + '</p>' +
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

  // ── Init ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof initHeader === 'function') initHeader();
    if (typeof initFooter === 'function') initFooter();
    if (window.WhatsAppWidget) WhatsAppWidget.init('919323242591', 'Hello BreakFit! I\'d like to know more about your products.');
    if (window.HeroSlider) HeroSlider.init('hero-slider-container', HERO_SLIDES);

    renderCategoryCards();
    renderFeaturedProducts();
    bindNewsletterForm();

    if (typeof initScrollAnimations === 'function') initScrollAnimations();
  });

})();
