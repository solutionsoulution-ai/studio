
export const debtRecognitionClauses = {
    fr: {
        title: "Reconnaissance de Dette",
        introduction: "Je soussigné(e), {borrower_name}, demeurant à {borrower_address}, reconnais par la présente devoir la somme décrite ci-dessous à VylsCapital.",
        acknowledgment: "Je reconnais avoir reçu de la part de {lender_name}, sous forme de prêt en date du {loan_date}, la somme de {loan_amount} ({loan_amount_in_words}). Ce prêt a été consenti sans intérêt.",
        repayment: "Je m'engage formellement à rembourser intégralement cette somme en un seul versement au plus tard le {repayment_deadline}. Le remboursement devra être effectué par virement bancaire sur le compte qui sera communiqué par le créancier.",
        interest_clause: "À défaut de remboursement à l'échéance convenue, cette somme portera intérêt au taux légal en vigueur à compter du jour suivant la date de remboursement prévue, sans qu'il soit besoin d'une mise en demeure.",
        legal_value: "La présente reconnaissance de dette est établie pour servir et valoir ce que de droit.",
        signature_preamble: "Fait à {signature_location}, le {signature_date}, en deux exemplaires originaux.",
        borrower_signature_label: "L'Emprunteur (le Débiteur)",
        lender_signature_label: "Le Prêteur (le Créancier)",
    },
    en: {
        // English version can be added here
    }
}
