
export const insuranceNoticeClauses = {
    fr: {
        title: "Notice d'Information",
        subtitle: "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        introduction: "La présente notice a pour objet de vous informer des principales caractéristiques de votre assurance emprunteur. Nous vous invitons à la lire attentivement avant votre adhésion. Elle n'a pas de valeur contractuelle, seules les Conditions Générales et Particulières du contrat d'assurance prévalent.",
        guarantees: {
            title: "ARTICLE 1 : GARANTIES PROPOSÉES",
            description: "Le contrat couvre les risques suivants :",
            items: {
                death: {
                    title: "Décès",
                    description: "En cas de décès de l'assuré avant la fin du prêt, l'assureur rembourse à l'organisme prêteur le capital restant dû."
                },
                disability: {
                    title: "Perte Totale et Irréversible d'Autonomie (PTIA)",
                    description: "Si l'assuré se trouve en état de PTIA, l'assureur rembourse également le capital restant dû."
                },
                incapacity: {
                    title: "Incapacité Temporaire Totale de travail (ITT)",
                    description: "En cas d'arrêt de travail suite à une maladie ou un accident, l'assureur prend en charge le remboursement des échéances du prêt, après une franchise de 90 jours."
                }
            }
        },
        exclusions: {
            title: "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            description: "Certaines situations ne sont pas couvertes par l'assurance. Sont notamment exclus :",
            items: [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre, d'émeutes ou d'actes de terrorisme.",
                "La pratique de sports aériens, de sports de combat, ou de tout autre sport à titre professionnel.",
                "Les sinistres résultant d'une faute intentionnelle de l'assuré.",
                "Les affections psychiatriques et les maux de dos sans hospitalisation."
            ]
        },
        claims: {
            title: "ARTICLE 3 : DÉMARCHES EN CAS DE SINISTRE",
            description: "En cas de sinistre, vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives demandées (certificat de décès, rapports médicaux, etc.)."
        },
        waiver: {
            title: "ARTICLE 4 : DROIT DE RENONCIATION",
            description: "Vous disposez d'un délai de 30 jours calendaires à compter de la date de signature de votre demande d'adhésion pour y renoncer, par lettre recommandée avec accusé de réception, sans frais ni pénalités."
        },
        contact: {
            title: "ARTICLE 5 : CONTACT ET RÉCLAMATION",
            description: "Pour toute question ou réclamation, vous pouvez contacter {company_name} à l'adresse suivante : {company_address}."
        },
        footer: "Ce document est un résumé non contractuel des garanties."
    },
    en: {
        // English version can be added here
    }
}
