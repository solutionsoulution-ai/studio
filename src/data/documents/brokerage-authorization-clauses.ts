
import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses: Clauses = {
    fr: {
        authority: "Organisme pour le Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)",
        title: "Attestation d'Immatriculation",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: "L'ORIAS, en vertu des dispositions du Code monétaire et financier, atteste que l'entité désignée ci-après est immatriculée sur le registre unique des intermédiaires :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        registration_number: "Numéro d'immatriculation national unique : {ref}",
        articles: {
            status: {
                title: "Article 1 - Catégorie d'Inscription",
                value: "Courtier en opérations de banque et en services de paiement (COBSP).",
                description: "Ce statut atteste que Capfinfy agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit.",
            },
            activities: {
                title: "Article 2 - Activités Autorisées",
                description: "En vertu de cette immatriculation, Capfinfy est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation.",
            },
            insurance: {
                title: "Article 3 - Assurance de Responsabilité Civile Professionnelle",
                content: "Capfinfy déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle, conformément aux articles L. 519-3-4 et R. 519-5 du Code monétaire et financier."
            },
            conduct: {
                title: "Article 4 - Règles de Bonne Conduite",
                content: "L'intermédiaire est tenu de respecter les règles de bonne conduite et de protection de la clientèle, notamment en fournissant des informations claires, précises et non trompeuses, et en agissant de manière honnête, loyale et professionnelle au mieux des intérêts de ses clients."
            }
        },
        validity: "Cette immatriculation est valable pour l'année civile en cours et fait l'objet d'un renouvellement annuel. Sa validité peut être vérifiée à tout moment sur le site officiel orias.fr.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label: "Pour l'ORIAS, Le Président du Registre",
    },
    en: {
        // ... (english translations)
    },
    de: {
        // ... (german translations)
    }
};
