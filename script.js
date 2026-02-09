// Dark mode avec persistance localStorage
const toggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

// Burger menu mobile
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

burgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    burgerBtn.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        burgerBtn.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
    });
});

// Bouton retour en haut
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
