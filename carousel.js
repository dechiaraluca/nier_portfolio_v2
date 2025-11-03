let currentSlide = 0;
const totalSlides = 2;

function updateCarousel() {
    const wrapper = document.getElementById('carouselWrapper');
    
    // Seulement pour desktop
    if (window.innerWidth > 768) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            const isActive = index === currentSlide;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive);
        });
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Initialiser le carrousel
document.addEventListener('DOMContentLoaded', function() {
    updateCarousel();
    
    // Réinitialiser au resize
    window.addEventListener('resize', function() {
        const wrapper = document.getElementById('carouselWrapper');
        if (window.innerWidth <= 768) {
            // Reset scroll position en mobile
            wrapper.scrollLeft = 0;
        } else {
            updateCarousel();
        }
    });
});

// Support clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        if (window.innerWidth > 768) {
            // Desktop : navigation par slides
            prevSlide();
        } else {
            // Mobile : scroll vers la card précédente
            const wrapper = document.getElementById('carouselWrapper');
            const scrollAmount = wrapper.querySelector('.card').offsetWidth + 16; // card width + gap
            wrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    } else if (e.key === 'ArrowRight') {
        if (window.innerWidth > 768) {
            // Desktop : navigation par slides
            nextSlide();
        } else {
            // Mobile : scroll vers la card suivante
            const wrapper = document.getElementById('carouselWrapper');
            const scrollAmount = wrapper.querySelector('.card').offsetWidth + 16; // card width + gap
            wrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
});

// ===== INDICATEURS MOBILE (détection scroll) =====
if (window.innerWidth <= 768) {
    const wrapper = document.getElementById('carouselWrapper');
    const mobileDots = document.querySelectorAll('.mobile-dot');
    let scrollTimeout;

    wrapper.addEventListener('scroll', function() {
        // Debounce pour éviter trop de calculs
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            // Calculer quelle card est visible
            const scrollLeft = wrapper.scrollLeft;
            const cardWidth = wrapper.querySelector('.card').offsetWidth;
            const gap = 16; // 1rem en pixels
            
            // Index de la card actuellement visible (arrondi)
            const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            // Mettre à jour les dots
            mobileDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }, 100); // Attendre 100ms après le scroll
    });
}

// Réinitialiser au resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Réinitialiser le premier dot comme actif
        const mobileDots = document.querySelectorAll('.mobile-dot');
        mobileDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === 0);
        });
    }
});