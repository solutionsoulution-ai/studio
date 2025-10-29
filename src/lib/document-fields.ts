
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
    { name: 'ref', label: {fr: 'Référence du document', en: 'Document Reference'}, type: 'text', defaultValue: `RD-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr: 'Date d\'émission', en: 'Issue Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'debtor_name', label: {fr: 'Nom du débiteur', en: 'Debtor Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'debtor_address', label: {fr: 'Adresse du débiteur', en: 'Debtor Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'debtor_id', label: {fr: 'N° Pièce d\'identité du débiteur', en: 'Debtor ID Number'}, type: 'text', validation: { type: 'string' } },
    { name: 'type_of_loan', label: {fr: 'Type de prêt concerné', en: 'Concerned Loan Type'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr: 'Référence du Contrat de Prêt', en: 'Loan Contract Reference'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)'}, type: 'number', validation: { type: 'number' } },
  ],
  'attestation-eligibilite': [
    { name: 'ref', label: {fr:'Référence du certificat', en: 'Certificate Reference'}, type: 'text', defaultValue: `AE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date d\'émission', en: 'Issue Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'beneficiary_name', label: {fr:'Nom du bénéficiaire', en: 'Beneficiary Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'beneficiary_address', label: {fr:'Adresse du bénéficiaire', en: 'Beneficiary Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'beneficiary_id', label: {fr: 'N° Pièce d\'identité du bénéficiaire', en: 'Beneficiary ID Number'}, type: 'text', validation: { type: 'string' } },
    { name: 'project_type', label: {fr: 'Type de projet', en: 'Project Type'}, type: 'text', defaultValue: 'Acquisition Immobilière', validation: { type: 'string' } },
    { name: 'max_amount', label: {fr:'Montant d\'éligibilité max. (€)', en: 'Max. Eligibility Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'max_amount_in_words', label: {fr:'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
  ],
  'contrat-de-pret-personnel': [
    { name: 'type_of_loan', label: {fr: 'Type de prêt', en: 'Loan Type'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'contract_ref', label: {fr: 'Référence du contrat', en: 'Contract Reference'}, type: 'text', defaultValue: `CPP-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'contract_date', label: {fr: 'Date du contrat', en: 'Contract Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'borrower_name', label: {fr: 'Nom de l\'emprunteur', en: 'Borrower Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr: 'Adresse de l\'emprunteur', en: 'Borrower Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_id', label: {fr: 'N° Pièce d\'identité', en: 'ID Number'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)'}, type: 'number', validation: { type: 'number' } },
    { name: 'start_date', label: {fr: 'Date de 1ère échéance', en: 'First Installment Date'}, type: 'date', validation: { type: 'date' } },
    { name: 'end_date', label: {fr: 'Date de dernière échéance', en: 'Last Installment Date'}, type: 'date', validation: { type: 'date' } },
    { name: 'monthly_payment', label: {fr: 'Mensualité (€)', en: 'Monthly Payment (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_cost', label: {fr: 'Coût total du crédit (€)', en: 'Total Credit Cost (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_due', label: {fr: 'Montant total dû (€)', en: 'Total Amount Due (€)'}, type: 'number', validation: { type: 'number' } },
  ],
  'acte-de-cautionnement-solidaire': [
    { name: 'type_of_loan', label: {fr: 'Type de prêt concerné', en: 'Concerned Loan Type'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'act_ref', label: {fr:'Référence de l\'acte', en: 'Act Reference'}, type: 'text', defaultValue: `ACS-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date de signature', en: 'Signature Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'borrower_name', label: {fr:'Nom du débiteur (emprunteur)', en: 'Debtor Name (borrower)'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr:'Adresse du débiteur', en: 'Debtor Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_id', label: {fr: 'N° Pièce d\'identité du débiteur', en: 'Debtor ID Number'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr: 'Référence du Contrat de Prêt', en: 'Loan Contract Reference'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr:'Montant du prêt (€)', en: 'Loan Amount (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr:'Montant en toutes lettres', en: 'Amount in words'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)'}, type: 'number', validation: { type: 'number' } },
  ],
  'attestation-assurance-emprunteur': [
    { name: 'loan_type', label: {fr: 'Type de prêt', en: 'Loan Type'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'ref', label: {fr:'N° de certificat', en:'Certificate No.'}, type: 'text', defaultValue: `AAE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'issue_date', label: {fr:'Date d\'émission', en:'Issue Date'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'insured_name', label: {fr:'Nom de l\'assuré', en: 'Insured Name'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_dob', label: {fr:'Date de naissance de l\'assuré', en: 'Insured Date of Birth'}, type: 'date', validation: { type: 'date' } },
    { name: 'insured_address', label: {fr:'Adresse de l\'assuré', en: 'Insured Address'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_id', label: {fr:'N° Pièce d\'identité de l\'assuré', en: 'Insured ID Number'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr:'N° du contrat de prêt', en:'Loan Contract No.'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_capital', label: {fr:'Capital assuré (€)', en: 'Insured Capital (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'coverage_duration', label: {fr:'Durée de la couverture (mois)', en: 'Coverage Duration (months)'}, type: 'number', validation: { type: 'number' } },
    { name: 'monthly_premium', label: {fr:'Prime mensuelle (€)', en: 'Monthly Premium (€)'}, type: 'number', validation: { type: 'number' } },
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
