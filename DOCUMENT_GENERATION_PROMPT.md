# Prompt pour la Création d'un Générateur de Documents Juridiques et Financiers pour Capfinfy

**Objectif :** Créer un système de génération de documents financiers et juridiques intégré à une application React (Next.js). Ce système doit permettre aux utilisateurs de sélectionner un type de document, de remplir un formulaire avec les données nécessaires, et de visualiser/télécharger un document PDF stylisé et professionnel respectant l'identité de l'entreprise Capfinfy.

---

## 1. Contexte Général et Informations Clés

- **Nom de l'entreprise :** Capfinfy
- **Localisation :** Lyon, France
- **Email de contact :** contact@capfinfy.com
- **Site web :** www.capfinfy.com
- **Cadres dirigeants pour signatures (centralisés dans `signature-data.ts`) :**
    - **Directeur Général :** Alexandre Dubois
    - **Directeur Juridique :** David Rousseau
    - **Directeur Financier :** Julien Moreau
    - **Directeur d'Analyse Financière :** Benoît Leroy
    - **Directrice des Assurances :** Isabelle Petit
- **URL des signatures (dans `signature-data.ts` également) :**
    - `https://i.postimg.cc/RVTGjX3p/signature-alexandre-dubois.png`
    - `https://i.postimg.cc/T1Mdkb2Q/signature-david-rousseau.png`
    - `https://i.postimg.cc/nLp5M65x/signature-julien-moreau.png`
    - `https://i.postimg.cc/TydC5VfH/signature-benoit-leroy.png`
    - `https://i.postimg.cc/Y0G3BbrV/signature-isabelle-petit.png`

---

## 2. Palette de Couleurs et Style Visuel

Le design des documents doit être sobre, professionnel et impérativement respecter la charte graphique suivante.

### Palette Hexadécimale :
- **Couleur Principale (Bleu) :** `#3d5afe`
- **Texte Principal (Noir/Bleu foncé) :** `#09090b`
- **Texte Secondaire (Gris moyen) :** `#707079`
- **Fonds de section / Bordures (Gris clair) :** `#f4f4f5`
- **Texte sur fond principal (Blanc) :** `#fafafa`
- **Couleur d'Accentuation (Vert) :** `#8ef95a`
- **Arrière-plan (Blanc pur) :** `#ffffff`

