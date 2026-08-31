/**
 * categories.js — Categories page controller
 * Requirements: 1.2, 2.6
 */
(function () {
  'use strict';

  var _activeFilters = { category: null, minPrice: null, maxPrice: null, minRating: null, inStockOnly: false, sortBy: '' };

  function _getCategoryFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get('category') || null;
  }

  function _renderCategoryPills() {
    var bar = document.getElementById('cat-pills');
    if (!bar || !window.CATEGORIES) return;
    CATEGORIES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'cat-pill' + (_activeFilters.category === cat.slug || (cat.slug === 'all' && !_activeFilters.category) ? ' active' : '');
      btn.textContent = cat.name;
      btn.dataset.slug = cat.slug;
      btn.addEventListener('click', function () {
        _activeFilters.category = cat.slug === 'all' ? null : cat.slug;
        document.querySelectorAll('.cat-pill').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        _renderProducts();
      });
      bar.appendChild(btn);
    });
  }

  function _renderFilterCategories() {
    var container = document.getElementById('filter-categories');
    if (!container || !window.CATEGORIES) return;
    CATEGORIES.filter(function (c) { return c.slug !== 'all'; }).forEach(function (cat) {
      var label = document.createElement('label');
      label.className = 'filter-cat-label';
      label.innerHTML = '<input type="radio" name="filter-cat" value="' + cat.slug + '"' + (_activeFilters.category === cat.slug ? ' checked' : '') + '> ' + cat.name + ' <span style="margin-left:auto;color:var(--color-text-muted);font-size:11px">(' + cat.productCount + ')</span>';
      label.querySelector('input').addEventListener('change', function () {
        _activeFilters.category = this.value;
        _syncCategoryPills();
        _renderProducts();
      });
      container.appendChild(label);
    });
  }

  function _renderFilterRatings() {
    var container = document.getElementById('filter-ratings');
    if (!container) return;
    [4, 3, 2].forEach(function (r) {
      var label = document.createElement('label');
      label.className = 'rating-filter-label';
      label.innerHTML = '<input type="radio" name="filter-rating" value="' + r + '"> ' + r + '★ &amp; above';
      label.querySelector('input').addEventListener('change', function () {
        _activeFilters.minRating = parseInt(this.value);
        _renderProducts();
      });
      container.appendChild(label);
    });
  }

  function _syncCategoryPills() {
    document.querySelectorAll('.cat-pill').forEach(function (p) {
      var active = _activeFilters.category === p.dataset.slug || (!_activeFilters.category && p.dataset.slug === 'all');
      p.classList.toggle('active', active);
    });
  }

  function _bindFilterControls() {
    var sortSelect = document.getElementById('sort-select');
    var minPrice   = document.getElementById('filter-min-price');
    var maxPrice   = document.getElementById('filter-max-price');
    var inStock    = document.getElementById('filter-in-stock');
    var clearBtn   = document.getElementById('clear-filters-btn');
    var noResultsReset = document.getElementById('no-results-reset');
    var filterToggle = document.getElementById('filter-toggle-btn');
    var sidebar = document.getElementById('filter-sidebar');

    if (sortSelect) sortSelect.addEventListener('change', function () { _activeFilters.sortBy = this.value; _renderProducts(); });
    if (minPrice)   minPrice.addEventListener('input',  function () { _activeFilters.minPrice = this.value ? parseFloat(this.value) : null; _renderProducts(); });
    if (maxPrice)   maxPrice.addEventListener('input',  function () { _activeFilters.maxPrice = this.value ? parseFloat(this.value) : null; _renderProducts(); });
    if (inStock)    inStock.addEventListener('change',  function () { _activeFilters.inStockOnly = this.checked; _renderProducts(); });

    function resetFilters() {
      _activeFilters = { category: null, minPrice: null, maxPrice: null, minRating: null, inStockOnly: false, sortBy: '' };
      if (sortSelect) sortSelect.value = '';
      if (minPrice)   minPrice.value = '';
      if (maxPrice)   maxPrice.value = '';
      if (inStock)    inStock.checked = false;
      document.querySelectorAll('input[name="filter-cat"]').forEach(function (r) { r.checked = false; });
      document.querySelectorAll('input[name="filter-rating"]').forEach(function (r) { r.checked = false; });
      _syncCategoryPills();
      _renderProducts();
    }

    if (clearBtn)       clearBtn.addEventListener('click', resetFilters);
    if (noResultsReset) noResultsReset.addEventListener('click', resetFilters);
    if (filterToggle && sidebar) {
      filterToggle.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    }
  }

  function _renderProducts() {
    var grid = document.getElementById('products-grid');
    var noResults = document.getElementById('no-results');
    var countEl = document.getElementById('results-count');
    if (!grid || !window.PRODUCTS) return;

    var filtered = filterProducts(PRODUCTS, _activeFilters);
    grid.innerHTML = '';

    if (filtered.length === 0) {
      if (noResults) noResults.style.display = 'block';
    } else {
      if (noResults) noResults.style.display = 'none';
      filtered.forEach(function (product) {
        ProductCard.render(product, grid);
      });
      initScrollAnimations();
    }

    if (countEl) countEl.textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '') + ' found';
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initFooter();
    WhatsAppWidget.init('919323242591', 'Hello BreakFit! I have a question about your products.');

    var fromURL = _getCategoryFromURL();
    if (fromURL) _activeFilters.category = fromURL;

    _renderCategoryPills();
    _renderFilterCategories();
    _renderFilterRatings();
    _bindFilterControls();
    _renderProducts();
    initScrollAnimations();
  });
})();
