
# Guide du Contenu et du Design du Site VylsFond

Ce document détaille les textes, les images et les palettes de couleurs utilisés sur les principales pages publiques du site, à l'exception des pages "À Propos", "Demande de Prêt" et de la section "Banque en Ligne".

---

## 1. Palette de Couleurs

La charte graphique est définie dans le CSS global du projet et utilise des variables HSL pour une flexibilité maximale.

-   **Couleur Principale (Primary)**: `hsl(231, 48%, 48%)`
    -   Description : Un bleu profond et professionnel, utilisé pour les boutons principaux, les icônes, les titres importants et les éléments d'accentuation.
    -   Texte sur la couleur principale (Primary Foreground) : `hsl(0, 0%, 98%)` (Presque blanc)

-   **Couleur Secondaire (Secondary)**: `hsl(220, 14.3%, 95.9%)`
    -   Description : Un gris très clair, utilisé pour les boutons d'action secondaires et certains arrière-plans de cartes.
    -   Texte sur la couleur secondaire (Secondary Foreground) : `hsl(220, 8.9%, 46.1%)` (Gris moyen)

-   **Couleur d'Arrière-plan (Background)**: `hsl(0, 0%, 100%)`
    -   Description : Blanc pur, utilisé comme fond principal pour la majorité du site pour une lisibilité optimale.

-   **Couleur Sourdine (Muted)**: `hsl(220, 14.3%, 95.9%)`
    -   Description : Un gris clair utilisé pour les arrière-plans de section afin de créer une séparation visuelle douce (ex: section Calculateur, Témoignages).

-   **Couleur d'Accentuation (Accent)**: `hsl(88, 50%, 59%)`
    -   Description : Un vert doux et positif, utilisé pour des éléments de validation comme les icônes "check".

-   **Texte Principal (Foreground)**: `hsl(224, 71.4%, 4.1%)`
    -   Description : Un noir/bleu très foncé, utilisé pour le corps du texte principal.

-   **Texte Secondaire (Muted Foreground)**: `hsl(220, 8.9%, 46.1%)`
    -   Description : Un gris moyen utilisé pour les descriptions, les sous-titres et les textes moins importants.

---

## 2. Contenu par Page

### Page d'Accueil

#### Section 1: Héros
-   **Titre**: "Le financement que vous méritez, simplifié"
-   **Description**: "Crédits, prêts et solutions financières pour particuliers et professionnels. Rapide, transparent et humain."
-   **Bouton**: "Commencer ma demande"
-   **Image**:
    -   URL : `https://i.postimg.cc/JnYy9vXy/arturo-portillo-NRy3-WM22-Sw-Q-unsplash-removebg-preview.png`
    -   Disposition : Sur grand écran, l'image est à droite du texte. Sur mobile, elle passe au-dessus du texte.

#### Section 2: Nos Services
-   **Titre**: "Explorez nos solutions de financement"
-   **Description**: "Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres."
-   **Cartes de service**:
    -   **Prêt Entreprise**: "Des solutions pour financer vos investissements, votre croissance et votre trésorerie."
        -   Image: `https://i.postimg.cc/Fzj4LTfS/pret-entreprise.jpg` (Disposition: en haut de la carte)
    -   **Prêt Immobilier**: "Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif."
        -   Image: `https://i.postimg.cc/SxmyWbfx/pexels-jakubzerdzicki-29799518.jpg` (Disposition: en haut de la carte)
    -   **Prêt Personnel**: "Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif."
        -   Image: `https://i.postimg.cc/bvVGdwbn/service-personal-loan.jpg` (Disposition: en haut de la carte)

#### Section 3: Pourquoi Nous Choisir
-   **Titre**: "Pourquoi nous choisir ?"
-   **Description**: "Chez VylsFond, nous combinons technologie et expertise humaine pour vous offrir une expérience de prêt inégalée."
-   **Arguments**:
    -   "Processus 100% en ligne"
    -   "Conseils d'experts"
    -   "Taux fixe avantageux de 2%"

