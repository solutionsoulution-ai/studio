
import type { Clauses } from "./languages";

export const bankingLicenseClauses: Clauses = {
    fr: {
        authority: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        title: "Licence d'Établissement de Crédit",
        subtitle: "Conformément à l'article L. 511-10 du Code monétaire et financier",
        decision: "Décision d'agrément n° {ref}",
        intro: "L'Autorité de Contrôle Prudentiel et de Résolution, après délibération de son collège, accorde à :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "le statut d'établissement de crédit, lui permettant d'effectuer toutes les opérations de banque mentionnées à l'article L. 311-1 du Code monétaire et financier sur le territoire de l'Union Européenne.",
        scope: {
            title: "Activités autorisées",
            item1: "Réception de fonds remboursables du public.",
            item2: "Opérations de crédit, y compris le crédit à la consommation et le crédit immobilier.",
            item3: "Services de paiement et gestion des moyens de paiement.",
        },
        validity: "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des exigences réglementaires.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label: "Pour l'ACPR, Le Secrétaire Général",
    },
    en: {
        authority: "Prudential Control and Resolution Authority (ACPR)",
        title: "Credit Institution License",
        subtitle: "In accordance with Article L. 511-10 of the Monetary and Financial Code",
        decision: "Approval Decision No. {ref}",
        intro: "The Prudential Control and Resolution Authority, after deliberation by its college, grants to:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "the status of a credit institution, authorizing it to carry out all banking operations mentioned in Article L. 311-1 of the Monetary and Financial Code within the territory of the European Union.",
        scope: {
            title: "Authorized Activities",
            item1: "Reception of repayable funds from the public.",
            item2: "Credit operations, including consumer credit and real estate loans.",
            item3: "Payment services and management of means of payment.",
        },
        validity: "This license is granted for an indefinite period, subject to continuous compliance with regulatory requirements.",
        location_and_date: "Done in Paris, on {issue_date}",
        signature_label: "For the ACPR, The Secretary General",
    },
    de: {
        authority: "Aufsichts- und Abwicklungsbehörde (ACPR)",
        title: "Kreditinstituts-Lizenz",
        subtitle: "Gemäß Artikel L. 511-10 des Währungs- und Finanzgesetzbuches",
        decision: "Genehmigungsbeschluss Nr. {ref}",
        intro: "Die Aufsichts- und Abwicklungsbehörde erteilt nach Beratung ihres Kollegiums:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, Frankreich",
        status: "den Status eines Kreditinstituts, das berechtigt ist, alle in Artikel L. 311-1 des Währungs- und Finanzgesetzbuches genannten Bankgeschäfte im Gebiet der Europäischen Union durchzuführen.",
        scope: {
            title: "Zugelassene Tätigkeiten",
            item1: "Entgegennahme von rückzahlbaren Einlagen der Öffentlichkeit.",
            item2: "Kreditgeschäfte, einschließlich Verbraucherkredite und Immobilienkredite.",
            item3: "Zahlungsdienste und Verwaltung von Zahlungsmitteln.",
        },
        validity: "Diese Lizenz wird auf unbestimmte Zeit erteilt, vorbehaltlich der kontinuierlichen Einhaltung der regulatorischen Anforderungen.",
        location_and_date: "Ausgestellt in Paris, am {issue_date}",
        signature_label: "Für die ACPR, Der Generalsekretär",
    }
};
