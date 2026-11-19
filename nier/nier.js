// Interface NieR du portfolio : menu plein écran, sans défilement.
(() => {
	const IMG = '../assets/images/';
	const LANGS = ['fr', 'en', 'it'];
	const pad = n => String(n).padStart(2, '0');

	/* ================= Textes ================= */
	const T = {
		fr: {
			skip: 'Aller au contenu', tagline: 'Développeur web // Grenoble',
			classic: 'Interface classique', classicShort: '◂ Classique',
			sound: 'Son', on: 'on', off: 'off', back: '‹ Retour',
			or: 'ou', wheel: 'Molette', hSection: 'Section', hSelect: 'Sélection', enter: 'Entrée', hOpen: 'Ouvrir',
			hSwipe: 'Glisser : section', legal: 'Mentions légales', boot: 'Initialisation du système',
			entries: 'Entrées', title: 'Luca De Chiara — Interface NieR',
			// sections
			'profil': 'Profil', 'profil.sub': '01 // Unité',
			'archives': 'Archives', 'archives.sub': '02 // Archives',
			'systeme': 'Système', 'systeme.sub': '03 // Système',
			'transmission': 'Transmission', 'transmission.short': 'Contact', 'transmission.sub': '04 // Transmission',
			// profil
			identity: 'Identité', record: 'Fiche', name: 'Nom', role: 'Fonction', roleV: 'Développeur web',
			base: 'Base', baseV: 'Grenoble, France', cert: 'Titre', certV: 'Développeur Web et Web Mobile',
			studies: 'Cursus', studiesV: 'Bachelor IA & Big Data', portrait: 'Illustration de Luca De Chiara à son bureau',
			bio1: "Je suis Luca, développeur web basé à Grenoble. Titulaire du titre Développeur Web et Web Mobile, je poursuis aujourd'hui en Bachelor IA & Big Data, tout en réalisant des projets web pour des professionnels et des particuliers.",
			approach: 'Approche', method: 'Méthode',
			approachLead: "Je conçois des sites modernes et responsives, de l'interface jusqu'à la mise en ligne, en passant par le back-end (PHP, Laravel, MySQL).",
			step1: 'Comprendre votre besoin', step2: 'Proposer une solution simple et adaptée', step3: 'Livrer un site fiable et facile à faire évoluer',
			origins: 'Origines', log: 'Journal', logEntry: 'Entrée de journal',
			bio3: "Né à Rome et installé en France depuis plus de 8 ans, je suis passionné par le numérique depuis l'enfance. Cette curiosité me pousse aujourd'hui à explorer la data et l'intelligence artificielle, pour concevoir des solutions toujours plus utiles.",
			services: 'Services', offer: 'Offre',
			service1: 'Développement web sur mesure', service2: 'Applications Laravel / PHP', service3: 'API & intégrations', service4: 'Sites vitrines & refontes',
			cv: 'Dossier CV', file: 'Fichier', format: 'Format', cvBtn: 'Télécharger mon CV',
			// archives
			type: 'Type', status: 'Statut', online: 'En ligne',
			viewSite: 'Voir le site', viewApp: "Voir l'application", sourceCode: 'Code source', privateCode: 'Code privé',
			'kind.desktop': 'App desktop', 'kind.webapp': 'App web', 'kind.showcase': 'Site vitrine', 'kind.event': 'Événement', 'kind.personal': 'Perso',
			'd.hmusic': "Application desktop qui compose de la musique en temps réel selon ton humeur, avec playlists Jamendo générées par IA et journal d'humeur.",
			'd.voctale': "Application web de livres audio interactifs à choix narratifs : interface, logique applicative et gestion des données.",
			'd.pur': "Site vitrine pour un laveur de vitres éco-responsable à Grenoble : méthode, prestations, galerie et formulaire de devis interactif.",
			'd.lcz': "Site vitrine pour une entreprise de couverture et zinguerie près de Grenoble : prestations, galerie de chantiers, avis clients et référencement local.",
			'd.yokoso': "Plateforme de location de logements inspirée d'Airbnb, développée en PHP.",
			'd.detect': "Site événementiel autour de la détection de métaux : présentation de l'événement, informations pratiques et contenus pour les visiteurs.",
			'd.nelumbo': "Site vitrine pour un fleuriste, avec une identité visuelle inspirée de l'univers japonais.",
			'd.bouncing': "Reproduction en JavaScript du célèbre logo rebondissant des écrans de veille.",
			// système
			module: 'Module', languages: 'Langages', tools: 'Outils', related: 'Projets liés',
			frontLead: "Interfaces responsives, du maquettage à l'intégration.",
			backLead: 'Logique serveur, données et applications sur mesure.',
			langLead: 'Au-delà du web : applications desktop, data et IA.',
			'r.html': 'Structure & sémantique', 'r.css': 'Mise en page & animations', 'r.js': 'Interactions', 'r.tw': 'Interfaces utilitaires',
			'r.php': 'Logique serveur', 'r.laravel': 'Applications web', 'r.mysql': 'Bases de données',
			'r.python': 'Data & IA', 'r.java': 'Applications desktop', 'r.git': 'Versionnage', 'r.github': 'Dépôts publics',
			myGithub: 'Voir mon GitHub',
			// transmission
			message: 'Message', form: 'Formulaire', sendTitle: 'Envoyer une transmission',
			labelName: 'Nom', labelEmail: 'Email', labelMessage: 'Message',
			phName: 'Votre nom', phEmail: 'votre@email.com', phMessage: 'Votre message...',
			submit: 'Envoyer', sending: '[ Transmission en cours… ]',
			success: '[ Merci ! Votre message a bien été envoyé ]',
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
			hSwipe: 'Swipe: section', legal: 'Legal notice', boot: 'System initialization',
			entries: 'Entries', title: 'Luca De Chiara — NieR interface',
			'profil': 'Profile', 'profil.sub': '01 // Unit',
			'archives': 'Archives', 'archives.sub': '02 // Archives',
			'systeme': 'System', 'systeme.sub': '03 // System',
			'transmission': 'Transmission', 'transmission.short': 'Contact', 'transmission.sub': '04 // Transmission',
			identity: 'Identity', record: 'Record', name: 'Name', role: 'Role', roleV: 'Web developer',
			base: 'Based in', baseV: 'Grenoble, France', cert: 'Certification', certV: 'Web and Mobile Web Developer',
			studies: 'Studies', studiesV: "Bachelor's in AI & Big Data", portrait: 'Illustration of Luca De Chiara at his desk',
			bio1: "I'm Luca, a web developer based in Grenoble. I hold the French Web and Mobile Web Developer certification and I'm now pursuing a Bachelor's degree in AI & Big Data, while building web projects for businesses and individuals.",
			approach: 'Approach', method: 'Method',
			approachLead: 'I build modern, responsive websites, from the interface to deployment, including the back-end (PHP, Laravel, MySQL).',
			step1: 'Understand your needs', step2: 'Offer a simple, tailored solution', step3: "Deliver a reliable site that's easy to evolve",
			origins: 'Origins', log: 'Log', logEntry: 'Log entry',
			bio3: "Born in Rome and living in France for over 8 years, I've been passionate about technology since childhood. That curiosity now drives me to explore data and artificial intelligence, to build ever more useful solutions.",
			services: 'Services', offer: 'Offer',
			service1: 'Custom web development', service2: 'Laravel / PHP applications', service3: 'API & integrations', service4: 'Showcase sites & redesigns',
			cv: 'CV file', file: 'File', format: 'Format', cvBtn: 'Download my CV',
			type: 'Type', status: 'Status', online: 'Online',
			viewSite: 'View site', viewApp: 'View app', sourceCode: 'Source code', privateCode: 'Private code',
			'kind.desktop': 'Desktop app', 'kind.webapp': 'Web app', 'kind.showcase': 'Showcase site', 'kind.event': 'Event', 'kind.personal': 'Personal',
			'd.hmusic': 'Desktop app that composes music in real time based on your mood, with AI-generated Jamendo playlists and a mood journal.',
			'd.voctale': 'Web application for interactive audiobooks with narrative choices: interface, application logic and data management.',
			'd.pur': 'Showcase website for an eco-friendly window cleaner in Grenoble: method, services, gallery and interactive quote form.',
			'd.lcz': 'Showcase website for a roofing and zinc-work company near Grenoble: services, project gallery, client reviews and local SEO.',
			'd.yokoso': 'Accommodation rental platform inspired by Airbnb, built with PHP.',
			'd.detect': 'Event website about metal detection: event overview, practical information and content for visitors.',
			'd.nelumbo': 'Showcase website for a florist, with a visual identity inspired by Japanese aesthetics.',
			'd.bouncing': 'A JavaScript take on the famous bouncing screensaver logo.',
			module: 'Module', languages: 'Languages', tools: 'Tools', related: 'Related projects',
			frontLead: 'Responsive interfaces, from mockup to integration.',
			backLead: 'Server logic, data and custom applications.',
			langLead: 'Beyond the web: desktop apps, data and AI.',
			'r.html': 'Structure & semantics', 'r.css': 'Layout & animations', 'r.js': 'Interactions', 'r.tw': 'Utility-first UIs',
			'r.php': 'Server logic', 'r.laravel': 'Web applications', 'r.mysql': 'Databases',
			'r.python': 'Data & AI', 'r.java': 'Desktop apps', 'r.git': 'Version control', 'r.github': 'Public repositories',
			myGithub: 'View my GitHub',
			message: 'Message', form: 'Form', sendTitle: 'Send a transmission',
			labelName: 'Name', labelEmail: 'Email', labelMessage: 'Message',
			phName: 'Your name', phEmail: 'your@email.com', phMessage: 'Your message...',
			submit: 'Send', sending: '[ Transmitting… ]',
			success: '[ Thank you! Your message has been sent ]',
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
			hSwipe: 'Scorri: sezione', legal: 'Note legali', boot: 'Inizializzazione del sistema',
			entries: 'Voci', title: 'Luca De Chiara — Interfaccia NieR',
			'profil': 'Profilo', 'profil.sub': '01 // Unità',
			'archives': 'Archivio', 'archives.sub': '02 // Archivio',
			'systeme': 'Sistema', 'systeme.sub': '03 // Sistema',
			'transmission': 'Trasmissione', 'transmission.short': 'Contatti', 'transmission.sub': '04 // Trasmissione',
			identity: 'Identità', record: 'Scheda', name: 'Nome', role: 'Ruolo', roleV: 'Sviluppatore web',
			base: 'Sede', baseV: 'Grenoble, Francia', cert: 'Titolo', certV: 'Sviluppatore Web e Web Mobile',
			studies: 'Percorso', studiesV: 'Bachelor in IA & Big Data', portrait: 'Illustrazione di Luca De Chiara alla scrivania',
			bio1: 'Sono Luca, sviluppatore web con base a Grenoble. Ho conseguito il titolo francese di Sviluppatore Web e Web Mobile e oggi frequento un Bachelor in IA & Big Data, realizzando al contempo progetti web per professionisti e privati.',
			approach: 'Approccio', method: 'Metodo',
			approachLead: "Realizzo siti moderni e responsive, dall'interfaccia alla messa online, passando per il back-end (PHP, Laravel, MySQL).",
			step1: 'Capire le tue esigenze', step2: 'Proporre una soluzione semplice e su misura', step3: 'Consegnare un sito affidabile e facile da far evolvere',
			origins: 'Origini', log: 'Diario', logEntry: 'Voce di diario',
			bio3: "Nato a Roma e in Francia da oltre 8 anni, sono appassionato di digitale fin da bambino. Questa curiosità oggi mi spinge a esplorare i dati e l'intelligenza artificiale, per creare soluzioni sempre più utili.",
			services: 'Servizi', offer: 'Offerta',
			service1: 'Sviluppo web su misura', service2: 'Applicazioni Laravel / PHP', service3: 'API & integrazioni', service4: 'Siti vetrina & restyling',
			cv: 'File CV', file: 'File', format: 'Formato', cvBtn: 'Scarica il mio CV',
			type: 'Tipo', status: 'Stato', online: 'Online',
			viewSite: 'Vedi il sito', viewApp: "Vedi l'app", sourceCode: 'Codice sorgente', privateCode: 'Codice privato',
			'kind.desktop': 'App desktop', 'kind.webapp': 'App web', 'kind.showcase': 'Sito vetrina', 'kind.event': 'Evento', 'kind.personal': 'Personale',
			'd.hmusic': "Applicazione desktop che compone musica in tempo reale in base al tuo umore, con playlist Jamendo generate dall'IA e diario dell'umore.",
			'd.voctale': 'Applicazione web di audiolibri interattivi con scelte narrative: interfaccia, logica applicativa e gestione dei dati.',
			'd.pur': 'Sito vetrina per un lavavetri ecosostenibile a Grenoble: metodo, servizi, galleria e modulo di preventivo interattivo.',
			'd.lcz': "Sito vetrina per un'impresa di coperture e lattoneria vicino a Grenoble: servizi, galleria dei cantieri, recensioni dei clienti e SEO locale.",
			'd.yokoso': 'Piattaforma di affitto alloggi ispirata ad Airbnb, sviluppata in PHP.',
			'd.detect': 'Sito per un evento sulla rilevazione di metalli: presentazione, informazioni pratiche e contenuti per i visitatori.',
			'd.nelumbo': "Sito vetrina per un fiorista, con un'identità visiva ispirata all'estetica giapponese.",
			'd.bouncing': 'Riproduzione in JavaScript del celebre logo rimbalzante degli screensaver.',
			module: 'Modulo', languages: 'Linguaggi', tools: 'Strumenti', related: 'Progetti collegati',
			frontLead: "Interfacce responsive, dal mockup all'integrazione.",
			backLead: 'Logica server, dati e applicazioni su misura.',
			langLead: 'Oltre il web: applicazioni desktop, dati e IA.',
			'r.html': 'Struttura e semantica', 'r.css': 'Layout e animazioni', 'r.js': 'Interazioni', 'r.tw': 'Interfacce utility-first',
			'r.php': 'Logica server', 'r.laravel': 'Applicazioni web', 'r.mysql': 'Database',
			'r.python': 'Dati e IA', 'r.java': 'Applicazioni desktop', 'r.git': 'Controllo versione', 'r.github': 'Repository pubblici',
			myGithub: 'Vedi il mio GitHub',
			message: 'Messaggio', form: 'Modulo', sendTitle: 'Invia una trasmissione',
			labelName: 'Nome', labelEmail: 'Email', labelMessage: 'Messaggio',
			phName: 'Il tuo nome', phEmail: 'tua@email.com', phMessage: 'Il tuo messaggio...',
			submit: 'Invia', sending: '[ Trasmissione in corso… ]',
			success: '[ Grazie! Il tuo messaggio è stato inviato ]',
			invalid: '[ Campi obbligatori mancanti o email non valida ]',
			failed: '[ Invio non riuscito — scrivimi via email ]',
			email: 'Email', channel: 'Canale', address: 'Indirizzo', writeEmail: "Scrivi un'email",
			phone: 'Telefono', number: 'Numero', call: 'Chiama',
			network: 'Rete', liLead: 'Percorso, referenze e aggiornamenti professionali.', openLi: 'Apri LinkedIn',
			ghLead: 'Codice sorgente dei progetti pubblici.', openGh: 'Apri GitHub',
		},
	};

	let lang = 'fr';
	try {
		const saved = localStorage.getItem('lang'); // clé partagée avec le site classique
		const nav = (navigator.language || '').slice(0, 2);
		lang = LANGS.includes(saved) ? saved : LANGS.includes(nav) ? nav : 'fr';
	} catch (e) {}
	const t = k => T[lang][k] ?? T.fr[k] ?? k;

	/* ================= Contenu ================= */
	const PROJECTS = [
		{ id: 'hmusic', name: 'hmusic', kind: 'kind.desktop', img: 'hmusic.webp', w: 1600, h: 900, tags: ['Java', 'Swing', 'MIDI'], site: 'https://hmusic-mood.netlify.app/', siteLabel: 'viewApp', code: null },
		{ id: 'voctale', name: 'Voctale', kind: 'kind.webapp', img: 'voctale.webp', w: 1600, h: 1000, tags: ['Laravel', 'Blade', 'Tailwind'], site: 'https://voctale.com/', code: null },
		{ id: 'pur', name: 'PUR', kind: 'kind.showcase', img: 'pur.webp', w: 1600, h: 1000, tags: ['HTML', 'CSS', 'JS'], site: 'https://pur-site.netlify.app/', code: null },
		{ id: 'lcz', name: 'L.C.Z Couverture', kind: 'kind.showcase', img: 'lcz.webp', w: 1600, h: 1000, tags: ['HTML', 'CSS', 'JS'], site: 'https://lcz-couverture.fr/', code: null },
		{ id: 'yokoso', name: 'Yokoso', kind: 'kind.webapp', img: 'yokoso.webp', w: 1600, h: 1000, tags: ['PHP', 'SCSS'], site: 'https://yokoso.infinityfree.me/', code: 'https://github.com/dechiaraluca/Yokoso' },
		{ id: 'detect', name: 'Detect', kind: 'kind.event', img: 'detect.webp', w: 1600, h: 1000, tags: ['HTML', 'CSS', 'JS'], site: 'https://detectevent.netlify.app/', code: 'https://github.com/dechiaraluca/Site-Event' },
		{ id: 'nelumbo', name: 'Nelumbo Blooms', kind: 'kind.showcase', img: 'nelumbo.webp', w: 1600, h: 1000, tags: ['HTML', 'CSS', 'JS'], site: 'https://nelumbosite2.netlify.app/', code: 'https://github.com/dechiaraluca/ProjectFlower_v2' },
		{ id: 'bouncing', name: 'Bouncing Logo', kind: 'kind.personal', img: '5.webp', w: 700, h: 396, tags: ['HTML', 'CSS', 'JS'], site: 'https://bouncinglogo.netlify.app/', code: 'https://github.com/dechiaraluca/BouncingLogo' },
	];
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
							<p class="lead">${t('bio1')}</p>
						</div>
					</div>` },
				{ name: 'approach', kind: 'method', html: () => `
					<p class="lead">${t('approachLead')}</p>
					<ol class="steps"><li>${t('step1')}</li><li>${t('step2')}</li><li>${t('step3')}</li></ol>` },
				{ name: 'origins', kind: 'log', html: () => `
					<p class="label">${t('logEntry')}</p>
					<p class="lead">${t('bio3')}</p>` },
				{ name: 'services', kind: 'offer', html: () => `
					<ol class="steps"><li>${t('service1')}</li><li>${t('service2')}</li><li>${t('service3')}</li><li>${t('service4')}</li></ol>` },
				{ name: 'cv', kind: 'file', html: () => `
					<dl class="meta"><dt>${t('file')}</dt><dd>CV Luca De Chiara.pdf</dd><dt>${t('format')}</dt><dd>PDF</dd></dl>
					<div class="links"><a class="blk" href="../documents/CV%20Luca%20De%20Chiara.pdf" download>${t('cvBtn')}</a></div>` },
			],
		},
		{
			id: 'archives',
			items: PROJECTS.map(p => ({
				label: p.name, kind: p.kind, html: () => `
					<div class="proj">
						<div class="shot"><img src="${IMG}${p.img}" width="${p.w}" height="${p.h}" alt="${p.name} — ${t(p.kind)}"><span class="tagline">${t(p.kind)}</span></div>
						<div class="info">
							<dl class="meta"><dt>${t('type')}</dt><dd>${t(p.kind)}</dd><dt>${t('status')}</dt><dd>${t('online')}</dd></dl>
							<p class="lead">${t('d.' + p.id)}</p>
							<ul class="tags">${p.tags.map(x => `<li>${x}</li>`).join('')}</ul>
							<div class="links">
								${ext(p.site, t(p.siteLabel || 'viewSite'))}
								${p.code ? ext(p.code, t('sourceCode'), 'alt') : `<span class="blk off alt" aria-disabled="true">${t('privateCode')}</span>`}
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
						<div class="field"><label for="f-name">${t('labelName')}</label><input id="f-name" name="name" autocomplete="name" required placeholder="${t('phName')}"></div>
						<div class="field"><label for="f-mail">${t('labelEmail')}</label><input id="f-mail" name="email" type="email" autocomplete="email" required placeholder="${t('phEmail')}"></div>
						<div class="field"><label for="f-msg">${t('labelMessage')}</label><textarea id="f-msg" name="message" rows="4" required placeholder="${t('phMessage')}"></textarea></div>
						<button class="blk" type="submit">${t('submit')}</button>
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
	const tabsEl = $('#tabs'), itemsEl = $('#items'), slot = $('#slot'), panelCol = $('#panelCol'), stage = $('#stage');
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
		$('#back').textContent = t('back');
		$('#langs').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
		paintSound();
		renderTabs();
	}

	function goSection(i, { force = false } = {}) {
		i = (i + SECTIONS.length) % SECTIONS.length;
		if (i === state.s && !force) return;
		state.s = i;
		closePanel(false);
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
		const it = s.items[j], title = it.title ? t(it.title) : itemName(it);
		slot.innerHTML =
			`<article class="panel" aria-labelledby="pTitle"${animate ? '' : ' style="animation:none"'}>
				<header class="p-head"><h3 id="pTitle"></h3><span class="idx">[ ${pad(j + 1)} / ${pad(s.items.length)} ]</span></header>
				<div class="p-body">${it.html()}</div>
				<div class="p-foot" aria-hidden="true"></div>
			</article>`;
		animate ? scramble($('#pTitle'), title) : ($('#pTitle').textContent = title);
		if (btns[j]) btns[j].scrollIntoView({ block: 'nearest' });
		if (!silent) sfx('move');
	}

	function setLang(l) {
		if (!LANGS.includes(l) || l === lang) return;
		lang = l;
		try { localStorage.setItem('lang', l); } catch (e) {}
		const open = panelCol.classList.contains('open');
		renderChrome();
		renderSection({ animate: false });
		if (open) panelCol.classList.add('open');
		sfx('ok');
	}
	$('#langs').addEventListener('click', e => {
		const b = e.target.closest('button[data-lang]');
		if (b) setLang(b.dataset.lang);
	});

	/* ================= Panneau mobile ================= */
	function openPanel() {
		if (!mobile.matches) return;
		panelCol.classList.add('open');
		$('#back').focus({ preventScroll: true });
	}
	function closePanel(refocus = true) {
		if (!panelCol.classList.contains('open')) return;
		panelCol.classList.remove('open');
		if (refocus) {
			const b = itemsEl.querySelectorAll('.item')[state.sel[state.s]];
			if (b) b.focus({ preventScroll: true });
		}
	}
	$('#back').addEventListener('click', () => closePanel());

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
		selectItem(+b.dataset.j, { silent: true });
		sfx('ok');
		if (mobile.matches) openPanel();
		else if (e.detail === 0) { // activé au clavier : on entre dans le panneau
			const f = slot.querySelector('a, button, input, textarea');
			if (f) f.focus();
		}
	});

	// liens internes (projets liés)
	slot.addEventListener('click', e => {
		const g = e.target.closest('[data-goto]');
		if (!g) return;
		const [s, j] = g.dataset.goto.split(':').map(Number);
		const wasOpen = panelCol.classList.contains('open');
		state.sel[s] = j;
		goSection(s, { force: true });
		if (wasOpen) openPanel();
	});

	// formulaire : même formulaire Netlify « contact » que le site classique
	slot.addEventListener('submit', e => {
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
				form.reset(); say(t('success')); sfx('ok');
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
		else if (k === 'ArrowDown' || k === 'ArrowUp') {
			if (panelCol.classList.contains('open')) return;
			selectItem(state.sel[state.s] + (k === 'ArrowDown' ? 1 : -1));
			itemsEl.querySelectorAll('.item')[state.sel[state.s]].focus({ preventScroll: true });
			e.preventDefault();
		}
		else if (k === 'Escape') closePanel();
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

	// glisser (mobile)
	let tx = 0, ty = 0;
	addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
	addEventListener('touchend', e => {
		const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
		if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
		if (panelCol.classList.contains('open')) { if (dx > 0) closePanel(); return; }
		if (e.target.closest('.tabs, .sys')) return;
		goSection(state.s + (dx < 0 ? 1 : -1));
	}, { passive: true });

	mobile.addEventListener('change', () => closePanel(false));

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
