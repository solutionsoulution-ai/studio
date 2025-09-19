
export const loanContractClauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        parties: {
            title: "ENTRE LES SOUSSIGNÉS",
            lender: "LE PRÊTEUR :",
            borrower: "L'EMPRUNTEUR :",
        },
        preamble: "Il a été convenu et arrêté ce qui suit :",
        articles: {
            object: {
                title: "ARTICLE 1 : OBJET DU PRÊT",
                content: "Le Prêteur, {lender_name}, consent par les présentes à l'Emprunteur, {borrower_name}, qui accepte, un prêt d'un montant total de {loan_amount} ({loan_amount_in_words}), mis à disposition en date du {loan_date}."
            },
            usage: {
                title: "ARTICLE 2 : USAGE DES FONDS",
                content: "L'Emprunteur déclare utiliser les fonds pour le financement de [RAISON DU PRET A PRECISER]. Toute utilisation des fonds pour un autre objet devra faire l'objet d'un accord écrit du Prêteur."
            },
            interest: {
                title: "ARTICLE 3 : TAUX D'INTÉRÊT",
                content: "Ce prêt est consenti à un taux d'intérêt annuel fixe et nominal de {interest_rate}%."
            },
            repayment: {
                title: "ARTICLE 4 : DURÉE ET MODALITÉS DE REMBOURSEMENT",
                content: "Le prêt est remboursable en {loan_term_months} mensualités constantes de {monthly_payment} chacune, incluant capital et intérêts. La première échéance interviendra le {repayment_start_date}. Les paiements suivants seront effectués à la même date chaque mois jusqu'à remboursement complet du capital et des intérêts."
            },
            early_repayment: {
                title: "ARTICLE 5 : REMBOURSEMENT ANTICIPÉ",
                content: "L'Emprunteur a le droit de rembourser par anticipation tout ou partie du prêt à tout moment, sans pénalité. L'Emprunteur devra notifier le Prêteur de son intention par écrit au moins 30 jours avant la date du remboursement anticipé."
            },
            late_payment: {
                title: "ARTICLE 6 : PÉNALITÉS DE RETARD",
                content: "Tout retard de paiement d'une échéance entraînera, après une mise en demeure restée infructueuse pendant 10 jours, l'application de pénalités de retard calculées sur la base d'un taux égal à 1,5 fois le taux d'intérêt légal en vigueur, sur les sommes dues."
            },
            default: {
                title: "ARTICLE 7 : DÉFAUT DE PAIEMENT",
                content: "En cas de non-paiement de deux (2) échéances consécutives, et 15 jours après une mise en demeure par lettre recommandée avec accusé de réception restée sans effet, la totalité des sommes dues (capital restant dû, intérêts et pénalités) deviendra immédiatement exigible. Le Prêteur se réserve le droit d'engager toute poursuite judiciaire nécessaire au recouvrement de sa créance."
            },
            borrower_obligations: {
                title: "ARTICLE 8 : OBLIGATIONS DE L'EMPRUNTEUR",
                content: "L'Emprunteur s'engage à :\n- Fournir des informations exactes et complètes lors de la demande de prêt.\n- Notifier le Prêteur de tout changement de situation personnelle (adresse, situation professionnelle, etc.) dans un délai de 30 jours.\n- Ne pas souscrire d'autre prêt susceptible de compromettre sa capacité de remboursement sans en informer le Prêteur."
            },
            confidentiality: {
                title: "ARTICLE 9 : CONFIDENTIALITÉ",
                content: "Les Parties s'engagent à conserver la confidentialité la plus stricte sur les termes du présent contrat et sur toutes les informations échangées dans le cadre de son exécution. Cette obligation de confidentialité survivra à l'expiration du contrat."
            },
            jurisdiction: {
                title: "ARTICLE 10 : LOI APPLICABLE ET JURIDICTION",
                content: "Le présent contrat est soumis au droit français. Tout litige relatif à son interprétation ou à son exécution, qui ne pourrait être résolu à l'amiable, sera de la compétence exclusive des tribunaux de Lyon."
            }
        },
        signature_preamble: "Fait à {borrower_signature_location}, le {signature_date}, en deux exemplaires originaux, dont un pour chaque partie.",
    },
    en: {
        // English version can be added here
    }
}
