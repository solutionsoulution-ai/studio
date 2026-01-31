
import type { Clauses } from "./languages";

export const loanContractClauses = (companyCity: string): Clauses => ({
    fr: {
         header: {
            line1: "Vantex Bank",
            line2: "Département Crédits • Direction Générale",
        },
        title: "Contrat de Prêt",
        reference: "Contrat N°: PR-88210",
        location_and_date: ``,
        parties: {
            title: "Entre les soussignés :",
            lender_label: "Le Prêteur :",
            borrower_label: "L'Emprunteur :",
            read_and_approved: "Lu et approuvé",
        },
        articles: {
            object: {
                title: "Article 1 : Objet du Contrat",
                content: "Le Prêteur consent à l'Emprunteur, qui accepte, un prêt Prêt Personnel Amortissable amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières.",
            },
            characteristics: {
                title: "Article 2 : Montant et Caractéristiques du Prêt",
                amount: "Montant du capital prêté : {loan_amount} ({loan_amount_in_words}).",
                taeg: "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                term: "Durée totale du remboursement : {loan_term} mois.",
                availability: "Date de mise à disposition des fonds : Au plus tard {availability_days} jours après l'expiration du délai de rétractation.",
            },
            repayment: {
                title: "Article 3 : Modalités de Remboursement",
                intro: "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date}.",
                monthly_payment: "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                total_cost: "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                total_due: "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts + frais remboursés).",
            },
            withdrawal: {
                title: "Article 4 : Droit de Rétractation",
                content: "L'Emprunteur dispose d'un délai de rétractation de {withdrawal_days} jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.",
            },
            default: {
                title: "Article 5 : Défaut de Paiement",
                content: "En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur.",
            },
            early_repayment: {
                title: "Article 6 : Remboursement Anticipé",
                content: "L'Emprunteur a le droit, à tout moment, de rembourser par anticipation, en totalité ou en partie, le crédit qui lui a été consenti. Conformément à notre politique commerciale, aucune indemnité de remboursement anticipé ne sera exigée, quel que soit le montant. L'Emprunteur devra simplement notifier le Prêteur de son intention par écrit afin d'organiser les modalités pratiques du remboursement.",
            },
            data: {
                title: "Article 7 : Protection des Données Personnelles",
                content: "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur.",
            },
            law: {
                title: "Article 8 : Droit Applicable et Litiges",
                content: "Le présent contrat est soumis au droit allemand. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur.",
            },
            reimbursement: {
                title: "Article 9 : Remboursement des Frais",
                content: "Le Prêteur s'engage à rembourser à l'Emprunteur les frais avancés durant la procédure d'octroi du prêt, estimés à {reimbursed_fees}. Ce montant sera ajouté au capital versé à l'Emprunteur."
            }
        },
        signature_preamble: "",
    },
    en: {
        // English translations would go here
    },
    de: {
        // German translations would go here
    },
    lt: {
        // Lithuanian translations would go here
    },
    nl: {
        // Dutch translations would go here
    }
});
