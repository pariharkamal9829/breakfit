/**
 * BreakFit — Product Filter Utility
 * js/utils/filterProducts.js
 *
 * Loaded via <script> tag (no ES modules / bundler).
 * Exposes window.filterProducts and window.getFilteredCount globally.
 *
 * Requirements: 2.6, 12.5
 */

/**
 * Filter and sort a products array based on the given filters object.
 *
 * @param {Array}  products - Array of Product objects (not mutated)
 * @param {Object} filters  - Filter criteria:
 *   {
 *     category:    string|null  — product.category to match, or "all"/null to skip
 *     minPrice:    number|null  — minimum price (inclusive)
 *     maxPrice:    number|null  — maximum price (inclusive)
 *     minRating:   number|null  — minimum rating (inclusive)
 *     inStockOnly: boolean      — when true, exclude out-of-stock products
 *     sortBy:      string       — "price-asc" | "price-desc" | "rating" | "newest" | default
 *   }
 * @returns {Array} New filtered and sorted array of Product objects
 */
function filterProducts(products, filters) {
  if (!Array.isArray(products)) return [];

  // Normalise filters — treat missing/undefined fields as null/false
  var f = filters || {};
  var category    = f.category    != null ? f.category    : null;
  var minPrice    = f.minPrice    != null ? f.minPrice    : null;
  var maxPrice    = f.maxPrice    != null ? f.maxPrice    : null;
  var minRating   = f.minRating   != null ? f.minRating   : null;
  var inStockOnly = f.inStockOnly === true;
  var sortBy      = f.sortBy      || '';

  // 1. Start with a shallow copy so the input array is never mutated
  var result = products.slice();

  // 2. Category filter — skip when null or "all"
  if (category !== null && category !== 'all') {
    result = result.filter(function (p) {
      return p.category === category;
    });
  }

  // 3. Minimum price filter
  if (minPrice !== null) {
    result = result.filter(function (p) {
      return p.price >= minPrice;
    });
  }

  // 4. Maximum price filter
  if (maxPrice !== null) {
    result = result.filter(function (p) {
      return p.price <= maxPrice;
    });
  }

  // 5. Minimum rating filter
  if (minRating !== null) {
    result = result.filter(function (p) {
      return p.rating >= minRating;
    });
  }

  // 6. In-stock filter
  if (inStockOnly) {
    result = result.filter(function (p) {
      return p.inStock === true;
    });
  }

  // 7. Sort
  // Array.prototype.sort is not guaranteed stable in all browsers, but
  // for the "newest" sort we only compare ids, so no secondary key needed.
  switch (sortBy) {
    case 'price-asc':
      result.sort(function (a, b) { return a.price - b.price; });
      break;

    case 'price-desc':
      result.sort(function (a, b) { return b.price - a.price; });
      break;

    case 'rating':
      result.sort(function (a, b) { return b.rating - a.rating; });
      break;

    case 'newest':
      // Sort by id descending (string comparison — "bf-014" > "bf-001")
      result.sort(function (a, b) {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return  1;
        return 0;
      });
      break;

    default:
      // Default: featured DESC, then rating DESC
      result.sort(function (a, b) {
        // featured true (1) before false (0)
        var featuredDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        if (featuredDiff !== 0) return featuredDiff;
        return b.rating - a.rating;
      });
      break;
  }

  return result;
}

/**
 * Return the count of products that match the given filters.
 * Useful for showing "X results found" UI without rendering cards.
 *
 * @param {Array}  products - Array of Product objects
 * @param {Object} filters  - Same filters object as filterProducts()
 * @returns {number} Number of matching products
 */
function getFilteredCount(products, filters) {
  return filterProducts(products, filters).length;
}

// Expose on window for use across all pages (no ES modules)
window.filterProducts    = filterProducts;
window.getFilteredCount  = getFilteredCount;