### Application du Style :
- **Police :** Utiliser une police de caractères professionnelle et lisible comme "Inter".
- **Logo :** Intégrer un logo textuel "Capfinfy" ou une icône simple (`Landmark` de `lucide-react`) en haut à gauche du document.
- **En-têtes et Pieds de page :** Les documents doivent avoir des en-têtes clairs (logo, titre du document) et des pieds de page discrets (nom de l'entreprise, numéro de page, confidentialité).
- **Structure :** Utiliser des marges généreuses, une hiérarchie de titres claire et une typographie soignée pour une lisibilité maximale. Les titres d'articles doivent être en majuscules.
- **Signatures :** Les signatures doivent être affichées sous forme d'image (`next/image`) en utilisant les URL fournies dans `signature-data.ts`.

---

## 3. Architecture Technique et Composants

Le système doit être développé en **React avec TypeScript** et utiliser les composants de **ShadCN/UI**.

### Structure des Fichiers :
-   `src/app/documents/`
    -   `page.tsx`: Page principale listant les documents disponibles.
    -   `[slug]/page.tsx`: Page dynamique pour générer un document spécifique.
    -   `layout.tsx`: Layout pour la section des documents.
-   `src/components/documents/`
    -   `DocumentGenerator.tsx`: Composant principal qui gère la logique de génération.
    -   `DocumentForm.tsx`: Affiche le formulaire dynamique basé sur le type de document.
    -   `DocumentPreview.tsx`: Affiche l'aperçu HTML du document à générer.
    -   `templates/`: Dossier contenant les composants de template pour chaque type de document (ex: `LoanContractTemplate.tsx`).
-   `src/data/documents/`:
    -   Fichiers de clauses pour chaque document (ex: `loan-contract-clauses.ts`).
    -   `signature-data.ts`: Fichier centralisant les noms, titres **et URL de signature** des signataires.
-   `src/hooks/use-pdf-generator.ts`: Un hook personnalisé qui utilise `html2canvas` et `jspdf` pour convertir le contenu HTML en PDF.

### Page Principale (`/documents`)

-   **Description :** Une page sobre qui présente les différents types de documents disponibles sous forme de grille de cartes.
-   **Chaque carte doit contenir :**
    -   Le titre du document (ex: "Contrat de Prêt").
    -   Une courte description de son utilité.
    -   Un bouton "Générer" qui mène vers la page de génération (ex: `/documents/contrat-de-pret`).

### Page de Génération (`/documents/[slug]`)

Cette page doit être organisée en deux colonnes sur grand écran :
1.  **Colonne de Gauche : Le Formulaire (`DocumentForm.tsx`)**
    -   Un formulaire dynamique avec des champs correspondant aux variables du document sélectionné.
    -   Utiliser `react-hook-form` avec `zod` pour la validation.
    -   Un sélecteur de langue (Français, Anglais, Allemand, etc.).
    -   Un bouton "Générer le PDF".
2.  **Colonne de Droite : L'Aperçu (`DocumentPreview.tsx`)**
    -   Un aperçu en temps réel du document qui se met à jour à mesure que l'utilisateur remplit le formulaire.
    -   Le contenu de l'aperçu est rendu par un composant de template spécifique.
    -   L'aperçu doit être contenu dans un `div` avec un `id` spécifique (ex: `pdf-content`).

---

## 4. Données et Contenu des Documents

Le contenu de chaque document doit être externalisé dans des fichiers de données pour supporter la multi-langue.

### 4.1 Types de Documents à Implémenter :
1.  **Reconnaissance de Dette**
2.  **Attestation d'Éligibilité**
3.  **Contrat de Prêt Personnel**
4.  **Acte de Cautionnement Solidaire**
5.  **Attestation d'Assurance Emprunteur**
6.  **Notice d'Information d'Assurance**
7.  **Facture**
8.  **Document Vierge**

### 4.2 Contenu Détaillé par Document

#### 1. Reconnaissance de Dette (`debt-recognition-clauses.ts`)
- **Signataire Capfinfy :** David Rousseau (Directeur Juridique)
- **Contenu (fr) :**
  ```json
  {
      "title": "Reconnaissance de Dette",
      "department": "Département Juridique & Financier",
      "reference": "Référence du document : {ref}",
      "importance": {
          "title": "Importance de ce document",
          "description": "Cet acte est une preuve juridique formelle qui constate l'existence et les modalités d'une dette entre deux parties."
      },
      "introduction": "Je soussigné(e), {borrower_name}, demeurant à {borrower_address}, reconnais par la présente devoir la somme décrite ci-dessous à Capfinfy.",
      "acknowledgment": "Je reconnais avoir reçu de la part de {lender_name}, sous forme de prêt en date du {loan_date}, la somme de {loan_amount} ({loan_amount_in_words}). Ce prêt a été consenti sans intérêt.",
      "repayment": "Je m'engage formellement à rembourser intégralement cette somme en un seul versement au plus tard le {repayment_deadline}.",
      "interest_clause": "À défaut de remboursement à l'échéance convenue, cette somme portera intérêt au taux légal en vigueur.",
      "legal_value": "La présente reconnaissance de dette est établie pour servir et valoir ce que de droit.",
      "signature_preamble": "Fait à {signature_location}, le {signature_date}, en deux exemplaires originaux.",
      "borrower_signature_label": "L'Emprunteur (le Débiteur)",
      "lender_signature_label": "Le Prêteur (le Créancier)"
  }
  ```

#### 2. Attestation d'Éligibilité (`eligibility-certificate-clauses.ts`)
- **Signataire Capfinfy :** Benoît Leroy (Directeur d'Analyse Financière)
- **Contenu (fr) :**
  ```json
  {
      "title": "Attestation d'Éligibilité au Financement",
      "department": "Département Analyse de Crédit",
      "location_and_date": "Fait à Lyon, le {date}",
      "reference": "Référence : {ref}",
      "importance": {
          "title": "Importance de ce document",
          "description": "Cette attestation est une validation préliminaire de votre capacité d'emprunt. Elle vous permet de prouver votre sérieux auprès de tiers (agents immobiliers, vendeurs, etc.)."
      },
      "introduction": "Nous soussignés, Capfinfy, attestons par la présente que, sur la base des informations fournies, le bénéficiaire : {beneficiary_name}, demeurant à {beneficiary_address}, présente un profil lui permettant d'être éligible à une solution de financement.",
      "eligibility_statement": "Le montant de financement pour lequel le bénéficiaire est jugé éligible s'élève à {amount}.",
      "conditions": "Cette attestation est valable 30 jours à compter de sa date d'émission ({validity_end_date}) et est fournie sous réserve de la vérification des documents originaux.",
      "conclusion": "Cette attestation ne constitue pas une offre de prêt ferme. L'octroi définitif reste conditionné à l'étude approfondie du dossier."
  }
  ```

#### 3. Contrat de Prêt Personnel (`loan-contract-clauses.ts`)
- **Signataire Capfinfy :** Alexandre Dubois (Directeur Général)
- **Contenu (fr) :**
  ```json
  {
      "title": "CONTRAT DE PRÊT PERSONNEL",
      "department": "Département Juridique & Financier",
      "reference": "Référence du contrat : {ref}",
      "parties": { "title": "ENTRE LES SOUSSIGNÉS", "lender": "LE PRÊTEUR :", "borrower": "L'EMPRUNTEUR :" },
      "articles": {
          "object": { "title": "ARTICLE 1 : OBJET DU PRÊT", "content": "Le Prêteur, {lender_name}, consent un prêt de {loan_amount} ({loan_amount_in_words}) à l'Emprunteur, {borrower_name}." },
          "repayment": { "title": "ARTICLE 4 : DURÉE ET MODALITÉS DE REMBOURSEMENT", "content": "Le prêt est remboursable en {loan_term_months} mensualités de {monthly_payment} chacune, à compter du {repayment_start_date}." },
          "default": { "title": "ARTICLE 7 : DÉFAUT DE PAIEMENT", "content": "En cas de non-paiement de deux (2) échéances consécutives, la totalité des sommes dues deviendra immédiatement exigible." },
          "jurisdiction": { "title": "ARTICLE 10 : LOI APPLICABLE ET JURIDICTION", "content": "Le présent contrat est soumis au droit français. Tout litige sera de la compétence exclusive des tribunaux de Lyon." }
      },
      "signature_preamble": "Fait à {location}, le {date}, en deux exemplaires originaux."
  }
  ```

#### 4. Acte de Cautionnement Solidaire (`surety-bond-clauses.ts`)
- **Signataire Capfinfy :** David Rousseau (Directeur Juridique)
- **Contenu (fr) :**
  ```json
  {
      "title": "Acte de Cautionnement Solidaire",
      "department": "Département Juridique & Garanties",
      "reference": "Référence : {ref}",
      "parties": { "lender_label": "Le Créancier :", "borrower_label": "Le Débiteur Principal :", "guarantor_label": "La Caution :" },
      "articles": {
          "commitment": { "title": "ARTICLE 1 : ENGAGEMENT DE LA CAUTION", "content": "La Caution, {guarantor_name}, déclare se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt consenti par {lender_name}." },
          "scope": { "title": "ARTICLE 3 : ÉTENDUE DE LA GARANTIE", "content": "L'engagement porte sur le principal, intérêts, et frais, dans la limite de {loan_amount} majoré des accessoires. La caution déclare renoncer aux bénéfices de discussion et de division." }
      },
      "handwritten_mention": {
          "title": "ARTICLE 6 : MENTION MANUSCRITE OBLIGATOIRE",
          "instruction": "(La caution doit recopier de sa main le texte suivant)",
          "content": "En me portant caution de {borrower_name} dans la limite de la somme de {loan_amount} ({loan_amount_in_words}) couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de l'engagement, je m'engage à rembourser au prêteur, {lender_name}, les sommes dues sur mes revenus et mes biens si {borrower_name} n'y satisfait pas lui-même."
      },
      "signature_preamble": "Fait à {location}, le {date}."
  }
  ```

#### 5. Attestation d'Assurance Emprunteur (`insurance-certificate-clauses.ts`)
- **Signataire Capfinfy :** Isabelle Petit (Directrice des Assurances)
- **Contenu (fr) :**
  ```json
  {
      "title": "Attestation d'Assurance Emprunteur",
      "department": "Capfinfy Assurance",
      "reference": "N° d'attestation : {ref}",
      "introduction": "Capfinfy Assurance atteste que l'assuré {insured_name} est couvert par le contrat d'assurance groupe n°789-101112 pour le prêt n°{loan_id_label}.",
      "insured_label": "Assuré(e)",
      "capital_label": "Capital initialement assuré",
      "coverage_summary": "Résumé des Garanties Couvertes",
      "guarantees": {
          "death": { "title": "Décès", "description": "Remboursement du capital restant dû." },
          "disability": { "title": "Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Remboursement du capital restant dû." },
          "incapacity": { "title": "Incapacité Temporaire Totale de travail (ITT)", "description": "Prise en charge des échéances du prêt après une franchise de 90 jours." }
      },
      "conclusion": "Fait à Lyon, le {signature_date}.",
      "director_title": "Directrice des Assurances"
  }
  ```

#### 6. Notice d'Information d'Assurance (`insurance-notice-clauses.ts`)
- **Document informatif, pas de signataire.**
- **Contenu (fr) :**
  ```json
  {
      "title": "Notice d'Information",
      "subtitle": "Contrat d'Assurance Emprunteur Groupe n°789-101112",
      "introduction": "La présente notice a pour objet de vous informer des principales caractéristiques de votre assurance emprunteur. Elle n'a pas de valeur contractuelle.",
      "guarantees": {
          "title": "ARTICLE 1 : GARANTIES PROPOSÉES",
          "items": {
              "death": { "title": "Décès", "description": "En cas de décès de l'assuré, l'assureur rembourse le capital restant dû." },
              "disability": { "title": "PTIA", "description": "Si l'assuré est en PTIA, l'assureur rembourse le capital restant dû." },
              "incapacity": { "title": "ITT", "description": "En cas d'arrêt de travail, l'assureur prend en charge les échéances du prêt après une franchise." }
          }
      },
      "exclusions": {
          "title": "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
          "items": [
              "Le suicide de l'assuré la première année.",
              "Les conséquences de faits de guerre ou d'émeutes.",
              "La pratique de sports à titre professionnel."
          ]
      },
      "waiver": {
          "title": "ARTICLE 4 : DROIT DE RENONCIATION",
          "description": "Vous disposez de 30 jours pour renoncer à votre adhésion par lettre recommandée."
      }
  }
  ```

#### 7. Facture (`invoice-clauses.ts`)
- **Signataire Capfinfy :** Julien Moreau (Directeur Financier)
- **Contenu (fr) :**
  ```json
  {
      "title": "Facture",
      "invoice_number_label": "Facture n°:",
      "date_label": "Date :",
      "bill_to_label": "Facturé à :",
      "table_headers": { "description": "Description", "amount": "Montant" },
      "total_label": "Net à Payer",
      "payment_terms": {
          "title": "Modalités de Paiement",
          "due_date": "Paiement dû sous 30 jours.",
          "iban_label": "Veuillez utiliser les coordonnées bancaires suivantes :"
      }
  }
  ```

#### 8. Document Vierge (`blank-document-clauses.ts`)
- **Document générique, pas de signataire.**
- **Contenu (fr) :**
  ```json
  {
      "title": "Titre du Document",
      "department": "Département Juridique & Financier",
      "importance": {
          "title": "Importance de ce document",
          "description": "Ce document sert de modèle de base. Son importance sera définie par le contenu que vous y ajouterez."
      },
      "placeholder": "Le contenu de ce document est en cours de définition.",
      "footer": "Capfinfy © {current_year} - Tous droits réservés."
  }
  ```

---

## 5. Fonctionnalité de Génération PDF

-   Créer un hook `usePDFGenerator` qui encapsule la logique de `html2canvas` et `jspdf`.
-   Le hook doit exposer une fonction `generatePDF` et un état `isLoading`.
-   **Qualité :** Configurer `html2canvas` avec une échelle (`scale: 2`) pour garantir une haute résolution du PDF généré.
-   **Format :** Le PDF doit être généré au format A4.

Ce prompt fournit un cahier des charges complet pour la création d'un système de génération de documents robuste, maintenable et aligné avec l'identité visuelle de **Capfinfy**.
