
import type { Clauses } from "./languages";

export const insuranceCertificateClauses: Clauses = {
    fr: {
        header: {
            line1: "Département des Assurances",
            line2: "Service des Adhésions • Unité de Certification des Garanties Emprunteur",
        },
        title: "Attestation d'Assurance Emprunteur pour un {loan_type}",
        reference: "Certificat N°: {ref}",
        issue_date: "Date d'émission: {issue_date}",
        insured: {
            title: "L'Assuré :",
        },
        beneficiary: {
            title: "Le Bénéficiaire :",
            content: "L'organisme prêteur partenaire de Capfinfy, pour le compte du contrat de prêt N° {loan_contract_ref}.",
        },
        object_title: "Objet : Attestation d'assurance groupe pour un {loan_type}",
        object_content: "Nous soussignés, agissant pour le compte de notre partenaire assureur, certifions par la présente que l'assuré(e) susmentionné(e) est couvert(e) par le contrat d'assurance groupe n°789-456, souscrit par Capfinfy dans le cadre de son prêt.",
        loan_details: {
            title: "Détails du prêt assuré",
            nature: "Nature du prêt : {loan_type}",
            ref: "Numéro du prêt associé : {loan_contract_ref}",
            amount: "Montant du capital assuré : {insured_capital}",
            duration: "Durée de la couverture d'assurance : {coverage_duration} mois, coïncidant avec la durée du prêt.",
        },
        guarantees: {
            title: "Garanties applicables",
            intro: "Sous réserve des termes, conditions et exclusions stipulées dans la notice d'information du contrat d'assurance, l'assuré(e) bénéficie des garanties suivantes :",
            death: "Décès : Versement du capital restant dû à l'organisme prêteur.",
            ptia: "Perte Totale et Irréversible d'Autonomie (PTIA) : Versement du capital restant dû à l'organisme prêteur.",
            itt: "Incapacité Temporaire Totale de Travail (ITT) : Prise en charge des échéances du prêt après une période de franchise.",
        },
        premium: {
            title: "Coût de l'Assurance",
            content: "Prime d'assurance mensuelle : {monthly_premium} / mois. Ce montant est payable mensuellement, en supplément de votre échéance de prêt.",
        },
        validity: {
            title: "Date d'effet et Validité",
            content: "La présente attestation est établie pour faire valoir ce que de droit. Les garanties prendront effet à la date du déblocage des fonds du prêt et cesseront au terme du remboursement complet de celui-ci.",
        }
    },
    en: {
        header: {
            line1: "Insurance Department",
            line2: "Membership Service • Borrower Guarantee Certification Unit",
        },
        title: "Borrower's Insurance Certificate for a {loan_type}",
        reference: "Certificate No: {ref}",
        issue_date: "Issue Date: {issue_date}",
        insured: {
            title: "The Insured:",
        },
        beneficiary: {
            title: "The Beneficiary:",
            content: "The lending institution partner of Capfinfy, for loan contract No. {loan_contract_ref}.",
        },
        object_title: "Subject: Group insurance certificate for a {loan_type}",
        object_content: "We, the undersigned, acting on behalf of our insurance partner, hereby certify that the above-mentioned insured person is covered by the group insurance contract No. 789-456, underwritten by Capfinfy as part of their loan.",
        loan_details: {
            title: "Details of the Insured Loan",
            nature: "Type of loan: {loan_type}",
            ref: "Associated loan number: {loan_contract_ref}",
            amount: "Amount of insured capital: {insured_capital}",
            duration: "Duration of insurance coverage: {coverage_duration} months, coinciding with the loan term.",
        },
        guarantees: {
            title: "Applicable Guarantees",
            intro: "Subject to the terms, conditions, and exclusions stipulated in the insurance contract information notice, the insured person benefits from the following guarantees:",
            death: "Death: Payment of the outstanding capital to the lending institution.",
            ptia: "Total and Irreversible Loss of Autonomy (PTIA): Payment of the outstanding capital to the lending institution.",
            itt: "Total Temporary Incapacity for Work (ITT): Coverage of loan installments after a deductible period.",
        },
        premium: {
            title: "Cost of Insurance",
            content: "Monthly insurance premium: {monthly_premium} / month. This amount is payable monthly, in addition to your loan installment.",
        },
        validity: {
            title: "Effective Date and Validity",
            content: "This certificate is issued to serve as legal proof. The guarantees will take effect on the date the loan funds are disbursed and will cease upon full repayment of the loan.",
        }
    },
    de: {
        header: {
            line1: "Versicherungsabteilung",
            line2: "Mitgliederservice • Abteilung für die Zertifizierung von Kreditnehmergarantien",
        },
        title: "Kreditnehmer-Versicherungszertifikat für ein {loan_type}",
        reference: "Zertifikat Nr.: {ref}",
        issue_date: "Ausstellungsdatum: {issue_date}",
        insured: {
            title: "Der Versicherte:",
        },
        beneficiary: {
            title: "Der Begünstigte:",
            content: "Die kreditgebende Institution, Partner von Capfinfy, für den Darlehensvertrag Nr. {loan_contract_ref}.",
        },
        object_title: "Betreff: Gruppenversicherungszertifikat für ein {loan_type}",
        object_content: "Wir, die Unterzeichner, handeln im Namen unseres Versicherungspartners und bescheinigen hiermit, dass die oben genannte versicherte Person durch den von Capfinfy im Rahmen ihres Darlehens abgeschlossenen Gruppenversicherungsvertrag Nr. 789-456 versichert ist.",
        loan_details: {
            title: "Details des versicherten Darlehens",
            nature: "Art des Darlehens: {loan_type}",
            ref: "Zugehörige Darlehensnummer: {loan_contract_ref}",
            amount: "Versicherte Kapitalsumme: {insured_capital}",
            duration: "Dauer des Versicherungsschutzes: {coverage_duration} Monate, übereinstimmend mit der Darlehenslaufzeit.",
        },
        guarantees: {
            title: "Anwendbare Garantien",
            intro: "Vorbehaltlich der in der Informationsbroschüre des Versicherungsvertrags festgelegten Bedingungen und Ausschlüsse profitiert die versicherte Person von den folgenden Garantien:",
            death: "Tod: Zahlung des Restkapitals an das kreditgebende Institut.",
            ptia: "Vollständiger und unwiderruflicher Autonomieverlust (PTIA): Zahlung des Restkapitals an das kreditgebende Institut.",
            itt: "Vollständige vorübergehende Arbeitsunfähigkeit (ITT): Übernahme der Darlehensraten nach einer Karenzzeit.",
        },
        premium: {
            title: "Versicherungskosten",
            content: "Monatliche Versicherungsprämie: {monthly_premium} / Monat. Dieser Betrag ist monatlich zusätzlich zu Ihrer Darlehensrate zu zahlen.",
        },
        validity: {
            title: "Gültigkeitsdatum und Wirksamkeit",
            content: "Dieses Zertifikat wird ausgestellt, um als Rechtsnachweis zu dienen. Die Garantien treten am Tag der Auszahlung der Darlehensmittel in Kraft und enden mit der vollständigen Rückzahlung des Darlehens.",
        }
    }
};
