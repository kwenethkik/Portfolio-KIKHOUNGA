// ==========================================
// TECH FUSION DESIGN - Portfolio Kweneth
// JavaScript optimisé et nettoyé
// ==========================================

(function() {
    'use strict';
    
    console.log('🛠️ Portfolio Kweneth - Initialisation...');
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
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
    
    // ==========================================
    // SMOOTH SCROLL NAVIGATION
    // ==========================================
    
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile si ouvert
                    const navLinks = document.querySelector('.nav-links');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (navLinks && navLinks.classList.contains('mobile-open')) {
                        navLinks.classList.remove('mobile-open');
                        if (mobileToggle) mobileToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }
    
    // ==========================================
    // HEADER SCROLL EFFECTS
    // ==========================================
    
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', debounce(handleScroll, 10));
        handleScroll(); // Check initial state
    }
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    function initMobileMenu() {
        console.log('🛠️ Initialisation du menu mobile...');

        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!nav || !navLinks) {
            console.warn('⚠️ Éléments nav ou nav-links introuvables');
            return;
        }

        // Créer le bouton mobile s'il n'existe pas
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!mobileToggle) {
            console.log('🛠️ Création du bouton hamburger...');

            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            // Utiliser uniquement l'icône fa-bars (🍔) de Font Awesome
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            mobileToggle.setAttribute('type', 'button');
            
            // Insérer après le logo
            const logo = nav.querySelector('.logo');
            if (logo) {
                logo.insertAdjacentElement('afterend', mobileToggle);
            } else {
                nav.appendChild(mobileToggle);
            }

            console.log('✅ Bouton hamburger créé avec succès');
        }
        
        // Toggle du menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isOpen = navLinks.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');

            console.log(`🛠️ Menu mobile ${isOpen ? 'ouvert' : 'fermé'}`);

            // Bloquer le scroll du body quand le menu est ouvert
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Fermer le menu au clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('🛠️ Clic sur lien - fermeture du menu');
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer au clic en dehors du menu
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('mobile-open')) {
                if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                    console.log('🛠️ Clic extérieur - fermeture du menu');
                    navLinks.classList.remove('mobile-open');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
                console.log('🛠️ Escape - fermeture du menu');
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Vérifier la taille de l'écran au redimensionnement
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    // Desktop : fermer le menu et restaurer le scroll
                    navLinks.classList.remove('mobile-open');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('🛠️ Mode desktop - menu restauré');
                }
            }, 250);
        });
        
        console.log('✅ Menu mobile initialisé avec succès');
    }
    
    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    
    function initScrollToTop() {
        // Vérifier si le bouton existe déjà
        let scrollBtn = document.querySelector('.scroll-to-top');

        // Créer le bouton s'il n'existe pas
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.setAttribute('aria-label', 'Retour en haut de page');
            scrollBtn.setAttribute('type', 'button');
            document.body.appendChild(scrollBtn);
        }
        
        // Afficher/masquer selon le scroll
        function toggleScrollButton() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', debounce(toggleScrollButton, 100));
        toggleScrollButton(); // Check initial state
        
        // Action au clic
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Animation de feedback
            scrollBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                scrollBtn.style.transform = '';
            }, 150);
        });
        
        console.log('✅ Bouton scroll-to-top initialisé avec succès');
    }
    
    // ==========================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ==========================================
    
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll(
            '.timeline-item, .formation-card, .skill-category, .language-item, .project-card'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // ==========================================
    // LANGUAGE PROGRESS BARS
    // ==========================================
    
    function initLanguageBars() {
        const languageItems = document.querySelectorAll('.language-item');
        if (languageItems.length === 0) return;
        
        const langObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.language-progress');
                    if (progressBar) {
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
    
    // ==========================================
    // CV TABS NAVIGATION
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
        
        console.log('âœ… Onglets CV initialisÃ©s');
    }
    
    // ==========================================
    // PROJECT GALLERY NAVIGATION
    // ==========================================
    
    function initProjectGallery() {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;

        console.log(`🖼️ ${projectCards.length} cartes projet trouvées`);

        projectCards.forEach((card, cardIndex) => {
            const mainImage = card.querySelector('.main-image img');
            const thumbnails = card.querySelectorAll('.thumbnail');
            const navBtns = card.querySelectorAll('.nav-btn');
            
            if (!mainImage) {
                console.warn(`⚠️ Pas d'image principale dans la carte ${cardIndex + 1}`);
                return;
            }

            // S'assurer que les boutons ont les icônes Font Awesome
            if (navBtns.length === 2) {
                navBtns[0].innerHTML = '<i class="fas fa-chevron-left"></i>';
                navBtns[1].innerHTML = '<i class="fas fa-chevron-right"></i>';
            }
            
            // Collecter toutes les images valides
            let images = [mainImage.src];
            
            thumbnails.forEach(thumb => {
                const thumbImg = thumb.querySelector('img');
                if (thumbImg && thumbImg.src && thumbImg.src !== '' && thumbImg.src !== window.location.href) {
                    images.push(thumbImg.src);
                }
            });
            
            console.log(`🖼️ Carte ${cardIndex + 1}: ${images.length} images`);
            
            let currentIndex = 0;
            
            // Gestion des clics sur thumbnails
            thumbnails.forEach((thumb, thumbIndex) => {
                const thumbImg = thumb.querySelector('img');
                
                if (!thumbImg || !thumbImg.src || thumbImg.src === '' || thumbImg.src === window.location.href) {
                    thumb.style.opacity = '0.3';
                    thumb.style.cursor = 'not-allowed';
                    return;
                }
                
                thumb.addEventListener('click', function() {
                    console.log(`🖼️ Clic sur thumbnail ${thumbIndex + 1}`);

                    // Animation de l'image principale
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        // Échanger les sources
                        const tempSrc = mainImage.src;
                        mainImage.src = thumbImg.src;
                        thumbImg.src = tempSrc;

                        // Mettre à jour l'index
                        currentIndex = images.indexOf(mainImage.src);
                        
                        // Restaurer l'animation
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1)';
                    }, 300);
                });
            });
            
            // Gestion des boutons de navigation
            if (navBtns.length === 2 && images.length > 1) {
                // Bouton précédent
                navBtns[0].addEventListener('click', () => {
                    console.log('🖼️ Navigation précédente');

                    // Effet visuel sur le bouton
                    navBtns[0].style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        navBtns[0].style.transform = '';
                    }, 150);
                    
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95) translateX(20px)';
                    
                    setTimeout(() => {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        mainImage.src = images[currentIndex];
                        
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1) translateX(0)';
                    }, 300);
                });
                
                // Bouton suivant
                navBtns[1].addEventListener('click', () => {
                    console.log('🖼️ Navigation suivante');

                    // Effet visuel sur le bouton
                    navBtns[1].style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        navBtns[1].style.transform = '';
                    }, 150);
                    
                    mainImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mainImage.style.opacity = '0';
                    mainImage.style.transform = 'scale(0.95) translateX(-20px)';
                    
                    setTimeout(() => {
                        currentIndex = (currentIndex + 1) % images.length;
                        mainImage.src = images[currentIndex];
                        
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1) translateX(0)';
                    }, 300);
                });
            }
        });
        
        // Support du clavier (flÃ¨ches gauche/droite)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const firstCard = document.querySelector('.project-card');
                if (!firstCard) return;
                
                const navBtns = firstCard.querySelectorAll('.nav-btn');
                if (navBtns.length === 2) {
                    e.preventDefault();
                    if (e.key === 'ArrowLeft') {
                        navBtns[0].click();
                    } else {
                        navBtns[1].click();
                    }
                }
            }
        });
        
        console.log('🖼️ Galerie projets initialisée');
    }
    
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
    
    // ==========================================
    // CONTACT FORM HANDLING
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
            
            // Simuler l'envoi
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
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
    
    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-item h3');
        if (statNumbers.length === 0) return;
        
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
    }
    
    // ==========================================
    // PROGRESS BAR AU SCROLL
    // ==========================================
    
    function initScrollProgress() {
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
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
        }
        
        window.addEventListener('scroll', debounce(() => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }, 10));
    }
    
    // ==========================================
    // IMAGE ERROR HANDLING
    // ==========================================
    
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.background = 'linear-gradient(135deg, rgb(6 182 212 / 10%), rgb(139 92 246 / 10%))';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.minHeight = '200px';
                this.alt = 'Image non disponible';
            });
        });
    }
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    function initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // ESC pour fermer le menu mobile
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    
    function showConsoleMessage() {
        console.log('%c🛠️ Portfolio Kweneth KIKHOUNGA', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
        console.log('%cIngénieur RF & Télécommunications', 'font-size: 14px; color: #8b5cf6;');
        console.log('%cMerci de visiter mon portfolio !', 'font-size: 12px; color: #94a3b8;');
        console.log('%c\nVous cherchez à collaborer ? 📨 kwenethl@gmail.com', 'font-size: 12px; color: #f97316;');
    }
    
    // ==========================================
    // INITIALISATION PRINCIPALE
    // ==========================================
    
    function init() {
        console.log('🛠️ Initialisation du portfolio...');
        
        // Fonctions essentielles (toujours actives)
        initSmoothScroll();
        initHeaderScroll();
        initMobileMenu();
        initScrollToTop();
        initScrollProgress();
        initImageErrorHandling();
        initKeyboardNav();
        initAnimations();
        
        // Fonctions conditionnelles (selon la page)
        initCVTabs();
        initProjectGallery();
        initActiveNavigation();
        initLanguageBars();
        initStatsCounter();
        initContactForm();
        
        // Message console
        showConsoleMessage();
        
        console.log('✅ Portfolio initialisé avec succès !');
    }
    
    // Lancer l'initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();