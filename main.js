// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Sticky nav styling
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top visibility
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveLink();
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPos = targetEl.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ===== QUOTE FORM HANDLING =====
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || 'Not provided';
    const service = formData.get('service');
    const message = formData.get('message') || 'No details provided';
    
    // Build WhatsApp message
    const whatsappMsg = encodeURIComponent(
        `📩 *New Quote Request*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📧 *Email:* ${email}\n` +
        `🔧 *Service:* ${service}\n` +
        `📝 *Details:* ${message}`
    );
    
    // Show success message
    const formWrap = document.querySelector('.quote-form-wrap');
    formWrap.innerHTML = `
        <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your quote request has been received. We'll get back to you within 24 hours.</p>
            <p style="margin-top: 16px; font-size: 0.92rem; color: #6b7280;">You can also reach us directly:</p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px; flex-wrap: wrap;">
                <a href="https://wa.me/27635875716?text=${whatsappMsg}" target="_blank" 
                   style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #25D366; color: white; border-radius: 9999px; font-weight: 600; font-size: 0.95rem;">
                    <i class="fab fa-whatsapp"></i> Send via WhatsApp
                </a>
                <a href="tel:0635875716" 
                   style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #16a34a; color: white; border-radius: 9999px; font-weight: 600; font-size: 0.95rem;">
                    <i class="fas fa-phone"></i> Call Us
                </a>
            </div>
        </div>
    `;
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        
        if (text.includes('+')) {
            const target = parseInt(text);
            let current = 0;
            const increment = Math.ceil(target / 60);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = current + '+';
                }
            }, 25);
        }
    });
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== GALLERY LIGHTBOX (simple) =====
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.9); display: flex;
            align-items: center; justify-content: center;
            cursor: pointer; padding: 24px;
            animation: fadeInUp 0.3s ease-out;
        `;
        
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.alt;
        image.style.cssText = `
            max-width: 90%; max-height: 90vh;
            object-fit: contain; border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        overlay.appendChild(image);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        overlay.addEventListener('click', () => {
            overlay.remove();
            document.body.style.overflow = '';
        });
    });
});

// ===== NAVBAR BG on hero =====
const hero = document.querySelector('.hero');
if (hero) {
    const heroObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbar.style.background = 'transparent';
                navbar.style.borderBottom = '1px solid transparent';
                if (!navbar.classList.contains('scrolled') && window.scrollY < 50) {
                    navbar.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
                }
            } else {
                navbar.style.background = '';
            }
        });
    }, { threshold: 0.8 });
    
    heroObs.observe(hero);
}

// ===== IMAGE ERROR HANDLER (fallbacks for broken links) =====
function addImageFallbacks() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        img.addEventListener('error', () => {
            if (img.dataset.fallbackSet) return;
            img.dataset.fallbackSet = '1';

            // Choose a sensible local fallback
            if (img.src && img.src.includes('logo')) {
                img.src = 'images/logo.svg';
            } else if (img.src && img.src.includes('hero')) {
                img.src = 'images/hero-bg.png';
            } else {
                img.src = 'images/hero-bg.png';
            }

            img.classList.add('img-fallback');
        });
    });
}

document.addEventListener('DOMContentLoaded', addImageFallbacks);

// ===== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE =====
document.addEventListener('click', (e) => {
    const isClickInside = e.target.closest('.nav-container');
    if (!isClickInside && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});
