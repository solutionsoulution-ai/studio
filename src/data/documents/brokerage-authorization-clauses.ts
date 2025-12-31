import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses = (companyName: string, authority: string, location: string): Clauses => ({
    fr: {
        authority: authority,
        title: "Attestation d'Immatriculation",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: `L'autorité compétente, en vertu des dispositions légales en vigueur, atteste que l'entité désignée ci-après est immatriculée et autorisée à agir en tant qu'intermédiaire :`,
        company_name: companyName,
        registration_number: "Numéro d'immatriculation national unique : {ref}",
        validity: "",
        location_and_date: `Fait à ${location}, le {issue_date}`,
        signature_label_1: `Pour ${authority}, Le Président`,
        signature_label_2: "Le Directeur Exécutif"
    },
    articles: {
        status: {
            title: "Article 1 - Catégorie d'Inscription",
            value: "Courtier en opérations de banque et en services de paiement (COBSP).",
            description: `Ce statut atteste que ${companyName} agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché.`
        },
        activities: {
            title: "Article 2 - Activités Autorisées",
            description: `${companyName} est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits.`
        },
        insurance: {
            title: "Article 3 - Assurance de Responsabilité Civile Professionnelle",
            content: `${companyName} déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément à la réglementation en vigueur. Les garanties du contrat sont conformes aux montants minimaux réglementaires.`
        },
        conduct: {
            title: "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
            content: "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
        },
        lcbft: {
            title: "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
            content: `En tant qu'intermédiaire, ${companyName} est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC).`
        },
        claims: {
            title: "Article 6 - Traitement des Réclamations",
            content: `${companyName} dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet.`
        }
    },
    en: {
        // ... (english translations will follow the same new structure)
    },
    de: {
        // ... (german translations will follow the same new structure)
    },
    lt: {
        authority: authority,
        title: "Registracijos liudijimas",
        subtitle: "Bankininkystės operacijų ir mokėjimo paslaugų tarpininkas (IOBSP)",
        intro: "Kompetentinga institucija, vadovaudamasi galiojančiomis teisinėmis nuostatomis, patvirtina, kad toliau nurodytas subjektas yra įregistruotas ir įgaliotas veikti kaip tarpininkas:",
        company_name: companyName,
        registration_number: "Unikalus nacionalinis registracijos numeris: {ref}",
        validity: "",
        location_and_date: `Sudaryta ${location}, {issue_date}`,
        signature_label_1: `Už ${authority}, Pirmininkas`,
        signature_label_2: "Vykdomasis direktorius"
    },
    nl: {
        authority: authority,
        title: "Registratieattest",
        subtitle: "Tussenpersoon in Banktransacties en Betalingsdiensten (IOBSP)",
        intro: "De bevoegde autoriteit, krachtens de geldende wettelijke bepalingen, verklaart dat de hieronder genoemde entiteit is geregistreerd en gemachtigd is om op te treden als tussenpersoon:",
        company_name: companyName,
        registration_number: "Uniek nationaal registratienummer: {ref}",
        validity: "",
        location_and_date: `Gedaan te ${location}, op {issue_date}`,
        signature_label_1: `Voor ${authority}, de Voorzitter`,
        signature_label_2: "De Uitvoerend Directeur"
    }
});
