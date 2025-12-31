
import type { Clauses } from "./languages";

export const vantexReceiptClauses: Clauses = {
    fr: {
        company: {
            name: "Vantex Bank",
            address: "66 Avenue des Champs-Élysées, 75008 Paris, France",
            phone: "+84567056073",
            emails: ["bankservices@vantex-bank.net"]
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
            content: "Nous soussignés, Vantex Bank, confirmons par la présente avoir reçu la somme susmentionnée. Ce reçu atteste du règlement partiel ou total de la créance référencée. Sauf erreur ou omission, ce paiement solde le montant dû.",
        },
        signature_label: "Pour Vantex Bank, Service Comptabilité",
        footer: {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à bankservices@vantex-bank.net"
        }
    },
    en: {
        company: {
            name: "Vantex Bank",
            address: "66 Avenue des Champs-Élysées, 75008 Paris, France",
            phone: "+84567056073",
            emails: ["bankservices@vantex-bank.net"]
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
            content: "We, the undersigned, Vantex Bank, hereby confirm receipt of the aforementioned sum. This receipt serves as proof of partial or total settlement of the referenced debt. Barring errors or omissions, this payment settles the amount due.",
        },
        signature_label: "For Vantex Bank, Accounting Department",
        footer: {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at bankservices@vantex-bank.net"
        }
    },
    de: {
        company: {
            name: "Vantex Bank",
            address: "66 Avenue des Champs-Élysées, 75008 Paris, Frankreich",
            phone: "+84567056073",
            emails: ["bankservices@vantex-bank.net"]
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
            content: "Wir, die Unterzeichner, Vantex Bank, bestätigen hiermit den Erhalt des oben genannten Betrags. Dieser Beleg dient als Nachweis für die teilweise oder vollständige Begleichung der angegebenen Forderung. Irrtümer und Auslassungen vorbehalten, begleicht diese Zahlung den fälligen Betrag.",
        },
        signature_label: "Für Vantex Bank, Buchhaltung",
        footer: {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter bankservices@vantex-bank.net"
        }
    },
    lt: {
        company: {
            name: "Vantex Bank",
            address: "66 Avenue des Champs-Élysées, 75008 Paryžius, Prancūzija",
            phone: "+84567056073",
            emails: ["bankservices@vantex-bank.net"]
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
            content: "Mes, žemiau pasirašiusieji, Vantex Bank, šiuo patvirtiname, kad gavome minėtą sumą. Šis kvitas patvirtina dalinį ar visišką nurodytos skolos apmokėjimą. Išskyrus klaidas ar praleidimus, šis mokėjimas padengia visą mokėtiną sumą.",
        },
        signature_label: "Už Vantex Bank, Buhalterijos skyrius",
        footer: {
            "thank_you": "Dėkojame už jūsų pasitikėjimą.",
            "contact_info": "Jei turite klausimų, susisiekite su mūsų buhalterija el. paštu bankservices@vantex-bank.net"
        }
    },
    nl: {
        company: {
            name: "Vantex Bank",
            address: "66 Avenue des Champs-Élysées, 75008 Parijs, Frankrijk",
            phone: "+84567056073",
            emails: ["bankservices@vantex-bank.net"]
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
            content: "Wij, ondergetekenden, Vantex Bank, bevestigen hierbij de ontvangst van het bovengenoemde bedrag. Dit bewijs getuigt van de gedeeltelijke of volledige vereffening van de genoemde schuld. Fouten en omissies voorbehouden, deze betaling vereffent het verschuldigde bedrag.",
        },
        signature_label: "Voor Vantex Bank, Boekhoudafdeling",
        footer: {
            "thank_you": "Dank u voor uw vertrouwen.",
            "contact_info": "Voor vragen kunt u contact opnemen met onze boekhoudafdeling via bankservices@vantex-bank.net"
        }
    }
};

