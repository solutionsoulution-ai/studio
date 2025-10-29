
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
        introduction: "Je soussigné(e), {borrower_name}, demeurant à {borrower_address}, reconnais par la présente devoir la somme décrite ci-dessous à Capfinfy, société sise 1 Place de la Bourse, 69002 Lyon, France, ci-après dénommé 'le Créancier'.",
        acknowledgment: "Je reconnais avoir reçu de la part de {lender_name}, sous forme de prêt en date du {loan_date}, la somme de {loan_amount} ({loan_amount_in_words}). Cette somme m'a été remise par virement bancaire et je confirme en avoir eu la pleine et entière disposition. Ce prêt a été consenti sans intérêt, sauf application de la clause ci-dessous.",
        repayment: "Je m'engage formellement et irrévocablement à rembourser intégralement cette somme en un seul versement au plus tard le {repayment_deadline}. Le remboursement devra être effectué par virement bancaire sur le compte qui sera communiqué par le créancier en temps utile. Tout remboursement partiel ne sera pas considéré comme libératoire.",
        interest_clause: "À défaut de remboursement intégral à l'échéance convenue, et ce, dès le premier jour de retard, cette somme portera de plein droit et sans qu'il soit besoin d'une mise en demeure préalable, un intérêt de retard calculé au taux légal en vigueur majoré de cinq points. Les intérêts courront jusqu'au jour du paiement complet du principal et des accessoires.",
        legal_value: "La présente reconnaissance de dette est établie pour servir et valoir ce que de droit. Elle est soumise au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Lyon seront seuls saisis.",
        signature_preamble: "Fait à {signature_location}, le {signature_date}, en deux exemplaires originaux, dont un est remis à chaque partie qui le reconnaît.",
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
        introduction: "I, the undersigned, {borrower_name}, residing at {borrower_address}, hereby acknowledge that I owe the sum described below to Capfinfy, a company located at 1 Place de la Bourse, 69002 Lyon, France, hereinafter referred to as 'the Creditor'.",
        acknowledgment: "I acknowledge having received from {lender_name}, as a loan dated {loan_date}, the sum of {loan_amount} ({loan_amount_in_words}). This sum was delivered to me by bank transfer and I confirm having had full and complete disposal of it. This loan was granted without interest, except as provided in the clause below.",
        repayment: "I formally and irrevocably undertake to repay this entire sum in a single payment no later than {repayment_deadline}. The repayment shall be made by bank transfer to the account to be provided by the creditor in due course. Any partial repayment will not be considered as a discharge of the debt.",
        interest_clause: "In the event of non-payment in full by the agreed-upon deadline, and from the first day of delay, this sum will automatically and without the need for prior formal notice, bear late payment interest calculated at the legal rate in effect plus five points. Interest will accrue until the day of full payment of the principal and accessories.",
        legal_value: "This acknowledgment of debt is established to serve as legal proof. It is subject to French law. In the event of a dispute, and failing an amicable resolution, the competent courts of Lyon will have sole jurisdiction.",
        signature_preamble: "Done at {signature_location}, on {signature_date}, in two original copies, one of which is given to each party who acknowledges it.",
        borrower_signature_label: "The Borrower (The Debtor)",
        lender_signature_label: "The Lender (The Creditor)"
    }
};
