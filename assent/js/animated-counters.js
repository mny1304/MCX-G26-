/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — ANIMATED TELEMETRY COUNTERS (animated-counters.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (IntersectionObserver + rAF)
 * ============================================================================
 */

(function () {
    'use strict';

    const DEFAULT_DURATION = 2000; // 2 seconds default smooth counting

    /**
     * Converts standard digits to Persian digits
     * @param {string|number} value
     * @returns {string}
     */
    function toPersianDigits(value) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(value).replace(/\d/g, function (digit) {
            return persianDigits[Number(digit)];
        });
    }

    /**
     * Easing function (easeOutCubic) for a smooth, futuristic deceleration
     * @param {number} t - Progress ratio from 0 to 1
     * @returns {number}
     */
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Formats the current number based on target type and decimals
     * @param {number} currentValue
     * @param {number} targetValue
     * @param {number} decimals
     * @returns {string}
     */
    function formatCounterValue(currentValue, targetValue, decimals) {
        let formatted;

        if (decimals > 0) {
            formatted = currentValue.toFixed(decimals).replace('.', '٫');
        } else {
            const rounded = Math.round(currentValue);
            // Keep code 1304 without thousands separator; format larger numbers with commas
            if (targetValue === 1304) {
                formatted = String(rounded);
            } else {
                formatted = rounded.toLocaleString('en-US').replace(/,/g, '٬');
            }
        }

        return toPersianDigits(formatted);
    }

    /**
     * Animates a single counter element from 0 to its data-target value
     * @param {HTMLElement} counterEl
     */
    function animateCounter(counterEl) {
        if (counterEl.getAttribute('data-animated') === 'true') {
            return;
        }
        counterEl.setAttribute('data-animated', 'true');

        const rawTarget = counterEl.getAttribute('data-target');
        const targetValue = parseFloat(rawTarget);

        if (isNaN(targetValue)) {
            console.warn('[MCX Counters]: Invalid data-target on element:', counterEl);
            return;
        }

        // Determine decimal places (from data-decimals or inferred from data-target)
        let decimals = parseInt(counterEl.getAttribute('data-decimals'), 10);
        if (isNaN(decimals)) {
            const parts = String(rawTarget).split('.');
            decimals = parts.length > 1 ? parts[1].length : 0;
        }

        // Use 2000ms (2 seconds) for smooth counting
        const duration = DEFAULT_DURATION;
        let startTime = null;

        function updateFrame(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = easedProgress * targetValue;

            counterEl.textContent = formatCounterValue(currentValue, targetValue, decimals);

            if (progress < 1) {
                window.requestAnimationFrame(updateFrame);
            } else {
                // Ensure the exact final target value is displayed at completion
                counterEl.textContent = formatCounterValue(targetValue, targetValue, decimals);
            }
        }

        window.requestAnimationFrame(updateFrame);
    }

    /**
     * Initializes the IntersectionObserver for all .stat-counter elements
     */
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-counter');

        if (!counters.length) {
            return;
        }

        // Set initial state to Persian zero
        counters.forEach(function (counter) {
            counter.textContent = toPersianDigits(0);
        });

        // Fallback if IntersectionObserver is not supported by the browser
        if (!('IntersectionObserver' in window)) {
            counters.forEach(function (counter) {
                animateCounter(counter);
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.25
        };

        const counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // Boot counters when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimatedCounters);
    } else {
        initAnimatedCounters();
    }
})();
