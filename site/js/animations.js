// animations.js — GSAP scroll-linked animations
// Madaraka Homes Ltd

// Only run if GSAP is loaded
if (typeof gsap === 'undefined') {
  console.warn('GSAP not loaded — animations disabled.');
} else {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {

    /* ---- Hero parallax ---- */
    gsap.to('.hero__bg', {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero--home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    /* ---- Stat counters ---- */
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el.closest('.stats'),
          start: 'top 80%',
        },
      });
    });

    /* ---- Section reveal (fade up) ---- */
    gsap.utils.toArray('.section-header, .feature-card, .project-card, .testimonial-card, .value-card, .step-card').forEach(el => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ---- CTA banner scale-in ---- */
    gsap.from('.cta-banner__content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top 85%',
      },
    });

    /* ---- Stagger children inside grids ---- */
    gsap.utils.toArray('.projects-grid, .testimonials-grid, .features-grid, .values-grid, .steps-grid').forEach(grid => {
      gsap.from(grid.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
        },
      });
    });

  });
}
