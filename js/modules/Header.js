/**
 * Header.js — BreakFit
 * Logo: BF monogram matching business card
 *   - Cream/off-white rounded background
 *   - Large dark-green "B" (elegant serif — the curved strokes
 *     of the B resemble a 3 in the original logo font)
 *   - Gold "F" beside it
 *   - Small leaf curl below B
 *   - Wheat grain stalk along the bottom edge
 * WA: 919887494512
 */
(function () {
  'use strict';

  var BUSINESS_WA = '919887494512';

  var NAV_LINKS = [
    { href: 'index.html',      label: 'Home',  icon: 'ri-home-line'        },
    { href: 'categories.html', label: 'Shop',  icon: 'ri-store-2-line'     },
    { href: 'about.html',      label: 'About', icon: 'ri-information-line' }
  ];

  /* ─────────────────────────────────────────────────────────────
     BF MONOGRAM SVG
     Matches business card: cream bg, large green B, gold F,
     leaf curl, wheat stalk along bottom.
     The B is drawn as a path so it matches the bold-serif
     style from the card (curved top/bottom bowls = looks like 3).
  ───────────────────────────────────────────────────────────── */
  function _makeLogo(svgClass, gradIds) {
    var bg   = gradIds + 'Bg';
    var gold = gradIds + 'Gold';
    return (
      '<svg class="' + svgClass + '" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="' + bg + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#F7F2E8"/>' +
            '<stop offset="100%" stop-color="#EDE5D0"/>' +
          '</linearGradient>' +
          '<linearGradient id="' + gold + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#C9973A"/>' +
            '<stop offset="100%" stop-color="#A8792A"/>' +
          '</linearGradient>' +
        '</defs>' +

        /* Cream rounded background */
        '<rect width="64" height="64" rx="14" fill="url(#' + bg + ')"/>' +
        /* Thin gold border */
        '<rect width="64" height="64" rx="14" fill="none" stroke="url(#' + gold + ')" stroke-width="1.5" stroke-opacity="0.55"/>' +

        /* ── Large green "B" as bold serif text ──
           Using a font-weight 900 Georgia B — the thick curved strokes
           of a bold serif B at this size visually mirror the business card logo. */
        '<text' +
          ' x="4" y="46"' +
          ' font-family="Georgia,\'Times New Roman\',serif"' +
          ' font-size="46"' +
          ' font-weight="900"' +
          ' fill="#1A5C33"' +
          ' letter-spacing="-2">B</text>' +

        /* ── Gold "F" — slightly smaller, offset right ── */
        '<text' +
          ' x="34" y="46"' +
          ' font-family="Georgia,\'Times New Roman\',serif"' +
          ' font-size="34"' +
          ' font-weight="700"' +
          ' fill="url(#' + gold + ')"' +
          ' letter-spacing="-1">F</text>' +

        /* ── Leaf curl below the B (matches card) ── */
        '<path d="M5 52 Q9 47 15 50 Q11 55 5 52Z"' +
          ' fill="#1A5C33" opacity="0.70"/>' +
        '<path d="M6 52 Q9 54 14 52"' +
          ' stroke="#1A5C33" stroke-width="0.8" fill="none"' +
          ' stroke-linecap="round" opacity="0.55"/>' +

        /* ── Wheat stalk line ── */
        '<line x1="4" y1="57" x2="60" y2="57"' +
          ' stroke="url(#' + gold + ')" stroke-width="1"' +
          ' stroke-opacity="0.45" stroke-linecap="round"/>' +
        /* Grain seeds */
        '<ellipse cx="10"  cy="55.5" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(-18 10  55.5)"/>' +
        '<ellipse cx="18"  cy="54.8" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(-8  18  54.8)"/>' +
        '<ellipse cx="26"  cy="54.6" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50"/>' +
        '<ellipse cx="34"  cy="54.6" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(8   34  54.6)"/>' +
        '<ellipse cx="42"  cy="55.0" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.50" transform="rotate(16  42  55.0)"/>' +
        '<ellipse cx="50"  cy="55.5" rx="2.4" ry="1.1" fill="#C9973A" opacity="0.45" transform="rotate(24  50  55.5)"/>' +

      '</svg>'
    );
  }

  var LOGO_SVG        = _makeLogo('logo-svg',        'lg');
  var FOOTER_LOGO_SVG = _makeLogo('footer-logo-svg', 'flg');

  /* expose for Footer.js */
  window._BF_FOOTER_LOGO_SVG = FOOTER_LOGO_SVG;

  /* ── helpers ── */
  function _getActivePage() {
    var file = window.location.pathname.split('/').pop() || 'index.html';
    return file === '' ? 'index.html' : file;
  }

  function _buildNavLinks() {
    var active = _getActivePage();
    return NAV_LINKS.map(function (link) {
      return '<li class="nav-item"><a href="' + link.href + '" class="nav-link' +
        (active === link.href ? ' active' : '') + '">' + link.label + '</a></li>';
    }).join('');
  }

  function _buildDrawerLinks() {
    var active = _getActivePage();
    return NAV_LINKS.map(function (link) {
      return '<li><a href="' + link.href + '" class="nav-drawer__link' +
        (active === link.href ? ' active' : '') + '">' +
        '<i class="' + link.icon + '"></i>' + link.label + '</a></li>';
    }).join('');
  }

  function initHeader() {
    var container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML =
      '<header class="site-header" id="main-header">' +
        '<div class="header-inner container">' +
          '<a href="index.html" class="site-logo" aria-label="BreakFit home">' +
            '<div class="logo-icon" aria-hidden="true">' + LOGO_SVG + '</div>' +
            '<div class="logo-text">' +
              '<span class="logo-name">BreakFit</span>' +
              '<span class="logo-tagline">Start Your Day The Better Way</span>' +
            '</div>' +
          '</a>' +
          '<nav class="nav-primary" aria-label="Main navigation">' +
            '<ul class="nav-list">' + _buildNavLinks() + '</ul>' +
          '</nav>' +
          '<div class="header-actions">' +
            '<a href="cart.html" class="action-btn action-btn--cart" aria-label="Shopping cart">' +
              '<i class="ri-shopping-cart-line"></i>' +
              '<span class="cart-badge" id="cart-badge" style="display:none">0</span>' +
            '</a>' +
            '<button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">' +
              '<div class="hamburger-bars">' +
                '<span class="hamburger-bar"></span>' +
                '<span class="hamburger-bar"></span>' +
                '<span class="hamburger-bar"></span>' +
              '</div>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +

      '<div class="nav-overlay" id="nav-overlay" aria-hidden="true"></div>' +
      '<nav class="nav-drawer" id="nav-drawer" aria-label="Mobile navigation">' +
        '<div class="nav-drawer__header">' +
          '<a href="index.html" class="site-logo">' +
            '<div class="logo-icon" aria-hidden="true">' + LOGO_SVG + '</div>' +
            '<div class="logo-text">' +
              '<span class="logo-name">BreakFit</span>' +
              '<span class="logo-tagline">R &amp; B Foods</span>' +
            '</div>' +
          '</a>' +
          '<button class="nav-drawer__close" id="drawer-close" aria-label="Close menu">&#10005;</button>' +
        '</div>' +
        '<div class="nav-drawer__body">' +
          '<ul class="nav-drawer__list">' + _buildDrawerLinks() + '</ul>' +
          '<div class="nav-drawer__divider"></div>' +
          '<ul class="nav-drawer__list">' +
            '<li><a href="cart.html" class="nav-drawer__link">' +
              '<i class="ri-shopping-cart-line"></i>Cart' +
              '<span id="drawer-cart-badge" class="drawer-cart-count">0</span>' +
            '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="nav-drawer__footer">' +
          '<div class="drawer-brand">A Brand by <strong>R &amp; B Foods</strong></div>' +
          '<div class="drawer-contact">📞 8237619015 &nbsp;|&nbsp; 9887494512</div>' +
        '</div>' +
      '</nav>';

    _bindEvents();
    _updateCartBadge();
    _handleScrollShadow();
    document.addEventListener('cart:updated', _updateCartBadge);
  }

  function _updateCartBadge() {
    var count = (window.CartStore && window.CartStore.getItemCount) ? window.CartStore.getItemCount() : 0;
    var badge       = document.getElementById('cart-badge');
    var drawerBadge = document.getElementById('drawer-cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.remove('bump');
      void badge.offsetWidth;
      if (count > 0) badge.classList.add('bump');
    }
    if (drawerBadge) {
      drawerBadge.textContent = count;
      drawerBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  function _bindEvents() {
    var menuToggle  = document.getElementById('menu-toggle');
    var drawerClose = document.getElementById('drawer-close');
    var overlay     = document.getElementById('nav-overlay');
    function open()  { document.body.classList.add('nav-open');    if (menuToggle) menuToggle.setAttribute('aria-expanded','true');  }
    function close() { document.body.classList.remove('nav-open'); if (menuToggle) menuToggle.setAttribute('aria-expanded','false'); }
    if (menuToggle)  menuToggle.addEventListener('click', open);
    if (drawerClose) drawerClose.addEventListener('click', close);
    if (overlay)     overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function _handleScrollShadow() {
    var header = document.getElementById('main-header');
    if (!header) return;
    function onScroll() { header.classList.toggle('header--scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  window.initHeader = initHeader;
})();
