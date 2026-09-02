/**
 * Footer.js — BreakFit
 * Uses BF monogram logo from Header.js (window._BF_FOOTER_LOGO_SVG)
 * Mobile: collapsible accordion columns
 */
(function () {
  'use strict';

  function _getLogoSVG() {
    /* Reuse the footer logo built in Header.js if available */
    if (window._BF_FOOTER_LOGO_SVG) return window._BF_FOOTER_LOGO_SVG;
    /* Fallback inline copy */
    return (
      '<svg class="footer-logo-svg" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="flgBg2" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#F7F2E8"/><stop offset="100%" stop-color="#EDE5D0"/>' +
          '</linearGradient>' +
          '<linearGradient id="flgGold3" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#C9973A"/><stop offset="100%" stop-color="#A8792A"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="64" height="64" rx="14" fill="url(#flgBg2)"/>' +
        '<rect width="64" height="64" rx="14" fill="none" stroke="url(#flgGold3)" stroke-width="1.5" stroke-opacity="0.55"/>' +
        '<text x="4" y="46" font-family="Georgia,serif" font-size="46" font-weight="900" fill="#1A5C33" letter-spacing="-2">B</text>' +
        '<text x="34" y="46" font-family="Georgia,serif" font-size="34" font-weight="700" fill="url(#flgGold3)" letter-spacing="-1">F</text>' +
        '<path d="M5 52 Q9 47 15 50 Q11 55 5 52Z" fill="#1A5C33" opacity="0.70"/>' +
        '<line x1="4" y1="57" x2="60" y2="57" stroke="#C9973A" stroke-width="1" stroke-opacity="0.45"/>' +
        '<ellipse cx="10" cy="55.5" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(-18 10 55.5)"/>' +
        '<ellipse cx="20" cy="54.8" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50"/>' +
        '<ellipse cx="30" cy="54.6" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50"/>' +
        '<ellipse cx="40" cy="55.0" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(16 40 55)"/>' +
        '<ellipse cx="50" cy="55.5" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.45" transform="rotate(24 50 55.5)"/>' +
      '</svg>'
    );
  }

  /* Build an accordion column */
  function _acCol(id, title, bodyHTML, extraClass) {
    return (
      '<div class="footer-col' + (extraClass ? ' ' + extraClass : '') + '">' +
        '<button class="footer-col__toggle" aria-expanded="false" aria-controls="fcb-' + id + '" data-fc-toggle>' +
          '<span>' + title + '</span>' +
          '<i class="ri-add-line footer-col__arrow"></i>' +
        '</button>' +
        '<div class="footer-col__body" id="fcb-' + id + '" hidden>' +
          bodyHTML +
        '</div>' +
      '</div>'
    );
  }

  function initFooter() {
    var container = document.getElementById('site-footer');
    if (!container) return;

    var LOGO = _getLogoSVG();

    var quickLinksHTML =
      '<ul class="footer-links">' +
        '<li><a href="index.html"           class="footer-link"><i class="ri-arrow-right-s-line"></i>Home</a></li>' +
        '<li><a href="categories.html"      class="footer-link"><i class="ri-arrow-right-s-line"></i>Shop All</a></li>' +
        '<li><a href="about.html"           class="footer-link"><i class="ri-arrow-right-s-line"></i>About Us</a></li>' +
        '<li><a href="cart.html"            class="footer-link"><i class="ri-arrow-right-s-line"></i>My Cart</a></li>' +
        '<li><a href="privacy-policy.html"  class="footer-link"><i class="ri-arrow-right-s-line"></i>Privacy Policy</a></li>' +
        '<li><a href="refund-policy.html"   class="footer-link"><i class="ri-arrow-right-s-line"></i>Refund Policy</a></li>' +
        '<li><a href="shipping-policy.html" class="footer-link"><i class="ri-arrow-right-s-line"></i>Shipping Policy</a></li>' +
      '</ul>';

    var productsHTML =
      '<ul class="footer-links">' +
        '<li><a href="categories.html?category=muesli"  class="footer-link"><i class="ri-arrow-right-s-line"></i>Muesli</a></li>' +
        '<li><a href="categories.html?category=edamame" class="footer-link"><i class="ri-arrow-right-s-line"></i>Edamame Beans</a></li>' +
      '</ul>';

    var newsletterHTML =
      '<p class="footer-newsletter-desc">Get exclusive deals, new arrivals, and healthy snacking tips.</p>' +
      '<form class="footer-newsletter-form" id="footer-newsletter-form" novalidate>' +
        '<input type="email" class="footer-newsletter-input" placeholder="your@email.com" aria-label="Email" required>' +
        '<button type="submit" class="footer-newsletter-btn">Subscribe</button>' +
      '</form>' +
      '<p class="footer-newsletter-note"><i class="ri-shield-check-line"></i> No spam, unsubscribe anytime.</p>' +
      '<div class="footer-gateway-title">We Accept</div>' +
      '<div class="footer-payment-logos">' +
        '<div class="pay-logo pay-logo--upi">UPI</div>' +
        '<div class="pay-logo pay-logo--cod"><i class="ri-money-rupee-circle-line"></i>COD</div>' +
      '</div>';

    container.innerHTML =
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="footer-top">' +

            /* ── Brand — always visible ── */
            '<div class="footer-brand">' +
              '<a href="index.html" class="footer-logo" aria-label="BreakFit home">' +
                LOGO +
                '<div class="footer-logo-text">' +
                  '<span class="footer-logo-name">BreakFit</span>' +
                  '<span class="footer-logo-tagline">Start Your Day The Better Way</span>' +
                '</div>' +
              '</a>' +
              '<p class="footer-brand-desc">Premium healthy snacks — fresh, natural, no preservatives. Delivered across India by R &amp; B Foods, Mumbai.</p>' +
              '<div class="footer-contact-mini">' +
                '<a href="tel:+918237619015" class="footer-contact-link"><i class="ri-phone-line"></i>8237619015 (Rahul)</a>' +
                '<a href="tel:+919887494512" class="footer-contact-link"><i class="ri-phone-line"></i>9887494512</a>' +
                '<a href="mailto:breakfit0@gmail.com" class="footer-contact-link"><i class="ri-mail-line"></i>breakfit0@gmail.com</a>' +
              '</div>' +
              '<div class="footer-social">' +
                '<a href="https://www.instagram.com/breakfit.in" target="_blank" rel="noopener" class="social-btn social-btn--instagram" aria-label="Instagram"><i class="ri-instagram-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--facebook" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>' +
                '<a href="https://wa.me/919887494512" target="_blank" rel="noopener" class="social-btn social-btn--whatsapp" aria-label="WhatsApp"><i class="ri-whatsapp-line"></i></a>' +
                '<a href="#" class="social-btn social-btn--youtube" aria-label="YouTube"><i class="ri-youtube-line"></i></a>' +
              '</div>' +
              '<div class="footer-fssai">' +
                '<div class="fssai-badge-footer"><span class="fssai-f">FSSAI</span><span class="fssai-l">Licensed</span></div>' +
                '<p class="fssai-note">Licensed under FSSAI.<br>Food Safety &amp; Standards Authority of India.</p>' +
              '</div>' +
            '</div>' +

            /* Accordion columns */
            _acCol('links',      'Quick Links',      quickLinksHTML) +
            _acCol('products',   'Our Products',     productsHTML) +
            _acCol('newsletter', 'Stay in the Loop', newsletterHTML, 'footer-col--newsletter') +

          '</div>' +

          '<div class="footer-bottom">' +
            '<p class="footer-copyright">&copy; ' + new Date().getFullYear() + ' <strong>BreakFit / R &amp; B Foods</strong>. All rights reserved.</p>' +
            '<ul class="footer-bottom-links">' +
              '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
              '<li><a href="refund-policy.html">Refund Policy</a></li>' +
              '<li><a href="shipping-policy.html">Shipping Policy</a></li>' +
            '</ul>' +
            '<p class="footer-address"><i class="ri-map-pin-line"></i>73 Shiv Prasad Bldg, Kalbadevi, Mumbai 400002</p>' +
          '</div>' +

        '</div>' +
      '</footer>';

    /* Newsletter */
    var form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          if (window.ToastNotification) ToastNotification.show({ message: 'Thanks for subscribing! \uD83C\uDF89', type: 'success' });
          input.value = '';
        }
      });
    }

    _bindAccordion();
  }

  function _bindAccordion() {
    document.querySelectorAll('[data-fc-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.innerWidth > 600) return;
        var body   = document.getElementById(btn.getAttribute('aria-controls'));
        var icon   = btn.querySelector('.footer-col__arrow');
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          requestAnimationFrame(function () { body.style.maxHeight = '0'; });
          btn.setAttribute('aria-expanded', 'false');
          if (icon) icon.className = 'ri-add-line footer-col__arrow';
          setTimeout(function () { body.hidden = true; body.style.maxHeight = ''; }, 320);
        } else {
          body.hidden = false;
          body.style.maxHeight = '0';
          requestAnimationFrame(function () { body.style.maxHeight = body.scrollHeight + 'px'; });
          btn.setAttribute('aria-expanded', 'true');
          if (icon) icon.className = 'ri-subtract-line footer-col__arrow';
          setTimeout(function () { body.style.maxHeight = ''; }, 320);
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 600) {
        document.querySelectorAll('[data-fc-toggle]').forEach(function (btn) {
          var body = document.getElementById(btn.getAttribute('aria-controls'));
          if (body) { body.hidden = false; body.style.maxHeight = ''; }
          btn.setAttribute('aria-expanded', 'false');
          var icon = btn.querySelector('.footer-col__arrow');
          if (icon) icon.className = 'ri-add-line footer-col__arrow';
        });
      }
    }, { passive: true });
  }

  window.initFooter = initFooter;
})();
