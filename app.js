/* app.js — iamunified.info */

// Set footer year dynamically
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
})();

// Smooth-scroll polyfill for browsers that don't support CSS scroll-behavior
(function smoothScrollPolyfill() {
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Intersection Observer — fade-in sections on scroll
(function observeSections() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .js-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .js-reveal.is-visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.feature-card, .how__step, .strip__quote, .cta__inner'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  const ITEMS_PER_ANIMATION_GROUP = 4; // number of items per visual row for delay staggering

  targets.forEach(function (el, i) {
    el.classList.add('js-reveal');
    // Stagger cards within the same grid
    el.style.transitionDelay = (i % ITEMS_PER_ANIMATION_GROUP) * 0.08 + 's';
    observer.observe(el);
  });
})();

// Early-access form — basic client-side handling
(function handleForm() {
  const form = document.querySelector('.cta__form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const input = form.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';

    if (!email) return;

    // Sanitize by constructing the message with textContent (never innerHTML),
    // keeping user input safely inert in the DOM.
    const thanks = document.createElement('p');
    const msg = document.createTextNode(
      'You\u2019re on the list! We\u2019ll be in touch at ' + email + '.'
    );
    thanks.appendChild(msg);
    thanks.style.cssText =
      'font-size:1.125rem;font-weight:600;color:#5b6ef5;margin-top:0.5rem;';

    form.replaceWith(thanks);
  });
})();
