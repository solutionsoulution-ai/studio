
import type { Clauses } from "./languages";

export const eligibilityCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Éligibilité au Financement",
        department: "Département Analyse de Crédit",
        location_and_date: "Fait à Lyon, le {date}",
        reference: "Référence : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est une validation préliminaire de votre capacité d'emprunt auprès de notre institution. Elle vous permet de prouver votre sérieux et votre éligibilité auprès de tiers (agents immobiliers, vendeurs, etc.) lors de vos démarches, sans pour autant constituer une offre de prêt définitive."
        },
        introduction: "Nous soussignés, Vylsfond, attestons par la présente que, sur la base des informations fournies et après une première analyse de son dossier, le bénéficiaire : {beneficiary_name}, demeurant à {beneficiary_address} et identifié(e) par la pièce d'identité n°{beneficiary_id_number}, présente un profil lui permettant d'être éligible à une solution de financement.",
        eligibility_statement: "Le montant de financement pour lequel le bénéficiaire est jugé éligible s'élève à {amount}.",
        conditions: "Cette attestation est valable pour une durée de 30 jours à compter de sa date d'émission, soit jusqu'au {validity_end_date}. Elle est fournie sous réserve de la vérification des documents originaux et de l'absence de changement significatif dans la situation financière du bénéficiaire.",
        conclusion: "Cette attestation ne constitue pas une offre de prêt ferme, mais une validation de la capacité de financement théorique du bénéficiaire. L'octroi définitif du financement reste conditionné à l'étude approfondie du dossier et à la signature d'un contrat de prêt en bonne et due forme.",
        analyst_title: "Directeur d'Analyse Financière",
    },
    en: {
        title: "Certificate of Funding Eligibility",
        department: "Credit Analysis Department",
        location_and_date: "Done in Lyon, on {date}",
        reference: "Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is a preliminary validation of your borrowing capacity with our institution. It allows you to prove your seriousness and eligibility to third parties (real estate agents, sellers, etc.) during your procedures, without constituting a definitive loan offer."
        },
        introduction: "We, the undersigned, Vylsfond, hereby certify that, based on the information provided and after an initial analysis of their file, the beneficiary: {beneficiary_name}, residing at {beneficiary_address} and identified by ID document No. {beneficiary_id_number}, has a profile that makes them eligible for a financing solution.",
        eligibility_statement: "The financing amount for which the beneficiary is deemed eligible is {amount}.",
        conditions: "This certificate is valid for a period of 30 days from its date of issue, i.e., until {validity_end_date}. It is provided subject to the verification of original documents and the absence of any significant change in the beneficiary's financial situation.",
        conclusion: "This certificate does not constitute a firm loan offer, but a validation of the beneficiary's theoretical financing capacity. The final granting of financing remains conditional on a thorough review of the file and the signing of a formal loan agreement.",
        analyst_title: "Director of Financial Analysis",
    },
    de: {
        title: "Bescheinigung über die Finanzierungsfähigkeit",
        department: "Kreditprüfungsabteilung",
        location_and_date: "Ausgestellt in Lyon, am {date}",
        reference: "Referenz: {ref}",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Diese Bescheinigung ist eine vorläufige Bestätigung Ihrer Kreditwürdigkeit bei unserer Institution. Sie ermöglicht es Ihnen, Ihre Ernsthaftigkeit und Förderfähigkeit gegenüber Dritten (Immobilienmakler, Verkäufer etc.) nachzuweisen, ohne ein verbindliches Kreditangebot darzustellen."
        },
        introduction: "Wir, die Unterzeichnenden, Vylsfond, bescheinigen hiermit, dass auf der Grundlage der bereitgestellten Informationen und nach einer ersten Prüfung seiner Unterlagen der Begünstigte: {beneficiary_name}, wohnhaft in {beneficiary_address} und ausgewiesen durch das Ausweisdokument Nr. {beneficiary_id_number}, ein Profil aufweist, das ihn für eine Finanzierungslösung qualifiziert.",
        eligibility_statement: "Der Finanzierungsbetrag, für den der Begünstigte als förderfähig erachtet wird, beläuft sich auf {amount}.",
        conditions: "Diese Bescheinigung ist für einen Zeitraum von 30 Tagen ab Ausstellungsdatum gültig, d.h. bis zum {validity_end_date}. Sie wird unter dem Vorbehalt der Überprüfung der Originaldokumente und des Ausbleibens wesentlicher Änderungen in der finanziellen Situation des Begünstigten ausgestellt.",
        conclusion: "Diese Bescheinigung stellt kein verbindliches Kreditangebot dar, sondern eine Bestätigung der theoretischen Finanzierungskapazität des Begünstigten. Die endgültige Gewährung der Finanzierung hängt von einer gründlichen Prüfung der Unterlagen und der Unterzeichnung eines ordnungsgemäßen Kreditvertrags ab.",
        analyst_title: "Leiter der Finanzanalyse",
    },
    es: {
        title: "Certificado de Elegibilidad para Financiación",
        department: "Departamento de Análisis de Crédito",
        location_and_date: "Hecho en Lyon, el {date}",
        reference: "Referencia: {ref}",
        importance: {
            title: "Importancia de este documento",
            description: "Este certificado es una validación preliminar de su capacidad de endeudamiento con nuestra institución. Le permite demostrar su seriedad y elegibilidad ante terceros (agentes inmobiliarios, vendedores, etc.) durante sus trámites, sin constituir una oferta de préstamo definitiva."
        },
        introduction: "Nosotros, los abajo firmantes, Vylsfond, certificamos por la presente que, basándonos en la información proporcionada y tras un análisis inicial de su expediente, el beneficiario: {beneficiary_name}, con domicilio en {beneficiary_address} e identificado con el documento de identidad n.º {beneficiary_id_number}, presenta un perfil que le permite ser elegible para una solución de financiación.",
        eligibility_statement: "El importe de financiación para el que se considera elegible al beneficiario asciende a {amount}.",
        conditions: "Este certificado es válido por un período de 30 días a partir de su fecha de emisión, es decir, hasta el {validity_end_date}. Se proporciona sujeto a la verificación de los documentos originales y a la ausencia de cambios significativos en la situación financiera del beneficiario.",
        conclusion: "Este certificado no constituye una oferta de préstamo en firme, sino una validación de la capacidad teórica de financiación del beneficiario. La concesión definitiva de la financiación sigue estando condicionada a un examen exhaustivo del expediente y a la firma de un contrato de préstamo formal.",
        analyst_title: "Director de Análisis Financiero",
    },
    pt: {
        title: "Certificado de Elegibilidade para Financiamento",
        department: "Departamento de Análise de Crédito",
        location_and_date: "Feito em Lyon, em {date}",
        reference: "Referência: {ref}",
        importance: {
            title: "Importância deste documento",
            description: "Este certificado é uma validação preliminar da sua capacidade de endividamento junto da nossa instituição. Permite-lhe provar a sua seriedade e elegibilidade perante terceiros (agentes imobiliários, vendedores, etc.) durante os seus procedimentos, sem constituir uma oferta de empréstimo definitiva."
        },
        introduction: "Nós, os abaixo assinados, Vylsfond, certificamos pelo presente que, com base nas informações fornecidas e após uma análise inicial do seu processo, o beneficiário: {beneficiary_name}, residente em {beneficiary_address} e identificado pelo documento de identidade n.º {beneficiary_id_number}, apresenta um perfil que o torna elegível para uma solução de financiamento.",
        eligibility_statement: "O montante de financiamento para o qual o beneficiário é considerado elegível é de {amount}.",
        conditions: "Este certificado é válido por um período de 30 dias a contar da data de emissão, ou seja, até {validity_end_date}. É fornecido sob reserva da verificação dos documentos originais e da ausência de alterações significativas na situação financeira do beneficiário.",
        conclusion: "Este certificado não constitui uma oferta de empréstimo firme, mas sim uma validação da capacidade teórica de financiamento do beneficiário. A concessão final do financiamento permanece condicionada a uma análise aprofundada do processo e à assinatura de um contrato de empréstimo formal.",
        analyst_title: "Diretor de Análise Financeira",
    },
    it: {
        title: "Certificato di Idoneità al Finanziamento",
        department: "Dipartimento Analisi del Credito",
        location_and_date: "Rilasciato a Lione, il {date}",
        reference: "Riferimento: {ref}",
        importance: {
            title: "Importanza di questo documento",
            description: "Questo certificato è una convalida preliminare della sua capacità di indebitamento presso la nostra istituzione. Le consente di dimostrare la sua serietà ed idoneità a terzi (agenti immobiliari, venditori, ecc.) durante le sue procedure, senza costituire un'offerta di prestito definitiva."
        },
        introduction: "Noi sottoscritti, Vylsfond, con la presente certifichiamo che, sulla base delle informazioni fornite e a seguito di un'analisi iniziale della sua pratica, il beneficiario: {beneficiary_name}, residente in {beneficiary_address} e identificato dal documento d'identità n.{beneficiary_id_number}, presenta un profilo che lo rende idoneo a una soluzione di finanziamento.",
        eligibility_statement: "L'importo del finanziamento per il quale il beneficiario è ritenuto idoneo ammonta a {amount}.",
        conditions: "Il presente certificato è valido per un periodo di 30 giorni dalla data di emissione, ovvero fino al {validity_end_date}. Viene fornito con riserva di verifica dei documenti originali e dell'assenza di variazioni significative della situazione finanziaria del beneficiario.",
        conclusion: "Il presente certificato non costituisce un'offerta di prestito vincolante, ma una convalida della capacità teorica di finanziamento del beneficiario. La concessione definitiva del finanziamento resta subordinata a un esame approfondito della pratica e alla firma di un contratto di prestito formale.",
        analyst_title: "Direttore dell'Analisi Finanziaria",
    }
}
