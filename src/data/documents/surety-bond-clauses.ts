
export const suretyBondClauses = {
    fr: {
        title: "Acte de Cautionnement Solidaire",
        parties: {
            title: "ENTRE LES SOUSSIGNÉS :",
            lender_label: "Le Créancier :",
            borrower_label: "Le Débiteur :",
            guarantor_label: "La Caution :",
        },
        preamble: "Il a été convenu ce qui suit :",
        commitment: {
            title: "ARTICLE 1 : ENGAGEMENT DE LA CAUTION",
            content: "Par les présentes, la Caution, {guarantor_name}, déclare se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt consenti par le Créancier, {lender_name}, et décrit ci-après.",
        },
        loan_details: {
            title: "ARTICLE 2 : CARACTÉRISTIQUES DU PRÊT GARANTI",
            content: "Le présent cautionnement garantit le paiement des sommes dues au titre du contrat de prêt n°{loan_contract_id}, signé le {loan_date}, d'un montant de {loan_amount} pour une durée de {loan_term_months} mois.",
        },
        scope: {
            title: "ARTICLE 3 : ÉTENDUE DE LA GARANTIE",
            content: "L'engagement de la caution porte sur le paiement du principal, des intérêts, et de tous frais, indemnités et accessoires éventuels. La caution déclare renoncer au bénéfice de discussion et de division.",
        },
        handwritten_mention: {
            title: "ARTICLE 4 : MENTION MANUSCRITE OBLIGATOIRE",
            instruction: "(La caution doit recopier de sa main le texte suivant)",
            content: "En me portant caution de [Nom du débiteur] dans la limite de la somme de {loan_amount} couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de {loan_term_months} mois, je m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens si [Nom du débiteur] n'y satisfait pas lui-même."
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires.",
    },
    en: {
        // English version can be added here
    }
}
