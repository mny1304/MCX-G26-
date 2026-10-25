/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — NEURAL NETWORK & CONSTELLATION ENGINE (aurora-canvas.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (Zero Dependencies)
 * ============================================================================
 */

(function () {
    'use strict';

    const CONFIG = {
        colors: {
            cyan: { hex: '#00C8FF', r: 0, g: 200, b: 255 },
            purple: { hex: '#6A00FF', r: 106, g: 0, b: 255 }
        },
        desktop: {
            maxParticles: 85,
            connectionDistance: 145,
            baseSpeed: 0.45
        },
        tablet: {
            maxParticles: 50,
            connectionDistance: 120,
            baseSpeed: 0.38
        },
        mobile: {
            maxParticles: 28,
            connectionDistance: 95,
            baseSpeed: 0.3
        },
        mouseInteractionRadius: 160
    };

    /**
     * Initializes the neural network canvas engine
     */
    function initNeuralCanvas() {
        const canvas = document.getElementById('neural-network-canvas');

        // Fallback guard if canvas element does not exist on the page
        if (!canvas || typeof canvas.getContext !== 'function') {
            console.warn('[MCX Neural Engine]: #neural-network-canvas not found. Rendering aborted.');
            return;
        }

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = 1;
        let particles = [];
        let animationFrameId = null;
        let isRunning = true;
        let resizeTimeout = null;

        const mouse = {
            x: null,
            y: null,
            active: false
        };

        /**
         * Returns responsive parameters based on current viewport width
         */
        function getDeviceProfile() {
            if (width < 640) {
                return CONFIG.mobile;
            }
            if (width < 1024) {
                return CONFIG.tablet;
            }
            return CONFIG.desktop;
        }

        /**
         * Particle Constructor
         */
        class NeuralParticle {
            constructor(profile) {
                this.reset(profile, true);
            }

            reset(profile, randomPosition) {
                this.x = randomPosition ? Math.random() * width : Math.random() * width;
                this.y = randomPosition ? Math.random() * height : Math.random() * height;

                const angle = Math.random() * Math.PI * 2;
                const speed = (Math.random() * 0.6 + 0.4) * profile.baseSpeed;

                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                this.radius = Math.random() * 1.8 + 1.1;
                this.isCyan = Math.random() > 0.42; // 58% Cyan (#00C8FF), 42% Purple (#6A00FF)
                this.colorObj = this.isCyan ? CONFIG.colors.cyan : CONFIG.colors.purple;
                this.alpha = Math.random() * 0.45 + 0.45;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Smooth bounce off viewport edges
                if (this.x <= 0) {
                    this.x = 0;
                    this.vx *= -1;
                } else if (this.x >= width) {
                    this.x = width;
                    this.vx *= -1;
                }

                if (this.y <= 0) {
                    this.y = 0;
                    this.vy *= -1;
                } else if (this.y >= height) {
                    this.y = height;
                    this.vy *= -1;
                }

                // Subtle interactive mouse repulsion on desktop
                if (mouse.active && mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const maxRadiusSq = CONFIG.mouseInteractionRadius * CONFIG.mouseInteractionRadius;

                    if (distSq < maxRadiusSq && distSq > 1) {
                        const dist = Math.sqrt(distSq);
                        const force = (CONFIG.mouseInteractionRadius - dist) / CONFIG.mouseInteractionRadius;
                        this.x += (dx / dist) * force * 0.85;
                        this.y += (dy / dist) * force * 0.85;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, ${this.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.colorObj.hex;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        /**
         * Resizes the canvas and adjusts particle population for mobile/desktop
         */
        function setupCanvasDimensions() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const profile = getDeviceProfile();
            const densityCount = Math.floor((width * height) / 16500);
            const targetCount = Math.min(profile.maxParticles, Math.max(18, densityCount));

            if (particles.length < targetCount) {
                const toAdd = targetCount - particles.length;
                for (let i = 0; i < toAdd; i++) {
                    particles.push(new NeuralParticle(profile));
                }
            } else if (particles.length > targetCount) {
                particles.length = targetCount;
            }
        }

        /**
         * Draws constellation lines between nearby particles
         */
        function drawConnections(profile) {
            const maxDist = profile.connectionDistance;
            const maxDistSq = maxDist * maxDist;
            const count = particles.length;

            ctx.lineWidth = 0.85;

            for (let i = 0; i < count; i++) {
                const p1 = particles[i];

                for (let j = i + 1; j < count; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / maxDist) * 0.38;

                        // Blend between Cyan (#00C8FF) and Purple (#6A00FF)
                        const r = Math.round((p1.colorObj.r + p2.colorObj.r) * 0.5);
                        const g = Math.round((p1.colorObj.g + p2.colorObj.g) * 0.5);
                        const b = Math.round((p1.colorObj.b + p2.colorObj.b) * 0.5);

                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(3)})`;
                        ctx.stroke();
                    }
                }
            }
        }

        /**
         * Main animation loop
         */
        function renderFrame() {
            if (!isRunning) {
                return;
            }

            ctx.clearRect(0, 0, width, height);

            const profile = getDeviceProfile();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            drawConnections(profile);

            animationFrameId = window.requestAnimationFrame(renderFrame);
        }

        // Event Listeners for Window Resize (Debounced for smooth mobile performance)
        window.addEventListener('resize', function () {
            if (resizeTimeout) {
                window.clearTimeout(resizeTimeout);
            }
            resizeTimeout = window.setTimeout(setupCanvasDimensions, 120);
        });

        // Mouse tracking for subtle neural node interaction
        window.addEventListener('mousemove', function (event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            mouse.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', function () {
            mouse.active = false;
            mouse.x = null;
            mouse.y = null;
        });

        // Pause rendering when browser tab is inactive to save battery/CPU
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                isRunning = false;
                if (animationFrameId !== null) {
                    window.cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            } else if (!isRunning) {
                isRunning = true;
                renderFrame();
            }
        });

        // Initialize and start loop
        setupCanvasDimensions();
        renderFrame();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNeuralCanvas);
    } else {
        initNeuralCanvas();
    }
})();
