/**
 * sanitize.js — HTML sanitization utility
 * Escapes special characters to prevent XSS when injecting into innerHTML.
 *
 * Exposed as: window.sanitizeHTML
 * Requirement: 6.4
 */

(function () {
  'use strict';

  /**
   * Escapes a string for safe innerHTML injection.
   *
   * Handles:
   *   &  →  &amp;
   *   <  →  &lt;
   *   >  →  &gt;
   *   "  →  &quot;
   *   '  →  &#x27;
   *
   * @param {*} str - Value to escape. Non-strings are coerced via String().
   *                  null / undefined return ''.
   * @returns {string} The escaped string.
   */
  function sanitizeHTML(str) {
    // Treat null / undefined as empty
    if (str === null || str === undefined) {
      return '';
    }

    // Coerce non-strings
    if (typeof str !== 'string') {
      str = String(str);
    }

    return str
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#x27;');
  }

  // Expose globally
  window.sanitizeHTML = sanitizeHTML;
})();
