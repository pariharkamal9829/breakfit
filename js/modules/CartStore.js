/**
 * CartStore.js
 * Centralized cart state manager backed by localStorage.
 * Exposes window.CartStore for use via plain <script> tags (no ES modules).
 *
 * localStorage key: "breakfit_cart"
 * Dispatches "cart:updated" CustomEvent on document after every mutation.
 */

(function () {
  "use strict";

  var STORAGE_KEY = "breakfit_cart";

  /**
   * Read cart from localStorage.
   * Always returns an array — never throws.
   * @returns {Array} CartItem[]
   */
  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Persist cart array to localStorage.
   * @param {Array} cart
   */
  function _saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  /**
   * Dispatch "cart:updated" on document with current cart state.
   * @param {Array} cart
   */
  function _dispatch(cart) {
    var event = new CustomEvent("cart:updated", {
      detail: {
        cart: cart,
        count: _sumQuantities(cart),
      },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  /**
   * Sum all item quantities in a cart array.
   * @param {Array} cart
   * @returns {number}
   */
  function _sumQuantities(cart) {
    return cart.reduce(function (acc, item) {
      return acc + (item.quantity || 0);
    }, 0);
  }

  /**
   * Add an item to the cart.
   * Cart Merge Algorithm: if an entry with the same (id + variant) already
   * exists, increment its quantity; otherwise append the new item.
   *
   * @param {{ id: string, name: string, price: number, quantity: number,
   *           variant: string, image: string, slug: string }} item
   */
  function addItem(item) {
    var cart = getCart();
    var existingIndex = -1;

    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id && cart[i].variant === item.variant) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    _saveCart(cart);
    _dispatch(cart);
  }

  /**
   * Remove all entries matching (id, variant) from the cart.
   * @param {string} id
   * @param {string} variant
   */
  function removeItem(id, variant) {
    var cart = getCart().filter(function (item) {
      return !(item.id === id && item.variant === variant);
    });

    _saveCart(cart);
    _dispatch(cart);
  }

  /**
   * Update the quantity of a specific cart entry.
   * If qty <= 0, the item is removed entirely.
   * @param {string} id
   * @param {string} variant
   * @param {number} qty
   */
  function updateQuantity(id, variant, qty) {
    if (qty <= 0) {
      removeItem(id, variant);
      return;
    }

    var cart = getCart();

    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id && cart[i].variant === variant) {
        cart[i].quantity = qty;
        break;
      }
    }

    _saveCart(cart);
    _dispatch(cart);
  }

  /**
   * Empty the cart completely.
   */
  function clearCart() {
    var cart = [];
    _saveCart(cart);
    _dispatch(cart);
  }

  /**
   * Total number of individual items (sum of all quantities).
   * @returns {number}
   */
  function getItemCount() {
    return _sumQuantities(getCart());
  }

  /**
   * Sum of (price × quantity) for every cart item, rounded to 2 decimal places.
   * @returns {number}
   */
  function getSubtotal() {
    var total = getCart().reduce(function (acc, item) {
      return acc + item.price * item.quantity;
    }, 0);
    return Math.round(total * 100) / 100;
  }

  /**
   * Subtotal plus an optional shipping cost.
   * @param {number} [shippingCost=0]
   * @returns {number}
   */
  function getTotal(shippingCost) {
    var shipping = typeof shippingCost === "number" ? shippingCost : 0;
    return getSubtotal() + shipping;
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  window.CartStore = {
    getCart: getCart,
    addItem: addItem,
    removeItem: removeItem,
    updateQuantity: updateQuantity,
    clearCart: clearCart,
    getItemCount: getItemCount,
    getSubtotal: getSubtotal,
    getTotal: getTotal,
  };
})();
