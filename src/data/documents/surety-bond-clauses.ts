
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
        header: {
            line1: "Legal and Guarantees Department",
            line2: "Commitments Department • Guarantee Formalization Unit",
        },
        title: "Joint and Several Guaranty for a Loan",
        reference: "Act No: {act_ref}",
        parties: {
            title: "Between the undersigned:",
            creditor_label: "The Creditor:",
            debtor_label: "The Debtor (Borrower):",
            read_and_approved: "Read and approved"
        },
        articles: {
            object: {
                title: "Article 1: Purpose of the commitment",
                content: "By this act, the Debtor undertakes to pay the Creditor the sums due under the '{type_of_loan}' type loan agreement referenced below:",
                acknowledgment: "The Debtor declares to have full knowledge of the nature and extent of their obligations.",
            },
            scope: {
                title: "Article 2: Scope of the guarantee",
                content: "The Debtor's commitment covers the payment of the principal, interest, commissions, fees and accessories, and generally, all sums that may be due under the aforementioned loan agreement. The commitment is granted for the entire term of the loan.",
            },
            deposit_principle: {
                title: "Article 3: Principle of the Security Deposit",
                content: "In order to prove their ability to honor their commitments, the Debtor agrees to make a security deposit of {deposit_amount}. It is expressly agreed that this sum is neither a payment nor a fee, but a simple deposit into their own client account, fully and immediately refundable.",
            },
            activation_procedure: {
                title: "Article 4: Technical Activation Procedure",
                content: `For technical reasons, the ${companyName} client account can initially only receive funds from ${companyName}. The security deposit is therefore a mandatory step to activate withdrawal operations. The Debtor must strictly follow the instructions that will be communicated by ${companyName} to make this deposit into the account created for them.`,
            },
            restitution: {
                title: "Article 5: Immediate Refund of Funds",
                content: "Once the deposit is received, the Debtor's client account is instantly activated. The deposit amount is immediately credited to this same account, adding to the loan amount. The Debtor will then be able to transfer, without any delay, all available funds (including the loan and their security deposit) to their personal local bank account.",
            },
            solidarity: {
                title: "Article 6: Joint and Several Liability and Indivisibility",
                content: "The Debtor is solely responsible for the debt. In case of default, the Creditor may claim the entire debt from the Debtor.",
            },
            mention: {
                title: "Article 7: Mandatory Handwritten Statement",
                instruction: "The Debtor must copy the following statement by hand, in accordance with the law:",
                content: "'I, {borrower_name}, undertake to repay the lender the sums due from my income and my assets.'",
            },
            information: {
                title: "Article 8: Information Due",
                content: "The Creditor undertakes to inform the Debtor of any modification to the agreement.",
            },
        },
    },
    de: {
        header: {
            line1: "Rechts- und Garantieabteilung",
            line2: "Abteilung für Verpflichtungen • Abteilung für die Formalisierung von Garantien",
        },
        title: "Akte der gesamtschuldnerischen Bürgschaft für ein Darlehen",
        reference: "Akte Nr.: {act_ref}",
        parties: {
            title: "Zwischen den Unterzeichnenden:",
            creditor_label: "Der Gläubiger:",
            debtor_label: "Der Schuldner (Kreditnehmer):",
            read_and_approved: "Gelesen und genehmigt"
        },
        articles: {
            object: {
                title: "Artikel 1: Gegenstand der Verpflichtung",
                content: "Mit dieser Akte verpflichtet sich der Schuldner, dem Gläubiger die geschuldeten Beträge aus dem nachstehend genannten Darlehensvertrag des Typs '{type_of_loan}' zu zahlen:",
                acknowledgment: "Der Schuldner erklärt, über Art und Umfang seiner Verpflichtungen vollumfänglich informiert zu sein.",
            },
            scope: {
                title: "Artikel 2: Umfang der Garantie",
                content: "Die Verpflichtung des Schuldners erstreckt sich auf die Zahlung von Hauptsumme, Zinsen, Provisionen, Gebühren und Nebenkosten sowie allgemein aller Beträge, die aus dem oben genannten Darlehensvertrag geschuldet sein könnten. Die Verpflichtung wird für die gesamte Laufzeit des Darlehens eingegangen.",
            },
            deposit_principle: {
                title: "Artikel 3: Prinzip der Sicherheitsleistung",
                content: "Um seine Fähigkeit zur Erfüllung seiner Verpflichtungen nachzuweisen, verpflichtet sich der Schuldner, eine Sicherheitsleistung in Höhe von {deposit_amount} zu leisten. Es wird ausdrücklich vereinbart, dass dieser Betrag weder eine Zahlung noch eine Gebühr ist, sondern lediglich eine Einlage auf seinem eigenen Kundenkonto, die vollständig und sofort zurückerstattet wird.",
            },
            activation_procedure: {
                title: "Artikel 4: Technisches Aktivierungsverfahren",
                content: `Aus technischen Gründen kann das Kundenkonto von ${companyName} anfangs nur Gelder von ${companyName} erhalten. Die Sicherheitsleistung ist daher ein obligatorischer Schritt, um Abhebungsvorgänge zu aktivieren. Der Schuldner muss die ihm von ${companyName} mitgeteilten Anweisungen strikt befolgen, um diese Einzahlung auf das für ihn erstellte Konto vorzunehmen.`,
            },
            restitution: {
                title: "Artikel 5: Sofortige Rückgabe der Gelder",
                content: "Sobald die Einzahlung eingegangen ist, wird das Kundenkonto des Schuldners sofort aktiviert. Der Betrag der Einzahlung wird sofort demselben Konto gutgeschrieben und zum Darlehensbetrag hinzugefügt. Der Schuldner kann dann unverzüglich alle verfügbaren Mittel (einschließlich des Darlehens und seiner Sicherheitsleistung) auf sein persönliches lokales Bankkonto überweisen.",
            },
            solidarity: {
                title: "Artikel 6: Gesamtschuldnerische Haftung und Unteilbarkeit",
                content: "Der Schuldner ist allein für die Schuld verantwortlich. Im Falle eines Ausfalls kann der Gläubiger die gesamte Schuld vom Schuldner einfordern.",
            },
            mention: {
                title: "Artikel 7: Obligatorischer handschriftlicher Vermerk",
                instruction: "Der Schuldner muss gemäß dem Gesetz den folgenden Vermerk handschriftlich kopieren:",
                content: "'Ich, {borrower_name}, verpflichte mich, dem Kreditgeber die geschuldeten Beträge aus meinen Einkünften und meinem Vermögen zurückzuzahlen.'",
            },
            information: {
                title: "Artikel 8: Geschuldete Informationen",
                content: "Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren.",
            },
        },
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
