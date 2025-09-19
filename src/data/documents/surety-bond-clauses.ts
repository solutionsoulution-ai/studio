
export const suretyBondClauses = {
    fr: {
        title: "Acte de Cautionnement Solidaire",
        parties: {
            title: "ENTRE LES SOUSSIGNÉS",
            lender_label: "Le Créancier :",
            borrower_label: "Le Débiteur Principal :",
            guarantor_label: "La Caution :",
        },
        preamble: "Il a été préalablement exposé ce qui suit :\nLe Créancier a consenti un prêt au Débiteur Principal. La Caution, après avoir pris connaissance des termes du prêt et de la situation financière du Débiteur, consent au présent engagement de cautionnement.",
        articles: {
            commitment: {
                title: "ARTICLE 1 : ENGAGEMENT DE LA CAUTION",
                content: "Par les présentes, la Caution, {guarantor_name}, déclare se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt consenti par le Créancier, {lender_name}, et décrit à l'article 2.",
            },
            loan_details: {
                title: "ARTICLE 2 : CARACTÉRISTIQUES DU PRÊT GARANTI",
                content: "Le présent cautionnement garantit le paiement des sommes dues au titre du contrat de prêt n°{loan_contract_id}, signé le {loan_date}, d'un montant en principal de {loan_amount} pour une durée de {loan_term_months} mois.",
            },
            scope: {
                title: "ARTICLE 3 : ÉTENDUE DE LA GARANTIE",
                content: "L'engagement de la caution porte sur le paiement du principal, des intérêts conventionnels, des intérêts de retard, et de tous frais, indemnités et accessoires éventuels, dans la limite du montant total de {loan_amount} majoré des intérêts et accessoires. La caution déclare expressément renoncer au bénéfice de discussion (article 2298 du Code civil) et au bénéfice de division (article 2303 du Code civil).",
            },
            duration: {
                title: "ARTICLE 4 : DURÉE DE L'ENGAGEMENT",
                content: "Le présent engagement de cautionnement est consenti pour toute la durée du prêt, et se terminera au remboursement complet de toutes les sommes dues par le Débiteur Principal. La Caution s'engage à couvrir la dette pendant une durée maximale de {loan_term_months} mois majorée de 2 ans.",
            },
            information: {
                title: "ARTICLE 5 : INFORMATION DE LA CAUTION",
                content: "La Caution reconnaît avoir été informée par le Créancier, préalablement à la signature de cet acte, de l'adéquation de l'engagement à ses biens et revenus. De plus, le Créancier s'engage à informer la Caution de toute défaillance du Débiteur Principal dès le premier incident de paiement."
            }
        },
        handwritten_mention: {
            title: "ARTICLE 6 : MENTION MANUSCRITE OBLIGATOIRE (Art. L. 331-1 du Code de la consommation)",
            instruction: "(La caution doit recopier de sa main le texte suivant, sans modification)",
            content: "En me portant caution de {borrower_name} dans la limite de la somme de {loan_amount} ({loan_amount_in_words}) couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de l'engagement mentionnée à l'article 4, je m'engage à rembourser au prêteur, {lender_name}, les sommes dues sur mes revenus et mes biens si {borrower_name} n'y satisfait pas lui-même."
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires originaux.",
    },
    en: {
        // English version can be added here
    }
}
