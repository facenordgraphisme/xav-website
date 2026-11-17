import type { OutingId } from "./site";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

type Fact = { label: string; value: string };
type Photo = { src: string; alt: string; position?: string };

const fr = {
  meta: {
    title: "Activités Nature · Rafting et canyoning à Embrun",
    description:
      "Rafting sur la Durance et canyoning dans les Écrins avec Xavier et Patrick, moniteurs diplômés d'État. Demi-journée, matériel fourni, de début avril à début octobre.",
    rafting: "Rafting sur la Durance à Embrun · Activités Nature",
    raftingDesc:
      "Descente en raft de la Durance au pied d'Embrun, encadrée par un moniteur diplômé d'État. 2 h 30, sans expérience, matériel fourni.",
    canyoning: "Canyoning dans les Écrins · Activités Nature",
    canyoningDesc:
      "Canyon du Couleau dès 7 ans, canyon du Fournel dès 12 ans : sauts, toboggans et rappels avec Xavier et Patrick.",
  },
  nav: {
    home: "Accueil",
    rafting: "Rafting",
    canyoning: "Canyoning",
    guides: "Les guides",
    prices: "Tarifs",
    faq: "Bon à savoir",
    book: "Réserver",
    menu: "Menu",
    close: "Fermer",
    skip: "Aller au contenu",
    theme: "Changer de thème",
    themeLight: "Clair",
    themeDark: "Sombre",
    language: "English",
    languageShort: "EN",
  },
  hero: {
    title: "Durance",
    sub: "Rafting & canyoning à Embrun",
    lede: "Une demi-journée sur la Durance ou dans les canyons des Écrins, avec Xavier et Patrick, moniteurs diplômés d'État.",
    facts: [
      { label: "Durée", value: "2 h 30" },
      { label: "Canyon", value: "dès 7 ans" },
      { label: "En groupe, dès", value: "{price} €" },
    ] as Fact[],
    cta: "Réserver une sortie",
    call: "Appeler",
    photoAlt: "Un équipage en gilets rouges sur l'eau turquoise de la Durance, au pied des falaises",
  },
  outingsIntro: {
    title: "Trois sorties au choix",
    text: "Une rivière, deux canyons. Toutes partent de Baratier, durent 2 h 30 et se font sans expérience : le matériel est fourni et le moniteur adapte le parcours à votre groupe.",
  },
  outings: {
    rafting: {
      name: "Rafting sur la Durance",
      short: "Rafting",
      place: "Embrun · tous niveaux",
      text: "Au pied d'Embrun, entre falaises calcaires et forêts. Le parcours suit le niveau du groupe, des familles aux équipes qui veulent des vagues.",
      safety: "Gilet, casque et combinaison pour tous ; le moniteur barre le raft.",
      who: "Familles",
      level: "Tous niveaux",
      where: "Embrun",
      alt: "Un raft dans les rapides de la Durance, pagaies levées",
      thumbAlt: "Un groupe hilare dans son raft",
    },
    couleau: {
      name: "Canyon du Couleau",
      short: "Couleau",
      place: "Écrins · familial",
      text: "Le canyon des familles : marche dans le torrent, petits sauts, toboggans naturels et grottes. Idéal pour un premier canyon.",
      safety: "Chaque saut est facultatif et se contourne.",
      who: "Dès 7 ans",
      level: "Familial",
      where: "Écrins",
      alt: "Des enfants casqués avancent dans l'eau claire du torrent",
      thumbAlt: "Un moniteur et un enfant tout sourire dans un bassin",
    },
    fournel: {
      name: "Canyon du Fournel",
      short: "Fournel",
      place: "Argentière-la-Bessée · sportif",
      text: "À 40 minutes d'Embrun, le canyon sportif : sauts de 2 à 7 mètres, toboggan naturel et passage en via ferrata.",
      safety: "Avant le premier saut, une zone d'entraînement pour se lancer en confiance.",
      who: "Dès 12 ans",
      level: "Sportif",
      where: "Argentière-la-Bessée",
      alt: "Un canyoniste descend la paroi au-dessus d'un bassin turquoise",
      thumbAlt: "Un saut dans une cascade du Fournel",
    },
  } satisfies Record<OutingId, unknown>,
  slots: { duration: "Durée", who: "Pour qui", price: "Par pers." },
  bookThis: "Réserver cette sortie",
  lineup: {
    title: "En un coup d'œil",
    rafting: "Rafting",
    canyoning: "Canyoning",
    season: "Toute la saison",
    rows: {
      season: ["Du 1er avril au 2 octobre", "Tous les jours", "Départ de Baratier", "2 h 30"],
      water: ["Dont 1 h 30 dans l'eau", "Petits groupes", "Moniteur diplômé", "Matériel fourni"],
    },
    duration: "2 h 30",
  },
  ritual: {
    title: "Comment se passe une sortie",
    steps: [
      {
        verb: "Enfiler",
        text: "Combinaison néoprène, gilet, chaussons, casque et baudrier : on vous équipe de la tête aux pieds.",
        photo: { src: "/images/canyoning/canyoning-01.jpg", alt: "Le moniteur ajuste le baudrier d'un jeune canyoniste" },
      },
      {
        verb: "Écouter",
        text: "Briefing sur la berge, puis zone d'entraînement avant les sauts. On ne se lance qu'une fois prêt.",
        photo: { src: "/images/rafting/rafting-03.jpg", alt: "Briefing au bord de la Durance avant la descente" },
      },
      {
        verb: "Descendre",
        text: "Une heure et demie dans l'eau, sur un parcours choisi pour votre groupe. Le moniteur reste avec vous du début à la fin.",
        photo: { src: "/images/rafting/rafting-10.jpg", alt: "Un raft franchit les rapides de la Durance" },
      },
      {
        verb: "Sécher",
        text: "Gardez le maillot sous la combinaison et laissez serviette et vêtements de rechange dans le sac. C'est tout ce qu'il faut apporter.",
        photo: { src: "/images/canyoning/canyoning-07.jpg", alt: "Le moniteur accompagne des enfants au pied d'une cascade" },
      },
    ] as { verb: string; text: string; photo: Photo }[],
  },
  canyonRitual: [
    { src: "/images/canyoning/canyoning-01.jpg", alt: "Le moniteur ajuste le baudrier d'un jeune canyoniste" },
    { src: "/images/canyoning/canyoning-07.jpg", alt: "Le moniteur accompagne des enfants au pied d'une cascade" },
    { src: "/images/canyoning/canyoning-03.jpg", alt: "Un saut entre deux rochers, dans la cascade" },
    { src: "/images/canyoning/canyoning-08.jpg", alt: "Un enfant et son moniteur sourient dans un bassin du canyon", position: "68% 40%" },
  ] as Photo[],
  guides: {
    title: "Xavier et Patrick",
    lead: "Deux moniteurs indépendants installés à Baratier, au bord du lac de Serre-Ponçon. Plus de 30 ans d'expérience cumulée en rafting et en canyoning dans les Hautes-Alpes.",
    note: "Patrick est guide de moyenne montagne et encadrant eau vive. Xavier est moniteur diplômé d'État en eau vive. Ce sont eux qui encadrent chaque sortie.",
    photoAlt: "Un moniteur d'Activités Nature avec un jeune canyoniste dans un bassin",
    mapLabel: "Le lac de Serre-Ponçon en été, turquoise entre les montagnes boisées",
    lakeCaption: "Le lac de Serre-Ponçon, à deux pas de la base",
    facts: [
      { label: "Base", value: "Baratier, 05200" },
      { label: "Embrun", value: "à 5 minutes" },
      { label: "Diplômes", value: "État et brevets J.S." },
      { label: "Ouvert", value: "1er avril – 2 octobre" },
    ] as Fact[],
  },
  ticket: {
    title: "Votre sortie",
    intro: "Choisissez la sortie, la date et le nombre de personnes. Le prix se calcule tout seul, et la demande part directement chez Xavier et Patrick.",
    outing: "Sortie",
    date: "Date souhaitée",
    dateHint: "Du 1er avril au 2 octobre",
    people: "Personnes",
    less: "Une personne de moins",
    more: "Une personne de plus",
    name: "Votre prénom",
    namePlaceholder: "Camille",
    total: "Total estimé",
    each: "Total estimé : {unit} € × {n} {people}",
    groupApplied: "Tarif groupe appliqué",
    groupHint: "Dès {size} personnes : {discount} € de moins par personne",
    whatsapp: "Envoyer sur WhatsApp",
    email: "Envoyer par e-mail",
    call: "ou appeler le {phone}",
    terms: [
      "Moniteur diplômé d'État",
      "Matériel complet fourni",
      "Réponse par WhatsApp ou e-mail",
      "Prix confirmé à la réservation",
    ],
    errorDate: "Choisissez une date entre le 1er avril et le 2 octobre.",
    message:
      "Bonjour Xavier et Patrick ! Je voudrais réserver : {outing}, le {date}, pour {n} personne(s). Prix estimé : {total} €.{name}",
    signed: " Prénom : {name}.",
    anyDate: "date à convenir",
    people1: "personne",
    peopleN: "personnes",
    online: "Voir les dates et réserver",
    introOnline: "Choisissez la sortie et le nombre de personnes pour voir le prix, puis réservez votre créneau en ligne.",
    onlineHint: "Choisissez votre créneau parmi les places encore libres, puis réservez en ligne.",
    ask: "Une question ? Écrivez-nous sur WhatsApp",
    onlineTerms: [
      "Moniteur diplômé d'État",
      "Matériel complet fourni",
      "Places disponibles en temps réel",
      "Réservation confirmée en ligne",
    ],
  },
  booking: {
    title: "Réservation en ligne",
    close: "Fermer la réservation",
  },
  gallery: {
    title: "Cet été, à Embrun",
    text: "Des photos de nos sorties, sur la Durance et dans les canyons, prises par l'équipe.",
    prev: "Photo précédente",
    of: "sur",
    next: "Photo suivante",
    photos: [
      { src: "/images/canyoning/canyoning-04.jpg", alt: "Une canyoniste descend une cascade en rappel" },
      { src: "/images/rafting/rafting-12.jpg", alt: "Une gerbe d'eau blanche sur un raft de la Durance" },
      { src: "/images/canyoning/canyoning-09.jpg", alt: "Un jeune canyoniste glisse sur une dalle au pied de la cascade" },
      { src: "/images/rafting/rafting-14.jpg", alt: "Le moniteur debout à l'arrière du raft, dans les rapides" },
      { src: "/images/canyoning/canyoning-11.jpg", alt: "Un enfant descend en rappel dans la cascade, assuré par le moniteur" },
      { src: "/images/rafting/rafting-16.jpg", alt: "Un grand raft pagaie le long de la forêt" },
    ] as Photo[],
  },
  faq: {
    title: "Bon à savoir",
    facts: [
      { label: "Adresse", value: "Z.A. Les Portes du Lac, 05200 Baratier" },
      { label: "Saison", value: "Du 1er avril au 2 octobre, tous les jours" },
      { label: "Téléphone", value: "07 66 01 05 09" },
    ] as Fact[],
    items: [
      {
        q: "Faut-il avoir de l'expérience ?",
        a: "Non. Le moniteur fait un briefing avant de partir et adapte le parcours au niveau du groupe.",
      },
      {
        q: "À partir de quel âge ?",
        a: "Le Couleau se fait dès 7 ans et le Fournel dès 12 ans. Pour le rafting, indiquez l'âge des enfants en réservant : on vous dit quel parcours convient.",
      },
      {
        q: "Qu'est-ce qu'on apporte ?",
        a: "Un maillot de bain, des chaussures fermées qui peuvent aller dans l'eau, une serviette et des vêtements de rechange.",
      },
      {
        q: "Quel matériel est fourni ?",
        a: "Combinaison néoprène, gilet, chaussons, casque et baudrier. Tout est compris dans le prix.",
      },
      {
        q: "Vous prenez les groupes et les EVJF ?",
        a: "Oui : familles, amis, enterrements de vie de garçon ou de jeune fille. Le tarif baisse dès 3 personnes.",
      },
      {
        q: "Où se donne-t-on rendez-vous ?",
        a: "Le lieu et l'heure vous sont donnés à la réservation, selon la sortie choisie.",
      },
    ],
    tallAlt: "Un raft se faufile entre les rochers des rapides",
    squareAlt: "Un toboggan naturel dans l'eau blanche du canyon",
    cta: "Réserver une sortie",
    write: "Poser une question",
  },
  contact: {
    sentence: "Un groupe, une date, une question ? Écrivez-nous.",
    city: "Baratier · Hautes-Alpes",
  },
  footer: {
    contact: "Contact",
    follow: "Suivre",
    legal: "© 2026 Activités Nature · Rafting et canyoning entre Embrun et Serre-Ponçon",
    credit: "Photo du lac : « Lake of Serre-Ponçon from D900 2 » par kallerna, CC BY-SA 4.0, via Wikimedia Commons. Toutes les autres photos : Activités Nature. Relief de la carte : Terrain Tiles (Mapzen, AWS), dont EU-DEM, données Copernicus.",
    photoAlt: "Deux pagayeurs à l'avant d'un raft, dans les rapides",
  },
  raftingPage: {
    title: "Rafting",
    sub: "Sur la Durance, à Embrun",
    lede: "Une descente en raft au pied d'Embrun, entre falaises calcaires et forêts des Hautes-Alpes, menée par un moniteur diplômé d'État.",
    statement:
      "Pas besoin d'expérience : on vous équipe, on vous explique, et on part.",
    text: "Le moniteur choisit le parcours selon votre groupe et barre le raft du début à la fin. Familles, amis, EVJF et EVG : tout le monde pagaie.",
    photoAlt: "Un équipage prêt à partir, dans son raft sur la plage de galets",
  },
  canyoningPage: {
    title: "Canyons",
    sub: "Couleau et Fournel, dans les Écrins",
    lede: "Marcher dans le torrent, glisser sur les toboggans, sauter dans les vasques : deux canyons, un pour les familles, un pour les sportifs.",
    statement:
      "Chaque canyon commence par une zone d'entraînement.",
    text: "Les groupes restent petits et chaque saut se fait quand vous êtes prêt. Le Couleau pour un premier canyon en famille, le Fournel pour les sauts jusqu'à 7 mètres.",
    photoAlt: "Une canyoniste descend une cascade en rappel",
  },
  more: "En savoir plus",
  back: "Retour à l'accueil",
};

