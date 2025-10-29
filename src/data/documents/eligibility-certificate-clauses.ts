
import type { Clauses } from "./languages";

export const eligibilityCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Éligibilité au Financement",
        department: "Département Analyse de Crédit",
        location_and_date: "Fait à Lyon, le {date}",
        reference: "Référence : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est une validation préliminaire de votre capacité d'emprunt. Elle vous permet de prouver votre sérieux auprès de tiers (agents immobiliers, vendeurs, etc.)."
        },
        introduction: "Nous soussignés, Capfinfy, attestons par la présente que, sur la base des informations fournies, le bénéficiaire : {beneficiary_name}, demeurant à {beneficiary_address}, présente un profil lui permettant d'être éligible à une solution de financement.",
        eligibility_statement: "Le montant de financement pour lequel le bénéficiaire est jugé éligible s'élève à {amount}.",
        conditions: "Cette attestation est valable 30 jours à compter de sa date d'émission ({validity_end_date}) et est fournie sous réserve de la vérification des documents originaux.",
        conclusion: "Cette attestation ne constitue pas une offre de prêt ferme. L'octroi définitif reste conditionné à l'étude approfondie du dossier."
    },
    en: {
        title: "Certificate of Funding Eligibility",
        department: "Credit Analysis Department",
        location_and_date: "Done in Lyon, on {date}",
        reference: "Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is a preliminary validation of your borrowing capacity. It allows you to prove your seriousness to third parties (real estate agents, sellers, etc.)."
        },
        introduction: "We, the undersigned, Capfinfy, hereby certify that, based on the information provided, the beneficiary: {beneficiary_name}, residing at {beneficiary_address}, has a profile that makes them eligible for a financing solution.",
        eligibility_statement: "The financing amount for which the beneficiary is deemed eligible is {amount}.",
        conditions: "This certificate is valid for 30 days from its date of issue ({validity_end_date}) and is provided subject to the verification of original documents.",
        conclusion: "This certificate does not constitute a firm loan offer. The final granting of the loan remains conditional on a thorough review of the file."
    }
};
