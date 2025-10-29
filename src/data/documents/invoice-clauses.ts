
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
            "due_date": "Paiement dû à réception de la facture, au plus tard sous 30 jours.",
            "iban_label": "Veuillez effectuer le virement sur le compte bancaire suivant, en rappelant la référence de la facture :",
            "late_penalty": "Conformément à la loi, tout retard de paiement entraînera l'application de pénalités de retard égales à trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €."
        },
        footer: {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à contact@capfinfy.com"
        }
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
            "due_date": "Payment due upon receipt of the invoice, no later than 30 days.",
            "iban_label": "Please make the bank transfer to the following account, mentioning the invoice reference:",
            "late_penalty": "In accordance with the law, any late payment will result in the application of late payment penalties equal to three times the legal interest rate, as well as a fixed compensation for recovery costs of €40."
        },
        footer: {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at contact@capfinfy.com"
        }
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
            "due_date": "Zahlung fällig bei Rechnungserhalt, spätestens innerhalb von 30 Tagen.",
            "iban_label": "Bitte überweisen Sie den Betrag auf das folgende Bankkonto unter Angabe der Rechnungsnummer:",
            "late_penalty": "Gemäß den gesetzlichen Bestimmungen werden bei Zahlungsverzug Verzugszinsen in Höhe des Dreifachen des gesetzlichen Zinssatzes sowie eine pauschale Entschädigung für Beitreibungskosten in Höhe von 40 € erhoben."
        },
        footer: {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter contact@capfinfy.com"
        }
    }
};
