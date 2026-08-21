/**
 * HeroSlider.js
 * Full-width homepage banner carousel for BreakFit.
 * Exposed as window.HeroSlider (no ES modules).
 *
 * Requirements: 1.1, 7.3, 8.4
 */

(function () {
  'use strict';

  var _container  = null;
  var _slides     = [];
  var _current    = 0;
  var _timer      = null;
  var _paused     = false;
  var _touchStartX = 0;
  var INTERVAL    = 5000;

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

    /* Slides */
    var track = document.createElement('div');
    track.className = 'hero-slider__track';
    _slides.forEach(function (slide, i) {
      var el = document.createElement('div');
      el.className = 'hero-slide' + (i === 0 ? ' hero-slide--active' : '');
      el.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
      el.style.background = 'linear-gradient(135deg, ' + (slide.accentColor || 'var(--color-primary)') + '22 0%, var(--color-bg) 100%)';
      el.innerHTML =
        '<div class="hero-slide__bg">' +
          '<img src="' + slide.image + '" alt="" role="presentation" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
        '</div>' +
        '<div class="container hero-slide__content">' +
          '<span class="hero-slide__label" data-animate="fade-left">Premium Dry Fruits</span>' +
          '<h1 class="hero-slide__headline" data-animate="fade-left" data-delay="100">' + slide.headline + '</h1>' +
          '<p class="hero-slide__subtext" data-animate="fade-left" data-delay="200">' + slide.subtext + '</p>' +
          '<div class="hero-slide__cta" data-animate="fade-left" data-delay="300">' +
            '<a href="' + slide.ctaHref + '" class="btn btn--primary btn-lg">' + slide.ctaLabel + '</a>' +
            '<a href="about.html" class="btn btn-outline-white btn-lg">Our Story</a>' +
          '</div>' +
        '</div>';
      track.appendChild(el);
    });
    _container.appendChild(track);

    /* Prev / Next arrows */
    var prev = document.createElement('button');
    prev.className = 'hero-slider__arrow hero-slider__arrow--prev';
    prev.innerHTML = '<i class="ri-arrow-left-s-line"></i>';
    prev.setAttribute('aria-label', 'Previous slide');
    _container.appendChild(prev);

    var next = document.createElement('button');
    next.className = 'hero-slider__arrow hero-slider__arrow--next';
    next.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
    next.setAttribute('aria-label', 'Next slide');
    _container.appendChild(next);

    /* Dots */
    var dots = document.createElement('div');
    dots.className = 'hero-slider__dots';
    _slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'hero-slider__dot' + (i === 0 ? ' hero-slider__dot--active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dots.appendChild(dot);
    });
    _container.appendChild(dots);
  }

  function _goTo(index, direction) {
    var slides = _container.querySelectorAll('.hero-slide');
    var dots   = _container.querySelectorAll('.hero-slider__dot');
    var prev   = _current;

    _current = (index + _slides.length) % _slides.length;

    slides[prev].classList.remove('hero-slide--active');
    slides[prev].setAttribute('aria-hidden', 'true');
    slides[_current].classList.add('hero-slide--active');
    slides[_current].setAttribute('aria-hidden', 'false');

    dots[prev].classList.remove('hero-slider__dot--active');
    dots[_current].classList.add('hero-slider__dot--active');

    // Trigger content animations by resetting classes
    var contentEls = slides[_current].querySelectorAll('[data-animate]');
    contentEls.forEach(function (el) {
      el.classList.remove('animate-in');
      void el.offsetWidth;
      setTimeout(function () { el.classList.add('animate-in'); }, 50);
    });
  }

  function next()  { _goTo(_current + 1); _restartAutoplay(); }
  function prev()  { _goTo(_current - 1); _restartAutoplay(); }
  function goTo(i) { _goTo(i);            _restartAutoplay(); }
  function pause() { _paused = true;  clearInterval(_timer); }
  function resume(){ _paused = false; _startAutoplay(); }

  function _startAutoplay() {
    clearInterval(_timer);
    if (_slides.length <= 1) return;
    _timer = setInterval(function () {
      if (!_paused) next();
    }, INTERVAL);
  }

  function _restartAutoplay() {
    clearInterval(_timer);
    _startAutoplay();
  }

  function _bindEvents() {
    /* Arrow clicks */
    _container.querySelector('.hero-slider__arrow--prev').addEventListener('click', prev);
    _container.querySelector('.hero-slider__arrow--next').addEventListener('click', next);

    /* Dot clicks */
    _container.querySelectorAll('.hero-slider__dot').forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    /* Pause on hover */
    _container.addEventListener('mouseenter', pause);
    _container.addEventListener('mouseleave', resume);

    /* Touch swipe */
    _container.addEventListener('touchstart', function (e) {
      _touchStartX = e.touches[0].clientX;
    }, { passive: true });
    _container.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - _touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta < 0) next(); else prev();
      }
    }, { passive: true });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  window.HeroSlider = { init: init, next: next, prev: prev, goTo: goTo, pause: pause, resume: resume };
})();
