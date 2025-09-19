
"use client";

export const invoiceClauses = {
    fr: {
        title: "Facture",
        invoice_number_label: "Facture n°:",
        date_label: "Date :",
        bill_to_label: "Facturé à :",
        table_headers: {
            description: "Description",
            amount: "Montant",
        },
        subtotal_label: "Sous-total HT",
        vat_label: "TVA (0%)",
        total_label: "Net à Payer",
        payment_terms: {
            title: "Modalités de Paiement",
            due_date: "Paiement dû sous 30 jours à compter de la date de la facture.",
            iban_label: "IBAN :",
            bic_label: "BIC/SWIFT :",
        },
        footer: {
            thank_you: "Nous vous remercions pour votre confiance. Pour toute question concernant cette facture, veuillez nous contacter à comptabilite@vylscapital.com.",
        }
    },
    en: {
        title: "Invoice",
        invoice_number_label: "Invoice No:",
        date_label: "Date:",
        bill_to_label: "Bill To:",
        table_headers: {
            description: "Description",
            amount: "Amount",
        },
        subtotal_label: "Subtotal (VAT Excl.)",
        vat_label: "VAT (0%)",
        total_label: "Total Due",
        payment_terms: {
            title: "Payment Terms",
            due_date: "Payment due within 30 days from the invoice date.",
            iban_label: "IBAN:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Thank you for your business. If you have any questions about this invoice, please contact us at accounting@vylscapital.com.",
        }
    }
}
