/**
 * ProductGallery.js — Multi-image gallery with thumbnails, zoom, and swipe.
 * Exposed as window.ProductGallery (no ES modules).
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */
(function () {
  'use strict';

  var _images = [];
  var _current = 0;
  var _container = null;
  var _mainImg = null;
  var _thumbs = null;
  var _touchStartX = 0;

  function init(images, containerId) {
    _images = images || [];
    _current = 0;
    _container = document.getElementById(containerId);
    if (!_container || _images.length === 0) return;

    _container.innerHTML =
      '<div class="gallery">' +
        '<div class="gallery__main-wrapper">' +
          '<button class="gallery__arrow gallery__arrow--prev" aria-label="Previous image"><i class="ri-arrow-left-s-line"></i></button>' +
          '<img class="gallery__main-img" id="gallery-main-img" src="' + _images[0] + '" alt="Product image" loading="eager">' +
          '<button class="gallery__arrow gallery__arrow--next" aria-label="Next image"><i class="ri-arrow-right-s-line"></i></button>' +
        '</div>' +
        '<div class="gallery__thumbs" id="gallery-thumbs"></div>' +
      '</div>';

    var thumbsEl = _container.querySelector('#gallery-thumbs');
    _mainImg = _container.querySelector('#gallery-main-img');
    _thumbs = thumbsEl;

    _images.forEach(function (src, i) {
      var thumb = document.createElement('button');
      thumb.className = 'gallery__thumb' + (i === 0 ? ' gallery__thumb--active' : '');
      thumb.innerHTML = '<img src="' + src + '" alt="Product view ' + (i + 1) + '" loading="lazy">';
      thumb.addEventListener('click', function () { setActiveImage(i); });
      thumbsEl.appendChild(thumb);
    });

    // Arrows
    _container.querySelector('.gallery__arrow--prev').addEventListener('click', prevImage);
    _container.querySelector('.gallery__arrow--next').addEventListener('click', nextImage);

    // Click main image to open lightbox
    _mainImg.addEventListener('click', function () { openZoom(_current); });
    _mainImg.style.cursor = 'zoom-in';

    // Touch swipe
    _mainImg.addEventListener('touchstart', function (e) { _touchStartX = e.touches[0].clientX; }, { passive: true });
    _mainImg.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - _touchStartX;
      if (Math.abs(delta) > 40) { if (delta < 0) nextImage(); else prevImage(); }
    }, { passive: true });
  }

  function setActiveImage(index) {
    if (!_mainImg) return;
    _current = (index + _images.length) % _images.length;
    _mainImg.style.opacity = '0';
    _mainImg.style.transition = 'opacity 0.25s ease';
    setTimeout(function () {
      _mainImg.src = _images[_current];
      _mainImg.style.opacity = '1';
    }, 200);
    if (_thumbs) {
      _thumbs.querySelectorAll('.gallery__thumb').forEach(function (t, i) {
        t.classList.toggle('gallery__thumb--active', i === _current);
      });
    }
  }

  function nextImage() { setActiveImage(_current + 1); }
  function prevImage() { setActiveImage(_current - 1); }

  function openZoom(index) {
    var src = _images[index || 0];
    var overlay = document.createElement('div');
    overlay.className = 'gallery-lightbox';
    overlay.innerHTML =
      '<div class="gallery-lightbox__backdrop"></div>' +
      '<div class="gallery-lightbox__content">' +
        '<button class="gallery-lightbox__close" aria-label="Close zoom"><i class="ri-close-line"></i></button>' +
        '<img src="' + src + '" alt="Product zoom">' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(function () { overlay.classList.add('gallery-lightbox--open'); }, 10);

    function close() {
      overlay.classList.remove('gallery-lightbox--open');
      setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); document.body.style.overflow = ''; }, 300);
    }
    overlay.querySelector('.gallery-lightbox__backdrop').addEventListener('click', close);
    overlay.querySelector('.gallery-lightbox__close').addEventListener('click', close);
    document.addEventListener('keydown', function onKey(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } });
  }

  function closeZoom() {
    var lb = document.querySelector('.gallery-lightbox');
    if (lb && lb.parentNode) lb.parentNode.removeChild(lb);
    document.body.style.overflow = '';
  }

  window.ProductGallery = { init: init, setActiveImage: setActiveImage, nextImage: nextImage, prevImage: prevImage, openZoom: openZoom, closeZoom: closeZoom };
})();
