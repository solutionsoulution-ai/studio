
export const loanContractClauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        parties: {
            title: "ENTRE LES SOUSSIGNÉS :",
            lender: "LE PRÊTEUR",
            borrower: "L'EMPRUNTEUR",
        },
        preamble: "Il a été convenu et arrêté ce qui suit :",
        object: {
            title: "ARTICLE 1 : OBJET DU PRÊT",
            content: "Le Prêteur, {lender_name}, consent par les présentes à l'Emprunteur, {borrower_name}, qui accepte, un prêt d'un montant total de {loan_amount} ({loan_amount_in_words}), mis à disposition en date du {loan_date}."
        },
        interest: {
            title: "ARTICLE 2 : TAUX D'INTÉRÊT",
            content: "Ce prêt est consenti à un taux d'intérêt annuel fixe de {interest_rate}%."
        },
        repayment: {
            title: "ARTICLE 3 : DURÉE ET MODALITÉS DE REMBOURSEMENT",
            content: "Le prêt est remboursable en {loan_term_months} mensualités de {monthly_payment} chacune. La première échéance interviendra le {repayment_start_date}. Les paiements suivants seront effectués à la même date chaque mois jusqu'à remboursement complet du capital et des intérêts."
        },
        other_clauses: {
            early_repayment: {
                title: "ARTICLE 4 : REMBOURSEMENT ANTICIPÉ",
                content: "L'Emprunteur a le droit de rembourser par anticipation tout ou partie du prêt à tout moment, sans pénalité."
            },
            default: {
                title: "ARTICLE 5 : DÉFAUT DE PAIEMENT",
                content: "En cas de non-paiement d'une échéance à sa date d'exigibilité, et 15 jours après une mise en demeure restée sans effet, la totalité des sommes dues deviendra immédiatement exigible."
            },
            jurisdiction: {
                title: "ARTICLE 6 : LOI APPLICABLE ET JURIDICTION",
                content: "Le présent contrat est soumis au droit français. Tout litige relatif à son interprétation ou à son exécution sera de la compétence exclusive des tribunaux de Lyon."
            }
        },
        signature_preamble: "Fait à {borrower_signature_location}, le {signature_date}, en deux exemplaires originaux.",
    },
    en: {
        // English version can be added here
    }
}
