import type { Locale } from "./copy";

// The four legal pages. Sanity holds the live text (Studio › Pages légales); the text
// below is the first version, used to seed Sanity and as a fallback when a field is empty.
// Light Markdown: "## " / "### " headings, "- " bullets, **bold**, [text](url).

export const legalIds = ["mentions", "privacy", "cookies", "terms"] as const;
export type LegalId = (typeof legalIds)[number];

/** Same address in both languages, so the FR / EN switch keeps the page. */
export const legalSlugs: Record<LegalId, string> = {
  mentions: "mentions-legales",
  privacy: "confidentialite",
  cookies: "cookies",
  terms: "cgv",
};

export const legalIdFromSlug = (slug: string) => legalIds.find((id) => legalSlugs[id] === slug);

export const legalUpdated = "2026-11-22";

type Page = { title: string; description: string; body: string };

const fr: Record<LegalId, Page> = {
  mentions: {
    title: "Mentions légales",
    description: "Éditeur, hébergeur et crédits du site Activités Nature, rafting et canyoning à Embrun.",
    body: `
## Éditeur du site

Ce site est édité par **Xavier Guillamet**, entrepreneur individuel, sous le nom commercial **Activités Nature**.

- Adresse : 393 route des Portes du Lac, 05200 Baratier, France
- SIRET : 929 089 225 00015
- Code APE : 93.19Z (autres activités liées au sport)
- TVA : [À compléter : numéro de TVA intracommunautaire, ou « TVA non applicable, article 293 B du CGI »]
- Téléphone : 07 66 01 05 09
- E-mail : [activites.nature@gmail.com](mailto:activites.nature@gmail.com)

Directeur de la publication : Xavier Guillamet.

## Encadrement des activités

Les sorties sont encadrées par des moniteurs titulaires d'un diplôme d'État et de la carte professionnelle d'éducateur sportif, comme l'exige le Code du sport (article L212-1).

Assurance responsabilité civile professionnelle : [À compléter : nom de l'assureur et numéro de contrat].

## Hébergement

Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Site : [vercel.com](https://vercel.com).

## Conception et réalisation

[Face Nord Graphisme](https://facenordgraphisme.fr), Hautes-Alpes.

## Propriété intellectuelle

Les textes, photographies, logo et la mise en page de ce site appartiennent à Activités Nature, sauf mention contraire. Toute reproduction, même partielle, demande une autorisation écrite préalable.

Crédits :

- Photo du lac de Serre-Ponçon : « Lake of Serre-Ponçon from D900 2 » par kallerna, licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr), via Wikimedia Commons.
- Carte : relief Terrain Tiles (Mapzen, AWS), dont EU-DEM, données Copernicus ; lac et Durance © les contributeurs d'[OpenStreetMap](https://www.openstreetmap.org/copyright).
- Toutes les autres photos : Activités Nature.

## Responsabilité

Les informations du site (tarifs, horaires, parcours) sont données à titre indicatif et peuvent évoluer. Seules font foi celles confirmées au moment de la réservation. Activités Nature n'est pas responsable du contenu des sites vers lesquels pointent les liens externes.

## Données personnelles et cookies

Voir la [politique de confidentialité](/fr/confidentialite) et la [politique cookies](/fr/cookies).
`,
  },

  privacy: {
    title: "Politique de confidentialité",
    description: "Quelles données Activités Nature collecte lors d'une réservation, pourquoi, combien de temps, et comment exercer vos droits.",
    body: `
Cette page explique quelles données personnelles Activités Nature reçoit quand vous visitez le site ou réservez une sortie, ce qu'il en fait et comment exercer vos droits.

## Responsable du traitement

Xavier Guillamet, entrepreneur individuel (Activités Nature), 393 route des Portes du Lac, 05200 Baratier. Contact : [activites.nature@gmail.com](mailto:activites.nature@gmail.com), 07 66 01 05 09.

## Les données que nous recevons

### Quand vous demandez une réservation par WhatsApp ou e-mail

Le formulaire du site n'envoie rien lui-même : il prépare un message que vous envoyez depuis WhatsApp ou votre messagerie. Nous recevons alors ce que vous y écrivez : nom, numéro de téléphone ou adresse e-mail, sortie choisie, date souhaitée, nombre et âge des participants.

### Quand vous réservez en ligne

La réservation en ligne s'ouvre dans une fenêtre fournie par Outplanners, notre logiciel de réservation. Nous recevons : prénom, nom, e-mail, téléphone, participants, et les informations utiles à la sécurité de la sortie (âge, taille ou poids pour ajuster l'équipement, remarques de santé si vous en indiquez). Le paiement par carte est traité par Stripe : nous ne voyons jamais votre numéro de carte.

### Quand vous naviguez sur le site

Le site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience. Notre hébergeur enregistre seulement des journaux techniques (adresse IP, pages demandées) pour assurer la sécurité et le bon fonctionnement du site.

## Pourquoi et sur quelle base

- Organiser votre sortie, vous recontacter, encaisser le paiement : exécution du contrat ou des mesures prises à votre demande avant le contrat.
- Assurer votre sécurité pendant l'activité (âge, taille, santé) : exécution du contrat et, pour les informations de santé, votre consentement explicite.
- Tenir la comptabilité et conserver les factures : obligation légale.
- Protéger le site contre les abus : intérêt légitime.

Vos données ne sont jamais vendues ni utilisées pour de la publicité.

## Combien de temps

- Demandes sans suite : 3 ans après le dernier échange.
- Réservations : 3 ans après la sortie, puis suppression.
- Informations de santé et de morphologie : supprimées 48 heures après la sortie.
- Factures et pièces comptables : 10 ans (obligation légale).
- Journaux techniques de l'hébergeur : durée limitée fixée par l'hébergeur.

## Qui y a accès

Xavier Guillamet et le moniteur qui encadre votre sortie, ainsi que les prestataires suivants, chacun pour sa seule mission :

- Outplanners (Face Nord Graphisme, Puy-Sanières) : logiciel de réservation.
- Stripe : paiement en ligne.
- Vercel Inc. : hébergement du site.
- Sanity : stockage des textes et des photos du site (aucune donnée de réservation).
- WhatsApp (Meta) et Google (Gmail) : seulement si vous nous écrivez par ces moyens.

Certains de ces prestataires sont des sociétés américaines. Les transferts hors de l'Union européenne sont encadrés par le Data Privacy Framework UE–États-Unis ou par les clauses contractuelles types de la Commission européenne.

## Vos droits

Vous pouvez accéder à vos données, les faire rectifier ou effacer, en limiter l'usage, vous opposer à leur traitement, demander leur portabilité et retirer votre consentement à tout moment. Écrivez à [activites.nature@gmail.com](mailto:activites.nature@gmail.com) : nous répondons sous un mois.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL ([cnil.fr](https://www.cnil.fr/fr/plaintes)).

## Mineurs

Les données des participants mineurs sont transmises par leur parent ou responsable légal au moment de la réservation.
`,
  },

  cookies: {
    title: "Politique cookies",
    description: "Le site Activités Nature ne dépose aucun cookie publicitaire ni de mesure d'audience.",
    body: `
**En bref : ce site ne dépose aucun cookie.** Pas de publicité, pas de mesure d'audience, pas de pixel de réseau social. C'est pourquoi aucun bandeau ne vous demande votre accord.

## Ce que le site garde dans votre navigateur

- **theme** (stockage local) : mémorise votre choix d'affichage clair ou sombre, seulement si vous utilisez le bouton prévu. Conservé jusqu'à ce que vous vidiez les données de votre navigateur.

Ce réglage reste sur votre appareil, ne nous est jamais transmis et n'a pas besoin de votre consentement : il sert uniquement la préférence que vous avez exprimée.

## La fenêtre de réservation en ligne

Quand vous ouvrez la réservation en ligne, la fenêtre est fournie par Outplanners. Elle ne dépose aucun cookie de suivi. Au moment du paiement, Stripe peut déposer des cookies strictement nécessaires à la sécurité de la transaction et à la prévention de la fraude.

## Les liens vers d'autres sites

Les liens vers Facebook ou WhatsApp vous emmènent sur ces services, qui appliquent leurs propres règles en matière de cookies.

## Gérer les cookies

Vous pouvez à tout moment bloquer ou supprimer les cookies et les données de site depuis les réglages de votre navigateur. Pour en savoir plus : [cnil.fr](https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur).
`,
  },

  terms: {
    title: "Conditions générales de vente",
    description: "Réservation, paiement, annulation et conditions de participation aux sorties rafting et canyoning d'Activités Nature.",
    body: `
## 1. Objet

Ces conditions s'appliquent à toute réservation d'une sortie de rafting ou de canyoning auprès d'Activités Nature, Xavier Guillamet, entrepreneur individuel (coordonnées dans les [mentions légales](/fr/mentions-legales)). Réserver une sortie vaut acceptation de ces conditions.

## 2. Les sorties

Chaque sortie est décrite sur le site : durée, âge minimum, niveau et lieu. Elle est encadrée par un moniteur diplômé d'État ; Activités Nature peut la confier à un moniteur diplômé partenaire.

L'équipement est fourni et compris dans le prix : combinaison néoprène, gilet, chaussons, casque et, en canyon, baudrier. Le transport jusqu'au lieu de rendez-vous n'est pas compris.

## 3. Conditions de participation

- Savoir nager et ne pas avoir d'appréhension de l'eau.
- Respecter l'âge minimum de chaque sortie : dès 7 ans pour le canyon du Couleau, dès 12 ans pour le canyon du Fournel ; pour le rafting, le parcours est choisi selon l'âge des enfants indiqué à la réservation.
- Les mineurs participent sous la responsabilité de leur parent ou responsable légal, qui donne son accord à la réservation.
- Être en bonne santé, sans contre-indication aux sports d'eau vive, et signaler au moniteur tout problème de santé, traitement ou grossesse.
- Suivre à tout moment les consignes du moniteur. Il peut exclure de la sortie, sans remboursement, une personne qui met en danger sa sécurité ou celle du groupe (consignes non respectées, alcool, etc.).
- Venir avec un maillot de bain, des chaussures fermées qui peuvent aller dans l'eau, une serviette et des vêtements de rechange.

## 4. Prix

Les prix sont indiqués en euros, toutes taxes comprises, par personne. Le prix applicable est celui affiché au moment de la réservation. Un tarif de groupe s'applique à partir de 3 personnes, selon les conditions affichées sur le site.

## 5. Réservation et paiement

Vous pouvez réserver :

- **en ligne**, depuis le site : la réservation est confirmée par e-mail et payée par carte bancaire au moment de la réservation, via notre prestataire de paiement sécurisé (Stripe) ;
- **par téléphone, WhatsApp ou e-mail** : la réservation est ferme quand Activités Nature la confirme. Les modalités de paiement vous sont alors indiquées.

Le lieu et l'heure du rendez-vous vous sont communiqués à la confirmation.

## 6. Pas de droit de rétractation

Une sortie de loisirs réservée pour une date précise n'ouvre pas droit au délai de rétractation de 14 jours (article L221-28 12° du Code de la consommation). Les règles d'annulation ci-dessous s'appliquent.

## 7. Annulation par le participant

- Plus de 7 jours avant la sortie : remboursement intégral, ou report sans frais.
- Entre 7 jours et 48 heures avant : remboursement de 50 %, ou report sans frais selon les places disponibles.
- Moins de 48 heures avant, ou absence le jour de la sortie : aucun remboursement.

Toute annulation se fait par écrit (e-mail ou WhatsApp). Un retard important au rendez-vous peut empêcher de partir avec le groupe : la sortie est alors due.

## 8. Annulation ou modification par Activités Nature

La sécurité passe avant tout. Si les conditions ne le permettent pas (météo, orage, niveau d'eau, crue, lâcher de barrage) ou si le nombre de participants est insuffisant, Activités Nature peut modifier le parcours, reporter ou annuler la sortie. En cas d'annulation, vous choisissez entre un report et un remboursement intégral, sans autre indemnité. Le moniteur est seul juge du maintien de la sortie et du choix du parcours, y compris en cours d'activité.

## 9. Responsabilité et assurance

Activités Nature est assuré en responsabilité civile professionnelle (voir les [mentions légales](/fr/mentions-legales)). Nous vous recommandons une assurance individuelle accident couvrant les sports de pleine nature. Ne prenez pas d'objets de valeur : Activités Nature n'est pas responsable des objets perdus ou abîmés pendant la sortie. Le matériel dégradé par négligence peut être facturé.

## 10. Photos

Le moniteur peut prendre des photos pendant la sortie. Elles ne sont publiées sur le site ou les réseaux sociaux qu'avec l'accord des personnes reconnaissables, ou de leurs parents pour les mineurs.

## 11. Données personnelles

Voir la [politique de confidentialité](/fr/confidentialite).

## 12. Réclamations, médiation et litiges

Toute réclamation est à adresser d'abord par écrit à [activites.nature@gmail.com](mailto:activites.nature@gmail.com). Si elle n'aboutit pas, vous pouvez recourir gratuitement au médiateur de la consommation : [À compléter : nom, adresse et site du médiateur de la consommation].

Ces conditions sont soumises au droit français. À défaut d'accord amiable, le litige est porté devant le tribunal compétent selon les règles de droit commun.
`,
  },
};

