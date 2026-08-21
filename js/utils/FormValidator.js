/**
 * FormValidator.js — Form validation utility for BreakFit checkout.
 * Exposed as window.FormValidator (no ES modules).
 * Requirements: 6.2
 */
(function () {
  'use strict';

  /**
   * Validate formData against rules.
   * @param {Object} formData  — flat key/value object of field values
   * @param {Object} rules     — key: field name, value: constraint object
   *   constraints: { required, minLength, email, phone, pattern, label }
   * @returns {{ valid: boolean, errors: Object }}
   */
  function validate(formData, rules) {
    var errors = {};

    Object.keys(rules).forEach(function (field) {
      var rule  = rules[field];
      var value = (formData[field] || '').toString().trim();
      var label = rule.label || field;

      if (rule.required && !value) {
        errors[field] = label + ' is required.';
        return;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        errors[field] = label + ' must be at least ' + rule.minLength + ' characters.';
        return;
      }

      if (value && rule.email) {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(value)) {
          errors[field] = 'Please enter a valid email address.';
          return;
        }
      }

      if (value && rule.phone) {
        var phoneRe = /^[6-9]\d{9}$/;
        if (!phoneRe.test(value.replace(/[\s\-+]/g, ''))) {
          errors[field] = 'Please enter a valid 10-digit mobile number.';
          return;
        }
      }

      if (value && rule.pattern) {
        if (!rule.pattern.test(value)) {
          errors[field] = rule.patternMsg || label + ' format is invalid.';
          return;
        }
      }
    });

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  window.FormValidator = { validate: validate };
})();
