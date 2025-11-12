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
    -   `templates/`: Dossier contenant les composants React pour chaque modèle de document (ex: `LoanContractTemplate.tsx`). Ces templates sont responsables de la mise en page HTML du document final.
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

Voici le contenu textuel de chaque document, tel que défini dans les fichiers `*-clauses.ts`.

### 1. Reconnaissance de Dette (`debt-recognition-clauses.ts`)
```json
{
  "header": {
    "line1": "Service Financier Européen",
    "line2": "Département Juridique et des Garanties • Unité de Formalisation des Engagements"
  },
  "title": "Reconnaissance de Dette pour un {type_of_loan}",
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
      "content": "Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à Capfinfy, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un {type_of_loan} qui m'a été accordé et dont je confirme avoir reçu les fonds."
    },
    "repayment": {
      "title": "Article 2 : Modalités de Remboursement",
      "content": "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de {type_of_loan} N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier."
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
```

### 2. Attestation d'Éligibilité (`eligibility-certificate-clauses.ts`)
```json
{
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
```

### 3. Contrat de Prêt Personnel (`loan-contract-clauses.ts`)
```json
{
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
```

### 4. Acte de Cautionnement (`surety-bond-clauses.ts`)
```json
{
  "header": {
    "line1": "Service Juridique et des Garanties",
    "line2": "Département des Engagements • Unité de Formalisation des Garanties"
  },
  "title": "Acte de Cautionnement Solidaire pour un {type_of_loan}",
  "reference": "Acte N°: {act_ref}",
  "parties": {
    "title": "Entre les soussignés :",
    "creditor_label": "Le Créancier :",
    "debtor_label": "Le Débiteur (Emprunteur) :"
  },
  "articles": {
    "object": {
      "title": "Article 1 : Objet de l'engagement",
      "content": "Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de {type_of_loan} référencé ci-dessous :",
      "acknowledgment": "Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations."
    },
    "scope": {
      "title": "Article 2 : Étendue de la garantie",
      "content": "L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt."
    },
    "solidarity": {
      "title": "Article 3 : Solidarité et Indivisibilité",
      "content": "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur."
    },
    "mention": {
      "title": "Article 4 : Mention Manuscrite Obligatoire",
      "instruction": "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
      "content": "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'"
    },
    "information": {
      "title": "Article 5 : Informations dues",
      "content": "Le Créancier s'engage à informer le Débiteur de toute modification du contrat."
    }
  }
}
```

### 5. Attestation d'Assurance Emprunteur (`insurance-certificate-clauses.ts`)
```json
{
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
```

### 6. Facture (`invoice-clauses.ts`)
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

### 7. Reçu de Paiement (`payment-receipt-clauses.ts`)
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

1.  **Navigation** : L'utilisateur accède à `/documents/[slug]`, où `[slug]` correspond au type de document (ex: `contrat-de-pret-personnel`).

2.  **Initialisation** : La page charge le composant `DocumentPageClient` avec le `slug` du document. Ce composant est le cœur du système : il initialise un **Contexte React** (`DocumentGeneratorContext`) qui partagera l'état du formulaire et la langue sélectionnée entre le formulaire de saisie et l'aperçu du document.

3.  **Rendu du Formulaire** (`DocumentForm.tsx`) :
    *   Ce composant lit la configuration des champs depuis `src/lib/document-fields.ts` pour le `slug` actuel.
    *   Il génère dynamiquement les champs de saisie (Inputs, Textareas, etc.) à l'aide de la librairie **React Hook Form**.
    *   Chaque champ est associé à une règle de validation définie avec **Zod**, garantissant que les données saisies sont correctes.

4.  **Rendu de l'Aperçu** (`DocumentPreview.tsx` et `templates/*.tsx`) :
    *   Simultanément, `DocumentPageClient` sélectionne le composant de template approprié (ex: `LoanContractTemplate.tsx`) en fonction du `slug`.
    *   Ce template est rendu à l'intérieur du `DocumentPreview`, qui n'est qu'un simple conteneur.

5.  **Synchronisation des Données en Temps Réel** :
    *   Grâce au Contexte React, chaque modification dans le formulaire (`DocumentForm`) est immédiatement disponible pour le composant de template du document.
    *   Le template (ex: `LoanContractTemplate.tsx`) reçoit les nouvelles données, lit les clauses correspondantes dans les fichiers `src/data/documents/*-clauses.ts`, remplace les placeholders (ex: `{borrower_name}`) par les données du formulaire, et affiche le résultat instantanément. L'aperçu est donc toujours à jour.

6.  **Génération du PDF** (`usePDFGenerator.ts`) :
    *   Lorsque l'utilisateur clique sur "Générer le PDF", le hook `usePDFGenerator` est appelé.
    *   **html2canvas** prend une "capture d'écran" haute résolution du `div` contenant l'aperçu (`#pdf-content`). L'option `scale: 2` est utilisée pour garantir une image nette.
    *   **jsPDF** prend cette image (convertie en JPEG pour optimiser la taille) et la place dans un document PDF au format A4. Si le contenu est plus long qu'une page, jsPDF gère automatiquement la pagination.
    *   Le fichier PDF final est ensuite proposé au téléchargement dans le navigateur de l'utilisateur.

Ce système permet une expérience utilisateur fluide et interactive, tout en produisant des documents PDF professionnels et de haute qualité.
