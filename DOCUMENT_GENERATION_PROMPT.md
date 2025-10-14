
# Prompt pour la Création d'un Générateur de Documents Juridiques et Financiers

**Objectif :** Créer un système de génération de documents financiers et juridiques intégré à une application React (Next.js). Ce système doit permettre aux utilisateurs de sélectionner un type de document, de remplir un formulaire avec les données nécessaires, et de visualiser/télécharger un document PDF stylisé et professionnel.

---

## 1. Contexte Général et Informations Clés

- **Nom de l'entreprise :** Capfinfy
- **Localisation :** Lyon, France
- **Email de contact :** contact@capfinfy.com
- **Site web :** www.capfinfy.com
- **Cadres dirigeants pour signatures :**
    - **Directeur Général :** Alexandre Dubois
    - **Directeur Juridique :** David Rousseau
    - **Directeur Financier :** Julien Moreau
    - **Directeur d'Analyse Financière :** Benoît Leroy
    - **Directrice des Assurances :** Isabelle Petit

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
- **Police :** Utiliser une police de caractères professionnelle et lisible comme "Inter" ou une police serif comme "Georgia" pour le corps du texte.
- **Logo :** Intégrer un logo textuel "Capfinfy" ou une icône simple (`Landmark` de `lucide-react`) en haut du document.
- **En-têtes et Pieds de page :** Les documents doivent avoir des en-têtes clairs (avec logo, titre du document) et des pieds de page discrets (nom de l'entreprise, numéro de page, confidentialité).
- **Structure :** Utiliser des marges généreuses, une hiérarchie de titres claire et une typographie soignée pour une lisibilité maximale.

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
    -   `signature-data.ts`: Fichier centralisant les noms et titres des signataires.
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
    -   Un formulaire dynamique avec des champs correspondant aux variables du document sélectionné (ex: `borrower_name`, `loan_amount`).
    -   Utiliser `react-hook-form` avec `zod` pour la validation des données.
    -   Un sélecteur de langue (Français, Anglais, etc.).
    -   Un bouton "Générer le PDF" qui déclenche la conversion HTML vers PDF.
2.  **Colonne de Droite : L'Aperçu (`DocumentPreview.tsx`)**
    -   Un aperçu en temps réel du document qui se met à jour à mesure que l'utilisateur remplit le formulaire.
    -   Le contenu de l'aperçu est rendu par un composant de template spécifique (ex: `LoanContractTemplate.tsx`).
    -   L'aperçu doit être contenu dans un `div` avec un `id` spécifique (ex: `pdf-content`) pour que le générateur PDF puisse le cibler.

---

## 4. Données et Contenu des Documents

Le contenu textuel de chaque document (les "clauses") doit être externalisé dans des fichiers de données pour supporter la multi-langue.

### Exemple de structure pour `loan-contract-clauses.ts`:
```typescript
export const loanContractClauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        articles: {
            object: {
                title: "ARTICLE 1 : OBJET DU PRÊT",
                content: "Le Prêteur, {lender_name}, consent par les présentes à l'Emprunteur, {borrower_name}, qui accepte, un prêt d'un montant total de {loan_amount}..."
            },
            // ... autres articles
        }
    },
    en: { /* Version anglaise... */ }
};
```
-   Les variables comme `{borrower_name}` seront remplacées dynamiquement par les données du formulaire.

### Types de Documents à Implémenter :
1.  **Reconnaissance de Dette**
2.  **Attestation d'Éligibilité**
3.  **Contrat de Prêt Personnel**
4.  **Acte de Cautionnement Solidaire**
5.  **Attestation d'Assurance Emprunteur**
6.  **Notice d'Information d'Assurance**
7.  **Facture**
8.  **Document Vierge**

Pour chaque document, il faudra créer un fichier de clauses et un composant de template React correspondant.

---

## 5. Fonctionnalité de Génération PDF

-   Créer un hook `usePDFGenerator` qui encapsule la logique de `html2canvas` et `jspdf`.
-   Le hook doit exposer une fonction `generatePDF` et un état `isLoading`.
-   La fonction `generatePDF` prendra l'ID de l'élément HTML à convertir (ex: `pdf-content`).
-   **Qualité :** Configurer `html2canvas` avec une échelle (`scale: 2`) pour garantir une haute résolution du PDF généré.
-   **Format :** Le PDF doit être généré au format A4.

Ce prompt fournit un cahier des charges complet pour la création d'un système de génération de documents robuste, maintenable et aligné avec l'identité visuelle de **Capfinfy**.
