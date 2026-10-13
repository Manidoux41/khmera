# Plan d'action de lancement Khmera — Siem Reap

## Objectif des deux premières semaines

Présenter le rôle de mise en relation de Khmera, rencontrer des partenaires locaux et
obtenir les premières demandes qualifiées. Objectifs de travail, non garantis :
identifier 15 structures pertinentes, contacter individuellement 10 d'entre
elles, organiser 3 échanges et définir 1 pilote si les conditions sont réunies.

Le lancement cible Siem Reap, Angkor et leurs environs : futurs expatriés,
entrepreneurs et voyageurs. Les autres destinations sont secondaires, sur devis.

## Kit prêt à utiliser

- **Présentation d'une page, privée** : connectez-vous à l'administration puis
  ouvrez « Présentation partenaires — aperçu et impression ». Le bouton permet
  d'enregistrer uniquement la fiche en PDF A4. Désactiver les en-têtes et pieds
  de page du navigateur pour une fiche propre. Cette fiche s'adresse aux agences
  de voyages, guesthouses, hôtels et agences immobilières de Siem Reap, pas aux
  clients finaux : elle présente les besoins des futurs clients et la mise en
  relation envisagée, sans afficher les honoraires d'accompagnement clients.
- **Démonstration simple** : section « Une démonstration du site en trois minutes »
  sur cette page privée. Elle ouvre les pages publiques réelles du site.
- **Contact partenaires** : échange direct par e-mail. Le formulaire préparant
  un e-mail reste dans la page d'administration, pour un usage accompagné ;
  il n'est pas accessible aux partenaires depuis le site public.
- **Contact provisoire actif** : `manfredparbatia@gmail.com`.
- **Versions internationales** : sélecteur FR/EN/ES/DE dans la page privée.
- **Répertoire privé** : « Gérer le répertoire privé » dans le tableau de bord.
  Ajouter, modifier, supprimer et filtrer vos contacts. Catégories cumulables :
  touristes, retraités, apporteurs d'affaires et partenaires. Exporter le JSON
  avant de quitter ; réimporter pour reprendre. Aucun stockage serveur.

Ces pages doivent être redéployées avant de partager les liens de production.
Les anciennes adresses publiques `/{locale}/partners` renvoient désormais 404.
Partagez uniquement le PDF et l'adresse de l'accueil public avec les partenaires.
L'administration n'est pas une démonstration publique : ne jamais partager son
lien secret, son mot de passe ou des informations sur les sessions.

## Adresse professionnelle : préparation, pas boîte déjà créée

Adresse cible : **`partenaires@<votre-domaine>`**, avec éventuellement
`contact@<votre-domaine>` comme alias. Ces exemples ne sont pas des adresses
opérationnelles. Aucun domaine n'a été acheté et aucun compte mail n'a été créé.

1. Choisir un domaine disponible, vérifier le nom et le coût de renouvellement.
2. Choisir un fournisseur de messagerie compatible avec ce domaine : par exemple
   Google Workspace, Microsoft 365 ou un hébergeur proposant des boîtes mail.
   Vérifier ses tarifs et ses conditions avant de souscrire.
3. Créer une véritable boîte `partenaires`, pas seulement une adresse affichée
   ou une redirection. Activer l'authentification multifacteur.
4. Publier les enregistrements MX, SPF et DKIM fournis par le prestataire.
   Ne pas créer plusieurs enregistrements SPF concurrents.
5. Configurer DMARC selon les instructions du prestataire, d'abord en
   observation, puis renforcer la politique après vérification des envois.
6. Tester réception, réponse et envoi vers Gmail et Outlook. Vérifier
   l'authentification et le classement en courrier indésirable.
7. Une fois la boîte fonctionnelle, remplacer le contact partagé `bookingEmail`
   dans [le registre des offres](../lib/services/offers.ts), adapter le texte
   « adresse actuelle » dans [les traductions partenaires](../lib/partners/copy.ts),
   mettre à jour les tests de destinataire, reconstruire et redéployer.
   Ce contact est partagé par les demandes clients et partenaires ; si deux
   destinataires sont nécessaires, les séparer explicitement à ce moment-là.

Ne jamais mettre le mot de passe de la boîte dans le code. Le formulaire actuel
utilise `mailto:` : aucun identifiant SMTP ni fournisseur d'envoi n'est requis.

Signature provisoire :

```text
Manfred Parbatia
Créateur de KHMERA — Siem Reap
Accompagnement installation, projet business et préparation de voyage
manfredparbatia@gmail.com
https://khmera.vercel.app/fr
```

