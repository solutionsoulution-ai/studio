# Documentation du Générateur de Documents Capfinfy

Ce document détaille l'architecture technique, le contenu, et les principes de design du système de génération de documents de l'application Capfinfy.

---

## 1. Vue d'ensemble du Système

Le générateur de documents est une application React (Next.js) conçue pour permettre aux utilisateurs de créer des documents financiers et juridiques personnalisés. L'utilisateur choisit un type de document, remplit un formulaire, et peut ensuite générer un PDF professionnel et stylisé.

**Technologies utilisées :**
-   **Next.js & React** : Pour la structure de l'application et le rendu des composants.
-   **TypeScript** : Pour un code robuste et typé.
-   **ShadCN/UI & Tailwind CSS** : Pour une interface utilisateur moderne et un style cohérent.
-   **React Hook Form & Zod** : Pour la gestion et la validation des formulaires.
-   **html2canvas & jsPDF** : Pour la conversion de l'aperçu HTML en document PDF téléchargeable.

---

## 2. Architecture et Structure des Fichiers

Le système est organisé de manière modulaire pour faciliter la maintenance et l'ajout de nouveaux documents.

-   `src/app/documents/`
    -   `page.tsx`: Page principale qui liste tous les documents disponibles.
    -   `[slug]/page.tsx`: Page de génération dynamique pour un document spécifique. Elle utilise `DocumentPageClient.tsx` pour gérer l'état côté client.

-   `src/components/documents/`
    -   `DocumentPageClient.tsx`: Le composant principal côté client qui orchestre le formulaire et l'aperçu, en utilisant un Contexte React pour partager l'état.
    -   `DocumentForm.tsx`: Affiche le formulaire de saisie. Les champs sont générés dynamiquement à partir de `src/lib/document-fields.ts`.
    -   `DocumentPreview.tsx`: Conteneur pour l'aperçu visuel du document.
    -   `templates/`: Dossier contenant les composants React pour chaque modèle de document (ex: `InvoiceTemplate.tsx`). Ces templates sont responsables de la mise en page HTML du document final.
    -   `DocumentWrapper.tsx`: Un composant d'enrobage qui assure une en-tête et un pied de page cohérents pour tous les documents.

-   `src/data/documents/`:
    -   `*-clauses.ts`: Fichiers contenant le contenu textuel (clauses, titres, etc.) pour chaque document, avec support multilingue.
    -   `signature-data.ts`: Centralise les informations sur les signataires (noms, titres, URL des signatures).

-   `src/lib/`
    -   `document-fields.ts`: Définit les champs de formulaire (nom, type, validation) pour chaque type de document.
    -   `languages.ts`: Types pour la gestion multilingue.

-   `src/hooks/`
    -   `use-pdf-generator.ts`: Un hook personnalisé qui contient la logique de `html2canvas` et `jspdf` pour la génération du PDF.

---

## 3. Contenu Détaillé des Documents

Voici le contenu textuel des documents de facturation et de reçu, tel que défini dans les fichiers `*-clauses.ts`.

### 1. Facture (`invoice-clauses.ts`)
```json
{
  "title": "Facture",
  "invoice_number_label": "Facture n°:",
  "date_label": "Date :",
  "due_date_label": "Échéance :",
  "bill_to_label": "Facturé à :",
  "table_headers": {
    "description": "Description",
    "quantity": "Qté",
    "unit_price": "P.U. HT",
    "amount": "Montant HT"
  },
  "subtotal_label": "Sous-total HT",
  "vat_label": "TVA (20%)",
  "total_label": "Net à Payer TTC",
  "payment_terms": {
    "title": "Modalités et Conditions de Paiement",
    "instruction": "Veuillez effectuer le virement sur le compte bancaire suivant :",
    "proof_of_payment": "Afin d'accélérer le traitement, merci d'envoyer une preuve de virement à capfinfy@gmail.com.",
    "account_holder_label": "Titulaire du compte",
    "bank_name_label": "Domiciliation",
    "iban_label": "IBAN",
    "bic_label": "BIC / SWIFT",
    "payment_reason_label": "Motif de virement",
    "payment_reason_value": "Paiement Facture {ref}"
  },
  "footer": {
    "thank_you": "Nous vous remercions de votre confiance.",
    "contact_info": "Pour toute question, contactez notre service comptabilité à contact@capfinfy.com"
  },
  "items_section_title": "Détails de la facturation"
}
```

