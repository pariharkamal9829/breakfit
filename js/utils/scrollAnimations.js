/**
 * scrollAnimations.js — Intersection Observer scroll animation utility
 * Adds the `animate-in` class to [data-animate] elements when they enter
 * the viewport. Fires once per element (unobserves after triggering).
 *
 * Exposed as: window.initScrollAnimations
 * Requirements: 8.1, 8.6
 */

(function () {
  'use strict';

  /**
   * Initialises scroll-triggered animations for all [data-animate] elements.
   *
   * Algorithm (from design spec):
   *  1. Select all [data-animate] elements that do NOT already have animate-in.
   *  2. Create IntersectionObserver (threshold: 0.15, rootMargin bottom offset).
   *  3. For each intersecting entry: add `animate-in`, then unobserve.
   *  4. Apply [data-delay] value as transitionDelay before observing.
   *
   * Re-callable: elements already carrying `animate-in` are silently skipped,
   * so calling this again after a soft navigation or partial re-render is safe.
   */
  function initScrollAnimations() {
    // 1. Collect elements that haven't been animated yet
    var elements = Array.prototype.slice.call(
      document.querySelectorAll('[data-animate]')
    ).filter(function (el) {
      return !el.classList.contains('animate-in');
    });

    if (elements.length === 0) {
      return; // nothing to do
    }

    // 2. Create the observer
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // 3. Trigger animation and stop watching
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // 4. Apply stagger delays and start observing
    elements.forEach(function (el) {
      var delay = el.getAttribute('data-delay');
      if (delay !== null && delay !== '') {
        el.style.transitionDelay = parseInt(delay, 10) + 'ms';
      }
      observer.observe(el);
    });
  }

  // Expose globally
  window.initScrollAnimations = initScrollAnimations;
})();
