
import type { Clauses } from "./languages";

export const neofondsInvoiceClauses: Clauses = {
    fr: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
            phone: "+49 163 2247344",
            emails: ["contact@neofonds.com", "neofonds@europe.com"]
        },
        title: "Facture",
        invoice_number_label: "Facture n°:",
        date_label: "Date :",
        due_date_label: "Échéance :",
        bill_to_label: "Facturé à :",
        table_headers: { "description": "Description", "quantity": "Qté", "unit_price": "P.U. HT", "amount": "Montant HT" },
        subtotal_label: "Sous-total HT",
        vat_label: "TVA (19%)", // Standard German VAT
        total_label: "Net à Payer TTC",
        payment_terms: {
            "title": "Modalités de Paiement",
            "instruction": "Veuillez effectuer le virement sur le compte bancaire suivant :",
            "proof_of_payment": "Afin d'accélérer le traitement, merci d'envoyer une preuve de virement à contact@neofonds.com.",
            "account_holder_label": "Titulaire du compte",
            "bank_name_label": "Domiciliation",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Motif de virement",
            "payment_reason_value": "Paiement Facture {ref}"
        },
        footer: {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à contact@neofonds.com"
        }
    },
    en: {
        // Translations could be added here
    },
    de: {
        // Translations could be added here
    }
};
