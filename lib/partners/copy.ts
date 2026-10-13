export type PartnerCopy = {
  nav: string;
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  pitch: string;
  founder: string;
  audienceHeading: string;
  audiences: string[];
  referralHeading: string;
  referralSteps: string[];
  responsibilities: string;
  collaborationHeading: string;
  collaboration: string;
  transparency: string;
  contactHeading: string;
  contactNote: string;
  print: string;
  demoHeading: string;
  demoDescription: string;
  demoSteps: { title: string; text: string; action: string }[];
  form: {
    heading: string;
    explanation: string;
    organization: string;
    activity: string;
    project: string;
    consent: string;
    privacy: string;
    prepare: string;
    draftHeading: string;
    draftNotice: string;
    subject: string;
    introduction: string;
    closing: string;
  };
};

export const partnerCopy: Record<"en" | "fr" | "es" | "de", PartnerCopy> = {
  en: {
    nav: "Partners",
    seo: { title: "Local partners in Siem Reap: client introductions with KHMERA", description: "Travel agencies, guesthouses, hotels and real estate agencies: discuss introducing KHMERA's future travel and relocation clients to your services in Siem Reap." },
    eyebrow: "Siem Reap • Local partner invitation",
    title: "KHMERA: connect future clients with your services in Siem Reap.",
    pitch: "We are preparing a network of local partners for travellers, future residents and entrepreneurs heading to Siem Reap. KHMERA's role: understand their project, clarify their needs and, with their consent, introduce them to a suitable local professional.",
    founder: "Project led by Manfred Parbatia, founder of KHMERA.",
    audienceHeading: "Local professionals we want to meet",
    audiences: ["Travel agencies: itineraries, excursions and discovery trips around Siem Reap and Angkor.", "Guesthouses and hotels: holiday stays and temporary accommodation on arrival.", "Real estate agencies: rental searches and housing for future residents."],
    referralHeading: "How a client introduction would work",
    referralSteps: ["KHMERA clarifies the client's plans, dates, budget and travel or housing needs.", "With the client's agreement, KHMERA introduces them to a partner whose services match their needs.", "You confirm availability, explain your offer and agree on the quote, booking or contract directly with the client."],
    responsibilities: "You remain responsible for your own services, rates and contractual terms. Introductions would initially be handled manually; the site does not automatically book or pay for partner services.",
    collaborationHeading: "Why discuss a partnership?",
    collaboration: "Help future clients discover your services through introductions based on their stated needs. Share your service area, languages, enquiry process and terms so we can assess a fit and agree on a small pilot.",
    transparency: "Network under development: no existing client base, client volume, exclusivity or commission is promised. Selection, responsibilities and any commercial terms must be agreed in writing.",
    contactHeading: "Meet the founder",
    contactNote: "Let's arrange a 15-minute conversation. Send your business name, contact details and services. Current contact address, pending a professional mailbox:",
    print: "Print / save the one-page PDF",
    demoHeading: "A three-minute site demonstration",
    demoDescription: "Explore the real site using the steps below. No payment or booking is made. Use fictional details and do not send the prepared email during the demo.",
    demoSteps: [
      { title: "Discover the positioning", text: "Show the Siem Reap focus and the four language options on the home page.", action: "Open the home page" },
      { title: "Compare the packages", text: "Show the four fees, deliverables and exclusions. Guidance is quoted before booking.", action: "See packages and prices" },
      { title: "Prepare a travel request", text: "Open the discovery trip, enter fictional details and preview the localised email. Stop before sending.", action: "Try the request form" },
    ],
    form: {
      heading: "Introduce your organisation",
      explanation: "This form prepares an email to the founder. You send it from your own mail app; it does not submit a partnership application automatically.",
      organization: "Organisation or business",
      activity: "Your activity",
      project: "Your proposed collaboration",
      consent: "I agree to share these details with KHMERA by email to discuss a potential collaboration.",
      privacy: "No database storage or automatic sending. Do not include identity documents, banking details or confidential client data.",
      prepare: "Prepare my partnership email",
      draftHeading: "Partnership email ready to send",
      draftNotice: "Your message has NOT been sent. Send the email from your mail app to contact KHMERA. No partnership has been accepted.",
      subject: "KHMERA partnership enquiry",
      introduction: "I would like to discuss a possible collaboration in Siem Reap. Here is a short introduction:",
      closing: "Thank you. Please let me know the next steps for an initial discussion.",
    },
  },
  fr: {
    nav: "Partenaires",
    seo: { title: "Partenaires locaux à Siem Reap : mise en relation avec Khmera", description: "Agences de voyages, guesthouses, hôtels et agences immobilières : échangeons sur la mise en relation de vos services avec les futurs clients de Khmera à Siem Reap." },
    eyebrow: "Siem Reap • Invitation aux partenaires locaux",
    title: "KHMERA : mettons vos services en relation avec de futurs clients à Siem Reap.",
    pitch: "Nous préparons un réseau de partenaires locaux pour les voyageurs, futurs expatriés et entrepreneurs qui se rendent à Siem Reap. Le rôle de Khmera : comprendre leur projet, clarifier leurs besoins et les mettre en contact, avec leur accord, avec un professionnel local adapté.",
    founder: "Un projet porté par Manfred Parbatia, créateur de Khmera.",
    audienceHeading: "Les professionnels locaux que nous souhaitons rencontrer",
    audiences: ["Agences de voyages : itinéraires, excursions et séjours découverte à Siem Reap et Angkor.", "Guesthouses et hôtels : séjours touristiques et hébergement temporaire à l'arrivée.", "Agences immobilières : recherche de location et logement pour une future installation."],
    referralHeading: "Comment se déroulerait une mise en relation ?",
    referralSteps: ["Khmera précise le projet du client : dates, budget et besoins de voyage ou de logement.", "Avec l'accord du client, Khmera le met en contact avec un partenaire dont les services correspondent à ses besoins.", "Vous confirmez vos disponibilités, présentez votre offre et convenez directement avec le client du devis, de la réservation ou du contrat."],
    responsibilities: "Vous restez responsable de vos prestations, tarifs et conditions contractuelles. Les mises en relation seraient d'abord manuelles : le site ne réserve ni ne règle automatiquement les services des partenaires.",
    collaborationHeading: "Pourquoi échanger avec Khmera ?",
    collaboration: "Faites découvrir vos services à de futurs clients, grâce à des mises en relation fondées sur leurs besoins exprimés. Présentez votre zone d'intervention, vos langues, votre accueil des demandes et vos conditions pour étudier une collaboration et convenir d'un petit pilote.",
    transparency: "Réseau en préparation : aucune clientèle existante, aucun volume de clients, aucune exclusivité ni commission promis. Sélection, responsabilités et éventuelles conditions commerciales à convenir par écrit.",
    contactHeading: "Rencontrer le créateur",
    contactNote: "Organisons un échange de 15 minutes. Envoyez le nom de votre structure, vos coordonnées et vos services. Adresse actuelle, en attendant une messagerie professionnelle :",
    print: "Imprimer / enregistrer la fiche PDF d'une page",
    demoHeading: "Une démonstration du site en trois minutes",
    demoDescription: "Parcourez le site réel avec les étapes ci-dessous. Aucun paiement ni réservation. Utilisez des coordonnées fictives et n'envoyez pas l'e-mail préparé pendant la démonstration.",
    demoSteps: [
      { title: "Découvrir le positionnement", text: "Présentez le ciblage Siem Reap et les quatre langues disponibles sur l'accueil.", action: "Ouvrir l'accueil" },
      { title: "Comparer les offres", text: "Montrez les quatre tarifs, les livrables et les exclusions. Un devis précède toute réservation.", action: "Voir les offres et tarifs" },
      { title: "Préparer une demande de voyage", text: "Ouvrez l'offre découverte, saisissez des données fictives et affichez l'e-mail traduit. Arrêtez-vous avant l'envoi.", action: "Essayer le formulaire" },
    ],
    form: {
      heading: "Présentez votre structure",
      explanation: "Ce formulaire prépare un e-mail au créateur. Vous l'envoyez depuis votre messagerie ; aucune demande de partenariat n'est transmise automatiquement.",
      organization: "Structure ou entreprise",
      activity: "Votre activité",
      project: "Votre proposition de collaboration",
      consent: "J'accepte de transmettre ces informations à Khmera par e-mail pour échanger sur une collaboration éventuelle.",
      privacy: "Aucun stockage en base ni envoi automatique. N'incluez pas de documents d'identité, coordonnées bancaires ou données confidentielles de clients.",
      prepare: "Préparer mon e-mail de partenariat",
      draftHeading: "E-mail de partenariat prêt à envoyer",
      draftNotice: "Votre message n'a PAS été envoyé. Envoyez l'e-mail depuis votre messagerie pour contacter Khmera. Aucun partenariat n'a été accepté.",
      subject: "Demande de partenariat KHMERA",
      introduction: "Je souhaite échanger sur une collaboration possible à Siem Reap. Voici une courte présentation :",
      closing: "Merci de m'indiquer les prochaines étapes pour un premier échange.",
    },
  },
  es: {
    nav: "Colaboradores",
    seo: { title: "Colaboradores locales en Siem Reap: contactos con KHMERA", description: "Agencias de viajes, guesthouses, hoteles e inmobiliarias: hablemos de poner vuestros servicios en contacto con futuros clientes de KHMERA en Siem Reap." },
    eyebrow: "Siem Reap • Invitación a colaboradores locales",
    title: "KHMERA: conecta tus servicios con futuros clientes en Siem Reap.",
    pitch: "Preparamos una red de colaboradores locales para viajeros, futuros residentes y emprendedores que llegan a Siem Reap. KHMERA busca entender sus proyectos, aclarar sus necesidades y ponerlos en contacto, con su consentimiento, con un profesional local adecuado.",
    founder: "Un proyecto de Manfred Parbatia, creador de KHMERA.",
    audienceHeading: "Profesionales locales que queremos conocer",
    audiences: ["Agencias de viajes: itinerarios, excursiones y viajes por Siem Reap y Angkor.", "Guesthouses y hoteles: estancias turísticas y alojamiento temporal a la llegada.", "Agencias inmobiliarias: búsqueda de alquiler y vivienda para futuros residentes."],
    referralHeading: "Cómo funcionaría la puesta en contacto",
    referralSteps: ["KHMERA aclara el proyecto del cliente: fechas, presupuesto y necesidades de viaje o vivienda.", "Con el consentimiento del cliente, KHMERA lo presenta a un colaborador cuyos servicios se ajustan a sus necesidades.", "Confirmas la disponibilidad, presentas tu oferta y acuerdas directamente con el cliente el presupuesto, la reserva o el contrato."],
    responsibilities: "Sigues siendo responsable de tus servicios, precios y condiciones contractuales. Los contactos serían inicialmente manuales; el sitio no reserva ni paga automáticamente los servicios de los colaboradores.",
    collaborationHeading: "¿Por qué hablar con KHMERA?",
    collaboration: "Da a conocer tus servicios a futuros clientes mediante contactos basados en sus necesidades. Comparte tu zona de actividad, idiomas, proceso de atención y condiciones para estudiar una colaboración y acordar una pequeña prueba.",
    transparency: "Red en preparación: no se promete una clientela existente, volumen de clientes, exclusividad ni comisión. La selección, responsabilidades y posibles condiciones comerciales deben acordarse por escrito.",
    contactHeading: "Conoce al creador",
    contactNote: "Organicemos una conversación de 15 minutos. Envía el nombre de tu empresa, tus datos de contacto y servicios. Dirección actual, hasta disponer de un correo profesional:",
    print: "Imprimir / guardar la ficha PDF de una página",
    demoHeading: "Una demostración del sitio en tres minutos",
    demoDescription: "Explora el sitio real con estos pasos. Sin pagos ni reservas. Usa datos ficticios y no envíes el correo preparado durante la demostración.",
    demoSteps: [
      { title: "Descubrir el enfoque", text: "Muestra el enfoque en Siem Reap y los cuatro idiomas disponibles en la página de inicio.", action: "Abrir el inicio" },
      { title: "Comparar los paquetes", text: "Muestra los cuatro precios, entregables y exclusiones. Se requiere un presupuesto antes de reservar.", action: "Ver paquetes y precios" },
      { title: "Preparar una solicitud de viaje", text: "Abre el viaje de descubrimiento, introduce datos ficticios y muestra el correo traducido. Detente antes de enviarlo.", action: "Probar el formulario" },
    ],
    form: {
      heading: "Presenta tu organización",
      explanation: "Este formulario prepara un correo al creador. Lo envías desde tu aplicación de correo; no se transmite ninguna solicitud de colaboración automáticamente.",
      organization: "Organización o empresa",
      activity: "Tu actividad",
      project: "Tu propuesta de colaboración",
      consent: "Acepto compartir estos datos con KHMERA por correo para hablar de una posible colaboración.",
      privacy: "Sin almacenamiento en base de datos ni envío automático. No incluyas documentos de identidad, datos bancarios ni información confidencial de clientes.",
      prepare: "Preparar mi correo de colaboración",
      draftHeading: "Correo de colaboración listo para enviar",
      draftNotice: "Tu mensaje NO se ha enviado. Envía el correo desde tu aplicación para contactar con KHMERA. No se ha aceptado ninguna colaboración.",
      subject: "Solicitud de colaboración KHMERA",
      introduction: "Me gustaría hablar de una posible colaboración en Siem Reap. Aquí presento mi organización:",
      closing: "Gracias. Por favor, indícame los próximos pasos para una primera conversación.",
    },
  },
  de: {
    nav: "Partner",
    seo: { title: "Lokale Partner in Siem Reap: Kundenkontakte mit KHMERA", description: "Reisebüros, Guesthouses, Hotels und Immobilienagenturen: besprechen Sie Kontakte zu künftigen Reise- und Umzugskunden von KHMERA in Siem Reap." },
    eyebrow: "Siem Reap • Einladung an lokale Partner",
    title: "KHMERA: Ihre Leistungen mit künftigen Kunden in Siem Reap verbinden.",
    pitch: "Wir bereiten ein lokales Partnernetzwerk für Reisende, künftige Einwohner und Gründer in Siem Reap vor. KHMERA möchte ihre Projekte verstehen, ihren Bedarf klären und sie mit ihrem Einverständnis einem passenden lokalen Anbieter vorstellen.",
    founder: "Ein Projekt von Manfred Parbatia, Gründer von KHMERA.",
    audienceHeading: "Lokale Anbieter, die wir kennenlernen möchten",
    audiences: ["Reisebüros: Reiserouten, Ausflüge und Entdeckungsreisen rund um Siem Reap und Angkor.", "Guesthouses und Hotels: Urlaubsaufenthalte und vorübergehende Unterkunft bei der Ankunft.", "Immobilienagenturen: Mietsuche und Wohnungen für künftige Einwohner."],
    referralHeading: "So könnte eine Kontaktvermittlung ablaufen",
    referralSteps: ["KHMERA klärt das Projekt des Kunden: Termine, Budget und Reise- oder Wohnungsbedarf.", "Mit Zustimmung des Kunden stellt KHMERA den Kontakt zu einem passenden Partner her.", "Sie bestätigen die Verfügbarkeit, erläutern Ihr Angebot und vereinbaren Angebot, Buchung oder Vertrag direkt mit dem Kunden."],
    responsibilities: "Sie bleiben für Ihre Leistungen, Preise und Vertragsbedingungen verantwortlich. Kontakte würden zunächst manuell vermittelt; die Website bucht oder bezahlt Partnerleistungen nicht automatisch.",
    collaborationHeading: "Warum mit KHMERA sprechen?",
    collaboration: "Stellen Sie Ihre Leistungen künftigen Kunden durch bedarfsorientierte Kontakte vor. Teilen Sie Ihr Einsatzgebiet, Ihre Sprachen, Ihren Anfrageprozess und Ihre Bedingungen, um eine Zusammenarbeit und einen kleinen Piloten zu besprechen.",
    transparency: "Netzwerk im Aufbau: kein bestehender Kundenstamm, Kundenvolumen, Exklusivität oder Provision zugesagt. Auswahl, Verantwortlichkeiten und mögliche Geschäftsbedingungen sind schriftlich zu vereinbaren.",
    contactHeading: "Den Gründer kennenlernen",
    contactNote: "Vereinbaren wir ein Gespräch von 15 Minuten. Senden Sie Firmenname, Kontaktdaten und Leistungen. Aktuelle Adresse bis zur Einrichtung eines professionellen Postfachs:",
    print: "Einseitige Präsentation drucken / als PDF speichern",
    demoHeading: "Eine Website-Demo in drei Minuten",
    demoDescription: "Erkunden Sie die echte Website mit diesen Schritten. Keine Zahlung oder Buchung. Verwenden Sie fiktive Angaben und senden Sie die vorbereitete E-Mail während der Demo nicht ab.",
    demoSteps: [
      { title: "Die Ausrichtung entdecken", text: "Zeigen Sie den Schwerpunkt Siem Reap und die vier Sprachen auf der Startseite.", action: "Startseite öffnen" },
      { title: "Pakete vergleichen", text: "Zeigen Sie die vier Honorare, Leistungen und Ausschlüsse. Vor einer Buchung wird ein Angebot erstellt.", action: "Pakete und Preise ansehen" },
      { title: "Eine Reiseanfrage vorbereiten", text: "Öffnen Sie die Entdeckungsreise, geben Sie fiktive Daten ein und zeigen Sie die übersetzte E-Mail. Vor dem Versand stoppen.", action: "Formular ausprobieren" },
    ],
    form: {
      heading: "Ihre Organisation vorstellen",
      explanation: "Dieses Formular erstellt eine E-Mail an den Gründer. Sie versenden sie mit Ihrem E-Mail-Programm; keine Partneranfrage wird automatisch übermittelt.",
      organization: "Organisation oder Unternehmen",
      activity: "Ihre Tätigkeit",
      project: "Ihr Vorschlag zur Zusammenarbeit",
      consent: "Ich möchte diese Angaben per E-Mail mit KHMERA teilen, um eine mögliche Zusammenarbeit zu besprechen.",
      privacy: "Keine Datenbankspeicherung oder automatischer Versand. Keine Ausweise, Bankdaten oder vertraulichen Kundendaten angeben.",
      prepare: "Partner-E-Mail vorbereiten",
      draftHeading: "Partner-E-Mail zum Versand bereit",
      draftNotice: "Ihre Nachricht wurde NICHT gesendet. Senden Sie die E-Mail mit Ihrem E-Mail-Programm an KHMERA. Keine Partnerschaft wurde angenommen.",
      subject: "KHMERA Partneranfrage",
      introduction: "Ich möchte eine mögliche Zusammenarbeit in Siem Reap besprechen. Hier eine kurze Vorstellung:",
      closing: "Vielen Dank. Bitte nennen Sie die nächsten Schritte für ein erstes Gespräch.",
    },
  },
};
