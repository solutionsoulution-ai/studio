
import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses: Clauses = {
    fr: {
        authority: "Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)",
        title: "Autorisation de Courtage en Crédit",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: "La BaFin, en vertu des dispositions de la loi allemande sur le crédit (Kreditwesengesetz), atteste que l'entité désignée ci-après est immatriculée et autorisée à agir en tant qu'intermédiaire :",
        company_name: "Neofonds GmbH",
        company_address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
        registration_number: "Numéro d'immatriculation national unique : {ref}",
        validity: "",
        location_and_date: "Fait à Frankfurt, le {issue_date}",
        signature_label_1: "Pour la BaFin, Le Président",
        signature_label_2: "Le Directeur Exécutif"
    },
    articles: {
        status: {
            title: "Article 1 - Catégorie d'Inscription",
            value: "Courtier en opérations de banque et en services de paiement (COBSP).",
            description: "Ce statut atteste que Neofonds agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché.",
        },
        activities: {
            title: "Article 2 - Activités Autorisées",
            description: "Neofonds est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits.",
        },
        insurance: {
            title: "Article 3 - Assurance de Responsabilité Civile Professionnelle",
            content: "Neofonds déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément à la réglementation allemande. Les garanties du contrat sont conformes aux montants minimaux réglementaires."
        },
        conduct: {
            title: "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
            content: "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
        },
        lcbft: {
            title: "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
            content: "En tant qu'intermédiaire, Neofonds est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC)."
        },
        claims: {
            title: "Article 6 - Traitement des Réclamations",
            content: "Neofonds dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet."
        }
    },
    en: {
        // ... (english translations will follow the same new structure)
    },
    de: {
        // ... (german translations will follow the same new structure)
    },
    lt: {
        authority: "Federal Financial Supervisory Authority (BaFin)",
        title: "Kredito tarpininkavimo leidimas",
        subtitle: "Bankininkystės operacijų ir mokėjimo paslaugų tarpininkas (IOBSP)",
        intro: "BaFin, remdamasi Vokietijos kredito įstatymo (Kreditwesengesetz) nuostatomis, patvirtina, kad toliau nurodytas subjektas yra įregistruotas ir įgaliotas veikti kaip tarpininkas:",
        company_name: "Neofonds GmbH",
        company_address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland",
        registration_number: "Unikalus nacionalinis registracijos numeris: {ref}",
        validity: "",
        location_and_date: "Sudaryta Frankfurte, {issue_date}",
        signature_label_1: "Už BaFin, Prezidentas",
        signature_label_2: "Vykdomasis direktorius"
    },
    nl: {
        authority: "Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)",
        title: "Vergunning voor Kredietbemiddeling",
        subtitle: "Tussenpersoon in Banktransacties en Betalingsdiensten (IOBSP)",
        intro: "De BaFin, krachtens de bepalingen van de Duitse Kredietwet (Kreditwesengesetz), verklaart dat de hieronder genoemde entiteit is geregistreerd en gemachtigd is om op te treden als tussenpersoon:",
        company_name: "Neofonds GmbH",
        company_address: "Mainzer Landstraße 50, 60325 Frankfurt am Main, Duitsland",
        registration_number: "Uniek nationaal registratienummer: {ref}",
        validity: "",
        location_and_date: "Gedaan te Frankfurt, op {issue_date}",
        signature_label_1: "Voor de BaFin, de President",
        signature_label_2: "De Uitvoerend Directeur"
    }
};
