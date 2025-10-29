
import type { Clauses } from "./languages";

export const debtRecognitionClauses: Clauses = {
    fr: {
        header: {
            line1: "Service Financier Européen",
            line2: "Département Juridique et des Garanties • Unité de Formalisation des Engagements",
        },
        title: "Reconnaissance de Dette pour un {type_of_loan}",
        reference: "Document N°: {ref}",
        date: "Date: {date}",
        parties: {
            title: "Entre les soussignés :",
            creditor_label: "Le Créancier :",
            debtor_label: "Le Débiteur :",
        },
        articles: {
            recognition: {
                title: "Article 1 : Reconnaissance de la Dette",
                content: "Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à Capfinfy, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un {type_of_loan} qui m'a été accordé et dont je confirme avoir reçu les fonds.",
            },
            repayment: {
                title: "Article 2 : Modalités de Remboursement",
                content: "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de {type_of_loan} N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier.",
            },
            default: {
                title: "Article 3 : Clause de Défaut",
                content: "En cas de non-paiement d'une ou plusieurs échéances, je reconnais que le Créancier pourra se prévaloir des clauses prévues dans le contrat de prêt, y compris l'exigibilité anticipée de la totalité du capital restant dû, majoré des intérêts et pénalités applicables.",
            },
            mention: {
                title: "Article 4 : Compréhension de l'Engagement",
                content: "L'article L. 313-24 du Code de la consommation stipule l'importance de l'engagement. Le débiteur reconnaît avoir lu et compris l'intégralité du contrat de prêt auquel cette reconnaissance de dette se rapporte et avoir reçu un exemplaire de chaque document.",
            }
        },
    },
    en: {
        header: {
            line1: "European Financial Service",
            line2: "Legal and Guarantees Department • Commitment Formalization Unit",
        },
        title: "Acknowledgment of Debt for a {type_of_loan}",
        reference: "Document No: {ref}",
        date: "Date: {date}",
        parties: {
            title: "Between the undersigned:",
            creditor_label: "The Creditor:",
            debtor_label: "The Debtor:",
        },
        articles: {
            recognition: {
                title: "Article 1: Acknowledgment of Debt",
                content: "I, the undersigned, {debtor_name}, residing at {debtor_address}, hereby acknowledge that I owe Capfinfy, acting on behalf of its financial partners, the sum of: {loan_amount} ({loan_amount_in_words}). This amount corresponds to the principal of a {type_of_loan} that has been granted to me and for which I confirm receipt of the funds.",
            },
            repayment: {
                title: "Article 2: Repayment Terms",
                content: "I undertake to repay this sum in full, along with the associated interest and fees, in accordance with the schedule and conditions defined in the {type_of_loan} contract No. {loan_contract_ref} which I have signed separately. The agreed repayment term is {loan_term} months, except in the case of early repayment or payment default altering the schedule.",
            },
            default: {
                title: "Article 3: Default Clause",
                content: "In the event of non-payment of one or more installments, I acknowledge that the Creditor may invoke the clauses provided for in the loan contract, including the early demand for the entire outstanding principal, plus applicable interest and penalties.",
            },
            mention: {
                title: "Article 4: Understanding of Commitment",
                content: "Article L. 313-24 of the Consumer Code stipulates the importance of the commitment. The debtor acknowledges having read and understood the entire loan contract to which this acknowledgment of debt relates and having received a copy of each document.",
            }
        },
    },
    de: {
        header: {
            line1: "Europäischer Finanzdienst",
            line2: "Rechts- und Garantieabteilung • Abteilung für die Formalisierung von Verpflichtungen",
        },
        title: "Schuldanerkenntnis für ein {type_of_loan}",
        reference: "Dokument Nr.: {ref}",
        date: "Datum: {date}",
        parties: {
            title: "Zwischen den Unterzeichnern:",
            creditor_label: "Der Gläubiger:",
            debtor_label: "Der Schuldner:",
        },
        articles: {
            recognition: {
                title: "Artikel 1: Schuldanerkenntnis",
                content: "Ich, der/die Unterzeichnende, {debtor_name}, wohnhaft in {debtor_address}, erkenne hiermit an, Capfinfy, handelnd im Namen seiner Finanzpartner, die Summe von: {loan_amount} ({loan_amount_in_words}) zu schulden. Dieser Betrag entspricht dem Kapital eines {type_of_loan}, das mir gewährt wurde und dessen Erhalt ich bestätige.",
            },
            repayment: {
                title: "Artikel 2: Rückzahlungsmodalitäten",
                content: "Ich verpflichte mich, diesen Betrag vollständig zurückzuzahlen, zusammen mit den damit verbundenen Zinsen und Gebühren, gemäß dem Zeitplan und den Bedingungen, die im {type_of_loan}-Vertrag Nr. {loan_contract_ref}, den ich separat unterzeichnet habe, festgelegt sind. Die vereinbarte Rückzahlungsfrist beträgt {loan_term} Monate, außer im Falle einer vorzeitigen Rückzahlung oder eines Zahlungsverzugs, der den Zeitplan ändert.",
            },
            default: {
                title: "Artikel 3: Verzugsklausel",
                content: "Im Falle der Nichtzahlung einer oder mehrerer Raten erkenne ich an, dass der Gläubiger die im Darlehensvertrag vorgesehenen Klauseln geltend machen kann, einschließlich der sofortigen Fälligstellung des gesamten ausstehenden Kapitals zuzüglich anfallender Zinsen und Strafen.",
            },
            mention: {
                title: "Artikel 4: Verständnis der Verpflichtung",
                content: "Artikel L. 313-24 des Verbrauchergesetzbuches unterstreicht die Bedeutung der Verpflichtung. Der Schuldner bestätigt, den gesamten Darlehensvertrag, auf den sich dieses Schuldanerkenntnis bezieht, gelesen und verstanden zu haben und eine Kopie jedes Dokuments erhalten zu haben.",
            }
        },
    }
};