const en: Record<LegalId, Page> = {
  mentions: {
    title: "Legal notice",
    description: "Publisher, host and credits of the Activités Nature website, rafting and canyoning in Embrun.",
    body: `
*This is a translation. The French version is the reference text.*

## Publisher

This website is published by **Xavier Guillamet**, sole trader (entrepreneur individuel), trading as **Activités Nature**.

- Address: 393 route des Portes du Lac, 05200 Baratier, France
- SIRET: 929 089 225 00015
- APE code: 93.19Z (other sports activities)
- VAT: [To complete: EU VAT number, or "VAT not applicable, article 293 B of the French Tax Code"]
- Phone: +33 7 66 01 05 09
- E-mail: [activites.nature@gmail.com](mailto:activites.nature@gmail.com)

Publication director: Xavier Guillamet.

## Instructors

Trips are led by instructors holding a French state diploma and the professional sports instructor card, as required by the French Sports Code (article L212-1).

Professional liability insurance: [To complete: insurer and policy number].

## Hosting

Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. Website: [vercel.com](https://vercel.com).

## Design and build

[Face Nord Graphisme](https://facenordgraphisme.fr), Hautes-Alpes.

## Intellectual property

The texts, photographs, logo and layout of this website belong to Activités Nature unless stated otherwise. Any reproduction, even partial, requires prior written permission.

Credits:

- Photo of Lake Serre-Ponçon: "Lake of Serre-Ponçon from D900 2" by kallerna, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.
- Map: relief from Terrain Tiles (Mapzen, AWS), including EU-DEM, Copernicus data; lake and Durance © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- All other photos: Activités Nature.

## Liability

Information on this website (prices, times, routes) is indicative and may change. Only the details confirmed at booking are binding. Activités Nature is not responsible for the content of external websites linked from this site.

## Personal data and cookies

See the [privacy policy](/en/confidentialite) and the [cookie policy](/en/cookies).
`,
  },

  privacy: {
    title: "Privacy policy",
    description: "What data Activités Nature collects when you book, why, for how long, and how to exercise your rights.",
    body: `
*This is a translation. The French version is the reference text.*

This page explains what personal data Activités Nature receives when you visit the website or book a trip, what we do with it and how to exercise your rights.

## Data controller

Xavier Guillamet, sole trader (Activités Nature), 393 route des Portes du Lac, 05200 Baratier, France. Contact: [activites.nature@gmail.com](mailto:activites.nature@gmail.com), +33 7 66 01 05 09.

## The data we receive

### When you ask to book by WhatsApp or e-mail

The form on the website sends nothing by itself: it prepares a message that you send from WhatsApp or your e-mail app. We then receive what you write: name, phone number or e-mail address, chosen trip, preferred date, number and ages of participants.

### When you book online

Online booking opens in a window provided by Outplanners, our booking software. We receive: first name, last name, e-mail, phone, participants, and the details needed for safety on the trip (age, height or weight to fit the gear, health notes if you give any). Card payments are handled by Stripe: we never see your card number.

### When you browse the website

The website sets no cookies and uses no audience measurement. Our host only keeps technical logs (IP address, pages requested) to keep the site secure and working.

## Why, and on what legal basis

- Organising your trip, getting back to you, taking payment: performance of the contract, or steps taken at your request before it.
- Your safety during the activity (age, height, health): performance of the contract and, for health details, your explicit consent.
- Bookkeeping and keeping invoices: legal obligation.
- Protecting the website against abuse: legitimate interest.

Your data is never sold or used for advertising.

## How long

- Enquiries that did not lead to a booking: 3 years after the last exchange.
- Bookings: 3 years after the trip, then deleted.
- Health and body measurements: deleted 48 hours after the trip.
- Invoices and accounting records: 10 years (legal obligation).
- Host's technical logs: a limited period set by the host.

## Who has access

Xavier Guillamet and the instructor leading your trip, plus the following providers, each for their own task only:

- Outplanners (Face Nord Graphisme, Puy-Sanières, France): booking software.
- Stripe: online payment.
- Vercel Inc.: website hosting.
- Sanity: storage of the website's texts and photos (no booking data).
- WhatsApp (Meta) and Google (Gmail): only if you contact us that way.

Some of these providers are US companies. Transfers outside the European Union are covered by the EU–US Data Privacy Framework or the European Commission's standard contractual clauses.

## Your rights

You can access your data, have it corrected or erased, restrict its use, object to its processing, ask for its portability and withdraw your consent at any time. Write to [activites.nature@gmail.com](mailto:activites.nature@gmail.com): we reply within one month.

If you believe your rights are not respected, you can lodge a complaint with the CNIL, the French data protection authority ([cnil.fr](https://www.cnil.fr/en/complaints)).

## Minors

Data about participants under 18 is provided by their parent or legal guardian when booking.
`,
  },

  cookies: {
    title: "Cookie policy",
    description: "The Activités Nature website sets no advertising or audience measurement cookies.",
    body: `
*This is a translation. The French version is the reference text.*

**In short: this website sets no cookies.** No advertising, no audience measurement, no social media pixel. That is why no banner asks for your consent.

## What the website keeps in your browser

- **theme** (local storage): remembers your choice of light or dark display, only if you use the toggle. Kept until you clear your browser data.

This setting stays on your device, is never sent to us and needs no consent: it only serves the preference you chose.

## The online booking window

When you open online booking, the window is provided by Outplanners. It sets no tracking cookies. At payment, Stripe may set cookies strictly necessary for transaction security and fraud prevention.

## Links to other websites

Links to Facebook or WhatsApp take you to those services, which apply their own cookie rules.

## Managing cookies

You can block or delete cookies and site data at any time in your browser settings.
`,
  },

  terms: {
    title: "Terms and conditions of sale",
    description: "Booking, payment, cancellation and participation conditions for Activités Nature rafting and canyoning trips.",
    body: `
*This is a translation. The French version is the reference text.*

## 1. Scope

These terms apply to any booking of a rafting or canyoning trip with Activités Nature, Xavier Guillamet, sole trader (contact details in the [legal notice](/en/mentions-legales)). Booking a trip means accepting these terms.

## 2. The trips

Each trip is described on the website: duration, minimum age, level and location. It is led by a state-qualified instructor; Activités Nature may entrust it to a qualified partner instructor.

Gear is provided and included in the price: wetsuit, life jacket, neoprene shoes, helmet and, for canyoning, harness. Travel to the meeting point is not included.

## 3. Participation conditions

- Be able to swim and be comfortable in water.
- Meet each trip's minimum age: from 7 for Couleau canyon, from 12 for Fournel canyon; for rafting, the route is chosen according to the children's ages given at booking.
- Minors take part under the responsibility of their parent or legal guardian, who agrees to the booking.
- Be in good health, with no contraindication to white-water sports, and tell the instructor about any health issue, medication or pregnancy.
- Follow the instructor's instructions at all times. The instructor may exclude, without refund, anyone who endangers their own or the group's safety (instructions ignored, alcohol, etc.).
- Bring a swimsuit, closed shoes that can get wet, a towel and dry clothes.

## 4. Prices

Prices are in euros, all taxes included, per person. The price that applies is the one shown at the time of booking. A group rate applies from 3 people, as shown on the website.

## 5. Booking and payment

You can book:

- **online**, from the website: the booking is confirmed by e-mail and paid by card at the time of booking, through our secure payment provider (Stripe);
- **by phone, WhatsApp or e-mail**: the booking is firm once Activités Nature confirms it. Payment terms are given to you then.

The meeting place and time are given with the confirmation.

## 6. No right of withdrawal

A leisure activity booked for a specific date does not carry the 14-day withdrawal period (article L221-28 12° of the French Consumer Code). The cancellation rules below apply.

## 7. Cancellation by the participant

- More than 7 days before the trip: full refund, or free change of date.
- Between 7 days and 48 hours before: 50% refund, or free change of date subject to availability.
- Less than 48 hours before, or no-show: no refund.

Cancellations must be made in writing (e-mail or WhatsApp). Arriving very late may make it impossible to leave with the group: the trip is then due.

## 8. Cancellation or change by Activités Nature

Safety comes first. If conditions do not allow it (weather, storm, water level, flood, dam release) or if there are not enough participants, Activités Nature may change the route, postpone or cancel the trip. If a trip is cancelled, you choose between a new date and a full refund, with no further compensation. The instructor alone decides whether the trip goes ahead and which route it takes, including during the activity.

## 9. Liability and insurance

Activités Nature holds professional liability insurance (see the [legal notice](/en/mentions-legales)). We recommend personal accident insurance covering outdoor sports. Leave valuables behind: Activités Nature is not responsible for items lost or damaged during the trip. Gear damaged through negligence may be charged.

## 10. Photos

The instructor may take photos during the trip. They are only posted on the website or social media with the consent of the people who can be recognised, or of their parents for minors.

## 11. Personal data

See the [privacy policy](/en/confidentialite).

## 12. Complaints, mediation and disputes

Please send any complaint in writing to [activites.nature@gmail.com](mailto:activites.nature@gmail.com) first. If it is not resolved, you can use the consumer mediator free of charge: [To complete: name, address and website of the consumer mediator].

These terms are governed by French law. Failing an amicable settlement, disputes go before the competent court under ordinary rules.
`,
  },
};

