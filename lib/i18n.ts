import type { PhotoId } from "./photos";
import type { TestimonialId } from "./testimonials";
import type { OfferSlug } from "./services/offers";

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
  seo: {
    home: { title: string; description: string };
    services: { title: string; description: string };
    guide: { title: string; description: string };
    business: { title: string; description: string };
    marketplace: { title: string; description: string };
    testimonials: { title: string; description: string };
    credits: { title: string; description: string };
  };
  commerce: {
    email: {
      greeting: string;
      introduction: string;
      offer: string;
      price: string;
      preferredDate: string;
      language: string;
      languageName: string;
      closing: string;
      subjectLabel: string;
    };
    eyebrow: string;
    heading: string;
    description: string;
    pricingNote: string;
    quoteLabel: string;
    exclusions: string;
    request: string;
    included: string;
    processHeading: string;
    steps: string[];
    back: string;
    offers: Record<OfferSlug, { name: string; audience: string; summary: string; includes: string[] }>;
    form: {
      heading: string;
      explanation: string;
      name: string;
      email: string;
      city: string;
      date: string;
      project: string;
      consent: string;
      privacy: string;
      prepare: string;
      draftHeading: string;
      draftNotice: string;
      openEmail: string;
      fallback: string;
      subject: string;
    };
  };
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
    seo: {
      home: { title: "Cambodia relocation, business & travel planning", description: "Prepare your move, business project or discovery trip in Cambodia with KHMERA. Explore guidance packages for Phnom Penh, Siem Reap and beyond." },
      services: { title: "Cambodia guidance packages & prices", description: "Compare KHMERA's Cambodia diagnostic, relocation, business and discovery trip packages. Clear fees, personalised plans and requests subject to a written quote." },
      guide: { title: "Cambodia visa guide: preparing your move", description: "Plan your Cambodia visa preparation: identify your visa type, collect documents and review arrival steps. Explore KHMERA's relocation guidance." },
      business: { title: "Preparing a business project in Cambodia", description: "Prepare your Cambodia business project with a personalised launch plan. Review your budget and questions to validate with local professionals." },
      marketplace: { title: "Cambodia marketplace: illustrative listings", description: "Explore example housing, business, relocation and transport listings in Cambodia. These illustrative offers cannot be booked on KHMERA." },
      testimonials: { title: "Illustrative Cambodia journeys", description: "Read fictional examples of relocation, business and travel journeys with KHMERA. These scenarios are illustrations, not verified customer reviews." },
      credits: { title: "Cambodia photos: sources & licence credits", description: "Find the authors, sources and Creative Commons licences for the Cambodia photos used by KHMERA, from Phnom Penh to Siem Reap." },
    },
    commerce: {
      email: {
        greeting: "Hello KHMERA,",
        introduction: "I would like to request a written quote for the following package. Please confirm availability and the next steps.",
        offer: "Requested package",
        price: "Proposed fee (USD)",
        preferredDate: "Preferred date",
        language: "Preferred reply language",
        languageName: "English",
        closing: "Thank you. I look forward to your reply.",
        subjectLabel: "Email subject",
      },
      eyebrow: "KHMERA launch packages",
      heading: "A clear service. A clear price. Your Cambodia project.",
      description: "Choose practical guidance for exploring Cambodia, planning your move or preparing a business. Phnom Penh, Siem Reap and beyond: start with remote consultations and a personalised written plan.",
      pricingNote: "Proposed launch fees in USD, subject to a written quote. Availability, schedule, any applicable taxes and the final amount are confirmed before booking. No online payment or automatic reservation.",
      quoteLabel: "Subject to a quote",
      exclusions: "Guidance fees only. Visa and government fees, rent, flights, transport, accommodation, guides, admission tickets and third-party professionals are not included. Travellers make and pay for their own travel bookings. No visa approval, company registration or investment outcome is guaranteed. This is not legal or tax advice.",
      request: "Request this package",
      included: "What is included",
      processHeading: "From your request to your service",
      steps: ["Choose a package and prepare your request.", "Send the email; KHMERA discusses your needs and sends a written quote.", "Accept the quote and agree on payment and appointment arrangements before the service starts."],
      back: "Compare all packages",
      offers: {
        "cambodia-diagnostic": { name: "Cambodia diagnostic", audience: "Travellers and first-time arrivals", summary: "Clarify your plans before committing to a trip or a move.", includes: ["One 45-minute remote consultation", "Review of your goals, destination and budget", "A personalised written roadmap after the call"] },
        "settle-in": { name: "Settle in with confidence", audience: "Individuals, couples and families", summary: "Structure your relocation without committing blindly to housing or administrative steps.", includes: ["Two 45-minute remote consultations", "A personalised housing, budget and arrival checklist", "A written relocation plan and review at the second meeting"] },
        "business-launch": { name: "Business project", audience: "Founders and independent professionals", summary: "Prepare your launch and identify questions to validate with qualified local professionals.", includes: ["Three 45-minute remote consultations", "Review of your idea, startup budget and operational needs", "A written launch plan with administrative questions to verify"] },
        "discovery-trip": { name: "Discovery trip", audience: "Solo travellers, couples and families", summary: "Prepare a Cambodia discovery trip around your dates, interests and pace: Phnom Penh, Siem Reap, Angkor and your chosen stops. Trip planning only, not a booked tour.", includes: ["One 45-minute remote consultation about your travel plans", "A personalised written itinerary with sightseeing suggestions and travel times between stops", "An estimated trip budget and a departure checklist; you book and pay for travel services yourself"] },
      },
      form: {
        heading: "Prepare your booking request",
        explanation: "This form prepares an email, not a confirmed booking. You send it from your own mail app; KHMERA confirms the scope and quote with you.",
        name: "Full name", email: "Your email", city: "Destination or city", date: "Preferred date (optional)", project: "Your project and expectations",
        consent: "I understand the proposed fee and exclusions, and agree to send these details to KHMERA for a response to my request.",
        privacy: "Nothing is saved to a database or sent automatically. Only the email you choose to send shares your details with KHMERA. Do not include passports, banking details or other sensitive documents.",
        prepare: "Prepare my email", draftHeading: "Email ready to send", draftNotice: "Your request has NOT been sent. Open your mail app and send the email to submit it. No booking or payment is confirmed.",
        openEmail: "Open my mail app", fallback: "No mail app configured? Copy this text into your email and send it to:", subject: "KHMERA booking request",
      },
    },
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
      cta: "View packages",
    },
    hero: {
      eyebrow: "Expat • Business • Travel",
      title: "Settle and grow with confidence in Cambodia.",
      description:
        "Find the trusted guidance, local services and business opportunities you need to move, work and thrive in Phnom Penh and beyond.",
      primaryCta: "Compare packages and prices",
      secondaryCta: "Speak with an advisor",
    },
    stats: [
      { value: "$49", label: "Cambodia diagnostic" },
      { value: "$249", label: "Relocation guidance" },
      { value: "$399", label: "Business planning" },
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
    seo: {
      home: { title: "Cambodge : installation, business et préparation de voyage", description: "Préparez votre installation, votre projet business ou votre voyage au Cambodge avec KHMERA. Découvrez nos offres pour Phnom Penh, Siem Reap et ailleurs." },
      services: { title: "Accompagnement au Cambodge : offres et tarifs", description: "Comparez les offres KHMERA : diagnostic, installation, projet business et voyage découverte. Tarifs clairs et plans personnalisés, sous réserve de devis." },
      guide: { title: "Guide visa Cambodge : préparer son installation", description: "Préparez vos démarches de visa au Cambodge : type de visa, documents et étapes d'arrivée. Découvrez l'accompagnement à l'installation de KHMERA." },
      business: { title: "Préparer un projet d'entreprise au Cambodge", description: "Préparez votre projet business au Cambodge avec un plan de lancement personnalisé : budget, besoins et points à valider avec des professionnels locaux." },
      marketplace: { title: "Marché Cambodge : annonces illustratives", description: "Découvrez des exemples d'offres de logement, création d'entreprise, installation et transport au Cambodge. Ces annonces ne sont pas réservables sur KHMERA." },
      testimonials: { title: "Exemples fictifs de parcours au Cambodge", description: "Découvrez des récits fictifs d'installation, de business et de voyage avec KHMERA. Ces illustrations ne sont pas des avis clients vérifiés." },
      credits: { title: "Photos du Cambodge : sources et crédits", description: "Retrouvez les auteurs, sources et licences Creative Commons des photos du Cambodge utilisées par KHMERA, de Phnom Penh à Siem Reap." },
    },
    commerce: {
      email: {
        greeting: "Bonjour KHMERA,",
        introduction: "Je souhaite recevoir un devis écrit pour l'offre suivante. Merci de me confirmer les disponibilités et les prochaines étapes.",
        offer: "Offre demandée",
        price: "Honoraires proposés (USD)",
        preferredDate: "Date souhaitée",
        language: "Langue de réponse souhaitée",
        languageName: "Français",
        closing: "Merci, dans l'attente de votre réponse.",
        subjectLabel: "Objet de l'e-mail",
      },
      eyebrow: "Les offres de lancement KHMERA",
      heading: "Une prestation claire. Un prix clair. Votre projet au Cambodge.",
      description: "Choisissez un accompagnement concret pour découvrir le Cambodge, préparer votre installation ou lancer votre activité. Phnom Penh, Siem Reap et ailleurs : commencez par des rendez-vous à distance et un plan écrit personnalisé.",
      pricingNote: "Honoraires de lancement proposés en dollars américains, sous réserve d'un devis écrit. Disponibilité, calendrier, taxes éventuelles et montant final sont confirmés avant réservation. Aucun paiement en ligne ni réservation automatique.",
      quoteLabel: "Sous réserve de devis",
      exclusions: "Honoraires d'accompagnement uniquement. Frais de visa et administratifs, loyers, vols, transports, hébergement, guides, entrées et professionnels tiers non inclus. Le voyageur effectue et règle lui-même ses réservations de voyage. Aucun visa, enregistrement de société ni résultat d'investissement garanti. Ce service ne constitue pas un conseil juridique ou fiscal.",
      request: "Demander cette offre",
      included: "Ce qui est inclus",
      processHeading: "De votre demande à votre accompagnement",
      steps: ["Choisissez une offre et préparez votre demande.", "Envoyez l'e-mail ; KHMERA échange avec vous et vous transmet un devis écrit.", "Acceptez le devis et convenez du paiement et des rendez-vous avant le début de la prestation."],
      back: "Comparer toutes les offres",
      offers: {
        "cambodia-diagnostic": { name: "Diagnostic Cambodge", audience: "Voyageurs et futurs arrivants", summary: "Clarifiez votre projet avant de vous engager dans un séjour ou une installation.", includes: ["Un rendez-vous de 45 minutes à distance", "Un bilan de vos objectifs, de votre destination et de votre budget", "Une feuille de route écrite personnalisée après l'appel"] },
        "settle-in": { name: "Installation sereine", audience: "Personnes seules, couples et familles", summary: "Organisez votre installation sans vous engager à l'aveugle dans un logement ou des démarches.", includes: ["Deux rendez-vous de 45 minutes à distance", "Une checklist personnalisée : logement, budget et arrivée", "Un plan d'installation écrit et un bilan au second rendez-vous"] },
        "business-launch": { name: "Projet business", audience: "Entrepreneurs et indépendants", summary: "Préparez votre lancement et identifiez les points à valider avec des professionnels locaux qualifiés.", includes: ["Trois rendez-vous de 45 minutes à distance", "Un bilan de votre idée, du budget de lancement et des besoins opérationnels", "Un plan de lancement écrit avec les questions administratives à vérifier"] },
        "discovery-trip": { name: "Voyage découverte", audience: "Voyageurs seuls, couples et familles", summary: "Préparez un voyage découverte au Cambodge selon vos dates, vos envies et votre rythme : Phnom Penh, Siem Reap, Angkor et les étapes de votre choix. Une préparation de voyage, pas un circuit réservé.", includes: ["Un rendez-vous de 45 minutes à distance pour définir votre projet de voyage", "Un itinéraire écrit personnalisé avec suggestions de visites et temps de trajet entre les étapes", "Un budget prévisionnel et une checklist de départ ; vous réservez et réglez vous-même les prestations de voyage"] },
      },
      form: {
        heading: "Préparer votre demande de réservation",
        explanation: "Ce formulaire prépare un e-mail, pas une réservation confirmée. Vous l'envoyez depuis votre messagerie ; KHMERA confirme avec vous le périmètre et le devis.",
        name: "Nom complet", email: "Votre e-mail", city: "Destination ou ville", date: "Date souhaitée (facultative)", project: "Votre projet et vos attentes",
        consent: "Je comprends le tarif proposé et les exclusions, et j'accepte de transmettre ces informations à KHMERA pour obtenir une réponse à ma demande.",
        privacy: "Rien n'est enregistré en base de données ni envoyé automatiquement. Seul l'e-mail que vous choisissez d'envoyer transmet vos coordonnées à KHMERA. N'incluez pas de passeport, coordonnées bancaires ou documents sensibles.",
        prepare: "Préparer mon e-mail", draftHeading: "E-mail prêt à envoyer", draftNotice: "Votre demande n'a PAS été envoyée. Ouvrez votre messagerie et envoyez l'e-mail pour la transmettre. Aucune réservation ni aucun paiement n'est confirmé.",
        openEmail: "Ouvrir ma messagerie", fallback: "Pas de messagerie configurée ? Copiez ce texte dans un e-mail et envoyez-le à :", subject: "Demande de réservation KHMERA",
      },
    },
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
      cta: "Voir les offres",
    },
    hero: {
      eyebrow: "Expatriation • Affaires • Voyages",
      title: "Installez-vous et développez-vous sereinement au Cambodge.",
      description:
        "Trouvez les bons conseils, services locaux et opportunités professionnelles pour vivre, travailler et réussir à Phnom Penh et ailleurs.",
      primaryCta: "Comparer les offres et les tarifs",
      secondaryCta: "Parler à un conseiller",
    },
    stats: [
      { value: "49 $", label: "Diagnostic Cambodge" },
      { value: "249 $", label: "Accompagnement installation" },
      { value: "399 $", label: "Préparation business" },
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
    seo: {
      home: { title: "Camboya: traslado, negocios y planificación de viajes", description: "Prepara tu traslado, proyecto empresarial o viaje a Camboya con KHMERA. Descubre paquetes de orientación para Phnom Penh, Siem Reap y otros destinos." },
      services: { title: "Orientación en Camboya: paquetes y precios", description: "Compara los paquetes KHMERA de diagnóstico, traslado, negocios y viaje de descubrimiento. Precios claros y planes personalizados, sujetos a presupuesto." },
      guide: { title: "Guía de visado de Camboya: preparar tu traslado", description: "Prepara los trámites de visado de Camboya: tipo de visado, documentos y pasos de llegada. Descubre la orientación de KHMERA para instalarte." },
      business: { title: "Preparar un proyecto empresarial en Camboya", description: "Prepara tu negocio en Camboya con un plan de lanzamiento personalizado: presupuesto, necesidades y cuestiones para validar con profesionales locales." },
      marketplace: { title: "Mercado de Camboya: anuncios ilustrativos", description: "Descubre ejemplos de vivienda, negocios, traslado y transporte en Camboya. Estas ofertas ilustrativas no se pueden reservar en KHMERA." },
      testimonials: { title: "Historias ficticias de proyectos en Camboya", description: "Lee ejemplos ficticios de traslado, negocios y viajes con KHMERA. Son ilustraciones, no opiniones verificadas de clientes." },
      credits: { title: "Fotos de Camboya: fuentes y licencias", description: "Consulta autores, fuentes y licencias Creative Commons de las fotos de Camboya utilizadas por KHMERA, desde Phnom Penh hasta Siem Reap." },
    },
    commerce: {
      email: {
        greeting: "Hola KHMERA:",
        introduction: "Me gustaría recibir un presupuesto escrito para el siguiente paquete. Por favor, confirmen la disponibilidad y los próximos pasos.",
        offer: "Paquete solicitado",
        price: "Honorarios propuestos (USD)",
        preferredDate: "Fecha preferida",
        language: "Idioma preferido para la respuesta",
        languageName: "Español",
        closing: "Gracias. Quedo a la espera de su respuesta.",
        subjectLabel: "Asunto del correo",
      },
      eyebrow: "Paquetes de lanzamiento KHMERA",
      heading: "Un servicio claro. Un precio claro. Tu proyecto en Camboya.",
      description: "Elige orientación práctica para descubrir Camboya, organizar tu traslado o preparar un negocio. Phnom Penh, Siem Reap y más allá: empieza con consultas a distancia y un plan escrito personalizado.",
      pricingNote: "Honorarios de lanzamiento propuestos en dólares estadounidenses, sujetos a un presupuesto escrito. Disponibilidad, calendario, posibles impuestos e importe final se confirman antes de reservar. Sin pago en línea ni reserva automática.",
      quoteLabel: "Sujeto a presupuesto",
      exclusions: "Solo honorarios de orientación. No incluyen visados, tasas oficiales, alquileres, vuelos, transporte, alojamiento, guías, entradas ni profesionales externos. El viajero realiza y paga sus propias reservas de viaje. No se garantiza ningún visado, registro de empresa ni resultado de inversión. No es asesoramiento jurídico ni fiscal.",
      request: "Solicitar este paquete",
      included: "Qué incluye",
      processHeading: "De tu solicitud al servicio",
      steps: ["Elige un paquete y prepara tu solicitud.", "Envía el correo; KHMERA analiza tus necesidades y envía un presupuesto escrito.", "Acepta el presupuesto y acuerda el pago y las citas antes de comenzar el servicio."],
      back: "Comparar todos los paquetes",
      offers: {
        "cambodia-diagnostic": { name: "Diagnóstico Camboya", audience: "Viajeros y futuros residentes", summary: "Aclara tus planes antes de comprometerte con un viaje o un traslado.", includes: ["Una consulta de 45 minutos a distancia", "Revisión de tus objetivos, destino y presupuesto", "Una hoja de ruta escrita personalizada después de la llamada"] },
        "settle-in": { name: "Instalación tranquila", audience: "Personas, parejas y familias", summary: "Organiza tu instalación antes de comprometerte con una vivienda o trámites.", includes: ["Dos consultas de 45 minutos a distancia", "Lista personalizada de vivienda, presupuesto y llegada", "Un plan escrito de instalación y revisión en la segunda cita"] },
        "business-launch": { name: "Proyecto empresarial", audience: "Emprendedores y autónomos", summary: "Prepara tu lanzamiento e identifica los puntos a validar con profesionales locales cualificados.", includes: ["Tres consultas de 45 minutos a distancia", "Revisión de tu idea, presupuesto inicial y necesidades operativas", "Un plan escrito de lanzamiento con cuestiones administrativas a verificar"] },
        "discovery-trip": { name: "Viaje de descubrimiento", audience: "Viajeros solos, parejas y familias", summary: "Prepara un viaje para descubrir Camboya según tus fechas, intereses y ritmo: Phnom Penh, Siem Reap, Angkor y las etapas que elijas. Es planificación de viaje, no un circuito reservado.", includes: ["Una consulta de 45 minutos a distancia sobre tu proyecto de viaje", "Un itinerario escrito personalizado con sugerencias de visitas y tiempos de traslado entre etapas", "Un presupuesto estimado y una lista para la salida; tú reservas y pagas los servicios de viaje"] },
      },
      form: {
        heading: "Prepara tu solicitud de reserva",
        explanation: "Este formulario prepara un correo, no una reserva confirmada. Lo envías desde tu aplicación de correo; KHMERA confirma contigo el alcance y el presupuesto.",
        name: "Nombre completo", email: "Tu correo electrónico", city: "Destino o ciudad", date: "Fecha preferida (opcional)", project: "Tu proyecto y expectativas",
        consent: "Entiendo el precio propuesto y las exclusiones, y acepto enviar estos datos a KHMERA para recibir una respuesta a mi solicitud.",
        privacy: "Nada se guarda en una base de datos ni se envía automáticamente. Solo el correo que decidas enviar comparte tus datos con KHMERA. No incluyas pasaportes, datos bancarios ni documentos sensibles.",
        prepare: "Preparar mi correo", draftHeading: "Correo listo para enviar", draftNotice: "Tu solicitud NO se ha enviado. Abre tu aplicación de correo y envíalo para transmitirla. No hay reserva ni pago confirmado.",
        openEmail: "Abrir mi correo", fallback: "¿No tienes aplicación de correo? Copia este texto en un correo y envíalo a:", subject: "Solicitud de reserva KHMERA",
      },
    },
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
      cta: "Ver paquetes",
    },
    hero: {
      eyebrow: "Expat • Negocios • Viajes",
      title: "Instálate y crece con confianza en Camboya.",
      description:
        "Encuentra la orientación fiable, servicios locales y oportunidades de negocio que necesitas para mudarte, trabajar y prosperar.",
      primaryCta: "Comparar paquetes y precios",
      secondaryCta: "Hablar con un asesor",
    },
    stats: [
      { value: "49 US$", label: "Diagnóstico Camboya" },
      { value: "249 US$", label: "Orientación para instalarse" },
      { value: "399 US$", label: "Planificación empresarial" },
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
    seo: {
      home: { title: "Kambodscha: Umzug, Geschäft und Reiseplanung", description: "Bereiten Sie Ihren Umzug, Ihr Geschäftsprojekt oder Ihre Reise nach Kambodscha mit KHMERA vor. Beratungspakete für Phnom Penh, Siem Reap und weitere Ziele." },
      services: { title: "Kambodscha-Beratung: Pakete und Preise", description: "Vergleichen Sie KHMERA-Pakete für Erstberatung, Umzug, Geschäftsprojekt und Entdeckungsreise. Klare Honorare und persönliche Pläne, vorbehaltlich Angebot." },
      guide: { title: "Kambodscha-Visumguide: Umzug vorbereiten", description: "Planen Sie Ihre Visumvorbereitung für Kambodscha: Visumtyp, Unterlagen und Ankunftsschritte. Entdecken Sie die Umzugsbegleitung von KHMERA." },
      business: { title: "Ein Geschäftsprojekt in Kambodscha vorbereiten", description: "Bereiten Sie Ihr Geschäftsprojekt in Kambodscha mit einem persönlichen Startplan vor: Budget, Bedarf und Fragen für qualifizierte Fachleute vor Ort." },
      marketplace: { title: "Kambodscha-Marktplatz: Beispielangebote", description: "Entdecken Sie Beispielangebote für Wohnung, Geschäft, Umzug und Transport in Kambodscha. Diese Angebote sind bei KHMERA nicht buchbar." },
      testimonials: { title: "Fiktive Projektgeschichten aus Kambodscha", description: "Lesen Sie fiktive Beispiele für Umzug, Geschäft und Reisen mit KHMERA. Diese Illustrationen sind keine verifizierten Kundenbewertungen." },
      credits: { title: "Kambodscha-Fotos: Quellen und Bildnachweise", description: "Hier finden Sie Urheber, Quellen und Creative-Commons-Lizenzen der Kambodscha-Fotos bei KHMERA, von Phnom Penh bis Siem Reap." },
    },
    commerce: {
      email: {
        greeting: "Guten Tag KHMERA,",
        introduction: "Ich möchte ein schriftliches Angebot für das folgende Paket erhalten. Bitte bestätigen Sie die Verfügbarkeit und die nächsten Schritte.",
        offer: "Angefragtes Paket",
        price: "Vorgeschlagenes Honorar (USD)",
        preferredDate: "Wunschtermin",
        language: "Gewünschte Antwortsprache",
        languageName: "Deutsch",
        closing: "Vielen Dank. Ich freue mich auf Ihre Antwort.",
        subjectLabel: "E-Mail-Betreff",
      },
      eyebrow: "KHMERA Einführungspakete",
      heading: "Klare Leistung. Klarer Preis. Ihr Kambodscha-Projekt.",
      description: "Wählen Sie praktische Orientierung für Ihre Reise, Ihren Umzug oder die Vorbereitung einer Geschäftsidee. Phnom Penh, Siem Reap und darüber hinaus: beginnen Sie mit Online-Gesprächen und einem persönlichen schriftlichen Plan.",
      pricingNote: "Vorgeschlagene Einführungshonorare in US-Dollar, vorbehaltlich eines schriftlichen Angebots. Verfügbarkeit, Termine, mögliche Steuern und Endbetrag werden vor der Buchung bestätigt. Keine Online-Zahlung oder automatische Reservierung.",
      quoteLabel: "Vorbehaltlich eines Angebots",
      exclusions: "Nur Beratungshonorare. Visa- und Behördengebühren, Miete, Flüge, Transport, Unterkunft, Reiseführer, Eintrittskarten und externe Fachleute sind nicht enthalten. Reisende buchen und bezahlen ihre Reiseleistungen selbst. Keine Garantie für Visa, Firmeneintragung oder Investitionsergebnisse. Keine Rechts- oder Steuerberatung.",
      request: "Dieses Paket anfragen",
      included: "Enthaltene Leistungen",
      processHeading: "Von Ihrer Anfrage zur Begleitung",
      steps: ["Wählen Sie ein Paket und bereiten Sie Ihre Anfrage vor.", "Senden Sie die E-Mail; KHMERA bespricht Ihren Bedarf und erstellt ein schriftliches Angebot.", "Nehmen Sie das Angebot an und vereinbaren Sie Zahlung und Termine vor Leistungsbeginn."],
      back: "Alle Pakete vergleichen",
      offers: {
        "cambodia-diagnostic": { name: "Kambodscha-Erstberatung", audience: "Reisende und künftige Neuankömmlinge", summary: "Klären Sie Ihre Pläne, bevor Sie eine Reise oder einen Umzug verbindlich planen.", includes: ["Ein Online-Gespräch von 45 Minuten", "Besprechung Ihrer Ziele, Ihres Reiseziels und Budgets", "Ein persönlicher schriftlicher Fahrplan nach dem Gespräch"] },
        "settle-in": { name: "Entspannt ankommen", audience: "Einzelpersonen, Paare und Familien", summary: "Planen Sie Ihren Umzug, bevor Sie sich auf eine Wohnung oder Behördenschritte festlegen.", includes: ["Zwei Online-Gespräche von je 45 Minuten", "Persönliche Checkliste für Wohnung, Budget und Ankunft", "Ein schriftlicher Umzugsplan und Auswertung im zweiten Gespräch"] },
        "business-launch": { name: "Geschäftsprojekt", audience: "Gründer und Selbstständige", summary: "Bereiten Sie Ihren Start vor und erkennen Sie Fragen für qualifizierte Fachleute vor Ort.", includes: ["Drei Online-Gespräche von je 45 Minuten", "Besprechung Ihrer Idee, Ihres Startbudgets und Betriebsbedarfs", "Ein schriftlicher Startplan mit zu prüfenden Behördenfragen"] },
        "discovery-trip": { name: "Entdeckungsreise", audience: "Alleinreisende, Paare und Familien", summary: "Planen Sie Ihre Kambodscha-Entdeckungsreise nach Ihren Terminen, Interessen und Ihrem Tempo: Phnom Penh, Siem Reap, Angkor und Ihre Wunschziele. Reisevorbereitung, keine gebuchte Rundreise.", includes: ["Ein Online-Gespräch von 45 Minuten über Ihre Reisepläne", "Eine persönliche schriftliche Reiseroute mit Besichtigungsvorschlägen und Fahrtzeiten zwischen den Etappen", "Ein geschätztes Reisebudget und eine Abreise-Checkliste; Reiseleistungen buchen und bezahlen Sie selbst"] },
      },
      form: {
        heading: "Buchungsanfrage vorbereiten",
        explanation: "Dieses Formular erstellt eine E-Mail, keine bestätigte Buchung. Sie senden sie über Ihr E-Mail-Programm; KHMERA bestätigt Leistungsumfang und Angebot mit Ihnen.",
        name: "Vollständiger Name", email: "Ihre E-Mail-Adresse", city: "Ziel oder Stadt", date: "Wunschtermin (optional)", project: "Ihr Projekt und Ihre Erwartungen",
        consent: "Ich verstehe das vorgeschlagene Honorar und die Ausschlüsse und möchte diese Angaben für eine Antwort auf meine Anfrage an KHMERA senden.",
        privacy: "Nichts wird in einer Datenbank gespeichert oder automatisch versendet. Nur Ihre bewusst gesendete E-Mail übermittelt Ihre Angaben an KHMERA. Bitte keine Pässe, Bankdaten oder vertraulichen Dokumente angeben.",
        prepare: "E-Mail vorbereiten", draftHeading: "E-Mail zum Versenden bereit", draftNotice: "Ihre Anfrage wurde NICHT gesendet. Öffnen Sie Ihr E-Mail-Programm und senden Sie die Nachricht. Keine Buchung oder Zahlung ist bestätigt.",
        openEmail: "E-Mail-Programm öffnen", fallback: "Kein E-Mail-Programm eingerichtet? Kopieren Sie diesen Text in eine E-Mail und senden Sie ihn an:", subject: "KHMERA Buchungsanfrage",
      },
    },
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
      cta: "Pakete ansehen",
    },
    hero: {
      eyebrow: "Expat • Business • Reisen",
      title: "Wohnort und Geschäft in Kambodscha sicher aufbauen.",
      description:
        "Finden Sie verlässliche Beratung, lokale Dienstleistungen und Geschäftsmöglichkeiten für Ihren Umzug, Ihr Arbeiten und Ihr Leben in Phnom Penh.",
      primaryCta: "Pakete und Preise vergleichen",
      secondaryCta: "Mit einem Berater sprechen",
    },
    stats: [
      { value: "49 $", label: "Kambodscha-Erstberatung" },
      { value: "249 $", label: "Umzugsbegleitung" },
      { value: "399 $", label: "Geschäftsplanung" },
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
