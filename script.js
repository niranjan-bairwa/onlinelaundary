// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Carousel Functionality
const carousel = {
    currentSlide: 0,
    slides: document.querySelectorAll('.carousel-slide'),
    dots: document.querySelectorAll('.carousel-dot'),
    autoPlayInterval: null,
    autoPlayDelay: 5000, // 5 seconds

    init() {
        // Add event listeners for navigation
        document.querySelector('.carousel-prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carousel-next').addEventListener('click', () => this.nextSlide());
        
        // Add event listeners for dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        document.querySelector('.carousel').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.carousel').addEventListener('mouseleave', () => this.startAutoPlay());

        // Handle touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.querySelector('.carousel').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        document.querySelector('.carousel').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, false);
    },

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                this.nextSlide(); // Swipe left
            } else {
                this.prevSlide(); // Swipe right
            }
        }
    },

    updateSlides() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
        });
    },

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    },

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    },

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    },

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
};

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
});

// Loading Overlay
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 500);
});

// Mobile Menu Toggle with improved animation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuBtn.setAttribute('aria-expanded', isMenuOpen);
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    menuBtn.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        requestAnimationFrame(() => {
            navLinks.classList.add('slide-in');
        });
    } else {
        navLinks.classList.remove('slide-in');
        setTimeout(() => {
            if (!isMenuOpen) {
                navLinks.style.display = 'none';
            }
        }, 300);
    }
}

function closeMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        menuBtn.setAttribute('aria-expanded', false);
        navLinks.classList.remove('active', 'slide-in');
        body.classList.remove('menu-open');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        setTimeout(() => {
            if (!isMenuOpen) {
                navLinks.style.display = 'none';
            }
        }, 300);
    }
}

// Event Listeners for Menu
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
    }
});

// Close menu when clicking on navigation links
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    }, 250);
});

// Add scroll-based navbar styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop?.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop?.classList.remove('visible');
    }
});

// Modal Functions with improved UX
function openOrderForm() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeOrderForm() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        body.style.overflow = '';
    }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderForm();
    }
}

// Form Validation and Submission
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

function showLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    return originalText;
}

function resetButtonState(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

async function submitOrderForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!validateForm(form)) {
        alert('Please fill in all required fields');
        return;
    }

    const originalText = showLoadingState(submitButton);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically handle the form submission to your backend
        alert('Thank you for your order! We will contact you shortly to confirm the pickup.');
        form.reset();
        closeOrderForm();
    } catch (error) {
        alert('There was an error submitting your order. Please try again.');
    } finally {
        resetButtonState(submitButton, originalText);
    }
}

async function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!validateForm(form)) {
        alert('Please fill in all required fields');
        return;
    }

    const originalText = showLoadingState(submitButton);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically handle the form submission to your backend
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    } catch (error) {
        alert('There was an error sending your message. Please try again.');
    } finally {
        resetButtonState(submitButton, originalText);
    }
}

// Smooth Scrolling with improved behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});