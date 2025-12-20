
import type { Language } from "@/data/documents/languages";

export type DocumentField = {
  name: string;
  label: { [key in Language]?: string };
  type: 'text' | 'number' | 'date' | 'textarea' | 'group';
  defaultValue?: string | number;
  placeholder?: { [key in Language]?: string };
  validation: {
    type: 'string' | 'number' | 'date' | 'any';
    email?: boolean;
  };
  fields?: DocumentField[]; // For grouping
};

const invoiceFields: DocumentField[] = [
  { name: 'ref', label: {fr:'N° de facture', en: 'Invoice No.', de: 'Rechnungs-Nr.'}, type: 'text', defaultValue: `FACT-${new Date().getFullYear()}-`, validation: { type: 'string' } },
  { name: 'date', label: {fr:'Date de facturation', en: 'Invoice Date', de: 'Rechnungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  { name: 'client_name', label: {fr:'Nom du client', en: 'Client Name', de: 'Kundenname'}, type: 'text', validation: { type: 'string' } },
  { name: 'client_address', label: {fr:'Adresse du client', en: 'Client Address', de: 'Kundenadresse'}, type: 'textarea', validation: { type: 'string' } },
  { name: 'items_group', label: {fr: "Détails de la facturation", en: "Billing Details", de: "Rechnungsdetails"}, type: 'group', validation: {type: 'any'}, fields: [
    { name: 'item1_description', label: {fr: 'Article 1 - Description'}, type: 'text', validation: { type: 'string' } },
    { name: 'item1_quantity', label: {fr: 'Article 1 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'number' } },
    { name: 'item1_unit_price', label: {fr: 'Article 1 - Prix U. (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'item2_description', label: {fr: 'Article 2 - Description'}, type: 'text', validation: { type: 'any' } },
    { name: 'item2_quantity', label: {fr: 'Article 2 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'any' } },
    { name: 'item2_unit_price', label: {fr: 'Article 2 - Prix U. (€)'}, type: 'number', validation: { type: 'any' } },
    { name: 'item3_description', label: {fr: 'Article 3 - Description'}, type: 'text', validation: { type: 'any' } },
    { name: 'item3_quantity', label: {fr: 'Article 3 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'any' } },
    { name: 'item3_unit_price', label: {fr: 'Article 3 - Prix U. (€)'}, type: 'number', validation: { type: 'any' } },
  ]},
  { name: 'bank_details_group', label: {fr: 'Coordonnées Bancaires', en: 'Bank Details', de: 'Bankverbindung'}, type: 'group', validation: {type: 'any'}, fields: [
    { name: 'account_holder_name', label: {fr: 'Nom du titulaire du compte', en: 'Account Holder Name', de: 'Name des Kontoinhabers'}, type: 'text', validation: { type: 'string' } },
    { name: 'bank_name', label: {fr: 'Nom de la banque (Domiciliation)', en: 'Bank Name', de: 'Bankname'}, type: 'text', validation: { type: 'string' } },
    { name: 'iban', label: {fr:'IBAN', en: 'IBAN', de: 'IBAN'}, type: 'text', validation: { type: 'string' } },
    { name: 'bic', label: {fr:'BIC / SWIFT', en: 'BIC / SWIFT', de: 'BIC / SWIFT'}, type: 'text', validation: { type: 'string' } },
  ]},
];

const neofondsInvoiceFields: DocumentField[] = [
  { name: 'ref', label: {fr:'N° de facture', en: 'Invoice No.', de: 'Rechnungs-Nr.'}, type: 'text', defaultValue: `NEOFACT-${new Date().getFullYear()}-`, validation: { type: 'string' } },
  { name: 'date', label: {fr:'Date de facturation', en: 'Invoice Date', de: 'Rechnungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  { name: 'client_name', label: {fr:'Nom du client', en: 'Client Name', de: 'Kundenname'}, type: 'text', validation: { type: 'string' } },
  { name: 'client_address', label: {fr:'Adresse du client', en: 'Client Address', de: 'Kundenadresse'}, type: 'textarea', validation: { type: 'string' } },
  { name: 'items_group', label: {fr: "Détails de la facturation", en: "Billing Details", de: "Rechnungsdetails"}, type: 'group', validation: {type: 'any'}, fields: [
    { name: 'item1_description', label: {fr: 'Article 1 - Description'}, type: 'text', validation: { type: 'string' } },
    { name: 'item1_quantity', label: {fr: 'Article 1 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'number' } },
    { name: 'item1_unit_price', label: {fr: 'Article 1 - Prix U. (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'item2_description', label: {fr: 'Article 2 - Description'}, type: 'text', validation: { type: 'any' } },
    { name: 'item2_quantity', label: {fr: 'Article 2 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'any' } },
    { name: 'item2_unit_price', label: {fr: 'Article 2 - Prix U. (€)'}, type: 'number', validation: { type: 'any' } },
    { name: 'item3_description', label: {fr: 'Article 3 - Description'}, type: 'text', validation: { type: 'any' } },
    { name: 'item3_quantity', label: {fr: 'Article 3 - Quantité'}, type: 'number', defaultValue: 1, validation: { type: 'any' } },
    { name: 'item3_unit_price', label: {fr: 'Article 3 - Prix U. (€)'}, type: 'number', validation: { type: 'any' } },
  ]},
];

export const documentFields: { [key: string]: DocumentField[] } = {
  'reconnaissance-de-dette': [
    { name: 'ref', label: {fr: 'Référence du document', en: 'Document Reference', de: 'Dokumentenreferenz'}, type: 'text', defaultValue: `RD-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr: 'Date d\'émission', en: 'Issue Date', de: 'Ausstellungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'debtor_name', label: {fr: 'Nom du débiteur', en: 'Debtor Name', de: 'Name des Schuldners'}, type: 'text', validation: { type: 'string' } },
    { name: 'debtor_address', label: {fr: 'Adresse du débiteur', en: 'Debtor Address', de: 'Adresse des Schuldners'}, type: 'text', validation: { type: 'string' } },
    { name: 'debtor_id', label: {fr: 'N° Pièce d\'identité du débiteur', en: 'Debtor ID Number', de: 'Ausweisnummer des Schuldners'}, type: 'text', validation: { type: 'string' } },
    { name: 'type_of_loan', label: {fr: 'Type de prêt concerné', en: 'Concerned Loan Type', de: 'Betroffene Darlehensart'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr: 'Référence du Contrat de Prêt', en: 'Loan Contract Reference', de: 'Referenz des Darlehensvertrags'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)', de: 'Darlehensbetrag (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words', de: 'Betrag in Worten'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)', de: 'Laufzeit des Darlehens (Monate)'}, type: 'number', validation: { type: 'number' } },
  ],
  'attestation-eligibilite': [
    { name: 'ref', label: {fr:'Référence du certificat', en: 'Certificate Reference', de: 'Zertifikatsreferenz'}, type: 'text', defaultValue: `AE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date d\'émission', en: 'Issue Date', de: 'Ausstellungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'beneficiary_name', label: {fr:'Nom du bénéficiaire', en: 'Beneficiary Name', de: 'Name des Begünstigten'}, type: 'text', validation: { type: 'string' } },
    { name: 'beneficiary_address', label: {fr:'Adresse du bénéficiaire', en: 'Beneficiary Address', de: 'Adresse des Begünstigten'}, type: 'text', validation: { type: 'string' } },
    { name: 'beneficiary_id', label: {fr: 'N° Pièce d\'identité du bénéficiaire', en: 'Beneficiary ID Number', de: 'Ausweisnummer des Begünstigten'}, type: 'text', validation: { type: 'string' } },
    { name: 'project_type', label: {fr: 'Type de projet', en: 'Project Type', de: 'Projekttyp'}, type: 'text', defaultValue: 'Acquisition Immobilière', validation: { type: 'string' } },
    { name: 'max_amount', label: {fr:'Montant d\'éligibilité max. (€)', en: 'Max. Eligibility Amount (€)', de: 'Max. Förderbetrag (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'max_amount_in_words', label: {fr:'Montant en toutes lettres', en: 'Amount in words', de: 'Betrag in Worten'}, type: 'text', validation: { type: 'string' } },
  ],
  'contrat-de-pret-personnel': [
    { name: 'type_of_loan', label: {fr: 'Type de prêt'}, type: 'text', defaultValue: 'Contrat de Prêt', validation: { type: 'string' } },
    { name: 'contract_ref', label: {fr: 'Référence du contrat'}, type: 'text', defaultValue: `CPP-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'contract_date', label: {fr: 'Date du contrat'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'borrower_name', label: {fr: 'Nom de l\'emprunteur'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr: 'Adresse de l\'emprunteur'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_id', label: {fr: 'N° Pièce d\'identité'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres'}, type: 'text', validation: { type: 'string' } },
    { name: 'taeg', label: {fr: 'TAEG Fixe'}, type: 'text', defaultValue: '2.00%', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)'}, type: 'number', validation: { type: 'number' } },
    { name: 'start_date', label: {fr: 'Date de 1ère échéance'}, type: 'date', validation: { type: 'date' } },
    { name: 'end_date', label: {fr: 'Date de dernière échéance'}, type: 'date', validation: { type: 'date' } },
    { name: 'monthly_payment', label: {fr: 'Mensualité (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_cost', label: {fr: 'Coût total du crédit (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_due', label: {fr: 'Montant total dû (€)'}, type: 'number', validation: { type: 'number' } },
  ],
  'acte-de-cautionnement-solidaire': [
    { name: 'type_of_loan', label: {fr: 'Type de prêt concerné', en: 'Concerned Loan Type', de: 'Betroffene Darlehensart'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'act_ref', label: {fr:'Référence de l\'acte', en: 'Act Reference', de: 'Aktenzeichen'}, type: 'text', defaultValue: `ACS-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date de signature', en: 'Signature Date', de: 'Unterzeichnungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'borrower_name', label: {fr:'Nom du débiteur (emprunteur)', en: 'Debtor Name (borrower)', de: 'Name des Schuldners (Kreditnehmer)'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr:'Adresse du débiteur', en: 'Debtor Address', de: 'Adresse des Schuldners'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_id', label: {fr: 'N° Pièce d\'identité du débiteur', en: 'Debtor ID Number', de: 'Ausweisnummer des Schuldners'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr: 'Référence du Contrat de Prêt', en: 'Loan Contract Reference', de: 'Referenz des Darlehensvertrags'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr:'Montant du prêt (€)', en: 'Loan Amount (€)', de: 'Darlehensbetrag (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr:'Montant en toutes lettres', en: 'Amount in words', de: 'Betrag in Worten'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)', de: 'Laufzeit des Darlehens (Monate)'}, type: 'number', validation: { type: 'number' } },
    { name: 'deposit_amount', label: {fr: 'Montant du dépôt de garantie (€)', en: 'Security Deposit Amount (€)', de: 'Höhe der Sicherheitsleistung (€)'}, type: 'number', validation: { type: 'number' } },
  ],
  'attestation-assurance-emprunteur': [
    { name: 'loan_type', label: {fr: 'Type de prêt', en: 'Loan Type', de: 'Darlehensart'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'ref', label: {fr:'N° de certificat', en:'Certificate No.', de: 'Zertifikats-Nr.'}, type: 'text', defaultValue: `AAE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'issue_date', label: {fr:'Date d\'émission', en:'Issue Date', de: 'Ausstellungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'insured_name', label: {fr:'Nom de l\'assuré', en: 'Insured Name', de: 'Name des Versicherten'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_dob', label: {fr:'Date de naissance de l\'assuré', en: 'Insured Date of Birth', de: 'Geburtsdatum des Versicherten'}, type: 'date', validation: { type: 'date' } },
    { name: 'insured_address', label: {fr:'Adresse de l\'assuré', en: 'Insured Address', de: 'Adresse des Versicherten'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_id', label: {fr:'N° Pièce d\'identité de l\'assuré', en: 'Insured ID Number', de: 'Ausweisnummer des Versicherten'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_contract_ref', label: {fr:'N° du contrat de prêt', en:'Loan Contract No.', de: 'Darlehensvertrags-Nr.'}, type: 'text', validation: { type: 'string' } },
    { name: 'insured_capital', label: {fr:'Capital assuré (€)', en: 'Insured Capital (€)', de: 'Versichertes Kapital (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'coverage_duration', label: {fr:'Durée de la couverture (mois)', en: 'Coverage Duration (months)', de: 'Laufzeit des Versicherungsschutzes (Monate)'}, type: 'number', validation: { type: 'number' } },
    { name: 'monthly_premium', label: {fr:'Prime mensuelle (€)', en: 'Monthly Premium (€)', de: 'Monatliche Prämie (€)'}, type: 'number', validation: { type: 'number' } },
  ],
  'notice-information-assurance': [],
  'facture': invoiceFields,
  'facture-neofonds': neofondsInvoiceFields,
  'recu-de-paiement': [
    { name: 'ref', label: { fr: 'Référence du reçu' }, type: 'text', defaultValue: `RECU-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'payment_date', label: { fr: 'Date du paiement' }, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'payer_name', label: { fr: 'Nom du payeur' }, type: 'text', validation: { type: 'string' } },
    { name: 'payer_address', label: { fr: 'Adresse du payeur' }, type: 'text', validation: { type: 'string' } },
    { name: 'payment_amount', label: { fr: 'Montant reçu (€)' }, type: 'number', validation: { type: 'number' } },
    { name: 'payment_method', label: { fr: 'Moyen de paiement' }, type: 'text', defaultValue: 'Virement bancaire', validation: { type: 'string' } },
    { name: 'payment_reference', label: { fr: 'Référence du paiement (ex: facture, contrat)' }, type: 'text', validation: { type: 'string' } },
  ],
  'recu-neofonds': [
    { name: 'ref', label: { fr: 'Référence du reçu' }, type: 'text', defaultValue: `NEO-RECU-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'payment_date', label: { fr: 'Date du paiement' }, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'payer_name', label: { fr: 'Nom du payeur' }, type: 'text', validation: { type: 'string' } },
    { name: 'payer_address', label: { fr: 'Adresse du payeur' }, type: 'text', validation: { type: 'string' } },
    { name: 'payment_amount', label: { fr: 'Montant reçu (€)' }, type: 'number', validation: { type: 'number' } },
    { name: 'payment_method', label: { fr: 'Moyen de paiement' }, type: 'text', defaultValue: 'Virement bancaire', validation: { type: 'string' } },
    { name: 'payment_reference', label: { fr: 'Référence du paiement (ex: facture, contrat)' }, type: 'text', validation: { type: 'string' } },
  ],
  'licence-bancaire': [
    { name: 'ref', label: {fr: 'Numéro de Licence'}, type: 'text', defaultValue: `LB-CE-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'issue_date', label: {fr: 'Date de délivrance'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'autorisation-courtage': [
    { name: 'ref', label: {fr: 'Numéro d\'Immatriculation ORIAS'}, type: 'text', defaultValue: `21008679`, validation: { type: 'string' } },
    { name: 'issue_date', label: {fr: 'Date d\'émission'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
  ],
  'document-vierge': [],
};
