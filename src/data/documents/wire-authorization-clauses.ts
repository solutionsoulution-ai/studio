
import type { Clauses } from "./languages";

export const wireAuthorizationClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Financier",
            line2: "Unité des Opérations de Paiement",
        },
        title: "Autorisation de Virement de Fonds",
        reference: "Autorisation N°: {ref}",
        date: "Date d'émission: {date}",
        parties: {
            issuer_label: "Émetteur de l'ordre de virement :",
            beneficiary_label: "Bénéficiaire du virement :",
        },
        articles: {
            authorization: {
                title: "Article 1 : Ordre de Virement Irrévocable",
                content: `Par la présente, ${companyName}, agissant en qualité de prêteur dans le cadre du contrat de prêt N° {loan_contract_ref}, autorise et ordonne irrévocablement le virement de la somme de {loan_amount} ({loan_amount_in_words}) au bénéfice de {borrower_name}, aux coordonnées bancaires ci-dessous.`,
            },
            bank_details: {
                title: "Article 2 : Coordonnées Bancaires du Bénéficiaire",
                bank_name_label: "Nom de la banque",
                account_holder_label: "Titulaire du compte",
                iban_label: "IBAN",
                bic_swift_label: "Code BIC / SWIFT",
            },
            execution_terms: {
                title: "Article 3 : Conditions d'Exécution",
                content: "Ce virement sera exécuté sous 24 à 48 heures ouvrées à compter de la date de la présente autorisation. Le temps de traitement interbancaire peut varier. Cet ordre de paiement est ferme et définitif.",
            },
            liability: {
                title: "Article 4 : Exonération de Responsabilité",
                content: `Une fois les fonds virés aux coordonnées fournies par le bénéficiaire, ${companyName} est libérée de son obligation de mise à disposition des fonds. Toute erreur dans les coordonnées bancaires fournies relève de la seule responsabilité du bénéficiaire.`,
            },
            proof: {
                title: "Article 5 : Justificatif de Transaction",
                content: `Ce document constitue une instruction de paiement formelle et peut être présenté à toute autorité compétente ou institution financière comme preuve de l'ordre de virement initié par ${companyName}.`,
            },
        },
    },
    en: {
        header: {
            line1: "Financial Service",
            line2: "Payment Operations Unit",
        },
        title: "Fund Transfer Authorization",
        reference: "Authorization No: {ref}",
        date: "Issue Date: {date}",
        parties: {
            issuer_label: "Issuer of the transfer order:",
            beneficiary_label: "Beneficiary of the transfer:",
        },
        articles: {
            authorization: {
                title: "Article 1: Irrevocable Transfer Order",
                content: `Hereby, ${companyName}, acting as lender under the loan agreement No. {loan_contract_ref}, irrevocably authorizes and orders the transfer of the sum of {loan_amount} ({loan_amount_in_words}) to the benefit of {borrower_name}, to the bank details below.`,
            },
            bank_details: {
                title: "Article 2: Beneficiary's Bank Details",
                bank_name_label: "Bank Name",
                account_holder_label: "Account Holder",
                iban_label: "IBAN",
                bic_swift_label: "BIC / SWIFT Code",
            },
            execution_terms: {
                title: "Article 3: Execution Conditions",
                content: "This transfer will be executed within 24 to 48 business hours from the date of this authorization. Interbank processing time may vary. This payment order is firm and final.",
            },
            liability: {
                title: "Article 4: Disclaimer of Liability",
                content: `Once the funds are transferred to the coordinates provided by the beneficiary, ${companyName} is released from its obligation to make the funds available. Any error in the provided bank details is the sole responsibility of the beneficiary.`,
            },
            proof: {
                title: "Article 5: Proof of Transaction",
                content: `This document constitutes a formal payment instruction and may be presented to any competent authority or financial institution as proof of the transfer order initiated by ${companyName}.`,
            },
        },
    },
    de: {
        header: {
            line1: "Finanzabteilung",
            line2: "Abteilung für Zahlungsverkehr",
        },
        title: "Überweisungsermächtigung",
        reference: "Ermächtigung Nr.: {ref}",
        date: "Ausstellungsdatum: {date}",
        parties: {
            issuer_label: "Aussteller des Überweisungsauftrags:",
            beneficiary_label: "Begünstigter der Überweisung:",
        },
        articles: {
            authorization: {
                title: "Artikel 1: Unwiderruflicher Überweisungsauftrag",
                content: `Hiermit ermächtigt und beauftragt ${companyName} als Darlehensgeber im Rahmen des Darlehensvertrags Nr. {loan_contract_ref} unwiderruflich die Überweisung des Betrags von {loan_amount} ({loan_amount_in_words}) an den Begünstigten {borrower_name} auf das unten angegebene Bankkonto.`,
            },
            bank_details: {
                title: "Artikel 2: Bankverbindung des Begünstigten",
                bank_name_label: "Name der Bank",
                account_holder_label: "Kontoinhaber",
                iban_label: "IBAN",
                bic_swift_label: "BIC / SWIFT-Code",
            },
            execution_terms: {
                title: "Artikel 3: Ausführungsbedingungen",
                content: "Diese Überweisung wird innerhalb von 24 bis 48 Geschäftsstunden ab dem Datum dieser Ermächtigung ausgeführt. Die bankübergreifende Bearbeitungszeit kann variieren. Dieser Zahlungsauftrag ist verbindlich und endgültig.",
            },
            liability: {
                title: "Artikel 4: Haftungsausschluss",
                content: `Sobald die Gelder auf das vom Begünstigten angegebene Konto überwiesen sind, ist ${companyName} von seiner Verpflichtung zur Bereitstellung der Mittel befreit. Fehler in den angegebenen Bankdaten liegen in der alleinigen Verantwortung des Begünstigten.`,
            },
            proof: {
                title: "Artikel 5: Transaktionsnachweis",
                content: `Dieses Dokument stellt eine formelle Zahlungsanweisung dar und kann jeder zuständigen Behörde oder jedem Finanzinstitut als Nachweis für den von ${companyName} eingeleiteten Überweisungsauftrag vorgelegt werden.`,
            },
        },
    },
    lt: {},
    nl: {},
});

    