## Calendrier de lancement

| Période | Action | Livrable / critère de réussite |
| --- | --- | --- |
| J1 | Redéployer, vérifier la protection admin et relire les pages publiques FR/EN | Fiche privée après connexion, anciennes URL partenaires en 404 |
| J2 | Imprimer la fiche A4, répéter la démo, tester le formulaire | PDF d'une page ; e-mail reçu après envoi manuel de test |
| J3 | Choisir domaine et messagerie, lancer leur configuration | Domaine et prestataire choisis ; ne pas annoncer une boîte non testée |
| J3–J4 | Identifier 15 agences de voyages, guesthouses, hôtels et agences immobilières à Siem Reap | Liste privée : structure, activité, contact public, intérêt potentiel |
| J5–J7 | Contacter 10 structures individuellement | Présentation courte, fiche et proposition d'un échange de 15 minutes |
| J8–J10 | Effectuer les échanges et noter besoins et objections | Viser 3 conversations ; clarifier qui rend quelle prestation |
| J11–J12 | Définir un petit pilote avec une structure intéressée | Accord écrit : périmètre, responsabilités, consentement, éventuelle rémunération |
| J13–J14 | Faire le bilan et ajuster le discours | Demandes, réponses, échanges, devis et ventes réellement confirmées |

Consigner le suivi dans le répertoire privé de l'administration : structure,
interlocuteur, catégories ; notes pour date de contact, statut et prochaine action.
Exporter le JSON sur votre appareil pour le conserver, puis réimporter au prochain
usage. Ne pas intégrer ces données personnelles au dépôt ou au site public.
Relancer une seule fois après 5 à 7 jours,
sans automatiser des sollicitations massives.

## Démonstration de trois minutes

1. **0:00–0:45 — Accueil** : présenter la priorité Siem Reap et les quatre langues.
2. **0:45–1:30 — Offres** : expliquer les projets des futurs clients et les
   limites de l'accompagnement. Les tarifs sont ceux des clients de Khmera,
   pas une cotisation partenaire ni les prix des prestations locales.
3. **1:30–2:30 — Voyage découverte** : utiliser des données fictives
   (`demo@example.test`), préparer l'e-mail et montrer sa langue.
   **Ne pas cliquer sur l'envoi dans la messagerie** : aucune réservation ni
   aucun paiement n'est réalisé.
4. **2:30–3:00 — Partenaires** : expliquer le parcours envisagé : Khmera précise
   les besoins, obtient l'accord du client et effectue une introduction manuelle.
   Le partenaire propose ses services et contractualise directement avec le client.
   Proposer un échange de 15 minutes et montrer le formulaire de contact, sans
   prétendre qu'un partenariat est déjà conclu ni promettre un volume de clients.

Les annonces et témoignages fictifs ne doivent pas servir de preuve de ventes,
de partenaires vérifiés ou de résultats clients.

## Premier message de prospection

```text
Objet : Échange autour de Khmera à Siem Reap

Bonjour [nom],

Je suis Manfred, créateur de Khmera. Je prépare un réseau de professionnels
locaux pour mettre nos futurs clients en contact avec des services adaptés à
leur voyage ou à leur installation à Siem Reap.

Votre activité [raison précise et réelle] pourrait être complémentaire.
Je souhaiterais comprendre vos services et discuter d'un petit pilote de mise
en relation, avec l'accord du client. Vous resteriez responsable de votre offre,
de vos tarifs et du contrat conclu directement avec le client. Les modalités
commerciales éventuelles restent à définir ensemble, sans engagement à ce stade.

Vous trouverez une présentation d'une page en pièce jointe.
Notre site public : https://khmera.vercel.app/fr
Seriez-vous disponible pour un échange de 15 minutes ?

Bien cordialement,
Manfred Parbatia
```

## Avant toute première vente ou mise en relation

- Confirmer la capacité à délivrer l'offre et établir un devis écrit :
  prestation, dates, prix final, taxes éventuelles, paiement et annulation.
- Vérifier les obligations locales applicables avec des professionnels qualifiés.
- Ne promettre ni visa, ni investissement rentable, ni volume de clients.
- Ne partager des coordonnées clients avec un partenaire qu'avec un consentement
  approprié et un périmètre défini.
- Ne publier logos, noms de partenaires ou témoignages réels qu'avec autorisation.
- Le site ne stocke pas ces demandes sur le serveur, ne les envoie pas automatiquement
  et n'encaisse pas de paiements. Saisir manuellement les contacts utiles dans le
  répertoire temporaire et conserver ses exports JSON privés.
