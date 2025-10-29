
import type { Clauses } from "./languages";

export const invoiceClauses: Clauses = {
    fr: {
        title: "Facture",
        importance: {
            "title": "Importance de ce document",
            "description": "La facture est un document commercial, comptable et juridique qui détaille une prestation de service ou une vente de marchandise. Elle est obligatoire et sert de preuve de la transaction."
        },
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
        importance: {
            "title": "Importance of this document",
            "description": "The invoice is a commercial, accounting, and legal document that details a service provided or a sale of goods. It is mandatory and serves as proof of the transaction."
        },
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
