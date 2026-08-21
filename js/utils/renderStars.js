/**
 * renderStars.js
 * Star rating renderer utility for BreakFit
 * Exposed as window.renderStars and window.renderStarsWithCount (no ES modules)
 *
 * Validates: Requirements 5.4, 12.4
 */

(function () {
  /**
   * Clamp and sanitize a rating value.
   * - NaN  → 0
   * - < 0  → 0
   * - > 5  → 5
   *
   * @param {*} rating
   * @returns {number} sanitized rating in [0, 5]
   */
  function sanitizeRating(rating) {
    var n = parseFloat(rating);
    if (isNaN(n)) return 0;
    if (n < 0) return 0;
    if (n > 5) return 5;
    return n;
  }

  /**
   * Build the inner star HTML string for a given rating.
   * Uses the Star Rating Render Algorithm from the design document.
   *
   * @param {number} rating  - sanitized value in [0, 5]
   * @returns {string}       - HTML string of <span> star elements
   */
  function buildStarHTML(rating) {
    var full  = Math.floor(rating);
    var half  = (rating - full) >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;

    var html = '';
    var i;

    for (i = 0; i < full; i++) {
      html += '<span class="star full">★</span>';
    }

    if (half === 1) {
      html += '<span class="star half">★</span>';
    }

    for (i = 0; i < empty; i++) {
      html += '<span class="star empty">☆</span>';
    }

    return html;
  }

  /**
   * Render a star-rating widget.
   *
   * @param {number} rating  - any numeric value (clamped to [0, 5], NaN → 0)
   * @returns {string}       - complete HTML string for the rating widget
   *
   * Example output:
   *   <div class="star-rating" aria-label="Rating: 4.5 out of 5">
   *     <span class="star full">★</span> × 4
   *     <span class="star half">★</span> × 1
   *   </div>
   */
  function renderStars(rating) {
    var safeRating = sanitizeRating(rating);
    var starsHTML  = buildStarHTML(safeRating);

    return (
      '<div class="star-rating" aria-label="Rating: ' + safeRating + ' out of 5">' +
        starsHTML +
      '</div>'
    );
  }

  /**
   * Render a star-rating widget followed by a review-count badge.
   *
   * @param {number} rating  - any numeric value (clamped to [0, 5], NaN → 0)
   * @param {number} count   - number of reviews to display
   * @returns {string}       - HTML string: stars div + count span
   *
   * Example output:
   *   <div class="star-rating" aria-label="Rating: 4.5 out of 5">…</div>
   *   <span class="rating-text">(128)</span>
   */
  function renderStarsWithCount(rating, count) {
    return renderStars(rating) + '<span class="rating-text">(' + count + ')</span>';
  }

  // Expose on window (plain-JS, no ES modules)
  window.renderStars          = renderStars;
  window.renderStarsWithCount = renderStarsWithCount;
})();
