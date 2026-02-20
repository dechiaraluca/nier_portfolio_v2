// Détection mobile (touch + pas de hover) — réduit les effets lourds sur CPU
const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Dark mode avec persistance localStorage
const toggle = document.getElementById('darkModeToggle');
const heroLight = document.querySelector('.hero-img-light');
const heroDark = document.querySelector('.hero-img-dark');

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    heroLight.classList.add('hidden');
    heroDark.classList.add('visible');
    // Démarre l'ambiance au chargement si déjà en dark mode
    // (délai pour laisser le DOM être prêt)
    setTimeout(startDarkAmbience, 500);
}

// === SON GLITCH (MP3) ===
const GLITCH_SOUND = './glitch.mp3';

function playGlitchSound() {
    try {
        const audio = new Audio(GLITCH_SOUND);
        audio.volume = 0.3;
        audio.play().catch(() => {});
    } catch (e) {

    }
}

// === FLASH DE CORRUPTION ===
function triggerCorruptionFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:white', 'opacity:0', 'pointer-events:none',
        'mix-blend-mode:overlay'
    ].join(';');
    document.body.appendChild(flash);

    const frames = [0.85, 0.3, 0.7, 0.1, 0.5, 0, 0.2, 0];
    let i = 0;
    const step = () => {
        if (i >= frames.length) { flash.remove(); return; }
        flash.style.opacity = frames[i++];
        setTimeout(step, 45);
    };
    step();
}

// === TEXTE "NieR" (reverse + scramble + upside-down + letter spread) ===
const GLITCH_CHARS = "⟡⟠⟣⟢⟰⟱⌁⌇⌿<>/\\|=+*#@!?∅∇∆≠≡∞";

const FLIP_MAP = {
    a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',
    l:'ʅ',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',y:'ʎ',
    A:'∀',C:'Ɔ',E:'Ǝ',F:'Ⅎ',H:'H',I:'I',J:'ſ',L:'⅂',M:'W',N:'N',O:'O',
    P:'Ԁ',T:'⊥',U:'∩',V:'Λ',W:'M',Y:'⅄'
};

function reverseString(str) {
    return [...str].reverse().join('');
}

// Construit le HTML avec chaque lettre dans un <span> déplacé aléatoirement
function buildGlitchedHTML(str, intensity) {
    let html = '';
    for (const ch of [...str]) {
        if (ch === ' ' || ch === '\n' || ch === '\t') {
            html += ' ';
            continue;
        }
        // Choix du caractère : glitch / retourné / original
        let c = ch;
        const r = Math.random();
        if (r < intensity * 0.5) {
            c = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else if (r < intensity * 0.72) {
            c = FLIP_MAP[ch] || ch;
        }
        // Échappement HTML sécurisé
        const safe = c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const dx = ((Math.random() - 0.5) * intensity * 24).toFixed(1);
        const dy = ((Math.random() - 0.5) * intensity * 11).toFixed(1);
        // Taille aléatoire — grande variance au pic (0.55→1.45em), revient à ~1 en fin
        const v = intensity * 0.6;
        const fs = (1 - v / 2 + Math.random() * v).toFixed(2);
        html += `<span style="display:inline-block;transform:translate(${dx}px,${dy}px);font-size:${fs}em;line-height:1">${safe}</span>`;
    }
    return html;
}

let glitchRafId = null;

function restoreGlitchEls() {
    document.querySelectorAll('.nier-glitch').forEach(el => {
        if (el.dataset.originalText !== undefined) {
            el.innerHTML = '';
            el.textContent = el.dataset.originalText;
            el.dataset.text = el.dataset.originalText;
            delete el.dataset.originalText;
        }
        el.classList.remove('is-glitching');
    });
    document.querySelector('.logo')?.classList.remove('is-glitching');
}

function startNierTextGlitch(duration = 1000) {
    // Annule et restore proprement avant de relancer
    if (glitchRafId !== null) {
        cancelAnimationFrame(glitchRafId);
        glitchRafId = null;
        restoreGlitchEls();
    }

    const els = Array.from(document.querySelectorAll('.nier-glitch'));
    const logo = document.querySelector('.logo');

    // Snapshot du texte propre — priorité à cleanText (source de vérité immuable)
    els.forEach(el => { el.dataset.originalText = el.dataset.cleanText || el.textContent.trim(); });
    if (logo) logo.classList.add('is-glitching');

    const t0 = performance.now();
    let lastUpdate = 0;

    function frame(now) {
        const p = Math.min(1, (now - t0) / duration);
        const intensity = 0.88 - (0.6 * p);

        // Throttle DOM à ~16fps (60ms) pour éviter de recalculer trop souvent
        if (now - lastUpdate >= 60) {
            lastUpdate = now;
            els.forEach(el => {
                const original = el.dataset.originalText || el.textContent;
                el.innerHTML = buildGlitchedHTML(reverseString(original), intensity);
                el.dataset.text = el.textContent;
                el.classList.add('is-glitching');
            });
        }

        if (p < 1) {
            glitchRafId = requestAnimationFrame(frame);
        } else {
            restoreGlitchEls();
            if (logo) logo.classList.remove('is-glitching');
            glitchRafId = null;
        }
    }

    glitchRafId = requestAnimationFrame(frame);
}

// === AMBIANCE DARK MODE — carrés glitch + corruption aléatoire des caractères ===

function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.top < window.innerHeight && r.bottom > 0;
}

