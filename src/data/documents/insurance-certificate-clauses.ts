
import type { Clauses } from "./languages";

export const insuranceCertificateClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Département des Assurances",
            line2: "Service des Adhésions • Unité de Certification des Garanties Emprunteur",
        },
        title: "Attestation d'Assurance Emprunteur",
        reference: "Certificat N°: {ref}",
        issue_date: "Date d'émission: {issue_date}",
        insured: {
            title: "L'Assuré :",
        },
        beneficiary: {
            title: "Le Bénéficiaire :",
            content: `L'organisme prêteur partenaire de ${companyName}, pour le compte du contrat de prêt N° {loan_contract_ref}.`,
        },
        object_title: "Objet : Attestation d'assurance groupe relative au prêt N° {loan_contract_ref}",
        object_content: `Nous soussignés, agissant pour le compte de notre partenaire assureur, certifions par la présente que l'assuré(e) susmentionné(e) est couvert(e) par le contrat d'assurance groupe n°789-456, souscrit par ${companyName} dans le cadre de son prêt.`,
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
        title: "Borrower's Insurance Certificate",
        reference: "Certificate No: {ref}",
        issue_date: "Issue Date: {issue_date}",
        insured: {
            title: "The Insured:",
        },
        beneficiary: {
            title: "The Beneficiary:",
            content: `The lending institution partner of ${companyName}, for loan contract No. {loan_contract_ref}.`,
        },
        object_title: "Subject: Group insurance certificate regarding loan No. {loan_contract_ref}",
        object_content: `We, the undersigned, acting on behalf of our insurance partner, hereby certify that the above-mentioned insured person is covered by the group insurance contract No. 789-456, underwritten by ${companyName} as part of their loan.`,
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
        title: "Kreditnehmer-Versicherungszertifikat",
        reference: "Zertifikat Nr.: {ref}",
        issue_date: "Ausstellungsdatum: {issue_date}",
        insured: {
            title: "Der Versicherte:",
        },
        beneficiary: {
            title: "Der Begünstigte:",
            content: `Die kreditgebende Institution, Partner von ${companyName}, für den Darlehensvertrag Nr. {loan_contract_ref}.`,
        },
        object_title: "Betreff: Gruppenversicherungszertifikat bezüglich Darlehen Nr. {loan_contract_ref}",
        object_content: `Wir, die Unterzeichner, handeln im Namen unseres Versicherungspartners und bescheinigen hiermit, dass die oben genannte versicherte Person durch den von ${companyName} im Rahmen ihres Darlehens abgeschlossenen Gruppenversicherungsvertrag Nr. 789-456 versichert ist.`,
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
    },
    lt: {
        header: {
            line1: "Draudimo departamentas",
            line2: "Narystės tarnyba • Paskolos gavėjo garantijų sertifikavimo skyrius",
        },
        title: "Paskolos gavėjo draudimo liudijimas",
        reference: "Liudijimo Nr.: {ref}",
        issue_date: "Išdavimo data: {issue_date}",
        insured: {
            title: "Apdraustasis:",
        },
        beneficiary: {
            title: "Naudos gavėjas:",
            content: `Paskolą teikianti institucija, ${companyName} partnerė, pagal paskolos sutartį Nr. {loan_contract_ref}.`,
        },
        object_title: "Tema: Grupinio draudimo liudijimas dėl paskolos Nr. {loan_contract_ref}",
        object_content: `Mes, žemiau pasirašiusieji, veikdami savo draudimo partnerio vardu, šiuo patvirtiname, kad aukščiau minėtas apdraustasis asmuo yra apdraustas pagal grupinio draudimo sutartį Nr. 789-456, kurią ${companyName} sudarė kaip dalį savo paskolos.`,
        loan_details: {
            title: "Apdraustos paskolos detalės",
            nature: "Paskolos pobūdis: {loan_type}",
            ref: "Susijusios paskolos numeris: {loan_contract_ref}",
            amount: "Apdraustojo kapitalo suma: {insured_capital}",
            duration: "Draudimo apsaugos trukmė: {coverage_duration} mėn., sutampanti su paskolos trukme.",
        },
        guarantees: {
            title: "Taikomos garantijos",
            intro: "Atsižvelgiant į draudimo sutarties informaciniame pranešime nurodytas sąlygas ir išimtis, apdraustasis asmuo gauna šias garantijas:",
            death: "Mirtis: likusio kapitalo išmokėjimas paskolą teikiančiai institucijai.",
            ptia: "Visiškas ir negrįžtamas savarankiškumo praradimas (PTIA): likusio kapitalo išmokėjimas paskolą teikiančiai institucijai.",
            itt: "Visiškas laikinasis nedarbingumas (ITT): paskolos įmokų padengimas po franšizės laikotarpio.",
        },
        premium: {
            title: "Draudimo kaina",
            content: "Mėnesinė draudimo įmoka: {monthly_premium} / mėn. Ši suma mokama kas mėnesį, papildomai prie jūsų paskolos įmokos.",
        },
        validity: {
            title: "Įsigaliojimo data ir galiojimas",
            content: "Šis liudijimas išduodamas tam, kad galiotų teisės aktuose numatyta tvarka. Garantijos įsigalioja paskolos lėšų išmokėjimo dieną ir nustoja galioti visiškai grąžinus paskolą.",
        }
    },
    nl: {
        header: {
            line1: "Verzekeringsafdeling",
            line2: "Lidmaatschapsservice • Eenheid voor Certificering van Kredietnemersgaranties",
        },
        title: "Verzekeringsattest voor Kredietnemer",
        reference: "Certificaat Nr: {ref}",
        issue_date: "Datum van afgifte: {issue_date}",
        insured: {
            title: "De Verzekerde:",
        },
        beneficiary: {
            title: "De Begunstigde:",
            content: `De kredietverstrekkende instelling, partner van ${companyName}, voor leningsovereenkomst nr. {loan_contract_ref}.`,
        },
        object_title: "Onderwerp: Groepsverzekeringsattest met betrekking tot lening nr. {loan_contract_ref}",
        object_content: `Wij, ondergetekenden, handelend namens onze verzekeringspartner, verklaren hierbij dat de bovengenoemde verzekerde gedekt is door de groepsverzekeringsovereenkomst nr. 789-456, afgesloten door ${companyName} in het kader van zijn lening.`,
        loan_details: {
            title: "Details van de verzekerde lening",
            nature: "Aard van de lening: {loan_type}",
            ref: "Bijbehorend leningnummer: {loan_contract_ref}",
            amount: "Verzekerd kapitaalbedrag: {insured_capital}",
            duration: "Duur van de verzekeringsdekking: {coverage_duration} maanden, samenvallend met de looptijd van de lening.",
        },
        guarantees: {
            title: "Toepasselijke garanties",
            intro: "Onder voorbehoud van de bepalingen, voorwaarden en uitsluitingen zoals vermeld in de informatienota van de verzekeringsovereenkomst, geniet de verzekerde de volgende garanties:",
            death: "Overlijden: Uitbetaling van het resterende verschuldigde kapitaal aan de kredietverstrekkende instelling.",
            ptia: "Volledig en onomkeerbaar verlies van autonomie (PTIA): Uitbetaling van het resterende verschuldigde kapitaal aan de kredietverstrekkende instelling.",
            itt: "Tijdelijke volledige arbeidsongeschiktheid (ITT): Dekking van de leningtermijnen na een eigenrisicoperiode.",
        },
        premium: {
            title: "Kosten van de verzekering",
            content: "Maandelijkse verzekeringspremie: {monthly_premium} / maand. Dit bedrag is maandelijks verschuldigd, bovenop uw leningtermijn.",
        },
        validity: {
            title: "Ingangsdatum en geldigheid",
            content: "Dit attest wordt opgesteld om te dienen en te gelden waar nodig. De garanties worden van kracht op de datum van vrijgave van de leningfondsen en eindigen bij de volledige terugbetaling ervan.",
        }
    }
});
