
import type { Clauses } from "./languages";

export const bankingLicenseClauses: Clauses = {
    fr: {
        authority: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        title: "Licence d'Établissement de Crédit",
        subtitle: "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        decision: "Décision d'agrément n° {ref} du collège de l'ACPR",
        intro: "Vu le Code monétaire et financier, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), après en avoir délibéré, DÉCIDE :",
        grant_to: "Article 1 : Agrément",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "Il est accordé à l'entité Capfinfy SAS le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.",
        articles: {
            scope: {
                title: "Article 2 : Périmètre des Activités Autorisées",
                intro: "Dans le cadre de cet agrément, Capfinfy est autorisée à réaliser, à titre de profession habituelle, les opérations de banque suivantes :",
                item1: "La réception de fonds remboursables du public, sous forme de dépôts ou autrement.",
                item2: "Les opérations de crédit, incluant, sans s'y limiter, le crédit à la consommation, le crédit immobilier, l'affacturage, et le crédit-bail.",
                item3: "La mise à disposition et la gestion de moyens de paiement, y compris les cartes de paiement et les virements.",
            },
            prudential: {
                title: "Article 3 : Exigences Prudentielles",
                content: "L'établissement est tenu de respecter en permanence les exigences réglementaires européennes et nationales (CRR/CRD), notamment en matière de fonds propres (ratio de solvabilité), de liquidité (LCR/NSFR), de grands risques, et de levier financier. Il doit maintenir en permanence un niveau de fonds propres adéquat pour couvrir les risques inhérents à ses activités.",
            },
            internal_control: {
                title: "Article 4 : Contrôle Interne et Gouvernance",
                content: "Capfinfy doit se doter d'un système de contrôle interne robuste et d'une gouvernance d'entreprise saine, incluant une séparation claire des fonctions, des procédures de gestion des risques efficaces, et un dispositif de conformité (compliance) assurant le respect des réglementations en vigueur.",
            },
            lcbft: {
                title: "Article 5 : Lutte Contre le Blanchiment et le Financement du Terrorisme (LCB-FT)",
                content: "Capfinfy doit appliquer des mesures de vigilance strictes pour la prévention du blanchiment de capitaux et du financement du terrorisme. Cela inclut l'identification et la vérification de l'identité de ses clients (KYC), le suivi de leurs opérations, et la déclaration de toute opération suspecte à TRACFIN."
            },
            customer_protection: {
                title: "Article 6 : Protection de la Clientèle",
                content: "L'établissement doit garantir la protection des intérêts de sa clientèle. Il doit fournir une information claire, exacte et non trompeuse sur ses produits et tarifs, offrir un conseil adapté à la situation de ses clients, et disposer d'un système de traitement des réclamations efficace et transparent."
            },
            reporting: {
                title: "Article 7 : Obligations de Reporting",
                content: "Capfinfy est assujetti à des obligations de reporting périodique auprès de l'ACPR et de la Banque de France concernant sa situation financière, ses risques, et son respect des ratios réglementaires."
            }
        },
        validity: "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être modifiée, suspendue ou révoquée par l'ACPR en cas de manquement grave aux obligations légales et réglementaires.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label_1: "Le Gouverneur de la Banque de France",
        signature_label_2: "Le Secrétaire Général de l'ACPR",
    },
    en: {
        // ... (english translations will follow the same new structure)
    },
    de: {
        // ... (german translations will follow the same new structure)
    }
};
