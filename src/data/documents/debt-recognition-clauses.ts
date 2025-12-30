
import type { Clauses } from "./languages";

export const debtRecognitionClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Financier",
            line2: "Département Juridique et des Garanties • Unité de Formalisation des Engagements",
        },
        title: "Reconnaissance de Dette pour un Prêt",
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
                content: `Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à ${companyName}, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un prêt de type '{type_of_loan}' qui m'a été accordé et dont je confirme avoir reçu les fonds.`,
            },
            repayment: {
                title: "Article 2 : Modalités de Remboursement",
                content: "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de prêt N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier.",
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
        // ...
    },
    de: {
        // ...
    },
    lt: {
        header: {
            line1: "Finansų tarnyba",
            line2: "Teisės ir garantijų departamentas • Įsipareigojimų formalizavimo skyrius",
        },
        title: "Skolos pripažinimo raštas dėl paskolos",
        reference: "Dokumento Nr.: {ref}",
        date: "Data: {date}",
        parties: {
            title: "Tarp pasirašiusiųjų:",
            creditor_label: "Kreditorius:",
            debtor_label: "Skolininkas:",
        },
        articles: {
            recognition: {
                title: "1 straipsnis: Skolos pripažinimas",
                content: `Aš, {debtor_name}, gyvenantis {debtor_address}, šiuo raštu pripažįstu, kad esu skolingas ${companyName}, veikiančiai jos finansinių partnerių vardu, šią sumą: {loan_amount} ({loan_amount_in_words}). Ši suma atitinka man suteiktos '{type_of_loan}' tipo paskolos kapitalą, kurio lėšas patvirtinu gavęs.`,
            },
            repayment: {
                title: "2 straipsnis: Grąžinimo sąlygos",
                content: "Įsipareigoju grąžinti visą šią sumą, taip pat susijusias palūkanas ir mokesčius, laikydamasis atskirai pasirašyto paskolos sutarties Nr. {loan_contract_ref} nustatytų terminų ir sąlygų. Sutarta grąžinimo trukmė yra {loan_term} mėnesių, išskyrus išankstinio grąžinimo ar mokėjimo sutrikimo atvejus, keičiančius grafiką.",
            },
            default: {
                title: "3 straipsnis: Įsipareigojimų nevykdymo sąlyga",
                content: "Vieno ar kelių įmokų nesumokėjimo atveju pripažįstu, kad Kreditorius gali pasinaudoti paskolos sutartyje numatytomis sąlygomis, įskaitant išankstinį visos likusios skolos dalies, padidintos taikomomis palūkanomis ir baudomis, pareikalavimą.",
            },
            mention: {
                title: "4 straipsnis: Įsipareigojimo supratimas",
                content: "Vartojimo kodekso L. 313-24 straipsnis pabrėžia įsipareigojimo svarbą. Skolininkas pripažįsta, kad perskaitė ir suprato visą paskolos sutartį, su kuria susijęs šis skolos pripažinimo raštas, ir gavo po vieną kiekvieno dokumento egzempliorių.",
            }
        },
    },
    nl: {
        header: {
            line1: "Financiële Dienst",
            line2: "Juridische en Garantieafdeling • Eenheid voor Formalisering van Verbintenissen",
        },
        title: "Schuldbekentenis voor een Lening",
        reference: "Document Nr: {ref}",
        date: "Datum: {date}",
        parties: {
            title: "Tussen de ondergetekenden:",
            creditor_label: "De Schuldeiser:",
            debtor_label: "De Schuldenaar:",
        },
        articles: {
            recognition: {
                title: "Artikel 1: Erkenning van de Schuld",
                content: `Ik, ondergetekende, {debtor_name}, wonende te {debtor_address}, erken hierbij verschuldigd te zijn aan ${companyName}, handelend namens haar financiële partners, de som van: {loan_amount} ({loan_amount_in_words}). Dit bedrag komt overeen met het kapitaal van een lening van het type '{type_of_loan}' die mij is verleend en waarvan ik bevestig de fondsen te hebben ontvangen.`,
            },
            repayment: {
                title: "Artikel 2: Terugbetalingsvoorwaarden",
                content: "Ik verbind mij ertoe dit bedrag volledig terug te betalen, evenals de bijbehorende rente en kosten, in overeenstemming met de termijnen en voorwaarden die zijn vastgelegd in de leningsovereenkomst Nr. {loan_contract_ref} die ik afzonderlijk heb ondertekend. De overeengekomen aflossingsperiode is {loan_term} maanden, behalve in geval van vervroegde aflossing of betalingsachterstand die de planning wijzigt.",
            },
            default: {
                title: "Artikel 3: Wanbetalingsclausule",
                content: "In geval van niet-betaling van een of meer termijnen, erken ik dat de Schuldeiser zich kan beroepen op de clausules in de leningsovereenkomst, inclusief de vervroegde opeisbaarheid van het totale resterende kapitaal, verhoogd met de toepasselijke rente en boetes.",
            },
            mention: {
                title: "Artikel 4: Begrip van de Verbintenis",
                content: "Artikel L. 313-24 van de Consumentenwet benadrukt het belang van de verbintenis. De schuldenaar erkent de volledige leningsovereenkomst waarop deze schuldbekentenis betrekking heeft, te hebben gelezen en begrepen en een exemplaar van elk document te hebben ontvangen.",
            }
        },
    }
});
