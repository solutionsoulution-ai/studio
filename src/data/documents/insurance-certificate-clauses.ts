
import type { Clauses } from "./languages";

export const insuranceCertificateClauses: Clauses = {
    fr: {
        title: "Attestation d'Assurance Emprunteur",
        department: "Vylsfond Assurance",
        reference: "N° d'attestation : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Cette attestation est le document officiel qui prouve que votre prêt est couvert par une assurance. Elle est exigée par l'organisme prêteur et vous protège, ainsi que vos proches, contre certains aléas de la vie (décès, invalidité) en garantissant le remboursement du capital restant dû."
        },
        introduction: "Vylsfond Assurance atteste par la présente que l'assuré désigné ci-dessous est couvert par le contrat d'assurance groupe n°789-101112, souscrit par Vylsfond, pour le prêt décrit ci-après.",
        insured_label: "Assuré(e)",
        beneficiary_label: "Bénéficiaire du capital garanti",
        loan_id_label: "N° du contrat de prêt concerné",
        capital_label: "Capital initialement assuré",
        premium_label: "Prime mensuelle d'assurance",
        effective_date_label: "Date d'effet de l'assurance",
        end_date_label: "Date de fin de l'assurance",
        per_month: "mois",
        coverage_summary: "Résumé des Garanties Couvertes",
        guarantees: {
            death: {
                title: "Décès",
                description: "Remboursement du capital restant dû à l'organisme prêteur."
            },
            disability: {
                title: "Perte Totale et Irréversible d'Autonomie (PTIA)",
                description: "Remboursement du capital restant dû."
            },
            incapacity: {
                title: "Incapacité Temporaire Totale de travail (ITT)",
                description: "Prise en charge des échéances du prêt après une franchise de 90 jours."
            },
        },
        notice_reference: "Pour le détail des garanties, exclusions et modalités, veuillez vous référer à la notice d'information du contrat.",
        conclusion: "La présente attestation est délivrée pour faire valoir ce que de droit auprès de l'organisme prêteur. Fait à Lyon, le {signature_date}.",
        director_title: "Directrice des Assurances"
    },
    en: {
        title: "Borrower's Insurance Certificate",
        department: "Vylsfond Insurance",
        reference: "Certificate No: {ref}",
        importance: {
            title: "Importance of this document",
            description: "This certificate is the official document proving that your loan is covered by insurance. It is required by the lending institution and protects you and your loved ones against certain life events (death, disability) by guaranteeing the repayment of the outstanding capital."
        },
        introduction: "Vylsfond Insurance hereby certifies that the insured person named below is covered by the group insurance contract No. 789-101112, subscribed by Vylsfond, for the loan described below.",
        insured_label: "Insured Person",
        beneficiary_label: "Beneficiary of the guaranteed capital",
        loan_id_label: "Related loan contract No.",
        capital_label: "Initially insured capital",
        premium_label: "Monthly insurance premium",
        effective_date_label: "Insurance effective date",
        end_date_label: "Insurance end date",
        per_month: "month",
        coverage_summary: "Summary of Covered Guarantees",
        guarantees: {
            death: {
                title: "Death",
                description: "Repayment of the outstanding capital to the lending institution."
            },
            disability: {
                title: "Total and Irreversible Loss of Autonomy (PTIA)",
                description: "Repayment of the outstanding capital."
            },
            incapacity: {
                title: "Total Temporary Incapacity for work (ITT)",
                description: "Coverage of loan installments after a 90-day waiting period."
            },
        },
        notice_reference: "For details of guarantees, exclusions, and terms, please refer to the contract's information notice.",
        conclusion: "This certificate is issued to be asserted as appropriate with the lending institution. Done in Lyon, on {signature_date}.",
        director_title: "Director of Insurance"
    },
    de: {
        title: "Kreditnehmer-Versicherungsbescheinigung",
        department: "Vylsfond Versicherung",
        reference: "Bescheinigungs-Nr.: {ref}",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Diese Bescheinigung ist das offizielle Dokument, das nachweist, dass Ihr Darlehen versichert ist. Sie wird von der kreditgebenden Institution verlangt und schützt Sie und Ihre Angehörigen vor bestimmten Lebensereignissen (Tod, Invalidität), indem sie die Rückzahlung des ausstehenden Kapitals garantiert."
        },
        introduction: "Vylsfond Versicherung bescheinigt hiermit, dass die unten genannte versicherte Person durch den von Vylsfond unterzeichneten Gruppenversicherungsvertrag Nr. 789-101112 für das unten beschriebene Darlehen gedeckt ist.",
        insured_label: "Versicherte Person",
        beneficiary_label: "Begünstigter des garantierten Kapitals",
        loan_id_label: "Zugehörige Darlehensvertrags-Nr.",
        capital_label: "Ursprünglich versichertes Kapital",
        premium_label: "Monatliche Versicherungsprämie",
        effective_date_label: "Beginn des Versicherungsschutzes",
        end_date_label: "Ende des Versicherungsschutzes",
        per_month: "Monat",
        coverage_summary: "Zusammenfassung der versicherten Garantien",
        guarantees: {
            death: {
                title: "Tod",
                description: "Rückzahlung des ausstehenden Kapitals an die kreditgebende Institution."
            },
            disability: {
                title: "Totaler und irreversibler Autonomieverlust (PTIA)",
                description: "Rückzahlung des ausstehenden Kapitals."
            },
            incapacity: {
                title: "Vollständige vorübergehende Arbeitsunfähigkeit (ITT)",
                description: "Übernahme der Darlehensraten nach einer Wartezeit von 90 Tagen."
            },
        },
        notice_reference: "Einzelheiten zu Garantien, Ausschlüssen und Bedingungen entnehmen Sie bitte dem Informationsblatt des Vertrags.",
        conclusion: "Diese Bescheinigung wird ausgestellt, um bei der kreditgebenden Institution entsprechend geltend gemacht zu werden. Ausgestellt in Lyon, am {signature_date}.",
        director_title: "Versicherungsdirektorin"
    },
    es: {
        title: "Certificado de Seguro de Prestatario",
        department: "Vylsfond Seguros",
        reference: "Nº de certificado: {ref}",
        importance: {
            title: "Importancia de este documento",
            description: "Este certificado es el documento oficial que demuestra que su préstamo está cubierto por un seguro. Es requerido por la entidad prestamista y le protege a usted y a sus seres queridos contra ciertos eventos de la vida (fallecimiento, invalidez), garantizando la devolución del capital pendiente."
        },
        introduction: "Vylsfond Seguros certifica por la presente que el asegurado abajo mencionado está cubierto por el contrato de seguro colectivo Nº 789-101112, suscrito por Vylsfond, para el préstamo que se describe a continuación.",
        insured_label: "Asegurado(a)",
        beneficiary_label: "Beneficiario del capital garantizado",
        loan_id_label: "Nº de contrato de préstamo relacionado",
        capital_label: "Capital inicialmente asegurado",
        premium_label: "Prima mensual del seguro",
        effective_date_label: "Fecha de efecto del seguro",
        end_date_label: "Fecha de finalización del seguro",
        per_month: "mes",
        coverage_summary: "Resumen de las Garantías Cubiertas",
        guarantees: {
            death: {
                title: "Fallecimiento",
                description: "Reembolso del capital pendiente a la entidad prestamista."
            },
            disability: {
                title: "Pérdida Total e Irreversible de Autonomía (PTIA)",
                description: "Reembolso del capital pendiente."
            },
            incapacity: {
                title: "Incapacidad Temporal Total para el trabajo (ITT)",
                description: "Cobertura de las cuotas del préstamo tras un período de carencia de 90 días."
            },
        },
        notice_reference: "Para detalles sobre garantías, exclusiones y términos, consulte la nota informativa del contrato.",
        conclusion: "Este certificado se emite para ser presentado ante la entidad prestamista. Hecho en Lyon, el {signature_date}.",
        director_title: "Directora de Seguros"
    },
    pt: {
        title: "Certificado de Seguro do Mutuário",
        department: "Vylsfond Seguros",
        reference: "Nº do certificado: {ref}",
        importance: {
            title: "Importância deste documento",
            description: "Este certificado é o documento oficial que comprova que o seu empréstimo está coberto por um seguro. É exigido pela instituição de crédito e protege-o a si e aos seus entes queridos contra certos eventos da vida (morte, invalidez), garantindo o reembolso do capital em dívida."
        },
        introduction: "A Vylsfond Seguros certifica pelo presente que o segurado abaixo nomeado está coberto pelo contrato de seguro de grupo n.º 789-101112, subscrito pela Vylsfond, para o empréstimo descrito abaixo.",
        insured_label: "Pessoa Segura",
        beneficiary_label: "Beneficiário do capital garantido",
        loan_id_label: "Nº do contrato de empréstimo relacionado",
        capital_label: "Capital inicialmente segurado",
        premium_label: "Prémio mensal do seguro",
        effective_date_label: "Data de início do seguro",
        end_date_label: "Data de fim do seguro",
        per_month: "mês",
        coverage_summary: "Resumo das Garantias Cobertas",
        guarantees: {
            death: {
                title: "Morte",
                description: "Reembolso do capital em dívida à instituição de crédito."
            },
            disability: {
                title: "Perda Total e Irreversível de Autonomia (PTIA)",
                description: "Reembolso do capital em dívida."
            },
            incapacity: {
                title: "Incapacidade Temporária Total para o trabalho (ITT)",
                description: "Cobertura das prestações do empréstimo após um período de carência de 90 dias."
            },
        },
        notice_reference: "Para detalhes sobre garantias, exclusões e termos, por favor, consulte a nota informativa do contrato.",
        conclusion: "Este certificado é emitido para ser apresentado junto da instituição de crédito. Feito em Lyon, em {signature_date}.",
        director_title: "Diretora de Seguros"
    },
    it: {
        title: "Certificato di Assicurazione del Mutuatario",
        department: "Vylsfond Assicurazioni",
        reference: "N. certificato: {ref}",
        importance: {
            title: "Importanza di questo documento",
            description: "Questo certificato è il documento ufficiale che attesta la copertura assicurativa del suo prestito. È richiesto dall'istituto di credito e protegge lei e i suoi cari da determinati eventi della vita (decesso, invalidità), garantendo il rimborso del capitale residuo."
        },
        introduction: "Vylsfond Assicurazioni certifica con la presente che l'assicurato sotto indicato è coperto dal contratto di assicurazione collettiva n. 789-101112, sottoscritto da Vylsfond, per il prestito di seguito descritto.",
        insured_label: "Assicurato/a",
        beneficiary_label: "Beneficiario del capitale garantito",
        loan_id_label: "N. del contratto di prestito collegato",
        capital_label: "Capitale inizialmente assicurato",
        premium_label: "Premio assicurativo mensile",
        effective_date_label: "Data di decorrenza dell'assicurazione",
        end_date_label: "Data di scadenza dell'assicurazione",
        per_month: "mese",
        coverage_summary: "Riepilogo delle Garanzie Coperte",
        guarantees: {
            death: {
                title: "Decesso",
                description: "Rimborso del capitale residuo all'istituto di credito."
            },
            disability: {
                title: "Perdita Totale e Irreversibile dell'Autonomia (PTIA)",
                description: "Rimborso del capitale residuo."
            },
            incapacity: {
                title: "Inabilità Temporanea Totale al lavoro (ITT)",
                description: "Copertura delle rate del prestito dopo un periodo di franchigia di 90 giorni."
            },
        },
        notice_reference: "Per i dettagli sulle garanzie, esclusioni e termini, si prega di fare riferimento alla nota informativa del contratto.",
        conclusion: "Il presente certificato viene rilasciato per essere fatto valere presso l'istituto di credito. Rilasciato a Lione, il {signature_date}.",
        director_title: "Direttrice delle Assicurazioni"
    }
}
