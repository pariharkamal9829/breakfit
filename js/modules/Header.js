/**
 * Header.js
 * Shared navigation bar renderer for all BreakFit pages.
 * Exposed as window.initHeader (no ES modules).
 *
 * Requirements: 1.7, 3.3, 7.2
 */

(function () {
  'use strict';

  var NAV_LINKS = [
    { href: 'index.html',      label: 'Home',  icon: 'ri-home-line'         },
    { href: 'categories.html', label: 'Shop',  icon: 'ri-store-2-line'      },
    { href: 'about.html',      label: 'About', icon: 'ri-information-line'  },
  ];

  /* ── BreakFit SVG Logo (authentic 3F monogram style) ── */
  var LOGO_SVG =
    '<svg class="logo-svg" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="lgBg" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#1A5C33"/>' +
          '<stop offset="100%" stop-color="#0D3D20"/>' +
        '</linearGradient>' +
        '<linearGradient id="lgGold" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#D4A853"/>' +
          '<stop offset="100%" stop-color="#B8903A"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="52" height="52" rx="12" fill="url(#lgBg)"/>' +
      '<!-- 3 numeral -->' +
      '<text x="7" y="36" font-family="Georgia,serif" font-size="28" font-weight="700" fill="url(#lgGold)" letter-spacing="-1">3</text>' +
      '<!-- F letter -->' +
      '<text x="26" y="36" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#fff" letter-spacing="-1">F</text>' +
      '<!-- decorative leaf dot -->' +
      '<circle cx="44" cy="12" r="3" fill="#D4A853" opacity="0.8"/>' +
      '<circle cx="44" cy="12" r="1.5" fill="#fff" opacity="0.6"/>' +
      '<!-- bottom wheat line -->' +
      '<line x1="7" y1="43" x2="45" y2="43" stroke="#D4A853" stroke-width="1" stroke-opacity="0.5"/>' +
    '</svg>';

  function _getActivePage() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    return file === '' ? 'index.html' : file;
  }

  function _buildNavLinks() {
    var active = _getActivePage();
    return NAV_LINKS.map(function (link) {
      var isActive = active === link.href;
      return '<li class="nav-item">' +
        '<a href="' + link.href + '" class="nav-link' + (isActive ? ' active' : '') + '">' +
          link.label +
        '</a>' +
      '</li>';
    }).join('');
  }

  function _buildDrawerLinks() {
    var active = _getActivePage();
    return NAV_LINKS.map(function (link) {
      var isActive = active === link.href;
      return '<li>' +
        '<a href="' + link.href + '" class="nav-drawer__link' + (isActive ? ' active' : '') + '">' +
          '<i class="' + link.icon + '"></i>' +
          link.label +
        '</a>' +
      '</li>';
    }).join('');
  }

  function initHeader() {
    var container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML =
      '<header class="site-header" id="main-header">' +
        '<div class="header-inner container">' +

          /* ── Logo ── */
          '<a href="index.html" class="site-logo" aria-label="BreakFit home">' +
            '<div class="logo-icon" aria-hidden="true">' + LOGO_SVG + '</div>' +
            '<div class="logo-text">' +
              '<span class="logo-name">BreakFit</span>' +
              '<span class="logo-tagline">Start Your Day The Better Way</span>' +
            '</div>' +
          '</a>' +

          /* ── Desktop Nav ── */
          '<nav class="nav-primary" aria-label="Main navigation">' +
            '<ul class="nav-list">' + _buildNavLinks() + '</ul>' +
          '</nav>' +

          /* ── Actions ── */
          '<div class="header-actions">' +
            '<a href="cart.html" class="action-btn action-btn--cart" aria-label="Shopping cart">' +
              '<i class="ri-shopping-cart-line"></i>' +
              '<span class="cart-badge" id="cart-badge" style="display:none">0</span>' +
            '</a>' +
            '<button class="menu-toggle" id="menu-toggle" aria-label="Open navigation menu" aria-expanded="false">' +
              '<div class="hamburger-bars">' +
                '<span class="hamburger-bar"></span>' +
                '<span class="hamburger-bar"></span>' +
                '<span class="hamburger-bar"></span>' +
              '</div>' +
            '</button>' +
          '</div>' +

        '</div>' +
      '</header>' +

      /* ── Mobile Drawer ── */
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
          '<button class="nav-drawer__close" id="drawer-close" aria-label="Close navigation menu">&#10005;</button>' +
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
          '<div class="drawer-contact">📞 8237619015 &nbsp;|&nbsp; 9323242591</div>' +
        '</div>' +
      '</nav>';

    _bindEvents();
    _updateCartBadge();
    _handleScrollShadow();

    document.addEventListener('cart:updated', function () {
      _updateCartBadge();
    });
  }

  function _updateCartBadge() {
    var count = (window.CartStore && window.CartStore.getItemCount) ? window.CartStore.getItemCount() : 0;
    var badge = document.getElementById('cart-badge');
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

    function openDrawer() {
      document.body.classList.add('nav-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }
    function closeDrawer() {
      document.body.classList.remove('nav-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle)  menuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay)     overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function _handleScrollShadow() {
    var header = document.getElementById('main-header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  window.initHeader = initHeader;
})();
