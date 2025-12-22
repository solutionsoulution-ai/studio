
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
    }
});
