
import type { Clauses } from "./languages";

export const loanContractClauses = (companyCity: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Financier",
            line2: "Département des crédits à la consommation • Bureau des Accords de Prêt • Unité de Vérification des Engagements",
        },
        title: "Contrat de Prêt",
        reference: "Contrat N°: {contract_ref}",
        location_and_date: `Fait à ${companyCity}, le {contract_date}`,
        parties: {
            title: "Entre les soussignés :",
            lender_label: "Le Prêteur :",
            borrower_label: "L'Emprunteur :",
            read_and_approved: "Lu et approuvé",
        },
        articles: {
            object: {
                title: "Article 1 : Objet du Contrat",
                content: "Le Prêteur consent à l'Emprunteur, qui accepte, un {type_of_loan} amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières.",
            },
            characteristics: {
                title: "Article 2 : Montant et Caractéristiques du Prêt",
                amount: "Montant du capital prêté : {loan_amount} ({loan_amount_in_words} euros).",
                taeg: "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                term: "Durée totale du remboursement : {loan_term} mois.",
                availability: "Date de mise à disposition des fonds : Au plus tard 10 jours après l'expiration du délai de rétractation.",
            },
            repayment: {
                title: "Article 3 : Modalités de Remboursement",
                intro: "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date} et la dernière le {end_date}.",
                monthly_payment: "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                total_cost: "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                total_due: "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts).",
            },
            withdrawal: {
                title: "Article 4 : Droit de Rétractation",
                content: "L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.",
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
                content: "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur à l'adresse {contact_email}.",
            },
            law: {
                title: "Article 8 : Droit Applicable et Litiges",
                content: "Le présent contrat est soumis au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur.",
            },
        },
        signature_preamble: "Fait en deux exemplaires originaux, dont un pour chaque partie.",
    },
    vantex: {
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
                amount: "Montant du capital prêté : 15000 € (15 mille euros).",
                taeg: "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : 4.5%.",
                term: "Durée totale du remboursement : 48 mois.",
                availability: "Date de mise à disposition des fonds : Au plus tard 10 jours après l'expiration du délai de rétractation.",
            },
            repayment: {
                title: "Article 3 : Modalités de Remboursement",
                intro: "L'Emprunteur s'engage à rembourser le capital et les intérêts en mensualités constantes. La première échéance interviendra le 2024-03-05.",
                monthly_payment: "Mensualité (hors assurance) : 342.05 €. Ce montant sera prélevé le 5 de chaque mois.",
                total_cost: "Le coût total du crédit (intérêts) s'élève à 1418.51 €.",
                total_due: "Montant total dû : 16418.51 € (Capital emprunté + coût total des intérêts).",
            },
            withdrawal: {
                title: "Article 4 : Droit de Rétractation",
                content: "L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.",
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
        },
        signature_preamble: "",
    },
    en: {
        // English translations would go here
    },
    de: {
        header: {
            line1: "Finanzdienstleister",
            line2: "Abteilung für Verbraucherkredite • Büro für Darlehensvereinbarungen • Abteilung für die Überprüfung von Verpflichtungen",
        },
        title: "Darlehensvertrag",
        reference: "Vertrag Nr.: {contract_ref}",
        location_and_date: `Ausgestellt in ${companyCity}, am {contract_date}`,
        parties: {
            title: "Zwischen den Unterzeichnern:",
            lender_label: "Der Darlehensgeber:",
            borrower_label: "Der Darlehensnehmer:",
            read_and_approved: "Gelesen und genehmigt",
        },
        articles: {
            object: {
                title: "Artikel 1: Vertragsgegenstand",
                content: "Der Darlehensgeber gewährt dem Darlehensnehmer, der dies annimmt, ein Tilgungsdarlehen des Typs {type_of_loan} für den nicht-gewerblichen Gebrauch, das den Bestimmungen des Verbrauchergesetzbuches sowie den vorliegenden allgemeinen und besonderen Bedingungen unterliegt.",
            },
            characteristics: {
                title: "Artikel 2: Betrag und Merkmale des Darlehens",
                amount: "Geliehener Kapitalbetrag: {loan_amount} ({loan_amount_in_words} Euro).",
                taeg: "Fester effektiver Jahreszins (TAEG): {taeg}.",
                term: "Gesamte Rückzahlungsdauer: {loan_term} Monate.",
                availability: "Datum der Mittelbereitstellung: Spätestens 10 Tage nach Ablauf der Widerrufsfrist.",
            },
            repayment: {
                title: "Artikel 3: Rückzahlungsmodalitäten",
                intro: "Der Darlehensnehmer verpflichtet sich, das Kapital und die Zinsen in {loan_term} konstanten Monatsraten zurückzuzahlen. Die erste Rate ist am {start_date} fällig und die letzte am {end_date}.",
                monthly_payment: "Monatliche Rate (ohne Versicherung): {monthly_payment}. Dieser Betrag wird am 5. eines jeden Monats abgebucht.",
                total_cost: "Die Gesamtkosten des Kredits (Zinsen) belaufen sich auf {total_cost}.",
                total_due: "Gesamter geschuldeter Betrag: {total_due} (Geliehenes Kapital + Gesamtkosten der Zinsen).",
            },
            withdrawal: {
                title: "Artikel 4: Widerrufsrecht",
                content: "Der Darlehensnehmer hat eine Widerrufsfrist von vierzehn (14) Kalendertagen ab dem Datum der Unterzeichnung des Kreditvertragsangebots. Um zu widerrufen, muss der Darlehensnehmer das dem Angebot beigefügte Widerrufsformular per Einschreiben mit Rückschein zurücksenden.",
            },
            default: {
                title: "Artikel 5: Zahlungsverzug",
                content: "Bei Nichtzahlung einer Rate zum Fälligkeitsdatum kann der Darlehensgeber die sofortige Rückzahlung des ausstehenden Kapitals zuzüglich der fälligen und unbezahlten Zinsen verlangen. Verzugsstrafen können gemäß der geltenden Gesetzgebung erhoben werden.",
            },
            early_repayment: {
                title: "Artikel 6: Vorzeitige Rückzahlung",
                content: "Der Darlehensnehmer hat das Recht, den ihm gewährten Kredit jederzeit ganz oder teilweise vorzeitig zurückzuzahlen. Gemäß unserer Geschäftspolitik wird keine Vorfälligkeitsentschädigung erhoben, unabhängig von der Höhe des Betrags. Der Darlehensnehmer muss den Darlehensgeber lediglich schriftlich über seine Absicht informieren, um die praktischen Modalitäten der Rückzahlung zu regeln.",
            },
            data: {
                title: "Artikel 7: Schutz personenbezogener Daten",
                content: "Die erhobenen Informationen sind für die Bearbeitung des Darlehensantrags erforderlich. Sie werden elektronisch verarbeitet und sind für die Abteilungen des Darlehensgebers und seiner Partner bestimmt. Gemäß der DSGVO hat der Darlehensnehmer das Recht auf Zugang, Berichtigung und Löschung seiner personenbezogenen Daten, indem er den Darlehensgeber unter der Adresse {contact_email} kontaktiert.",
            },
            law: {
                title: "Artikel 8: Anwendbares Recht und Streitigkeiten",
                content: "Dieser Vertrag unterliegt dem deutschen Recht. Im Falle eines Rechtsstreits verpflichten sich die Parteien, eine gütliche Einigung zu suchen. Andernfalls ist das zuständige Gericht das am Wohnsitz des Darlehensnehmers.",
            },
        },
        signature_preamble: "Ausgefertigt in zwei Originalexemplaren, eines für jede Partei.",
    },
    lt: {
        header: {
            line1: "Finansų tarnyba",
            line2: "Vartojimo kreditų departamentas • Paskolų sutarčių biuras • Įsipareigojimų patikros skyrius",
        },
        title: "Paskolos sutartis",
        reference: "Sutarties Nr.: {contract_ref}",
        location_and_date: `Sudaryta ${companyCity}, {contract_date}`,
        parties: {
            title: "Tarp pasirašiusiųjų:",
            lender_label: "Paskolos davėjas:",
            borrower_label: "Paskolos gavėjas:",
            read_and_approved: "Perskaityta ir patvirtinta",
        },
        articles: {
            object: {
                title: "1 straipsnis: Sutarties objektas",
                content: "Paskolos davėjas suteikia Paskolos gavėjui, o šis priima, {type_of_loan} tipo amortizuojamąją paskolą neprofesiniam naudojimui, kuriai taikomos Vartojimo kodekso nuostatos ir šios bendrosios bei specialiosios sąlygos.",
            },
            characteristics: {
                title: "2 straipsnis: Paskolos suma ir charakteristikos",
                amount: "Paskolinto kapitalo suma: {loan_amount} ({loan_amount_in_words} eurų).",
                taeg: "Fiksuota metinė bendra palūkanų norma (BVKKMN): {taeg}.",
                term: "Bendra grąžinimo trukmė: {loan_term} mėnesių.",
                availability: "Lėšų suteikimo data: Ne vėliau kaip per 10 dienų nuo atsisakymo teisės termino pabaigos.",
            },
            repayment: {
                title: "3 straipsnis: Grąžinimo sąlygos",
                intro: "Paskolos gavėjas įsipareigoja grąžinti kapitalą ir palūkanas per {loan_term} pastovių mėnesinių įmokų. Pirmoji įmoka mokama {start_date}, o paskutinė – {end_date}.",
                monthly_payment: "Mėnesinė įmoka (be draudimo): {monthly_payment}. Ši suma bus nuskaičiuojama kiekvieno mėnesio 5 dieną.",
                total_cost: "Bendra kredito kaina (palūkanos) sudaro {total_cost}.",
                total_due: "Bendra mokėtina suma: {total_due} (Paskolintas kapitalas + bendra palūkanų kaina).",
            },
            withdrawal: {
                title: "4 straipsnis: Atsisakymo teisė",
                content: "Paskolos gavėjas turi keturiolikos (14) kalendorinių dienų atsisakymo teisę nuo kredito sutarties pasiūlymo pasirašymo dienos. Norėdamas atsisakyti, Paskolos gavėjas turi išsiųsti pasiūlyme pridėtą atsisakymo formą registruotu laišku su gavimo patvirtinimu.",
            },
            default: {
                title: "5 straipsnis: Mokėjimo nevykdymas",
                content: "Nesumokėjus įmokos nustatytu laiku, Paskolos davėjas gali reikalauti nedelsiant grąžinti likusį kapitalą, padidintą pradelstomis ir nesumokėtomis palūkanomis. Gali būti taikomos delspinigiai pagal galiojančius teisės aktus.",
            },
            early_repayment: {
                title: "6 straipsnis: Išankstinis grąžinimas",
                content: "Paskolos gavėjas turi teisę bet kada iš anksto grąžinti visą ar dalį jam suteikto kredito. Pagal mūsų komercinę politiką, jokia išankstinio grąžinimo kompensacija nebus reikalaujama, nepriklausomai nuo sumos. Paskolos gavėjas tiesiog turės raštu pranešti Paskolos davėjui apie savo ketinimą, kad būtų galima suorganizuoti praktines grąžinimo sąlygas.",
            },
            data: {
                title: "7 straipsnis: Asmens duomenų apsauga",
                content: "Surinkta informacija yra būtina paskolos paraiškai apdoroti. Ji apdorojama kompiuteriu ir skirta Paskolos davėjo bei jo partnerių tarnyboms. Pagal BDAR, Paskolos gavėjas turi teisę susipažinti su savo asmens duomenimis, juos ištaisyti ir ištrinti, susisiekęs su Paskolos davėju el. pašto adresu {contact_email}.",
            },
            law: {
                title: "8 straipsnis: Taikoma teisė ir ginčai",
                content: "Šiai sutarčiai taikoma Prancūzijos teisė. Ginčo atveju šalys įsipareigoja ieškoti taikaus sprendimo. Priešingu atveju kompetentingas teismas bus Paskolos gavėjo gyvenamosios vietos teismas.",
            },
        },
        signature_preamble: "Sudaryta dviem originaliais egzemplioriais, po vieną kiekvienai šaliai.",
    },
    nl: {
        header: {
            line1: "Financiële Dienst",
            line2: "Afdeling Consumentenkrediet • Bureau voor Leningsovereenkomsten • Eenheid voor Verificatie van Verbintenissen",
        },
        title: "Leningsovereenkomst",
        reference: "Overeenkomst Nr: {contract_ref}",
        location_and_date: `Opgemaakt te ${companyCity}, op {contract_date}`,
        parties: {
            title: "Tussen de ondergetekenden:",
            lender_label: "De Kredietgever:",
            borrower_label: "De Kredietnemer:",
            read_and_approved: "Gelezen en goedgekeurd",
        },
        articles: {
            object: {
                title: "Artikel 1: Voorwerp van de Overeenkomst",
                content: "De Kredietgever verstrekt aan de Kredietnemer, die aanvaardt, een aflosbare lening van het type {type_of_loan} voor niet-professioneel gebruik, beheerst door de bepalingen van het Wetboek van Consumentenrecht en door deze algemene en bijzondere voorwaarden.",
            },
            characteristics: {
                title: "Artikel 2: Bedrag en Kenmerken van de Lening",
                amount: "Geleend kapitaalbedrag: {loan_amount} ({loan_amount_in_words} euro).",
                taeg: "Vast Jaarlijks Kostenpercentage (JKP): {taeg}.",
                term: "Totale aflossingsduur: {loan_term} maanden.",
                availability: "Datum van terbeschikkingstelling van de fondsen: Uiterlijk 10 dagen na het verstrijken van de herroepingstermijn.",
            },
            repayment: {
                title: "Artikel 3: Aflossingsvoorwaarden",
                intro: "De Kredietnemer verbindt zich ertoe het kapitaal en de rente terug te betalen in {loan_term} vaste maandelijkse termijnen. De eerste termijn is verschuldigd op {start_date} en de laatste op {end_date}.",
                monthly_payment: "Maandelijkse aflossing (exclusief verzekering): {monthly_payment}. Dit bedrag wordt op de 5e van elke maand geïnd.",
                total_cost: "De totale kosten van het krediet (rente) bedragen {total_cost}.",
                total_due: "Totaal verschuldigd bedrag: {total_due} (Geleend kapitaal + totale rentekosten).",
            },
            withdrawal: {
                title: "Artikel 4: Herroepingsrecht",
                content: "De Kredietnemer beschikt over een herroepingstermijn van veertien (14) kalenderdagen vanaf de datum van ondertekening van het kredietaanbod. Om gebruik te maken van het herroepingsrecht, moet de Kredietnemer het bijgevoegde herroepingsformulier per aangetekende brief met ontvangstbevestiging terugsturen.",
            },
            default: {
                title: "Artikel 5: Wanbetaling",
                content: "In geval van niet-betaling van een termijn op de vervaldag, kan de Kredietgever de onmiddellijke terugbetaling van het resterende verschuldigde kapitaal eisen, vermeerderd met de vervallen en onbetaalde rente. Vertragingstoeslagen kunnen worden toegepast in overeenstemming met de geldende wetgeving.",
            },
            early_repayment: {
                title: "Artikel 6: Vervroegde Aflossing",
                content: "De Kredietnemer heeft te allen tijde het recht om het hem verstrekte krediet geheel of gedeeltelijk vervroegd af te lossen. Conform ons commercieel beleid zal geen boete voor vervroegde aflossing worden geëist, ongeacht het bedrag. De Kredietnemer dient de Kredietgever enkel schriftelijk op de hoogte te stellen van zijn voornemen om de praktische modaliteiten van de aflossing te regelen.",
            },
            data: {
                title: "Artikel 7: Bescherming van Persoonsgegevens",
                content: "De verzamelde informatie is noodzakelijk voor de verwerking van de leningaanvraag. Deze wordt elektronisch verwerkt en is bestemd voor de diensten van de Kredietgever en zijn partners. Conform de AVG heeft de Kredietnemer recht op toegang, rectificatie en verwijdering van zijn persoonsgegevens door contact op te nemen met de Kredietgever op het adres {contact_email}.",
            },
            law: {
                title: "Artikel 8: Toepasselijk Recht en Geschillen",
                content: "Deze overeenkomst is onderworpen aan het Belgisch recht. In geval van een geschil verbinden de partijen zich ertoe een minnelijke schikking te zoeken. Bij gebreke daarvan is de bevoegde rechtbank die van de woonplaats van de Kredietnemer.",
            },
        },
        signature_preamble: "Opgemaakt in twee originele exemplaren, één voor elke partij.",
    }
});
