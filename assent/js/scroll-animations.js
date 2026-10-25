/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — SCROLL REVEAL & SMOOTH TOP ENGINE (scroll-animations.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (IntersectionObserver)
 * ============================================================================
 */

(function () {
    'use strict';

    const DELAY_STEP_MS = 120; // Stagger delay step for .delay-1, .delay-2, etc.

    /**
     * Automatically tags core MCX structural elements with .reveal and staggered
     * .delay-X classes if they don't already have them in the HTML.
     */
    function prepareRevealElements() {
        const autoRevealSelectors = [
            '.section-header-centered',
            '.section-header-split',
            '.aurora-manifesto-box',
            '.ecosystem-architecture-map',
            '.philosophy-wrapper',
            '.community-banner'
        ];

        const staggeredGridSelectors = [
            '.intro-story-grid > *',
            '.vm-dual-grid > *',
            '.stats-grid > *',
            '.timeline-item',
            '.projects-showcase-grid > *',
            '.services-grid > *',
            '.values-grid > *',
            '.roadmap-grid > *',
            '.faq-accordion-wrapper > *'
        ];

        // Attach .reveal to standalone section blocks
        autoRevealSelectors.forEach(function (selector) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(function (el) {
                if (!el.classList.contains('reveal')) {
                    el.classList.add('reveal');
                }
            });
        });

        // Attach .reveal and staggered .delay-1, .delay-2, .delay-3 to grid items
        staggeredGridSelectors.forEach(function (selector) {
            const items = document.querySelectorAll(selector);
            items.forEach(function (item, index) {
                if (!item.classList.contains('reveal')) {
                    item.classList.add('reveal');
                }

                const hasDelayClass =
                    item.classList.contains('delay-1') ||
                    item.classList.contains('delay-2') ||
                    item.classList.contains('delay-3') ||
                    item.classList.contains('delay-4');

                if (!hasDelayClass) {
                    const delayIndex = (index % 3) + 1;
                    item.classList.add('delay-' + delayIndex);
                }
            });
        });
    }

    /**
     * Applies transition delay based on .delay-1, .delay-2, .delay-3, .delay-4 classes
     * @param {HTMLElement} el
     */
    function applyDelayClasses(el) {
        const classList = el.classList;
        for (let i = 0; i < classList.length; i++) {
            const cls = classList[i];
            if (cls.indexOf('delay-') === 0) {
                const level = parseInt(cls.replace('delay-', ''), 10);
                if (!isNaN(level) && level > 0) {
                    el.style.transitionDelay = (level * DELAY_STEP_MS) + 'ms';
                }
            }
        }
    }

    /**
     * Initializes IntersectionObserver for all .reveal elements
     */
    function initScrollReveal() {
        prepareRevealElements();

        const revealElements = document.querySelectorAll('.reveal');

        if (!revealElements.length) {
            return;
        }

        // Respect user accessibility preference for reduced motion
        const prefersReducedMotion =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealElements.forEach(function (el) {
                el.classList.add('active');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.12
        };

        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    applyDelayClasses(targetEl);
                    targetEl.classList.add('active');
                    observer.unobserve(targetEl);
                }
            });
        }, observerOptions);

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /**
     * Implements smooth scroll to top for .back-to-top-link buttons
     */
    function initBackToTop() {
        const backToTopButtons = document.querySelectorAll('.back-to-top-link');

        if (!backToTopButtons.length) {
            return;
        }

        backToTopButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });

                // Move keyboard focus safely back to the top body element for accessibility
                const bodyEl = document.getElementById('mcx-body') || document.body;
                if (bodyEl) {
                    bodyEl.setAttribute('tabindex', '-1');
                    bodyEl.focus({ preventScroll: true });
                    bodyEl.removeAttribute('tabindex');
                }
            });
        });
    }

    /**
     * Bootstraps scroll animations and back-to-top navigation
     */
    function initScrollEngine() {
        initScrollReveal();
        initBackToTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollEngine);
    } else {
        initScrollEngine();
    }
})();
