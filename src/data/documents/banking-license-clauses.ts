
import type { Clauses } from "./languages";

export const bankingLicenseClauses: Clauses = {
    fr: {
        authority: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        title: "Licence d'Établissement de Crédit",
        subtitle: "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        decision: "Décision d'agrément n° {ref} du collège de l'ACPR",
        intro: "Vu le Code monétaire et financier, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution, après en avoir délibéré, DÉCIDE :",
        grant_to: "Article Unique : Il est accordé à :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.",
        articles: {
            scope: {
                title: "Annexe 1 - Périmètre des Activités Autorisées",
                intro: "Capfinfy est autorisée à réaliser les opérations de banque suivantes :",
                item1: "La réception de fonds remboursables du public.",
                item2: "Les opérations de crédit (crédit à la consommation, crédit immobilier, affacturage).",
                item3: "La mise à disposition et la gestion de moyens de paiement.",
            },
            obligations: {
                title: "Annexe 2 - Obligations Réglementaires",
                content: "L'établissement est tenu de respecter en permanence les exigences prudentielles, notamment en matière de fonds propres, de liquidité, et de contrôle interne.",
            },
            lcbft: {
                title: "Annexe 3 - Lutte Contre le Blanchiment (LCB-FT)",
                content: "Capfinfy doit appliquer des mesures de vigilance strictes pour la prévention du blanchiment de capitaux et du financement du terrorisme, conformément à la réglementation en vigueur."
            },
            customer_protection: {
                title: "Annexe 4 - Protection de la Clientèle",
                content: "L'établissement doit garantir la protection des intérêts de sa clientèle, en assurant notamment la transparence des informations et la qualité du conseil fourni."
            }
        },
        validity: "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être révoquée en cas de manquement grave.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label: "Pour l'ACPR, Le Secrétaire Général",
    },
    en: {
        // ... (english translations will follow the same new structure)
    },
    de: {
        // ... (german translations will follow the same new structure)
    }
};
