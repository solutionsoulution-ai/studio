
import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses: Clauses = {
    fr: {
        authority: "Organisme pour le Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)",
        title: "Attestation d'Immatriculation",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: "L'ORIAS atteste que la société suivante est immatriculée sur le registre unique des intermédiaires :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        registration_number: "Numéro d'immatriculation : {ref}",
        status: {
            title: "Catégorie d'inscription",
            value: "Courtier en opérations de banque et en services de paiement (COBSP)",
        },
        activities: {
            title: "Activités autorisées",
            description: "En vertu de cette immatriculation, Capfinfy est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation.",
        },
        validity: "Cette immatriculation est valide pour l'année en cours et doit être renouvelée annuellement. La validité peut être vérifiée à tout moment sur le site orias.fr.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label: "Pour l'ORIAS, Le Président",
    },
    en: {
        authority: "Organization for the Single Register of Insurance, Banking, and Finance Intermediaries (ORIAS)",
        title: "Registration Certificate",
        subtitle: "Intermediary in Banking Operations and Payment Services (IOBSP)",
        intro: "ORIAS certifies that the following company is registered on the single register of intermediaries:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        registration_number: "Registration number: {ref}",
        status: {
            title: "Registration Category",
            value: "Broker in banking operations and payment services (COBSP)",
        },
        activities: {
            title: "Authorized Activities",
            description: "Under this registration, Capfinfy is authorized to present, propose, or assist in the conclusion of banking operations or payment services and to carry out all preparatory work and advice for their realization.",
        },
        validity: "This registration is valid for the current year and must be renewed annually. Validity can be verified at any time on the orias.fr website.",
        location_and_date: "Done in Paris, on {issue_date}",
        signature_label: "For ORIAS, The President",
    },
    de: {
        authority: "Organisation für das einheitliche Register der Versicherungs-, Bank- und Finanzvermittler (ORIAS)",
        title: "Registrierungsbescheinigung",
        subtitle: "Vermittler von Bankgeschäften und Zahlungsdiensten (IOBSP)",
        intro: "ORIAS bescheinigt, dass das folgende Unternehmen im einheitlichen Vermittlerregister eingetragen ist:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, Frankreich",
        registration_number: "Registrierungsnummer: {ref}",
        status: {
            title: "Registrierungskategorie",
            value: "Makler für Bankgeschäfte und Zahlungsdienste (COBSP)",
        },
        activities: {
            title: "Zugelassene Tätigkeiten",
            description: "Im Rahmen dieser Registrierung ist Capfinfy befugt, Bankgeschäfte oder Zahlungsdienste vorzustellen, vorzuschlagen oder beim Abschluss zu unterstützen und alle vorbereitenden Arbeiten und Beratungen für deren Durchführung durchzuführen.",
        },
        validity: "Diese Registrierung ist für das laufende Jahr gültig und muss jährlich erneuert werden. Die Gültigkeit kann jederzeit auf der Website orias.fr überprüft werden.",
        location_and_date: "Ausgestellt in Paris, am {issue_date}",
        signature_label: "Für ORIAS, Der Präsident",
    }
};
