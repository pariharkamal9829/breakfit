/**
 * home.js — BreakFit Home page controller
 * Products: Muesli & Edamame
 * Mobile: testimonials swipe slider
 */

(function () {
  'use strict';

  var HERO_SLIDES = [
    {
      image:      'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=1600&h=800&fit=crop&q=95&auto=format',
      label:      'Wholesome Breakfast · 100% Natural',
      headline:   'Start Your Day<br>the <em>Better Way</em>',
      subtext:    'Oats, seeds, nuts & dried fruits — our Breakfast Muesli is fresh, natural, and zero added sugar. Fuel every morning right.',
      ctaLabel:   'Shop Muesli',
      ctaHref:    'categories.html?category=muesli',
      badge:      '🥣  No added sugar · High fibre',
      accentColor:'#1A5C33'
    },
    {
      image:      'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=1600&h=800&fit=crop&q=95&auto=format',
      label:      'High Protein · Low Calorie Snack',
      headline:   'Power Snacking,<br><em>Naturally</em> Done',
      subtext:    'Fresh Edamame Beans — complete plant protein, all 9 essential amino acids, and only 121 cal per 100g. Your perfect fitness snack.',
      ctaLabel:   'Shop Edamame',
      ctaHref:    'categories.html?category=edamame',
      badge:      '💪  11g protein · 100% plant-based',
      accentColor:'#1A5C33'
    }
  ];

  /* ── Render featured products in a 2-col grid ── */
  function renderFeaturedProducts() {
    var grid = document.getElementById('featured-products');
    if (!grid || !window.PRODUCTS || !window.ProductCard) return;

    PRODUCTS.filter(function (p) { return p.featured; }).forEach(function (product) {
      ProductCard.render(product, grid);
    });
  }

  /* ── Newsletter ── */
  function bindNewsletterForm() {
    var form = document.getElementById('home-newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (window.ToastNotification)
        ToastNotification.show({ message: 'Welcome! Your 10% discount code is BREAK10 \uD83C\uDF89', type: 'success', duration: 5000 });
      if (input) input.value = '';
    });
  }

  /* ────────────────────────────────────────────────────────────
     TESTIMONIALS SLIDER  (swipe on mobile, static grid on desktop)
  ──────────────────────────────────────────────────────────── */
  function initTestimonialsSlider() {
    var slider  = document.getElementById('testimonials-slider');
    var track   = document.getElementById('testimonials-track');
    var dotsEl  = document.getElementById('testimonials-dots');
    if (!slider || !track) return;

    var cards   = track.querySelectorAll('.testimonial-card');
    var dots    = dotsEl ? dotsEl.querySelectorAll('.t-dot') : [];
    var total   = cards.length;
    var current = 0;
    var touchStartX = 0;
    var isDragging  = false;
    var dragDeltaX  = 0;

    function isMobile() { return window.innerWidth <= 768; }

    function goTo(idx) {
      if (!isMobile()) return;
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('t-dot--active', i === current);
      });
    }

    /* Dot clicks */
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { goTo(parseInt(dot.dataset.idx)); });
    });

    /* Touch swipe */
    track.addEventListener('touchstart', function (e) {
      if (!isMobile()) return;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (!isMobile()) return;
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) { goTo(delta < 0 ? current + 1 : current - 1); }
    }, { passive: true });

    /* Mouse drag (desktop preview fallback) */
    track.addEventListener('mousedown', function (e) {
      if (!isMobile()) return;
      isDragging = true; dragDeltaX = 0; touchStartX = e.clientX;
    });
    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      dragDeltaX = e.clientX - touchStartX;
    });
    window.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(dragDeltaX) > 40) goTo(dragDeltaX < 0 ? current + 1 : current - 1);
    });

    /* Reset on resize to desktop */
    window.addEventListener('resize', function () {
      if (!isMobile()) {
        track.style.transform = '';
        current = 0;
      }
    }, { passive: true });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof initHeader === 'function') initHeader();
    if (typeof initFooter === 'function') initFooter();
    if (window.WhatsAppWidget) WhatsAppWidget.init('919887494512', 'Hello BreakFit! I\'d like to know more about your products.');
    if (window.HeroSlider)    HeroSlider.init('hero-slider-container', HERO_SLIDES);

    renderFeaturedProducts();
    bindNewsletterForm();
    initTestimonialsSlider();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
  });

})();
