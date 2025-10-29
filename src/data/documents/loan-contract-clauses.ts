
import type { Clauses } from "./languages";

export const loanContractClauses: Clauses = {
    fr: {
        header: {
            line1: "Service Financier Européen",
            line2: "Département des crédits à la consommation • Bureau des Accords de Prêt • Unité de Vérification des Engagements",
        },
        title: "Contrat de {type_of_loan}",
        reference: "Contrat N°: {contract_ref}",
        location_and_date: "Fait à Lyon, le {contract_date}",
        parties: {
            title: "Entre les soussignés :",
            lender_label: "Le Prêteur :",
            borrower_label: "L'Emprunteur :",
        },
        articles: {
            object: {
                title: "Article 1 : Objet du Contrat",
                content: "Le Prêteur consent à l'Emprunteur, qui accepte, un {type_of_loan} amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières.",
            },
            characteristics: {
                title: "Article 2 : Montant et Caractéristiques du Prêt",
                amount: "Montant du capital prêté : {loan_amount} ({loan_amount_in_words} euros).",
                taeg: "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                term: "Durée totale du remboursement : {loan_term} mois.",
                availability: "Date de mise à disposition des fonds : Au plus tard 10 jours après l'expiration du délai de rétractation.",
            },
            repayment: {
                title: "Article 3 : Modalités de Remboursement",
                intro: "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date} et la dernière le {end_date}.",
                monthly_payment: "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                total_cost: "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                total_due: "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts).",
            },
            withdrawal: {
                title: "Article 4 : Droit de Rétractation",
                content: "L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.",
            },
            default: {
                title: "Article 5 : Défaut de Paiement",
                content: "En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur.",
            },
            insurance: {
                title: "Article 6 : Assurance Emprunteur Obligatoire",
                content: "L'octroi de ce prêt est conditionné à la souscription par l'Emprunteur d'une assurance couvrant les risques de Décès, Perte Totale et Irréversible d'Autonomie (PTIA), et Incapacité de Travail (IT). Le coût de cette assurance est inclus dans les mensualités ou facturé séparément, selon les termes convenus. L'Emprunteur reconnaît avoir reçu et accepté les conditions de cette assurance, qui font l'objet d'une attestation d'assurance distincte fournie par Capfinfy ou ses partenaires assureurs.",
            },
            data: {
                title: "Article 7 : Protection des Données Personnelles",
                content: "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur à l'adresse {contact_email}.",
            },
            law: {
                title: "Article 8 : Droit Applicable et Litiges",
                content: "Le présent contrat est soumis au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur.",
            },
        },
        signature_preamble: "Fait en deux exemplaires originaux, dont un pour chaque partie.",
    },
    en: {
        // English translations would go here
    }
};