### 2. Reçu de Paiement (`payment-receipt-clauses.ts`)
```json
{
  "title": "Reçu de Paiement",
  "header": {
    "line1": "Service Comptabilité",
    "line2": "Unité de Suivi des Règlements"
  },
  "reference": "Reçu N°: {ref}",
  "date": "Date du paiement: {payment_date}",
  "received_from": "Reçu de :",
  "payment_details": {
    "title": "Détails du Paiement",
    "amount_label": "Montant Reçu",
    "method_label": "Méthode de Paiement",
    "reference_label": "Pour la référence suivante"
  },
  "confirmation": {
    "title": "Confirmation",
    "content": "Nous soussignés, Capfinfy, confirmons par la présente avoir reçu la somme susmentionnée. Ce reçu atteste du règlement partiel ou total de la créance référencée. Sauf erreur ou omission, ce paiement solde le montant dû."
  },
  "signature_label": "Pour Capfinfy, Service Comptabilité",
  "footer": {
    "thank_you": "Nous vous remercions de votre confiance.",
    "contact_info": "Pour toute question, contactez notre service comptabilité à :",
    "emails": ["contact@capfinfy.com", "capfinfy@gmail.com"]
  }
}
```

---

## 4. Design et Apparence

L'apparence des documents est conçue pour être sobre, professionnelle et alignée avec l'identité de Capfinfy.

-   **Wrapper Commun** (`DocumentWrapper.tsx`):
    -   **En-tête** : Contient le logo textuel "Capfinfy" et les coordonnées de l'entreprise.
    -   **Pied de page** : Affiche un copyright et une mention de confidentialité.
    -   **Typographie** : Utilise la police "Helvetica, Arial, sans-serif" pour une lisibilité maximale sur tous les systèmes.
    -   **Couleurs** : Respecte la palette de couleurs de Capfinfy (bleu principal, gris pour le texte secondaire).

-   **Structure du Contenu** :
    -   Les titres de sections et d'articles sont en majuscules et en gras pour une hiérarchie claire.
    -   Les informations importantes (montants, noms) sont mises en évidence.
    -   Un espacement généreux est utilisé pour aérer le document et faciliter la lecture.

-   **Signatures** :
    -   Les signatures sont des images (`next/image`) chargées depuis les URL spécifiées dans `signature-data.ts`.
    -   Elles sont placées au-dessus d'un filet de signature avec le nom et le titre du signataire.

## 5. Processus de Génération : Comment ça Marche ?

Le système de génération de documents est entièrement orchestré côté client pour offrir un aperçu en temps réel sans nécessiter de rechargement de page.

1.  **Navigation** : L'utilisateur accède à `/documents/[slug]`, où `[slug]` correspond au type de document (ex: `facture`).

2.  **Initialisation** : La page charge le composant `DocumentPageClient` avec le `slug` du document. Ce composant est le cœur du système : il initialise un **Contexte React** (`DocumentGeneratorContext`) qui partagera l'état du formulaire et la langue sélectionnée entre le formulaire de saisie et l'aperçu du document.

3.  **Rendu du Formulaire** (`DocumentForm.tsx`) :
    *   Ce composant lit la configuration des champs depuis `src/lib/document-fields.ts` pour le `slug` actuel.
    *   Il génère dynamiquement les champs de saisie (Inputs, Textareas, etc.) à l'aide de la librairie **React Hook Form**.
    *   Chaque champ est associé à une règle de validation définie avec **Zod**, garantissant que les données saisies sont correctes.

4.  **Rendu de l'Aperçu** (`DocumentPreview.tsx` et `templates/*.tsx`) :
    *   Simultanément, `DocumentPageClient` sélectionne le composant de template approprié (ex: `InvoiceTemplate.tsx`) en fonction du `slug`.
    *   Ce template est rendu à l'intérieur du `DocumentPreview`, qui n'est qu'un simple conteneur.

5.  **Synchronisation des Données en Temps Réel** :
    *   Grâce au Contexte React, chaque modification dans le formulaire (`DocumentForm`) est immédiatement disponible pour le composant de template du document.
    *   Le template (ex: `InvoiceTemplate.tsx`) reçoit les nouvelles données, lit les clauses correspondantes dans les fichiers `src/data/documents/*-clauses.ts`, remplace les placeholders (ex: `{client_name}`) par les données du formulaire, et affiche le résultat instantanément. L'aperçu est donc toujours à jour.

6.  **Génération du PDF** (`usePDFGenerator.ts`) :
    *   Lorsque l'utilisateur clique sur "Générer le PDF", le hook `usePDFGenerator` est appelé.
    *   **html2canvas** prend une "capture d'écran" haute résolution du `div` contenant l'aperçu (`#pdf-content`). L'option `scale: 2` est utilisée pour garantir une image nette.
    *   **jsPDF** prend cette image (convertie en JPEG pour optimiser la taille) et la place dans un document PDF au format A4. Si le contenu est plus long qu'une page, jsPDF gère automatiquement la pagination.
    *   Le fichier PDF final est ensuite proposé au téléchargement dans le navigateur de l'utilisateur.

Ce système permet une expérience utilisateur fluide et interactive, tout en produisant des documents PDF professionnels et de haute qualité.
