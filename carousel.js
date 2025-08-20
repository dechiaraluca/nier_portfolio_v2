let currentSlide = 0;
const totalSlides = 2;

function updateCarousel() {
    const wrapper = document.getElementById('carouselWrapper');
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
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
});