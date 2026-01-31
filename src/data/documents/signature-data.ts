
export const signatureData = (brandKey?: 'vantex') => {
    const data = {
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
    return data.vantex;
};
