
import type { Language } from "@/data/documents/languages";

export type DocumentField = {
  name: string;
  label: { [key in Language]?: string };
  type: 'text' | 'number' | 'date' | 'textarea';
  defaultValue?: string | number;
  placeholder?: { [key in Language]?: string };
  validation: {
    type: 'string' | 'number' | 'date';
    email?: boolean;
  };
};

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
    { name: 'type_of_loan', label: {fr: 'Type de prêt', en: 'Loan Type', de: 'Darlehensart'}, type: 'text', defaultValue: 'Prêt Personnel', validation: { type: 'string' } },
    { name: 'contract_ref', label: {fr: 'Référence du contrat', en: 'Contract Reference', de: 'Vertragsreferenz'}, type: 'text', defaultValue: `CPP-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'contract_date', label: {fr: 'Date du contrat', en: 'Contract Date', de: 'Vertragsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'borrower_name', label: {fr: 'Nom de l\'emprunteur', en: 'Borrower Name', de: 'Name des Kreditnehmers'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_address', label: {fr: 'Adresse de l\'emprunteur', en: 'Borrower Address', de: 'Adresse des Kreditnehmers'}, type: 'text', validation: { type: 'string' } },
    { name: 'borrower_id', label: {fr: 'N° Pièce d\'identité', en: 'ID Number', de: 'Ausweisnummer'}, type: 'text', validation: { type: 'string' } },
    { name: 'loan_amount', label: {fr: 'Montant du prêt (€)', en: 'Loan Amount (€)', de: 'Darlehensbetrag (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'loan_amount_in_words', label: {fr: 'Montant en toutes lettres', en: 'Amount in words', de: 'Betrag in Worten'}, type: 'text', validation: { type: 'string' } },
    { name: 'taeg', label: {fr: 'TAEG Fixe', en: 'Fixed APR', de: 'Fester effektiver Jahreszins'}, type: 'text', defaultValue: '2.00%', validation: { type: 'string' } },
    { name: 'loan_term', label: {fr: 'Durée du prêt (mois)', en: 'Loan Term (months)', de: 'Laufzeit des Darlehens (Monate)'}, type: 'number', validation: { type: 'number' } },
    { name: 'start_date', label: {fr: 'Date de 1ère échéance', en: 'First Installment Date', de: 'Datum der ersten Rate'}, type: 'date', validation: { type: 'date' } },
    { name: 'end_date', label: {fr: 'Date de dernière échéance', en: 'Last Installment Date', de: 'Datum der letzten Rate'}, type: 'date', validation: { type: 'date' } },
    { name: 'monthly_payment', label: {fr: 'Mensualité (€)', en: 'Monthly Payment (€)', de: 'Monatliche Rate (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_cost', label: {fr: 'Coût total du crédit (€)', en: 'Total Credit Cost (€)', de: 'Gesamtkreditkosten (€)'}, type: 'number', validation: { type: 'number' } },
    { name: 'total_due', label: {fr: 'Montant total dû (€)', en: 'Total Amount Due (€)', de: 'Gesamtschuldbetrag (€)'}, type: 'number', validation: { type: 'number' } },
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
  'facture': [
    { name: 'ref', label: {fr:'N° de facture', en: 'Invoice No.', de: 'Rechnungs-Nr.'}, type: 'text', defaultValue: `FACT-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'date', label: {fr:'Date de facturation', en: 'Invoice Date', de: 'Rechnungsdatum'}, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'client_name', label: {fr:'Nom du client', en: 'Client Name', de: 'Kundenname'}, type: 'text', validation: { type: 'string' } },
    { name: 'client_address', label: {fr:'Adresse du client', en: 'Client Address', de: 'Kundenadresse'}, type: 'textarea', validation: { type: 'string' } },
    { name: 'iban', label: {fr:'IBAN pour le paiement', en: 'IBAN for payment', de: 'IBAN für Zahlung'}, type: 'text', validation: { type: 'string' } },
  ],
  'recu-de-paiement': [
    { name: 'ref', label: { fr: 'Référence du reçu', en: 'Receipt Reference', de: 'Belegreferenz' }, type: 'text', defaultValue: `RECU-${new Date().getFullYear()}-`, validation: { type: 'string' } },
    { name: 'payment_date', label: { fr: 'Date du paiement', en: 'Payment Date', de: 'Zahlungsdatum' }, type: 'date', defaultValue: new Date().toISOString().split('T')[0], validation: { type: 'date' } },
    { name: 'payer_name', label: { fr: 'Nom du payeur', en: 'Payer Name', de: 'Name des Zahlers' }, type: 'text', validation: { type: 'string' } },
    { name: 'payer_address', label: { fr: 'Adresse du payeur', en: 'Payer Address', de: 'Adresse des Zahlers' }, type: 'text', validation: { type: 'string' } },
    { name: 'payment_amount', label: { fr: 'Montant reçu (€)', en: 'Amount Received (€)', de: 'Erhaltener Betrag (€)' }, type: 'number', validation: { type: 'number' } },
    { name: 'payment_amount_in_words', label: { fr: 'Montant en toutes lettres', en: 'Amount in Words', de: 'Betrag in Worten' }, type: 'text', validation: { type: 'string' } },
    { name: 'payment_method', label: { fr: 'Moyen de paiement', en: 'Payment Method', de: 'Zahlungsmethode' }, type: 'text', defaultValue: 'Virement bancaire', validation: { type: 'string' } },
    { name: 'payment_reference', label: { fr: 'Référence du paiement (ex: facture, contrat)', en: 'Payment Reference (e.g., invoice, contract)', de: 'Zahlungsreferenz (z.B. Rechnung, Vertrag)' }, type: 'text', validation: { type: 'string' } },
  ],
  'document-vierge': [],
};
