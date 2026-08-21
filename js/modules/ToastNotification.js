/**
 * ToastNotification.js
 * Non-blocking slide-in notification system for BreakFit.
 * Exposed as window.ToastNotification (no ES modules).
 *
 * Requirements: 8.3
 */

(function () {
  'use strict';

  var CONTAINER_ID = 'toast-container';

  function _getContainer() {
    var el = document.getElementById(CONTAINER_ID);
    if (!el) {
      el = document.createElement('div');
      el.id = CONTAINER_ID;
      document.body.appendChild(el);
    }
    return el;
  }

  function _iconForType(type) {
    switch (type) {
      case 'success': return '<i class="ri-checkbox-circle-line"></i>';
      case 'error':   return '<i class="ri-error-warning-line"></i>';
      default:        return '<i class="ri-information-line"></i>';
    }
  }

  /**
   * Show a toast notification.
   * @param {Object} options
   * @param {string}  options.message
   * @param {string}  [options.type="info"]      "success" | "error" | "info"
   * @param {number}  [options.duration=3000]    ms before auto-dismiss
   * @param {Object}  [options.action]           { label, href }
   * @returns {string} toastId
   */
  function show(options) {
    var opts     = options || {};
    var message  = opts.message  || '';
    var type     = opts.type     || 'info';
    var duration = typeof opts.duration === 'number' ? opts.duration : 3000;
    var action   = opts.action   || null;
    var id       = 'toast-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    var actionHTML = action
      ? '<a class="toast__action" href="' + action.href + '">' + action.label + '</a>'
      : '';

    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type + ' entering';
    toast.id = id;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<span class="toast__icon">' + _iconForType(type) + '</span>' +
      '<div class="toast__body">' +
        '<p class="toast__message">' + message + '</p>' +
      '</div>' +
      actionHTML +
      '<button class="toast__close" type="button" aria-label="Close notification">\u00D7</button>';

    _getContainer().appendChild(toast);

    // Close button
    toast.querySelector('.toast__close').addEventListener('click', function () {
      dismiss(id);
    });

    // Trigger CSS enter animation (remove class after paint)
    setTimeout(function () {
      toast.classList.remove('entering');
    }, 50);

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(function () {
        dismiss(id);
      }, duration);
    }

    return id;
  }

  /**
   * Dismiss a toast immediately with slide-out animation.
   * @param {string} id
   */
  function dismiss(id) {
    var toast = document.getElementById(id);
    if (!toast) return;
    toast.classList.add('leaving');
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 350);
  }

  window.ToastNotification = {
    show:    show,
    dismiss: dismiss
  };
})();
