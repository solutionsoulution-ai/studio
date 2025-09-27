
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
        introduction: "Je soussigné(e), {borrower_name}, demeurant à {borrower_address}, reconnais par la présente devoir la somme décrite ci-dessous à VylsFond.",
        acknowledgment: "Je reconnais avoir reçu de la part de {lender_name}, sous forme de prêt en date du {loan_date}, la somme de {loan_amount} ({loan_amount_in_words}). Ce prêt a été consenti sans intérêt.",
        repayment: "Je m'engage formellement à rembourser intégralement cette somme en un seul versement au plus tard le {repayment_deadline}. Le remboursement devra être effectué par virement bancaire sur le compte qui sera communiqué par le créancier.",
        interest_clause: "À défaut de remboursement à l'échéance convenue, cette somme portera intérêt au taux légal en vigueur à compter du jour suivant la date de remboursement prévue, sans qu'il soit besoin d'une mise en demeure.",
        legal_value: "La présente reconnaissance de dette est établie pour servir et valoir ce que de droit.",
        signature_preamble: "Fait à {signature_location}, le {signature_date}, en deux exemplaires originaux.",
        borrower_signature_label: "L'Emprunteur (le Débiteur)",
        lender_signature_label: "Le Prêteur (le Créancier)",
        borrower_signature_instruction: "(Lu et approuvé, bon pour reconnaissance de dette de la somme indiquée ci-dessus)",
        lender_title: "Directeur Juridique"
    },
    en: {
        title: "Acknowledgment of Debt",
        department: "Legal & Financial Department",
        reference: "Document Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This act is a formal legal proof that records the existence and terms of a debt between two parties. It protects both the creditor by providing a title to recover the debt, and the debtor by clarifying the amount and the repayment deadline."
        },
        introduction: "I, the undersigned, {borrower_name}, residing at {borrower_address}, hereby acknowledge that I owe the sum described below to VylsFond.",
        acknowledgment: "I acknowledge having received from {lender_name}, as a loan dated {loan_date}, the sum of {loan_amount} ({loan_amount_in_words}). This loan was granted without interest.",
        repayment: "I formally undertake to repay this entire sum in a single payment no later than {repayment_deadline}. The repayment shall be made by bank transfer to the account to be provided by the creditor.",
        interest_clause: "In the event of non-payment by the agreed-upon deadline, this sum will bear interest at the legal rate in effect from the day following the scheduled repayment date, without the need for formal notice.",
        legal_value: "This acknowledgment of debt is established to serve as legal proof.",
        signature_preamble: "Done at {signature_location}, on {signature_date}, in two original copies.",
        borrower_signature_label: "The Borrower (The Debtor)",
        lender_signature_label: "The Lender (The Creditor)",
        borrower_signature_instruction: "(Read and approved, good for acknowledgment of the debt of the sum indicated above)",
        lender_title: "Legal Director"
    },
    de: {
        title: "Schuldanerkenntnis",
        department: "Rechts- und Finanzabteilung",
        reference: "Dokumentenreferenz: {ref}",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Diese Urkunde ist ein formeller rechtlicher Nachweis, der das Bestehen und die Modalitäten einer Schuld zwischen zwei Parteien festhält. Sie schützt sowohl den Gläubiger, indem sie ihm einen Titel zur Eintreibung der Forderung verschafft, als auch den Schuldner, indem sie den Betrag und die Rückzahlungsfrist klärt."
        },
        introduction: "Ich, der/die Unterzeichnende, {borrower_name}, wohnhaft in {borrower_address}, erkenne hiermit an, VylsFond die unten beschriebene Summe zu schulden.",
        acknowledgment: "Ich bestätige, von {lender_name} als Darlehen mit Datum vom {loan_date} die Summe von {loan_amount} ({loan_amount_in_words}) erhalten zu haben. Dieses Darlehen wurde zinslos gewährt.",
        repayment: "Ich verpflichte mich förmlich, diese gesamte Summe in einer einzigen Zahlung bis spätestens zum {repayment_deadline} zurückzuzahlen. Die Rückzahlung muss per Banküberweisung auf das vom Gläubiger mitzuteilende Konto erfolgen.",
        interest_clause: "Bei Nichtzahlung bis zum vereinbarten Fälligkeitsdatum wird dieser Betrag ab dem Tag nach dem geplanten Rückzahlungstermin mit dem gesetzlichen Zinssatz verzinst, ohne dass es einer Mahnung bedarf.",
        legal_value: "Dieses Schuldanerkenntnis wird zur rechtlichen Geltendmachung ausgestellt.",
        signature_preamble: "Ausgefertigt in {signature_location}, am {signature_date}, in zwei Originalexemplaren.",
        borrower_signature_label: "Der Darlehensnehmer (Der Schuldner)",
        lender_signature_label: "Der Darlehensgeber (Der Gläubiger)",
        borrower_signature_instruction: "(Gelesen und genehmigt, gültig als Anerkenntnis der Schuld über den oben genannten Betrag)",
        lender_title: "Leiter der Rechtsabteilung"
    },
    es: {
        title: "Reconocimiento de Deuda",
        department: "Departamento Legal y Financiero",
        reference: "Referencia del documento: {ref}",
        importance: {
            title: "Importancia de este documento",
            description: "Este documento es una prueba legal formal que registra la existencia y los términos de una deuda entre dos partes. Protege tanto al acreedor, proporcionándole un título para recuperar la deuda, como al deudor, aclarando el importe y el plazo de devolución."
        },
        introduction: "Yo, el/la abajo firmante, {borrower_name}, con domicilio en {borrower_address}, por la presente reconozco adeudar la suma descrita a continuación a VylsFond.",
        acknowledgment: "Reconozco haber recibido de {lender_name}, en concepto de préstamo con fecha de {loan_date}, la suma de {loan_amount} ({loan_amount_in_words}). Este préstamo fue concedido sin intereses.",
        repayment: "Me comprometo formalmente a reembolsar la totalidad de esta suma en un único pago a más tardar el {repayment_deadline}. El reembolso se realizará mediante transferencia bancaria a la cuenta que será comunicada por el acreedor.",
        interest_clause: "En caso de impago en el plazo acordado, esta suma devengará intereses al tipo legal vigente a partir del día siguiente a la fecha de reembolso prevista, sin necesidad de previo aviso.",
        legal_value: "Este reconocimiento de deuda se establece para que sirva y valga como prueba legal.",
        signature_preamble: "Hecho en {signature_location}, el {signature_date}, en dos copias originales.",
        borrower_signature_label: "El Prestatario (El Deudor)",
        lender_signature_label: "El Prestamista (El Acreedor)",
        borrower_signature_instruction: "(Leído y aprobado, válido como reconocimiento de la deuda por la suma indicada anteriormente)",
        lender_title: "Director Legal"
    },
    pt: {
        title: "Reconhecimento de Dívida",
        department: "Departamento Jurídico e Financeiro",
        reference: "Referência do documento: {ref}",
        importance: {
            title: "Importância deste documento",
            description: "Este ato é uma prova legal formal que regista a existência e os termos de uma dívida entre duas partes. Protege tanto o credor, fornecendo-lhe um título para recuperar a dívida, como o devedor, clarificando o montante e o prazo de pagamento."
        },
        introduction: "Eu, o(a) abaixo-assinado(a), {borrower_name}, residente em {borrower_address}, pelo presente reconheço dever a quantia abaixo descrita à VylsFond.",
        acknowledgment: "Reconheço ter recebido de {lender_name}, a título de empréstimo datado de {loan_date}, a quantia de {loan_amount} ({loan_amount_in_words}). Este empréstimo foi concedido sem juros.",
        repayment: "Comprometo-me formalmente a reembolsar integralmente esta quantia num único pagamento até {repayment_deadline}. O reembolso deverá ser efetuado por transferência bancária para a conta a ser comunicada pelo credor.",
        interest_clause: "Na falta de pagamento no prazo acordado, esta quantia vencerá juros à taxa legal em vigor a partir do dia seguinte à data de reembolso prevista, sem necessidade de notificação.",
        legal_value: "Este reconhecimento de dívida é emitido para servir de prova legal.",
        signature_preamble: "Feito em {location}, em {signature_date}, em duas vias originais.",
        borrower_signature_label: "O Mutuário (O Devedor)",
        lender_signature_label: "O Mutuante (O Credor)",
        borrower_signature_instruction: "(Lido e aprovado, bom para reconhecimento da dívida no valor acima indicado)",
        lender_title: "Diretor Jurídico"
    },
    it: {
        title: "Riconoscimento di Debito",
        department: "Dipartimento Legale e Finanziario",
        reference: "Riferimento documento: {ref}",
        importance: {
            title: "Importanza di questo documento",
            description: "Questo atto è una prova legale formale che attesta l'esistenza e le condizioni di un debito tra due parti. Protegge sia il creditore, fornendogli un titolo per recuperare il credito, sia il debitore, chiarendo l'importo e la scadenza del rimborso."
        },
        introduction: "Io, il/la sottoscritto/a, {borrower_name}, residente in {borrower_address}, con la presente riconosco di dovere la somma sotto descritta a VylsFond.",
        acknowledgment: "Riconosco di aver ricevuto da {lender_name}, a titolo di prestito in data {loan_date}, la somma di {loan_amount} ({loan_amount_in_words}). Tale prestito è stato concesso senza interessi.",
        repayment: "Mi impegno formalmente a rimborsare integralmente tale somma in un'unica soluzione entro e non oltre il {repayment_deadline}. Il rimborso dovrà essere effettuato tramite bonifico bancario sul conto che sarà comunicato dal creditore.",
        interest_clause: "In caso di mancato pagamento alla scadenza concordata, tale somma maturerà interessi al tasso legale vigente a partire dal giorno successivo alla data di rimborso prevista, senza necessità di messa in mora.",
        legal_value: "Il presente riconoscimento di debito è redatto per servire e valere come prova legale.",
        signature_preamble: "Fatto a {location}, il {signature_date}, in due copie originali.",
        borrower_signature_label: "Il Debitore",
        lender_signature_label: "Il Creditore",
        borrower_signature_instruction: "(Letto e approvato, valido come riconoscimento del debito per la somma sopra indicata)",
        lender_title: "Direttore Legale"
    }
}
