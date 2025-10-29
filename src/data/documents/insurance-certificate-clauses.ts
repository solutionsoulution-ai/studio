
import type { Clauses } from "./languages";

export const insuranceCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Assurance Emprunteur",
        department: "Capfinfy Assurance",
        reference: "N° d'attestation : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est le document officiel qui prouve que votre prêt est couvert par une assurance. Elle protège l'emprunteur et ses proches en cas de coup dur (décès, invalidité)."
        },
        introduction: "Capfinfy Assurance atteste que l'assuré {insured_name} est couvert par le contrat d'assurance groupe n°789-101112 pour le prêt n°{loan_id_label}.",
        insured_label: "Assuré(e)",
        capital_label: "Capital initialement assuré",
        coverage_summary: "Résumé des Garanties Couvertes",
        guarantees: {
            death: { "title": "Décès", "description": "Remboursement du capital restant dû." },
            disability: { "title": "Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Remboursement du capital restant dû." },
            incapacity: { "title": "Incapacité Temporaire Totale de travail (ITT)", "description": "Prise en charge des échéances du prêt après une franchise de 90 jours." }
        },
        conclusion: "Fait à Lyon, le {signature_date}.",
        director_title: "Directrice des Assurances"
    },
    en: {
        title: "Borrower's Insurance Certificate",
        department: "Capfinfy Insurance",
        reference: "Certificate No: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is the official document that proves your loan is covered by insurance. It protects the borrower and their family in case of hardship (death, disability)."
        },
        introduction: "Capfinfy Insurance certifies that the insured {insured_name} is covered by the group insurance contract No. 789-101112 for loan No. {loan_id_label}.",
        insured_label: "Insured",
        capital_label: "Initially Insured Capital",
        coverage_summary: "Summary of Covered Guarantees",
        guarantees: {
            death: { "title": "Death", "description": "Repayment of the outstanding capital." },
            disability: { "title": "Total and Irreversible Loss of Autonomy (PTIA)", "description": "Repayment of the outstanding capital." },
            incapacity: { "title": "Total Temporary Incapacity for Work (ITT)", "description": "Coverage of loan installments after a 90-day deductible period." }
        },
        conclusion: "Done in Lyon, on {signature_date}.",
        director_title: "Director of Insurance"
    }
};
