
import type { Clauses } from "./languages";

export const eligibilityCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Éligibilité au Financement",
        department: "Département Analyse de Crédit",
        location_and_date: "Fait à Lyon, le {date}",
        reference: "Référence : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est une validation préliminaire de votre capacité d'emprunt basée sur les informations déclaratives fournies. Elle vous permet de prouver votre sérieux auprès de tiers (agents immobiliers, vendeurs, etc.) et de sécuriser vos négociations."
        },
        introduction: "Nous soussignés, Capfinfy, agissant en qualité de conseil financier, attestons par la présente que, sur la base des informations financières et personnelles fournies par le bénéficiaire et sans engagement de notre part, le profil de : {beneficiary_name}, demeurant à {beneficiary_address}, présente les caractéristiques requises pour être considéré comme éligible à une solution de financement.",
        eligibility_statement: "Sous réserve des conditions détaillées ci-après, le montant de financement pour lequel le bénéficiaire est jugé éligible s'élève à {amount}.",
        conditions: "Cette attestation est fournie à titre purement indicatif. Elle est valable trente (30) jours calendaires à compter de sa date d'émission, soit jusqu'au {validity_end_date}. Sa validité est strictement conditionnée à la vérification des documents originaux (justificatifs d'identité, de revenus, de domicile, etc.) et à l'absence de toute modification substantielle de la situation financière ou personnelle du bénéficiaire.",
        conclusion: "Cette attestation ne constitue en aucun cas une offre de prêt ferme et définitive au sens de la loi. L'octroi final d'un financement reste conditionné à l'étude approfondie et complète du dossier par l'un de nos partenaires prêteurs, à leur propre politique d'acceptation des risques, et à la signature d'une offre de prêt formelle."
    },
    en: {
        title: "Certificate of Funding Eligibility",
        department: "Credit Analysis Department",
        location_and_date: "Done in Lyon, on {date}",
        reference: "Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is a preliminary validation of your borrowing capacity based on the declarative information provided. It allows you to prove your seriousness to third parties (real estate agents, sellers, etc.) and to secure your negotiations."
        },
        introduction: "We, the undersigned, Capfinfy, acting as financial advisor, hereby certify that, based on the financial and personal information provided by the beneficiary and without commitment on our part, the profile of: {beneficiary_name}, residing at {beneficiary_address}, presents the required characteristics to be considered eligible for a financing solution.",
        eligibility_statement: "Subject to the conditions detailed below, the financing amount for which the beneficiary is deemed eligible is {amount}.",
        conditions: "This certificate is provided for indicative purposes only. It is valid for thirty (30) calendar days from its date of issue, i.e., until {validity_end_date}. Its validity is strictly conditional upon the verification of original documents (proof of identity, income, residence, etc.) and the absence of any substantial change in the beneficiary's financial or personal situation.",
        conclusion: "This certificate in no way constitutes a firm and final loan offer within the meaning of the law. The final granting of financing remains conditional on the thorough and complete review of the file by one of our lending partners, their own risk acceptance policy, and the signing of a formal loan offer."
    }
};
