// BreakFit CartStore — localStorage-backed cart state manager
const CartStore = (() => {
  const STORAGE_KEY = 'breakfit_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    updateAllBadges();
  }

  function addItem(item) {
    const cart = getCart();
    const idx = cart.findIndex(c => c.id === item.id && c.variant === item.variant);
    if (idx >= 0) {
      cart[idx].quantity += item.quantity;
    } else {
      cart.push({ ...item });
    }
    saveCart(cart);
  }

  function removeItem(id, variant) {
    saveCart(getCart().filter(c => !(c.id === id && c.variant === variant)));
  }

  function updateQuantity(id, variant, qty) {
    const cart = getCart();
    const idx = cart.findIndex(c => c.id === id && c.variant === variant);
    if (idx >= 0) {
      if (qty <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx].quantity = qty;
      }
    }
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getItemCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  }

  function getSubtotal() {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getTotal(shippingCost = 0, discount = 0) {
    return Math.max(0, getSubtotal() + shippingCost - discount);
  }

  function updateAllBadges() {
    const count = getItemCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      el.classList.remove('bump');
      void el.offsetWidth; // reflow
      el.classList.add('bump');
    });
  }

  return { getCart, addItem, removeItem, updateQuantity, clearCart, getItemCount, getSubtotal, getTotal, updateAllBadges };
})();
