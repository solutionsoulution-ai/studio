
export const signatureData = (brandKey: 'neofonds' | 'finarcy' | 'vantex') => {
    const data = {
        neofonds: {
            ceo: {
                name: "Klaus Schmidt",
                title: { fr: "Directeur Général", en: "CEO", de: "Geschäftsführer", lt: "Generalinis direktorius", nl: "Algemeen Directeur" },
                signatureUrl: "https://i.postimg.cc/76wJbHLK/Capture-d-ecran-2025-12-20-110200.png"
            },
            legal: {
                name: "Markus Weber",
                title: { fr: "Directeur Juridique", en: "Legal Director", de: "Leiter der Rechtsabteilung", lt: "Teisės direktorius", nl: "Juridisch Directeur" },
                signatureUrl: "https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png"
            },
            finance: {
                name: "Stefan Schneider",
                title: { fr: "Directeur Financier", en: "Finance Director", de: "Finanzdirektor", lt: "Finansų direktorius", nl: "Financieel Directeur" },
                signatureUrl: "https://i.postimg.cc/fLt4Yb2Q/signature-3.png"
            },
            analysis: {
                name: "Andreas Meyer",
                title: { fr: "Directeur d'Analyse Financière", en: "Director of Financial Analysis", de: "Leiter der Finanzanalyse", lt: "Finansinės analizės direktorius", nl: "Directeur Financiële Analyse" },
                signatureUrl: "https://i.postimg.cc/8z0KBqy8/signature-9.png"
            },
            insurance: {
                name: "Anja Wagner",
                title: { fr: "Directrice des Assurances", en: "Director of Insurance", de: "Versicherungsdirektorin", lt: "Draudimo direktorė", nl: "Verzekeringsdirecteur" },
                signatureUrl: "https://i.postimg.cc/zv8bVKh5/signature-(1).png"
            }
        },
        finarcy: {
            ceo: {
                name: "Salomon",
                title: { fr: "Directeur Général", en: "CEO", de: "Geschäftsführer", lt: "Generalinis direktorius", nl: "Algemeen Directeur" },
                signatureUrl: "https://i.postimg.cc/jq1H8SMP/signature-5.png"
            },
            legal: {
                name: "Alexandre Dubois",
                title: { fr: "Directeur Juridique", en: "Legal Director", de: "Leiter der Rechtsabteilung", lt: "Teisės direktorius", nl: "Juridisch Directeur" },
                signatureUrl: "https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png"
            },
            finance: {
                name: "Julien Moreau",
                title: { fr: "Directeur Financier", en: "Finance Director", de: "Finanzdirektor", lt: "Finansų direktorius", nl: "Financieel Directeur" },
                signatureUrl: "https://i.postimg.cc/fLt4Yb2Q/signature-3.png"
            },
            analysis: {
                name: "David Rousseau",
                title: { fr: "Directeur d'Analyse", en: "Head of Analysis", de: "Leiter Analyse", lt: "Analizės vadovas", nl: "Hoofd Analyse" },
                signatureUrl: "https://i.postimg.cc/8z0KBqy8/signature-9.png"
            },
            insurance: {
                name: "Isabelle Petit",
                title: { fr: "Directrice des Assurances", en: "Insurance Director", de: "Versicherungsdirektorin", lt: "Draudimo direktorė", nl: "Verzekeringsdirecteur" },
                signatureUrl: "https://i.postimg.cc/Y0G3BbrV/signature-isabelle-petit.png"
            }
        },
        vantex: {
            ceo: {
                name: "Christian Sewing",
                title: { fr: "Directeur Général", en: "CEO", de: "Geschäftsführer", lt: "Generalinis direktorius", nl: "Algemeen Directeur" },
                signatureUrl: "https://i.postimg.cc/jq1H8SMP/signature-5.png"
            },
            legal: {
                name: "Laura Padovani",
                title: { fr: "Directrice Conformité", en: "Compliance Director", de: "Compliance-Direktorin", lt: "Atitikties direktorė", nl: "Compliance Directeur" },
                signatureUrl: "https://i.postimg.cc/HL4yXh3X/signature-pandadoc-removebg-preview.png"
            },
            finance: {
                name: "James von Moltke",
                title: { fr: "Directeur Financier", en: "CFO", de: "Finanzvorstand", lt: "Finansų direktorius", nl: "Financieel Directeur" },
                signatureUrl: "https://i.postimg.cc/fLt4Yb2Q/signature-3.png"
            },
            analysis: {
                name: "Marcus Chromik",
                title: { fr: "Directeur des Risques", en: "Chief Risk Officer", de: "Risikovorstand", lt: "Rizikos direktorius", nl: "Risicodirecteur" },
                signatureUrl: "https://i.postimg.cc/8z0KBqy8/signature-9.png"
            },
            insurance: {
                name: "Claudio de Sanctis",
                title: { fr: "Directeur des Assurances", en: "Insurance Director", de: "Versicherungsdirektor", lt: "Draudimo direktorius", nl: "Verzekeringsdirecteur" },
                signatureUrl: "https://i.postimg.cc/SRJpvkhT/signature.png"
            }
        }
    };
    return data[brandKey];
};
