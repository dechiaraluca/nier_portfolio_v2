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

// Support clavier (desktop uniquement)
document.addEventListener('keydown', function(e) {
    if (window.innerWidth > 768) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});