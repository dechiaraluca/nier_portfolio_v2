// Section Projets : liste + panneau de détail (desktop), accordéon (mobile).
// Les projets viennent de data/content.js (commun avec /nier/).
(function () {
    const list = document.getElementById('projectsList');
    if (!list) return;

    // ---- Génération de la liste à partir des données communes ----
    const { projects, i18n } = window.PORTFOLIO;
    const fr = i18n.fr; // texte initial ; i18n.js traduit ensuite via les data-i18n
    const pad = (n) => String(n).padStart(2, '0');
    const total = pad(projects.length);
    const ext = (href, cls, key) =>
        `<a href="${href}" class="project-link ${cls}" target="_blank" rel="noopener noreferrer" data-i18n="${key}">${fr[key]}</a>`;

    list.style.setProperty('--count', projects.length);
    const count = document.getElementById('projectsCount');
    if (count) count.textContent = total;

    list.innerHTML = projects.map((p, i) => {
        const kindKey = 'kind.' + p.kind, descKey = 'project.' + p.id + '.desc';
        const first = i === 0;
        return `
        <li class="project-item">
            <button class="project-tab" id="project-tab-${p.id}" type="button"
                aria-expanded="${first}" aria-controls="project-panel-${p.id}">
                <span class="project-tab-marker" aria-hidden="true"></span>
                <span class="project-tab-num" aria-hidden="true">${pad(i + 1)}</span>
                <span class="project-tab-name">${p.name}</span>
                <span class="project-tab-kind" data-i18n="${kindKey}">${fr[kindKey]}</span>
            </button>
            <div class="project-panel" id="project-panel-${p.id}" role="region"
                aria-labelledby="project-tab-${p.id}"${first ? '' : ' hidden'}>
                <div class="project-panel-bar">
                    <h3 class="project-panel-title">${p.name}</h3>
                    <span class="project-panel-index" aria-hidden="true">[ ${pad(i + 1)} / ${total} ]</span>
                </div>
                <div class="project-panel-image">
                    <img src="assets/images/${p.img}" width="${p.w}" height="${p.h}" alt="${p.alt}" loading="lazy" />
                </div>
                <div class="project-panel-body">
                    <dl class="project-meta">
                        <div><dt data-i18n="projects.type">${fr['projects.type']}</dt><dd data-i18n="${kindKey}">${fr[kindKey]}</dd></div>
                        <div><dt data-i18n="projects.status">${fr['projects.status']}</dt><dd data-i18n="projects.online">${fr['projects.online']}</dd></div>
                    </dl>
                    <p class="project-desc" data-i18n="${descKey}">${fr[descKey]}</p>
                    <ul class="project-tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
                    <div class="project-links">
                        ${ext(p.site, 'primary', 'projects.' + p.siteLabel)}
                        ${p.code ? ext(p.code, 'secondary', 'projects.sourceCode')
                                 : `<span class="project-link disabled" data-i18n="projects.privateCode">${fr['projects.privateCode']}</span>`}
                    </div>
                </div>
            </div>
        </li>`;
    }).join('');

    // ---- Comportement ----

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
