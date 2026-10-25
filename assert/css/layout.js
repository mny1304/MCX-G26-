/* ==========================================================================
   MCX DIGITAL CAPITAL — MASTER STRUCTURAL LAYOUT (layout.css)
   Ecosystem: Matin Creator Xperience | Code: M.N.Y. 1304
   Architecture: Pure Vanilla CSS (Flexbox & CSS Grid) | Direction: RTL
   ========================================================================== */

:root {
    --mcx-bg-deep: #05070f;
    --mcx-bg-darker: #020308;
    --mcx-neon-blue: #00C8FF;
    --mcx-neon-purple: #6A00FF;
    --mcx-neon-emerald: #00FFA3;
    --mcx-neon-gold: #FFB800;
    --mcx-text-primary: #F2F6FF;
    --mcx-text-secondary: #94A3B8;
    --mcx-border-light: rgba(255, 255, 255, 0.08);
    --mcx-container-max: 1300px;
    --mcx-section-space: 7.5rem;
    --mcx-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* --------------------------------------------------------------------------
   1. BASE RESET & GLOBAL CONTAINER
   -------------------------------------------------------------------------- */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
    background-color: var(--mcx-bg-deep);
    color: var(--mcx-text-primary);
}

body#mcx-body.rtl-layout {
    direction: rtl;
    text-align: right;
    background-color: var(--mcx-bg-deep);
    color: var(--mcx-text-primary);
    min-height: 100vh;
    line-height: 1.85;
    position: relative;
    overflow-x: hidden;
}

.overflow-x-hidden { overflow-x: hidden; }

.sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

.skip-to-content-link {
    position: fixed; top: -120px; right: 2rem; z-index: 10000;
    background: var(--mcx-neon-blue); color: var(--mcx-bg-deep);
    padding: 0.8rem 1.6rem; font-weight: 800; border-radius: 0 0 12px 12px;
    text-decoration: none; transition: top 0.3s var(--mcx-ease);
}
.skip-to-content-link:focus { top: 0; }

.container {
    width: 100%; max-width: var(--mcx-container-max);
    margin-right: auto; margin-left: auto;
    padding-right: 1.5rem; padding-left: 1.5rem;
    position: relative; z-index: 2;
}

.mcx-main-wrapper {
    position: relative; z-index: 2; display: flex; flex-direction: column;
}

.relative-section { position: relative; overflow: hidden; }

section {
    padding-top: var(--mcx-section-space);
    padding-bottom: var(--mcx-section-space);
    position: relative;
}

/* --------------------------------------------------------------------------
   2. HEADER & TOP NAVIGATION
   -------------------------------------------------------------------------- */
.mcx-header {
    width: 100%; z-index: 1000;
    border-bottom: 1px solid rgba(0, 200, 255, 0.14);
    transition: all 0.35s var(--mcx-ease);
}
.sticky-top { position: sticky; top: 0; }

.header-telemetry-bar {
    background-color: rgba(2, 3, 8, 0.92);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0.45rem 0; font-size: 0.8rem; color: var(--mcx-text-secondary);
}
.telemetry-container {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 0.75rem;
}
.telemetry-right, .telemetry-left { display: flex; align-items: center; gap: 0.65rem; }
.telemetry-divider { opacity: 0.25; }

.header-main-bar { padding: 0.95rem 0; }
.nav-container {
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
}

