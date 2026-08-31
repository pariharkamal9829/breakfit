/**
 * ReviewsSection.js — Auto-sliding review carousel + write-a-review form.
 * Exposed as window.ReviewsSection (no ES modules).
 */
(function () {
  'use strict';

  var _sliderTimer = null;
  var _sliderCurrent = 0;

  function init(productId, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var reviews = (window.REVIEWS || []).filter(function (r) { return r.productId === productId; });

    container.innerHTML =
      '<div class="reviews-section">' +
        '<div class="reviews-layout">' +
          /* Left: summary + breakdown */
          '<div class="reviews-left">' +
            '<h2 class="reviews-section__title">Customer Reviews</h2>' +
            '<div id="reviews-summary"></div>' +
          '</div>' +
          /* Right: slider */
          '<div class="reviews-right">' +
            '<div class="reviews-slider" id="reviews-slider">' +
              '<div class="reviews-slider__track" id="reviews-slider-track"></div>' +
              '<div class="reviews-slider__nav">' +
                '<button class="reviews-slider__btn" id="rev-prev" aria-label="Previous review"><i class="ri-arrow-left-s-line"></i></button>' +
                '<div class="reviews-slider__dots" id="rev-dots"></div>' +
                '<button class="reviews-slider__btn" id="rev-next" aria-label="Next review"><i class="ri-arrow-right-s-line"></i></button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Write review form */
        '<div class="reviews-form-wrap">' +
          '<h3><i class="ri-pencil-line"></i> Write a Review</h3>' +
          '<form id="review-form" novalidate>' +
            '<div class="form-grid">' +
              '<div class="form-group">' +
                '<label class="form-label" for="review-name">Your Name *</label>' +
                '<input type="text" id="review-name" class="form-control" placeholder="Enter your name" required>' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label">Your Rating *</label>' +
                '<div class="star-picker" id="star-picker" role="group" aria-label="Select rating"></div>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="review-title">Review Title *</label>' +
              '<input type="text" id="review-title" class="form-control" placeholder="Summarise your experience" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="review-body">Your Review *</label>' +
              '<textarea id="review-body" class="form-control" rows="4" placeholder="Share your experience with this product..." required></textarea>' +
            '</div>' +
            '<button type="submit" class="btn btn--primary"><i class="ri-send-plane-line"></i> Submit Review</button>' +
          '</form>' +
        '</div>' +
      '</div>';

    _renderSummary(reviews);
    _renderSlider(reviews);
    _initStarPicker();
    _bindForm(productId, reviews);
  }

  function _renderSummary(reviews) {
    var el = document.getElementById('reviews-summary');
    if (!el) return;
    if (!reviews.length) { el.innerHTML = '<p class="text-muted" style="font-size:var(--text-sm)">No reviews yet.</p>'; return; }

    var avg = reviews.reduce(function (a, r) { return a + r.rating; }, 0) / reviews.length;
    var counts = [0, 0, 0, 0, 0];
    reviews.forEach(function (r) { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });

    var barsHTML = '';
    for (var s = 5; s >= 1; s--) {
      var pct = Math.round((counts[s - 1] / reviews.length) * 100);
      barsHTML +=
        '<div class="rating-bar-row">' +
          '<span class="rating-bar-label">' + s + '★</span>' +
          '<div class="rating-bar-track"><div class="rating-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<span class="rating-bar-count">' + counts[s - 1] + '</span>' +
        '</div>';
    }

    el.innerHTML =
      '<div class="reviews-avg">' +
        '<span class="reviews-avg__score">' + avg.toFixed(1) + '</span>' +
        '<div class="reviews-avg__stars">' + (window.renderStars ? renderStars(avg) : '') + '</div>' +
        '<span class="reviews-avg__count">' + reviews.length + ' review' + (reviews.length !== 1 ? 's' : '') + '</span>' +
      '</div>' +
      '<div class="rating-bars">' + barsHTML + '</div>';
  }

  function _renderSlider(reviews) {
    var track  = document.getElementById('reviews-slider-track');
    var dotsEl = document.getElementById('rev-dots');
    if (!track) return;

    if (!reviews.length) {
      track.innerHTML = '<div class="review-card review-card--empty"><i class="ri-chat-smile-2-line"></i><p>Be the first to review this product!</p></div>';
      return;
    }

    /* Build cards */
    track.innerHTML = reviews.map(function (r, i) {
      var dateStr = new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      var stars   = window.renderStars ? renderStars(r.rating) : '';
      var verified = r.verified
        ? '<span class="review-verified"><i class="ri-shield-check-fill"></i> Verified Purchase</span>'
        : '';
      return '<div class="review-card' + (i === 0 ? ' review-card--active' : '') + '" data-index="' + i + '">' +
        '<div class="review-card__top">' +
          '<div class="review-card__header">' +
            '<img src="' + r.avatar + '" alt="' + sanitizeHTML(r.author) + '" class="review-card__avatar" loading="lazy">' +
            '<div>' +
              '<strong class="review-card__author">' + sanitizeHTML(r.author) + '</strong>' +
              '<div class="review-card__rating">' + stars + verified + '</div>' +
            '</div>' +
          '</div>' +
          '<span class="review-card__date">' + dateStr + '</span>' +
        '</div>' +
        '<h4 class="review-card__title">"' + sanitizeHTML(r.title) + '"</h4>' +
        '<p class="review-card__body">' + sanitizeHTML(r.body) + '</p>' +
      '</div>';
    }).join('');

    /* Build dots */
    if (dotsEl) {
      dotsEl.innerHTML = reviews.map(function (_, i) {
        return '<button class="rev-dot' + (i === 0 ? ' rev-dot--active' : '') + '" data-index="' + i + '" aria-label="Review ' + (i+1) + '"></button>';
      }).join('');

      dotsEl.querySelectorAll('.rev-dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          _goToReview(parseInt(this.dataset.index), reviews.length);
          _restartAutoSlide(reviews.length);
        });
      });
    }

    /* Arrows */
    var prevBtn = document.getElementById('rev-prev');
    var nextBtn = document.getElementById('rev-next');
    if (prevBtn) prevBtn.addEventListener('click', function () {
      _goToReview((_sliderCurrent - 1 + reviews.length) % reviews.length, reviews.length);
      _restartAutoSlide(reviews.length);
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      _goToReview((_sliderCurrent + 1) % reviews.length, reviews.length);
      _restartAutoSlide(reviews.length);
    });

    /* Touch swipe */
    var slider = document.getElementById('reviews-slider');
    var startX = 0;
    if (slider) {
      slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
          _goToReview(dx < 0
            ? (_sliderCurrent + 1) % reviews.length
            : (_sliderCurrent - 1 + reviews.length) % reviews.length,
            reviews.length);
          _restartAutoSlide(reviews.length);
        }
      }, { passive: true });
    }

    /* Auto-slide every 4s */
    _startAutoSlide(reviews.length);
  }

  function _goToReview(index, total) {
    var track  = document.getElementById('reviews-slider-track');
    var dotsEl = document.getElementById('rev-dots');
    if (!track) return;

    var prev = _sliderCurrent;
    _sliderCurrent = index;

    var cards = track.querySelectorAll('.review-card');
    cards.forEach(function (c, i) {
      c.classList.remove('review-card--active', 'review-card--exit-left', 'review-card--exit-right', 'review-card--enter-left', 'review-card--enter-right');
      if (i === index) {
        c.classList.add(index > prev ? 'review-card--enter-right' : 'review-card--enter-left');
        requestAnimationFrame(function () { c.classList.add('review-card--active'); });
      } else if (i === prev) {
        c.classList.add(index > prev ? 'review-card--exit-left' : 'review-card--exit-right');
      }
    });

    if (dotsEl) {
      dotsEl.querySelectorAll('.rev-dot').forEach(function (d, i) {
        d.classList.toggle('rev-dot--active', i === index);
      });
    }
  }

  function _startAutoSlide(total) {
    clearInterval(_sliderTimer);
    if (total <= 1) return;
    _sliderTimer = setInterval(function () {
      _goToReview((_sliderCurrent + 1) % total, total);
    }, 4000);
  }

  function _restartAutoSlide(total) {
    clearInterval(_sliderTimer);
    _startAutoSlide(total);
  }

  var _pickedRating = 0;

  function _initStarPicker() {
    var picker = document.getElementById('star-picker');
    if (!picker) return;
    for (var i = 1; i <= 5; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'star-pick-btn';
      btn.dataset.rating = String(i);
      btn.innerHTML = '★';
      btn.setAttribute('aria-label', i + ' star');
      btn.addEventListener('click', (function (rating) {
        return function () {
          _pickedRating = rating;
          picker.querySelectorAll('.star-pick-btn').forEach(function (b) {
            b.classList.toggle('active', parseInt(b.dataset.rating) <= rating);
          });
        };
      })(i));
      picker.appendChild(btn);
    }
  }

  function _bindForm(productId, reviews) {
    var form = document.getElementById('review-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameVal  = form.querySelector('#review-name').value.trim();
      var titleVal = form.querySelector('#review-title').value.trim();
      var bodyVal  = form.querySelector('#review-body').value.trim();

      if (!nameVal || !titleVal || !bodyVal || !_pickedRating) {
        if (window.ToastNotification) ToastNotification.show({ message: 'Please fill all fields and select a rating.', type: 'error' });
        return;
      }

      var newReview = {
        id: 'rv-' + Date.now(),
        productId: productId,
        author: nameVal,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nameVal) + '&background=1A5C33&color=fff&size=60',
        rating: _pickedRating,
        title: titleVal,
        body: bodyVal,
        date: new Date().toISOString(),
        verified: false
      };
      reviews.unshift(newReview);
      _renderSummary(reviews);
      _renderSlider(reviews);
      form.reset();
      _pickedRating = 0;
      document.querySelectorAll('.star-pick-btn').forEach(function (b) { b.classList.remove('active'); });
      if (window.ToastNotification) ToastNotification.show({ message: '✅ Review submitted! Thank you.', type: 'success' });
    });
  }

  window.ReviewsSection = { init: init };
})();
