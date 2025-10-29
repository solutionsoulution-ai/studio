
import type { Clauses } from "./languages";

export const insuranceNoticeClauses: Clauses = {
    fr: {
        title: "Notice d'Information",
        subtitle: "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        importance: {
            "title": "Importance de ce document",
            "description": "Ce document vous informe des caractéristiques de votre assurance. Il détaille les garanties, les exclusions et vos droits, vous permettant de souscrire en toute connaissance de cause."
        },
        introduction: "La présente notice a pour objet de vous informer des principales caractéristiques de votre assurance emprunteur. Elle n'a pas de valeur contractuelle.",
        guarantees: {
            title: "ARTICLE 1 : GARANTIES PROPOSÉES",
            items: {
                death: { "title": "Décès", "description": "En cas de décès de l'assuré, l'assureur rembourse le capital restant dû." },
                disability: { "title": "PTIA", "description": "Si l'assuré est en PTIA, l'assureur rembourse le capital restant dû." },
                incapacity: { "title": "ITT", "description": "En cas d'arrêt de travail, l'assureur prend en charge les échéances du prêt après une franchise." }
            }
        },
        exclusions: {
            title: "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            items: [
                "Le suicide de l'assuré la première année.",
                "Les conséquences de faits de guerre ou d'émeutes.",
                "La pratique de sports à titre professionnel."
            ]
        },
        waiver: {
            title: "ARTICLE 4 : DROIT DE RENONCIATION",
            description: "Vous disposez de 30 jours pour renoncer à votre adhésion par lettre recommandée."
        }
    },
    en: {
        title: "Information Notice",
        subtitle: "Group Borrower Insurance Contract No. 789-101112",
        importance: {
            "title": "Importance of this document",
            "description": "This document informs you of the characteristics of your insurance. It details the guarantees, exclusions, and your rights, allowing you to subscribe with full knowledge."
        },
        introduction: "This notice is intended to inform you of the main features of your borrower insurance. It has no contractual value.",
        guarantees: {
            title: "ARTICLE 1: PROPOSED GUARANTEES",
            items: {
                death: { "title": "Death", "description": "In the event of the insured's death, the insurer repays the outstanding capital." },
                disability: { "title": "PTIA", "description": "If the insured is in PTIA, the insurer repays the outstanding capital." },
                incapacity: { "title": "ITT", "description": "In the event of a work stoppage, the insurer covers the loan installments after a deductible period." }
            }
        },
        exclusions: {
            title: "ARTICLE 2: MAIN EXCLUSIONS",
            items: [
                "The insured's suicide in the first year.",
                "The consequences of acts of war or riots.",
                "The practice of sports on a professional basis."
            ]
        },
        waiver: {
            title: "ARTICLE 4: RIGHT OF WAIVER",
            description: "You have 30 days to waive your membership by registered letter."
        }
    }
};
