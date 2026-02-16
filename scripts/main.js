/* ========================================
   Blender AI - Main JavaScript
   Orlando Studio Project
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // Theme Management
    // ========================================
    
    const ThemeManager = {
        STORAGE_KEY: 'blender-ai-theme',
        DARK_CLASS: 'theme--dark',
        
        init() {
            this.detectSystemPreference();
            this.attachListeners();
        },
        
        detectSystemPreference() {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            
            if (stored) {
                this.setTheme(stored);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.setTheme('dark');
            }
        },
        
        setTheme(theme) {
            localStorage.setItem(this.STORAGE_KEY, theme);
            
            if (theme === 'dark') {
                document.documentElement.classList.add(this.DARK_CLASS);
            } else {
                document.documentElement.classList.remove(this.DARK_CLASS);
            }
        },
        
        attachListeners() {
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    this.setTheme(e.matches ? 'dark' : 'light');
                });
            }
        }
    };

    // ========================================
    // Smooth Scroll Behavior
    // ========================================
    
    const SmoothScroll = {
        init() {
            this.attachListeners();
        },
        
        attachListeners() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }
    };

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    const AnimationObserver = {
        init() {
            if ('IntersectionObserver' in window) {
                this.observe();
            }
        },
        
        observe() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.features__card, .cta-section').forEach(el => {
                observer.observe(el);
            });
        }
    };

    // ========================================
    // Initialize on DOM Ready
    // ========================================
    
    function init() {
        ThemeManager.init();
        SmoothScroll.init();
        AnimationObserver.init();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();