
import type { Clauses } from "./languages";

export const invoiceClauses: Clauses = {
    fr: {
        title: "Facture",
        importance: {
            "title": "Importance de ce document",
            "description": "La facture est un document commercial, comptable et juridique qui détaille une prestation de service ou une vente de marchandise. Elle est obligatoire, sert de preuve de la transaction et de justificatif pour la comptabilité et la TVA."
        },
        invoice_number_label: "Facture n°:",
        date_label: "Date :",
        due_date_label: "Échéance :",
        bill_to_label: "Facturé à :",
        table_headers: { "description": "Description", "quantity": "Qté", "unit_price": "P.U. HT", "amount": "Montant HT" },
        subtotal_label: "Sous-total HT",
        vat_label: "TVA (20%)",
        total_label: "Net à Payer TTC",
        payment_terms: {
            "title": "Modalités et Conditions de Paiement",
            "due_date": "Paiement dû à réception de la facture, au plus tard sous 30 jours.",
            "iban_label": "Veuillez effectuer le virement sur le compte bancaire suivant, en rappelant la référence de la facture :",
            "late_penalty": "Conformément à la loi, tout retard de paiement entraînera l'application de pénalités de retard égales à trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €."
        }
    },
    en: {
        title: "Invoice",
        importance: {
            "title": "Importance of this document",
            "description": "The invoice is a commercial, accounting, and legal document that details a service provided or a sale of goods. It is mandatory, serves as proof of the transaction, and as a supporting document for accounting and VAT."
        },
        invoice_number_label: "Invoice #:",
        date_label: "Date:",
        due_date_label: "Due Date:",
        bill_to_label: "Bill to:",
        table_headers: { "description": "Description", "quantity": "Qty", "unit_price": "Unit Price (excl. VAT)", "amount": "Amount (excl. VAT)" },
        subtotal_label: "Subtotal (excl. VAT)",
        vat_label: "VAT (20%)",
        total_label: "Net Payable (incl. VAT)",
        payment_terms: {
            "title": "Payment Terms and Conditions",
            "due_date": "Payment due upon receipt of the invoice, no later than 30 days.",
            "iban_label": "Please make the bank transfer to the following account, mentioning the invoice reference:",
            "late_penalty": "In accordance with the law, any late payment will result in the application of late payment penalties equal to three times the legal interest rate, as well as a fixed compensation for recovery costs of €40."
        }
    }
};
