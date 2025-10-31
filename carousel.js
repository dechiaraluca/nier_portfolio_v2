let currentSlide = 0;
const totalSlides = 2;

function updateCarousel() {
    const wrapper = document.getElementById('carouselWrapper');
    
    // Desktop : utiliser transform
    if (window.innerWidth > 768) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    } else {
        // Mobile : scroll natif
        const cards = wrapper.querySelectorAll('.card');
        if (cards[currentSlide * 3]) {
            cards[currentSlide * 3].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    }
    
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        const isActive = index === currentSlide;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive);
    });
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

// Initialiser le carrousel quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    updateCarousel();
    
    // Ajuster au redimensionnement
    window.addEventListener('resize', updateCarousel);
});

// ===== SUPPORT TACTILE POUR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

const carouselWrapper = document.getElementById('carouselWrapper');

carouselWrapper.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

carouselWrapper.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    if (diffY > Math.abs(diffX)) {
        return;
    }

    if (diffX > swipeThreshold) {
        nextSlide();
    }
    
    if (diffX < -swipeThreshold) {
        prevSlide();
    }
}

// Support clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});