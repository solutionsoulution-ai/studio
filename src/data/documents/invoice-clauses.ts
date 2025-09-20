
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
            iban_label: "Veuillez utiliser les coordonnées bancaires suivantes pour le paiement :",
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
            iban_label: "Please use the following bank details for payment:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Thank you for your business. If you have any questions about this invoice, please contact us at accounting@vylscapital.com.",
        }
    },
    de: {
        title: "Rechnung",
        invoice_number_label: "Rechnung Nr:",
        date_label: "Datum:",
        bill_to_label: "Rechnung an:",
        table_headers: {
            description: "Beschreibung",
            amount: "Betrag",
        },
        subtotal_label: "Zwischensumme (exkl. MwSt.)",
        vat_label: "MwSt. (0%)",
        total_label: "Gesamtbetrag",
        payment_terms: {
            title: "Zahlungsbedingungen",
            due_date: "Zahlung fällig innerhalb von 30 Tagen ab Rechnungsdatum.",
            iban_label: "Bitte verwenden Sie die folgende Bankverbindung für die Zahlung:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Vielen Dank für Ihr Vertrauen. Bei Fragen zu dieser Rechnung kontaktieren Sie uns bitte unter accounting@vylscapital.com.",
        }
    },
    es: {
        title: "Factura",
        invoice_number_label: "Factura Nº:",
        date_label: "Fecha:",
        bill_to_label: "Facturar a:",
        table_headers: {
            description: "Descripción",
            amount: "Importe",
        },
        subtotal_label: "Subtotal (sin IVA)",
        vat_label: "IVA (0%)",
        total_label: "Total a Pagar",
        payment_terms: {
            title: "Condiciones de Pago",
            due_date: "Pago a 30 días desde la fecha de la factura.",
            iban_label: "Utilice los siguientes datos bancarios para el pago:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Gracias por su confianza. Si tiene alguna pregunta sobre esta factura, contáctenos en accounting@vylscapital.com.",
        }
    },
    pt: {
        title: "Fatura",
        invoice_number_label: "Fatura Nº:",
        date_label: "Data:",
        bill_to_label: "Faturar a:",
        table_headers: {
            description: "Descrição",
            amount: "Valor",
        },
        subtotal_label: "Subtotal (sem IVA)",
        vat_label: "IVA (0%)",
        total_label: "Total a Pagar",
        payment_terms: {
            title: "Condições de Pagamento",
            due_date: "Pagamento devido no prazo de 30 dias a partir da data da fatura.",
            iban_label: "Utilize os seguintes dados bancários para o pagamento:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Obrigado pela sua preferência. Se tiver alguma dúvida sobre esta fatura, entre em contato conosco pelo e-mail accounting@vylscapital.com.",
        }
    },
    it: {
        title: "Fattura",
        invoice_number_label: "Fattura N°:",
        date_label: "Data:",
        bill_to_label: "Fatturare a:",
        table_headers: {
            description: "Descrizione",
            amount: "Importo",
        },
        subtotal_label: "Subtotale (IVA esclusa)",
        vat_label: "IVA (0%)",
        total_label: "Totale da Pagare",
        payment_terms: {
            title: "Termini di Pagamento",
            due_date: "Pagamento dovuto entro 30 giorni dalla data della fattura.",
            iban_label: "Si prega di utilizzare le seguenti coordinate bancarie per il pagamento:",
            bic_label: "BIC/SWIFT:",
        },
        footer: {
            thank_you: "Grazie per la vostra fiducia. Per qualsiasi domanda su questa fattura, vi preghiamo di contattarci a accounting@vylscapital.com.",
        }
    }
}
