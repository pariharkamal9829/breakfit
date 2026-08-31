/**
 * HeroSlider.js — BreakFit cinematic hero carousel
 * Supports: label, headline (with <em>), subtext, ctaLabel, ctaHref, badge, image
 * Adds: Ken Burns zoom, progress bar, scroll hint, proper ARIA
 */

(function () {
  'use strict';

  var _container   = null;
  var _slides      = [];
  var _current     = 0;
  var _timer       = null;
  var _paused      = false;
  var _touchStartX = 0;
  var INTERVAL     = 5500;

  function init(containerId, slides) {
    _container = document.getElementById(containerId);
    if (!_container || !slides || slides.length === 0) return;
    _slides  = slides;
    _current = 0;
    _render();
    _bindEvents();
    _startAutoplay();
  }

  function _render() {
    _container.innerHTML = '';
    _container.className = 'hero-slider';
    _container.setAttribute('role', 'region');
    _container.setAttribute('aria-label', 'Featured promotions');

    /* Slides */
    var track = document.createElement('div');
    track.className = 'hero-slider__track';

    _slides.forEach(function (slide, i) {
      var el = document.createElement('div');
      el.className = 'hero-slide' + (i === 0 ? ' hero-slide--active' : '');
      el.setAttribute('role', 'group');
      el.setAttribute('aria-roledescription', 'slide');
      el.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + _slides.length);
      el.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');

      el.innerHTML =
        /* Background */
        '<div class="hero-slide__bg">' +
          '<img src="' + slide.image + '" alt="" role="presentation" loading="' + (i === 0 ? 'eager' : 'lazy') + '" fetchpriority="' + (i === 0 ? 'high' : 'auto') + '">' +
        '</div>' +

        /* Content */
        '<div class="container hero-slide__content">' +
          '<span class="hero-slide__label">' + (slide.label || 'Premium Dry Fruits · R &amp; B Foods') + '</span>' +
          '<h1 class="hero-slide__headline">' + slide.headline + '</h1>' +
          '<p class="hero-slide__subtext">' + slide.subtext + '</p>' +
          '<div class="hero-slide__cta">' +
            '<a href="' + slide.ctaHref + '" class="btn btn--primary btn-lg">' + slide.ctaLabel + '</a>' +
            '<a href="about.html" class="btn btn-outline-white btn-lg">Our Story</a>' +
          '</div>' +
          (slide.badge
            ? '<div class="hero-slide__badge">' + slide.badge + '</div>'
            : '') +
        '</div>' +

        /* Floating stats */
        '<div class="hero-slide__stats">' +
          '<div class="hero-stat"><div class="hero-stat__value">10K+</div><div class="hero-stat__label">Happy Customers</div></div>' +
          '<div class="hero-stat"><div class="hero-stat__value">100%</div><div class="hero-stat__label">Natural</div></div>' +
          '<div class="hero-stat"><div class="hero-stat__value">14+</div><div class="hero-stat__label">Products</div></div>' +
        '</div>';

      track.appendChild(el);
    });

    _container.appendChild(track);

    /* Arrows */
    var prev = _makeBtn('hero-slider__arrow hero-slider__arrow--prev', '<i class="ri-arrow-left-s-line"></i>', 'Previous slide');
    var next = _makeBtn('hero-slider__arrow hero-slider__arrow--next', '<i class="ri-arrow-right-s-line"></i>', 'Next slide');
    _container.appendChild(prev);
    _container.appendChild(next);

    /* Dots */
    var dotsEl = document.createElement('div');
    dotsEl.className = 'hero-slider__dots';
    dotsEl.setAttribute('role', 'tablist');
    dotsEl.setAttribute('aria-label', 'Slide navigation');
    _slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'hero-slider__dot' + (i === 0 ? ' hero-slider__dot--active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dotsEl.appendChild(dot);
    });
    _container.appendChild(dotsEl);

    /* Scroll hint */
    var hint = document.createElement('div');
    hint.className = 'hero-scroll-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = '<span>Scroll</span><div class="hero-scroll-hint__icon"></div>';
    hint.addEventListener('click', function () {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    });
    _container.appendChild(hint);

    /* Progress bar */
    var prog = document.createElement('div');
    prog.className = 'hero-slider__progress';
    prog.innerHTML = '<div class="hero-slider__progress-bar" id="hero-progress-bar"></div>';
    _container.appendChild(prog);

    /* Start progress animation for first slide */
    requestAnimationFrame(function () {
      var bar = document.getElementById('hero-progress-bar');
      if (bar) {
        void bar.offsetWidth;
        bar.classList.add('animating');
      }
    });
  }

  function _makeBtn(cls, html, label) {
    var btn = document.createElement('button');
    btn.className = cls;
    btn.innerHTML = html;
    btn.setAttribute('aria-label', label);
    return btn;
  }

  function _goTo(index) {
    var slides = _container.querySelectorAll('.hero-slide');
    var dots   = _container.querySelectorAll('.hero-slider__dot');
    var prev   = _current;

    _current = (index + _slides.length) % _slides.length;
    if (_current === prev) return;

    /* Deactivate previous */
    slides[prev].classList.remove('hero-slide--active');
    slides[prev].setAttribute('aria-hidden', 'true');
    dots[prev].classList.remove('hero-slider__dot--active');
    dots[prev].setAttribute('aria-selected', 'false');

    /* Activate next */
    slides[_current].classList.add('hero-slide--active');
    slides[_current].setAttribute('aria-hidden', 'false');
    dots[_current].classList.add('hero-slider__dot--active');
    dots[_current].setAttribute('aria-selected', 'true');

    /* Re-trigger text animations */
    var animated = slides[_current].querySelectorAll(
      '.hero-slide__label, .hero-slide__headline, .hero-slide__subtext, .hero-slide__cta, .hero-slide__badge'
    );
    animated.forEach(function (el) {
      el.classList.remove('animate-in');
      void el.offsetWidth; /* force reflow */
    });
    setTimeout(function () {
      animated.forEach(function (el) { el.classList.add('animate-in'); });
    }, 40);

    /* Reset progress bar */
    var bar = document.getElementById('hero-progress-bar');
    if (bar) {
      bar.style.transition = 'none';
      bar.classList.remove('animating');
      bar.style.width = '0%';
      void bar.offsetWidth;
      bar.style.transition = '';
      bar.classList.add('animating');
    }
  }

  function next()  { _goTo(_current + 1); _restartAutoplay(); }
  function prev()  { _goTo(_current - 1); _restartAutoplay(); }
  function goTo(i) { _goTo(i);            _restartAutoplay(); }
  function pause() { _paused = true;  clearInterval(_timer); }
  function resume(){ _paused = false; _startAutoplay(); }

  function _startAutoplay() {
    clearInterval(_timer);
    if (_slides.length <= 1) return;
    _timer = setInterval(function () { if (!_paused) next(); }, INTERVAL);
  }

  function _restartAutoplay() {
    clearInterval(_timer);
    _startAutoplay();
  }

  function _bindEvents() {
    /* Arrows */
    _container.querySelector('.hero-slider__arrow--prev').addEventListener('click', prev);
    _container.querySelector('.hero-slider__arrow--next').addEventListener('click', next);

    /* Dots */
    _container.querySelectorAll('.hero-slider__dot').forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    /* Pause on hover */
    _container.addEventListener('mouseenter', pause);
    _container.addEventListener('mouseleave', resume);

    /* Pause when tab hidden */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else resume();
    });

    /* Touch swipe */
    _container.addEventListener('touchstart', function (e) {
      _touchStartX = e.touches[0].clientX;
    }, { passive: true });

    _container.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - _touchStartX;
      if (Math.abs(delta) > 50) { if (delta < 0) next(); else prev(); }
    }, { passive: true });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  window.HeroSlider = { init: init, next: next, prev: prev, goTo: goTo, pause: pause, resume: resume };
})();
