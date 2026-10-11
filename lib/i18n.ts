import type { PhotoId } from "./photos";
import type { TestimonialId } from "./testimonials";

export const locales = ["en", "fr", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const listingSlugs = [
  "premium-condo-rentals",
  "business-registration",
  "family-relocation",
  "private-transfers",
] as const;

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

type Stat = { value: string; label: string };
type Category = { title: string; description: string };
type Feature = { title: string; text: string };

type Dictionary = {
  home: {
    nextMove: string;
    city: string;
    ready: string;
    explore: string;
    heading: string;
    discover: string;
  };
  services: {
    heading: string;
    items: { name: string; detail: string }[];
    planHeading: string;
    planDescription: string;
    advisor: string;
  };
  marketplace: {
    heading: string;
    listings: { title: string; subtitle: string }[];
    details: string;
    descriptions: string[];
    back: string;
    availability: string;
  };
  visa: { heading: string; steps: string[] };
  business: { heading: string; pillars: string[] };
  languageNames: Record<Locale, string>;
  notFound: { heading: string; description: string; home: string };
  site: {
    name: string;
    tagline: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    marketplace: string;
    guide: string;
    business: string;
    testimonials: string;
    login: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: Stat[];
  categories: Category[];
  features: Feature[];
  cta: {
    heading: string;
    description: string;
    button: string;
  };
  footer: {
    rights: string;
  };
  photos: {
    alt: Record<PhotoId, string>;
    places: Record<PhotoId, string>;
    galleryEyebrow: string;
    galleryHeading: string;
    galleryDescription: string;
    creditsLink: string;
    creditsHeading: string;
    creditsDescription: string;
    author: string;
    license: string;
    source: string;
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    description: string;
    disclaimer: string;
    homeHeading: string;
    readAll: string;
    resultLabel: string;
    ctaHeading: string;
    ctaDescription: string;
    ctaButton: string;
    items: Record<TestimonialId, { role: string; place: string; service: string; quote: string; result: string }>;
  };
  pageTitles: {
    home: string;
    services: string;
    marketplace: string;
    guide: string;
    business: string;
    testimonials: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    home: {
      nextMove: "Next move",
      city: "Phnom Penh",
      ready: "Live-ready",
      explore: "Explore by need",
      heading: "Everything required for a confident move.",
      discover: "Discover more",
    },
    services: {
      heading: "Services built for relocation and growth.",
      items: [
        { name: "Visa support", detail: "Fast-track documentation and filing guidance." },
        { name: "Property search", detail: "Apartment and condo discovery for families and teams." },
        { name: "Business setup", detail: "Entity registration and compliance support." },
        { name: "Local advisor", detail: "On-demand guidance for expat life and service access." },
      ],
      planHeading: "Need a tailored plan?",
      planDescription: "Start with a guided discovery call and create a personalized roadmap for living, working or investing in Cambodia.",
      advisor: "Talk to an advisor",
    },
    marketplace: {
      heading: "Verified local experiences and business support.",
      listings: [
        { title: "Premium condo rentals", subtitle: "Central Phnom Penh • $1,200/mo" },
        { title: "Business registration", subtitle: "Incorporation support • from $500" },
        { title: "Family relocation package", subtitle: "Schools, housing and logistics • custom quote" },
        { title: "Private transfers", subtitle: "Airport arrival and city transfers • from $25" },
      ],
      details: "View details",
      descriptions: [
        "Explore premium apartment rentals in central Phnom Penh. Before choosing a property, confirm the lease term, included utilities, deposit and viewing arrangements.",
        "Prepare your company registration in Cambodia with guidance on the documents and administrative steps to discuss with a local professional. Government fees and third-party services must be confirmed separately.",
        "Plan your family's move around housing, schools and arrival logistics. The scope and quote depend on your family size, preferred area and arrival date.",
        "Plan an airport pickup or private city transfer. The final quote depends on the route, passenger count, luggage and pickup time.",
      ],
      back: "Back to marketplace",
      availability: "These are illustrative offers. Prices and availability are not confirmed. Booking and payment are not currently available on this site.",
    },
    visa: {
      heading: "A practical roadmap for your move to Cambodia.",
      steps: [
        "Confirm your eligibility and visa type.",
        "Gather supporting documents and housing details.",
        "Submit the application and monitor the process.",
        "Complete arrival and local registration steps.",
      ],
    },
    business: {
      heading: "Build your presence in Cambodia with a reliable local foundation.",
      pillars: [
        "Company formation and jurisdiction guidance",
        "Accounting, payroll and operational support",
        "Market access and local business introductions",
      ],
    },
    languageNames: {
      en: "Switch language to English",
      fr: "Switch language to French",
      es: "Switch language to Spanish",
      de: "Switch language to German",
    },
    notFound: {
      heading: "Page not found",
      description: "This route is not available in the current language set.",
      home: "Return home",
    },
    site: {
      name: "KHMERA",
      tagline: "Move smarter. Build locally. Explore more.",
      description:
        "International platform for expats, entrepreneurs, travellers and professionals relocating to Cambodia.",
    },
    nav: {
      home: "Home",
      services: "Services",
      marketplace: "Marketplace",
      guide: "Visa guide",
      business: "Business",
      testimonials: "Testimonials",
      login: "Member portal",
      cta: "List a service",
    },
    hero: {
      eyebrow: "Expat • Business • Travel",
      title: "Settle and grow with confidence in Cambodia.",
      description:
        "Find the trusted guidance, local services and business opportunities you need to move, work and thrive in Phnom Penh and beyond.",
      primaryCta: "Explore opportunities",
      secondaryCta: "Speak with an advisor",
    },
    stats: [
      { value: "18k+", label: "expats guided" },
      { value: "420+", label: "verified local partners" },
      { value: "96%", label: "member satisfaction" },
    ],
    categories: [
      {
        title: "Relocation",
        description: "Visas, housing, schools and settling-in support for newcomers.",
      },
      {
        title: "Business",
        description: "Company setup, compliance and discovery for founders and SMEs.",
      },
      {
        title: "Jobs",
        description: "Find flexible roles, remote work and local opportunities.",
      },
      {
        title: "Travel",
        description: "Guides, transfers, tours and trusted local experiences.",
      },
    ],
    features: [
      {
        title: "Visa & residence support",
        text: "Navigate requirements with clear checklists and expert guidance.",
      },
      {
        title: "Verified service marketplace",
        text: "Discover legal, lifestyle and professional support from trusted local providers.",
      },
      {
        title: "Payments that fit real life",
        text: "Book and pay with secure local and international payment methods.",
      },
    ],
    cta: {
      heading: "Ready to build your base in Cambodia?",
      description:
        "Whether you are relocating, investing or exploring, KHMERA gives you the right next step.",
      button: "Start your plan",
    },
    photos: {
      alt: {
        "angkor-wat-sunrise": "Silhouette of Angkor Wat reflected in a pond at sunrise",
        "phnom-penh-skyline": "Phnom Penh skyline with pagoda roofs and modern towers",
        "royal-palace": "Throne Hall of the Royal Palace in Phnom Penh",
        "pub-street": "Pub Street in Siem Reap lit with lanterns at night",
        "riverside": "Palm-lined riverside promenade along the Tonle Sap in Phnom Penh",
        "tonle-sap": "Woman rowing a boat loaded with vegetables in a Tonle Sap floating village",
        "central-market": "Piles of oranges and fruit at Phnom Penh Central Market",
        "rice-fields": "Green rice fields and sugar palms in the Cambodian countryside",
        "tuk-tuk": "White tuk-tuk parked on a street in Phnom Penh",
        "street-food": "Tray of Cambodian street food skewers at night",
        "nomad-laptop": "Hands typing on a laptop keyboard",
        "founder-meeting": "Hands of two people reviewing documents next to laptops",
        "ikat-weaving": "Hands weaving a red ikat silk pattern on a loom",
        "rice-planting": "Farmers in hats bending over to plant rice seedlings",
        "kep-sunset": "Silhouette of a fisherman on a boat under a red sunset in Kep",
        "siem-reap-fisherman": "Distant figure fishing in a green pond near Angkor Thom",
      },
      places: {
        "angkor-wat-sunrise": "Angkor Wat, Siem Reap",
        "phnom-penh-skyline": "Phnom Penh",
        "royal-palace": "Royal Palace, Phnom Penh",
        "pub-street": "Pub Street, Siem Reap",
        "riverside": "Sisowath Quay, Phnom Penh",
        "tonle-sap": "Tonle Sap lake",
        "central-market": "Central Market, Phnom Penh",
        "rice-fields": "Cambodian countryside",
        "tuk-tuk": "Tuk-tuk, Phnom Penh",
        "street-food": "Street food",
        "nomad-laptop": "Remote work",
        "founder-meeting": "Business meeting",
        "ikat-weaving": "Ikat weaving",
        "rice-planting": "Rice planting",
        "kep-sunset": "Kep",
        "siem-reap-fisherman": "Angkor Thom, Siem Reap",
      },
      galleryEyebrow: "Life in Cambodia",
      galleryHeading: "From the temples of Siem Reap to the riverside of Phnom Penh.",
      galleryDescription: "A glimpse of everyday life you will discover: markets, floating villages, rice fields and city nights.",
      creditsLink: "Photo credits",
      creditsHeading: "Photo credits",
      creditsDescription: "All photos are royalty-free images from Wikimedia Commons, used under their respective public domain (CC0) or Creative Commons licenses.",
      author: "Author: ",
      license: "License: ",
      source: "View source",
    },
    testimonials: {
      eyebrow: "Testimonials",
      heading: "They built their life in Cambodia with KHMERA.",
      description: "Freelancers, founders, families and retirees: stories of people who moved, settled and grew with our support.",
      disclaimer: "Illustrative testimonials: the people and stories are fictional and the photos do not depict them.",
      homeHeading: "Stories from our community",
      readAll: "Read all testimonials",
      resultLabel: "Result",
      ctaHeading: "Ready to write your own story?",
      ctaDescription: "Tell us about your project and we will build a step-by-step plan with you.",
      ctaButton: "Talk to an advisor",
      items: {
        "remote-developer": {
          role: "Freelance developer · France",
          place: "Phnom Penh",
          service: "Visa support",
          quote: "I arrived with a laptop and a tourist visa. KHMERA sorted out my long-stay visa and found me a flat with reliable fibre near BKK1. I was working with my European clients from day one.",
          result: "Long-stay visa and apartment in 3 weeks",
        },
        "consulting-founder": {
          role: "Founder of a consulting firm · Germany",
          place: "Phnom Penh",
          service: "Business setup",
          quote: "Registering a company abroad looked like a maze. The KHMERA advisor handled the registration, tax number and bank account, and explained every step in plain language.",
          result: "Company registered and first clients signed in 2 months",
        },
        "textile-brand": {
          role: "Co-founder of an ethical textile brand · Cambodia",
          place: "Siem Reap",
          service: "Marketplace",
          quote: "Through the marketplace we met buyers from France and Spain who care about handmade ikat. Our weavers now have steady orders all year round.",
          result: "4 new international retailers",
        },
        "rice-export": {
          role: "Food importer · Spain",
          place: "Battambang",
          service: "Local advisor",
          quote: "I wanted to source organic rice directly from cooperatives. KHMERA introduced me to trusted partners and helped with export paperwork and quality checks.",
          result: "First container shipped to Valencia",
        },
        "kep-retirees": {
          role: "Retired couple · United Kingdom",
          place: "Kep",
          service: "Property search",
          quote: "We dreamed of a quiet place by the sea. KHMERA found us a house with a garden in Kep, handled our retirement visas and even recommended a good doctor.",
          result: "Settled by the sea in 6 weeks",
        },
        "siem-reap-family": {
          role: "Family of four · Czech Republic",
          place: "Siem Reap",
          service: "Family relocation",
          quote: "Moving with two children was our biggest worry. KHMERA helped us choose an international school, find a home and register our small guesthouse.",
          result: "Kids at school and guesthouse open within one season",
        },
      },
    },
    footer: {
      rights: "Built for international living, business and travel.",
    },
    pageTitles: {
      home: "Home",
      services: "Services",
      marketplace: "Marketplace",
      guide: "Visa guide",
      business: "Business",
      testimonials: "Testimonials",
    },
  },
  fr: {
    home: {
      nextMove: "Votre prochaine destination",
      city: "Phnom Penh",
      ready: "Prêt à s'installer",
      explore: "Explorez selon vos besoins",
      heading: "Tout ce qu'il faut pour s'installer en toute confiance.",
      discover: "En savoir plus",
    },
    services: {
      heading: "Des services pour vous installer et vous développer.",
      items: [
        { name: "Accompagnement visa", detail: "Aide à la préparation des documents et au dépôt des dossiers." },
        { name: "Recherche de logement", detail: "Recherche d'appartements et de résidences pour les familles et les équipes." },
        { name: "Création d'entreprise", detail: "Accompagnement à l'immatriculation et à la conformité." },
        { name: "Conseiller local", detail: "Conseils à la demande pour la vie d'expatrié et l'accès aux services." },
      ],
      planHeading: "Besoin d'un accompagnement sur mesure ?",
      planDescription: "Commencez par un entretien avec un conseiller et créez une feuille de route personnalisée pour vivre, travailler ou investir au Cambodge.",
      advisor: "Parler à un conseiller",
    },
    marketplace: {
      heading: "Des expériences locales vérifiées et un accompagnement professionnel.",
      listings: [
        { title: "Location de résidences haut de gamme", subtitle: "Centre de Phnom Penh • 1 200 $ US/mois" },
        { title: "Immatriculation d'entreprise", subtitle: "Accompagnement à la création • à partir de 500 $ US" },
        { title: "Installation en famille", subtitle: "Écoles, logement et logistique • devis personnalisé" },
        { title: "Transferts privés", subtitle: "Accueil à l'aéroport et transferts en ville • à partir de 25 $ US" },
      ],
      details: "Voir les détails",
      descriptions: [
        "Découvrez les locations d'appartements haut de gamme dans le centre de Phnom Penh. Avant de choisir un logement, vérifiez la durée du bail, les charges incluses, le dépôt et les modalités de visite.",
        "Préparez l'immatriculation de votre entreprise au Cambodge avec des informations sur les documents et les démarches à examiner avec un professionnel local. Les frais administratifs et prestations de tiers doivent être confirmés séparément.",
        "Préparez votre installation en famille : logement, écoles et organisation de l'arrivée. Le contenu et le devis dépendent de la taille de votre famille, du quartier souhaité et de votre date d'arrivée.",
        "Préparez votre accueil à l'aéroport ou un transfert privé en ville. Le devis final dépend du trajet, du nombre de passagers, des bagages et de l'heure de prise en charge.",
      ],
      back: "Retour au catalogue",
      availability: "Ces offres sont présentées à titre d'exemple. Les prix et disponibilités ne sont pas confirmés. La réservation et le paiement ne sont pas encore disponibles sur ce site.",
    },
    visa: {
      heading: "Une feuille de route pratique pour votre installation au Cambodge.",
      steps: [
        "Vérifiez votre éligibilité et le type de visa adapté.",
        "Rassemblez les pièces justificatives et les informations sur votre logement.",
        "Déposez votre demande et suivez son avancement.",
        "Effectuez les démarches d'arrivée et d'enregistrement local.",
      ],
    },
    business: {
      heading: "Développez votre activité au Cambodge sur des bases locales solides.",
      pillars: [
        "Création d'entreprise et conseils sur le cadre juridique",
        "Comptabilité, gestion de la paie et accompagnement opérationnel",
        "Accès au marché et mise en relation avec des entreprises locales",
      ],
    },
    languageNames: {
      en: "Passer à l'anglais",
      fr: "Passer au français",
      es: "Passer à l'espagnol",
      de: "Passer à l'allemand",
    },
    notFound: {
      heading: "Page introuvable",
      description: "Cette page n'est pas disponible dans les langues proposées.",
      home: "Retour à l'accueil",
    },
    site: {
      name: "KHMERA",
      tagline: "Déplacez-vous plus intelligemment. Construisez localement. Explorez davantage.",
      description:
        "Plateforme internationale pour les expatriés, entrepreneurs, voyageurs et professionnels installés au Cambodge.",
    },
    nav: {
      home: "Accueil",
      services: "Services",
      marketplace: "Marché",
      guide: "Guide visa",
      business: "Entreprise",
      testimonials: "Témoignages",
      login: "Espace membre",
      cta: "Publier un service",
    },
    hero: {
      eyebrow: "Expatriation • Affaires • Voyages",
      title: "Installez-vous et développez-vous sereinement au Cambodge.",
      description:
        "Trouvez les bons conseils, services locaux et opportunités professionnelles pour vivre, travailler et réussir à Phnom Penh et ailleurs.",
      primaryCta: "Découvrir les opportunités",
      secondaryCta: "Parler à un conseiller",
    },
    stats: [
      { value: "18k+", label: "expatriés accompagnés" },
      { value: "420+", label: "partenaires locaux vérifiés" },
      { value: "96%", label: "satisfaction membre" },
    ],
    categories: [
      {
        title: "Installation",
        description: "Visa, logement, écoles et accompagnement à l'arrivée.",
      },
      {
        title: "Affaires",
        description: "Création d'entreprise, conformité et opportunités pour fondateurs.",
      },
      {
        title: "Emploi",
        description: "Trouvez des missions flexibles et des opportunités locales.",
      },
      {
        title: "Voyages",
        description: "Guides, transferts, excursions et expériences locales fiables.",
      },
    ],
    features: [
      {
        title: "Accompagnement visa & résidence",
        text: "Suivez des étapes claires et obtenez des conseils utiles.",
      },
      {
        title: "Marché de services vérifiés",
        text: "Découvrir des prestataires locaux fiables pour les besoins professionnels et quotidiens.",
      },
      {
        title: "Paiements adaptés au quotidien",
        text: "Réservez et payez en toute sécurité avec des modes de paiement locaux et internationaux.",
      },
    ],
    cta: {
      heading: "Prêt à vous installer au Cambodge ?",
      description:
        "Que vous veniez pour vous installer, investir ou voyager, KHMERA vous aide à trouver la bonne étape suivante.",
      button: "Commencer mon plan",
    },
    photos: {
      alt: {
        "angkor-wat-sunrise": "Silhouette d'Angkor Wat se reflétant dans un bassin au lever du soleil",
        "phnom-penh-skyline": "Panorama de Phnom Penh avec toits de pagodes et tours modernes",
        "royal-palace": "Salle du Trône du Palais royal de Phnom Penh",
        "pub-street": "Pub Street à Siem Reap illuminée de lanternes la nuit",
        "riverside": "Promenade bordée de palmiers le long du Tonlé Sap à Phnom Penh",
        "tonle-sap": "Femme ramant dans une barque chargée de légumes dans un village flottant du Tonlé Sap",
        "central-market": "Étals d'oranges et de fruits au Marché central de Phnom Penh",
        "rice-fields": "Rizières vertes et palmiers à sucre dans la campagne cambodgienne",
        "tuk-tuk": "Tuk-tuk blanc garé dans une rue de Phnom Penh",
        "street-food": "Plateau de brochettes de street food cambodgienne la nuit",
        "nomad-laptop": "Mains tapant sur le clavier d'un ordinateur portable",
        "founder-meeting": "Mains de deux personnes étudiant des documents à côté d'ordinateurs",
        "ikat-weaving": "Mains tissant un motif ikat rouge en soie sur un métier",
        "rice-planting": "Agriculteurs coiffés de chapeaux repiquant des plants de riz",
        "kep-sunset": "Silhouette d'un pêcheur sur sa barque sous un coucher de soleil rouge à Kep",
        "siem-reap-fisherman": "Silhouette lointaine pêchant dans un étang verdoyant près d'Angkor Thom",
      },
      places: {
        "angkor-wat-sunrise": "Angkor Wat, Siem Reap",
        "phnom-penh-skyline": "Phnom Penh",
        "royal-palace": "Palais royal, Phnom Penh",
        "pub-street": "Pub Street, Siem Reap",
        "riverside": "Quai Sisowath, Phnom Penh",
        "tonle-sap": "Lac Tonlé Sap",
        "central-market": "Marché central, Phnom Penh",
        "rice-fields": "Campagne cambodgienne",
        "tuk-tuk": "Tuk-tuk, Phnom Penh",
        "street-food": "Cuisine de rue",
        "nomad-laptop": "Travail à distance",
        "founder-meeting": "Réunion d'affaires",
        "ikat-weaving": "Tissage ikat",
        "rice-planting": "Repiquage du riz",
        "kep-sunset": "Kep",
        "siem-reap-fisherman": "Angkor Thom, Siem Reap",
      },
      galleryEyebrow: "La vie au Cambodge",
      galleryHeading: "Des temples de Siem Reap aux quais de Phnom Penh.",
      galleryDescription: "Un aperçu du quotidien qui vous attend : marchés, villages flottants, rizières et nuits animées.",
      creditsLink: "Crédits photo",
      creditsHeading: "Crédits photo",
      creditsDescription: "Toutes les photos sont des images libres de droits issues de Wikimedia Commons, utilisées selon leur licence respective : domaine public (CC0) ou Creative Commons.",
      author: "Auteur : ",
      license: "Licence : ",
      source: "Voir la source",
    },
    testimonials: {
      eyebrow: "Témoignages",
      heading: "Ils ont construit leur vie au Cambodge avec KHMERA.",
      description: "Freelances, fondateurs, familles et retraités : des parcours de personnes qui se sont installées et ont réussi avec notre accompagnement.",
      disclaimer: "Témoignages illustratifs : les personnes et les récits sont fictifs et les photos ne les représentent pas.",
      homeHeading: "Les histoires de notre communauté",
      readAll: "Lire tous les témoignages",
      resultLabel: "Résultat",
      ctaHeading: "Prêt à écrire votre propre histoire ?",
      ctaDescription: "Parlez-nous de votre projet et nous construirons avec vous un plan étape par étape.",
      ctaButton: "Parler à un conseiller",
      items: {
        "remote-developer": {
          role: "Développeuse freelance · France",
          place: "Phnom Penh",
          service: "Accompagnement visa",
          quote: "Je suis arrivée avec un ordinateur et un visa touristique. KHMERA s'est occupé de mon visa long séjour et m'a trouvé un appartement avec une fibre fiable près de BKK1. J'ai pu travailler avec mes clients européens dès le premier jour.",
          result: "Visa long séjour et appartement en 3 semaines",
        },
        "consulting-founder": {
          role: "Fondateur d'un cabinet de conseil · Allemagne",
          place: "Phnom Penh",
          service: "Création d'entreprise",
          quote: "Créer une société à l'étranger ressemblait à un labyrinthe. Le conseiller KHMERA a géré l'immatriculation, le numéro fiscal et le compte bancaire, en m'expliquant chaque étape simplement.",
          result: "Société immatriculée et premiers clients signés en 2 mois",
        },
        "textile-brand": {
          role: "Cofondatrice d'une marque textile éthique · Cambodge",
          place: "Siem Reap",
          service: "Marché",
          quote: "Grâce au marché, nous avons rencontré des acheteurs français et espagnols attachés à l'ikat fait main. Nos tisserandes ont désormais des commandes régulières toute l'année.",
          result: "4 nouveaux revendeurs à l'international",
        },
        "rice-export": {
          role: "Importateur alimentaire · Espagne",
          place: "Battambang",
          service: "Conseiller local",
          quote: "Je voulais m'approvisionner en riz bio directement auprès des coopératives. KHMERA m'a présenté des partenaires de confiance et m'a aidé pour les formalités d'export et les contrôles qualité.",
          result: "Premier conteneur expédié vers Valence",
        },
        "kep-retirees": {
          role: "Couple de retraités · Royaume-Uni",
          place: "Kep",
          service: "Recherche de logement",
          quote: "Nous rêvions d'un endroit calme au bord de la mer. KHMERA nous a trouvé une maison avec jardin à Kep, a géré nos visas retraite et nous a même recommandé un bon médecin.",
          result: "Installés au bord de la mer en 6 semaines",
        },
        "siem-reap-family": {
          role: "Famille de quatre · République tchèque",
          place: "Siem Reap",
          service: "Installation en famille",
          quote: "Déménager avec deux enfants était notre plus grande inquiétude. KHMERA nous a aidés à choisir une école internationale, à trouver une maison et à déclarer notre petite maison d'hôtes.",
          result: "Enfants scolarisés et maison d'hôtes ouverte en une saison",
        },
      },
    },
    footer: {
      rights: "Conçu pour la vie internationale, les affaires et les voyages.",
    },
    pageTitles: {
      home: "Accueil",
      services: "Services",
      marketplace: "Marché",
      guide: "Guide visa",
      business: "Entreprise",
      testimonials: "Témoignages",
    },
  },
  es: {
    home: {
      nextMove: "Tu próximo destino",
      city: "Nom Pen",
      ready: "Listo para instalarte",
      explore: "Explora según tus necesidades",
      heading: "Todo lo necesario para mudarte con confianza.",
      discover: "Descubrir más",
    },
    services: {
      heading: "Servicios para instalarte y crecer.",
      items: [
        { name: "Asistencia con el visado", detail: "Ayuda para preparar documentos y presentar solicitudes." },
        { name: "Búsqueda de vivienda", detail: "Búsqueda de apartamentos y residencias para familias y equipos." },
        { name: "Creación de empresas", detail: "Asistencia con el registro y el cumplimiento normativo." },
        { name: "Asesor local", detail: "Orientación a demanda para la vida de expatriado y el acceso a servicios." },
      ],
      planHeading: "¿Necesitas un plan a medida?",
      planDescription: "Empieza con una consulta guiada y crea una hoja de ruta personalizada para vivir, trabajar o invertir en Camboya.",
      advisor: "Hablar con un asesor",
    },
    marketplace: {
      heading: "Experiencias locales verificadas y apoyo empresarial.",
      listings: [
        { title: "Alquiler de residencias de alta gama", subtitle: "Centro de Nom Pen • 1200 US$/mes" },
        { title: "Registro de empresas", subtitle: "Asistencia para la constitución • desde 500 US$" },
        { title: "Paquete de traslado familiar", subtitle: "Escuelas, vivienda y logística • presupuesto personalizado" },
        { title: "Traslados privados", subtitle: "Recepción en el aeropuerto y traslados urbanos • desde 25 US$" },
      ],
      details: "Ver detalles",
      descriptions: [
        "Descubre alquileres de apartamentos de alta gama en el centro de Nom Pen. Antes de elegir una vivienda, confirma la duración del contrato, los gastos incluidos, la fianza y las condiciones de visita.",
        "Prepara el registro de tu empresa en Camboya con información sobre los documentos y trámites que debes consultar con un profesional local. Las tasas oficiales y los servicios de terceros deben confirmarse por separado.",
        "Planifica el traslado de tu familia: vivienda, escuelas y logística de llegada. El alcance y el presupuesto dependen del tamaño de tu familia, la zona preferida y la fecha de llegada.",
        "Planifica una recogida en el aeropuerto o un traslado privado por la ciudad. El presupuesto final depende del trayecto, los pasajeros, el equipaje y la hora de recogida.",
      ],
      back: "Volver al catálogo",
      availability: "Estas ofertas son ejemplos. Los precios y la disponibilidad no están confirmados. Las reservas y los pagos aún no están disponibles en este sitio.",
    },
    visa: {
      heading: "Una hoja de ruta práctica para tu traslado a Camboya.",
      steps: [
        "Comprueba tu elegibilidad y el tipo de visado.",
        "Reúne los documentos justificativos y los datos de tu alojamiento.",
        "Presenta la solicitud y consulta su estado.",
        "Completa los trámites de llegada y registro local.",
      ],
    },
    business: {
      heading: "Establece tu actividad en Camboya sobre una base local fiable.",
      pillars: [
        "Constitución de empresas y orientación sobre el marco jurídico",
        "Contabilidad, nóminas y apoyo operativo",
        "Acceso al mercado y contactos con empresas locales",
      ],
    },
    languageNames: {
      en: "Cambiar al inglés",
      fr: "Cambiar al francés",
      es: "Cambiar al español",
      de: "Cambiar al alemán",
    },
    notFound: {
      heading: "Página no encontrada",
      description: "Esta página no está disponible en los idiomas ofrecidos.",
      home: "Volver al inicio",
    },
    site: {
      name: "KHMERA",
      tagline: "Muévete mejor. Construye localmente. Explora más.",
      description:
        "Plataforma internacional para expatriados, emprendedores, viajeros y profesionales que se instalan en Camboya.",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      marketplace: "Mercado",
      guide: "Guía de visado",
      business: "Negocios",
      testimonials: "Testimonios",
      login: "Portal del miembro",
      cta: "Publicar un servicio",
    },
    hero: {
      eyebrow: "Expat • Negocios • Viajes",
      title: "Instálate y crece con confianza en Camboya.",
      description:
        "Encuentra la orientación fiable, servicios locales y oportunidades de negocio que necesitas para mudarte, trabajar y prosperar.",
      primaryCta: "Explorar oportunidades",
      secondaryCta: "Hablar con un asesor",
    },
    stats: [
      { value: "18k+", label: "expatriados guiados" },
      { value: "420+", label: "socios locales verificados" },
      { value: "96%", label: "satisfacción de miembros" },
    ],
    categories: [
      {
        title: "Traslado",
        description: "Visados, vivienda, escuelas y ayuda para recién llegados.",
      },
      {
        title: "Negocios",
        description: "Constitución de empresas, cumplimiento y descubrimiento de oportunidades.",
      },
      {
        title: "Empleo",
        description: "Busca trabajos flexibles y oportunidades locales.",
      },
      {
        title: "Viajes",
        description: "Guías, traslados, excursiones y experiencias locales confiables.",
      },
    ],
    features: [
      {
        title: "Soporte de visa y residencia",
        text: "Sigue requisitos claros con orientación experta y listas de verificación.",
      },
      {
        title: "Mercado de servicios verificados",
        text: "Descubre proveedores locales confiables para necesidades cotidianas y profesionales.",
      },
      {
        title: "Pagos pensados para la vida real",
        text: "Reserva y paga con seguridad usando métodos locales e internacionales.",
      },
    ],
    cta: {
      heading: "¿Listo para establecer tu base en Camboya?",
      description:
        "Ya sea que te mudes, inviertas o viajes, KHMERA te guiará hacia el siguiente paso correcto.",
      button: "Comienza mi plan",
    },
    photos: {
      alt: {
        "angkor-wat-sunrise": "Silueta de Angkor Wat reflejada en un estanque al amanecer",
        "phnom-penh-skyline": "Panorámica de Phnom Penh con tejados de pagodas y torres modernas",
        "royal-palace": "Salón del Trono del Palacio Real de Phnom Penh",
        "pub-street": "Pub Street en Siem Reap iluminada con farolillos por la noche",
        "riverside": "Paseo con palmeras junto al Tonlé Sap en Phnom Penh",
        "tonle-sap": "Mujer remando una barca cargada de verduras en una aldea flotante del Tonlé Sap",
        "central-market": "Montones de naranjas y frutas en el Mercado Central de Phnom Penh",
        "rice-fields": "Arrozales verdes y palmeras de azúcar en el campo camboyano",
        "tuk-tuk": "Tuk-tuk blanco aparcado en una calle de Phnom Penh",
        "street-food": "Bandeja de brochetas de comida callejera camboyana por la noche",
        "nomad-laptop": "Manos escribiendo en el teclado de un portátil",
        "founder-meeting": "Manos de dos personas revisando documentos junto a portátiles",
        "ikat-weaving": "Manos tejiendo un motivo ikat rojo de seda en un telar",
        "rice-planting": "Agricultores con sombrero trasplantando plantones de arroz",
        "kep-sunset": "Silueta de un pescador en su barca bajo un atardecer rojo en Kep",
        "siem-reap-fisherman": "Figura lejana pescando en un estanque verde cerca de Angkor Thom",
      },
      places: {
        "angkor-wat-sunrise": "Angkor Wat, Siem Reap",
        "phnom-penh-skyline": "Phnom Penh",
        "royal-palace": "Palacio Real, Phnom Penh",
        "pub-street": "Pub Street, Siem Reap",
        "riverside": "Muelle Sisowath, Phnom Penh",
        "tonle-sap": "Lago Tonlé Sap",
        "central-market": "Mercado Central, Phnom Penh",
        "rice-fields": "Campo camboyano",
        "tuk-tuk": "Tuk-tuk, Phnom Penh",
        "street-food": "Comida callejera",
        "nomad-laptop": "Trabajo remoto",
        "founder-meeting": "Reunión de negocios",
        "ikat-weaving": "Tejido ikat",
        "rice-planting": "Plantación de arroz",
        "kep-sunset": "Kep",
        "siem-reap-fisherman": "Angkor Thom, Siem Reap",
      },
      galleryEyebrow: "La vida en Camboya",
      galleryHeading: "De los templos de Siem Reap a la ribera de Phnom Penh.",
      galleryDescription: "Un vistazo a la vida cotidiana que descubrirás: mercados, aldeas flotantes, arrozales y noches animadas.",
      creditsLink: "Créditos de las fotos",
      creditsHeading: "Créditos de las fotos",
      creditsDescription: "Todas las fotos son imágenes libres de derechos de Wikimedia Commons, usadas según su licencia: dominio público (CC0) o Creative Commons.",
      author: "Autor: ",
      license: "Licencia: ",
      source: "Ver la fuente",
    },
    testimonials: {
      eyebrow: "Testimonios",
      heading: "Construyeron su vida en Camboya con KHMERA.",
      description: "Freelancers, fundadores, familias y jubilados: historias de personas que se mudaron, se instalaron y prosperaron con nuestro apoyo.",
      disclaimer: "Testimonios ilustrativos: las personas y las historias son ficticias y las fotos no las representan.",
      homeHeading: "Historias de nuestra comunidad",
      readAll: "Leer todos los testimonios",
      resultLabel: "Resultado",
      ctaHeading: "¿Listo para escribir tu propia historia?",
      ctaDescription: "Cuéntanos tu proyecto y crearemos contigo un plan paso a paso.",
      ctaButton: "Hablar con un asesor",
      items: {
        "remote-developer": {
          role: "Desarrolladora freelance · Francia",
          place: "Phnom Penh",
          service: "Apoyo con visados",
          quote: "Llegué con un portátil y un visado de turista. KHMERA tramitó mi visado de larga estancia y me encontró un piso con fibra fiable cerca de BKK1. Pude trabajar con mis clientes europeos desde el primer día.",
          result: "Visado de larga estancia y piso en 3 semanas",
        },
        "consulting-founder": {
          role: "Fundador de una consultora · Alemania",
          place: "Phnom Penh",
          service: "Creación de empresas",
          quote: "Crear una empresa en el extranjero parecía un laberinto. El asesor de KHMERA se encargó del registro, el número fiscal y la cuenta bancaria, y me explicó cada paso con claridad.",
          result: "Empresa registrada y primeros clientes en 2 meses",
        },
        "textile-brand": {
          role: "Cofundadora de una marca textil ética · Camboya",
          place: "Siem Reap",
          service: "Mercado",
          quote: "Gracias al mercado conocimos a compradores de Francia y España que valoran el ikat hecho a mano. Nuestras tejedoras tienen ahora pedidos estables todo el año.",
          result: "4 nuevos distribuidores internacionales",
        },
        "rice-export": {
          role: "Importador de alimentos · España",
          place: "Battambang",
          service: "Asesor local",
          quote: "Quería comprar arroz ecológico directamente a cooperativas. KHMERA me presentó socios de confianza y me ayudó con los trámites de exportación y los controles de calidad.",
          result: "Primer contenedor enviado a Valencia",
        },
        "kep-retirees": {
          role: "Pareja de jubilados · Reino Unido",
          place: "Kep",
          service: "Búsqueda de vivienda",
          quote: "Soñábamos con un lugar tranquilo junto al mar. KHMERA nos encontró una casa con jardín en Kep, gestionó nuestros visados de jubilación e incluso nos recomendó un buen médico.",
          result: "Instalados junto al mar en 6 semanas",
        },
        "siem-reap-family": {
          role: "Familia de cuatro · República Checa",
          place: "Siem Reap",
          service: "Mudanza familiar",
          quote: "Mudarnos con dos niños era nuestra mayor preocupación. KHMERA nos ayudó a elegir un colegio internacional, encontrar casa y registrar nuestra pequeña casa de huéspedes.",
          result: "Niños escolarizados y casa de huéspedes abierta en una temporada",
        },
      },
    },
    footer: {
      rights: "Diseñado para la vida internacional, los negocios y el turismo.",
    },
    pageTitles: {
      home: "Inicio",
      services: "Servicios",
      marketplace: "Mercado",
      guide: "Guía de visado",
      business: "Negocios",
      testimonials: "Testimonios",
    },
  },
  de: {
    home: {
      nextMove: "Ihr nächstes Ziel",
      city: "Phnom Penh",
      ready: "Bereit zum Einleben",
      explore: "Nach Bedarf entdecken",
      heading: "Alles für einen Umzug mit Zuversicht.",
      discover: "Mehr erfahren",
    },
    services: {
      heading: "Dienstleistungen für Ihren Umzug und Ihr Wachstum.",
      items: [
        { name: "Visumunterstützung", detail: "Hilfe bei der Vorbereitung von Unterlagen und der Antragstellung." },
        { name: "Wohnungssuche", detail: "Suche nach Wohnungen und Wohnanlagen für Familien und Teams." },
        { name: "Unternehmensgründung", detail: "Unterstützung bei Registrierung und Einhaltung gesetzlicher Vorgaben." },
        { name: "Lokale Beratung", detail: "Beratung nach Bedarf zum Leben im Ausland und zu lokalen Dienstleistungen." },
      ],
      planHeading: "Benötigen Sie einen individuellen Plan?",
      planDescription: "Beginnen Sie mit einem Beratungsgespräch und erstellen Sie einen persönlichen Fahrplan zum Leben, Arbeiten oder Investieren in Kambodscha.",
      advisor: "Mit einer Beratungsperson sprechen",
    },
    marketplace: {
      heading: "Verifizierte lokale Erlebnisse und Unterstützung für Unternehmen.",
      listings: [
        { title: "Hochwertige Mietwohnungen", subtitle: "Zentrum von Phnom Penh • 1.200 US$/Monat" },
        { title: "Unternehmensregistrierung", subtitle: "Unterstützung bei der Gründung • ab 500 US$" },
        { title: "Umzugspaket für Familien", subtitle: "Schulen, Wohnraum und Logistik • individuelles Angebot" },
        { title: "Private Transfers", subtitle: "Flughafenempfang und Stadtfahrten • ab 25 US$" },
      ],
      details: "Details ansehen",
      descriptions: [
        "Entdecken Sie hochwertige Mietwohnungen im Zentrum von Phnom Penh. Klären Sie vor der Auswahl die Mietdauer, enthaltene Nebenkosten, Kaution und Besichtigungstermine.",
        "Bereiten Sie die Registrierung Ihres Unternehmens in Kambodscha mit Informationen zu Unterlagen und Verwaltungsschritten vor, die Sie mit einer lokalen Fachperson besprechen sollten. Behördliche Gebühren und Leistungen Dritter müssen separat bestätigt werden.",
        "Planen Sie den Umzug Ihrer Familie mit Wohnraum, Schulen und Ankunftslogistik. Umfang und Angebot richten sich nach Familiengröße, gewünschter Wohngegend und Ankunftsdatum.",
        "Planen Sie eine Flughafenabholung oder eine private Stadtfahrt. Das endgültige Angebot hängt von Strecke, Fahrgastzahl, Gepäck und Abholzeit ab.",
      ],
      back: "Zurück zum Katalog",
      availability: "Diese Angebote dienen als Beispiele. Preise und Verfügbarkeit sind nicht bestätigt. Buchungen und Zahlungen sind auf dieser Website noch nicht verfügbar.",
    },
    visa: {
      heading: "Ein praktischer Fahrplan für Ihren Umzug nach Kambodscha.",
      steps: [
        "Prüfen Sie Ihre Voraussetzungen und den passenden Visumtyp.",
        "Sammeln Sie Nachweise und Angaben zu Ihrer Unterkunft.",
        "Reichen Sie den Antrag ein und verfolgen Sie den Bearbeitungsstand.",
        "Erledigen Sie die Ankunftsformalitäten und die lokale Registrierung.",
      ],
    },
    business: {
      heading: "Bauen Sie Ihre Präsenz in Kambodscha auf einer verlässlichen lokalen Grundlage auf.",
      pillars: [
        "Unternehmensgründung und Beratung zum rechtlichen Rahmen",
        "Buchhaltung, Lohnabrechnung und betriebliche Unterstützung",
        "Marktzugang und Kontakte zu lokalen Unternehmen",
      ],
    },
    languageNames: {
      en: "Zu Englisch wechseln",
      fr: "Zu Französisch wechseln",
      es: "Zu Spanisch wechseln",
      de: "Zu Deutsch wechseln",
    },
    notFound: {
      heading: "Seite nicht gefunden",
      description: "Diese Seite ist in den angebotenen Sprachen nicht verfügbar.",
      home: "Zur Startseite",
    },
    site: {
      name: "KHMERA",
      tagline: "Intelligenter bewegen. Lokal bauen. Mehr entdecken.",
      description:
        "Internationale Plattform für Expatriates, Unternehmer, Reisende und Fachleute in Kambodscha.",
    },
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      marketplace: "Marktplatz",
      guide: "Visumguide",
      business: "Geschäft",
      testimonials: "Erfahrungen",
      login: "Mitgliederbereich",
      cta: "Dienst anbieten",
    },
    hero: {
      eyebrow: "Expat • Business • Reisen",
      title: "Wohnort und Geschäft in Kambodscha sicher aufbauen.",
      description:
        "Finden Sie verlässliche Beratung, lokale Dienstleistungen und Geschäftsmöglichkeiten für Ihren Umzug, Ihr Arbeiten und Ihr Leben in Phnom Penh.",
      primaryCta: "Möglichkeiten entdecken",
      secondaryCta: "Mit einem Berater sprechen",
    },
    stats: [
      { value: "18k+", label: "begleitete Expatriates" },
      { value: "420+", label: "verifizierte lokale Partner" },
      { value: "96%", label: "Mitgliederzufriedenheit" },
    ],
    categories: [
      {
        title: "Umzug",
        description: "Visa, Wohnraum, Schulen und Unterstützung für Neuankömmlinge.",
      },
      {
        title: "Geschäft",
        description: "Unternehmensgründung, Compliance und Chancen für Gründer.",
      },
      {
        title: "Jobs",
        description: "Flexible Rollen und lokale Chancen finden.",
      },
      {
        title: "Reisen",
        description: "Guides, Transfers, Touren und vertrauensvolle lokale Erlebnisse.",
      },
    ],
    features: [
      {
        title: "Visa- und Residenzberatung",
        text: "Verstehen Sie Anforderungen mit klaren Checklisten und Expertenhilfe.",
      },
      {
        title: "Verifizierter Dienstleistungsmarkt",
        text: "Entdecken Sie zuverlässige lokale Anbieter für Alltag und Geschäft.",
      },
      {
        title: "Zahlungen für den echten Alltag",
        text: "Buchen und zahlen Sie sicher mit lokalen und internationalen Methoden.",
      },
    ],
    cta: {
      heading: "Bereit, Ihre Basis in Kambodscha zu schaffen?",
      description:
        "Ob Sie umziehen, investieren oder reisen, KHMERA hilft Ihnen, den richtigen nächsten Schritt zu wählen.",
      button: "Plan starten",
    },
    photos: {
      alt: {
        "angkor-wat-sunrise": "Silhouette von Angkor Wat, die sich bei Sonnenaufgang in einem Teich spiegelt",
        "phnom-penh-skyline": "Skyline von Phnom Penh mit Pagodendächern und modernen Hochhäusern",
        "royal-palace": "Thronsaal des Königspalasts in Phnom Penh",
        "pub-street": "Pub Street in Siem Reap, nachts mit Laternen beleuchtet",
        "riverside": "Palmengesäumte Uferpromenade am Tonle Sap in Phnom Penh",
        "tonle-sap": "Frau rudert ein mit Gemüse beladenes Boot in einem schwimmenden Dorf am Tonle Sap",
        "central-market": "Orangen und Obst auf dem Zentralmarkt von Phnom Penh",
        "rice-fields": "Grüne Reisfelder und Zuckerpalmen auf dem kambodschanischen Land",
        "tuk-tuk": "Weißes Tuk-Tuk auf einer Straße in Phnom Penh",
        "street-food": "Tablett mit kambodschanischen Streetfood-Spießen bei Nacht",
        "nomad-laptop": "Hände tippen auf der Tastatur eines Laptops",
        "founder-meeting": "Hände zweier Personen prüfen Unterlagen neben Laptops",
        "ikat-weaving": "Hände weben ein rotes Ikat-Seidenmuster am Webstuhl",
        "rice-planting": "Bäuerinnen und Bauern mit Hüten pflanzen Reissetzlinge",
        "kep-sunset": "Silhouette eines Fischers im Boot unter einem roten Sonnenuntergang in Kep",
        "siem-reap-fisherman": "Ferne Gestalt beim Fischen in einem grünen Teich bei Angkor Thom",
      },
      places: {
        "angkor-wat-sunrise": "Angkor Wat, Siem Reap",
        "phnom-penh-skyline": "Phnom Penh",
        "royal-palace": "Königspalast, Phnom Penh",
        "pub-street": "Pub Street, Siem Reap",
        "riverside": "Sisowath-Kai, Phnom Penh",
        "tonle-sap": "Tonle-Sap-See",
        "central-market": "Zentralmarkt, Phnom Penh",
        "rice-fields": "Kambodschanisches Land",
        "tuk-tuk": "Tuk-Tuk, Phnom Penh",
        "street-food": "Streetfood",
        "nomad-laptop": "Remote-Arbeit",
        "founder-meeting": "Geschäftstermin",
        "ikat-weaving": "Ikat-Weberei",
        "rice-planting": "Reispflanzung",
        "kep-sunset": "Kep",
        "siem-reap-fisherman": "Angkor Thom, Siem Reap",
      },
      galleryEyebrow: "Leben in Kambodscha",
      galleryHeading: "Von den Tempeln Siem Reaps bis zum Flussufer von Phnom Penh.",
      galleryDescription: "Ein Einblick in den Alltag, der Sie erwartet: Märkte, schwimmende Dörfer, Reisfelder und lebhafte Nächte.",
      creditsLink: "Bildnachweis",
      creditsHeading: "Bildnachweis",
      creditsDescription: "Alle Fotos sind lizenzfreie Bilder von Wikimedia Commons und werden gemäß ihrer jeweiligen Lizenz verwendet: gemeinfrei (CC0) oder Creative Commons.",
      author: "Urheber: ",
      license: "Lizenz: ",
      source: "Quelle ansehen",
    },
    testimonials: {
      eyebrow: "Erfahrungsberichte",
      heading: "Sie haben sich mit KHMERA ein Leben in Kambodscha aufgebaut.",
      description: "Freelancer, Gründer, Familien und Ruheständler: Geschichten von Menschen, die mit unserer Unterstützung umgezogen sind, sich eingelebt haben und erfolgreich wurden.",
      disclaimer: "Illustrative Erfahrungsberichte: Personen und Geschichten sind fiktiv, die Fotos zeigen nicht diese Personen.",
      homeHeading: "Geschichten aus unserer Community",
      readAll: "Alle Erfahrungsberichte lesen",
      resultLabel: "Ergebnis",
      ctaHeading: "Bereit, Ihre eigene Geschichte zu schreiben?",
      ctaDescription: "Erzählen Sie uns von Ihrem Vorhaben und wir erstellen gemeinsam einen Schritt-für-Schritt-Plan.",
      ctaButton: "Mit einem Berater sprechen",
      items: {
        "remote-developer": {
          role: "Freiberufliche Entwicklerin · Frankreich",
          place: "Phnom Penh",
          service: "Visa-Unterstützung",
          quote: "Ich kam mit einem Laptop und einem Touristenvisum. KHMERA hat mein Langzeitvisum erledigt und mir eine Wohnung mit stabilem Glasfaseranschluss nahe BKK1 gefunden. Ab dem ersten Tag konnte ich für meine europäischen Kunden arbeiten.",
          result: "Langzeitvisum und Wohnung in 3 Wochen",
        },
        "consulting-founder": {
          role: "Gründer einer Beratungsfirma · Deutschland",
          place: "Phnom Penh",
          service: "Firmengründung",
          quote: "Eine Firma im Ausland zu gründen wirkte wie ein Labyrinth. Der KHMERA-Berater übernahm Registrierung, Steuernummer und Bankkonto und erklärte jeden Schritt verständlich.",
          result: "Firma registriert und erste Kunden in 2 Monaten",
        },
        "textile-brand": {
          role: "Mitgründerin einer fairen Textilmarke · Kambodscha",
          place: "Siem Reap",
          service: "Marktplatz",
          quote: "Über den Marktplatz haben wir Einkäufer aus Frankreich und Spanien kennengelernt, die handgewebtes Ikat schätzen. Unsere Weberinnen haben jetzt das ganze Jahr über feste Aufträge.",
          result: "4 neue internationale Händler",
        },
        "rice-export": {
          role: "Lebensmittelimporteur · Spanien",
          place: "Battambang",
          service: "Lokaler Berater",
          quote: "Ich wollte Bio-Reis direkt bei Kooperativen einkaufen. KHMERA hat mich mit verlässlichen Partnern bekannt gemacht und bei Exportpapieren und Qualitätskontrollen geholfen.",
          result: "Erster Container nach Valencia verschifft",
        },
        "kep-retirees": {
          role: "Rentnerpaar · Vereinigtes Königreich",
          place: "Kep",
          service: "Wohnungssuche",
          quote: "Wir träumten von einem ruhigen Ort am Meer. KHMERA fand für uns ein Haus mit Garten in Kep, kümmerte sich um unsere Rentnervisa und empfahl uns sogar einen guten Arzt.",
          result: "In 6 Wochen am Meer angekommen",
        },
        "siem-reap-family": {
          role: "Vierköpfige Familie · Tschechien",
          place: "Siem Reap",
          service: "Familienumzug",
          quote: "Mit zwei Kindern umzuziehen war unsere größte Sorge. KHMERA half uns, eine internationale Schule zu wählen, ein Zuhause zu finden und unser kleines Gästehaus anzumelden.",
          result: "Kinder eingeschult und Gästehaus in einer Saison eröffnet",
        },
      },
    },
    footer: {
      rights: "Entwickelt für internationales Leben, Business und Reisen.",
    },
    pageTitles: {
      home: "Startseite",
      services: "Dienstleistungen",
      marketplace: "Marktplatz",
      guide: "Visumguide",
      business: "Geschäft",
      testimonials: "Erfahrungsberichte",
    },
  },
};

export type Messages = Dictionary;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: string): Messages {
  const normalized = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[normalized];
}
