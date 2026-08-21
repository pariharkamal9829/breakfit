// BreakFit Utility Functions

// --- Toast Notifications ---
const Toast = (() => {
  let container;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:12px;pointer-events:none;';
      document.body.appendChild(container);
    }
    return container;
  }

  function show({ message, type = 'success', duration = 3500, action }) {
    const toast = document.createElement('div');
    const iconMap = { success: '✓', error: '✕', info: 'ℹ' };
    const colorMap = { success: '#27AE60', error: '#C0392B', info: '#2980B9' };
    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px 18px;box-shadow:0 8px 32px rgba(0,0,0,0.15);border-left:4px solid ${colorMap[type]};pointer-events:all;min-width:280px;max-width:360px;animation:toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1);">
        <span style="width:28px;height:28px;border-radius:50%;background:${colorMap[type]};color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">${iconMap[type]}</span>
        <span style="flex:1;font-size:14px;font-weight:500;color:#1A1208;">${message}</span>
        ${action ? `<a href="${action.href}" style="font-size:13px;font-weight:700;color:${colorMap[type]};text-decoration:none;white-space:nowrap;">${action.label}</a>` : ''}
      </div>`;
    getContainer().appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  return { show };
})();

// Inject toast keyframes
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes toast-in { from { opacity:0; transform:translateX(60px) scale(0.9); } to { opacity:1; transform:none; } }
@keyframes toast-out { to { opacity:0; transform:translateX(60px); } }
`;
document.head.appendChild(styleEl);

// --- Star Rating Renderer ---
function renderStars(rating, showText = true) {
  const full = Math.floor(rating);
  const half = (rating - full) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '<div class="star-rating">';
  for (let i = 0; i < full; i++) html += '<span class="star full">★</span>';
  if (half) html += '<span class="star half">★</span>';
  for (let i = 0; i < empty; i++) html += '<span class="star empty">☆</span>';
  if (showText) html += `<span class="rating-text">${rating.toFixed(1)}</span>`;
  html += '</div>';
  return html;
}

// --- Format Price (INR) ---
function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// --- Scroll Animation Observer ---
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// --- Render Product Card ---
function renderProductCard(product, addToCartCb) {
  const primaryVariant = product.variants[0];
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const badgeColors = { New: 'badge-new', Sale: 'badge-sale', Bestseller: 'badge-bestseller', Organic: 'badge-organic' };
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-animate', 'pop-in');
  card.innerHTML = `
    <div class="product-card__image-wrap">
      <a href="product.html?id=${product.id}">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" class="product-card__img">
      </a>
      ${product.badge ? `<span class="badge ${badgeColors[product.badge] || 'badge-new'} product-card__badge">${product.badge}</span>` : ''}
      ${discount ? `<span class="product-card__discount">-${discount}%</span>` : ''}
      <button class="product-card__wishlist btn btn-icon" aria-label="Add to wishlist">♡</button>
      <button class="product-card__quick-add btn btn-primary btn-sm" data-id="${product.id}">Quick Add</button>
    </div>
    <div class="product-card__body">
      <p class="product-card__category">${product.category.replace('-', ' ')}</p>
      <h3 class="product-card__name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
      <div class="product-card__rating">${renderStars(product.rating)} <span class="text-muted text-sm">(${product.reviewCount})</span></div>
      <div class="product-card__footer">
        <div class="product-card__price">
          <span class="price-current">${formatPrice(primaryVariant.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">
          <span>🛒</span> Add
        </button>
      </div>
    </div>`;
  // Events
  card.querySelectorAll('.add-to-cart-btn, .product-card__quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      CartStore.addItem({ id: product.id, name: product.name, price: primaryVariant.price, quantity: 1, variant: primaryVariant.label, image: product.images[0], slug: product.slug });
      Toast.show({ message: `${product.name} added to cart!`, type: 'success', action: { label: 'View Cart', href: 'cart.html' } });
      if (addToCartCb) addToCartCb(product);
    });
  });
  return card;
}

// --- WhatsApp Widget ---
function initWhatsApp(phone = '919999999999', message = 'Hi! I need help with my order on BreakFit.') {
  const widget = document.getElementById('whatsapp-widget');
  if (!widget) return;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  widget.href = url;
  widget.setAttribute('target', '_blank');
  widget.setAttribute('rel', 'noopener noreferrer');
  setTimeout(() => widget.classList.add('visible'), 2000);
}

// --- Header scroll effect ---
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }
  // Announcement bar close
  const closeBar = document.querySelector('.close-bar');
  const bar = document.querySelector('.announcement-bar');
  if (closeBar && bar) closeBar.addEventListener('click', () => bar.remove());
  // Search bar toggle
  const searchBtn = document.querySelector('.search-action');
  const searchBar = document.querySelector('.search-bar');
  const searchClose = document.querySelector('.search-close');
  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', () => searchBar.classList.add('open'));
    searchClose?.addEventListener('click', () => searchBar.classList.remove('open'));
  }
  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => { mobileNav.classList.add('open'); overlay?.classList.add('active'); });
    [mobileClose, overlay].forEach(el => el?.addEventListener('click', () => { mobileNav.classList.remove('open'); overlay?.classList.remove('active'); }));
  }
  // Init cart badge
  CartStore.updateAllBadges();
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollAnimations();
  initWhatsApp();
});
