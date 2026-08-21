/**
 * QuantitySelector.js
 * Accessible +/- quantity input component for BreakFit.
 * Exposed as window.QuantitySelector (no ES modules).
 *
 * Requirements: 3.4, 7.6
 */

(function () {
  'use strict';

  /**
   * Create a quantity selector inside a container element.
   * @param {string} containerId  ID of the container element
   * @param {number} [initial=1]  Starting value
   * @param {number} [min=1]      Minimum value (inclusive)
   * @param {number} [max=99]     Maximum value (inclusive)
   * @returns {Object} Instance with getValue / setValue / onChange / destroy
   */
  function init(containerId, initial, min, max) {
    var container = document.getElementById(containerId);
    if (!container) {
      console.warn('QuantitySelector: container #' + containerId + ' not found.');
      return null;
    }

    var _min      = typeof min     === 'number' ? min     : 1;
    var _max      = typeof max     === 'number' ? max     : 99;
    var _value    = typeof initial === 'number' ? Math.min(Math.max(initial, _min), _max) : _min;
    var _callbacks = [];

    // Render HTML
    container.innerHTML =
      '<div class="qty-selector" role="group" aria-label="Quantity selector">' +
        '<button class="qty-btn qty-btn--minus" type="button" ' +
                'style="min-width:44px;min-height:44px" ' +
                'aria-label="Decrease quantity">&#8722;</button>' +
        '<input class="qty-input" type="number" ' +
               'min="' + _min + '" max="' + _max + '" value="' + _value + '" ' +
               'readonly aria-label="Quantity" aria-live="polite">' +
        '<button class="qty-btn qty-btn--plus" type="button" ' +
                'style="min-width:44px;min-height:44px" ' +
                'aria-label="Increase quantity">&#43;</button>' +
      '</div>';

    var minusBtn = container.querySelector('.qty-btn--minus');
    var plusBtn  = container.querySelector('.qty-btn--plus');
    var input    = container.querySelector('.qty-input');

    function _updateUI() {
      input.value = _value;
      // Disable at bounds
      if (_value <= _min) {
        minusBtn.setAttribute('disabled', 'true');
        minusBtn.classList.add('qty-btn--disabled');
      } else {
        minusBtn.removeAttribute('disabled');
        minusBtn.classList.remove('qty-btn--disabled');
      }
      if (_value >= _max) {
        plusBtn.setAttribute('disabled', 'true');
        plusBtn.classList.add('qty-btn--disabled');
      } else {
        plusBtn.removeAttribute('disabled');
        plusBtn.classList.remove('qty-btn--disabled');
      }
    }

    function _notify() {
      _callbacks.forEach(function (cb) { cb(_value); });
    }

    function _onMinus() {
      if (_value > _min) {
        _value--;
        _updateUI();
        _notify();
      }
    }

    function _onPlus() {
      if (_value < _max) {
        _value++;
        _updateUI();
        _notify();
      }
    }

    minusBtn.addEventListener('click', _onMinus);
    plusBtn.addEventListener('click', _onPlus);

    // Init UI state
    _updateUI();

    // Public instance API
    var instance = {
      getValue: function () { return _value; },
      setValue: function (n) {
        _value = Math.min(Math.max(n, _min), _max);
        _updateUI();
        _notify();
      },
      onChange: function (callback) {
        if (typeof callback === 'function') _callbacks.push(callback);
      },
      destroy: function () {
        minusBtn.removeEventListener('click', _onMinus);
        plusBtn.removeEventListener('click', _onPlus);
        _callbacks = [];
      }
    };

    return instance;
  }

  window.QuantitySelector = { init: init };
})();
