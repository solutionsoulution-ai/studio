
# Prompt pour la Création du Site Web VylsFond

**Objectif :** Créer un site web vitrine, bien designé, animé avec des effets "wouah" subtils, pour mon entreprise qui siège à Lyon, en France, nommée "VylsFond". Le site est destiné à présenter nos solutions de financement (prêts) pour les particuliers et les professionnels. Le ton doit être professionnel, rassurant et moderne.

---

## 1. Stack Technique et Style Général

-   **Framework** : Next.js avec React.
-   **Styling** : Tailwind CSS avec des composants ShadCN UI.
-   **Animations** : Utiliser des animations subtiles pour une expérience "wouah" :
    -   **Fade-in au défilement** : Les sections et les éléments importants (comme les cartes de service) apparaissent en fondu avec une légère translation vers le haut (`opacity: 0, transform: translateY(20px)` à `opacity: 1, transform: translateY(0)`).
    -   **Interactions au survol** : Les cartes et les boutons doivent réagir au survol de la souris (changement de couleur, d'ombre, légère mise à l'échelle) pour donner une impression de dynamisme.
-   **Design** : Épuré, professionnel, avec des coins arrondis, des ombres portées subtiles et une utilisation judicieuse des espaces blancs.

---

## 2. Palette de Couleurs (Charte Graphique)

Utiliser des variables HSL pour les couleurs afin de garantir la cohérence.

-   **Couleur Principale (Primary)** : `hsl(231, 48%, 48%)` (Bleu profond). Utilisée pour les boutons principaux, les titres importants, les icônes.
-   **Texte sur Principal (Primary Foreground)** : `hsl(0, 0%, 98%)` (Presque blanc).
-   **Arrière-plan (Background)** : `hsl(0, 0%, 100%)` (Blanc pur).
-   **Texte Principal (Foreground)** : `hsl(224, 71.4%, 4.1%)` (Noir/bleu très foncé).
-   **Couleur Sourdine / Fond de section (Muted)** : `hsl(220, 14.3%, 95.9%)` (Gris très clair).
-   **Texte Secondaire (Muted Foreground)** : `hsl(220, 8.9%, 46.1%)` (Gris moyen).
-   **Couleur d'Accentuation (Accent)** : `hsl(88, 50%, 59%)` (Vert doux). Utilisée pour les validations, icônes "check".
-   **Couleur Secondaire (Secondary)**: `hsl(220, 14.3%, 95.9%)` (Gris très clair), pour les boutons secondaires.
-   **Texte sur Secondaire (Secondary Foreground)** : `hsl(220, 8.9%, 46.1%)` (Gris moyen).

---

## 3. Éléments de Design Récurrents

-   **Cartes (Cards)** :
    -   **Usage** : Pour présenter services, articles, témoignages.
    -   **Style** : Bords arrondis (`rounded-lg`), bordure fine (`border`), fond blanc (`bg-card`), ombre subtile (`shadow-sm`).
    -   **Interaction** : Au survol, la bordure devient `border-primary` et l'ombre s'intensifie (`hover:shadow-xl`), créant un effet de relief.

-   **Boutons (Buttons)** :
    -   **Principal** : Fond `bg-primary`, texte `text-primary-foreground`. Pour les actions majeures.
    -   **Secondaire** : Fond `bg-secondary`, texte `text-secondary-foreground`.
    -   **"Outline"** : Fond transparent, bordure `border`. Pour les actions moins prioritaires.

---

## 4. Structure et Contenu des Pages Publiques

### Page d'Accueil (`/`)

#### Section 1: Héros (Carrousel)
-   **Carrousel** : Un carrousel qui défile automatiquement toutes les 5 secondes, avec des boutons de navigation "précédent/suivant".
-   **Slide 1 (principal)**:
    -   **Titre**: "Le financement que vous méritez, simplifié"
    -   **Description**: "Crédits, prêts et solutions financières pour particuliers et professionnels. Rapide, transparent et humain."
    -   **Bouton**: "Commencer ma demande" (Principal)
    -   **Image**:
        -   URL : `https://i.postimg.cc/JnYy9vXy/arturo-portillo-NRy3-WM22-Sw-Q-unsplash-removebg-preview.png`
        -   Disposition : Sur grand écran, image à droite du texte. Sur mobile, image au-dessus.
-   **Autres slides (contenu similaire mais images différentes)** :
    -   Slide 2 : Image `https://i.postimg.cc/7YCNSKbG/jonne-makikyro-n-Gp-I-Tvpc-Co-unsplash.jpg` (Poignée de main)
    -   Slide 3 : Image `https://i.postimg.cc/VknBV5qz/fang-guo-R8-SKm0sa-Yu8-unsplash.jpg` (Ville vue du ciel)

