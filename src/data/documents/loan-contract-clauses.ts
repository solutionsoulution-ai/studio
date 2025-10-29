
import type { Clauses } from "./languages";

export const loanContractClauses: Clauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        department: "Département Juridique & Financier",
        reference: "Référence du contrat : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Le contrat de prêt est le document juridique qui formalise les engagements entre le prêteur et l'emprunteur. Il détaille les conditions, les modalités de remboursement, les droits et les devoirs de chaque partie, sécurisant ainsi la transaction."
        },
        parties: { "title": "ENTRE LES SOUSSIGNÉS", "lender": "LE PRÊTEUR :", "borrower": "L'EMPRUNTEUR :" },
        articles: {
            object: { "title": "ARTICLE 1 : OBJET DU PRÊT", "content": "Le Prêteur, {lender_name}, consent un prêt de {loan_amount} ({loan_amount_in_words}) à l'Emprunteur, {borrower_name}." },
            repayment: { "title": "ARTICLE 4 : DURÉE ET MODALITÉS DE REMBOURSEMENT", "content": "Le prêt est remboursable en {loan_term_months} mensualités de {monthly_payment} chacune, à compter du {repayment_start_date}." },
            default: { "title": "ARTICLE 7 : DÉFAUT DE PAIEMENT", "content": "En cas de non-paiement de deux (2) échéances consécutives, la totalité des sommes dues deviendra immédiatement exigible." },
            jurisdiction: { "title": "ARTICLE 10 : LOI APPLICABLE ET JURIDICTION", "content": "Le présent contrat est soumis au droit français. Tout litige sera de la compétence exclusive des tribunaux de Lyon." }
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires originaux."
    },
    en: {
        title: "PERSONAL LOAN AGREEMENT",
        department: "Legal & Financial Department",
        reference: "Contract Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "The loan agreement is the legal document that formalizes the commitments between the lender and the borrower. It details the conditions, repayment terms, and the rights and duties of each party, thus securing the transaction."
        },
        parties: { "title": "BETWEEN THE UNDERSIGNED", "lender": "THE LENDER:", "borrower": "THE BORROWER:" },
        articles: {
            object: { "title": "ARTICLE 1: PURPOSE OF THE LOAN", "content": "The Lender, {lender_name}, grants a loan of {loan_amount} ({loan_amount_in_words}) to the Borrower, {borrower_name}." },
            repayment: { "title": "ARTICLE 4: TERM AND REPAYMENT TERMS", "content": "The loan is repayable in {loan_term_months} monthly installments of {monthly_payment} each, starting from {repayment_start_date}." },
            default: { "title": "ARTICLE 7: DEFAULT OF PAYMENT", "content": "In case of non-payment of two (2) consecutive installments, the total amount due will become immediately exigible." },
            jurisdiction: { "title": "ARTICLE 10: APPLICABLE LAW AND JURISDICTION", "content": "This contract is subject to French law. Any dispute will be under the exclusive jurisdiction of the courts of Lyon." }
        },
        signature_preamble: "Done at {location}, on {date}, in two original copies."
    }
};
