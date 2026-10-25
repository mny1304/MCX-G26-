/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — COMMAND PALETTE (command-palette.js)
 * Architect: Matin (M.N.Y. 1304) | 100% Pure Vanilla JS
 * ============================================================================
 */

(function () {
    'use strict';

    // 1. Create the Command Palette HTML dynamically
    const paletteHTML = `
        <div id="mcx-command-palette" class="command-palette-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 9999; align-items: flex-start; justify-content: center; padding-top: 15vh;">
            <div class="command-palette-modal glass-card" style="width: 90%; max-width: 600px; padding: 0; overflow: hidden; border: 1px solid rgba(0, 200, 255, 0.3); background: #0d111a;">
                <input type="text" id="mcx-cp-input" placeholder="جستجو در پایتخت دیجیتال (مثلاً: MCX AIIL)..." style="width: 100%; padding: 1.5rem; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: inherit; font-size: 1.1rem; outline: none;" dir="rtl">
                <ul id="mcx-cp-results" style="list-style: none; margin: 0; padding: 0.5rem 0; max-height: 300px; overflow-y: auto;"></ul>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', paletteHTML);

    const paletteOverlay = document.getElementById('mcx-command-palette');
    const cpInput = document.getElementById('mcx-cp-input');
    const cpResults = document.getElementById('mcx-cp-results');

    // 2. Define the searchable links
    const commands = [
        { title: 'دروازه ورودی (خانه)', url: '#hero-section' },
        { title: 'معرفی پایتخت', url: '#mcx-intro' },
        { title: 'آزمایشگاه MCX BIIL', url: '#project-biil' },
        { title: 'آزمایشگاه MCX AIIL', url: '#project-aiil' },
        { title: 'مانیفست M.N.Y. 1304', url: '#creator-philosophy' },
        { title: 'نقشه راه آینده', url: '#mcx-roadmap' },
        { title: 'سوالات متداول', url: '#faq-section' }
    ];

    // 3. Render items
    function renderCommands(filterText = '') {
        cpResults.innerHTML = '';
        const filtered = commands.filter(cmd => cmd.title.includes(filterText) || filterText === '');
        
        filtered.forEach(cmd => {
            const li = document.createElement('li');
            li.style.padding = '1rem 1.5rem';
            li.style.color = '#E2E8F0';
            li.style.cursor = 'pointer';
            li.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            li.style.transition = 'all 0.2s';
            li.innerHTML = `<span style="color: #00C8FF;">←</span> ${cmd.title}`;
            
            li.addEventListener('mouseenter', () => li.style.background = 'rgba(0, 200, 255, 0.1)');
            li.addEventListener('mouseleave', () => li.style.background = 'transparent');
            
            li.addEventListener('click', () => {
                document.querySelector(cmd.url)?.scrollIntoView({ behavior: 'smooth' });
                closePalette();
            });
            cpResults.appendChild(li);
        });
    }

    // 4. Open/Close logic
    function openPalette() {
        paletteOverlay.style.display = 'flex';
        cpInput.value = '';
        renderCommands();
        setTimeout(() => cpInput.focus(), 50);
    }

    function closePalette() {
        paletteOverlay.style.display = 'none';
    }

    // 5. Event Listeners
    document.getElementById('command-palette-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
    });

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            paletteOverlay.style.display === 'flex' ? closePalette() : openPalette();
        }
        if (e.key === 'Escape' && paletteOverlay.style.display === 'flex') {
            closePalette();
        }
    });

    paletteOverlay.addEventListener('click', (e) => {
        if (e.target === paletteOverlay) closePalette();
    });

    cpInput.addEventListener('input', (e) => renderCommands(e.target.value));

})();
