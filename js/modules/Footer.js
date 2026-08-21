/**
 * Footer.js
 * Shared footer renderer for all BreakFit pages.
 * Exposed as window.initFooter (no ES modules).
 *
 * Requirements: 11.2, 11.5
 */

(function () {
  'use strict';

  function initFooter() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    container.innerHTML =
      '<footer class="site-footer">' +
        '<div class="container">' +

          /* ── Footer Top ── */
          '<div class="footer-top">' +

            /* Brand column */
            '<div class="footer-brand">' +
              '<a href="index.html" class="footer-logo" aria-label="BreakFit home">' +
                '<svg class="footer-logo-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
                  '<rect width="40" height="40" rx="10" fill="#8B5E3C"/>' +
                  '<text x="20" y="27" text-anchor="middle" font-size="20" fill="#D4A853">🥜</text>' +
                '</svg>' +
                '<div class="footer-logo-text">' +
                  '<span class="footer-logo-name">BreakFit</span>' +
                  '<span class="footer-logo-tagline">Premium Dry Fruits</span>' +
                '</div>' +
              '</a>' +
              '<p class="footer-brand-desc">Sourcing the finest dry fruits and nuts from trusted farms across India and beyond. Premium quality, delivered fresh to your door.</p>' +
              '<div class="footer-social">' +
                '<a href="#" class="social-btn social-btn--instagram" aria-label="Instagram"><i class="ri-instagram-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--facebook"  aria-label="Facebook"><i class="ri-facebook-fill"></i></a>' +
                '<a href="#" class="social-btn social-btn--twitter"   aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--youtube"   aria-label="YouTube"><i class="ri-youtube-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--whatsapp"  aria-label="WhatsApp"><i class="ri-whatsapp-line"></i></a>' +
              '</div>' +
            '</div>' +

            /* Quick Links column */
            '<div class="footer-col">' +
              '<h4>Quick Links</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="index.html"      class="footer-link"><i class="ri-arrow-right-s-line"></i>Home</a></li>' +
                '<li><a href="categories.html" class="footer-link"><i class="ri-arrow-right-s-line"></i>Shop All</a></li>' +
                '<li><a href="about.html"      class="footer-link"><i class="ri-arrow-right-s-line"></i>About Us</a></li>' +
                '<li><a href="cart.html"       class="footer-link"><i class="ri-arrow-right-s-line"></i>Cart</a></li>' +
                '<li><a href="checkout.html"   class="footer-link"><i class="ri-arrow-right-s-line"></i>Checkout</a></li>' +
              '</ul>' +
            '</div>' +

            /* Categories column */
            '<div class="footer-col">' +
              '<h4>Categories</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="categories.html?category=cashews"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Cashews</a></li>' +
                '<li><a href="categories.html?category=almonds"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Almonds</a></li>' +
                '<li><a href="categories.html?category=walnuts"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Walnuts</a></li>' +
                '<li><a href="categories.html?category=raisins"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Raisins</a></li>' +
                '<li><a href="categories.html?category=dates"      class="footer-link"><i class="ri-arrow-right-s-line"></i>Dates</a></li>' +
                '<li><a href="categories.html?category=mixed-nuts" class="footer-link"><i class="ri-arrow-right-s-line"></i>Mixed Nuts</a></li>' +
              '</ul>' +
            '</div>' +

            /* Newsletter column */
            '<div class="footer-col footer-col--newsletter">' +
              '<h4>Stay in the Loop</h4>' +
              '<p class="footer-newsletter-desc">Get exclusive deals, new arrivals, and healthy snacking tips delivered to your inbox.</p>' +
              '<form class="footer-newsletter-form" id="footer-newsletter-form" novalidate>' +
                '<input type="email" class="footer-newsletter-input" placeholder="your@email.com" aria-label="Email address for newsletter" required>' +
                '<button type="submit" class="footer-newsletter-btn">Subscribe</button>' +
              '</form>' +
              '<p class="footer-newsletter-note">No spam, unsubscribe anytime.</p>' +
            '</div>' +

          '</div>' +

          /* ── Footer Bottom ── */
          '<div class="footer-bottom">' +
            '<p class="footer-copyright">&copy; ' + new Date().getFullYear() + ' <strong>BreakFit</strong>. All rights reserved.</p>' +
            '<ul class="footer-bottom-links">' +
              '<li><a href="#">Privacy Policy</a></li>' +
              '<li><a href="#">Terms of Service</a></li>' +
              '<li><a href="#">Shipping Policy</a></li>' +
            '</ul>' +
            '<div class="footer-payments">' +
              '<span class="payment-icon">UPI</span>' +
              '<span class="payment-icon">VISA</span>' +
              '<span class="payment-icon">MC</span>' +
              '<span class="payment-icon">COD</span>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</footer>';

    /* Newsletter form handler */
    var form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          if (window.ToastNotification) {
            ToastNotification.show({ message: 'Thanks for subscribing! 🎉', type: 'success' });
          }
          input.value = '';
        }
      });
    }
  }

  window.initFooter = initFooter;
})();
