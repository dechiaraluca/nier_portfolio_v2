// Interface NieR du portfolio : menu plein écran, sans défilement.
(() => {
	const IMG = '../assets/images/';
	const LANGS = ['fr', 'en', 'it'];
	const pad = n => String(n).padStart(2, '0');

	/* ================= Textes ================= */
	// Textes propres à l'interface NieR. Les textes communs (projets, bio, services, formulaire…)
	// viennent de data/content.js et sont fusionnés juste en dessous.
	const OWN = {
		fr: {
			skip: 'Aller au contenu', tagline: 'Développeur web // Grenoble',
			classic: 'Interface classique', classicShort: '◂ Classique',
			sound: 'Son', on: 'on', off: 'off', back: '‹ Retour',
			or: 'ou', wheel: 'Molette', hSection: 'Section', hSelect: 'Sélection', enter: 'Entrée', hOpen: 'Ouvrir',
			hSwipe: 'Glisser : section', boot: 'Initialisation du système',
			entries: 'Entrées', title: 'Luca De Chiara — Interface NieR',
			// sections
			'profil': 'Profil', 'profil.sub': '01 // Unité',
			'archives': 'Archives', 'archives.sub': '02 // Archives',
			'systeme': 'Système', 'systeme.sub': '03 // Système',
			'transmission': 'Transmission', 'transmission.short': 'Contact', 'transmission.sub': '04 // Transmission',
			identity: 'Identité', record: 'Fiche', name: 'Nom', role: 'Fonction', roleV: 'Développeur web',
			base: 'Base', baseV: 'Grenoble, France', cert: 'Titre', certV: 'Développeur Web et Web Mobile',
			studies: 'Cursus', studiesV: 'Bachelor IA & Big Data', portrait: 'Illustration de Luca De Chiara à son bureau',
			approach: 'Approche', method: 'Méthode',
			approachLead: "Je conçois des sites modernes et responsives, de l'interface jusqu'à la mise en ligne, en passant par le back-end (PHP, Laravel, MySQL).",
			step1: 'Comprendre votre besoin', step2: 'Proposer une solution simple et adaptée', step3: 'Livrer un site fiable et facile à faire évoluer',
			origins: 'Origines', log: 'Journal', logEntry: 'Entrée de journal',
			services: 'Services', offer: 'Offre',
			cv: 'Dossier CV', file: 'Fichier', format: 'Format', 
			module: 'Module', languages: 'Langages', tools: 'Outils', related: 'Projets liés',
			frontLead: "Interfaces responsives, du maquettage à l'intégration.",
			backLead: 'Logique serveur, données et applications sur mesure.',
			langLead: 'Au-delà du web : applications desktop, data et IA.',
			'r.html': 'Structure & sémantique', 'r.css': 'Mise en page & animations', 'r.js': 'Interactions', 'r.tw': 'Interfaces utilitaires',
			'r.php': 'Logique serveur', 'r.laravel': 'Applications web', 'r.mysql': 'Bases de données',
			'r.python': 'Data & IA', 'r.java': 'Applications desktop', 'r.git': 'Versionnage', 'r.github': 'Dépôts publics',
			myGithub: 'Voir mon GitHub',
			message: 'Message', form: 'Formulaire', sendTitle: 'Envoyer une transmission',
			sending: '[ Transmission en cours… ]',
			invalid: '[ Champs requis manquants ou email invalide ]',
			failed: "[ Échec de l'envoi — écrivez-moi par email ]",
			email: 'Email', channel: 'Canal', address: 'Adresse', writeEmail: 'Écrire un email',
			phone: 'Téléphone', number: 'Numéro', call: 'Appeler',
			network: 'Réseau', liLead: 'Parcours, recommandations et actualités professionnelles.', openLi: 'Ouvrir LinkedIn',
			ghLead: 'Code source des projets publics.', openGh: 'Ouvrir GitHub',
		},
		en: {
			skip: 'Skip to content', tagline: 'Web developer // Grenoble',
			classic: 'Classic interface', classicShort: '◂ Classic',
			sound: 'Sound', on: 'on', off: 'off', back: '‹ Back',
			or: 'or', wheel: 'Wheel', hSection: 'Section', hSelect: 'Select', enter: 'Enter', hOpen: 'Open',
			hSwipe: 'Swipe: section', boot: 'System initialization',
			entries: 'Entries', title: 'Luca De Chiara — NieR interface',
			'profil': 'Profile', 'profil.sub': '01 // Unit',
			'archives': 'Archives', 'archives.sub': '02 // Archives',
			'systeme': 'System', 'systeme.sub': '03 // System',
			'transmission': 'Transmission', 'transmission.short': 'Contact', 'transmission.sub': '04 // Transmission',
			identity: 'Identity', record: 'Record', name: 'Name', role: 'Role', roleV: 'Web developer',
			base: 'Based in', baseV: 'Grenoble, France', cert: 'Certification', certV: 'Web and Mobile Web Developer',
			studies: 'Studies', studiesV: "Bachelor's in AI & Big Data", portrait: 'Illustration of Luca De Chiara at his desk',
			approach: 'Approach', method: 'Method',
			approachLead: 'I build modern, responsive websites, from the interface to deployment, including the back-end (PHP, Laravel, MySQL).',
			step1: 'Understand your needs', step2: 'Offer a simple, tailored solution', step3: "Deliver a reliable site that's easy to evolve",
			origins: 'Origins', log: 'Log', logEntry: 'Log entry',
			services: 'Services', offer: 'Offer',
			cv: 'CV file', file: 'File', format: 'Format', 
			module: 'Module', languages: 'Languages', tools: 'Tools', related: 'Related projects',
			frontLead: 'Responsive interfaces, from mockup to integration.',
			backLead: 'Server logic, data and custom applications.',
			langLead: 'Beyond the web: desktop apps, data and AI.',
			'r.html': 'Structure & semantics', 'r.css': 'Layout & animations', 'r.js': 'Interactions', 'r.tw': 'Utility-first UIs',
			'r.php': 'Server logic', 'r.laravel': 'Web applications', 'r.mysql': 'Databases',
			'r.python': 'Data & AI', 'r.java': 'Desktop apps', 'r.git': 'Version control', 'r.github': 'Public repositories',
			myGithub: 'View my GitHub',
			message: 'Message', form: 'Form', sendTitle: 'Send a transmission',
			sending: '[ Transmitting… ]',
			invalid: '[ Missing required fields or invalid email ]',
			failed: '[ Sending failed — please email me ]',
			email: 'Email', channel: 'Channel', address: 'Address', writeEmail: 'Send an email',
			phone: 'Phone', number: 'Number', call: 'Call',
			network: 'Network', liLead: 'Background, recommendations and professional updates.', openLi: 'Open LinkedIn',
			ghLead: 'Source code of public projects.', openGh: 'Open GitHub',
		},
		it: {
			skip: 'Vai al contenuto', tagline: 'Sviluppatore web // Grenoble',
			classic: 'Interfaccia classica', classicShort: '◂ Classica',
			sound: 'Suono', on: 'on', off: 'off', back: '‹ Indietro',
			or: 'o', wheel: 'Rotella', hSection: 'Sezione', hSelect: 'Selezione', enter: 'Invio', hOpen: 'Apri',
			hSwipe: 'Scorri: sezione', boot: 'Inizializzazione del sistema',
			entries: 'Voci', title: 'Luca De Chiara — Interfaccia NieR',
			'profil': 'Profilo', 'profil.sub': '01 // Unità',
			'archives': 'Archivio', 'archives.sub': '02 // Archivio',
			'systeme': 'Sistema', 'systeme.sub': '03 // Sistema',
			'transmission': 'Trasmissione', 'transmission.short': 'Contatti', 'transmission.sub': '04 // Trasmissione',
			identity: 'Identità', record: 'Scheda', name: 'Nome', role: 'Ruolo', roleV: 'Sviluppatore web',
			base: 'Sede', baseV: 'Grenoble, Francia', cert: 'Titolo', certV: 'Sviluppatore Web e Web Mobile',
			studies: 'Percorso', studiesV: 'Bachelor in IA & Big Data', portrait: 'Illustrazione di Luca De Chiara alla scrivania',
			approach: 'Approccio', method: 'Metodo',
			approachLead: "Realizzo siti moderni e responsive, dall'interfaccia alla messa online, passando per il back-end (PHP, Laravel, MySQL).",
			step1: 'Capire le tue esigenze', step2: 'Proporre una soluzione semplice e su misura', step3: 'Consegnare un sito affidabile e facile da far evolvere',
			origins: 'Origini', log: 'Diario', logEntry: 'Voce di diario',
			services: 'Servizi', offer: 'Offerta',
			cv: 'File CV', file: 'File', format: 'Formato', 
			module: 'Modulo', languages: 'Linguaggi', tools: 'Strumenti', related: 'Progetti collegati',
			frontLead: "Interfacce responsive, dal mockup all'integrazione.",
			backLead: 'Logica server, dati e applicazioni su misura.',
			langLead: 'Oltre il web: applicazioni desktop, dati e IA.',
			'r.html': 'Struttura e semantica', 'r.css': 'Layout e animazioni', 'r.js': 'Interazioni', 'r.tw': 'Interfacce utility-first',
			'r.php': 'Logica server', 'r.laravel': 'Applicazioni web', 'r.mysql': 'Database',
			'r.python': 'Dati e IA', 'r.java': 'Applicazioni desktop', 'r.git': 'Controllo versione', 'r.github': 'Repository pubblici',
			myGithub: 'Vedi il mio GitHub',
			message: 'Messaggio', form: 'Modulo', sendTitle: 'Invia una trasmissione',
			sending: '[ Trasmissione in corso… ]',
			invalid: '[ Campi obbligatori mancanti o email non valida ]',
			failed: '[ Invio non riuscito — scrivimi via email ]',
			email: 'Email', channel: 'Canale', address: 'Indirizzo', writeEmail: "Scrivi un'email",
			phone: 'Telefono', number: 'Numero', call: 'Chiama',
			network: 'Rete', liLead: 'Percorso, referenze e aggiornamenti professionali.', openLi: 'Apri LinkedIn',
			ghLead: 'Codice sorgente dei progetti pubblici.', openGh: 'Apri GitHub',
		},
	};
	const SHARED = window.PORTFOLIO.i18n;
	const T = Object.fromEntries(LANGS.map(l => [l, { ...SHARED[l], ...OWN[l] }]));


	let lang = 'fr';
	try {
		const saved = localStorage.getItem('lang'); // clé partagée avec le site classique
		const nav = (navigator.language || '').slice(0, 2);
		lang = LANGS.includes(saved) ? saved : LANGS.includes(nav) ? nav : 'fr';
	} catch (e) {}
	const t = k => T[lang][k] ?? T.fr[k] ?? k;

	/* ================= Contenu ================= */
	const PROJECTS = window.PORTFOLIO.projects; // data/content.js
	const P = id => PROJECTS.findIndex(p => p.id === id);

	const ext = (href, label, cls = '') =>
		`<a class="blk ${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
	const jumps = ids =>
		`<div><p class="label">${t('related')}</p><div class="jumps">${
			ids.map(id => `<button type="button" class="blk" data-goto="1:${P(id)}">${PROJECTS[P(id)].name}</button>`).join('')
		}</div></div>`;
	const mods = list =>
		`<ul class="mods">${list.map(([icon, name, role]) =>
			`<li class="mod"><i class="devicon-${icon}-plain" aria-hidden="true"></i><div><b>${name}</b><span>${t(role)}</span></div></li>`).join('')}</ul>`;

	const SECTIONS = [
		{
			id: 'profil',
			items: [
				{ name: 'identity', kind: 'record', html: () => `
					<div class="ident">
						<div class="shot"><img src="${IMG}luca.webp" width="600" height="600" alt="${t('portrait')}"></div>
						<div class="col">
							<dl class="meta">
								<dt>${t('name')}</dt><dd>Luca De Chiara</dd>
								<dt>${t('role')}</dt><dd>${t('roleV')}</dd>
								<dt>${t('base')}</dt><dd>${t('baseV')}</dd>
								<dt>${t('cert')}</dt><dd>${t('certV')}</dd>
								<dt>${t('studies')}</dt><dd>${t('studiesV')}</dd>
							</dl>
							<p class="lead">${t('about.bio1')}</p>
						</div>
					</div>` },
				{ name: 'approach', kind: 'method', html: () => `
					<p class="lead">${t('approachLead')}</p>
					<ol class="steps"><li>${t('step1')}</li><li>${t('step2')}</li><li>${t('step3')}</li></ol>` },
				{ name: 'origins', kind: 'log', html: () => `
					<p class="label">${t('logEntry')}</p>
					<p class="lead">${t('about.bio3')}</p>` },
				{ name: 'services', kind: 'offer', html: () => `
					<ol class="steps"><li>${t('footer.service1')}</li><li>${t('footer.service2')}</li><li>${t('footer.service3')}</li><li>${t('footer.service4')}</li></ol>` },
				{ name: 'cv', kind: 'file', html: () => `
					<dl class="meta"><dt>${t('file')}</dt><dd>CV Luca De Chiara.pdf</dd><dt>${t('format')}</dt><dd>PDF</dd></dl>
					<div class="links"><a class="blk" href="../documents/CV%20Luca%20De%20Chiara.pdf" download>${t('about.cvBtn')}</a></div>` },
			],
		},
		{
			id: 'archives',
			items: PROJECTS.map(p => ({
				label: p.name, kind: 'kind.' + p.kind, html: () => `
					<div class="proj">
						<div class="shot"><img src="${IMG}${p.img}" width="${p.w}" height="${p.h}" alt="${p.alt}"><span class="tagline">${t('kind.' + p.kind)}</span></div>
						<div class="info">
							<dl class="meta"><dt>${t('projects.type')}</dt><dd>${t('kind.' + p.kind)}</dd><dt>${t('projects.status')}</dt><dd>${t('projects.online')}</dd></dl>
							<p class="lead">${t('project.' + p.id + '.desc')}</p>
							<ul class="tags">${p.tags.map(x => `<li>${x}</li>`).join('')}</ul>
							<div class="links">
								${ext(p.site, t('projects.' + p.siteLabel))}
								${p.code ? ext(p.code, t('projects.sourceCode'), 'alt') : `<span class="blk off alt" aria-disabled="true">${t('projects.privateCode')}</span>`}
							</div>
						</div>
					</div>` })),
		},
		{
			id: 'systeme',
			items: [
				{ label: 'Front-end', kind: 'module', html: () => `
					<p class="lead">${t('frontLead')}</p>
					${mods([['html5', 'HTML5', 'r.html'], ['css3', 'CSS3', 'r.css'], ['javascript', 'JavaScript', 'r.js'], ['tailwindcss', 'Tailwind', 'r.tw']])}
					${jumps(['pur', 'lcz', 'voctale', 'nelumbo'])}` },
				{ label: 'Back-end', kind: 'module', html: () => `
					<p class="lead">${t('backLead')}</p>
					${mods([['php', 'PHP', 'r.php'], ['laravel', 'Laravel', 'r.laravel'], ['mysql', 'MySQL', 'r.mysql']])}
					${jumps(['voctale', 'yokoso'])}` },
				{ name: 'languages', kind: 'module', html: () => `
					<p class="lead">${t('langLead')}</p>
					${mods([['python', 'Python', 'r.python'], ['java', 'Java', 'r.java']])}
					${jumps(['hmusic'])}` },
				{ name: 'tools', kind: 'module', html: () => `
					${mods([['git', 'Git', 'r.git'], ['github', 'GitHub', 'r.github']])}
					<div class="links">${ext('https://github.com/dechiaraluca', t('myGithub'))}</div>
					${jumps(['yokoso', 'detect', 'nelumbo', 'bouncing'])}` },
			],
		},
		{
			id: 'transmission',
			items: [
				{ name: 'message', kind: 'form', title: 'sendTitle', html: () => `
					<form class="tx" novalidate>
						<div class="field"><label for="f-name">${t('contact.labelName')}</label><input id="f-name" name="name" autocomplete="name" required placeholder="${t('contact.placeholderName')}"></div>
						<div class="field"><label for="f-mail">${t('contact.labelEmail')}</label><input id="f-mail" name="email" type="email" autocomplete="email" required placeholder="${t('contact.placeholderEmail')}"></div>
						<div class="field"><label for="f-msg">${t('contact.labelMessage')}</label><textarea id="f-msg" name="message" rows="4" required placeholder="${t('contact.placeholderMessage')}"></textarea></div>
						<button class="blk" type="submit">${t('contact.submit')}</button>
						<p class="tx-status" role="status"></p>
					</form>` },
				{ name: 'email', kind: 'channel', html: () => `
					<p class="label">${t('address')}</p><p class="big">l.dechiara.dev@gmail.com</p>
					<div class="links"><a class="blk" href="mailto:l.dechiara.dev@gmail.com">${t('writeEmail')}</a></div>` },
				{ name: 'phone', kind: 'channel', html: () => `
					<p class="label">${t('number')}</p><p class="big">+33 6 02 73 91 06</p>
					<div class="links"><a class="blk" href="tel:+33602739106">${t('call')}</a></div>` },
				{ label: 'LinkedIn', kind: 'network', html: () => `
					<p class="lead">${t('liLead')}</p>
					<div class="links">${ext('https://www.linkedin.com/in/luca-de-chiara-7b054433a/', t('openLi'))}</div>` },
				{ label: 'GitHub', kind: 'network', html: () => `
					<p class="lead">${t('ghLead')}</p>
					<div class="links">${ext('https://github.com/dechiaraluca', t('openGh'))}</div>` },
			],
		},
	];
	const itemName = it => it.label || t(it.name);

	/* ================= État & éléments ================= */
	const $ = (s, r = document) => r.querySelector(s);
	const tabsEl = $('#tabs'), itemsEl = $('#items'), slot = $('#slot'), stage = $('#stage');
	const titleEl = $('#secTitle'), subL = $('#secSubL'), subR = $('#secSubR');
	const mobile = matchMedia('(max-width: 760px)');
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const state = { s: 0, sel: SECTIONS.map(() => 0) };

	/* ================= Son (généré, aucun fichier) ================= */
	let soundOn = false, actx = null;
	try { soundOn = localStorage.getItem('nier-sound') === '1'; } catch (e) {}
	const soundBtn = $('#sound');
	function paintSound() {
		soundBtn.textContent = `${t('sound')} : ${soundOn ? t('on') : t('off')}`;
		soundBtn.setAttribute('aria-pressed', String(soundOn));
	}
	soundBtn.addEventListener('click', () => {
		soundOn = !soundOn;
		try { localStorage.setItem('nier-sound', soundOn ? '1' : '0'); } catch (e) {}
		paintSound(); sfx('ok');
	});
	const SFX = { move: [1650, 1650, .035, 'square', .02], section: [620, 1050, .1, 'triangle', .07], ok: [1000, 1650, .08, 'triangle', .06] };
	function sfx(type) {
		if (!soundOn) return;
		try {
			actx = actx || new (window.AudioContext || window.webkitAudioContext)();
			if (actx.state === 'suspended') actx.resume();
			const [f0, f1, d, wave, vol] = SFX[type], now = actx.currentTime;
			const o = actx.createOscillator(), g = actx.createGain();
			o.type = wave;
			o.frequency.setValueAtTime(f0, now);
			o.frequency.exponentialRampToValueAtTime(f1, now + d);
			g.gain.setValueAtTime(vol, now);
			g.gain.exponentialRampToValueAtTime(.0001, now + d);
			o.connect(g).connect(actx.destination);
			o.start(now); o.stop(now + d + .02);
		} catch (e) {}
	}

	/* ================= Effet de décodage du texte ================= */
	const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_';
	function scramble(el, text) {
		clearInterval(el._t);
		if (reduce) { el.textContent = text; return; }
		let f = 0; const total = 12;
		el._t = setInterval(() => {
			const shown = Math.floor(text.length * f / total);
			el.textContent = text.slice(0, shown) + [...text.slice(shown)]
				.map(c => c === ' ' ? ' ' : GLYPHS[Math.random() * GLYPHS.length | 0]).join('');
			if (++f > total) { clearInterval(el._t); el.textContent = text; }
		}, 28);
	}

	/* ================= Rendu ================= */
	// les onglets sont dans le HTML : on ne fait que traduire leurs libellés
	function renderTabs() {
		[...tabsEl.children].forEach((b, i) => {
			const id = SECTIONS[i].id;
			b.querySelector('.lbl-l').textContent = t(id);
			b.querySelector('.lbl-s').textContent = T[lang][id + '.short'] || t(id);
		});
	}

	function renderChrome() {
		document.documentElement.lang = lang;
		document.title = t('title');
		document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
		$('#skip').textContent = t('skip');
		$('#langs').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
		paintSound();
		renderTabs();
	}

	// Mobile : le détail s'ouvre en accordéon sous l'élément (openJ = élément ouvert, -1 = aucun)
	let openJ = -1;

	function goSection(i, { force = false, open = -1 } = {}) {
		i = (i + SECTIONS.length) % SECTIONS.length;
		if (i === state.s && !force) return;
		state.s = i;
		openJ = open;
		renderSection();
		sfx('section');
	}

	function renderSection({ animate = true } = {}) {
		const s = SECTIONS[state.s];
		[...tabsEl.children].forEach((b, i) => {
			const on = i === state.s;
			b.classList.toggle('is-on', on);
			b.setAttribute('aria-selected', String(on));
			b.tabIndex = on ? 0 : -1;
		});
		stage.setAttribute('aria-labelledby', 'tab-' + s.id);
		animate ? scramble(titleEl, t(s.id)) : (titleEl.textContent = t(s.id));
		subL.textContent = t(s.id + '.sub');
		subR.textContent = `${t('entries')} : ${pad(s.items.length)}`;
		itemsEl.innerHTML = s.items.map((it, j) =>
			`<li style="--i:${j}"><button class="blk item" type="button" data-j="${j}">
				<span class="arrow" aria-hidden="true"><span class="ah"></span></span>
				<span class="num" aria-hidden="true">${pad(j + 1)}</span><span class="nm">${itemName(it)}</span><span class="kd">${t(it.kind)}</span>
			</button></li>`).join('');
		if (animate) { itemsEl.classList.remove('anim'); void itemsEl.offsetWidth; itemsEl.classList.add('anim'); }
		else itemsEl.querySelectorAll('li').forEach(li => { li.style.animation = 'none'; });
		selectItem(state.sel[state.s], { silent: true, force: true, animate });
		try { history.replaceState(null, '', '#' + s.id); } catch (e) {}
	}

	// HTML d'un panneau de détail
	function panelHTML(j, animate) {
		const s = SECTIONS[state.s], it = s.items[j];
		return `<article class="panel" aria-labelledby="pTitle"${animate ? '' : ' style="animation:none"'}>
				<header class="p-head"><h3 id="pTitle"></h3><span class="idx">[ ${pad(j + 1)} / ${pad(s.items.length)} ]</span></header>
				<div class="p-body">${it.html()}</div>
				<div class="p-foot" aria-hidden="true"></div>
			</article>`;
	}
	function titleOf(j) {
		const it = SECTIONS[state.s].items[j];
		return it.title ? t(it.title) : itemName(it);
	}

	function selectItem(j, { silent = false, force = false, animate = true } = {}) {
		const s = SECTIONS[state.s];
		j = (j + s.items.length) % s.items.length;
		if (j === state.sel[state.s] && !force) return;
		state.sel[state.s] = j;
		const btns = itemsEl.querySelectorAll('.item');
		btns.forEach((b, k) => {
			b.classList.toggle('is-on', k === j);
			b.setAttribute('aria-current', String(k === j));
		});
		if (mobile.matches) renderAccordion(animate);
		else {
			slot.innerHTML = panelHTML(j, animate);
			animate ? scramble($('#pTitle'), titleOf(j)) : ($('#pTitle').textContent = titleOf(j));
			if (btns[j]) btns[j].scrollIntoView({ block: 'nearest' });
		}
		if (!silent) sfx('move');
	}

	function renderAccordion(animate = true) {
		itemsEl.querySelectorAll('.acc').forEach(el => el.remove());
		const btns = itemsEl.querySelectorAll('.item');
		btns.forEach((b, k) => b.setAttribute('aria-expanded', String(k === openJ)));
		if (openJ < 0 || !btns[openJ]) return;
		const box = document.createElement('div');
		box.className = 'acc';
		box.innerHTML = panelHTML(openJ, animate);
		btns[openJ].parentElement.appendChild(box);
		animate ? scramble($('#pTitle'), titleOf(openJ)) : ($('#pTitle').textContent = titleOf(openJ));
		// on remonte l'élément ouvert en haut de la liste
		const wrap = itemsEl.parentElement;
		const top = wrap.scrollTop + btns[openJ].getBoundingClientRect().top - wrap.getBoundingClientRect().top - 8;
		wrap.scrollTo({ top, behavior: reduce || !animate ? 'auto' : 'smooth' });
	}

	function toggleItem(j) {
		openJ = openJ === j ? -1 : j;
		selectItem(j, { silent: true, force: true });
	}

	function setLang(l) {
		if (!LANGS.includes(l) || l === lang) return;
		lang = l;
		try { localStorage.setItem('lang', l); } catch (e) {}
		renderChrome();
		renderSection({ animate: false });
		sfx('ok');
	}
	$('#langs').addEventListener('click', e => {
		const b = e.target.closest('button[data-lang]');
		if (b) setLang(b.dataset.lang);
	});

	/* ================= Retour au site classique ================= */
	$('#toClassic').addEventListener('click', () => {
		try { localStorage.setItem('ui', 'classic'); } catch (e) {}
	});

	/* ================= Interactions ================= */
	tabsEl.addEventListener('click', e => {
		const b = e.target.closest('.tab');
		if (b) goSection(+b.dataset.i);
	});

	// survol = déplacement du curseur (comme un menu de jeu)
	let hoverT;
	itemsEl.addEventListener('mouseover', e => {
		if (mobile.matches) return;
		const b = e.target.closest('.item');
		if (!b) return;
		clearTimeout(hoverT);
		hoverT = setTimeout(() => selectItem(+b.dataset.j), 50);
	});
	itemsEl.addEventListener('click', e => {
		const b = e.target.closest('.item');
		if (!b) return;
		clearTimeout(hoverT);
		sfx('ok');
		if (mobile.matches) { toggleItem(+b.dataset.j); return; }
		selectItem(+b.dataset.j, { silent: true });
		if (e.detail === 0) { // activé au clavier : on entre dans le panneau
			const f = slot.querySelector('a, button, input, textarea');
			if (f) f.focus();
		}
	});

	// liens internes (projets liés) — le panneau est dans #slot (bureau) ou dans la liste (mobile)
	stage.addEventListener('click', e => {
		const g = e.target.closest('[data-goto]');
		if (!g) return;
		const [s, j] = g.dataset.goto.split(':').map(Number);
		state.sel[s] = j;
		goSection(s, { force: true, open: mobile.matches ? j : -1 });
	});

	// formulaire : même formulaire Netlify « contact » que le site classique
	stage.addEventListener('submit', e => {
		e.preventDefault();
		const form = e.target, status = form.querySelector('.tx-status'), btn = form.querySelector('button[type="submit"]');
		const say = (msg, err = false) => { status.className = 'tx-status' + (err ? ' err' : ''); status.textContent = msg; };
		if (!form.checkValidity()) { say(t('invalid'), true); return; }
		const body = new URLSearchParams(new FormData(form));
		body.set('form-name', 'contact');
		btn.disabled = true;
		say(t('sending'));
		fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
			.then(res => {
				if (!res.ok) throw new Error(res.status);
				form.reset(); say('[ ' + t('contact.success') + ' ]'); sfx('ok');
			})
			.catch(() => say(t('failed'), true))
			.finally(() => { btn.disabled = false; });
	});

	// clavier
	addEventListener('keydown', e => {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		if (e.target.closest('input, textarea')) { if (e.key === 'Escape') e.target.blur(); return; }
		const k = e.key;
		if (k === 'ArrowRight' || k === 'e' || k === 'E') { goSection(state.s + 1); followTab(e); e.preventDefault(); }
		else if (k === 'ArrowLeft' || k === 'q' || k === 'Q') { goSection(state.s - 1); followTab(e); e.preventDefault(); }
		else if ((k === 'ArrowDown' || k === 'ArrowUp') && !mobile.matches) {
			selectItem(state.sel[state.s] + (k === 'ArrowDown' ? 1 : -1));
			itemsEl.querySelectorAll('.item')[state.sel[state.s]].focus({ preventScroll: true });
			e.preventDefault();
		}
		else if (k === 'Escape' && openJ > -1) { openJ = -1; renderAccordion(); }
	});
	function followTab(e) {
		if (e.target.closest && e.target.closest('.tab')) tabsEl.children[state.s].focus();
	}

	// molette = changer de section (sauf si on fait défiler un contenu)
	let wheelLock = 0, acc = 0, lastWheel = 0;
	addEventListener('wheel', e => {
		if (mobile.matches) return;
		const sc = e.target.closest && e.target.closest('.p-body, .items-wrap');
		if (sc && sc.scrollHeight > sc.clientHeight + 2) {
			const atTop = sc.scrollTop <= 0, atBot = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2;
			if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBot)) return;
		}
		e.preventDefault();
		const now = performance.now();
		if (now - lastWheel > 220) acc = 0;
		lastWheel = now;
		if (now < wheelLock) return;
		acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
		if (Math.abs(acc) < 35) return;
		goSection(state.s + (acc > 0 ? 1 : -1));
		acc = 0; wheelLock = now + 650;
	}, { passive: false });

	// glisser (mobile) : change de section
	let tx = 0, ty = 0;
	addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
	addEventListener('touchend', e => {
		const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
		if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
		if (e.target.closest('.tabs, .sys, input, textarea')) return;
		goSection(state.s + (dx < 0 ? 1 : -1));
	}, { passive: true });

	// passage bureau <-> mobile : on reconstruit (le panneau change de place)
	mobile.addEventListener('change', () => {
		openJ = -1;
		slot.innerHTML = '';
		renderSection({ animate: false });
	});

	/* ================= Horloge ================= */
	const clock = $('#clock');
	function tick() {
		const d = new Date();
		clock.textContent = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}  ${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}
	tick(); setInterval(tick, 15000);

	/* ================= Démarrage ================= */
	renderChrome();
	const fromHash = SECTIONS.findIndex(s => '#' + s.id === location.hash);
	state.s = fromHash > -1 ? fromHash : 0;
	renderSection();

	// écran de démarrage : une fois par visite
	const boot = $('#boot');
	let booted = false;
	try { booted = sessionStorage.getItem('nier-booted') === '1'; sessionStorage.setItem('nier-booted', '1'); } catch (e) {}
	if (reduce || booted) boot.classList.add('done');
	else {
		scramble($('#bootTxt'), t('boot'));
		setTimeout(() => boot.classList.add('done'), 950);
		boot.addEventListener('click', () => boot.classList.add('done'));
	}
})();
