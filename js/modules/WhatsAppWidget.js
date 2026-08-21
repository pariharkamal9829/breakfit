/**
 * WhatsAppWidget.js
 * Floating WhatsApp chat button with bounce animation and tooltip.
 * Exposed as window.WhatsAppWidget (no ES modules).
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 8.5
 */

(function () {
  'use strict';

  var WIDGET_ID = 'whatsapp-widget';

  /**
   * Initialise the WhatsApp widget.
   * @param {string} phoneNumber     e.g. "919876543210"
   * @param {string} defaultMessage  e.g. "Hello! I'd like to know more about your products."
   */
  function init(phoneNumber, defaultMessage) {
    // Prevent duplicates
    if (document.getElementById(WIDGET_ID)) return;

    var encodedMsg = encodeURIComponent(defaultMessage || 'Hello! I am interested in your products.');
    var href = 'https://wa.me/' + phoneNumber + '?text=' + encodedMsg;

    var widget = document.createElement('div');
    widget.className = 'whatsapp-widget';
    widget.id = WIDGET_ID;
    widget.innerHTML =
      '<span class="whatsapp-tooltip">Chat with us</span>' +
      '<a class="whatsapp-btn" href="' + href + '" target="_blank" ' +
         'rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">' +
        '<i class="ri-whatsapp-line"></i>' +
      '</a>';

    document.body.appendChild(widget);

    // Reveal after 2 seconds with bounce
    setTimeout(function () {
      widget.classList.add('visible');
      var btn = widget.querySelector('.whatsapp-btn');
      if (btn) {
        btn.classList.add('bounce');
        setTimeout(function () {
          btn.classList.remove('bounce');
        }, 800);
      }
    }, 2000);
  }

  function show() {
    var el = document.getElementById(WIDGET_ID);
    if (el) el.classList.add('visible');
  }

  function hide() {
    var el = document.getElementById(WIDGET_ID);
    if (el) el.classList.remove('visible');
  }

  window.WhatsAppWidget = { init: init, show: show, hide: hide };
})();
