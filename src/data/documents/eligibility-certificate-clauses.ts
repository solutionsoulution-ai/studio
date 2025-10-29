
import type { Clauses } from "./languages";

export const eligibilityCertificateClauses: Clauses = {
    fr: {
        header: {
            line1: "Département d'Analyse Financière",
            line2: "Unité de Certification de Solvabilité",
        },
        title: "Certificat de Solvabilité Pré-approuvée pour un projet de {project_type}",
        reference: "Certificat N°: {ref}",
        validity: "Valide jusqu'au: {validity_date}",
        beneficiary: {
            title: "Bénéficiaire du certificat :",
        },
        articles: {
            object: {
                title: "Article 1 : Objet du Certificat",
                content: "Capfinfy, agissant en tant qu'intermédiaire financier, certifie par la présente avoir procédé à une analyse préliminaire de la situation financière du bénéficiaire susmentionné. Sur la base des éléments déclarés et en l'état actuel de nos critères d'évaluation, le bénéficiaire est jugé éligible à un financement pour un montant maximum de :",
                amount_label: "Montant d'éligibilité maximal",
            },
            scope: {
                title: "Article 2 : Portée et Limites",
                content: "Ce certificat atteste d'une capacité de financement théorique au jour de son émission. Il est destiné à être présenté à des tiers (agents immobiliers, vendeurs, etc.) comme un élément de réassurance de la capacité du bénéficiaire à financer un projet. Il ne constitue en aucun cas une offre de prêt ferme et ne saurait engager Capfinfy ou ses partenaires prêteurs.",
            },
            validity: {
                title: "Article 3 : Validité",
                content: "Le présent certificat est valable 30 jours calendaires à compter de sa date d'émission, soit jusqu'au {validity_date}. Passé ce délai, une nouvelle évaluation sera nécessaire. La validité est conditionnée à l'absence de changement significatif dans la situation financière du bénéficiaire et à la vérification ultérieure des pièces justificatives originales.",
            }
        },
    },
    en: {
        header: {
            line1: "Financial Analysis Department",
            line2: "Solvency Certification Unit",
        },
        title: "Certificate of Pre-Approved Solvency for a {project_type} project",
        reference: "Certificate No: {ref}",
        validity: "Valid until: {validity_date}",
        beneficiary: {
            title: "Beneficiary of the certificate:",
        },
        articles: {
            object: {
                title: "Article 1: Purpose of the Certificate",
                content: "Capfinfy, acting as a financial intermediary, hereby certifies that it has conducted a preliminary analysis of the financial situation of the above-mentioned beneficiary. Based on the declared elements and our current evaluation criteria, the beneficiary is deemed eligible for financing up to a maximum amount of:",
                amount_label: "Maximum Eligibility Amount",
            },
            scope: {
                title: "Article 2: Scope and Limitations",
                content: "This certificate attests to a theoretical financing capacity as of its date of issue. It is intended to be presented to third parties (real estate agents, sellers, etc.) as an element of reassurance of the beneficiary's ability to finance a project. It in no way constitutes a firm loan offer and shall not bind Capfinfy or its lending partners.",
            },
            validity: {
                title: "Article 3: Validity",
                content: "This certificate is valid for 30 calendar days from its date of issue, i.e., until {validity_date}. After this period, a new assessment will be required. The validity is conditional on the absence of any significant change in the beneficiary's financial situation and on the subsequent verification of the original supporting documents.",
            }
        },
    },
    de: {
        header: {
            line1: "Finanzanalyseabteilung",
            line2: "Abteilung für Bonitätszertifizierung",
        },
        title: "Zertifikat über vorab genehmigte Bonität für ein {project_type}-Projekt",
        reference: "Zertifikat Nr.: {ref}",
        validity: "Gültig bis: {validity_date}",
        beneficiary: {
            title: "Begünstigter des Zertifikats:",
        },
        articles: {
            object: {
                title: "Artikel 1: Zweck des Zertifikats",
                content: "Capfinfy, handelnd als Finanzvermittler, bescheinigt hiermit, eine vorläufige Analyse der finanziellen Situation des oben genannten Begünstigten durchgeführt zu haben. Auf der Grundlage der angegebenen Elemente und unserer aktuellen Bewertungskriterien wird der Begünstigte als kreditwürdig für eine Finanzierung bis zu einem Höchstbetrag von:",
                amount_label: "Maximaler Förderbetrag",
            },
            scope: {
                title: "Artikel 2: Geltungsbereich und Einschränkungen",
                content: "Dieses Zertifikat bescheinigt eine theoretische Finanzierungskapazität zum Zeitpunkt seiner Ausstellung. Es ist dazu bestimmt, Dritten (Immobilienmaklern, Verkäufern usw.) als Sicherheit für die Fähigkeit des Begünstigten zur Finanzierung eines Projekts vorgelegt zu werden. Es stellt in keiner Weise ein verbindliches Darlehensangebot dar und bindet Capfinfy oder seine darlehensgebenden Partner nicht.",
            },
            validity: {
                title: "Artikel 3: Gültigkeit",
                content: "Dieses Zertifikat ist 30 Kalendertage ab Ausstellungsdatum gültig, d.h. bis zum {validity_date}. Nach diesem Zeitraum ist eine neue Bewertung erforderlich. Die Gültigkeit ist an die Bedingung geknüpft, dass sich die finanzielle Situation des Begünstigten nicht wesentlich ändert und die Originalbelege nachträglich überprüft werden.",
            }
        },
    }
};
