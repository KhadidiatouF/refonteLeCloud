const initMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }
};

const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
};

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    const sections = document.querySelectorAll('.temoignage-card, .avantage-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
};

const initSearch = () => {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    console.log('Recherche pour:', searchTerm);
                    alert(`Recherche pour: ${searchTerm}`);
                }
            }
        });
    }
};

const initCTAButtons = () => {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonText = btn.textContent.trim();
            console.log(`${buttonText} bouton cliqué`);
            
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            if (buttonText.includes('Commencer') || buttonText.includes('S\'inscrire')) {
                alert('Redirection vers la page d\'inscription...');
            } else if (buttonText.includes('Découvrir') || buttonText.includes('Voir')) {
                const formationsSection = document.querySelector('#formations');
                if (formationsSection) {
                    formationsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
};

const initCategoryButton = () => {
    const categoryBtn = document.querySelector('.category-btn');
    
    if (categoryBtn) {
        categoryBtn.addEventListener('click', () => {
            console.log('Menu des catégories cliqué');
            alert('Menu des catégories à venir!\n\n- Développement Web\n- Design UI/UX\n- Marketing Digital\n- Data Science\n- Business\n- Photographie\n- Langues');
        });
    }
};

const initNewsletterForm = () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && validateEmail(email)) {
                console.log('Inscription newsletter:', email);
                alert(`Merci ! Vous êtes inscrit à notre newsletter avec l'email: ${email}`);
                newsletterInput.value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
        
        // Soumission avec Enter
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
};

// ===== FORM VALIDATION =====
const validateForm = (formData) => {
    const errors = [];
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Email invalide');
    }
    
    if (formData.password && formData.password.length < 6) {
        errors.push('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    return errors;
};

// ===== EMAIL VALIDATION =====
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ===== STATS COUNTER ANIMATION =====
const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
};

const animateCounter = (element) => {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
};

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== SMOOTH REVEAL ON SCROLL =====
const initRevealOnScroll = () => {
    const reveals = document.querySelectorAll('.section-header, .cta-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15
    });
    
    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(20px)';
        reveal.style.transition = 'all 0.8s ease';
        revealObserver.observe(reveal);
    });
};

// ===== INITIALIZE ALL FUNCTIONS =====
const init = () => {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initSearch();
    initCTAButtons();
    initCategoryButton();
    initNewsletterForm();
    initStatsCounter();
    initRevealOnScroll();
    
    console.log('LeCloudFacile Platform initialized successfully!');
    console.log('Tous les modules sont actifs');

    // ===== HERO ANIMATIONS =====
    const initHeroAnimations = () => {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroCta = document.querySelector('.hero-cta');

        if (heroTitle) {
            heroTitle.style.opacity = '0';
            setTimeout(() => {
                heroTitle.style.transition = 'opacity 0.8s ease-out';
                heroTitle.style.opacity = '1';
            }, 200);
        }

        if (heroDescription) {
            heroDescription.style.opacity = '0';
            setTimeout(() => {
                heroDescription.style.transition = 'opacity 1.5s ease-out';
                heroDescription.style.opacity = '1';
            }, 600);
        }

        if (heroCta) {
            heroCta.style.opacity = '0';
            setTimeout(() => {
                heroCta.style.transition = 'opacity 0.8s ease-out';
                heroCta.style.opacity = '1';
            }, 1000);
        }
    };

    initHeroAnimations();

};

// ===== START APPLICATION =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== EXPORT FUNCTIONS FOR REUSE (si nécessaire) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        validateForm,
        validateEmail
    };
}