/* Brand Identity */
.brand-identity {
    display: flex; align-items: center; gap: 0.9rem;
    text-decoration: none; color: var(--mcx-text-primary); flex-shrink: 0;
}
.brand-emblem {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(0, 200, 255, 0.18), rgba(106, 0, 255, 0.28));
}
.brand-monogram { font-weight: 900; font-size: 1.15rem; letter-spacing: 1px; color: #fff; }
.brand-titles { display: flex; flex-direction: column; line-height: 1.3; }
.brand-main-name { font-size: 1.05rem; font-weight: 800; color: #fff; }
.brand-sub-name { font-size: 0.75rem; color: var(--mcx-neon-blue); }

/* Navigation Links */
.main-nav { display: flex; align-items: center; }
.nav-list { display: flex; align-items: center; gap: 0.35rem; list-style: none; }
.nav-item { position: relative; }
.nav-link {
    display: inline-flex; align-items: center; padding: 0.55rem 0.95rem;
    color: var(--mcx-text-secondary); text-decoration: none;
    font-size: 0.92rem; font-weight: 600; border-radius: 10px;
    transition: all 0.3s var(--mcx-ease);
}
.nav-link:hover, .nav-link.active {
    color: #ffffff; background: rgba(0, 200, 255, 0.1);
}

/* Megamenu */
.has-megamenu { position: relative; }
.megamenu {
    position: absolute; top: calc(100% + 14px); right: 0;
    width: 640px; padding: 1.75rem; border-radius: 18px;
    opacity: 0; visibility: hidden; transform: translateY(12px);
    transition: all 0.35s var(--mcx-ease); z-index: 1100;
}
.has-megamenu:hover .megamenu, .has-megamenu:focus-within .megamenu {
    opacity: 1; visibility: visible; transform: translateY(0);
}
.megamenu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.megamenu-heading {
    font-size: 0.95rem; color: var(--mcx-neon-blue);
    margin-bottom: 0.85rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 200, 255, 0.2);
}
.megamenu-sublist { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.megamenu-link {
    display: block; color: var(--mcx-text-secondary); text-decoration: none;
    font-size: 0.86rem; padding: 0.45rem 0.65rem; border-radius: 8px;
    transition: all 0.25s var(--mcx-ease);
}
.megamenu-link:hover {
    color: #ffffff; background: rgba(106, 0, 255, 0.18); transform: translateX(-4px);
}

/* Header Actions */
.header-actions { display: flex; align-items: center; gap: 0.65rem; flex-shrink: 0; }
.mobile-hamburger-btn {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 42px; height: 42px; padding: 0 10px;
    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px; cursor: pointer;
}
.hamburger-line { width: 100%; height: 2px; background-color: var(--mcx-neon-blue); border-radius: 2px; }

/* --------------------------------------------------------------------------
   3. HERO SECTION
   -------------------------------------------------------------------------- */
.hero-section {
    padding-top: 4.5rem; padding-bottom: 0;
    min-height: calc(100vh - 115px);
    display: flex; flex-direction: column; justify-content: space-between;
}
.hero-container {
    display: grid; grid-template-columns: 1.15fr 0.85fr;
    align-items: center; gap: 3.5rem; padding-bottom: 5rem;
}
.hero-content-column { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
.hero-title { font-size: clamp(2.15rem, 3.8vw, 3.45rem); font-weight: 900; line-height: 1.35; }
.hero-description { font-size: 1.08rem; color: var(--mcx-text-secondary); line-height: 1.95; max-width: 650px; }
.hero-cta-group { display: flex; align-items: center; flex-wrap: wrap; gap: 1.2rem; margin-top: 0.5rem; width: 100%; }

.hero-quick-stats {
    display: flex; align-items: center; justify-content: space-between;
    gap: 1.5rem; width: 100%; padding: 1.25rem 1.75rem;
    margin-top: 1rem; border-radius: 16px;
}
.quick-stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
.quick-stat-value { font-size: 1.35rem; font-weight: 900; color: var(--mcx-neon-blue); }
.quick-stat-label { font-size: 0.82rem; color: var(--mcx-text-secondary); }
.quick-stat-divider {
    width: 1px; height: 38px;
    background: linear-gradient(to bottom, transparent, rgba(0, 200, 255, 0.35), transparent);
}
.hero-visual-column { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; }

.hero-marquee-wrapper {
    width: 100%; overflow: hidden; padding: 1rem 0;
    border-top: 1px solid rgba(0, 200, 255, 0.15); border-bottom: 1px solid rgba(106, 0, 255, 0.2);
    background: rgba(5, 7, 15, 0.88);
}
.marquee-track {
    display: flex; align-items: center; justify-content: space-around;
    gap: 2.5rem; white-space: nowrap; font-size: 0.92rem; color: var(--mcx-text-secondary);
}

/* --------------------------------------------------------------------------
   4. SECTION HEADERS & GRIDS
   -------------------------------------------------------------------------- */
.section-header-centered {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    max-width: 820px; margin: 0 auto 4.5rem auto; gap: 1rem;
}
.section-header-split {
    display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: end;
    gap: 3rem; margin-bottom: 4.5rem; padding-bottom: 2rem;
    border-bottom: 1px solid var(--mcx-border-light);
}
.section-eyebrow {
    display: inline-block; font-size: 0.86rem; font-weight: 700;
    padding: 0.35rem 1rem; border-radius: 999px;
    background: rgba(0, 200, 255, 0.08); border: 1px solid rgba(0, 200, 255, 0.24);
}
.section-title-large, .section-title { font-size: clamp(1.85rem, 3vw, 2.65rem); font-weight: 900; line-height: 1.4; color: #fff; }
.section-lead-paragraph, .header-description { font-size: 1.05rem; color: var(--mcx-text-secondary); line-height: 1.9; }

/* Specific Section Grids */
.intro-story-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3.5rem; }
.aurora-manifesto-box { display: flex; align-items: center; justify-content: space-between; gap: 2.5rem; padding: 2.75rem 3rem; border-radius: 24px; }
.vm-dual-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.projects-showcase-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
.project-mega-card { grid-column: span 2; }
.project-specs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1.75rem; }
.services-grid, .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.ecosystem-architecture-map { display: flex; flex-direction: column; align-items: center; padding: 3.5rem 2.5rem; border-radius: 28px; }
.eco-layer { width: 100%; max-width: 980px; text-align: center; padding: 2rem; border-radius: 20px; background: rgba(5, 7, 15, 0.68); border: 1px solid var(--mcx-border-light); }
.layer-dual-nodes { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1.5rem; margin-top: 1.5rem; }
.layer-triple-nodes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem; }
.philosophy-body-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 3rem; align-items: start; margin-top: 2.5rem; }
.roadmap-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.community-banner { padding: 3.5rem; border-radius: 28px; }
.community-content-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 3.5rem; align-items: center; }

