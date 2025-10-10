// ==========================================
// TECH FUSION DESIGN - Portfolio Kweneth
// Script JavaScript avec animations avancÃ©es
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('ðŸš€ Portfolio Kweneth - Tech Fusion initialisÃ©');
    
    // ==========================================
    // SMOOTH SCROLL NAVIGATION
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // HEADER SCROLL EFFECTS - CORRIGÃ‰
    // ==========================================
    const header = document.querySelector('header');

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', debounce(handleHeaderScroll, 10));

    // ==========================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Observer une seule fois
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les Ã©lÃ©ments animÃ©s
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .formation-card, .skill-category, .language-item, .project-card'
    );

    animatedElements.forEach((el, index) => {
        // DÃ©lai d'animation basÃ© sur l'index
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ==========================================
    // BARRES DE PROGRESSION LANGUES - CORRIGÃ‰
    // ==========================================
    function animateLanguageBars() {
        const languageItems = document.querySelectorAll('.language-item');
        
        const langObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.language-progress');
                    if (progressBar) {
                        // Animation avec dÃ©lai (la largeur est dÃ©jÃ  dÃ©finie en inline dans le HTML)
                        setTimeout(() => {
                            progressBar.style.transition = 'width 1.5s ease-in-out';
                        }, 300);
                    }
                    langObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        languageItems.forEach(item => {
            langObserver.observe(item);
        });
    }

    animateLanguageBars();

    // ==========================================
    // CV DOWNLOAD BUTTONS INTERACTION
    // ==========================================
    function initDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.cv-download-btn');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Animation de feedback
                this.style.transform = 'scale(0.95)';
                
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TÃ©lÃ©chargement...';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.innerHTML = '<i class="fas fa-check"></i> TÃ©lÃ©chargÃ© !';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                }, 1500);
                
                console.log('TÃ©lÃ©chargement du CV de Kweneth KIKHOUNGA...');
            });
        });
    }

    initDownloadButtons();

    // ==========================================
    // PROJECT GALLERY INTERACTION
    // ==========================================
    function initProjectGallery() {
        console.log('ðŸŽ¬ Initialisation de la galerie projets...');
        
        const projectCards = document.querySelectorAll('.project-card');
        console.log(`Nombre de cartes projet: ${projectCards.length}`);
        
        projectCards.forEach((card, cardIndex) => {
            const mainImage = card.querySelector('.main-image img');
            const thumbnails = card.querySelectorAll('.thumbnail');
            const navBtns = card.querySelectorAll('.nav-btn');
            
            if (!mainImage) {
                console.warn('âš ï¸ Pas d\'image principale dans carte', cardIndex);
                return;
            }
            
            // Collecter toutes les images valides
            let images = [mainImage.src];
            
            thumbnails.forEach(thumb => {
                const thumbImg = thumb.querySelector('img');
                if (thumbImg && thumbImg.src && thumbImg.src !== '' && thumbImg.src !== window.location.href) {
                    images.push(thumbImg.src);
                }
            });
            
            console.log(`ðŸ“¦ Carte ${cardIndex + 1}: ${images.length} images`);
            
            let currentIndex = 0;
            
            // Gestion des clics sur thumbnails avec animation
            thumbnails.forEach((thumb, thumbIndex) => {
                const thumbImg = thumb.querySelector('img');
                
                if (!thumbImg || !thumbImg.src || thumbImg.src === '' || thumbImg.src === window.location.href) {
                    thumb.style.opacity = '0.3';
                    thumb.style.cursor = 'not-allowed';
                    return;
                }
                
                thumb.addEventListener('click', function() {
                    console.log(`ðŸ–±ï¸ Clic sur thumbnail ${thumbIndex + 1}`);
                    
                    // Animation de l'image principale
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        // Ã‰changer les sources
                        const tempSrc = mainImage.src;
                        mainImage.src = thumbImg.src;
                        thumbImg.src = tempSrc;
                        
                        // Restaurer l'animation
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1)';
                        
                        console.log('âœ… Images Ã©changÃ©es');
                    }, 300);
                });
            });
            
            // Gestion des boutons de navigation
            if (navBtns.length === 2 && images.length > 1) {
                // Bouton prÃ©cÃ©dent
                navBtns[0].addEventListener('click', () => {
                    console.log('â¬…ï¸ Navigation prÃ©cÃ©dente');
                    
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        mainImage.src = images[currentIndex];
                        
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1)';
                    }, 300);
                });
                
                // Bouton suivant
                navBtns[1].addEventListener('click', () => {
                    console.log('âž¡ï¸ Navigation suivante');
                    
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        currentIndex = (currentIndex + 1) % images.length;
                        mainImage.src = images[currentIndex];
                        
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1)';
                    }, 300);
                });
            }
        });
    }

    initProjectGallery();

    // ==========================================
    // GESTION DES ONGLETS CV
    // ==========================================
    function initCVTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        if (tabButtons.length === 0) return;
        
        function switchTab(targetTab) {
            // DÃ©sactiver tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Activer le bouton cliquÃ©
            const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
            
            // Afficher le contenu correspondant
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.style.display = 'block';
                setTimeout(() => {
                    activeContent.classList.add('active');
                }, 50);
            }
        }
        
        // Ajouter les event listeners aux boutons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
        
        // Initialiser avec l'onglet "experience" actif
        if (document.getElementById('experience')) {
            switchTab('experience');
        }
    }

    initCVTabs();

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!nav || !navLinks) return;
        
        // CrÃ©er le bouton mobile s'il n'existe pas
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            nav.appendChild(mobileToggle);
        }
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            
            if (navLinks.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fermer le menu mobile au clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }

    initMobileMenu();

    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        if (sections.length === 0) return;
        
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    initActiveNavigation();

    // ==========================================
    // PARALLAX EFFECT SUR HERO
    // ==========================================
    function initParallaxEffect() {
        const heroImage = document.querySelector('.hero-image');
        
        if (!heroImage) return;
        
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 10));
    }

    initParallaxEffect();

    // ==========================================
    // TYPING ANIMATION POUR TITRE
    // ==========================================
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.main-title .name-highlight');
        if (!heroTitle) return;

        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const typingSpeed = 100;

        function typeText() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Ajouter un curseur clignotant temporaire
                heroTitle.style.borderRight = '3px solid var(--cyan)';
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }

        // DÃ©lai avant de commencer l'animation
        setTimeout(typeText, 800);
    }

    // Activer seulement sur la page d'accueil
    if (document.querySelector('.hero')) {
        initTypingAnimation();
    }

    // ==========================================
    // CONTACT FORM VALIDATION
    // ==========================================
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Animation de soumission
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Simuler l'envoi (remplacer par vraie logique)
            setTimeout(() => {
                submitBtn.textContent = 'âœ“ Message envoyÃ© !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    initContactForm();

    // ==========================================
    // PERFORMANCE MONITORING
    // ==========================================
    function initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        console.log(`âš¡ Page chargÃ©e en ${Math.round(entry.loadEventEnd - entry.loadEventStart)}ms`);
                    }
                });
            });
            
            try {
                observer.observe({ entryTypes: ['navigation'] });
            } catch (error) {
                console.log('Performance monitoring non supportÃ©');
            }
        }
    }

    initPerformanceMonitoring();

    // ==========================================
    // EASTER EGG - KONAMI CODE - CORRIGÃ‰
    // ==========================================
    function initEasterEgg() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (event) => {
            if (event.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
        
        function activateEasterEgg() {
            console.log('ðŸŽ® Konami Code activÃ©!');
            document.body.style.animation = 'rainbow 2s ease infinite';
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    }

    initEasterEgg();

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    initLazyLoading();

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-item h3');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    if (!isNaN(number)) {
                        animateCounter(target, 0, number, 2000, text);
                        statsObserver.unobserve(target);
                    }
                }
            });
        });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    function animateCounter(element, start, end, duration, originalText) {
        const startTime = Date.now();
        const suffix = originalText.replace(/[0-9]/g, '');
        
        function update() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }

    initStatsCounter();

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    function initScrollToTop() {
        // CrÃ©er le bouton
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--cyan), var(--violet));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-md);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Afficher/masquer selon le scroll
        window.addEventListener('scroll', debounce(() => {
            if (window.pageYOffset > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, 100));
        
        // Action au clic
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initScrollToTop();

    // ==========================================
    // PROGRESS BAR AU SCROLL
    // ==========================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--cyan), var(--violet), var(--orange));
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', debounce(() => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }, 10));
    }

    initScrollProgress();

    // ==========================================
    // SAVE SCROLL POSITION
    // ==========================================
    function initScrollMemory() {
        // Sauvegarder la position de scroll avant de quitter
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('scrollPosition', window.pageYOffset);
        });
        
        // Restaurer la position au chargement
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition));
                sessionStorage.removeItem('scrollPosition');
            }, 100);
        }
    }

    initScrollMemory();

    // ==========================================
    // PRELOADER (optionnel)
    // ==========================================
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }, 500);
            });
        }
    }

    initPreloader();

    // ==========================================
    // COPY TO CLIPBOARD
    // ==========================================
    function initCopyButtons() {
        const copyButtons = document.querySelectorAll('[data-copy]');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const textToCopy = this.getAttribute('data-copy');
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    
                    const originalText = this.textContent;
                    this.textContent = 'âœ“ CopiÃ© !';
                    this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                } catch (err) {
                    console.error('Erreur de copie:', err);
                }
            });
        });
    }

    initCopyButtons();

    // ==========================================
    // TOOLTIP SYSTEM
    // ==========================================
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = this.getAttribute('data-tooltip');
                if (!tooltip) return;
                
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'custom-tooltip';
                tooltipEl.textContent = tooltip;
                tooltipEl.style.cssText = `
                    position: absolute;
                    background: rgba(2, 6, 23, 0.95);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    white-space: nowrap;
                    z-index: 10000;
                    pointer-events: none;
                    border: 1px solid var(--border-glow);
                `;
                
                document.body.appendChild(tooltipEl);
                
                const rect = this.getBoundingClientRect();
                tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 8) + 'px';
                tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
                
                this._tooltip = tooltipEl;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    this._tooltip.remove();
                    delete this._tooltip;
                }
            });
        });
    }

    initTooltips();

    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    function initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // ESC pour fermer le menu mobile
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                }
            }
            
            // Ctrl/Cmd + K pour focus sur recherche (si existe)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }

    initKeyboardNav();

    // ==========================================
    // IMAGE ERROR HANDLING
    // ==========================================
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.minHeight = '200px';
                this.alt = 'ðŸ–¼ï¸ Image non disponible';
            });
        });
    }

    initImageErrorHandling();

    // ==========================================
    // ANALYTICS (optionnel)
    // ==========================================
    function initAnalytics() {
        // Ã€ implÃ©menter selon vos besoins (Google Analytics, etc.)
        console.log('ðŸ“Š Analytics initialisÃ©');
    }

    initAnalytics();

    // ==========================================
    // CONSOLE EASTER EGG
    // ==========================================
    console.log('%cðŸš€ Portfolio Kweneth KIKHOUNGA', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
    console.log('%cIngÃ©nieur RF & TÃ©lÃ©communications', 'font-size: 14px; color: #8b5cf6;');
    console.log('%cMerci de visiter mon portfolio !', 'font-size: 12px; color: #94a3b8;');
    console.log('%c\nVous cherchez Ã  collaborer ? ðŸ‘‰ kwenethl@gmail.com', 'font-size: 12px; color: #f97316;');
    
    // ==========================================
    // LOG FINAL
    // ==========================================
    console.log('âœ… Toutes les fonctionnalitÃ©s initialisÃ©es avec succÃ¨s');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fonction debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction throttle
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// VÃ©rifier si un Ã©lÃ©ment est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// GÃ©nÃ©rer un ID unique
function generateUniqueId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Smooth reveal pour sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 50));

// Export des fonctions utilitaires
window.PortfolioUtils = {
    debounce,
    throttle,
    isElementInViewport,
    generateUniqueId,
    formatDate
};

// ==========================================
// PREFERENCE REDUCED MOTION
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    console.log('â™¿ Mode accessibilitÃ© : animations rÃ©duites');
}

// ==========================================
// SERVICE WORKER (optionnel - PWA)
// ==========================================
if ('serviceWorker' in navigator) {
    // DÃ©sactivÃ© par dÃ©faut
    // navigator.serviceWorker.register('/sw.js');
}

// ==========================================
// FIN DU FICHIER
// ==========================================