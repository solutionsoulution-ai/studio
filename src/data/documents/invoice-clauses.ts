
import type { Clauses } from "./languages";

export const invoiceClauses: Clauses = {
    fr: {
        title: "Facture",
        invoice_number_label: "Facture n°:",
        date_label: "Date :",
        bill_to_label: "Facturé à :",
        table_headers: { "description": "Description", "amount": "Montant" },
        total_label: "Net à Payer",
        payment_terms: {
            "title": "Modalités de Paiement",
            "due_date": "Paiement dû sous 30 jours.",
            "iban_label": "Veuillez utiliser les coordonnées bancaires suivantes :"
        }
    },
    en: {
        title: "Invoice",
        invoice_number_label: "Invoice #:",
        date_label: "Date:",
        bill_to_label: "Bill to:",
        table_headers: { "description": "Description", "amount": "Amount" },
        total_label: "Net Payable",
        payment_terms: {
            "title": "Payment Terms",
            "due_date": "Payment due within 30 days.",
            "iban_label": "Please use the following bank details:"
        }
    }
};
