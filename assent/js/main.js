/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — MAIN ORCHESTRATOR (main.js)
 * Architect: Matin (M.N.Y. 1304) | 100% Pure Vanilla JS
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Page Loader (Hide after load)
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            }, 1000); // 1 second delay
        });
    }

    // 2. Custom Cursor (Desktop only)
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorRing = document.getElementById('custom-cursor-ring');
    
    if (cursorDot && cursorRing && !('ontouchstart' in window)) {
        // Set initial styles via JS to avoid inline HTML CSS
        cursorDot.style.cssText = 'position: fixed; width: 8px; height: 8px; background: #00C8FF; border-radius: 50%; pointer-events: none; z-index: 99999; transition: transform 0.1s;';
        cursorRing.style.cssText = 'position: fixed; width: 40px; height: 40px; border: 1px solid rgba(0, 200, 255, 0.5); border-radius: 50%; pointer-events: none; z-index: 99998; transition: transform 0.15s ease-out;';

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Move dot instantly
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        });

        // Smooth trailing for the ring
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on clickable elements
        const clickables = document.querySelectorAll('a, button, .glass-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.transform += ' scale(1.5)';
                cursorRing.style.background = 'rgba(0, 200, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.5)', '');
                cursorRing.style.background = 'transparent';
            });
        });
    } else if (cursorDot && cursorRing) {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }

    // 3. Hero Terminal Logs (Typing effect in the hologram card)
    const terminalLogs = document.querySelector('.terminal-logs');
    if (terminalLogs && window.MCX_CONFIG) {
        const logs = window.MCX_CONFIG.terminalLogs;
        // We just leave it as is since the HTML already has the logs
        // But we can add a blinking cursor effect
        const activeCursor = terminalLogs.querySelector('.active-cursor');
        if (activeCursor) {
            setInterval(() => {
                activeCursor.style.opacity = activeCursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
});
