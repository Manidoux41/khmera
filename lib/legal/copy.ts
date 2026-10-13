import type { Locale } from "../i18n";

export const legalPages = ["about", "contact", "legal-notice", "terms", "privacy", "listing-terms", "advertising", "report"] as const;
export type LegalPage = typeof legalPages[number];
type Page = { title: string; sections: { heading: string; text: string }[] };
type LegalCopy = {
  warning: string; missing: string; operatorLabels: string[];
  demo: string; role: string; reportLink: string;
  report: { target: string; email: string; reason: string; details: string; consent: string; prepare: string; notice: string; invalid: string; reasons: string[] };
  pages: Record<LegalPage, Page>;
};
export const legalCopy: Record<Locale, LegalCopy> = {
  en: {
    warning: "Launch preparation draft — legal review and regulatory authorisations remain pending. These pages do not certify compliance.",
    missing: "To be completed and validated before commercial launch",
    operatorLabels: ["Trade name", "Legal operator", "Legal form", "Business address", "Registration number", "Tax information", "Contact email", "Publication director", "Hosting provider and contact details"],
    demo: "Illustrative listing — no verified professional or authorised partner is represented. Not sponsored.",
    role: "KHMERA provides information and introductions. Third-party services are agreed and paid directly with the professional. KHMERA's own advisory packages are separate and subject to a written quote.",
    reportLink: "Report this content",
    report: { target: "Content path", email: "Your reply email (optional)", reason: "Reason", details: "Details (do not include sensitive documents)", consent: "I understand that this prepares an email only. I choose whether to send my information for this report.", prepare: "Prepare report email", notice: "NOT sent or registered. Send the email yourself. No automatic tracking or receipt exists; KHMERA must acknowledge and register the report manually. For an immediate danger contact the competent authorities.", invalid: "Check the content path, email and details (20–2000 characters).", reasons: ["Nonexistent or fraudulent business", "Incorrect contact details", "Misleading advertising", "Illegal content", "Third-party rights", "Correction or deletion request"] },
    pages: {
      about: { title: "About KHMERA", sections: [
        { heading: "Our role in Siem Reap", text: "KHMERA helps expatriates, entrepreneurs and travellers find information and make professional connections in Siem Reap. The current marketplace contains clearly labelled examples, not a live verified business directory." },
        { heading: "Two distinct activities", text: "Directory introductions do not process third-party contracts, payments, carts or bookings. KHMERA also proposes its own advisory packages on request; only an agreed written quote defines any service KHMERA itself provides. No integrated payment or automatic booking is active." },
        { heading: "Future development", text: "Free and premium listings, sponsored campaigns and paid guides are preparation only. Commercial activation requires validation of the operator's legal status, applicable authorisations and contractual terms." },
      ] },
      contact: { title: "Contact KHMERA", sections: [
        { heading: "Questions and requests", text: "Use the contact email below for information, professional listing enquiries or questions about a written quote. Sending an email is not a booking or payment." },
        { heading: "Privacy and reports", text: "Use the same contact for privacy requests, corrections and complaints. Give the content path and sufficient context, not passport, banking or sensitive personal information. Response times and identity-verification procedures must be defined before launch." },
      ] },
      "legal-notice": { title: "Legal Notice", sections: [
        { heading: "Operator information", text: "The operator details below must be completed from verified records. Missing fields are not proof of registration, licensing or tax compliance." },
        { heading: "Publication and hosting", text: "The publication director and hosting provider's legal identity and contact information require confirmation. Local development and the production deployment may use different providers." },
      ] },
      terms: { title: "Terms of Use", sections: [
        { heading: "Purpose and access", text: "This draft covers browsing information and directory examples. Use the platform lawfully, without spam, impersonation, scraping that infringes rights or interference with security. Do not rely on examples as confirmed offers." },
        { heading: "Roles and responsibilities", text: "Professionals remain responsible for truthful contact details, permissions, qualifications and their own services. Contracts and payments with third parties occur directly, not through KHMERA. KHMERA's own advisory services require separate written terms. There is no guarantee of quality, availability, visa approval or investment results." },
        { heading: "Content and intellectual property", text: "False, fraudulent, illegal or rights-infringing listings and advertisements are prohibited. Submit only material you may lawfully publish. Platform branding and content remain subject to applicable intellectual-property rights; photo licences and credits remain applicable." },
        { heading: "Reporting and moderation", text: "Use the reporting page or contact email. Reports are processed manually; no automatic receipt or response deadline is promised. Suspected non-compliant listings may be refused, corrected, suspended or removed after review; actual public publication is currently disabled." },
        { heading: "Liability, changes and disputes", text: "Any limitation of liability applies only to the extent permitted by applicable law and cannot exclude mandatory rights. Terms changes must be dated and material changes notified where required. Governing law, competent forum and complaint/dispute procedures require Cambodian legal review before commercial activation." },
      ] },
      privacy: { title: "Privacy Policy", sections: [
        { heading: "Current data flows", text: "Public forms create an email draft locally; no request is submitted or stored automatically. If you send it, your mail provider and the recipient process its contents. Admin contacts, portraits, recipient fields and drafts remain in page memory until reload; JSON/PDF exports are files you control. Admin login uses an essential signed HttpOnly session cookie, valid for eight hours." },
        { heading: "Purposes and retention", text: "Information sent voluntarily is used to answer enquiries, prepare quotes or investigate reports. Operator mailbox and hosting/access-log retention, recipients and deletion procedures must be documented and validated. Browser drafts are cleared when their page reloads; exported files require manual protection and deletion." },
        { heading: "Legal basis, rights and international transfers", text: "Applicable legal bases, mandatory retention and international-transfer safeguards require review according to the operator's structure, audience and providers. Contact KHMERA to request access, correction or deletion as applicable. Exercise procedures and identity checks remain to be validated; no specific regulatory compliance is claimed." },
        { heading: "Providers, cookies and preferences", text: "Application fonts and photos are hosted locally. No analytics, advertising trackers, embedded maps or videos are enabled. No non-essential consent banner is shown because no such tracker is installed. Email applications and external links have their own policies. Actual hosting, mailbox providers, logs and countries of processing must be confirmed. Future trackers must be inventoried and blocked before required consent, with refuse/customise/change options." },
      ] },
      "listing-terms": { title: "Business Listing Terms", sections: [
        { heading: "Submission and required information", text: "Public self-service registration is not enabled. Contact KHMERA; provide business name, category, service description, business location, contact details and permission to publish. Website and photos are optional; provide photo rights, credits and any licence or qualification evidence required for your activity." },
        { heading: "Permission and accuracy", text: "The professional must explicitly authorise publication of supplied names, contact details, descriptions and images, hold the necessary rights, and keep information current. Approval is manual. No verified or official-partner label is granted without a recorded check or written authorisation." },
        { heading: "Changes and removal", text: "Request correction or removal by email or report. KHMERA may refuse, suspend or delete inaccurate, unlawful or unauthorised content after review. Important changes must be logged; the current preparation tools do not publish data." },
        { heading: "Free, premium and sponsored listings", text: "Paid tiers and sponsorship are disabled. No subscription or invoice is created. Before activation, scope, fees, duration, renewal, termination and any refund rules must be agreed and legally validated. Sponsored content must be identified separately from natural results; payment cannot imply verification." },
      ] },
      advertising: { title: "Advertising Policy", sections: [
        { heading: "Disabled preparation", text: "Potential formats are clearly labelled sponsored directory entries and banners. No paid campaign or ad slot is active. Format, placement and dates require manual approval and legal validation." },
        { heading: "Advertiser and content review", text: "Check advertiser identity, contact details, business authorisation and content/image rights. Reject fraudulent, misleading, illegal or rights-infringing advertising. Regulated categories (including health, finance, alcohol, gambling and adult content) require specialist review and remain disabled pending a documented decision." },
        { heading: "Transparency and complaints", text: "Mark every activated sponsored entry or banner as sponsored. Do not mix paid placement with natural results or claim official partnership without permission. Reports go through the reporting page or email. Ads may be rejected, suspended or withdrawn for false claims, expired authorisation or breach of policy." },
      ] },
      report: { title: "Report a Problem", sections: [
        { heading: "Manual reporting", text: "Provide the path of a listing or advertisement, reason and factual context. This form prepares an email; it is not a server submission. An administrator can later register its actual reception date and treatment status in the private preparation tool." },
      ] },
    },
  },
  fr: {
    warning: "Projet de préparation au lancement — validation juridique et autorisations réglementaires encore à confirmer. Ces pages ne certifient aucune conformité.",
    missing: "À compléter et valider avant le lancement commercial",
    operatorLabels: ["Nom commercial", "Exploitant légal", "Forme juridique", "Adresse professionnelle", "Immatriculation", "Informations fiscales", "E-mail de contact", "Responsable de publication", "Hébergeur et coordonnées"],
    demo: "Fiche illustrative — aucun professionnel vérifié ni partenaire autorisé n'est représenté. Non sponsorisée.",
    role: "KHMERA informe et facilite les contacts. Les prestations tierces se négocient et se règlent directement avec le professionnel. Les accompagnements propres à Khmera sont distincts et sur devis écrit.",
    reportLink: "Signaler ce contenu",
    report: { target: "Chemin du contenu", email: "Votre e-mail de réponse (facultatif)", reason: "Motif", details: "Détails (sans documents sensibles)", consent: "Je comprends que seul un e-mail est préparé. Je choisis de transmettre ou non mes informations pour ce signalement.", prepare: "Préparer le signalement par e-mail", notice: "NON envoyé et NON enregistré. Envoyez vous-même l'e-mail. Aucun suivi ni accusé de réception automatique ; KHMERA doit accuser réception et inscrire le signalement manuellement. En cas de danger immédiat, contactez les autorités compétentes.", invalid: "Vérifiez le chemin, l'e-mail et les détails (20 à 2000 caractères).", reasons: ["Entreprise inexistante ou frauduleuse", "Coordonnées incorrectes", "Publicité trompeuse", "Contenu illégal", "Atteinte aux droits d'un tiers", "Rectification ou suppression"] },
    pages: {
      about: { title: "À propos de KHMERA", sections: [
        { heading: "Notre rôle à Siem Reap", text: "KHMERA aide les expatriés, entrepreneurs et voyageurs à trouver des informations et des contacts professionnels à Siem Reap. Le marché actuel contient des exemples clairement signalés, pas un annuaire réel de professionnels vérifiés." },
        { heading: "Deux activités distinctes", text: "La mise en relation ne traite aucun contrat, paiement, panier ni réservation avec les professionnels tiers. Khmera propose aussi ses propres accompagnements sur devis ; seul un devis écrit accepté définit la prestation fournie par Khmera. Aucun paiement intégré ni réservation automatique n'est actif." },
        { heading: "Évolutions futures", text: "Fiches gratuites et premium, campagnes sponsorisées et guides payants restent en préparation. Leur activation exige la validation de la structure de l'exploitant, des autorisations applicables et des conditions contractuelles." },
      ] },
      contact: { title: "Contacter KHMERA", sections: [
        { heading: "Questions et demandes", text: "Utilisez l'adresse ci-dessous pour vos questions, demandes de référencement ou échanges sur un devis écrit. Un e-mail ne confirme aucune réservation ni aucun paiement." },
        { heading: "Données et signalements", text: "Cette adresse reçoit aussi les demandes relatives aux données, corrections et réclamations. Indiquez le chemin du contenu et le contexte utile, sans passeport, coordonnées bancaires ni données sensibles. Les délais de réponse et contrôles d'identité restent à définir avant lancement." },
      ] },
      "legal-notice": { title: "Mentions légales", sections: [
        { heading: "Identité de l'exploitant", text: "Les informations ci-dessous doivent être complétées à partir de justificatifs. Un champ manquant ne prouve aucune immatriculation, licence ni conformité fiscale." },
        { heading: "Publication et hébergement", text: "L'identité et les coordonnées du responsable de publication et de l'hébergeur doivent être confirmées. Le développement local et le déploiement de production peuvent utiliser des fournisseurs différents." },
      ] },
      terms: { title: "Conditions générales d'utilisation", sections: [
        { heading: "Objet et accès", text: "Ce projet couvre la consultation d'informations et d'exemples d'annuaire. Utilisez le site légalement, sans spam, usurpation, extraction portant atteinte aux droits ni perturbation de la sécurité. Ne considérez pas les exemples comme des offres confirmées." },
        { heading: "Rôles et responsabilités", text: "Chaque professionnel est responsable de ses coordonnées, autorisations, qualifications et prestations. Les contrats et paiements tiers sont conclus directement, sans traitement par Khmera. Les prestations propres à Khmera nécessitent des conditions écrites distinctes. Aucune qualité, disponibilité, obtention de visa ni résultat d'investissement n'est garanti." },
        { heading: "Contenus et propriété intellectuelle", text: "Les fiches et publicités trompeuses, frauduleuses, illégales ou portant atteinte à des droits sont interdites. Ne fournissez que des contenus dont vous pouvez autoriser la publication. La marque et les contenus restent soumis aux droits applicables ; les licences et crédits photo doivent être conservés." },
        { heading: "Signalement et modération", text: "Utilisez le formulaire ou l'e-mail de contact. Le traitement est manuel, sans accusé automatique ni délai garanti. Après contrôle, un contenu non conforme peut être refusé, corrigé, suspendu ou supprimé ; la publication réelle reste désactivée." },
        { heading: "Responsabilité, évolution et litiges", text: "Toute limitation de responsabilité vaut seulement dans la mesure permise par la loi et ne supprime pas les droits impératifs. Les versions doivent être datées et les changements importants notifiés lorsque nécessaire. Droit applicable, juridiction et procédure de règlement des litiges exigent une validation juridique cambodgienne avant activation commerciale." },
      ] },
      privacy: { title: "Politique de confidentialité", sections: [
        { heading: "Flux actuels", text: "Les formulaires publics préparent localement un e-mail, sans envoi ni stockage automatique. Si vous l'envoyez, votre messagerie et celle du destinataire traitent son contenu. Contacts, portraits, destinataires et brouillons administrateurs restent en mémoire de page ; les exports JSON/PDF sont des fichiers sous votre contrôle. La connexion utilise un cookie essentiel signé HttpOnly valable huit heures." },
        { heading: "Finalités et conservation", text: "Les informations volontairement envoyées servent à répondre, préparer un devis ou examiner un signalement. Durées de conservation des e-mails et journaux d'hébergement, destinataires et procédures de suppression doivent être documentés et validés. Les brouillons disparaissent au rechargement ; les exports doivent être protégés et supprimés manuellement." },
        { heading: "Bases juridiques, droits et transferts", text: "Bases juridiques, conservation obligatoire et garanties de transfert international nécessitent une étude selon l'exploitant, son public et ses fournisseurs. Contactez Khmera pour l'accès, la rectification ou la suppression applicables. Procédures et vérifications d'identité restent à valider ; aucune conformité spécifique n'est revendiquée." },
        { heading: "Prestataires et traceurs", text: "Polices et photos de l'application sont hébergées localement. Aucun outil d'analyse, traceur publicitaire, carte ou vidéo intégrée n'est activé. Aucun faux bandeau de consentement n'est affiché. Messageries et liens externes ont leurs propres politiques. Hébergeur réel, messagerie, journaux et pays de traitement restent à confirmer. Les futurs traceurs devront être inventoriés et bloqués avant tout consentement requis, avec refus, personnalisation et modification ultérieure." },
      ] },
      "listing-terms": { title: "Conditions de référencement professionnel", sections: [
        { heading: "Demande et informations", text: "Aucune inscription publique autonome n'est activée. Contactez Khmera et fournissez nom commercial, catégorie, description, localisation professionnelle, coordonnées et autorisation de publier. Site et photos sont facultatifs ; joignez droits photo, crédits et justificatifs d'activité nécessaires." },
        { heading: "Autorisation et exactitude", text: "Le professionnel doit autoriser explicitement la publication du nom, des coordonnées, textes et images fournis, détenir les droits et tenir ses informations à jour. L'approbation est manuelle. Aucun statut vérifié ou partenaire officiel sans contrôle documenté ou autorisation écrite." },
        { heading: "Modification et retrait", text: "Demandez correction ou retrait par e-mail ou signalement. Après contrôle, Khmera peut refuser, suspendre ou supprimer une fiche inexacte, illégale ou non autorisée. Les changements importants doivent être tracés ; les outils préparatoires ne publient rien." },
        { heading: "Gratuit, premium et sponsorisé", text: "Offres payantes et sponsoring restent désactivés. Aucun abonnement ni facture automatique. Avant activation : périmètre, prix, durée, renouvellement, résiliation et remboursements éventuels devront être contractuellement définis et validés. Le sponsoring doit être distinct des résultats naturels et ne vaut pas vérification." },
      ] },
      advertising: { title: "Politique publicitaire", sections: [
        { heading: "Préparation désactivée", text: "Formats envisagés : fiches sponsorisées identifiées et bannières. Aucune campagne payante ni emplacement actif. Formats, placements et dates exigent approbation manuelle et validation juridique." },
        { heading: "Contrôle des annonceurs", text: "Vérifier identité, coordonnées, autorisations professionnelles et droits sur les contenus. Refuser publicité frauduleuse, trompeuse, illégale ou portant atteinte à des droits. Santé, finance, alcool, jeux d'argent et contenus adultes nécessitent un contrôle spécialisé et restent désactivés sans décision documentée." },
        { heading: "Transparence et retrait", text: "Tout futur contenu sponsorisé doit être signalé et séparé des résultats naturels. Aucun partenariat officiel sans autorisation. Le formulaire ou l'e-mail permet le signalement. Refus, suspension ou retrait sont possibles pour fausses affirmations, autorisation expirée ou violation des règles." },
      ] },
      report: { title: "Signaler un problème", sections: [
        { heading: "Signalement manuel", text: "Indiquez chemin de la fiche ou publicité, motif et faits utiles. Ce formulaire prépare un e-mail, sans soumission au serveur. Un administrateur pourra enregistrer la date réelle de réception et le statut dans l'outil privé de préparation." },
      ] },
    },
  },
  es: {
    warning: "Borrador de preparación — revisión jurídica y autorizaciones pendientes. Estas páginas no certifican conformidad.",
    missing: "Por completar y validar antes del lanzamiento comercial",
    operatorLabels: ["Nombre comercial", "Operador legal", "Forma jurídica", "Dirección profesional", "Registro", "Información fiscal", "Correo", "Responsable de publicación", "Alojamiento y contacto"],
    demo: "Ficha ilustrativa — no representa un profesional verificado ni un socio autorizado. No patrocinada.",
    role: "KHMERA informa y facilita contactos. Los servicios externos se contratan y pagan directamente al profesional. La orientación propia de Khmera es distinta y requiere presupuesto escrito.",
    reportLink: "Denunciar este contenido",
    report: { target: "Ruta del contenido", email: "Correo de respuesta (opcional)", reason: "Motivo", details: "Detalles (sin documentos sensibles)", consent: "Entiendo que solo se prepara un correo. Elijo si envío mis datos para esta denuncia.", prepare: "Preparar correo de denuncia", notice: "NO enviado ni registrado. Envíe el correo personalmente. Sin seguimiento ni acuse automático; Khmera debe confirmar y registrar la recepción manualmente. Ante peligro inmediato contacte a las autoridades.", invalid: "Compruebe ruta, correo y detalles (20–2000 caracteres).", reasons: ["Empresa inexistente o fraudulenta", "Contacto incorrecto", "Publicidad engañosa", "Contenido ilegal", "Derechos de terceros", "Rectificación o supresión"] },
    pages: {
      about: { title: "Acerca de KHMERA", sections: [
        { heading: "Función en Siem Reap", text: "Información y contactos para expatriados, emprendedores y viajeros. El mercado contiene ejemplos identificados, no un directorio real de profesionales verificados." },
        { heading: "Actividades distintas", text: "Khmera no procesa contratos, pagos, carrito ni reservas entre usuarios y terceros. Su propia orientación requiere un presupuesto escrito aceptado. No hay pago integrado ni reserva automática. Fichas premium, anuncios y guías pagadas quedan pendientes de validación jurídica." },
      ] },
      contact: { title: "Contacto", sections: [
        { heading: "Consultas, datos y reclamaciones", text: "Escriba al correo indicado para información, presupuestos, referencia profesional, privacidad o denuncias. Incluya la ruta y contexto sin pasaporte, datos bancarios ni documentos sensibles. El correo no confirma una reserva. Plazos de respuesta y comprobación de identidad deben definirse antes del lanzamiento." },
      ] },
      "legal-notice": { title: "Aviso legal", sections: [
        { heading: "Identidad y alojamiento", text: "Complete los datos siguientes con documentos verificados. Los campos vacíos no prueban registro, licencia ni cumplimiento fiscal. Responsable de publicación, identidad y contacto del alojamiento requieren confirmación; desarrollo y producción pueden usar proveedores distintos." },
      ] },
      terms: { title: "Condiciones de uso", sections: [
        { heading: "Objeto y acceso", text: "Consulta de información y ejemplos. Uso legal, sin spam, suplantación, extracción que viole derechos ni interferencia con la seguridad. Los ejemplos no son ofertas confirmadas." },
        { heading: "Responsabilidades", text: "Profesionales responsables de datos, autorizaciones, cualificaciones y servicios. Contratos y pagos de terceros son directos; los servicios propios requieren términos escritos separados. No se garantiza calidad, disponibilidad, visado ni inversión." },
        { heading: "Contenidos y derechos", text: "Prohibidos contenidos falsos, fraudulentos, ilegales o que infrinjan derechos. Aporte solo material autorizado. Se conservan derechos de marca, propiedad intelectual, licencias y créditos fotográficos." },
        { heading: "Moderación", text: "Denuncias por formulario de correo o contacto, tratamiento manual sin acuse automático ni plazo garantizado. Tras revisión se puede rechazar, corregir, suspender o eliminar. Publicación real desactivada." },
        { heading: "Responsabilidad y litigios", text: "Limitaciones solo en la medida permitida por ley, sin excluir derechos obligatorios. Versiones fechadas y notificación de cambios materiales cuando proceda. Derecho, foro y procedimiento de litigios pendientes de revisión jurídica camboyana." },
      ] },
      privacy: { title: "Política de privacidad", sections: [
        { heading: "Datos y finalidad", text: "Formularios públicos preparan correo local, sin envío ni almacenamiento automático. Si lo envía, procesan sus datos las dos mensajerías. Contactos, retratos y borradores administrativos permanecen en memoria; exportaciones JSON/PDF bajo su control. Cookie esencial firmada HttpOnly de administración: ocho horas. Datos enviados sirven para respuestas, presupuestos y denuncias." },
        { heading: "Conservación y derechos", text: "Retención de correos y registros, destinatarios, bases jurídicas, transferencias internacionales, garantías y procedimientos de acceso, rectificación y supresión requieren validación. Contacte a Khmera. Borradores desaparecen al recargar; proteja y elimine exportaciones. No se afirma conformidad específica." },
        { heading: "Proveedores y cookies", text: "Fotos y fuentes locales; sin analítica, publicidad de seguimiento, mapas ni vídeos integrados, y sin falso banner. Mensajerías y enlaces externos tienen políticas propias. Deben confirmarse alojamiento, correo, registros y países. Futuros rastreadores deben bloquearse antes del consentimiento exigido y ofrecer rechazo, personalización y cambio posterior." },
      ] },
      "listing-terms": { title: "Condiciones de referencia profesional", sections: [
        { heading: "Solicitud", text: "Sin autoservicio público. Contacte a Khmera con nombre, categoría, descripción, localización, contacto y permiso de publicación. Web y fotos opcionales; aportar derechos, créditos y pruebas de actividad necesarias." },
        { heading: "Autorización y revisión", text: "El profesional autoriza nombres, contactos, descripciones e imágenes, mantiene datos exactos y acredita derechos. Aprobación manual; verificación o socio oficial solo con comprobación documentada o permiso escrito. Corrección o retirada por correo/denuncia; suspensión o eliminación tras revisión de irregularidades. Registrar cambios importantes; ninguna publicación real." },
        { heading: "Ofertas futuras", text: "Premium y patrocinio desactivados. Sin suscripción ni factura automática. Antes de activar: alcance, precios, duración, renovación, cancelación y reembolsos definidos y validados. Patrocinio identificado aparte; pagar no equivale a verificación." },
      ] },
      advertising: { title: "Política publicitaria", sections: [
        { heading: "Formatos inactivos", text: "Posibles fichas patrocinadas y banners identificados; campañas y espacios desactivados. Formato, fechas y ubicación necesitan revisión manual y jurídica." },
        { heading: "Control y prohibiciones", text: "Verificar identidad, contacto, autorizaciones y derechos. Rechazar fraude, engaño, ilegalidad e infracción. Salud, finanzas, alcohol, juego y contenido adulto quedan desactivados sin revisión especializada documentada." },
        { heading: "Transparencia y retirada", text: "Separar patrocinio de resultados naturales; sin socio oficial sin permiso. Denuncia por correo o formulario. Rechazar, suspender o retirar por falsedad, permiso vencido o incumplimiento." },
      ] },
      report: { title: "Denunciar un problema", sections: [
        { heading: "Tratamiento manual", text: "Ruta, motivo y contexto factual. El formulario prepara un correo, no lo envía. El administrador registra manualmente recepción real y estado en su herramienta preparatoria." },
      ] },
    },
  },
  de: {
    warning: "Entwurf zur Vorbereitung — rechtliche Prüfung und Genehmigungen ausstehend. Keine Bestätigung der Rechtskonformität.",
    missing: "Vor dem kommerziellen Start ergänzen und prüfen",
    operatorLabels: ["Handelsname", "Rechtlicher Betreiber", "Rechtsform", "Geschäftsadresse", "Registrierung", "Steuerangaben", "Kontakt", "Publikationsverantwortlicher", "Hosting und Kontaktdaten"],
    demo: "Beispieleintrag — kein geprüfter Anbieter oder autorisierter Partner. Nicht gesponsert.",
    role: "KHMERA informiert und vermittelt Kontakte. Drittleistungen werden direkt mit dem Anbieter vereinbart und bezahlt. Eigene Khmera-Beratung ist getrennt und benötigt ein schriftliches Angebot.",
    reportLink: "Inhalt melden",
    report: { target: "Inhaltspfad", email: "Antwort-E-Mail (optional)", reason: "Grund", details: "Details (keine sensiblen Dokumente)", consent: "Ich verstehe, dass nur eine E-Mail vorbereitet wird. Ich entscheide selbst, ob ich meine Angaben sende.", prepare: "Meldungs-E-Mail vorbereiten", notice: "NICHT gesendet oder registriert. Senden Sie die E-Mail selbst. Keine automatische Verfolgung oder Eingangsbestätigung; Khmera muss den Eingang manuell bestätigen und registrieren. Bei akuter Gefahr zuständige Behörden kontaktieren.", invalid: "Pfad, E-Mail und Details (20–2000 Zeichen) prüfen.", reasons: ["Nicht existierendes oder betrügerisches Unternehmen", "Falsche Kontaktdaten", "Irreführende Werbung", "Illegaler Inhalt", "Rechte Dritter", "Berichtigung oder Löschung"] },
    pages: {
      about: { title: "Über KHMERA", sections: [
        { heading: "Unsere Rolle in Siem Reap", text: "Information und Kontakte für Zugezogene, Unternehmer und Reisende. Der Marktplatz zeigt gekennzeichnete Beispiele, kein echtes Verzeichnis geprüfter Anbieter." },
        { heading: "Getrennte Tätigkeiten", text: "Keine Verarbeitung von Verträgen, Zahlungen, Warenkörben oder Buchungen zwischen Dritten. Eigene Beratung benötigt ein akzeptiertes schriftliches Angebot. Keine integrierte Zahlung oder automatische Buchung. Premiumeinträge, Werbung und kostenpflichtige Ratgeber bleiben bis zur rechtlichen Prüfung deaktiviert." },
      ] },
      contact: { title: "Kontakt", sections: [
        { heading: "Anfragen und Beschwerden", text: "Kontaktadresse für Informationen, Angebote, Einträge, Datenschutz und Meldungen. Inhaltspfad und Kontext nennen, keine Pass-, Bank- oder sensiblen Daten. Eine E-Mail bestätigt keine Buchung. Antwortfristen und Identitätsprüfungen müssen vor dem Start festgelegt werden." },
      ] },
      "legal-notice": { title: "Impressum", sections: [
        { heading: "Betreiber und Hosting", text: "Nachfolgende Angaben anhand überprüfter Unterlagen ergänzen. Fehlende Felder belegen weder Registrierung noch Lizenz oder Steuerkonformität. Publikationsverantwortlicher, Hostingidentität und Kontakt müssen bestätigt werden; Entwicklung und Produktion können andere Anbieter nutzen." },
      ] },
      terms: { title: "Nutzungsbedingungen", sections: [
        { heading: "Zweck und Zugang", text: "Informationen und Beispiele ansehen. Nur rechtmäßige Nutzung, kein Spam, Identitätsmissbrauch, rechtsverletzende Datenerfassung oder Sicherheitsstörung. Beispiele sind keine bestätigten Angebote." },
        { heading: "Verantwortlichkeiten", text: "Anbieter verantworten Angaben, Genehmigungen, Qualifikationen und Leistungen. Drittverträge und Zahlungen erfolgen direkt. Eigene Beratung erfordert getrennte schriftliche Bedingungen. Keine Garantie für Qualität, Verfügbarkeit, Visa oder Investitionsergebnisse." },
        { heading: "Inhalte und Rechte", text: "Falsche, betrügerische, illegale oder rechtsverletzende Inhalte sind verboten. Nur autorisiertes Material einreichen. Markenrechte, geistiges Eigentum, Bildlizenzen und Quellenangaben beachten." },
        { heading: "Meldung und Moderation", text: "Kontakt oder Meldeformular nutzen, manuelle Bearbeitung ohne automatische Bestätigung oder garantierte Frist. Nach Prüfung Ablehnung, Berichtigung, Sperrung oder Löschung. Echte Veröffentlichung ist deaktiviert." },
        { heading: "Haftung und Streitigkeiten", text: "Beschränkungen nur soweit gesetzlich erlaubt, ohne zwingende Rechte auszuschließen. Versionen datieren und wesentliche Änderungen gegebenenfalls mitteilen. Recht, Gerichtsstand und Streitverfahren müssen lokal in Kambodscha rechtlich geprüft werden." },
      ] },
      privacy: { title: "Datenschutzerklärung", sections: [
        { heading: "Daten und Zwecke", text: "Öffentliche Formulare bereiten E-Mails lokal vor; kein automatischer Versand oder Speicher. Nach Versand verarbeiten beide E-Mail-Anbieter die Inhalte. Admin-Kontakte, Porträts und Entwürfe bleiben im Seitenspeicher; JSON/PDF-Dateien unter Ihrer Kontrolle. Essenzielles signiertes HttpOnly-Admin-Cookie: acht Stunden. Gesendete Angaben dienen Antworten, Angeboten und Meldungen." },
        { heading: "Aufbewahrung und Rechte", text: "Mail- und Logaufbewahrung, Empfänger, Rechtsgrundlagen, internationale Transfers, Garantien und Verfahren für Auskunft, Berichtigung und Löschung benötigen Prüfung. Khmera kontaktieren. Entwürfe verschwinden beim Neuladen; Exporte schützen und löschen. Keine spezifische Konformität behauptet." },
        { heading: "Anbieter und Tracking", text: "Bilder und Schriften lokal; keine Analyse-, Werbetracker, eingebetteten Karten oder Videos, kein künstliches Consent-Banner. E-Mail-Anbieter und externe Links haben eigene Regeln. Hosting, Maildienste, Logs und Länder bestätigen. Künftiges Tracking vor erforderlicher Einwilligung blockieren; Ablehnung, Anpassung und spätere Änderung ermöglichen." },
      ] },
      "listing-terms": { title: "Bedingungen für Unternehmenseinträge", sections: [
        { heading: "Antrag", text: "Kein öffentlicher Selbstservice. Name, Kategorie, Beschreibung, Standort, Kontakt und Publikationserlaubnis an Khmera senden. Website/Bilder optional; Bildrechte, Quellen und nötige Tätigkeitsnachweise bereitstellen." },
        { heading: "Erlaubnis und Kontrolle", text: "Anbieter erlauben Veröffentlichung von Namen, Kontakten, Texten und Bildern, halten Daten aktuell und sichern Rechte. Manuelle Freigabe; geprüft oder offizieller Partner nur mit dokumentierter Kontrolle oder schriftlicher Erlaubnis. Änderung/Entfernung per Kontakt; Sperrung/Löschung nach Prüfung. Wesentliche Änderungen protokollieren; keine echte Veröffentlichung." },
        { heading: "Künftige Angebote", text: "Premium und Sponsoring deaktiviert; kein Abo oder automatische Rechnung. Umfang, Gebühren, Laufzeit, Verlängerung, Kündigung und Erstattung vor Aktivierung definieren und prüfen. Sponsoring getrennt kennzeichnen; Zahlung bedeutet keine Prüfung." },
      ] },
      advertising: { title: "Werberichtlinie", sections: [
        { heading: "Inaktive Formate", text: "Mögliche gekennzeichnete Sponsoreneinträge und Banner. Keine aktiven Kampagnen oder Plätze. Format, Zeitraum und Position manuell und rechtlich prüfen." },
        { heading: "Kontrolle", text: "Identität, Kontakt, Erlaubnisse und Inhaltsrechte prüfen. Betrug, Irreführung, illegale oder rechtsverletzende Werbung ablehnen. Gesundheit, Finanzen, Alkohol, Glücksspiel und Erwachsenenmaterial ohne dokumentierte Fachprüfung deaktiviert." },
        { heading: "Transparenz und Rücknahme", text: "Sponsoring von natürlichen Ergebnissen trennen. Kein offizieller Partner ohne Erlaubnis. Beschwerden über Kontakt oder Formular. Ablehnung, Sperrung und Rücknahme bei Falschangaben, abgelaufener Erlaubnis oder Regelverstoß." },
      ] },
      report: { title: "Problem melden", sections: [
        { heading: "Manuelle Bearbeitung", text: "Pfad, Grund und sachlichen Kontext angeben. Formular bereitet nur E-Mail vor. Admin registriert tatsächlichen Eingang und Bearbeitungsstatus manuell im Vorbereitungstool." },
      ] },
    },
  },
};