export type Copy = typeof fr;

const en: Copy = {
  meta: {
    title: "Activités Nature · Rafting and canyoning in Embrun",
    description:
      "Rafting on the Durance and canyoning in the Écrins with Xavier and Patrick, state-certified instructors. Half-day trips, all gear included, from early April to early October.",
    rafting: "Rafting on the Durance in Embrun · Activités Nature",
    raftingDesc:
      "Raft down the Durance below Embrun with a state-certified instructor. 2.5 hours, no experience needed, all gear included.",
    canyoning: "Canyoning in the Écrins · Activités Nature",
    canyoningDesc:
      "Couleau canyon from age 7, Fournel canyon from age 12: jumps, natural slides and abseils with Xavier and Patrick.",
  },
  nav: {
    home: "Home",
    rafting: "Rafting",
    canyoning: "Canyoning",
    guides: "Your guides",
    prices: "Prices",
    faq: "Good to know",
    book: "Book",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    theme: "Switch theme",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Français",
    languageShort: "FR",
  },
  hero: {
    title: "Durance",
    sub: "Rafting & canyoning, Embrun",
    lede: "Half a day on the Durance river or in the canyons of the Écrins, with Xavier and Patrick, state-certified instructors.",
    facts: [
      { label: "Duration", value: "2.5 hrs" },
      { label: "Canyon", value: "age 7+" },
      { label: "Groups from", value: "€{price}" },
    ],
    cta: "Book a trip",
    call: "Call",
    photoAlt: "A crew in red life jackets on the turquoise Durance, below the cliffs",
  },
  outingsIntro: {
    title: "Pick your trip",
    text: "One river, two canyons. Every trip starts from Baratier, lasts 2.5 hours and needs no experience: gear is included and your instructor fits the route to your group.",
  },
  outings: {
    rafting: {
      name: "Rafting on the Durance",
      short: "Rafting",
      place: "Embrun · all levels",
      text: "Below Embrun, between limestone cliffs and pine forest. The route follows your group's level, from families to crews who want waves.",
      safety: "Life jacket, helmet and wetsuit for everyone; the instructor steers the raft.",
      who: "Families",
      level: "All levels",
      where: "Embrun",
      alt: "A raft in the Durance rapids, paddles up",
      thumbAlt: "A laughing crew in their raft",
    },
    couleau: {
      name: "Couleau canyon",
      short: "Couleau",
      place: "Écrins · family",
      text: "The family canyon: wading up the stream, small jumps, natural slides and caves. Perfect for a first canyon.",
      safety: "Every jump is optional and can be walked around.",
      who: "Age 7+",
      level: "Family",
      where: "Écrins",
      alt: "Helmeted children wading through the clear stream",
      thumbAlt: "An instructor and a beaming child in a pool",
    },
    fournel: {
      name: "Fournel canyon",
      short: "Fournel",
      place: "Argentière-la-Bessée · sporty",
      text: "40 minutes from Embrun, the sporty canyon: jumps from 2 to 7 metres, a natural slide and a via ferrata section.",
      safety: "Before the first jump, a practice area to build your confidence.",
      who: "Age 12+",
      level: "Sporty",
      where: "Argentière-la-Bessée",
      alt: "A canyoner climbs down the rock above a turquoise pool",
      thumbAlt: "A jump into a Fournel waterfall",
    },
  },
  slots: { duration: "Duration", who: "Who for", price: "Per person" },
  bookThis: "Book this trip",
  lineup: {
    title: "At a glance",
    rafting: "Rafting",
    canyoning: "Canyoning",
    season: "All season",
    rows: {
      season: ["1 April to 2 October", "Every day", "From Baratier", "2.5 hrs"],
      water: ["1.5 hrs in the water", "Small groups", "Certified instructor", "Gear included"],
    },
    duration: "2.5 hrs",
  },
  ritual: {
    title: "How a trip works",
    steps: [
      {
        verb: "Gear up",
        text: "Wetsuit, life jacket, booties, helmet and harness: we kit you out from head to toe.",
        photo: { src: "/images/canyoning/canyoning-01.jpg", alt: "The instructor adjusts a young canyoner's harness" },
      },
      {
        verb: "Listen",
        text: "A briefing on the bank, then a practice area before any jump. You only go when you're ready.",
        photo: { src: "/images/rafting/rafting-03.jpg", alt: "Briefing on the Durance bank before the descent" },
      },
      {
        verb: "Go!",
        text: "An hour and a half in the water, on a route picked for your group. Your instructor stays with you from start to finish.",
        photo: { src: "/images/rafting/rafting-10.jpg", alt: "A raft runs the Durance rapids" },
      },
      {
        verb: "Dry off",
        text: "Wear your swimsuit under the wetsuit and keep a towel and dry clothes in your bag. That's all you need to bring.",
        photo: { src: "/images/canyoning/canyoning-07.jpg", alt: "The instructor helps children at the foot of a waterfall" },
      },
    ],
  },
  canyonRitual: [
    { src: "/images/canyoning/canyoning-01.jpg", alt: "The instructor adjusts a young canyoner's harness" },
    { src: "/images/canyoning/canyoning-07.jpg", alt: "The instructor helps children at the foot of a waterfall" },
    { src: "/images/canyoning/canyoning-03.jpg", alt: "A jump between two rocks in the waterfall" },
    { src: "/images/canyoning/canyoning-08.jpg", alt: "A child and the instructor smiling in a canyon pool", position: "68% 40%" },
  ],
  guides: {
    title: "Xavier and Patrick",
    lead: "Two independent instructors based in Baratier, on the shore of Lake Serre-Ponçon, with more than 30 years of combined rafting and canyoning experience in the Hautes-Alpes.",
    note: "Patrick is a mountain leader and white-water instructor. Xavier is a state-certified white-water instructor. They lead every trip themselves.",
    photoAlt: "An Activités Nature instructor with a young canyoner in a pool",
    mapLabel: "Lake Serre-Ponçon in summer, turquoise between wooded mountains",
    lakeCaption: "Lake Serre-Ponçon, a stone's throw from base",
    facts: [
      { label: "Base", value: "Baratier, 05200" },
      { label: "Embrun", value: "5 minutes away" },
      { label: "Diplomas", value: "French state certified" },
      { label: "Open", value: "1 April – 2 October" },
    ],
  },
  ticket: {
    title: "Your trip",
    intro: "Pick the trip, the date and how many of you are coming. The price updates as you go, and your request goes straight to Xavier and Patrick.",
    outing: "Trip",
    date: "Preferred date",
    dateHint: "1 April to 2 October",
    people: "People",
    less: "One person fewer",
    more: "One more person",
    name: "Your first name",
    namePlaceholder: "Sam",
    total: "Estimated total",
    each: "Estimated total: €{unit} × {n} {people}",
    groupApplied: "Group rate applied",
    groupHint: "From {size} people: €{discount} off per person",
    whatsapp: "Send on WhatsApp",
    email: "Send by email",
    call: "or call {phone}",
    terms: ["State-certified instructor", "All gear included", "Reply by WhatsApp or email", "Price confirmed when booking"],
    errorDate: "Pick a date between 1 April and 2 October.",
    message:
      "Hello Xavier and Patrick! I'd like to book: {outing}, on {date}, for {n} person(s). Estimated price: €{total}.{name}",
    signed: " Name: {name}.",
    anyDate: "date to be agreed",
    people1: "person",
    peopleN: "people",
    online: "See dates and book",
    introOnline: "Pick the trip and the number of people to see the price, then book your slot online.",
    onlineHint: "Pick your slot from the places still free, then book online.",
    ask: "A question? Message us on WhatsApp",
    onlineTerms: [
      "State-certified instructor",
      "All gear provided",
      "Live availability",
      "Booking confirmed online",
    ],
  },
  booking: {
    title: "Online booking",
    close: "Close booking",
  },
  gallery: {
    title: "This summer in Embrun",
    text: "Photos from our trips on the Durance and in the canyons, taken by the team.",
    prev: "Previous photo",
    of: "of",
    next: "Next photo",
    photos: [
      { src: "/images/canyoning/canyoning-04.jpg", alt: "A canyoner abseils down a waterfall" },
      { src: "/images/rafting/rafting-12.jpg", alt: "White spray over a raft on the Durance" },
      { src: "/images/canyoning/canyoning-09.jpg", alt: "A young canyoner slides down a slab below the waterfall" },
      { src: "/images/rafting/rafting-14.jpg", alt: "The instructor standing at the back of the raft in the rapids" },
      { src: "/images/canyoning/canyoning-11.jpg", alt: "A child abseils down the waterfall, belayed by the instructor" },
      { src: "/images/rafting/rafting-16.jpg", alt: "A big raft paddles along the forest" },
    ],
  },
  faq: {
    title: "Good to know",
    facts: [
      { label: "Address", value: "Z.A. Les Portes du Lac, 05200 Baratier" },
      { label: "Season", value: "1 April to 2 October, every day" },
      { label: "Phone", value: "+33 7 66 01 05 09" },
    ],
    items: [
      { q: "Do I need experience?", a: "No. Your instructor gives a briefing before you set off and fits the route to the group's level." },
      {
        q: "What's the minimum age?",
        a: "Couleau canyon is from age 7 and Fournel from age 12. For rafting, tell us the children's ages when you book and we'll say which route suits.",
      },
      { q: "What should I bring?", a: "A swimsuit, closed shoes that can get wet, a towel and dry clothes." },
      { q: "What gear is included?", a: "Wetsuit, life jacket, booties, helmet and harness. It's all in the price." },
      {
        q: "Do you take groups and parties?",
        a: "Yes: families, friends, stag and hen parties. The price per person drops from 3 people.",
      },
      { q: "Where do we meet?", a: "We give you the meeting place and time when you book, depending on the trip." },
    ],
    tallAlt: "A raft threads between the rocks of the rapids",
    squareAlt: "A natural slide through white water",
    cta: "Book a trip",
    write: "Ask a question",
  },
  contact: {
    sentence: "A group, a date, a question? Write to us.",
    city: "Baratier · Hautes-Alpes, France",
  },
  footer: {
    contact: "Contact",
    follow: "Follow",
    legal: "© 2026 Activités Nature · Rafting and canyoning between Embrun and Serre-Ponçon",
    credit: "Lake photo: “Lake of Serre-Ponçon from D900 2” by kallerna, CC BY-SA 4.0, via Wikimedia Commons. All other photos: Activités Nature. Map relief: Terrain Tiles (Mapzen, AWS), including EU-DEM, Copernicus data.",
    photoAlt: "Two paddlers at the front of a raft in the rapids",
  },
  raftingPage: {
    title: "Rafting",
    sub: "On the Durance, Embrun",
    lede: "A raft descent below Embrun, between the limestone cliffs and forests of the Hautes-Alpes, led by a state-certified instructor.",
    statement:
      "No experience needed: we kit you out, explain everything, and off we go.",
    text: "Your instructor picks the route for your group and steers the raft from start to finish. Families, friends, stag and hen parties: everyone paddles.",
    photoAlt: "A crew ready to go, in their raft on the shingle beach",
  },
  canyoningPage: {
    title: "Canyons",
    sub: "Couleau and Fournel, Écrins",
    lede: "Wade up the stream, ride the natural slides, jump into the pools: two canyons, one for families and one for the sporty.",
    statement:
      "Every canyon starts with a practice area.",
    text: "Groups stay small and you jump only when you're ready. Couleau for a first family canyon, Fournel for jumps of up to 7 metres.",
    photoAlt: "A canyoner abseils down a waterfall",
  },
  more: "Find out more",
  back: "Back to home",
};

export const copy: Record<Locale, Copy> = { fr, en };

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
