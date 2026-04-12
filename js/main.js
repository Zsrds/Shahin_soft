/* =============================================
   Shahin Soft — main.js
   All interactive functionality
   ============================================= */

"use strict";

// ── Navbar scroll effect ──────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(6,11,20,0.97)';
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    navbar.style.background = 'rgba(6,11,20,0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ── Mobile Menu ──────────────────────────────
const hamburger  = document.querySelector('.hamburger');
const mobileNav  = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close on nav link click
document.querySelectorAll('.mobile-nav a[href]').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Mobile submenu toggle ─────────────────────
const mobToggles = document.querySelectorAll('.mob-toggle');
mobToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    const arrow  = btn.querySelector('.mob-arrow');
    if (!target) return;
    const isOpen = target.classList.contains('open');
    // Close all submenus
    document.querySelectorAll('.mob-submenu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.mob-arrow').forEach(a => a.textContent = '▾');
    // Toggle current
    if (!isOpen) {
      target.classList.add('open');
      if (arrow) arrow.textContent = '▴';
    }
  });
});

// ── Scroll-triggered reveal ───────────────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  revealObserver.observe(el);
});

// ── Staggered children reveal ─────────────────
document.querySelectorAll('.reveal-stagger').forEach(container => {
  const children = container.children;
  Array.from(children).forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(24px)';
    child.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
    revealObserver.observe(child);
  });
});

// ── Contact form ──────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate send (replace with real API call)
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ── Active nav link highlight ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links li a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--text)'
      : '';
  });
}, { passive: true });

// ── Smooth scroll for hero button ────────────
document.querySelector('.hero-scroll-btn')?.addEventListener('click', () => {
  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
});

// ── Animated counter ──────────────────────────
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});
