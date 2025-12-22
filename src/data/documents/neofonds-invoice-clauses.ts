
import type { Clauses } from "./languages";

export const neofondsInvoiceClauses: Clauses = {
    fr: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Facture",
        invoice_number_label: "Facture n°:",
        date_label: "Date :",
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
            "contact_info": "Pour toute question, contactez notre service comptabilité à neofonds@europe.com"
        }
    },
    en: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Germany",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Invoice",
        invoice_number_label: "Invoice #:",
        date_label: "Date:",
        bill_to_label: "Bill To:",
        table_headers: { "description": "Description", "quantity": "Qty", "unit_price": "Unit Price (excl. VAT)", "amount": "Amount (excl. VAT)" },
        subtotal_label: "Subtotal (excl. VAT)",
        vat_label: "VAT (19%)",
        total_label: "Net Payable (incl. VAT)",
        payment_terms: {
            "title": "Payment Terms",
            "instruction": "Payment upon receipt of invoice.",
            "proof_of_payment": "For any questions, please contact us.",
        },
        footer: {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at neofonds@europe.com"
        }
    },
    de: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Rechnung",
        invoice_number_label: "Rechnung Nr.:",
        date_label: "Datum:",
        bill_to_label: "Rechnung an:",
        table_headers: { "description": "Beschreibung", "quantity": "Menge", "unit_price": "Einzelpreis (exkl. MwSt.)", "amount": "Betrag (exkl. MwSt.)" },
        subtotal_label: "Zwischensumme (exkl. MwSt.)",
        vat_label: "MwSt. (19%)",
        total_label: "Nettobetrag (inkl. MwSt.)",
        payment_terms: {
            "title": "Zahlungsbedingungen",
            "instruction": "Zahlung bei Rechnungserhalt.",
            "proof_of_payment": "Bei Fragen kontaktieren Sie uns bitte.",
        },
        footer: {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter neofonds@europe.com"
        }
    },
    lt: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Vokietija",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Sąskaita faktūra",
        invoice_number_label: "Sąskaitos Nr.:",
        date_label: "Data:",
        bill_to_label: "Sąskaita išrašyta:",
        table_headers: { "description": "Aprašymas", "quantity": "Kiekis", "unit_price": "Vieneto kaina (be PVM)", "amount": "Suma (be PVM)" },
        subtotal_label: "Tarpinė suma (be PVM)",
        vat_label: "PVM (19%)",
        total_label: "Bendra mokėtina suma (su PVM)",
        payment_terms: {
            "title": "Mokėjimo sąlygos",
            "instruction": "Apmokėjimas gavus sąskaitą.",
            "proof_of_payment": "Jei turite klausimų, susisiekite su mumis.",
        },
        footer: {
            "thank_you": "Dėkojame už jūsų pasitikėjimą.",
            "contact_info": "Jei turite klausimų, susisiekite su mūsų buhalterija el. paštu neofonds@europe.com"
        }
    }
};
