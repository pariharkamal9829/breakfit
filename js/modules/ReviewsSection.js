/**
 * ReviewsSection.js — Product reviews with star breakdown, sorting, submission.
 * Exposed as window.ReviewsSection (no ES modules).
 * Requirements: 5.1, 5.2, 5.3, 5.5, 6.4
 */
(function () {
  'use strict';

  function init(productId, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var reviews = (window.REVIEWS || []).filter(function (r) { return r.productId === productId; });

    container.innerHTML =
      '<div class="reviews-section">' +
        '<h2 class="reviews-section__title">Customer Reviews</h2>' +
        '<div class="reviews-top">' +
          '<div class="reviews-summary" id="reviews-summary"></div>' +
          '<div class="reviews-sort">' +
            '<label for="reviews-sort-sel">Sort by:</label>' +
            '<select id="reviews-sort-sel">' +
              '<option value="recent">Most Recent</option>' +
              '<option value="high">Highest Rating</option>' +
              '<option value="low">Lowest Rating</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div id="reviews-list"></div>' +
        '<div class="reviews-form-wrap">' +
          '<h3>Write a Review</h3>' +
          '<form id="review-form" novalidate>' +
            '<div class="form-grid">' +
              '<div class="form-group">' +
                '<label class="form-label" for="review-name">Your Name *</label>' +
                '<input type="text" id="review-name" class="form-control" placeholder="Enter your name" required>' +
                '<span class="form-error" id="review-name-err">Name is required.</span>' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label">Your Rating *</label>' +
                '<div class="star-picker" id="star-picker" role="group" aria-label="Select rating"></div>' +
                '<span class="form-error" id="review-rating-err">Please select a rating.</span>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="review-title">Review Title *</label>' +
              '<input type="text" id="review-title" class="form-control" placeholder="Summarise your experience" required>' +
              '<span class="form-error" id="review-title-err">Title is required.</span>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="review-body">Your Review *</label>' +
              '<textarea id="review-body" class="form-control" rows="4" placeholder="Share your experience with this product..." required></textarea>' +
              '<span class="form-error" id="review-body-err">Review text is required.</span>' +
            '</div>' +
            '<button type="submit" class="btn btn--primary">Submit Review</button>' +
          '</form>' +
        '</div>' +
      '</div>';

    renderStarBreakdown(reviews);
    renderReviewList(reviews, 'recent');
    _initStarPicker();
    _bindForm(productId, reviews);

    var sortSel = container.querySelector('#reviews-sort-sel');
    if (sortSel) sortSel.addEventListener('change', function () { renderReviewList(reviews, this.value); });
  }

  function renderStarBreakdown(reviews) {
    var el = document.getElementById('reviews-summary');
    if (!el) return;
    if (reviews.length === 0) { el.innerHTML = '<p>No reviews yet. Be the first!</p>'; return; }

    var avg = reviews.reduce(function (a, r) { return a + r.rating; }, 0) / reviews.length;
    var counts = [0, 0, 0, 0, 0];
    reviews.forEach(function (r) { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });

    var barsHTML = '';
    for (var s = 5; s >= 1; s--) {
      var pct = reviews.length ? Math.round((counts[s - 1] / reviews.length) * 100) : 0;
      barsHTML += '<div class="rating-bar-row">' +
        '<span class="rating-bar-label">' + s + '★</span>' +
        '<div class="rating-bar-track"><div class="rating-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="rating-bar-count">' + counts[s - 1] + '</span>' +
      '</div>';
    }

    el.innerHTML =
      '<div class="reviews-avg">' +
        '<span class="reviews-avg__score">' + avg.toFixed(1) + '</span>' +
        (window.renderStars ? renderStars(avg) : '') +
        '<span class="reviews-avg__count">' + reviews.length + ' review' + (reviews.length !== 1 ? 's' : '') + '</span>' +
      '</div>' +
      '<div class="rating-bars">' + barsHTML + '</div>';
  }

  function renderReviewList(reviews, sortBy) {
    var el = document.getElementById('reviews-list');
    if (!el) return;

    var sorted = reviews.slice();
    if (sortBy === 'high')   sorted.sort(function (a, b) { return b.rating - a.rating; });
    else if (sortBy === 'low') sorted.sort(function (a, b) { return a.rating - b.rating; });
    else sorted.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    if (sorted.length === 0) { el.innerHTML = '<p class="text-muted">No reviews yet.</p>'; return; }

    el.innerHTML = sorted.map(function (r) {
      var date = new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      var stars = window.renderStars ? renderStars(r.rating) : '';
      var verified = r.verified ? '<span class="review-verified"><i class="ri-shield-check-line"></i> Verified Purchase</span>' : '';
      return '<div class="review-card">' +
        '<div class="review-card__header">' +
          '<img src="' + r.avatar + '" alt="' + sanitizeHTML(r.author) + '" class="review-card__avatar" loading="lazy">' +
          '<div class="review-card__meta">' +
            '<strong class="review-card__author">' + sanitizeHTML(r.author) + '</strong>' +
            '<div class="review-card__rating">' + stars + verified + '</div>' +
          '</div>' +
          '<span class="review-card__date">' + date + '</span>' +
        '</div>' +
        '<h4 class="review-card__title">' + sanitizeHTML(r.title) + '</h4>' +
        '<p class="review-card__body">' + sanitizeHTML(r.body) + '</p>' +
      '</div>';
    }).join('');
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
      btn.addEventListener('click', function () {
        _pickedRating = parseInt(this.dataset.rating);
        picker.querySelectorAll('.star-pick-btn').forEach(function (b) {
          b.classList.toggle('active', parseInt(b.dataset.rating) <= _pickedRating);
        });
      });
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
      var valid = true;

      document.getElementById('review-name-err').parentElement.classList.remove('has-error');
      document.getElementById('review-title-err').parentElement.classList.remove('has-error');
      document.getElementById('review-body-err').parentElement.classList.remove('has-error');
      document.getElementById('review-rating-err').previousElementSibling.style.outline = '';

      if (!nameVal)  { document.getElementById('review-name').parentElement.classList.add('has-error');  valid = false; }
      if (!_pickedRating) { document.getElementById('review-rating-err').style.display = 'block'; valid = false; }
      if (!titleVal) { document.getElementById('review-title').parentElement.classList.add('has-error'); valid = false; }
      if (!bodyVal)  { document.getElementById('review-body').parentElement.classList.add('has-error');  valid = false; }

      if (!valid) return;

      var newReview = {
        id: 'rv-new-' + Date.now(),
        productId: productId,
        author: nameVal,
        avatar: 'https://picsum.photos/seed/newuser/60/60',
        rating: _pickedRating,
        title: titleVal,
        body: bodyVal,
        date: new Date().toISOString(),
        verified: false
      };
      reviews.unshift(newReview);
      renderStarBreakdown(reviews);
      renderReviewList(reviews, 'recent');
      form.reset();
      _pickedRating = 0;
      document.querySelectorAll('.star-pick-btn').forEach(function (b) { b.classList.remove('active'); });
      if (window.ToastNotification) ToastNotification.show({ message: 'Review submitted! Thank you.', type: 'success' });
    });
  }

  window.ReviewsSection = { init: init, renderStarBreakdown: renderStarBreakdown, renderReviewList: renderReviewList };
})();
