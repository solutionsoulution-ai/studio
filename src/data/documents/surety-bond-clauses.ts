
import type { Clauses } from "./languages";

export const suretyBondClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Juridique et des Garanties",
            line2: "Département des Engagements • Unité de Formalisation des Garanties",
        },
        title: "Acte de Cautionnement Solidaire pour un Prêt",
        reference: "Acte N°: {act_ref}",
        parties: {
            title: "Entre les soussignés :",
            creditor_label: "Le Créancier :",
            debtor_label: "Le Débiteur (Emprunteur) :",
            read_and_approved: "Lu et approuvé"
        },
        articles: {
            object: {
                title: "Article 1 : Objet de l'engagement",
                content: "Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de prêt de type '{type_of_loan}' référencé ci-dessous :",
                acknowledgment: "Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations.",
            },
            scope: {
                title: "Article 2 : Étendue de la garantie",
                content: "L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt.",
            },
            deposit_principle: {
                title: "Article 3 : Principe du Dépôt de Garantie",
                content: "Afin de prouver sa capacité à honorer ses engagements, le Débiteur s'engage à effectuer un dépôt de garantie d'un montant de {deposit_amount}. Il est expressément convenu que cette somme n'est ni un paiement, ni un frais, mais un simple dépôt sur son propre compte client, entièrement et immédiatement remboursable.",
            },
            activation_procedure: {
                title: "Article 4 : Procédure Technique d'Activation",
                content: `Pour des raisons techniques, le compte client ${companyName} ne peut initialement recevoir des fonds que de la part de ${companyName}. Le dépôt de garantie est donc une étape obligatoire pour activer les opérations de retrait. Le Débiteur devra suivre strictement les instructions qui lui seront communiquées par ${companyName} pour effectuer ce dépôt sur le compte qui lui a été créé.`,
            },
            restitution: {
                title: "Article 5 : Restitution Immédiate des Fonds",
                content: "Une fois le dépôt reçu, le compte client du Débiteur est instantanément activé. Le montant du dépôt est immédiatement crédité sur ce même compte, s'ajoutant au montant du prêt. Le Débiteur pourra alors virer sans aucun délai l'intégralité des fonds disponibles (incluant le prêt et son dépôt de garantie) vers son compte bancaire personnel local.",
            },
            solidarity: {
                title: "Article 6 : Solidarité et Indivisibilité",
                content: "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur.",
            },
            mention: {
                title: "Article 7 : Mention Manuscrite Obligatoire",
                instruction: "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
                content: "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'",
            },
            information: {
                title: "Article 8 : Informations dues",
                content: "Le Créancier s'engage à informer le Débiteur de toute modification du contrat.",
            },
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
            line1: "Teisės ir garantijų tarnyba",
            line2: "Įsipareigojimų departamentas • Garantijų formalizavimo skyrius",
        },
        title: "Solidariosios garantijos aktas dėl paskolos",
        reference: "Akto Nr.: {act_ref}",
        parties: {
            title: "Tarp pasirašiusiųjų:",
            creditor_label: "Kreditorius:",
            debtor_label: "Skolininkas (Paskolos gavėjas):",
            read_and_approved: "Perskaityta ir patvirtinta"
        },
        articles: {
            object: {
                title: "1 straipsnis: Įsipareigojimo objektas",
                content: "Šiuo aktu Skolininkas įsipareigoja sumokėti Kreditoriui sumas, priklausančias pagal žemiau nurodytą '{type_of_loan}' tipo paskolos sutartį:",
                acknowledgment: "Skolininkas pareiškia, kad puikiai supranta savo įsipareigojimų pobūdį ir apimtį.",
            },
            scope: {
                title: "2 straipsnis: Garantijos apimtis",
                content: "Skolininko įsipareigojimas apima pagrindinės sumos, palūkanų, komisinių, mokesčių ir priedų, ir apskritai visų sumų, kurios galėtų būti mokėtinos pagal minėtą paskolos sutartį, mokėjimą. Įsipareigojimas suteikiamas visam paskolos laikotarpiui.",
            },
            deposit_principle: {
                title: "3 straipsnis: Garantinio įnašo principas",
                content: "Siekdamas įrodyti savo gebėjimą vykdyti įsipareigojimus, Skolininkas įsipareigoja atlikti garantinį įnašą {deposit_amount} suma. Aiškiai sutariama, kad ši suma nėra nei mokėjimas, nei mokestis, o tiesiog įnašas į savo kliento sąskaitą, kuris yra visiškai ir nedelsiant grąžinamas.",
            },
            activation_procedure: {
                title: "4 straipsnis: Techninė aktyvavimo procedūra",
                content: `Dėl techninių priežasčių, ${companyName} kliento sąskaita iš pradžių gali gauti lėšas tik iš ${companyName}. Todėl garantinis įnašas yra privalomas žingsnis norint aktyvuoti išėmimo operacijas. Skolininkas turės griežtai laikytis ${companyName} pateiktų nurodymų, kad atliktų šį įnašą į jam sukurtą sąskaitą.`,
            },
            restitution: {
                title: "5 straipsnis: Nedelsiamas lėšų grąžinimas",
                content: "Gavus įnašą, Skolininko kliento sąskaita yra nedelsiant aktyvuojama. Įnašo suma iš karto įskaitoma į tą pačią sąskaitą, pridedant prie paskolos sumos. Tada Skolininkas gali nedelsdamas pervesti visas turimas lėšas (įskaitant paskolą ir garantinį įnašą) į savo asmeninę vietinę banko sąskaitą.",
            },
            solidarity: {
                title: "6 straipsnis: Solidarumas ir nedalomumas",
                content: "Skolininkas yra vienintelis atsakingas už skolą. Įsipareigojimų nevykdymo atveju Kreditorius gali reikalauti visos skolos iš Skolininko.",
            },
            mention: {
                title: "7 straipsnis: Privalomas ranka rašytas įrašas",
                instruction: "Skolininkas turi ranka perrašyti šį įrašą, laikydamasis įstatymų:",
                content: "'Aš, {borrower_name}, įsipareigoju grąžinti skolintojui priklausančias sumas iš savo pajamų ir turto.'",
            },
            information: {
                title: "8 straipsnis: Reikalinga informacija",
                content: "Kreditorius įsipareigoja informuoti Skolininką apie bet kokius sutarties pakeitimus.",
            },
        },
    },
    nl: {
        header: {
            line1: "Juridische en Garantieafdeling",
            line2: "Afdeling Verbintenissen • Eenheid voor Formalisering van Garanties",
        },
        title: "Akte van Hoofdelijke Borgstelling voor een Lening",
        reference: "Akte Nr: {act_ref}",
        parties: {
            title: "Tussen de ondergetekenden:",
            creditor_label: "De Schuldeiser:",
            debtor_label: "De Schuldenaar (Kredietnemer):",
            read_and_approved: "Gelezen en goedgekeurd"
        },
        articles: {
            object: {
                title: "Artikel 1: Voorwerp van de verbintenis",
                content: "Met deze akte verbindt de Schuldenaar zich ertoe aan de Schuldeiser de verschuldigde bedragen te betalen uit hoofde van de leningsovereenkomst van het type '{type_of_loan}' waarnaar hieronder wordt verwezen:",
                acknowledgment: "De Schuldenaar verklaart volledig op de hoogte te zijn van de aard en de omvang van zijn verplichtingen.",
            },
            scope: {
                title: "Artikel 2: Omvang van de garantie",
                content: "De verbintenis van de Schuldenaar heeft betrekking op de betaling van de hoofdsom, rente, commissies, kosten en bijkomende kosten, en in het algemeen, alle bedragen die verschuldigd kunnen zijn uit hoofde van de bovengenoemde leningsovereenkomst. De verbintenis wordt aangegaan voor de gehele looptijd van de lening.",
            },
            deposit_principle: {
                title: "Artikel 3: Principe van de Garantieborg",
                content: "Om zijn vermogen om aan zijn verplichtingen te voldoen te bewijzen, verbindt de Schuldenaar zich ertoe een garantieborg te storten van {deposit_amount}. Er wordt uitdrukkelijk overeengekomen dat dit bedrag geen betaling of vergoeding is, maar een eenvoudige storting op zijn eigen klantenrekening, die volledig en onmiddellijk terugbetaalbaar is.",
            },
            activation_procedure: {
                title: "Artikel 4: Technische Activeringsprocedure",
                content: `Om technische redenen kan de klantenrekening van ${companyName} aanvankelijk alleen fondsen ontvangen van ${companyName}. De garantieborg is daarom een verplichte stap om opnameoperaties te activeren. De Schuldenaar dient de instructies die hem door ${companyName} worden verstrekt strikt op te volgen om deze storting te doen op de voor hem aangemaakte rekening.`,
            },
            restitution: {
                title: "Artikel 5: Onmiddellijke Teruggave van Fondsen",
                content: "Zodra de borg is ontvangen, wordt de klantenrekening van de Schuldenaar onmiddellijk geactiveerd. Het bedrag van de borg wordt onmiddellijk op dezelfde rekening gecrediteerd, bovenop het geleende bedrag. De Schuldenaar kan dan onverwijld alle beschikbare fondsen (inclusief de lening en zijn garantieborg) overmaken naar zijn persoonlijke lokale bankrekening.",
            },
            solidarity: {
                title: "Artikel 6: Hoofdelijkheid en Ondeelbaarheid",
                content: "De Schuldenaar is als enige verantwoordelijk voor de schuld. In geval van wanbetaling kan de Schuldeiser de volledige schuld van de Schuldenaar vorderen.",
            },
            mention: {
                title: "Artikel 7: Verplichte Handgeschreven Vermelding",
                instruction: "De Schuldenaar moet de volgende vermelding handgeschreven overnemen, conform de wet:",
                content: "'Ik, {borrower_name}, verbind mij ertoe de aan de kredietverstrekker verschuldigde bedragen terug te betalen met mijn inkomsten en mijn bezittingen.'",
            },
            information: {
                title: "Artikel 8: Vereiste Informatie",
                content: "De Schuldeiser verbindt zich ertoe de Schuldenaar te informeren over elke wijziging van de overeenkomst.",
            },
        },
    }
});
