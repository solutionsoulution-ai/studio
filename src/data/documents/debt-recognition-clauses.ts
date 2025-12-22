import type { Clauses } from "./languages";

export const debtRecognitionClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Financier",
            line2: "Département Juridique et des Garanties • Unité de Formalisation des Engagements",
        },
        title: "Reconnaissance de Dette pour un Prêt",
        reference: "Document N°: {ref}",
        date: "Date: {date}",
        parties: {
            title: "Entre les soussignés :",
            creditor_label: "Le Créancier :",
            debtor_label: "Le Débiteur :",
        },
        articles: {
            recognition: {
                title: "Article 1 : Reconnaissance de la Dette",
                content: `Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à ${companyName}, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un prêt de type '{type_of_loan}' qui m'a été accordé et dont je confirme avoir reçu les fonds.`,
            },
            repayment: {
                title: "Article 2 : Modalités de Remboursement",
                content: "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de prêt N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier.",
            },
            default: {
                title: "Article 3 : Clause de Défaut",
                content: "En cas de non-paiement d'une ou plusieurs échéances, je reconnais que le Créancier pourra se prévaloir des clauses prévues dans le contrat de prêt, y compris l'exigibilité anticipée de la totalité du capital restant dû, majoré des intérêts et pénalités applicables.",
            },
            mention: {
                title: "Article 4 : Compréhension de l'Engagement",
                content: "L'article L. 313-24 du Code de la consommation stipule l'importance de l'engagement. Le débiteur reconnaît avoir lu et compris l'intégralité du contrat de prêt auquel cette reconnaissance de dette se rapporte et avoir reçu un exemplaire de chaque document.",
            }
        },
    },
    en: {
        // ...
    },
    de: {
        // ...
    }
});