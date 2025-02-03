// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Modal Functions
function openOrderForm() {
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderForm();
    }
}

// Form Submissions
function submitOrderForm(event) {
    event.preventDefault();
    // Here you would typically handle the form submission
    alert('Thank you for your order! We will contact you shortly to confirm the pickup.');
    closeOrderForm();
}

function submitContactForm(event) {
    event.preventDefault();
    // Here you would typically handle the form submission
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});