#### Section 2: Nos Services
-   **Titre**: "Explorez nos solutions de financement"
-   **Description**: "Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres."
-   **Disposition** : Une grille de 3 cartes de service.
-   **Contenu des cartes**:
    -   **Prêt Entreprise**: "Des solutions pour financer vos investissements, votre croissance et votre trésorerie." - Image: `https://i.postimg.cc/Fzj4LTfS/pret-entreprise.jpg` (en haut de la carte)
    -   **Prêt Immobilier**: "Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif." - Image: `https://i.postimg.cc/SxmyWbfx/pexels-jakubzerdzicki-29799518.jpg` (en haut de la carte)
    -   **Prêt Personnel**: "Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif." - Image: `https://i.postimg.cc/bvVGdwbn/service-personal-loan.jpg` (en haut de la carte)

#### Section 3: Pourquoi Nous Choisir
-   **Titre**: "Pourquoi nous choisir ?"
-   **Description**: "Chez VylsFond, nous combinons technologie et expertise humaine pour vous offrir une expérience de prêt inégalée."
-   **Arguments (3 cartes)**: "Processus 100% en ligne", "Conseils d'experts", "Taux fixe avantageux de 2%".

#### Section 4: Parcours en bref
-   **Titre**: "Notre parcours en bref"
-   **Description**: "De l'idée à la réalité, les étapes qui ont fait de VylsFond ce que nous sommes aujourd'hui."
-   **Disposition**: Une ligne de temps horizontale avec 5 jalons.
-   **Jalons**: "2012: Fondation", "2015: 100M€ Prêtés", "2018: Expansion", "2021: Innovation IA", "2024+: Avenir".

#### Section 5: Témoignages
-   **Titre**: "Ce que disent nos clients"
-   **Description**: "Découvrez les expériences de particuliers et d'entrepreneurs à travers l'Europe qui nous ont fait confiance."
-   **Disposition**: Un carrousel de cartes de témoignages. Chaque carte contient une citation, le nom du client et sa localisation.

#### Section 6: FAQ
-   **Titre**: "Foire aux questions"
-   **Description**: "Vous avez des questions ? Nous avons des réponses."
-   **Disposition**: Un accordéon où chaque question peut être cliquée pour révéler la réponse.
-   **Questions**: "Quelles sont les exigences minimales pour un prêt ?", "Combien de temps dure le processus de demande ?", etc.

---

### Pages de Service (Exemple: Prêt Auto - `/services/pret-auto`)

La structure est similaire pour toutes les pages de service.

-   **Titre**: "Prêt Auto"
-   **Description**: "Financez l'achat de votre véhicule neuf ou d'occasion avec nos solutions de crédit auto."
-   **Points clés**: "Réponse de principe immédiate.", "Financez jusqu'à 100%.", "Pas de frais de dossier cachés."
-   **Image principale**:
    -   URL: `https://i.postimg.cc/QMyhG9GF/pexels-pixabay-210019.jpg`
    -   Disposition: À droite du texte d'introduction sur grand écran.

-   **Section: Pourquoi souscrire ?**
    -   Titre: "Pourquoi souscrire un Prêt Auto ?"
    -   Arguments (3 cartes): "Pour tout type de véhicule", "Taux compétitifs", "Simplicité administrative".

-   **Section: Comment ça marche ?**
    -   Titre: "Comment ça marche ?"
    -   Étapes (3 étapes visuelles): "1. Demande Rapide", "2. Approbation Intelligente", "3. Prenez la Route".

-   **Section: FAQ (spécifique à la page)**
    -   Titre: "Questions Fréquentes - Prêt Auto"
    -   Questions: "Le prêt auto peut-il financer un véhicule d'occasion ?", etc.

---

### Page Blog (`/blog`)

-   **Titre**: "Blog"
-   **Description**: "Nos experts partagent leurs analyses et conseils pour vous aider à naviguer dans le monde du financement."
-   **Disposition**: Une grille de cartes. Chaque carte représente un article et contient :
    -   Image à la une (en haut de la carte)
    -   Titre de l'article
    -   Date et Auteur
    -   Extrait du contenu
    -   Un lien "Lire la suite"

---

### Page Article de Blog (Exemple: `/blog/mon-article`)

-   **Titre de l'article** : Affiché en grand.
-   **Image d'en-tête** : L'image à la une de l'article, affichée en bannière pleine largeur en haut de la page. Le titre et les métadonnées (date, auteur) sont superposés sur un fond assombri pour la lisibilité.
-   **Contenu**:
    -   **Colonne principale (gauche)** : Corps de l'article (texte, listes, citations).
    -   **Colonne latérale (droite)** : Informations sur l'auteur et un appel à l'action pour une demande de prêt.

---

### Page Contact (`/contact`)

-   **Titre**: "Contactez-nous"
-   **Description**: "Une question ? Une demande spécifique ? Notre équipe est à votre écoute."
-   **Disposition** : Deux colonnes.
    -   **Colonne de gauche**: Formulaire de contact (Nom, E-mail, Message, Bouton "Envoyer").
    -   **Colonne de droite**: Coordonnées (email, téléphone, adresse) et horaires d'ouverture.

---

### Pages Légales (ex: `/politique-de-confidentialite`)

-   Ces pages sont principalement textuelles, avec une mise en forme simple (titres H1, H2, paragraphes, listes).
-   Elles doivent se terminer par une section d'appel à l'action pour encourager l'utilisateur à continuer sa navigation sur le site.
