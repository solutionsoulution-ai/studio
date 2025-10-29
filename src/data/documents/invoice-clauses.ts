
import type { Clauses } from "./languages";

export const invoiceClauses: Clauses = {
    fr: {
        title: "Facture",
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
            "instruction": "Veuillez effectuer le virement sur le compte bancaire suivant :",
            "proof_of_payment": "Afin d'accélérer le traitement, merci d'envoyer une preuve de virement à capfinfy@gmail.com.",
            "bank_name_label": "Domiciliation",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Motif de virement",
            "payment_reason_value": "Paiement"
        },
        footer: {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à contact@capfinfy.com"
        },
        items_section_title: "Détails de la facturation"
    },
    en: {
        title: "Invoice",
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
            "instruction": "Please make the bank transfer to the following account:",
            "proof_of_payment": "To speed up processing, please send proof of payment to capfinfy@gmail.com.",
            "bank_name_label": "Bank Name",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Payment Reference",
            "payment_reason_value": "Payment"
        },
        footer: {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at contact@capfinfy.com"
        },
        items_section_title: "Billing Details"
    },
    de: {
        title: "Rechnung",
        invoice_number_label: "Rechnung Nr.:",
        date_label: "Datum:",
        due_date_label: "Fälligkeitsdatum:",
        bill_to_label: "Rechnung an:",
        table_headers: { "description": "Beschreibung", "quantity": "Menge", "unit_price": "Einzelpreis (exkl. MwSt.)", "amount": "Betrag (exkl. MwSt.)" },
        subtotal_label: "Zwischensumme (exkl. MwSt.)",
        vat_label: "MwSt. (20%)",
        total_label: "Nettobetrag (inkl. MwSt.)",
        payment_terms: {
            "title": "Zahlungsbedingungen",
            "instruction": "Bitte überweisen Sie den Betrag auf das folgende Bankkonto:",
            "proof_of_payment": "Um die Bearbeitung zu beschleunigen, senden Sie bitte einen Zahlungsnachweis an capfinfy@gmail.com.",
            "bank_name_label": "Bankname",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Verwendungszweck",
            "payment_reason_value": "Zahlung"
        },
        footer: {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter contact@capfinfy.com"
        },
        items_section_title: "Rechnungsdetails"
    }
};