/* --------------------------------------------------------------------------
   5. TIMELINE
   -------------------------------------------------------------------------- */
.timeline-wrapper { position: relative; max-width: 1120px; margin: 0 auto; padding: 2.5rem 0; }
.timeline-center-line {
    position: absolute; top: 0; bottom: 0; right: 50%; transform: translateX(50%);
    width: 3px; background: linear-gradient(to bottom, transparent 0%, var(--mcx-neon-blue) 15%, var(--mcx-neon-purple) 85%, transparent 100%); z-index: 1;
}
.timeline-item { position: relative; width: 50%; padding-bottom: 3.75rem; display: flex; z-index: 2; }
.timeline-item:last-child { padding-bottom: 0; }
.timeline-right { margin-right: 0; margin-left: auto; padding-left: 3.5rem; justify-content: flex-start; }
.timeline-left { margin-right: auto; margin-left: 0; padding-right: 3.5rem; justify-content: flex-end; }
.timeline-node {
    position: absolute; top: 1.5rem; width: 48px; height: 48px; border-radius: 50%;
    background-color: var(--mcx-bg-deep); border: 2px solid var(--mcx-neon-blue);
    display: flex; align-items: center; justify-content: center; font-weight: 900; color: var(--mcx-neon-blue); z-index: 3;
}
.timeline-right .timeline-node { left: -24px; }
.timeline-left .timeline-node { right: -24px; }
.timeline-content { width: 100%; padding: 2rem; border-radius: 20px; position: relative; }

/* --------------------------------------------------------------------------
   6. FOOTER
   -------------------------------------------------------------------------- */
.mcx-footer { position: relative; z-index: 2; border-top: 1px solid rgba(0, 200, 255, 0.18); padding-top: 4.5rem; }
.footer-top-cta { margin-bottom: 4.5rem; }
.footer-cta-box { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 2.75rem 3.25rem; border-radius: 24px; }
.footer-main-content { padding-bottom: 4.5rem; }
.footer-grid { display: grid; grid-template-columns: 1.65fr 1fr 1fr 1fr 1.45fr; gap: 2.25rem; align-items: start; }
.footer-col { display: flex; flex-direction: column; }
.footer-col-title { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 1.35rem; padding-bottom: 0.65rem; position: relative; }
.footer-col-title::after { content: ""; position: absolute; bottom: 0; right: 0; width: 36px; height: 2px; background: var(--mcx-neon-blue); }
.footer-links-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
.footer-link { color: var(--mcx-text-secondary); text-decoration: none; font-size: 0.9rem; transition: all 0.25s var(--mcx-ease); }
.footer-link:hover { color: var(--mcx-neon-blue); padding-right: 6px; }
.footer-bottom-bar { border-top: 1px solid var(--mcx-border-light); padding: 1.5rem 0; background: rgba(2, 3, 8, 0.95); }
.footer-bottom-container { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; }

/* --------------------------------------------------------------------------
   7. RESPONSIVE BREAKPOINTS (Media Queries)
   -------------------------------------------------------------------------- */
@media (max-width: 1150px) {
    .hero-container, .section-header-split, .philosophy-body-grid, .community-content-grid { grid-template-columns: 1fr; }
    .intro-story-grid, .stats-grid, .services-grid, .values-grid, .roadmap-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: repeat(2, 1fr); }
    .main-nav { display: none; }
    .mobile-hamburger-btn { display: flex; }
}

@media (max-width: 768px) {
    section { padding-top: 4.5rem; padding-bottom: 4.5rem; }
    .intro-story-grid, .vm-dual-grid, .stats-grid, .projects-showcase-grid, .project-specs-grid, .services-grid, .values-grid, .roadmap-grid, .footer-grid, .layer-dual-nodes, .layer-triple-nodes { grid-template-columns: 1fr; }
    .project-mega-card { grid-column: span 1; }
    .timeline-center-line { right: 24px; transform: none; }
    .timeline-item, .timeline-right, .timeline-left { width: 100%; padding-right: 4rem; padding-left: 0; margin: 0; }
    .timeline-right .timeline-node, .timeline-left .timeline-node { right: 0; left: auto; }
    .aurora-manifesto-box, .footer-cta-box, .hero-quick-stats, .footer-bottom-container { flex-direction: column; text-align: center; }
    .quick-stat-divider { width: 100%; height: 1px; }
    .community-banner { padding: 2rem 1.5rem; }
                                  }
