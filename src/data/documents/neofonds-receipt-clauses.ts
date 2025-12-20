
import type { Clauses } from "./languages";

export const neofondsReceiptClauses: Clauses = {
    fr: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Reçu de Paiement",
        reference: "Reçu N°: {ref}",
        date: "Date du paiement: {payment_date}",
        received_from: "Reçu de :",
        payment_details: {
            title: "Détails du Paiement",
            amount_label: "Montant Reçu",
            method_label: "Méthode de Paiement",
            reference_label: "Pour la référence suivante",
        },
        confirmation: {
            title: "Confirmation",
            content: "Nous soussignés, Neofonds, confirmons par la présente avoir reçu la somme susmentionnée. Ce reçu atteste du règlement partiel ou total de la créance référencée. Sauf erreur ou omission, ce paiement solde le montant dû.",
        },
        signature_label: "Pour Neofonds, Service Comptabilité",
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
        title: "Payment Receipt",
        reference: "Receipt No: {ref}",
        date: "Payment Date: {payment_date}",
        received_from: "Received from:",
        payment_details: {
            title: "Payment Details",
            amount_label: "Amount Received",
            method_label: "Payment Method",
            reference_label: "For the following reference",
        },
        confirmation: {
            title: "Confirmation",
            content: "We, the undersigned, Neofonds, hereby confirm receipt of the aforementioned sum. This receipt serves as proof of partial or total settlement of the referenced debt. Barring errors or omissions, this payment settles the amount due.",
        },
        signature_label: "For Neofonds, Accounting Department",
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
        title: "Zahlungsbeleg",
        reference: "Beleg Nr.: {ref}",
        date: "Zahlungsdatum: {payment_date}",
        received_from: "Erhalten von:",
        payment_details: {
            title: "Zahlungsdetails",
            amount_label: "Erhaltener Betrag",
            method_label: "Zahlungsmethode",
            reference_label: "Für die folgende Referenz",
        },
        confirmation: {
            title: "Bestätigung",
            content: "Wir, die Unterzeichner, Neofonds, bestätigen hiermit den Erhalt des oben genannten Betrags. Dieser Beleg dient als Nachweis für die teilweise oder vollständige Begleichung der angegebenen Forderung. Irrtümer und Auslassungen vorbehalten, begleicht diese Zahlung den fälligen Betrag.",
        },
        signature_label: "Für Neofonds, Buchhaltung",
        footer: {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter neofonds@europe.com"
        }
    }
};