#### Section 4: Parcours en bref
-   **Titre**: "Notre parcours en bref"
-   **Description**: "De l'idée à la réalité, les étapes qui ont fait de VylsFond ce que nous sommes aujourd'hui."
-   **Jalons**: "2012: Fondation", "2015: 100M€ Prêtés", "2018: Expansion", "2021: Innovation IA", "2024+: Avenir"

#### Section 5: Derniers Articles & Partenaires
-   Contenu dynamique géré depuis le système de gestion de contenu (CMS).

#### Section 6: Témoignages
-   **Titre**: "Ce que disent nos clients"
-   **Description**: "Découvrez les expériences de particuliers et d'entrepreneurs à travers l'Europe qui nous ont fait confiance."

#### Section 7: FAQ
-   **Titre**: "Foire aux questions"
-   **Description**: "Vous avez des questions ? Nous avons des réponses. Trouvez des informations sur nos services et processus ci-dessous."
-   **Questions**: "Quelles sont les exigences minimales pour un prêt ?", "Combien de temps dure le processus de demande ?", etc.

---

### Pages de Service

Chaque page de service suit une structure similaire.

#### Exemple: Page Prêt Auto

-   **Titre**: "Prêt Auto"
-   **Description**: "Financez l'achat de votre véhicule neuf ou d'occasion avec nos solutions de crédit auto. Profitez d'une procédure rapide pour prendre la route en toute sérénité."
-   **Points clés**: "Réponse de principe immédiate en ligne.", "Financez jusqu'à 100% du prix d'achat.", "Pas de frais de dossier cachés."
-   **Image principale**:
    -   URL: `https://i.postimg.cc/QMyhG9GF/pexels-pixabay-210019.jpg`
    -   Disposition: Sur grand écran, l'image est à droite du texte d'introduction.

#### Section: Pourquoi souscrire ?
-   **Titre**: "Pourquoi souscrire un Prêt Auto ?"
-   **Arguments**: "Pour tout type de véhicule", "Taux compétitifs", "Simplicité administrative".

#### Section: Comment ça marche ?
-   **Titre**: "Comment ça marche ?"
-   **Étapes**: "1. Demande Rapide", "2. Approbation Intelligente", "3. Prenez la Route".

#### Section: FAQ (statique)
-   **Titre**: "Questions Fréquentes - Prêt Auto"
-   **Questions**: "Le prêt auto peut-il financer un véhicule d'occasion ?", etc.

---

### Page Blog

-   **Titre**: "Blog"
-   **Description**: "Nos experts partagent leurs analyses et conseils pour vous aider à naviguer dans le monde du financement."
-   **Contenu**: Affiche la liste des articles avec leur image à la une, titre, date, auteur, et extrait.
    -   Disposition Image: L'image à la une est affichée en haut de la carte de l'article.

### Page Article de Blog

-   **Titre de l'article**: Dynamique (Titre de l'article depuis le CMS)
-   **Image d'en-tête**: Affiche l'image à la une de l'article en grand format.
    -   Disposition: Bannière en pleine largeur en haut de la page, avec le titre et les métadonnées superposés sur un fond assombri.
-   **Contenu**: Le corps de l'article est affiché dans la colonne principale (à gauche). La colonne latérale (droite) contient des informations sur l'auteur et un appel à l'action.

---

### Page Contact

-   **Titre**: "Contactez-nous"
-   **Description**: "Une question ? Une demande spécifique ? Notre équipe est à votre écoute."
-   **Contenu**: La page est divisée en deux colonnes.
    -   **Colonne de gauche**: Contient le formulaire de contact.
    -   **Colonne de droite**: Affiche les coordonnées (email, téléphone, adresse) et les horaires d'ouverture.

---

### Pages Légales (Conditions Générales, Politique de Confidentialité)

-   Ces pages contiennent principalement du texte juridique structuré avec des titres et des paragraphes. Elles n'ont pas d'images spécifiques.
-   Elles se terminent par une section d'appel à l'action pour encourager l'utilisateur à poursuivre sa navigation.
