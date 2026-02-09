let currentSlide = 0;
const totalSlides = 2;

function updateCarousel() {
    const wrapper = document.getElementById('carouselWrapper');

    if (window.innerWidth > 768) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.getElementById('prevBtn').disabled = currentSlide === 0;
        document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;

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

document.addEventListener('DOMContentLoaded', function() {
    // Boutons prev/next
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    document.getElementById('nextBtn').addEventListener('click', nextSlide);

    // Dots
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slide)));
    });

    updateCarousel();

    // Réinitialiser au resize
    window.addEventListener('resize', function() {
        const wrapper = document.getElementById('carouselWrapper');
        if (window.innerWidth <= 768) {
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
            prevSlide();
        } else {
            const wrapper = document.getElementById('carouselWrapper');
            const scrollAmount = wrapper.querySelector('.card').offsetWidth + 16;
            wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowRight') {
        if (window.innerWidth > 768) {
            nextSlide();
        } else {
            const wrapper = document.getElementById('carouselWrapper');
            const scrollAmount = wrapper.querySelector('.card').offsetWidth + 16;
            wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
});

// Indicateurs mobile (détection scroll)
if (window.innerWidth <= 768) {
    const wrapper = document.getElementById('carouselWrapper');
    const mobileDots = document.querySelectorAll('.mobile-dot');
    let scrollTimeout;

    wrapper.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            const scrollLeft = wrapper.scrollLeft;
            const cardWidth = wrapper.querySelector('.card').offsetWidth;
            const gap = 16;
            const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
            mobileDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }, 100);
    });
}

// Réinitialiser dots mobile au resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        const mobileDots = document.querySelectorAll('.mobile-dot');
        mobileDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === 0);
        });
    }
});
