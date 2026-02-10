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
    link.addEventListener('click', (e) => {
        const wasOpen = mainNav.classList.contains('open');
        mainNav.classList.remove('open');
        burgerBtn.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        if (wasOpen) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
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

// Formulaire contact - envoi AJAX + feedback
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        fetch(contactForm.getAttribute('action') || location.pathname, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        }).then((res) => {
            if (!res.ok) throw new Error(res.status);
            contactForm.reset();
            formSuccess.hidden = false;
            setTimeout(() => { formSuccess.hidden = true; }, 5000);
        }).catch(() => {
            formSuccess.style.color = '#c0392b';
            formSuccess.textContent = 'Erreur, veuillez réessayer.';
            formSuccess.hidden = false;
            setTimeout(() => { formSuccess.hidden = true; formSuccess.style.color = ''; }, 5000);
        });
    });
}

// Nav active au scroll
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

document.querySelectorAll('main section[id]').forEach(section => {
    navObserver.observe(section);
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
