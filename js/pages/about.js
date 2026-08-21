/**
 * about.js — About page controller
 * Requirements: 1.6, 8.1
 */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919876543210', 'Hello BreakFit! I would like to learn more about your brand.');
    initScrollAnimations();
  });
})();
