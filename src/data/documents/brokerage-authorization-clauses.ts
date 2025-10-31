
import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses: Clauses = {
    fr: {
        authority: "Organisme pour le Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)",
        title: "Attestation d'Immatriculation",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: "L'ORIAS, en vertu des dispositions du Code monétaire et financier (articles L. 546-1 et suivants), atteste que l'entité désignée ci-après est immatriculée sur le registre unique des intermédiaires :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        registration_number: "Numéro d'immatriculation national unique : {ref}",
        validity: "",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label_1: "Pour l'ORIAS, Le Président du Registre",
        signature_label_2: "Le Secrétaire Général"
    },
    articles: {
        status: {
            title: "Article 1 - Catégorie d'Inscription",
            value: "Courtier en opérations de banque et en services de paiement (COBSP).",
            description: "Ce statut atteste que Capfinfy agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché.",
        },
        activities: {
            title: "Article 2 - Activités Autorisées",
            description: "Capfinfy est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits.",
        },
        insurance: {
            title: "Article 3 - Assurance de Responsabilité Civile Professionnelle",
            content: "Capfinfy déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément aux articles L. 519-3-4 et R. 519-5 du Code monétaire et financier. Les garanties du contrat sont conformes aux montants minimaux réglementaires."
        },
        conduct: {
            title: "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
            content: "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
        },
        lcbft: {
            title: "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
            content: "En tant qu'intermédiaire, Capfinfy est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC)."
        },
        claims: {
            title: "Article 6 - Traitement des Réclamations",
            content: "Capfinfy dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet."
        }
    },
    en: {
        // ... (english translations will follow the same new structure)
    },
    de: {
        // ... (german translations will follow the same new structure)
    }
};