function spawnGlitchArtifact() {
    const targets = Array.from(document.querySelectorAll('.nier-glitch')).filter(isInViewport);
    if (!targets.length) return;
    const target = targets[Math.floor(Math.random() * targets.length)];
    const rect = target.getBoundingClientRect();
    if (rect.width === 0) return;

    const art = document.createElement('div');
    const small = Math.random() < 0.65;
    const w = small ? 2 + Math.random() * 10  : 8 + Math.random() * 30;
    const h = small ? 2 + Math.random() * 5   : 3 + Math.random() * 8;
    const duration = 45 + Math.random() * 160;
    // Position strictement dans les bornes du texte
    const left = rect.left + Math.random() * rect.width;
    const top  = rect.top  + Math.random() * rect.height;
    // Trois variantes : blanc, gris, transparent
    const variant = Math.random();
    let bg;
    if (variant < 0.33)      bg = `rgba(255,255,255,${(0.55 + Math.random() * 0.35).toFixed(2)})`; // blanc
    else if (variant < 0.66) bg = `rgba(160,160,160,${(0.25 + Math.random() * 0.35).toFixed(2)})`; // gris
    else                     bg = `rgba(220,220,220,${(0.06 + Math.random() * 0.12).toFixed(2)})`; // transparent
    art.style.cssText =
        `position:fixed;z-index:9500;pointer-events:none;` +
        `background:${bg};` +
        `width:${w.toFixed(0)}px;height:${h.toFixed(0)}px;` +
        `left:${left.toFixed(1)}px;top:${top.toFixed(1)}px`;
    document.body.appendChild(art);
    setTimeout(() => art.remove(), duration);
}

let artifactTid = null;
function scheduleArtifact() {
    if (!document.body.classList.contains('dark-mode')) return;
    artifactTid = setTimeout(() => {
        const burst = Math.random() < 0.45 ? 2 + Math.floor(Math.random() * 4) : 1;
        for (let i = 0; i < burst; i++) setTimeout(spawnGlitchArtifact, Math.random() * 200);
        scheduleArtifact();
    }, isMobile ? 600 + Math.random() * 1200 : 200 + Math.random() * 700);
}

