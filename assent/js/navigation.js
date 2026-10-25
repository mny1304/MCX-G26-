/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — NAVIGATION & HEADER ENGINE (navigation.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (Zero Dependencies)
 * ============================================================================
 */

(function () {
    'use strict';

    const SCROLL_COMPACT_THRESHOLD = 60; // Pixels scrolled before header becomes compact

    /**
     * 1. MOBILE MENU TOGGLE
     * Toggles .active on #primary-navigation and #mobile-menu-toggle
     */
    function initMobileMenu() {
        const menuToggleBtn = document.getElementById('mobile-menu-toggle');
        const primaryNav = document.getElementById('primary-navigation');

        if (!menuToggleBtn || !primaryNav) {
            return;
        }

        function closeMobileMenu() {
            primaryNav.classList.remove('active');
            menuToggleBtn.classList.remove('active');
            menuToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('mobile-nav-open');
        }

        function toggleMobileMenu(event) {
            event.stopPropagation();
            const isOpen = primaryNav.classList.toggle('active');
            menuToggleBtn.classList.toggle('active', isOpen);
            menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('mobile-nav-open', isOpen);
        }

        menuToggleBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking outside of navigation
        document.addEventListener('click', function (event) {
            if (
                primaryNav.classList.contains('active') &&
                !primaryNav.contains(event.target) &&
                !menuToggleBtn.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        // Close mobile menu when pressing Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && primaryNav.classList.contains('active')) {
                closeMobileMenu();
                menuToggleBtn.focus();
            }
        });

        // Reset mobile menu state if viewport is resized to desktop width
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1100 && primaryNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    /**
     * 2. STICKY COMPACT HEADER & ACTIVE SECTION SPY
     * Adds .compact (.header-scrolled) to .mcx-header when scrolling down
     */
    function initStickyHeader() {
        const header = document.querySelector('.mcx-header') || document.getElementById('site-header');
        const navLinks = document.querySelectorAll('.nav-list .nav-link[href^="#"]');
        const sections = [];

        navLinks.forEach(function (link) {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    sections.push({ link: link, section: targetEl });
                }
            }
        });

        let isTicking = false;

        function updateHeaderOnScroll() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            // Toggle compact class on .mcx-header
            if (header) {
                if (scrollY > SCROLL_COMPACT_THRESHOLD) {
                    header.classList.add('compact', 'header-scrolled');
                } else {
                    header.classList.remove('compact', 'header-scrolled');
                }
            }

            // Highlight active navigation link based on scroll position
            if (sections.length) {
                const headerOffset = header ? header.offsetHeight + 40 : 120;
                const currentPos = scrollY + headerOffset;

                sections.forEach(function (item) {
                    const top = item.section.offsetTop;
                    const height = item.section.offsetHeight;

                    if (currentPos >= top && currentPos < top + height) {
                        navLinks.forEach(function (nav) {
                            nav.classList.remove('active');
                        });
                        item.link.classList.add('active');
                    }
                });
            }

            isTicking = false;
        }

        window.addEventListener('scroll', function () {
            if (!isTicking) {
                window.requestAnimationFrame(updateHeaderOnScroll);
                isTicking = true;
            }
        }, { passive: true });

        // Run once on load
        updateHeaderOnScroll();
    }

    /**
     * 3. SMOOTH SCROLLING FOR ANCHOR LINKS
     * Smoothly scrolls all a[href^="#"] links to their target sections with header offset
     */
    function initSmoothAnchorScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        const header = document.querySelector('.mcx-header') || document.getElementById('site-header');
        const primaryNav = document.getElementById('primary-navigation');
        const menuToggleBtn = document.getElementById('mobile-menu-toggle');

        anchorLinks.forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                const targetHash = this.getAttribute('href');

                // Ignore empty hashes (#)
                if (!targetHash || targetHash === '#') {
                    return;
                }

                const targetElement = document.querySelector(targetHash);
                if (!targetElement) {
                    return;
                }

                event.preventDefault();

                // Close mobile menu if open when an anchor is clicked
                if (primaryNav && primaryNav.classList.contains('active')) {
                    primaryNav.classList.remove('active');
                    if (menuToggleBtn) {
                        menuToggleBtn.classList.remove('active');
                        menuToggleBtn.setAttribute('aria-expanded', 'false');
                    }
                    document.body.classList.remove('mobile-nav-open');
                }

                // Calculate precise offset accounting for sticky header height
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 2;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });

                // Update URL hash without causing an abrupt page jump
                if (history.pushState) {
                    history.pushState(null, null, targetHash);
                }
            });
        });
    }

    /**
     * Bootstraps all navigation systems
     */
    function initNavigationSystem() {
        initMobileMenu();
        initStickyHeader();
        initSmoothAnchorScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigationSystem);
    } else {
        initNavigationSystem();
    }
})();
