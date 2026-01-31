
import type { Clauses } from "./languages";

export const loanContractClauses = (companyCity: string): Clauses => ({
    fr: {
         header: {
            line1: "Vantex Bank",
            line2: "Département Crédits • Direction Générale",
        },
        title: "Contrat de Prêt",
        reference: "Contrat N°: PR-88210",
        location_and_date: ``,
        parties: {
            title: "Entre les soussignés :",
            lender_label: "Le Prêteur :",
            borrower_label: "L'Emprunteur :",
            read_and_approved: "Lu et approuvé",
        },
        articles: {
            object: {
                title: "Article 1 : Objet du Contrat",
                content: "Le Prêteur consent à l'Emprunteur, qui accepte, un prêt Prêt Personnel Amortissable amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières.",
            },
            characteristics: {
                title: "Article 2 : Montant et Caractéristiques du Prêt",
                amount: "Montant du capital prêté : {loan_amount} ({loan_amount_in_words}).",
                taeg: "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                term: "Durée totale du remboursement : {loan_term} mois.",
                availability: "Date de mise à disposition des fonds : Au plus tard {availability_days} jours après l'expiration du délai de rétractation.",
            },
            repayment: {
                title: "Article 3 : Modalités de Remboursement",
                intro: "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date}.",
                monthly_payment: "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                total_cost: "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                total_due: "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts + frais remboursés).",
            },
            withdrawal: {
                title: "Article 4 : Droit de Rétractation",
                content: "L'Emprunteur dispose d'un délai de rétractation de {withdrawal_days} jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.",
            },
            default: {
                title: "Article 5 : Défaut de Paiement",
                content: "En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur.",
            },
            early_repayment: {
                title: "Article 6 : Remboursement Anticipé",
                content: "L'Emprunteur a le droit, à tout moment, de rembourser par anticipation, en totalité ou en partie, le crédit qui lui a été consenti. Conformément à notre politique commerciale, aucune indemnité de remboursement anticipé ne sera exigée, quel que soit le montant. L'Emprunteur devra simplement notifier le Prêteur de son intention par écrit afin d'organiser les modalités pratiques du remboursement.",
            },
            data: {
                title: "Article 7 : Protection des Données Personnelles",
                content: "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur.",
            },
            law: {
                title: "Article 8 : Droit Applicable et Litiges",
                content: "Le présent contrat est soumis au droit allemand. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur.",
            },
            reimbursement: {
                title: "Article 9 : Remboursement des Frais",
                content: "Le Prêteur s'engage à rembourser à l'Emprunteur les frais avancés durant la procédure d'octroi du prêt, estimés à {reimbursed_fees}. Ce montant sera ajouté au capital versé à l'Emprunteur."
            }
        },
        signature_preamble: "",
    },
    en: {
        header: {
            line1: "Vantex Bank",
            line2: "Credit Department • General Management",
        },
        title: "Loan Agreement",
        reference: "Agreement No: {contract_ref}",
        location_and_date: `Issued in ${companyCity}, on {contract_date}`,
        parties: {
            title: "Between the undersigned:",
            lender_label: "The Lender:",
            borrower_label: "The Borrower:",
            read_and_approved: "Read and approved",
        },
        articles: {
            object: {
                title: "Article 1: Purpose of the Agreement",
                content: "The Lender grants to the Borrower, who accepts, a {type_of_loan} for non-professional use, governed by the provisions of the Consumer Code and by these general and special conditions.",
            },
            characteristics: {
                title: "Article 2: Loan Amount and Characteristics",
                amount: "Loan principal amount: {loan_amount} ({loan_amount_in_words}).",
                taeg: "Fixed Annual Percentage Rate (APR): {taeg}.",
                term: "Total repayment period: {loan_term} months.",
                availability: "Date of funds availability: No later than {availability_days} days after the withdrawal period expires.",
            },
            repayment: {
                title: "Article 3: Repayment Terms",
                intro: "The Borrower agrees to repay the principal and interest in {loan_term} constant monthly installments. The first installment will be on {start_date}.",
                monthly_payment: "Monthly payment (excluding insurance): {monthly_payment}. This amount will be debited on the 5th of each month.",
                total_cost: "The total cost of the credit (interest) amounts to {total_cost}.",
                total_due: "Total amount due: {total_due} (Borrowed capital + total interest cost + reimbursed fees).",
            },
            withdrawal: {
                title: "Article 4: Right of Withdrawal",
                content: "The Borrower has a withdrawal period of {withdrawal_days} calendar days from the date of signing the credit agreement offer. To withdraw, the Borrower must return the attached withdrawal form by registered letter with acknowledgment of receipt.",
            },
            default: {
                title: "Article 5: Default in Payment",
                content: "In the event of non-payment of an installment on its due date, the Lender may demand immediate repayment of the outstanding principal, plus accrued and unpaid interest. Late payment penalties may be applied in accordance with current legislation.",
            },
            early_repayment: {
                title: "Article 6: Early Repayment",
                content: "The Borrower has the right, at any time, to repay the credit granted to them in whole or in part, in advance. In accordance with our commercial policy, no early repayment penalty will be required, regardless of the amount. The Borrower must simply notify the Lender of their intention in writing to organize the practical arrangements for the repayment.",
            },
            data: {
                title: "Article 7: Personal Data Protection",
                content: "The information collected is necessary for processing the loan application. It is processed electronically and is intended for the services of the Lender and its partners. In accordance with the GDPR, the Borrower has the right to access, rectify, and delete their personal data by contacting the Lender.",
            },
            law: {
                title: "Article 8: Applicable Law and Disputes",
                content: "This agreement is subject to German law. In the event of a dispute, the parties agree to seek an amicable solution. Failing this, the competent court will be that of the Borrower's place of residence.",
            },
            reimbursement: {
                title: "Article 9: Fee Reimbursement",
                content: "The Lender agrees to reimburse the Borrower for the fees advanced during the loan approval process, estimated at {reimbursed_fees}. This amount will be added to the principal disbursed to the Borrower."
            }
        },
        signature_preamble: "",
    },
    de: {
        header: {
            line1: "Vantex Bank",
            line2: "Kreditabteilung • Geschäftsleitung",
        },
        title: "Darlehensvertrag",
        reference: "Vertrag Nr.: {contract_ref}",
        location_and_date: `Ausgestellt in ${companyCity}, am {contract_date}`,
        parties: {
            title: "Zwischen den Unterzeichnenden:",
            lender_label: "Der Darlehensgeber:",
            borrower_label: "Der Darlehensnehmer:",
            read_and_approved: "Gelesen und genehmigt",
        },
        articles: {
            object: {
                title: "Artikel 1: Vertragsgegenstand",
                content: "Der Darlehensgeber gewährt dem Darlehensnehmer, der annimmt, ein {type_of_loan} zur nicht-beruflichen Nutzung, das den Bestimmungen des Verbraucherschutzgesetzes und diesen allgemeinen und besonderen Bedingungen unterliegt.",
            },
            characteristics: {
                title: "Artikel 2: Betrag und Merkmale des Darlehens",
                amount: "Geliehener Kapitalbetrag: {loan_amount} ({loan_amount_in_words}).",
                taeg: "Fester effektiver Jahreszinssatz (TAEG): {taeg}.",
                term: "Gesamtrückzahlungsdauer: {loan_term} Monate.",
                availability: "Datum der Bereitstellung der Mittel: Spätestens {availability_days} Tage nach Ablauf der Widerrufsfrist.",
            },
            repayment: {
                title: "Artikel 3: Rückzahlungsmodalitäten",
                intro: "Der Darlehensnehmer verpflichtet sich, das Kapital und die Zinsen in {loan_term} konstanten Monatsraten zurückzuzahlen. Die erste Rate wird am {start_date} fällig.",
                monthly_payment: "Monatsrate (ohne Versicherung): {monthly_payment}. Dieser Betrag wird am 5. jedes Monats abgebucht.",
                total_cost: "Die Gesamtkosten des Kredits (Zinsen) belaufen sich auf {total_cost}.",
                total_due: "Geschuldeter Gesamtbetrag: {total_due} (Geliehenes Kapital + Gesamtkosten der Zinsen + erstattete Gebühren).",
            },
            withdrawal: {
                title: "Artikel 4: Widerrufsrecht",
                content: "Der Darlehensnehmer hat eine Widerrufsfrist von {withdrawal_days} Kalendertagen ab dem Datum der Unterzeichnung des Kreditvertragsangebots. Um zu widerrufen, muss der Darlehensnehmer das beigefügte Widerrufsformular per Einschreiben mit Rückschein zurücksenden.",
            },
            default: {
                title: "Artikel 5: Zahlungsverzug",
                content: "Bei Nichtzahlung einer Rate zum Fälligkeitsdatum kann der Darlehensgeber die sofortige Rückzahlung des ausstehenden Kapitals zuzüglich der fälligen und unbezahlten Zinsen verlangen. Verzugszinsen können gemäß der geltenden Gesetzgebung erhoben werden.",
            },
            early_repayment: {
                title: "Artikel 6: Vorzeitige Rückzahlung",
                content: "Der Darlehensnehmer hat jederzeit das Recht, den ihm gewährten Kredit ganz oder teilweise vorzeitig zurückzuzahlen. Gemäß unserer Geschäftspolitik wird keine Vorfälligkeitsentschädigung verlangt, unabhängig vom Betrag. Der Darlehensnehmer muss den Darlehensgeber lediglich schriftlich über seine Absicht informieren, um die praktischen Modalitäten der Rückzahlung zu organisieren.",
            },
            data: {
                title: "Artikel 7: Schutz personenbezogener Daten",
                content: "Die erhobenen Informationen sind für die Bearbeitung des Darlehensantrags erforderlich. Sie werden computergestützt verarbeitet und sind für die Abteilungen des Darlehensgebers und seiner Partner bestimmt. Gemäß der DSGVO hat der Darlehensnehmer ein Recht auf Zugang, Berichtigung und Löschung seiner personenbezogenen Daten, indem er den Darlehensgeber kontaktiert.",
            },
            law: {
                title: "Artikel 8: Anwendbares Recht und Streitigkeiten",
                content: "Dieser Vertrag unterliegt deutschem Recht. Im Streitfall verpflichten sich die Parteien, eine gütliche Lösung zu suchen. Andernfalls ist das zuständige Gericht das am Wohnsitz des Darlehensnehmers.",
            },
            reimbursement: {
                title: "Artikel 9: Kostenerstattung",
                content: "Der Darlehensgeber verpflichtet sich, dem Darlehensnehmer die während des Kreditgenehmigungsverfahrens verauslagten Kosten in Höhe von {reimbursed_fees} zu erstatten. Dieser Betrag wird dem an den Darlehensnehmer ausgezahlten Kapital hinzugefügt."
            }
        },
        signature_preamble: "",
    },
    lt: {
        // Lithuanian translations would go here
    },
    nl: {
        // Dutch translations would go here
    }
});
