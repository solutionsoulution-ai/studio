
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
            "instruction": "Paiement à réception de la facture.",
            "proof_of_payment": "Pour toute question, veuillez nous contacter.",
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
