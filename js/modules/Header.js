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
    { href: 'index.html',      label: 'Home',       icon: 'ri-home-line'         },
    { href: 'categories.html', label: 'Shop',        icon: 'ri-store-2-line'      },
    { href: 'about.html',      label: 'About',       icon: 'ri-information-line'  },
  ];

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
            '<div class="logo-icon" aria-hidden="true">🥜</div>' +
            '<div class="logo-text">' +
              '<span class="logo-name">BreakFit</span>' +
              '<span class="logo-tagline">Premium Dry Fruits</span>' +
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
              '<span class="cart-badge" id="cart-badge">0</span>' +
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
            '<div class="logo-icon" aria-hidden="true">🥜</div>' +
            '<div class="logo-text">' +
              '<span class="logo-name">BreakFit</span>' +
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
              '<span id="drawer-cart-badge" style="margin-left:auto;background:var(--color-secondary);color:#fff;border-radius:9999px;font-size:11px;font-weight:700;padding:2px 8px;">0</span>' +
            '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="nav-drawer__footer">Premium Dry Fruits & Nuts</div>' +
      '</nav>';

    _bindEvents();
    _updateCartBadge();
    _handleScrollShadow();

    // Listen for cart updates on this page
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
      // Bump animation
      badge.classList.remove('bump');
      void badge.offsetWidth; // reflow
      if (count > 0) badge.classList.add('bump');
    }
    if (drawerBadge) {
      drawerBadge.textContent = count;
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

    // Escape key closes drawer
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
