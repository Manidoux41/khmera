import type { Locale } from "@/lib/i18n";

type TariffCopy = {
  introduction: string; choose: string; language: string; print: string; printHelp: string;
  privateNotice: string; fee: string; currency: string; objective: string; exclusions: string;
  conditions: string; steps: string[]; contact: string; footer: string;
  recipient: { label: string; placeholder: string; help: string; attention: string };
};

export const tariffCopy: Record<Locale, TariffCopy> = {
  fr: {
    introduction: "Références internes pour préparer vos devis. Les prix ne sont pas affichés sur le site public. Sélectionnez une prestation pour consulter et imprimer sa fiche.",
    choose: "Choisir une fiche tarifaire", language: "Langue de la fiche",
    print: "Imprimer cette fiche / Enregistrer en PDF",
    printHelp: "Format A4, échelle 100 %, en-têtes et pieds de page du navigateur désactivés. Une seule fiche est imprimée, sans les menus. Les tarifs de référence ne sont pas modifiables dans cet écran.",
    privateNotice: "Fiche tarifaire interne · Ne constitue pas un devis",
    fee: "Honoraires de référence par prestation",
    currency: "Devise : USD (dollar américain) · Montant final et taxes éventuelles à préciser au devis.",
    objective: "Objectif de l'accompagnement", exclusions: "Exclusions et limites",
    conditions: "Conditions à confirmer avec le client",
    steps: [
      "Qualifier les besoins et confirmer votre capacité à réaliser la prestation.",
      "Établir un devis écrit : périmètre, dates, montant final, taxes éventuelles et durée de validité.",
      "Convenir des modalités de paiement et d'annulation avant le début de la prestation.",
    ],
    contact: "Contact KHMERA", footer: "Document de préparation interne. Aucune réservation ni aucun paiement confirmé.",
    recipient: { label: "Destinataire de la fiche", placeholder: "Nom du destinataire ou de son organisation", help: "Facultatif. Conservé uniquement dans cette page, sans envoi ni sauvegarde.", attention: "À l'attention de :" },
  },
  en: {
    introduction: "Internal references for preparing quotes. Prices are not displayed on the public website. Select a service to view and print its sheet.",
    choose: "Choose a tariff sheet", language: "Sheet language",
    print: "Print this sheet / Save as PDF",
    printHelp: "A4 format, 100% scale, browser headers and footers disabled. Only the selected sheet is printed, without menus. Reference fees cannot be edited on this screen.",
    privateNotice: "Internal tariff sheet · Not a quote",
    fee: "Reference fee per service",
    currency: "Currency: USD (US dollar) · Final amount and any applicable taxes to be specified in the quote.",
    objective: "Purpose of the guidance", exclusions: "Exclusions and limitations",
    conditions: "Conditions to confirm with the client",
    steps: [
      "Assess the client's needs and confirm your ability to provide the service.",
      "Prepare a written quote: scope, dates, final amount, any applicable taxes and validity period.",
      "Agree on payment and cancellation terms before the service begins.",
    ],
    contact: "KHMERA contact", footer: "Internal preparation document. No booking or payment is confirmed.",
    recipient: { label: "Sheet recipient", placeholder: "Recipient or organisation name", help: "Optional. Kept only on this page, without sending or saving.", attention: "For the attention of:" },
  },
  es: {
    introduction: "Referencias internas para preparar presupuestos. Los precios no se muestran en el sitio público. Selecciona un servicio para consultar e imprimir su ficha.",
    choose: "Elegir una ficha de tarifas", language: "Idioma de la ficha",
    print: "Imprimir esta ficha / Guardar en PDF",
    printHelp: "Formato A4, escala 100 %, encabezados y pies del navegador desactivados. Solo se imprime la ficha seleccionada, sin menús. Las tarifas de referencia no se pueden modificar en esta pantalla.",
    privateNotice: "Ficha de tarifas interna · No constituye un presupuesto",
    fee: "Honorarios de referencia por servicio",
    currency: "Moneda: USD (dólar estadounidense) · Importe final y posibles impuestos a especificar en el presupuesto.",
    objective: "Objetivo del acompañamiento", exclusions: "Exclusiones y límites",
    conditions: "Condiciones a confirmar con el cliente",
    steps: [
      "Evaluar las necesidades y confirmar tu capacidad para prestar el servicio.",
      "Preparar un presupuesto escrito: alcance, fechas, importe final, posibles impuestos y plazo de validez.",
      "Acordar las condiciones de pago y cancelación antes de comenzar el servicio.",
    ],
    contact: "Contacto KHMERA", footer: "Documento de preparación interna. Ninguna reserva ni pago confirmado.",
    recipient: { label: "Destinatario de la ficha", placeholder: "Nombre del destinatario o de su organización", help: "Opcional. Se conserva solo en esta página, sin envío ni almacenamiento.", attention: "A la atención de:" },
  },
  de: {
    introduction: "Interne Referenzen zur Angebotserstellung. Preise werden nicht auf der öffentlichen Website angezeigt. Wählen Sie eine Leistung, um ihr Preisblatt anzusehen und zu drucken.",
    choose: "Preisblatt auswählen", language: "Sprache des Preisblatts",
    print: "Dieses Blatt drucken / Als PDF speichern",
    printHelp: "A4-Format, Maßstab 100 %, Kopf- und Fußzeilen des Browsers deaktiviert. Nur das ausgewählte Blatt wird ohne Menüs gedruckt. Referenzhonorare können hier nicht geändert werden.",
    privateNotice: "Internes Preisblatt · Kein verbindliches Angebot",
    fee: "Referenzhonorar pro Leistung",
    currency: "Währung: USD (US-Dollar) · Endbetrag und etwaige Steuern sind im Angebot anzugeben.",
    objective: "Ziel der Beratung", exclusions: "Ausschlüsse und Grenzen",
    conditions: "Mit dem Kunden zu bestätigende Bedingungen",
    steps: [
      "Bedarf klären und die eigene Fähigkeit zur Leistungserbringung bestätigen.",
      "Ein schriftliches Angebot erstellen: Umfang, Termine, Endbetrag, etwaige Steuern und Gültigkeitsdauer.",
      "Zahlungs- und Stornierungsbedingungen vor Leistungsbeginn vereinbaren.",
    ],
    contact: "KHMERA Kontakt", footer: "Internes Vorbereitungsdokument. Keine Buchung oder Zahlung bestätigt.",
    recipient: { label: "Empfänger des Preisblatts", placeholder: "Name des Empfängers oder seiner Organisation", help: "Optional. Nur auf dieser Seite gespeichert, ohne Versand oder dauerhafte Speicherung.", attention: "Zu Händen von:" },
  },
};
