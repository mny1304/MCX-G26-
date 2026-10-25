/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — LIVE TELEMETRY CLOCK (telemetry-clock.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (Zero Dependencies)
 * ============================================================================
 */

(function () {
    'use strict';

    /**
     * Converts English digits to Persian digits as a fallback mechanism
     * @param {string|number} input
     * @returns {string}
     */
    function toPersianDigits(input) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(input).replace(/\d/g, function (digit) {
            return persianDigits[Number(digit)];
        });
    }

    /**
     * Formats a Date object into a 24-hour time string (HH:MM:SS) in Persian format
     * @param {Date} dateObj
     * @returns {string}
     */
    function formatCapitalTime(dateObj) {
        try {
            if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
                const formatter = new Intl.DateTimeFormat('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                return formatter.format(dateObj);
            }
        } catch (error) {
            // Fallback to manual formatting if Intl fails
        }

        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        return toPersianDigits(hours + ':' + minutes + ':' + seconds);
    }

    /**
     * Initializes and runs the live telemetry clock
     */
    function initTelemetryClock() {
        const clockElement = document.getElementById('capital-live-clock');

        // Fallback guard: Exit gracefully if the element does not exist on the current page
        if (!clockElement) {
            console.warn('[MCX Telemetry]: Element #capital-live-clock not found on this page. Clock standby.');
            return;
        }

        let clockIntervalId = null;

        function updateClock() {
            const now = new Date();
            const formattedTime = formatCapitalTime(now);

            // Update visible Persian text content
            clockElement.textContent = 'ساعت رسمی پایتخت: ' + formattedTime;

            // Update semantic HTML5 <time datetime="..."> attribute for SEO & accessibility
            if (clockElement.tagName.toLowerCase() === 'time') {
                clockElement.setAttribute('datetime', now.toISOString());
            }
        }

        // Run immediately on load so there is no 1-second delay
        updateClock();

        // Update every second (1000ms)
        clockIntervalId = window.setInterval(updateClock, 1000);

        // Re-sync immediately when user returns to the browser tab
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                updateClock();
            }
        });

        // Clean up interval on page unload
        window.addEventListener('beforeunload', function () {
            if (clockIntervalId !== null) {
                window.clearInterval(clockIntervalId);
            }
        });
    }

    // Boot the clock once the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTelemetryClock);
    } else {
        initTelemetryClock();
    }
})();
