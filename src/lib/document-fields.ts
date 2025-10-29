
export type DocumentField = {
  name: string;
  label: { fr: string; en: string; };
  type: 'text' | 'number' | 'date' | 'textarea';
  defaultValue?: string | number;
  placeholder?: { fr: string; en: string; };
  validation: {
    type: 'string' | 'number' | 'date';
    email?: boolean;
  };
};

export const documentFields: { [key: string]: DocumentField[] } = {
  'reconnaissance-de-dette': [
    { name: 'ref', label: {fr: 'Référence', en: 'Reference'}, type: 'text', defaultValue: `RD-${new Date().getFullYear()}-`, placeholder: {fr: `RD-${new Date().getFullYear()}-001`, en: `AD-${new Date().getFullYear()}-001`}, validation: { type: 'string' } },
    { name: 'borrower_name', label: {fr: `Nom de l'emprunteur`, en: 'Borrower Name'}, type: 'text', placeholder: {fr:'Jean Dupont', en: 'John Doe'}, validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr: `Adresse de l'emprunteur`, en: 'Borrower Address'}, type: 'text', placeholder: {fr:'123 Rue de la Paix, 75002 Paris', en: '123 Peace Street, 75002 Paris'}, validation: { type: 'string' } },
    { name: 'loan_date', label: {fr: 'Date du prêt', en: 'Loan Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', placeholder: {fr:'5000', en: '5000'}, validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', placeholder: {fr:'Cinq mille euros', en:'Five thousand euros'}, validation: { type: 'string' } },
    { name: 'repayment_deadline', label: {fr: 'Date limite de remboursement', en: 'Repayment Deadline'}, type: 'date', validation: { type: 'date' } },
    { name: 'signature_location', label: {fr: 'Lieu de signature', en:'Signature Location'}, type: 'text', defaultValue: 'Lyon', validation: { type: 'string' } },
    { name: 'signature_date', label: {fr: 'Date de signature', en: 'Signature Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'attestation-eligibilite': [
    { name: 'ref', label: {fr:'Référence', en: 'Reference'}, type: 'text', defaultValue: `AE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date d\'émission', en: 'Issue Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'beneficiary_name', label: {fr:'Nom du bénéficiaire', en: 'Beneficiary Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'beneficiary_address', label: {fr:'Adresse du bénéficiaire', en: 'Beneficiary Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'amount', label: {fr:'Montant du financement (€)', en: 'Financing Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'validity_end_date', label: {fr:'Date de fin de validité', en: 'Validity End Date'}, type: 'date', validation: { type: 'date' } },
  ],
  'contrat-de-pret-personnel': [
    { name: 'ref', label: {fr: 'Référence du contrat', en: 'Contract Reference'}, type: 'text', defaultValue: `CPP-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'borrower_name', label: {fr: 'Nom de l\'emprunteur', en: 'Borrower Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr: 'Adresse de l\'emprunteur', en: 'Borrower Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term_months', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)'}, type: 'number', validation: { type: 'number' } },
    { name: 'monthly_payment', label: {fr: 'Mensualité (€)', en: 'Monthly Payment (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'repayment_start_date', label: {fr: 'Date de début de remboursement', en: 'Repayment Start Date'}, type: 'date', validation: { type: 'date' } },
    { name: 'location', label: {fr: 'Lieu de signature', en:'Signature Location'}, type: 'text', defaultValue: 'Lyon', validation: { type: 'string' } },
    { name: 'date', label: {fr: 'Date de signature', en: 'Signature Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'acte-de-cautionnement-solidaire': [
    { name: 'ref', label: {fr:'Référence', en: 'Reference'}, type: 'text', defaultValue: `ACS-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'guarantor_name', label: {fr:'Nom de la caution', en: 'Guarantor Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_name', label: {fr:'Nom du débiteur', en: 'Debtor Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr:'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr:'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
    { name: 'location', label: {fr:'Lieu de signature', en:'Signature Location'}, type: 'text', defaultValue: 'Lyon', validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date de signature', en: 'Signature Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'attestation-assurance-emprunteur': [
    { name: 'ref', label: {fr:'N° d\'attestation', en:'Certificate No.'}, type: 'text', defaultValue: `AAE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'insured_name', label: {fr:'Nom de l\'assuré', en: 'Insured Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_id_label', label: {fr:'N° du contrat de prêt', en:'Loan Contract No.'}, type: 'text', validation: { type: 'string' } },
    { name: 'capital', label: {fr:'Capital assuré (€)', en: 'Insured Capital (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'signature_date', label: {fr:'Date de signature', en: 'Signature Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'notice-information-assurance': [],
  'facture': [
    { name: 'ref', label: {fr:'N° de facture', en: 'Invoice No.'}, type: 'text', defaultValue: `FACT-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date de facturation', en: 'Invoice Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'client_name', label: {fr:'Nom du client', en: 'Client Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'client_address', label: {fr:'Adresse du client', en: 'Client Address'}, type: 'textarea', validation: { type: 'string' } },
    { name: 'iban', label: {fr:'IBAN pour le paiement', en: 'IBAN for payment'}, type: 'text', validation: { type: 'string' } },
  ],
  'document-vierge': [],
};
