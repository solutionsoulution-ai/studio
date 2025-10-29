
import type { Clauses } from "./languages";

export const debtRecognitionClauses: Clauses = {
    fr: {
        title: "Reconnaissance de Dette",
        department: "Département Juridique & Financier",
        reference: "Référence du document : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cet acte est une preuve juridique formelle qui constate l'existence et les modalités d'une dette entre deux parties. Il protège à la fois le créancier en lui donnant un titre pour recouvrer sa créance, et le débiteur en clarifiant le montant et l'échéance du remboursement."
        },
        introduction: "Je soussigné(e), {borrower_name}, demeurant à {borrower_address}, reconnais par la présente devoir la somme décrite ci-dessous à Capfinfy.",
        acknowledgment: "Je reconnais avoir reçu de la part de {lender_name}, sous forme de prêt en date du {loan_date}, la somme de {loan_amount} ({loan_amount_in_words}). Ce prêt a été consenti sans intérêt.",
        repayment: "Je m'engage formellement à rembourser intégralement cette somme en un seul versement au plus tard le {repayment_deadline}. Le remboursement devra être effectué par virement bancaire sur le compte qui sera communiqué par le créancier.",
        interest_clause: "À défaut de remboursement à l'échéance convenue, cette somme portera intérêt au taux légal en vigueur à compter du jour suivant la date de remboursement prévue, sans qu'il soit besoin d'une mise en demeure.",
        legal_value: "La présente reconnaissance de dette est établie pour servir et valoir ce que de droit.",
        signature_preamble: "Fait à {signature_location}, le {signature_date}, en deux exemplaires originaux.",
        borrower_signature_label: "L'Emprunteur (le Débiteur)",
        lender_signature_label: "Le Prêteur (le Créancier)"
    },
    en: {
        title: "Acknowledgment of Debt",
        department: "Legal & Financial Department",
        reference: "Document Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This act is a formal legal proof that records the existence and terms of a debt between two parties. It protects both the creditor by providing a title to recover the debt, and the debtor by clarifying the amount and the repayment deadline."
        },
        introduction: "I, the undersigned, {borrower_name}, residing at {borrower_address}, hereby acknowledge that I owe the sum described below to Capfinfy.",
        acknowledgment: "I acknowledge having received from {lender_name}, as a loan dated {loan_date}, the sum of {loan_amount} ({loan_amount_in_words}). This loan was granted without interest.",
        repayment: "I formally undertake to repay this entire sum in a single payment no later than {repayment_deadline}. The repayment shall be made by bank transfer to the account to be provided by the creditor.",
        interest_clause: "In the event of non-payment by the agreed-upon deadline, this sum will bear interest at the legal rate in effect from the day following the scheduled repayment date, without the need for formal notice.",
        legal_value: "This acknowledgment of debt is established to serve as legal proof.",
        signature_preamble: "Done at {signature_location}, on {signature_date}, in two original copies.",
        borrower_signature_label: "The Borrower (The Debtor)",
        lender_signature_label: "The Lender (The Creditor)"
    }
};
