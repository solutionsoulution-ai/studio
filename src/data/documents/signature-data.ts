export const signatureData = (brandKey: 'neofonds' | 'finarcy') => {
    const data = {
        neofonds: {
            ceo: {
                name: "Klaus Schmidt",
                title: {
                    fr: "Directeur Général",
                    en: "CEO",
                    de: "Geschäftsführer",
                },
                signatureUrl: "https://i.postimg.cc/jq1H8SMP/signature-5.png"
            },
            legal: {
                name: "Markus Weber",
                title: {
                    fr: "Directeur Juridique",
                    en: "Legal Director",
                    de: "Leiter der Rechtsabteilung",
                },
                signatureUrl: "https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png"
            },
            finance: {
                name: "Stefan Schneider",
                title: {
                    fr: "Directeur Financier",
                    en: "Finance Director",
                    de: "Finanzdirektor",
                },
                signatureUrl: "https://i.postimg.cc/fLt4Yb2Q/signature-3.png"
            },
            analysis: {
                name: "Andreas Meyer",
                title: {
                    fr: "Directeur d'Analyse Financière",
                    en: "Director of Financial Analysis",
                    de: "Leiter der Finanzanalyse",
                },
                signatureUrl: "https://i.postimg.cc/8z0KBqy8/signature-9.png"
            },
            insurance: {
                name: "Anja Wagner",
                title: {
                    fr: "Directrice des Assurances",
                    en: "Director of Insurance",
                    de: "Versicherungsdirektorin",
                },
                signatureUrl: "https://i.postimg.cc/zv8bVKh5/signature-(1).png"
            }
        },
        finarcy: {
            ceo: {
                name: "Salomon",
                title: { fr: "Directeur Général", en: "CEO", de: "Geschäftsführer" },
                signatureUrl: "https://i.postimg.cc/jq1H8SMP/signature-5.png"
            },
            legal: {
                name: "Alexandre Dubois",
                title: { fr: "Directeur Juridique", en: "Legal Director", de: "Leiter der Rechtsabteilung" },
                signatureUrl: "https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png"
            },
            finance: {
                name: "Julien Moreau",
                title: { fr: "Directeur Financier", en: "Finance Director", de: "Finanzdirektor" },
                signatureUrl: "https://i.postimg.cc/fLt4Yb2Q/signature-3.png"
            },
            analysis: {
                name: "David Rousseau",
                title: { fr: "Directeur d'Analyse", en: "Head of Analysis", de: "Leiter Analyse" },
                signatureUrl: "https://i.postimg.cc/8z0KBqy8/signature-9.png"
            },
            insurance: {
                name: "Isabelle Petit",
                title: { fr: "Directrice des Assurances", en: "Insurance Director", de: "Versicherungsdirektorin" },
                signatureUrl: "https://i.postimg.cc/Y0G3BbrV/signature-isabelle-petit.png"
            }
        }
    };
    return data[brandKey];
};
