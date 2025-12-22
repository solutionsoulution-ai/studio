import type { Clauses } from "./languages";

export const amlCertificateClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Département de Conformité",
            line2: "Unité de Lutte Contre le Blanchiment d'Argent (LCB-FT)",
        },
        title: "Certificat de Non-Blanchiment de Capitaux",
        reference: "Certificat N°: {ref}",
        date: "Date: {date}",
        declarer: {
            title: "Déclarant",
        },
        articles: {
            declaration: {
                title: "Article 1 : Déclaration sur l'Origine des Fonds",
                content: `Je soussigné(e), {client_name}, déclare sur l'honneur que les fonds d'un montant de {transaction_amount} ({transaction_amount_in_words}) utilisés dans le cadre de la transaction référencée {transaction_ref} proviennent de sources légitimes et ne sont pas issus d'activités criminelles ou de blanchiment de capitaux, conformément à la directive (UE) 2015/849.`,
                origin_label: "Origine des fonds déclarée :",
            },
            commitment: {
                title: "Article 2 : Engagement de Transparence",
                content: `Je m'engage à fournir à ${companyName}, sur simple demande, tout document justificatif (bulletins de salaire, avis d'imposition, acte de vente, etc.) attestant de l'origine des fonds déclarée ci-dessus.`,
            },
            warning: {
                title: "Article 3 : Avertissement sur les Fausses Déclarations",
                content: `Je reconnais avoir été informé(e) que toute fausse déclaration est passible de poursuites judiciaires et peut entraîner la résiliation immédiate de toute relation d'affaires avec ${companyName}, ainsi qu'une déclaration de soupçon auprès des autorités compétentes.`,
            },
        },
        signature_label: "Signature du Déclarant",
    },
    en: {
        // ...
    },
    de: {
        // ...
    }
});
