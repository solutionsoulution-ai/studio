
export const insuranceCertificateClauses = {
    fr: {
        title: "Attestation d'Assurance Emprunteur",
        reference: "N° d'attestation : {ref}",
        introduction: "VylsCapital Assurance atteste par la présente que l'assuré désigné ci-dessous est couvert par le contrat d'assurance groupe n°789-101112, souscrit par VylsCapital.",
        insured_label: "Assuré",
        beneficiary_label: "Bénéficiaire du capital garanti",
        loan_id_label: "N° du contrat de prêt concerné",
        capital_label: "Capital initialement assuré",
        premium_label: "Prime mensuelle d'assurance",
        coverage_summary: "Cette assurance couvre les garanties suivantes, conformément aux conditions générales et particulières de la notice d'information :",
        guarantees: {
            death: "Décès",
            disability: "Perte Totale et Irréversible d'Autonomie (PTIA)",
            incapacity: "Incapacité Temporaire Totale de travail (ITT)",
        },
        conclusion: "La présente attestation est délivrée pour faire valoir ce que de droit auprès de l'organisme prêteur. Fait à Lyon, le {signature_date}.",
    },
    en: {
        // English version can be added here
    }
}
