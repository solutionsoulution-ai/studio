
import type { Clauses } from "./languages";

export const insuranceNoticeClauses: Clauses = {
    fr: {
        title: "Notice d'Information",
        subtitle: "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        importance: {
            "title": "Importance de ce document",
            "description": "Ce document pré-contractuel est essentiel. Il vous informe en détail des caractéristiques de votre assurance emprunteur, notamment les garanties, les exclusions et vos droits, vous permettant de souscrire en toute connaissance de cause et de comparer avec d'autres offres."
        },
        introduction: "La présente notice a pour objet de vous informer des principales caractéristiques de votre adhésion à l'assurance emprunteur. Elle n'a pas de valeur contractuelle mais constitue un résumé des conditions générales et particulières qui prévaudront. Nous vous invitons à la lire attentivement.",
        guarantees: {
            title: "ARTICLE 1 : GARANTIES PROPOSÉES",
            items: {
                death: { "title": "Garantie Décès", "description": "En cas de décès de l'assuré avant la fin du prêt, l'assureur s'engage à rembourser au prêteur le capital restant dû au jour du décès, selon la quotité assurée." },
                disability: { "title": "Garantie Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Si, suite à une maladie ou un accident, l'assuré est reconnu en état de PTIA (nécessitant l'assistance d'une tierce personne pour les actes de la vie courante), l'assureur prend en charge le remboursement du capital restant dû." },
                incapacity: { "title": "Garantie Incapacité Temporaire Totale de travail (ITT)", "description": "En cas d'arrêt de travail total et continu suite à une maladie ou un accident, et après une période de franchise (généralement 90 jours), l'assureur prend en charge le paiement de vos échéances de prêt pendant la durée de votre incapacité." }
            }
        },
        exclusions: {
            title: "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            intro: "Certaines situations ne sont pas couvertes par le contrat. Sont notamment exclus :",
            items: [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre civile ou étrangère, d'émeutes, d'actes de terrorisme.",
                "La pratique de sports aériens, de compétition à titre professionnel ou de tout sport présentant un risque aggravé.",
                "Les affections psychiatriques et les pathologies du dos non hospitalisées (pour la garantie ITT)."
            ]
        },
        waiver: {
            title: "ARTICLE 4 : DROIT DE RENONCIATION",
            description: "Vous disposez d'un délai légal de 30 jours calendaires révolus à compter de la date de signature de votre adhésion pour y renoncer, sans frais ni pénalités, par lettre recommandée avec accusé de réception."
        },
        claim: {
            title: "ARTICLE 5 : DÉCLARATION DE SINISTRE",
            description: "En cas de sinistre (décès, accident, maladie), vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives requises (certificat médical, acte de décès, etc.)."
        }
    },
    en: {
        title: "Information Notice",
        subtitle: "Group Borrower Insurance Contract No. 789-101112",
        importance: {
            "title": "Importance of this document",
            "description": "This pre-contractual document is essential. It informs you in detail about the features of your borrower insurance, including guarantees, exclusions, and your rights, allowing you to subscribe with full knowledge and to compare with other offers."
        },
        introduction: "This notice is intended to inform you of the main features of your membership in the borrower insurance. It has no contractual value but constitutes a summary of the general and special conditions that will prevail. We invite you to read it carefully.",
        guarantees: {
            title: "ARTICLE 1: PROPOSED GUARANTEES",
            items: {
                death: { "title": "Death Benefit", "description": "In the event of the insured's death before the end of the loan, the insurer undertakes to repay the outstanding capital to the lender as of the date of death, according to the insured percentage." },
                disability: { "title": "Total and Irreversible Loss of Autonomy (PTIA) Benefit", "description": "If, following an illness or accident, the insured is recognized as being in a state of PTIA (requiring the assistance of a third person for daily life activities), the insurer covers the repayment of the outstanding capital." },
                incapacity: { "title": "Total Temporary Incapacity for Work (ITT) Benefit", "description": "In the event of a total and continuous work stoppage due to illness or accident, and after a deductible period (usually 90 days), the insurer covers the payment of your loan installments for the duration of your incapacity." }
            }
        },
        exclusions: {
            title: "ARTICLE 2: MAIN EXCLUSIONS",
            intro: "Certain situations are not covered by the contract. The following are notably excluded:",
            items: [
                "The insured's suicide during the first year of insurance.",
                "The consequences of acts of civil or foreign war, riots, acts of terrorism.",
                "The practice of aerial sports, professional competitive sports, or any sport presenting an aggravated risk.",
                "Psychiatric conditions and back pathologies without hospitalization (for the ITT guarantee)."
            ]
        },
        waiver: {
            title: "ARTICLE 4: RIGHT OF WAIVER",
            description: "You have a legal period of 30 calendar days from the date of signing your membership to waive it, without fees or penalties, by registered letter with acknowledgment of receipt."
        },
        claim: {
            title: "ARTICLE 5: CLAIM DECLARATION",
            description: "In the event of a claim (death, accident, illness), you or your beneficiaries must declare it to the insurer within the deadlines stipulated in the contract, enclosing all required supporting documents (medical certificate, death certificate, etc.)."
        }
    }
};
