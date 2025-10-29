
import type { Clauses } from "./languages";

export const insuranceCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Assurance Emprunteur",
        department: "Capfinfy Assurance",
        reference: "N° d'attestation : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est le document officiel qui prouve que votre prêt est couvert par une assurance. Elle est exigée par l'organisme prêteur et protège l'emprunteur ainsi que ses proches en cas de coup dur (décès, invalidité), en assurant la continuité du remboursement."
        },
        introduction: "Capfinfy Assurance, société d'assurance, atteste par la présente que l'assuré(e) désigné(e) ci-dessous est bien couvert(e) par le contrat d'assurance de groupe n°789-101112 souscrit par Capfinfy, pour les garanties et le prêt identifiés ci-après.",
        insured_label: "Assuré(e)",
        loan_id_label: "Prêt Assuré (Contrat N°)",
        capital_label: "Capital initialement assuré",
        coverage_summary: "Résumé des Garanties Acquises par l'Assuré(e)",
        guarantees: {
            death: { "title": "Décès", "description": "En cas de décès de l'assuré avant l'âge de 75 ans, l'assureur verse au prêteur le capital restant dû au jour du décès." },
            disability: { "title": "Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Si l'assuré est reconnu en état de PTIA, l'assureur verse au prêteur le capital restant dû, entraînant la clôture du prêt." },
            incapacity: { "title": "Incapacité Temporaire Totale de travail (ITT)", "description": "En cas d'arrêt de travail pour maladie ou accident, prise en charge des échéances du prêt à 100% après une franchise de 90 jours continus." }
        },
        validity: { "title": "Validité", "description": "La présente attestation est valable sous réserve du paiement régulier des cotisations d'assurance et tant que le prêt susmentionné est en cours de remboursement." },
        conclusion: "Fait à Lyon, le {signature_date}, pour servir et valoir ce que de droit.",
        director_title: "Directrice des Assurances"
    },
    en: {
        title: "Borrower's Insurance Certificate",
        department: "Capfinfy Insurance",
        reference: "Certificate No: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is the official document proving that your loan is covered by insurance. It is required by the lending institution and protects the borrower and their family in case of hardship (death, disability) by ensuring the continuity of repayment."
        },
        introduction: "Capfinfy Insurance, an insurance company, hereby certifies that the insured person designated below is covered by the group insurance contract No. 789-101112 underwritten by Capfinfy, for the guarantees and the loan identified below.",
        insured_label: "Insured",
        loan_id_label: "Insured Loan (Contract No.)",
        capital_label: "Initially Insured Capital",
        coverage_summary: "Summary of Guarantees Acquired by the Insured",
        guarantees: {
            death: { "title": "Death", "description": "In the event of the insured's death before the age of 75, the insurer pays the outstanding capital to the lender as of the date of death." },
            disability: { "title": "Total and Irreversible Loss of Autonomy (PTIA)", "description": "If the insured is recognized as being in a state of PTIA, the insurer pays the outstanding capital to the lender, leading to the closure of the loan." },
            incapacity: { "title": "Total Temporary Incapacity for Work (ITT)", "description": "In the event of a work stoppage due to illness or accident, coverage of 100% of the loan installments after a continuous deductible period of 90 days." }
        },
        validity: { "title": "Validity", "description": "This certificate is valid subject to the regular payment of insurance premiums and as long as the aforementioned loan is being repaid." },
        conclusion: "Done in Lyon, on {signature_date}, to serve as legal proof.",
        director_title: "Director of Insurance"
    }
};
