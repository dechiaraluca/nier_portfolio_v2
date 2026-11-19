// Textes FR / EN / IT : définis dans data/content.js (commun avec /nier/)
const translations = window.PORTFOLIO.i18n;

const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

function setLanguage(lang, animate = true) {
    const t = translations[lang];
    if (!t) return;

    const elements = document.querySelectorAll('[data-i18n]');

    if (animate) {
        elements.forEach(el => el.style.opacity = '0');

        setTimeout(() => {
            applyTranslations(t, elements);
            updateLangUI(lang);
            elements.forEach(el => el.style.opacity = '1');
        }, 200);
    } else {
        applyTranslations(t, elements);
        updateLangUI(lang);
    }
}

function applyTranslations(t, elements) {
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
            // Si dark mode actif : mettre à jour cleanText pour que le glitch utilise la nouvelle langue
            if (el.dataset.cleanText !== undefined) {
                el.dataset.cleanText = t[key];
            }
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
}

function updateLangUI(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    langToggle.innerHTML = lang.toUpperCase() + ' <span class="arrow">▾</span>';
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function closeLangMenu() {
    langMenu.classList.remove('open');
    langToggle.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
}

langToggle.addEventListener('click', () => {
    const isOpen = langMenu.classList.toggle('open');
    langToggle.classList.toggle('open');
    langToggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown')) {
        closeLangMenu();
    }
});

document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        closeLangMenu();
    });
});

// Appliqué aussi en français : data/content.js est la seule source des textes
// (le français écrit dans index.html ne sert que de secours sans JavaScript / pour le SEO)
const savedLang = localStorage.getItem('lang') || 'fr';
setLanguage(translations[savedLang] ? savedLang : 'fr', false);
