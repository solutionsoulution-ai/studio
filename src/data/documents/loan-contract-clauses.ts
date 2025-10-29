
import type { Clauses } from "./languages";

export const loanContractClauses: Clauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        department: "Département Juridique & Financier",
        reference: "Référence du contrat : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Le contrat de prêt est le document juridique qui formalise les engagements entre le prêteur et l'emprunteur. Il détaille les conditions, les modalités de remboursement, les droits et les devoirs de chaque partie, sécurisant ainsi la transaction pour toutes les parties."
        },
        parties: { "title": "ENTRE LES SOUSSIGNÉS", "lender": "LE PRÊTEUR :", "borrower": "L'EMPRUNTEUR :" },
        preamble: { "title": "PRÉAMBULE", "content": "Le Prêteur a consenti à accorder à l'Emprunteur un prêt personnel aux conditions décrites dans le présent contrat. L'Emprunteur reconnaît avoir reçu et compris l'ensemble des informations pré-contractuelles nécessaires." },
        articles: {
            object: { "title": "ARTICLE 1 : OBJET DU PRÊT", "content": "Le Prêteur, Capfinfy, consent par les présentes un prêt à usage personnel à l'Emprunteur, {borrower_name}, qui accepte, d'un montant en principal de {loan_amount} ({loan_amount_in_words})." },
            repayment: { "title": "ARTICLE 4 : DURÉE ET MODALITÉS DE REMBOURSEMENT", "content": "Le prêt est remboursable en {loan_term_months} mensualités de {monthly_payment} chacune, prélevées sur le compte bancaire de l'Emprunteur. La première échéance sera prélevée le {repayment_start_date}, et les suivantes à la même date chaque mois." },
            early_repayment: { "title": "ARTICLE 5 : REMBOURSEMENT ANTICIPÉ", "content": "L'Emprunteur a la faculté de rembourser le prêt par anticipation, en totalité ou en partie, à tout moment et sans pénalité, conformément à la législation en vigueur. Toute demande doit être notifiée par écrit." },
            default: { "title": "ARTICLE 7 : DÉFAUT DE PAIEMENT", "content": "En cas de non-paiement de deux (2) échéances consécutives ou non, et après une mise en demeure restée sans effet pendant 8 jours, le Prêteur pourra exiger le remboursement immédiat de la totalité des sommes dues (capital, intérêts courus, et pénalités de retard)." },
            insurance: { "title": "ARTICLE 9 : ASSURANCE", "content": "L'Emprunteur déclare avoir été informé de la possibilité de souscrire une assurance emprunteur facultative couvrant les risques de décès, d'invalidité et d'incapacité de travail. Le coût de l'assurance, le cas échéant, s'ajoute aux mensualités." },
            jurisdiction: { "title": "ARTICLE 10 : LOI APPLICABLE ET JURIDICTION", "content": "Le présent contrat est soumis au droit français. Tout litige né de son interprétation ou de son exécution sera, à défaut d'accord amiable, de la compétence exclusive des tribunaux de Lyon." }
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires originaux, chaque partie reconnaissant avoir reçu le sien."
    },
    en: {
        title: "PERSONAL LOAN AGREEMENT",
        department: "Legal & Financial Department",
        reference: "Contract Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "The loan agreement is the legal document that formalizes the commitments between the lender and the borrower. It details the conditions, repayment terms, and the rights and duties of each party, thus securing the transaction for all parties."
        },
        parties: { "title": "BETWEEN THE UNDERSIGNED", "lender": "THE LENDER:", "borrower": "THE BORROWER:" },
        preamble: { "title": "PREAMBLE", "content": "The Lender has agreed to grant the Borrower a personal loan under the terms described in this agreement. The Borrower acknowledges having received and understood all necessary pre-contractual information." },
        articles: {
            object: { "title": "ARTICLE 1: PURPOSE OF THE LOAN", "content": "The Lender, Capfinfy, hereby grants a personal use loan to the Borrower, {borrower_name}, who accepts, for a principal amount of {loan_amount} ({loan_amount_in_words})." },
            repayment: { "title": "ARTICLE 4: TERM AND REPAYMENT TERMS", "content": "The loan is repayable in {loan_term_months} monthly installments of {monthly_payment} each, debited from the Borrower's bank account. The first installment will be debited on {repayment_start_date}, and subsequent ones on the same date each month." },
            early_repayment: { "title": "ARTICLE 5: EARLY REPAYMENT", "content": "The Borrower has the option to repay the loan early, in whole or in part, at any time and without penalty, in accordance with current legislation. Any request must be notified in writing." },
            default: { "title": "ARTICLE 7: DEFAULT OF PAYMENT", "content": "In case of non-payment of two (2) consecutive or non-consecutive installments, and after a formal notice has remained without effect for 8 days, the Lender may demand immediate repayment of all sums due (principal, accrued interest, and late payment penalties)." },
            insurance: { "title": "ARTICLE 9: INSURANCE", "content": "The Borrower declares to have been informed of the possibility of subscribing to optional borrower insurance covering the risks of death, disability, and incapacity for work. The cost of insurance, if any, is added to the monthly installments." },
            jurisdiction: { "title": "ARTICLE 10: APPLICABLE LAW AND JURISDICTION", "content": "This contract is subject to French law. Any dispute arising from its interpretation or execution shall, in the absence of an amicable agreement, be under the exclusive jurisdiction of the courts of Lyon." }
        },
        signature_preamble: "Done at {location}, on {date}, in two original copies, each party acknowledging receipt of their own."
    }
};
