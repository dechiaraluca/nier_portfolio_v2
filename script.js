const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

const scrollToTopBtn = document.getElementById('scrollToTop');

// Fonction pour afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) { // Apparaît après 100px de scroll
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Fonction de retour en haut avec animation fluide
scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Détection du footer pour changer l'apparence du bouton
const footer = document.querySelector('footer'); // Adaptez le sélecteur

window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY + window.innerHeight;
    const footerPos = footer.offsetTop;

    if (scrollPos >= footerPos) {
        scrollToTopBtn.classList.add('in-footer');
    } else {
        scrollToTopBtn.classList.remove('in-footer');
    }
});

// Animation scroll

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les sections
    const sections = document.querySelectorAll('section');
    
    // Ajouter la classe d'animation initiale
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Observer pour détecter quand les sections entrent dans la vue
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // Déclenche quand 20% de la section est visible
    });

    // Observer chaque section
    sections.forEach(section => {
        observer.observe(section);
    });
});