let ambientTid = null;
function ambientLetterCorrupt() {
    if (!document.body.classList.contains('dark-mode') || glitchRafId !== null) {
        scheduleAmbientCorrupt(); return;
    }
    const candidates = Array.from(document.querySelectorAll('.nier-glitch'))
        .filter(el => !el.dataset.originalText && !el.dataset.ambientLock && isInViewport(el));
    if (!candidates.length) { scheduleAmbientCorrupt(); return; }

    const el = candidates[Math.floor(Math.random() * candidates.length)];
    const clean = el.dataset.cleanText || el.textContent;
    el.dataset.ambientLock = '1';

    const chars = [...clean];
    // Un seul caractère, uniquement upside-down (FLIP_MAP) — plus lisible, plus NieR
    const flippableIdxs = chars.reduce((acc, c, i) => { if (FLIP_MAP[c]) acc.push(i); return acc; }, []);
    if (flippableIdxs.length) {
        const idx = flippableIdxs[Math.floor(Math.random() * flippableIdxs.length)];
        chars[idx] = FLIP_MAP[chars[idx]];
    }
    el.textContent = chars.join('');
    setTimeout(() => {
        el.textContent = clean;
        delete el.dataset.ambientLock;
    }, 80 + Math.random() * 180);

    scheduleAmbientCorrupt();
}

function scheduleAmbientCorrupt() {
    if (!document.body.classList.contains('dark-mode')) return;
    ambientTid = setTimeout(ambientLetterCorrupt, isMobile ? 500 + Math.random() * 600 : 350 + Math.random() * 450);
}

function randomizeAnimationDelays() {
    document.querySelectorAll('nav a.nier-glitch').forEach(el => {
        el.style.animationDelay = `-${(Math.random() * 3).toFixed(2)}s`;
    });
    document.querySelectorAll('section h2.nier-glitch').forEach(el => {
        el.style.animationDelay = `-${(Math.random() * 3).toFixed(2)}s`;
    });
    document.querySelectorAll('h1 .nier-glitch').forEach(el => {
        el.style.animationDelay = `-${(Math.random() * 3.5).toFixed(2)}s`;
    });
    document.querySelectorAll('footer h3.nier-glitch').forEach(el => {
        el.style.animationDelay = `-${(Math.random() * 4).toFixed(2)}s`;
    });
}

function clearAnimationDelays() {
    document.querySelectorAll('.nier-glitch').forEach(el => {
        el.style.animationDelay = '';
    });
}

function startDarkAmbience() {
    // Snapshot de vérité du texte propre pour toute la session dark mode
    document.querySelectorAll('.nier-glitch').forEach(el => {
        el.dataset.cleanText = el.textContent.trim();
    });
    randomizeAnimationDelays();
    scheduleArtifact();
    scheduleAmbientCorrupt();
}

function stopDarkAmbience() {
    clearTimeout(artifactTid);
    clearTimeout(ambientTid);
    artifactTid = null;
    ambientTid = null;
    document.querySelectorAll('.nier-glitch').forEach(el => {
        delete el.dataset.cleanText;
    });
    clearAnimationDelays();
}

toggle.addEventListener('click', () => {
    if (!isMobile) startNierTextGlitch();
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);

    if (isDark) {
        startDarkAmbience();
        playGlitchSound();
        triggerCorruptionFlash();
        heroLight.classList.add('glitch-out');
        heroLight.addEventListener('animationend', () => {
            heroLight.classList.add('hidden');
            heroLight.classList.remove('glitch-out');
            heroDark.classList.add('visible');
        }, { once: true });
    } else {
        stopDarkAmbience();
        playGlitchSound();
        heroDark.classList.remove('visible');
        heroLight.classList.remove('hidden');
        heroLight.classList.add('glitch-in');
        heroLight.addEventListener('animationend', () => {
            heroLight.classList.remove('glitch-in');
        }, { once: true });
    }
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
const visibleSections = new Set();

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
        } else {
            visibleSections.delete(entry.target.id);
        }
    });

    // Prendre la première section visible dans l'ordre du DOM
    const allSections = document.querySelectorAll('main section[id]');
    let activeSectionId = null;
    allSections.forEach(section => {
        if (!activeSectionId && visibleSections.has(section.id)) {
            activeSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + activeSectionId);
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

    const observerIn = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    const observerOut = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        observerIn.observe(section);
        observerOut.observe(section);
    });
});
