/* ============================================================
   HG FLÜGEL – Main JavaScript
   ============================================================ */

'use strict';

// ── Navbar Scroll Effect ──────────────────────────────────
const navbar = document.querySelector('.navbar-main');
if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ── Active Nav Link ───────────────────────────────────────
(function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link-custom').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path === href || (path.startsWith(href) && href !== '/'))) {
      link.classList.add('active');
    }
  });

  const currentPath = window.location.pathname;
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    const p = item.dataset.path || item.getAttribute('href');
    if (p && (currentPath === p || (p !== '/' && currentPath.startsWith(p)))) {
      item.classList.add('active');
    }
  });
})();

// ── Scroll Fade-In Animation ──────────────────────────────
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

// ── Smooth Scroll for Anchor Links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Counter Animation ─────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── Gallery Filter ────────────────────────────────────────
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.getAttribute('href')) return; // link-based filter, let it navigate
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const cat = this.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (!cat || cat === 'all' || item.dataset.category === cat) {
          item.style.display = '';
          item.style.animation = 'fadeIn .4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

// ── Auto-dismiss alerts ───────────────────────────────────
setTimeout(() => {
  document.querySelectorAll('.alert-success-custom, .alert-error-custom').forEach(el => {
    el.style.transition = 'opacity .5s ease, max-height .5s ease';
    el.style.opacity = '0';
    el.style.maxHeight = '0';
    el.style.overflow = 'hidden';
    setTimeout(() => el.remove(), 500);
  });
}, 5000);

// ── Star Rating Picker ────────────────────────────────────
(function initStarPicker() {
  const picker = document.getElementById('starPicker');
  if (!picker) return;
  const btns = picker.querySelectorAll('.star-btn');
  const input = document.getElementById('ratingInput');
  let currentVal = 5;

  function highlight(val) {
    btns.forEach((b, i) => b.classList.toggle('active', i < val));
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentVal = parseInt(btn.dataset.val, 10);
      input.value = currentVal;
      highlight(currentVal);
    });
    btn.addEventListener('mouseenter', () => highlight(parseInt(btn.dataset.val, 10)));
  });
  picker.addEventListener('mouseleave', () => highlight(currentVal));
  highlight(5); // default 5 stars
})();

// ── Review Form AJAX ──────────────────────────────────────
(function initReviewForm() {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Senden…';

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      const data = await resp.json();
      if (data.ok) {
        document.getElementById('reviewFormStep').classList.add('d-none');
        document.getElementById('reviewSuccessStep').classList.remove('d-none');
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Bewertung absenden';
        alert('Bitte füllen Sie alle Felder aus.');
      }
    } catch {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Bewertung absenden';
    }
  });
})();

// ── Dashboard mark-read toggle ────────────────────────────
document.querySelectorAll('[data-mark-read]').forEach(btn => {
  btn.addEventListener('click', function () {
    const row = this.closest('.message-row');
    if (row) row.classList.remove('unread');
  });
});

// ── Form validation visual feedback ──────────────────────
(function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('blur', function () {
      if (this.value.trim()) {
        this.style.borderColor = 'var(--success)';
      } else if (this.required) {
        this.style.borderColor = 'var(--danger)';
      }
    });
    field.addEventListener('focus', function () {
      this.style.borderColor = 'var(--navy-light)';
    });
  });
})();
