
export const insuranceCertificateClauses = {
    fr: {
        title: "Attestation d'Assurance Emprunteur",
        reference: "N° d'attestation : {ref}",
        introduction: "VylsCapital Assurance atteste par la présente que l'assuré désigné ci-dessous est couvert par le contrat d'assurance groupe n°789-101112, souscrit par VylsCapital, pour le prêt décrit ci-après.",
        insured_label: "Assuré(e)",
        beneficiary_label: "Bénéficiaire du capital garanti",
        loan_id_label: "N° du contrat de prêt concerné",
        capital_label: "Capital initialement assuré",
        premium_label: "Prime mensuelle d'assurance",
        coverage_summary: "Cette assurance couvre les garanties suivantes, conformément aux conditions générales et particulières de la notice d'information :",
        guarantees: {
            death: {
                title: "Décès",
                description: "Remboursement du capital restant dû à l'organisme prêteur."
            },
            disability: {
                title: "Perte Totale et Irréversible d'Autonomie (PTIA)",
                description: "Remboursement du capital restant dû."
            },
            incapacity: {
                title: "Incapacité Temporaire Totale de travail (ITT)",
                description: "Prise en charge des échéances du prêt après une franchise de 90 jours."
            },
        },
        notice_reference: "Pour le détail des garanties, exclusions et modalités, veuillez vous référer à la notice d'information du contrat.",
        conclusion: "La présente attestation est délivrée pour faire valoir ce que de droit auprès de l'organisme prêteur. Fait à Lyon, le {signature_date}.",
    },
    en: {
        // English version can be added here
    }
}
