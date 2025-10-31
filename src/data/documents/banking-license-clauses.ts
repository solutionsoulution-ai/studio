
import type { Clauses } from "./languages";

export const bankingLicenseClauses: Clauses = {
    fr: {
        authority: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        title: "Licence d'Établissement de Crédit",
        subtitle: "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        decision: "Décision d'agrément n° {ref} du collège de l'ACPR",
        intro: "Vu le Code monétaire et financier, notamment ses dispositions relatives aux établissements de crédit et aux sociétés de financement, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution accorde à :",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.",
        articles: {
            scope: {
                title: "Article 1 - Périmètre des Activités Autorisées",
                intro: "Capfinfy est autorisée à réaliser les opérations de banque suivantes :",
                item1: "La réception de fonds remboursables du public sous forme de dépôts ou autres.",
                item2: "Les opérations de crédit, incluant mais non limitées au crédit à la consommation, au crédit immobilier, et à l'affacturage.",
                item3: "La mise à disposition et la gestion de moyens de paiement.",
            },
            obligations: {
                title: "Article 2 - Obligations Réglementaires",
                content: "L'établissement est tenu de respecter en permanence les exigences prudentielles, notamment en matière de fonds propres (ratio de solvabilité), de liquidité, de contrôle interne, de lutte contre le blanchiment de capitaux et le financement du terrorisme (LCB-FT), et de protection de la clientèle.",
            },
            reporting: {
                title: "Article 3 - Obligations de Déclaration",
                content: "Capfinfy doit se conformer aux obligations de reporting périodique auprès de l'ACPR et de la Banque de France concernant sa situation financière, ses risques et ses activités.",
            }
        },
        validity: "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être révoquée en cas de manquement grave.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label: "Pour l'ACPR, Le Secrétaire Général",
    },
    en: {
        authority: "Prudential Control and Resolution Authority (ACPR)",
        title: "Credit Institution License",
        subtitle: "In accordance with Articles L. 511-1 et seq. of the Monetary and Financial Code",
        decision: "Approval Decision No. {ref} of the ACPR College",
        intro: "Having regard to the Monetary and Financial Code, in particular its provisions relating to credit institutions and financing companies, and after examining the application file submitted, the Prudential Control and Resolution Authority grants to:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, France",
        status: "the status of a Credit Institution, authorizing it to carry out all banking operations within the territory of the European Union.",
        articles: {
            scope: {
                title: "Article 1 - Scope of Authorized Activities",
                intro: "Capfinfy is authorized to perform the following banking operations:",
                item1: "Receiving repayable funds from the public in the form of deposits or otherwise.",
                item2: "Credit operations, including but not limited to consumer credit, real estate loans, and factoring.",
                item3: "Provision and management of means of payment.",
            },
            obligations: {
                title: "Article 2 - Regulatory Obligations",
                content: "The institution is required to continuously comply with prudential requirements, particularly regarding own funds (solvency ratio), liquidity, internal control, anti-money laundering and counter-terrorist financing (AML/CFT), and customer protection.",
            },
            reporting: {
                title: "Article 3 - Reporting Obligations",
                content: "Capfinfy must comply with periodic reporting obligations to the ACPR and the Banque de France concerning its financial situation, risks, and activities.",
            }
        },
        validity: "This license is granted for an indefinite period, subject to continuous compliance with the conditions of its granting and the regulations in force. It may be revoked in case of serious breach.",
        location_and_date: "Done in Paris, on {issue_date}",
        signature_label: "For the ACPR, The Secretary General",
    },
    de: {
        authority: "Aufsichts- und Abwicklungsbehörde (ACPR)",
        title: "Kreditinstituts-Lizenz",
        subtitle: "Gemäß Artikel L. 511-1 ff. des Währungs- und Finanzgesetzbuches",
        decision: "Genehmigungsbeschluss Nr. {ref} des ACPR-Kollegiums",
        intro: "Unter Berücksichtigung des Währungs- und Finanzgesetzbuches, insbesondere seiner Bestimmungen über Kreditinstitute und Finanzierungsgesellschaften, und nach Prüfung des eingereichten Antrags erteilt die Aufsichts- und Abwicklungsbehörde:",
        company_name: "Capfinfy SAS",
        company_address: "1 Place de la Bourse, 69002 Lyon, Frankreich",
        status: "den Status eines Kreditinstituts, das berechtigt ist, alle Bankgeschäfte im Gebiet der Europäischen Union durchzuführen.",
        articles: {
            scope: {
                title: "Artikel 1 - Umfang der zugelassenen Tätigkeiten",
                intro: "Capfinfy ist berechtigt, die folgenden Bankgeschäfte durchzuführen:",
                item1: "Entgegennahme von rückzahlbaren Einlagen der Öffentlichkeit in Form von Einlagen oder auf andere Weise.",
                item2: "Kreditgeschäfte, einschließlich, aber nicht beschränkt auf Verbraucherkredite, Immobilienkredite und Factoring.",
                item3: "Bereitstellung und Verwaltung von Zahlungsmitteln.",
            },
            obligations: {
                title: "Artikel 2 - Regulatorische Verpflichtungen",
                content: "Das Institut ist verpflichtet, die aufsichtsrechtlichen Anforderungen, insbesondere in Bezug auf Eigenmittel (Solvabilitätsquote), Liquidität, interne Kontrolle, Bekämpfung von Geldwäsche und Terrorismusfinanzierung (AML/CFT) sowie den Kundenschutz, kontinuierlich zu erfüllen.",
            },
            reporting: {
                title: "Artikel 3 - Meldepflichten",
                content: "Capfinfy muss den regelmäßigen Meldepflichten gegenüber der ACPR und der Banque de France bezüglich seiner Finanzlage, Risiken und Tätigkeiten nachkommen.",
            }
        },
        validity: "Diese Lizenz wird auf unbestimmte Zeit erteilt, vorbehaltlich der kontinuierlichen Einhaltung der Bedingungen ihrer Erteilung und der geltenden Vorschriften. Sie kann bei schwerwiegenden Verstößen widerrufen werden.",
        location_and_date: "Ausgestellt in Paris, am {issue_date}",
        signature_label: "Für die ACPR, Der Generalsekretär",
    }
};
