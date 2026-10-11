import type { PhotoId } from "./photos";

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
  pageTitles: {
    home: string;
    services: string;
    marketplace: string;
    guide: string;
    business: string;
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
    footer: {
      rights: "Built for international living, business and travel.",
    },
    pageTitles: {
      home: "Home",
      services: "Services",
      marketplace: "Marketplace",
      guide: "Visa guide",
      business: "Business",
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
    footer: {
      rights: "Conçu pour la vie internationale, les affaires et les voyages.",
    },
    pageTitles: {
      home: "Accueil",
      services: "Services",
      marketplace: "Marché",
      guide: "Guide visa",
      business: "Entreprise",
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
    footer: {
      rights: "Diseñado para la vida internacional, los negocios y el turismo.",
    },
    pageTitles: {
      home: "Inicio",
      services: "Servicios",
      marketplace: "Mercado",
      guide: "Guía de visado",
      business: "Negocios",
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
    footer: {
      rights: "Entwickelt für internationales Leben, Business und Reisen.",
    },
    pageTitles: {
      home: "Startseite",
      services: "Dienstleistungen",
      marketplace: "Marktplatz",
      guide: "Visumguide",
      business: "Geschäft",
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
