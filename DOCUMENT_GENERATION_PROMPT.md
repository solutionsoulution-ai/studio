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
- **URL des signatures (à intégrer dans `signature-data.ts`) :**
    - `https://i.postimg.cc/jq1H8SMP/signature-5.png`
    - `https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png`
    - `https://i.postimg.cc/fLt4Yb2Q/signature-3.png`
    - `https://i.postimg.cc/8z0KBqy8/signature-9.png`
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
8.  **Reçu de Paiement**
9.  **Licence Bancaire**
10. **Autorisation de Courtage**
11. **Document Vierge**

### 4.2 Contenu Détaillé par Document

#### 1. Reconnaissance de Dette (`debt-recognition-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "header": {
            "line1": "Service Financier Européen",
            "line2": "Département Juridique et des Garanties • Unité de Formalisation des Engagements"
        },
        "title": "Reconnaissance de Dette pour un Prêt",
        "reference": "Document N°: {ref}",
        "date": "Date: {date}",
        "parties": {
            "title": "Entre les soussignés :",
            "creditor_label": "Le Créancier :",
            "debtor_label": "Le Débiteur :"
        },
        "articles": {
            "recognition": {
                "title": "Article 1 : Reconnaissance de la Dette",
                "content": "Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à Capfinfy, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un prêt de type '{type_of_loan}' qui m'a été accordé et dont je confirme avoir reçu les fonds."
            },
            "repayment": {
                "title": "Article 2 : Modalités de Remboursement",
                "content": "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de prêt N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier."
            },
            "default": {
                "title": "Article 3 : Clause de Défaut",
                "content": "En cas de non-paiement d'une ou plusieurs échéances, je reconnais que le Créancier pourra se prévaloir des clauses prévues dans le contrat de prêt, y compris l'exigibilité anticipée de la totalité du capital restant dû, majoré des intérêts et pénalités applicables."
            },
            "mention": {
                "title": "Article 4 : Compréhension de l'Engagement",
                "content": "L'article L. 313-24 du Code de la consommation stipule l'importance de l'engagement. Le débiteur reconnaît avoir lu et compris l'intégralité du contrat de prêt auquel cette reconnaissance de dette se rapporte et avoir reçu un exemplaire de chaque document."
            }
        }
    }
}
  ```
- **Formulaire :**
    - Référence du document (Texte)
    - Date d'émission (Date)
    - Nom du débiteur (Texte)
    - Adresse du débiteur (Texte)
    - N° Pièce d'identité du débiteur (Texte)
    - Type de prêt concerné (Texte)
    - Référence du Contrat de Prêt (Texte)
    - Montant du prêt (€) (Nombre)
    - Montant en toutes lettres (Texte)
    - Durée du prêt (mois) (Nombre)

#### 2. Attestation d'Éligibilité (`eligibility-certificate-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "header": {
            "line1": "Département d'Analyse Financière",
            "line2": "Unité de Certification de Solvabilité"
        },
        "title": "Certificat de Solvabilité Pré-approuvée pour un projet de {project_type}",
        "reference": "Certificat N°: {ref}",
        "validity": "Valide jusqu'au: {validity_date}",
        "beneficiary": {
            "title": "Bénéficiaire du certificat :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet du Certificat",
                "content": "Capfinfy, agissant en tant qu'intermédiaire financier, certifie par la présente avoir procédé à une analyse préliminaire de la situation financière du bénéficiaire susmentionné. Sur la base des éléments déclarés et en l'état actuel de nos critères d'évaluation, le bénéficiaire est jugé éligible à un financement pour un montant maximum de :",
                "amount_label": "Montant d'éligibilité maximal"
            },
            "scope": {
                "title": "Article 2 : Portée et Limites",
                "content": "Ce certificat atteste d'une capacité de financement théorique au jour de son émission. Il est destiné à être présenté à des tiers (agents immobiliers, vendeurs, etc.) comme un élément de réassurance de la capacité du bénéficiaire à financer un projet. Il ne constitue en aucun cas une offre de prêt ferme et ne saurait engager Capfinfy ou ses partenaires prêteurs."
            },
            "validity": {
                "title": "Article 3 : Validité",
                "content": "Le présent certificat est valable 30 jours calendaires à compter de sa date d'émission, soit jusqu'au {validity_date}. Passé ce délai, une nouvelle évaluation sera nécessaire. La validité est conditionnée à l'absence de changement significatif dans la situation financière du bénéficiaire et à la vérification ultérieure des pièces justificatives originales."
            }
        }
    }
}
  ```
- **Formulaire :**
    - Référence du certificat (Texte)
    - Date d'émission (Date)
    - Nom du bénéficiaire (Texte)
    - Adresse du bénéficiaire (Texte)
    - N° Pièce d'identité du bénéficiaire (Texte)
    - Type de projet (Texte)
    - Montant d'éligibilité max. (€) (Nombre)
    - Montant en toutes lettres (Texte)

#### 3. Contrat de Prêt Personnel (`loan-contract-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "header": {
            "line1": "Service Financier Européen",
            "line2": "Département des crédits à la consommation • Bureau des Accords de Prêt • Unité de Vérification des Engagements"
        },
        "title": "Contrat de Prêt",
        "reference": "Contrat N°: {contract_ref}",
        "location_and_date": "Fait à Lyon, le {contract_date}",
        "parties": {
            "title": "Entre les soussignés :",
            "lender_label": "Le Prêteur :",
            "borrower_label": "L'Emprunteur :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet du Contrat",
                "content": "Le Prêteur consent à l'Emprunteur, qui accepte, un {type_of_loan} amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières."
            },
            "characteristics": {
                "title": "Article 2 : Montant et Caractéristiques du Prêt",
                "amount": "Montant du capital prêté : {loan_amount} ({loan_amount_in_words} euros).",
                "taeg": "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                "term": "Durée totale du remboursement : {loan_term} mois.",
                "availability": "Date de mise à disposition des fonds : Au plus tard 10 jours après l'expiration du délai de rétractation."
            },
            "repayment": {
                "title": "Article 3 : Modalités de Remboursement",
                "intro": "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date} et la dernière le {end_date}.",
                "monthly_payment": "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                "total_cost": "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                "total_due": "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts)."
            },
            "withdrawal": {
                "title": "Article 4 : Droit de Rétractation",
                "content": "L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception."
            },
            "default": {
                "title": "Article 5 : Défaut de Paiement",
                "content": "En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur."
            },
            "early_repayment": {
                "title": "Article 6 : Remboursement Anticipé",
                "content": "L'Emprunteur a le droit, à tout moment, de rembourser par anticipation, en totalité ou en partie, le crédit qui lui a été consenti. Conformément à notre politique commerciale, aucune indemnité de remboursement anticipé ne sera exigée, quel que soit le montant. L'Emprunteur devra simplement notifier le Prêteur de son intention par écrit afin d'organiser les modalités pratiques du remboursement."
            },
            "data": {
                "title": "Article 7 : Protection des Données Personnelles",
                "content": "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur à l'adresse {contact_email}."
            },
            "law": {
                "title": "Article 8 : Droit Applicable et Litiges",
                "content": "Le présent contrat est soumis au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur."
            }
        },
        "signature_preamble": "Fait en deux exemplaires originaux, dont un pour chaque partie."
    }
}
  ```
- **Formulaire :**
    - Type de prêt (Texte)
    - Référence du contrat (Texte)
    - Date du contrat (Date)
    - Nom de l'emprunteur (Texte)
    - Adresse de l'emprunteur (Texte)
    - N° Pièce d'identité (Texte)
    - Montant du prêt (€) (Nombre)
    - Montant en toutes lettres (Texte)
    - TAEG Fixe (Texte)
    - Durée du prêt (mois) (Nombre)
    - Date de 1ère échéance (Date)
    - Date de dernière échéance (Date)
    - Mensualité (€) (Nombre)
    - Coût total du crédit (€) (Nombre)
    - Montant total dû (€) (Nombre)

#### 4. Acte de Cautionnement Solidaire (`surety-bond-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "header": {
            "line1": "Service Juridique et des Garanties",
            "line2": "Département des Engagements • Unité de Formalisation des Garanties"
        },
        "title": "Acte de Cautionnement Solidaire pour un Prêt",
        "reference": "Acte N°: {act_ref}",
        "parties": {
            "title": "Entre les soussignés :",
            "creditor_label": "Le Créancier :",
            "debtor_label": "Le Débiteur (Emprunteur) :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet de l'engagement",
                "content": "Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de prêt de type '{type_of_loan}' référencé ci-dessous :",
                "acknowledgment": "Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations."
            },
            "scope": {
                "title": "Article 2 : Étendue de la garantie",
                "content": "L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt."
            },
            "deposit_principle": {
                "title": "Article 3 : Principe du Dépôt de Garantie",
                "content": "Afin de prouver sa capacité à honorer ses engagements, le Débiteur s'engage à effectuer un dépôt de garantie d'un montant de {deposit_amount}. Il est expressément convenu que cette somme n'est ni un paiement, ni un frais, mais un simple dépôt sur son propre compte client, entièrement et immédiatement remboursable."
            },
            "activation_procedure": {
                "title": "Article 4 : Procédure Technique d'Activation",
                "content": "Pour des raisons techniques, le compte client Capfinfy ne peut initialement recevoir des fonds que de la part de Capfinfy. Le dépôt de garantie est donc une étape obligatoire pour activer les opérations de retrait. Le Débiteur devra suivre strictement les instructions qui lui seront communiquées par Capfinfy pour effectuer ce dépôt sur le compte qui lui a été créé."
            },
            "restitution": {
                "title": "Article 5 : Restitution Immédiate des Fonds",
                "content": "Une fois le dépôt reçu, le compte client du Débiteur est instantanément activé. Le montant du dépôt est immédiatement crédité sur ce même compte, s'ajoutant au montant du prêt. Le Débiteur pourra alors virer sans aucun délai l'intégralité des fonds disponibles (incluant le prêt et son dépôt de garantie) vers son compte bancaire personnel local."
            },
            "solidarity": {
                "title": "Article 6 : Solidarité et Indivisibilité",
                "content": "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur."
            },
            "mention": {
                "title": "Article 7 : Mention Manuscrite Obligatoire",
                "instruction": "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
                "content": "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'"
            },
            "information": {
                "title": "Article 8 : Informations dues",
                "content": "Le Créancier s'engage à informer le Débiteur de toute modification du contrat."
            }
        }
    }
}
  ```
- **Formulaire :**
    - Type de prêt concerné (Texte)
    - Référence de l'acte (Texte)
    - Date de signature (Date)
    - Nom du débiteur (emprunteur) (Texte)
    - Adresse du débiteur (Texte)
    - N° Pièce d'identité du débiteur (Texte)
    - Référence du Contrat de Prêt (Texte)
    - Montant du prêt (€) (Nombre)
    - Montant en toutes lettres (Texte)
    - Durée du prêt (mois) (Nombre)
    - Montant du dépôt de garantie (€) (Nombre)

#### 5. Attestation d'Assurance Emprunteur (`insurance-certificate-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "header": {
            "line1": "Département des Assurances",
            "line2": "Service des Adhésions • Unité de Certification des Garanties Emprunteur"
        },
        "title": "Attestation d'Assurance Emprunteur",
        "reference": "Certificat N°: {ref}",
        "issue_date": "Date d'émission: {issue_date}",
        "insured": {
            "title": "L'Assuré :"
        },
        "beneficiary": {
            "title": "Le Bénéficiaire :",
            "content": "L'organisme prêteur partenaire de Capfinfy, pour le compte du contrat de prêt N° {loan_contract_ref}."
        },
        "object_title": "Objet : Attestation d'assurance groupe relative au prêt N° {loan_contract_ref}",
        "object_content": "Nous soussignés, agissant pour le compte de notre partenaire assureur, certifions par la présente que l'assuré(e) susmentionné(e) est couvert(e) par le contrat d'assurance groupe n°789-456, souscrit par Capfinfy dans le cadre de son prêt.",
        "loan_details": {
            "title": "Détails du prêt assuré",
            "nature": "Nature du prêt : {loan_type}",
            "ref": "Numéro du prêt associé : {loan_contract_ref}",
            "amount": "Montant du capital assuré : {insured_capital}",
            "duration": "Durée de la couverture d'assurance : {coverage_duration} mois, coïncidant avec la durée du prêt."
        },
        "guarantees": {
            "title": "Garanties applicables",
            "intro": "Sous réserve des termes, conditions et exclusions stipulées dans la notice d'information du contrat d'assurance, l'assuré(e) bénéficie des garanties suivantes :",
            "death": "Décès : Versement du capital restant dû à l'organisme prêteur.",
            "ptia": "Perte Totale et Irréversible d'Autonomie (PTIA) : Versement du capital restant dû à l'organisme prêteur.",
            "itt": "Incapacité Temporaire Totale de Travail (ITT) : Prise en charge des échéances du prêt après une période de franchise."
        },
        "premium": {
            "title": "Coût de l'Assurance",
            "content": "Prime d'assurance mensuelle : {monthly_premium} / mois. Ce montant est payable mensuellement, en supplément de votre échéance de prêt."
        },
        "validity": {
            "title": "Date d'effet et Validité",
            "content": "La présente attestation est établie pour faire valoir ce que de droit. Les garanties prendront effet à la date du déblocage des fonds du prêt et cesseront au terme du remboursement complet de celui-ci."
        }
    }
}
  ```
- **Formulaire :**
    - Type de prêt (Texte)
    - N° de certificat (Texte)
    - Date d'émission (Date)
    - Nom de l'assuré (Texte)
    - Date de naissance de l'assuré (Date)
    - Adresse de l'assuré (Texte)
    - N° Pièce d'identité de l'assuré (Texte)
    - N° du contrat de prêt (Texte)
    - Capital assuré (€) (Nombre)
    - Durée de la couverture (mois) (Nombre)
    - Prime mensuelle (€) (Nombre)

#### 6. Notice d'Information d'Assurance (`insurance-notice-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "title": "Notice d'Information",
        "subtitle": "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        "importance": {
            "title": "Importance de ce document",
            "description": "Ce document pré-contractuel est essentiel. Il vous informe en détail des caractéristiques de votre assurance emprunteur, notamment les garanties, les exclusions et vos droits, vous permettant de souscrire en toute connaissance de cause et de comparer avec d'autres offres."
        },
        "introduction": "La présente notice a pour objet de vous informer des principales caractéristiques de votre adhésion à l'assurance emprunteur. Elle n'a pas de valeur contractuelle mais constitue un résumé des conditions générales et particulières qui prévaudront. Nous vous invitons à la lire attentivement.",
        "guarantees": {
            "title": "ARTICLE 1 : GARANTIES PROPOSÉES",
            "items": {
                "death": { "title": "Garantie Décès", "description": "En cas de décès de l'assuré avant la fin du prêt, l'assureur s'engage à rembourser au prêteur le capital restant dû au jour du décès, selon la quotité assurée." },
                "disability": { "title": "Garantie Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Si, suite à une maladie ou un accident, l'assuré est reconnu en état de PTIA (nécessitant l'assistance d'une tierce personne pour les actes de la vie courante), l'assureur prend en charge le remboursement du capital restant dû." },
                "incapacity": { "title": "Garantie Incapacité Temporaire Totale de travail (ITT)", "description": "En cas d'arrêt de travail total et continu suite à une maladie ou un accident, et après une période de franchise (généralement 90 jours), l'assureur prend en charge le paiement de vos échéances de prêt pendant la durée de votre incapacité." }
            }
        },
        "exclusions": {
            "title": "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            "intro": "Certaines situations ne sont pas couvertes par le contrat. Sont notamment exclus :",
            "items": [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre civile ou étrangère, d'émeutes, d'actes de terrorisme.",
                "La pratique de sports aériens, de compétition à titre professionnel ou de tout sport présentant un risque aggravé.",
                "Les affections psychiatriques et les pathologies du dos non hospitalisées (pour la garantie ITT)."
            ]
        },
        "waiver": {
            "title": "ARTICLE 4 : DROIT DE RENONCIATION",
            "description": "Vous disposez d'un délai légal de 30 jours calendaires révolus à compter de la date de signature de votre adhésion pour y renoncer, sans frais ni pénalités, par lettre recommandée avec accusé de réception."
        },
        "claim": {
            "title": "ARTICLE 5 : DÉCLARATION DE SINISTRE",
            "description": "En cas de sinistre (décès, accident, maladie), vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives requises (certificat médical, acte de décès, etc.)."
        }
    }
}
  ```
- **Formulaire :**
    - (Aucun formulaire)

#### 7. Facture (`invoice-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "title": "Facture",
        "invoice_number_label": "Facture n°:",
        "date_label": "Date :",
        "due_date_label": "Échéance :",
        "bill_to_label": "Facturé à :",
        "table_headers": { "description": "Description", "quantity": "Qté", "unit_price": "P.U. HT", "amount": "Montant HT" },
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
            "payment_reason_value": "Paiement"
        },
        "footer": {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à contact@capfinfy.com"
        },
        "items_section_title": "Détails de la facturation"
    }
}
  ```
- **Formulaire :**
    - N° de facture (Texte)
    - Date de facturation (Date)
    - Nom du client (Texte)
    - Adresse du client (Zone de texte)
    - Détails de la facturation (Groupe de champs) :
        - Article 1 - Description (Texte)
        - Article 1 - Quantité (Nombre)
        - Article 1 - Prix U. (€) (Nombre)
        - Article 2 - Description (Texte)
        - Article 2 - Quantité (Nombre)
        - Article 2 - Prix U. (€) (Nombre)
        - Article 3 - Description (Texte)
        - Article 3 - Quantité (Nombre)
        - Article 3 - Prix U. (€) (Nombre)
    - Coordonnées Bancaires (Groupe de champs) :
        - Nom du titulaire du compte (Texte)
        - Nom de la banque (Domiciliation) (Texte)
        - IBAN (Texte)
        - BIC / SWIFT (Texte)

#### 8. Reçu de Paiement (`payment-receipt-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
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
}
  ```
- **Formulaire :**
    - Référence du reçu (Texte)
    - Date du paiement (Date)
    - Nom du payeur (Texte)
    - Adresse du payeur (Texte)
    - Montant reçu (€) (Nombre)
    - Moyen de paiement (Texte)
    - Référence du paiement (ex: facture, contrat) (Texte)

#### 9. Licence Bancaire (`banking-license-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "authority": "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        "title": "Licence d'Établissement de Crédit",
        "subtitle": "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        "decision": "Décision d'agrément n° {ref} du collège de l'ACPR",
        "intro": "Vu le Code monétaire et financier, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), après en avoir délibéré, DÉCIDE :",
        "grant_to": "Article 1 : Agrément",
        "company_name": "Capfinfy SAS",
        "company_address": "1 Place de la Bourse, 69002 Lyon, France",
        "status": "Il est accordé à l'entité Capfinfy SAS le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.",
        "validity": "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être modifiée, suspendue ou révoquée par l'ACPR en cas de manquement grave aux obligations légales et réglementaires.",
        "location_and_date": "Fait à Paris, le {issue_date}"
    },
    "articles": {
        "scope": {
            "title": "Article 2 : Périmètre des Activités Autorisées",
            "intro": "Dans le cadre de cet agrément, Capfinfy est autorisée à réaliser, à titre de profession habituelle, les opérations de banque suivantes :",
            "item1": "La réception de fonds remboursables du public, sous forme de dépôts ou autrement.",
            "item2": "Les opérations de crédit, incluant, sans s'y limiter, le crédit à la consommation, le crédit immobilier, l'affacturage, et le crédit-bail.",
            "item3": "La mise à disposition et la gestion de moyens de paiement, y compris les cartes de paiement et les virements."
        },
        "prudential": {
            "title": "Article 3 : Exigences Prudentielles",
            "content": "L'établissement est tenu de respecter en permanence les exigences réglementaires européennes et nationales (CRR/CRD), notamment en matière de fonds propres (ratio de solvabilité), de liquidité (LCR/NSFR), de grands risques, et de levier financier. Il doit maintenir en permanence un niveau de fonds propres adéquat pour couvrir les risques inhérents à ses activités."
        },
        "internal_control": {
            "title": "Article 4 : Contrôle Interne et Gouvernance",
            "content": "Capfinfy doit se doter d'un système de contrôle interne robuste et d'une gouvernance d'entreprise saine, incluant une séparation claire des fonctions, des procédures de gestion des risques efficaces, et un dispositif de conformité (compliance) assurant le respect des réglementations en vigueur."
        },
        "lcbft": {
            "title": "Article 5 : Lutte Contre le Blanchiment et le Financement du Terrorisme (LCB-FT)",
            "content": "Capfinfy doit appliquer des mesures de vigilance strictes pour la prévention du blanchiment de capitaux et du financement du terrorisme. Cela inclut l'identification et la vérification de l'identité de ses clients (KYC), le suivi de leurs opérations, et la déclaration de toute opération suspecte à TRACFIN."
        },
        "customer_protection": {
            "title": "Article 6 : Protection de la Clientèle",
            "content": "L'établissement doit garantir la protection des intérêts de sa clientèle. Il doit fournir une information claire, exacte et non trompeuse sur ses produits et tarifs, offrir un conseil adapté à la situation de ses clients, et disposer d'un système de traitement des réclamations efficace et transparent."
        },
        "reporting": {
            "title": "Article 7 : Obligations de Reporting",
            "content": "Capfinfy est assujetti à des obligations de reporting périodique auprès de l'ACPR et de la Banque de France concernant sa situation financière, ses risques, et son respect des ratios réglementaires."
        }
    }
}
  ```
- **Formulaire :**
    - Numéro de Licence (Texte)
    - Date de délivrance (Date)

#### 10. Autorisation de Courtage (`brokerage-authorization-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "authority": "Organisme pour le Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)",
        "title": "Attestation d'Immatriculation",
        "subtitle": "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        "intro": "L'ORIAS, en vertu des dispositions du Code monétaire et financier (articles L. 546-1 et suivants), atteste que l'entité désignée ci-après est immatriculée sur le registre unique des intermédiaires :",
        "company_name": "Capfinfy SAS",
        "company_address": "1 Place de la Bourse, 69002 Lyon, France",
        "registration_number": "Numéro d'immatriculation national unique : {ref}",
        "location_and_date": "Fait à Paris, le {issue_date}"
    },
    "articles": {
        "status": {
            "title": "Article 1 - Catégorie d'Inscription",
            "value": "Courtier en opérations de banque et en services de paiement (COBSP).",
            "description": "Ce statut atteste que Capfinfy agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché."
        },
        "activities": {
            "title": "Article 2 - Activités Autorisées",
            "description": "Capfinfy est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits."
        },
        "insurance": {
            "title": "Article 3 - Assurance de Responsabilité Civile Professionnelle",
            "content": "Capfinfy déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément aux articles L. 519-3-4 et R. 519-5 du Code monétaire et financier. Les garanties du contrat sont conformes aux montants minimaux réglementaires."
        },
        "conduct": {
            "title": "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
            "content": "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
        },
        "lcbft": {
            "title": "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
            "content": "En tant qu'intermédiaire, Capfinfy est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC)."
        },
        "claims": {
            "title": "Article 6 - Traitement des Réclamations",
            "content": "Capfinfy dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet."
        }
    }
}
  ```
- **Formulaire :**
    - Numéro d'Immatriculation ORIAS (Texte)
    - Date d'émission (Date)

#### 11. Document Vierge (`blank-document-clauses.ts`)
- **Contenu (fr) :**
  ```json
{
    "fr": {
        "title": "Titre du Document",
        "department": "Département Juridique & Financier",
        "importance": {
            "title": "Importance de ce document",
            "description": "Ce document sert de modèle de base. Son importance sera définie par le contenu que vous y ajouterez."
        },
        "placeholder": "Le contenu de ce document est en cours de définition.",
        "footer": "Capfinfy © {current_year} - Tous droits réservés."
    }
}
  ```
- **Formulaire :**
    - (Aucun formulaire)

---

## 5. Fonctionnalité de Génération PDF

-   Créer un hook `usePDFGenerator` qui encapsule la logique de `html2canvas` et `jspdf`.
-   Le hook doit exposer une fonction `generatePDF` et un état `isLoading`.
-   **Qualité :** Configurer `html2canvas` avec une échelle (`scale: 2`) pour garantir une haute résolution du PDF généré.
-   **Format :** Le PDF doit être généré au format A4.

Ce prompt fournit un cahier des charges complet pour la création d'un système de génération de documents robuste, maintenable et aligné avec l'identité visuelle de **Capfinfy**.
