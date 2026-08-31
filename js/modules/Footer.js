/**
 * Footer.js — BreakFit shared footer
 * Full rebuild: real SVG logo, FSSAI badge, payment gateway images,
 * proper legal links, contact details, visible text on dark bg.
 */
(function () {
  'use strict';

  var FOOTER_LOGO_SVG =
    '<svg class="footer-logo-svg" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="flgBg" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#1A5C33"/>' +
          '<stop offset="100%" stop-color="#0D3D20"/>' +
        '</linearGradient>' +
        '<linearGradient id="flgGold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#D4A853"/>' +
          '<stop offset="100%" stop-color="#B8903A"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="52" height="52" rx="12" fill="url(#flgBg)"/>' +
      '<text x="7" y="36" font-family="Georgia,serif" font-size="28" font-weight="700" fill="url(#flgGold)" letter-spacing="-1">3</text>' +
      '<text x="26" y="36" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#fff" letter-spacing="-1">F</text>' +
      '<circle cx="44" cy="12" r="3" fill="#D4A853" opacity="0.8"/>' +
      '<line x1="7" y1="43" x2="45" y2="43" stroke="#D4A853" stroke-width="1" stroke-opacity="0.5"/>' +
    '</svg>';

  function initFooter() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    container.innerHTML =
      '<footer class="site-footer">' +
        '<div class="container">' +

          /* ── Footer Top ── */
          '<div class="footer-top">' +

            /* ── Brand column ── */
            '<div class="footer-brand">' +
              '<a href="index.html" class="footer-logo" aria-label="BreakFit home">' +
                FOOTER_LOGO_SVG +
                '<div class="footer-logo-text">' +
                  '<span class="footer-logo-name">BreakFit</span>' +
                  '<span class="footer-logo-tagline">Start Your Day The Better Way</span>' +
                '</div>' +
              '</a>' +
              '<p class="footer-brand-desc">Premium dry fruits &amp; nuts sourced directly from the world\'s finest farms. Fresh, natural, no preservatives — delivered across India by R &amp; B Foods, Mumbai.</p>' +
              '<div class="footer-contact-mini">' +
                '<a href="tel:+918237619015" class="footer-contact-link"><i class="ri-phone-line"></i> 8237619015</a>' +
                '<a href="tel:+919323242591" class="footer-contact-link"><i class="ri-phone-line"></i> 9323242591</a>' +
                '<a href="mailto:breakfit0@gmail.com" class="footer-contact-link"><i class="ri-mail-line"></i> breakfit0@gmail.com</a>' +
              '</div>' +
              '<div class="footer-social">' +
                '<a href="https://www.instagram.com/breakfit.in" target="_blank" rel="noopener" class="social-btn social-btn--instagram" aria-label="Instagram">'+
                  '<i class="ri-instagram-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--facebook" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>' +
                '<a href="https://wa.me/919323242591" target="_blank" rel="noopener" class="social-btn social-btn--whatsapp" aria-label="WhatsApp">'+
                  '<i class="ri-whatsapp-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--youtube" aria-label="YouTube"><i class="ri-youtube-line"></i></a>' +
              '</div>' +
              /* FSSAI badge */
              '<div class="footer-fssai">' +
                '<div class="fssai-badge-footer">' +
                  '<span class="fssai-f">FSSAI</span>' +
                  '<span class="fssai-l">Licensed</span>' +
                '</div>' +
                '<p class="fssai-note">Licensed under FSSAI.<br>Food Safety &amp; Standards Authority of India.</p>' +
              '</div>' +
            '</div>' +

            /* ── Quick Links ── */
            '<div class="footer-col">' +
              '<h4>Quick Links</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="index.html"            class="footer-link"><i class="ri-arrow-right-s-line"></i>Home</a></li>' +
                '<li><a href="categories.html"       class="footer-link"><i class="ri-arrow-right-s-line"></i>Shop All</a></li>' +
                '<li><a href="about.html"            class="footer-link"><i class="ri-arrow-right-s-line"></i>About Us</a></li>' +
                '<li><a href="cart.html"             class="footer-link"><i class="ri-arrow-right-s-line"></i>My Cart</a></li>' +
                '<li><a href="checkout.html"         class="footer-link"><i class="ri-arrow-right-s-line"></i>Checkout</a></li>' +
                '<li><a href="privacy-policy.html"   class="footer-link"><i class="ri-arrow-right-s-line"></i>Privacy Policy</a></li>' +
                '<li><a href="refund-policy.html"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Refund Policy</a></li>' +
                '<li><a href="shipping-policy.html"  class="footer-link"><i class="ri-arrow-right-s-line"></i>Shipping Policy</a></li>' +
              '</ul>' +
            '</div>' +

            /* ── Categories ── */
            '<div class="footer-col">' +
              '<h4>Our Products</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="categories.html?category=cashews"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Cashews (Kaju)</a></li>' +
                '<li><a href="categories.html?category=almonds"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Almonds (Badam)</a></li>' +
                '<li><a href="categories.html?category=walnuts"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Walnuts (Akhrot)</a></li>' +
                '<li><a href="categories.html?category=raisins"    class="footer-link"><i class="ri-arrow-right-s-line"></i>Raisins (Kishmish)</a></li>' +
                '<li><a href="categories.html?category=dates"      class="footer-link"><i class="ri-arrow-right-s-line"></i>Dates (Khajur)</a></li>' +
                '<li><a href="categories.html?category=mixed-nuts" class="footer-link"><i class="ri-arrow-right-s-line"></i>Mixed Nuts &amp; Blends</a></li>' +
              '</ul>' +
            '</div>' +

            /* ── Newsletter ── */
            '<div class="footer-col footer-col--newsletter">' +
              '<h4>Stay in the Loop</h4>' +
              '<p class="footer-newsletter-desc">Get exclusive deals, early access to new arrivals, and healthy snacking tips.</p>' +
              '<form class="footer-newsletter-form" id="footer-newsletter-form" novalidate>' +
                '<input type="email" class="footer-newsletter-input" placeholder="your@email.com" aria-label="Email for newsletter" required>' +
                '<button type="submit" class="footer-newsletter-btn">Subscribe</button>' +
              '</form>' +
              '<p class="footer-newsletter-note"><i class="ri-shield-check-line"></i> No spam, unsubscribe anytime.</p>' +
              /* Payment gateways */
              '<div class="footer-gateway-title">We Accept</div>' +
              '<div class="footer-payment-logos">' +
                '<div class="pay-logo pay-logo--upi"><span>UPI</span></div>' +
                '<div class="pay-logo pay-logo--gpay"><i class="ri-google-line"></i>Pay</div>' +
                '<div class="pay-logo pay-logo--phonepe">PhonePe</div>' +
                '<div class="pay-logo pay-logo--paytm">Paytm</div>' +
                '<div class="pay-logo pay-logo--visa">VISA</div>' +
                '<div class="pay-logo pay-logo--mc">MC</div>' +
                '<div class="pay-logo pay-logo--cod"><i class="ri-money-rupee-circle-line"></i>COD</div>' +
              '</div>' +
            '</div>' +

          '</div>' +

          /* ── Footer Bottom ── */
          '<div class="footer-bottom">' +
            '<p class="footer-copyright">&copy; ' + new Date().getFullYear() + ' <strong>BreakFit / R &amp; B Foods</strong>. All rights reserved.</p>' +
            '<ul class="footer-bottom-links">' +
              '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
              '<li><a href="refund-policy.html">Refund Policy</a></li>' +
              '<li><a href="shipping-policy.html">Shipping Policy</a></li>' +
            '</ul>' +
            '<p class="footer-address"><i class="ri-map-pin-line"></i> 73 Shiv Prasad Bldg, Kalbadevi, Mumbai 400002</p>' +
          '</div>' +

        '</div>' +
      '</footer>';

    var form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          if (window.ToastNotification) ToastNotification.show({ message: 'Thanks for subscribing! 🎉', type: 'success' });
          input.value = '';
        }
      });
    }
  }

  window.initFooter = initFooter;
})();
