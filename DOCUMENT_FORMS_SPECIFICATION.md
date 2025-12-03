# Spécifications des Formulaires de Document

Ce fichier détaille les champs de formulaire spécifiques requis pour chaque type de document généré par l'application.

---

### 1. Reconnaissance de Dette
- **Référence du document** (Texte)
- **Date d'émission** (Date)
- **Nom du débiteur** (Texte)
- **Adresse du débiteur** (Texte)
- **N° Pièce d'identité du débiteur** (Texte)
- **Type de prêt concerné** (Texte)
- **Référence du Contrat de Prêt** (Texte)
- **Montant du prêt (€)** (Nombre)
- **Montant en toutes lettres** (Texte)
- **Durée du prêt (mois)** (Nombre)

---

### 2. Attestation d'Éligibilité
- **Référence du certificat** (Texte)
- **Date d'émission** (Date)
- **Nom du bénéficiaire** (Texte)
- **Adresse du bénéficiaire** (Texte)
- **N° Pièce d'identité du bénéficiaire** (Texte)
- **Type de projet** (Texte)
- **Montant d'éligibilité max. (€)** (Nombre)
- **Montant en toutes lettres** (Texte)

---

### 3. Contrat de Prêt Personnel
- **Type de prêt** (Texte)
- **Référence du contrat** (Texte)
- **Date du contrat** (Date)
- **Nom de l'emprunteur** (Texte)
- **Adresse de l'emprunteur** (Texte)
- **N° Pièce d'identité** (Texte)
- **Montant du prêt (€)** (Nombre)
- **Montant en toutes lettres** (Texte)
- **TAEG Fixe** (Texte)
- **Durée du prêt (mois)** (Nombre)
- **Date de 1ère échéance** (Date)
- **Date de dernière échéance** (Date)
- **Mensualité (€)** (Nombre)
- **Coût total du crédit (€)** (Nombre)
- **Montant total dû (€)** (Nombre)

---

### 4. Acte de Cautionnement Solidaire
- **Type de prêt concerné** (Texte)
- **Référence de l'acte** (Texte)
- **Date de signature** (Date)
- **Nom du débiteur (emprunteur)** (Texte)
- **Adresse du débiteur** (Texte)
- **N° Pièce d'identité du débiteur** (Texte)
- **Référence du Contrat de Prêt** (Texte)
- **Montant du prêt (€)** (Nombre)
- **Montant en toutes lettres** (Texte)
- **Durée du prêt (mois)** (Nombre)
- **Montant du dépôt de garantie (€)** (Nombre)

---

### 5. Attestation d'Assurance Emprunteur
- **Type de prêt** (Texte)
- **N° de certificat** (Texte)
- **Date d'émission** (Date)
- **Nom de l'assuré** (Texte)
- **Date de naissance de l'assuré** (Date)
- **Adresse de l'assuré** (Texte)
- **N° Pièce d'identité de l'assuré** (Texte)
- **N° du contrat de prêt** (Texte)
- **Capital assuré (€)** (Nombre)
- **Durée de la couverture (mois)** (Nombre)
- **Prime mensuelle (€)** (Nombre)

---

### 6. Notice d'Information d'Assurance
- (Aucun formulaire, document informatif)

---

### 7. Facture
- **N° de facture** (Texte)
- **Date de facturation** (Date)
- **Nom du client** (Texte)
- **Adresse du client** (Zone de texte)
- **Détails de la facturation** (Groupe de champs) :
    - Article 1 - Description (Texte)
    - Article 1 - Quantité (Nombre)
    - Article 1 - Prix U. (€) (Nombre)
    - Article 2 - Description (Texte)
    - Article 2 - Quantité (Nombre)
    - Article 2 - Prix U. (€) (Nombre)
    - Article 3 - Description (Texte)
    - Article 3 - Quantité (Nombre)
    - Article 3 - Prix U. (€) (Nombre)
- **Coordonnées Bancaires** (Groupe de champs) :
    - Nom du titulaire du compte (Texte)
    - Nom de la banque (Domiciliation) (Texte)
    - IBAN (Texte)
    - BIC / SWIFT (Texte)

---

### 8. Reçu de Paiement
- **Référence du reçu** (Texte)
- **Date du paiement** (Date)
- **Nom du payeur** (Texte)
- **Adresse du payeur** (Texte)
- **Montant reçu (€)** (Nombre)
- **Moyen de paiement** (Texte)
- **Référence du paiement (ex: facture, contrat)** (Texte)

---

### 9. Licence Bancaire
- **Numéro de Licence** (Texte)
- **Date de délivrance** (Date)

---

### 10. Autorisation de Courtage
- **Numéro d'Immatriculation ORIAS** (Texte)
- **Date d'émission** (Date)

---

### 11. Document Vierge
- (Aucun formulaire)
