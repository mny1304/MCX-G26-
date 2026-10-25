/**
 * ============================================================================
 * MCX DIGITAL CAPITAL — GLOBAL CONFIGURATION (config.js)
 * Ecosystem: Matin Creator Xperience | Protocol: M.N.Y. 1304
 * Architecture: 100% Pure Vanilla JavaScript (Global Configuration Object)
 * ============================================================================
 */

(function () {
    'use strict';

    const MCX_CONFIG = {
        // Identity & Core Information
        siteName: 'Matin Creator Xperience (MCX)',
        shortName: 'MCX',
        capitalTitle: 'پایتخت دیجیتال MCX',
        architectCode: 'M.N.Y. 1304',
        architectName: 'متین',
        version: '4.2.0',
        environment: 'production',
        capitalState: 'online',

        // Official URLs & Communication Channels
        domains: {
            primary: 'https://mcx-capital.com',
            github: 'https://github.com/mcx-capital',
            telegram: 'https://t.me/mcx_capital',
            linkedin: 'https://linkedin.com/company/mcx-capital'
        },

        // Brand Palette & Neon Color Tokens
        colors: {
            deepBg: '#05070f',
            darkerBg: '#020308',
            neonCyan: '#00C8FF',
            neonPurple: '#6A00FF',
            neonEmerald: '#00FFA3',
            neonGold: '#FFB800',
            textMain: '#F2F6FF',
            textMuted: '#94A3B8'
        },

        // Hero Terminal Startup Logs
        terminalLogs: [
            { prefix: '[سیستم]:', text: 'بارگذاری ماژول‌های پایتخت دیجیتال MCX با موفقیت انجام شد.' },
            { prefix: '[هسته]:', text: 'اتصال به شبکه عصبی MCX AIIL برقرار گردید.' },
            { prefix: '[پردازش]:', text: 'موتور تحلیلی MCX BIIL در حالت آماده‌باش کامل قرار دارد.' },
            { prefix: '[امضا]:', text: 'تایید اصالت معمار ارشد: Matin / M.N.Y. 1304.' },
            { prefix: '[وضعیت]:', text: 'آماده پذیرش شهروندان و کاوشگران دیجیتال...' }
        ],

        // Ecosystem Labs & Cores
        laboratories: {
            biil: {
                code: 'MCX BIIL',
                name: 'Business & Innovation Intelligence Lab',
                purpose: 'هوشمندی کسب‌وکار و هویت برند'
            },
            aiil: {
                code: 'MCX AIIL',
                name: 'Artificial Intelligence & Immersive Lab',
                purpose: 'هوش مصنوعی و تجربه‌های فراگیر'
            },
            nexus: {
                code: 'MCX NEXUS',
                name: 'Network & Synchronization Hub',
                purpose: 'شبکه ارتباطی و هاب هم‌افزایی'
            },
            vault: {
                code: 'MCX VAULT',
                name: 'Digital Assets & Code Vault',
                purpose: 'خزانه دارایی‌ها و کدهای مرجع'
            }
        },

        // UI & Animation Default Settings
        settings: {
            counterDuration: 2000,
            canvasParticleDensity: 16500,
            headerCompactThreshold: 60,
            enableCustomCursor: true,
            enableAudioAmbient: false
        }
    };

    // Attach globally to window object for access across all scripts
    window.MCX_CONFIG = Object.freeze(MCX_CONFIG);

})();
