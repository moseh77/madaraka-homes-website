// main.js — Shared site functionality
// Madaraka Homes Ltd

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollObserver();
  initLazyLoading();
});

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav--open');
    document.body.classList.toggle('nav-open');
  });
}

function initScrollObserver() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const sentinel = document.createElement('div');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.height = '1px';
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);

  const observer = new IntersectionObserver(
    ([e]) => {
      header.classList.toggle('header--scrolled', e.intersectionRatio < 1);
    },
    { threshold: [1] }
  );
  observer.observe(sentinel);
}

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}