export const legalPages: Record<Locale, Record<LegalId, Page>> = { fr, en };

/* ---------- Light Markdown → Portable Text (what Sanity stores) ---------- */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };
export type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  listItem?: "bullet";
  level?: number;
  markDefs: MarkDef[];
  children: Span[];
};

export function toBlocks(md: string, prefix: string): Block[] {
  let n = 0;
  const key = () => `${prefix}${(n++).toString(36)}`;

  const inline = (text: string) => {
    const markDefs: MarkDef[] = [];
    const children: Span[] = [];
    const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      if (m.index > last) children.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
      if (m[1]) children.push({ _type: "span", _key: key(), text: m[1], marks: ["strong"] });
      else if (m[2]) children.push({ _type: "span", _key: key(), text: m[2], marks: ["em"] });
      else {
        const def: MarkDef = { _type: "link", _key: key(), href: m[4] };
        markDefs.push(def);
        children.push({ _type: "span", _key: key(), text: m[3], marks: [def._key] });
      }
      last = m.index + m[0].length;
    }
    if (last < text.length) children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
    return { markDefs, children };
  };

  const blocks: Block[] = [];
  for (const chunk of md.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.every((l) => l.startsWith("- "))) {
      for (const l of lines) blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, ...inline(l.slice(2)) });
      continue;
    }
    const text = lines.join(" ");
    const h = /^(#{2,3}) (.*)$/.exec(text);
    if (h) blocks.push({ _type: "block", _key: key(), style: h[1] === "##" ? "h2" : "h3", ...inline(h[2]) });
    else blocks.push({ _type: "block", _key: key(), style: "normal", ...inline(text) });
  }
  return blocks;
}
