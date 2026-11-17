// Section Projets : liste + panneau de détail (desktop), accordéon (mobile).
(function () {
    const list = document.getElementById('projectsList');
    if (!list) return;

    const tabs = Array.from(list.querySelectorAll('.project-tab'));
    const mobile = window.matchMedia('(max-width: 768px)');

    const panelOf = (tab) => document.getElementById(tab.getAttribute('aria-controls'));
    const isOpen = (tab) => tab.getAttribute('aria-expanded') === 'true';

    function setOpen(tab, open) {
        tab.setAttribute('aria-expanded', String(open));
        panelOf(tab).hidden = !open;
    }

    // Un seul projet ouvert à la fois
    function select(tab) {
        tabs.forEach(t => setOpen(t, t === tab));
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            if (!mobile.matches) {
                select(tab);
                return;
            }
            // Mobile : un second tap referme le projet
            if (isOpen(tab)) {
                setOpen(tab, false);
                return;
            }
            select(tab);
            // Fermer le projet du dessus décale la page : on garde la ligne touchée visible
            requestAnimationFrame(() => tab.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
        });

        // Flèches actives seulement quand le focus est dans la liste
        tab.addEventListener('keydown', (e) => {
            let next = null;
            if (e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
            else if (e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
            else if (e.key === 'Home') next = tabs[0];
            else if (e.key === 'End') next = tabs[tabs.length - 1];
            if (!next) return;

            e.preventDefault();
            next.focus();
            if (!mobile.matches) select(next);
        });
    });

    // Passage mobile -> desktop avec tout fermé : le panneau ne doit pas rester vide
    mobile.addEventListener('change', (e) => {
        if (!e.matches && !tabs.some(isOpen)) select(tabs[0]);
    });
})();
