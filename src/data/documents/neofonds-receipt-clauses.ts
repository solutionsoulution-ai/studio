
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
    },
    lt: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Vokietija",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Mokėjimo kvitas",
        reference: "Kvito Nr.: {ref}",
        date: "Mokėjimo data: {payment_date}",
        received_from: "Gauta iš:",
        payment_details: {
            title: "Mokėjimo informacija",
            amount_label: "Gauta suma",
            method_label: "Mokėjimo būdas",
            reference_label: "Pagal šią nuorodą",
        },
        confirmation: {
            title: "Patvirtinimas",
            content: "Mes, žemiau pasirašiusieji, Neofonds, šiuo patvirtiname, kad gavome minėtą sumą. Šis kvitas patvirtina dalinį ar visišką nurodytos skolos apmokėjimą. Išskyrus klaidas ar praleidimus, šis mokėjimas padengia visą mokėtiną sumą.",
        },
        signature_label: "Už Neofonds, Buhalterijos skyrius",
        footer: {
            "thank_you": "Dėkojame už jūsų pasitikėjimą.",
            "contact_info": "Jei turite klausimų, susisiekite su mūsų buhalterija el. paštu neofonds@europe.com"
        }
    },
    nl: {
        company: {
            name: "Neofonds",
            address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Duitsland",
            phone: "+49 163 2247344",
            emails: ["neofonds@europe.com"]
        },
        title: "Betalingsbewijs",
        reference: "Bewijs Nr: {ref}",
        date: "Betalingsdatum: {payment_date}",
        received_from: "Ontvangen van:",
        payment_details: {
            title: "Betalingsgegevens",
            amount_label: "Ontvangen Bedrag",
            method_label: "Betalingsmethode",
            reference_label: "Voor de volgende referentie",
        },
        confirmation: {
            title: "Bevestiging",
            content: "Wij, ondergetekenden, Neofonds, bevestigen hierbij de ontvangst van het bovengenoemde bedrag. Dit bewijs getuigt van de gedeeltelijke of volledige vereffening van de genoemde schuld. Fouten en omissies voorbehouden, deze betaling vereffent het verschuldigde bedrag.",
        },
        signature_label: "Voor Neofonds, Boekhoudafdeling",
        footer: {
            "thank_you": "Dank u voor uw vertrouwen.",
            "contact_info": "Voor vragen kunt u contact opnemen met onze boekhoudafdeling via neofonds@europe.com"
        }
    }
};
