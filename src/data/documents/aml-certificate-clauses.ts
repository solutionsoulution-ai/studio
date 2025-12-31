
import type { Clauses } from "./languages";

export const amlCertificateClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Département de Conformité",
            line2: "Unité de Lutte Contre le Blanchiment d'Argent (LCB-FT)",
        },
        title: "Déclaration sur l'Origine des Fonds",
        reference: "Déclaration N°: {ref}",
        date: "Date: {date}",
        declarer: {
            title: "Déclarant",
        },
        articles: {
            declaration: {
                title: "Article 1 : Déclaration sur l'Honneur",
                content: `Je soussigné(e), {client_name}, déclare sur l'honneur que les fonds d'un montant de {transaction_amount} ({transaction_amount_in_words}) qui seront utilisés dans le cadre de la transaction référencée {transaction_ref} proviennent de sources légitimes et ne sont pas issus d'activités criminelles ou de blanchiment de capitaux, conformément à la directive (UE) 2015/849.`,
                origin_label: "Origine des fonds déclarée (veuillez détailler) :",
            },
            source_justification: {
                title: "Article 2 : Justification de l'Origine des Fonds",
                content: `Les fonds proviennent des sources suivantes : (Cochez toutes les cases applicables et fournissez les détails demandés).`,
                options: [
                    "Revenus professionnels / Salaires",
                    "Produits de la vente d'un bien immobilier",
                    "Héritage / Donation",
                    "Produits d'une cession d'entreprise ou d'actifs",
                    "Épargne personnelle constituée sur le long terme",
                    "Autre (à préciser)"
                ]
            },
            commitment: {
                title: "Article 3 : Engagement de Transparence",
                content: `Je m'engage à fournir à ${companyName}, sur simple demande, tout document justificatif (bulletins de salaire, avis d'imposition, acte de vente notarié, etc.) attestant de l'origine des fonds déclarée ci-dessus. Je comprends que cette vérification est une obligation légale pour ${companyName}.`,
            },
            warning: {
                title: "Article 4 : Avertissement sur les Fausses Déclarations",
                content: `Je reconnais avoir été informé(e) que toute fausse déclaration est passible de poursuites judiciaires, peut entraîner la résiliation immédiate de toute relation d'affaires avec ${companyName}, ainsi qu'une déclaration de soupçon auprès des autorités compétentes (TRACFIN en France, etc.).`,
            },
        },
        signature_label: "Signature du Déclarant",
    },
    en: {
        header: {
            line1: "Compliance Department",
            line2: "Anti-Money Laundering Unit (AML/CFT)",
        },
        title: "Declaration on the Origin of Funds",
        reference: "Declaration No: {ref}",
        date: "Date: {date}",
        declarer: {
            title: "Declarant",
        },
        articles: {
            declaration: {
                title: "Article 1: Declaration on Honor",
                content: `I, the undersigned, {client_name}, hereby declare on my honor that the funds amounting to {transaction_amount} ({transaction_amount_in_words}) to be used in the transaction referenced {transaction_ref} originate from legitimate sources and are not the proceeds of criminal activities or money laundering, in accordance with Directive (EU) 2015/849.`,
                origin_label: "Declared origin of funds (please detail):",
            },
            source_justification: {
                title: "Article 2: Justification of the Origin of Funds",
                content: "The funds originate from the following sources: (Check all applicable boxes and provide requested details).",
                options: [
                    "Professional Income / Salaries",
                    "Proceeds from the sale of real estate",
                    "Inheritance / Donation",
                    "Proceeds from the sale of a business or assets",
                    "Personal savings built up over the long term",
                    "Other (please specify)"
                ]
            },
            commitment: {
                title: "Article 3: Commitment to Transparency",
                content: `I undertake to provide ${companyName}, upon request, with any supporting documents (payslips, tax notices, notarized deeds of sale, etc.) that verify the origin of the funds declared above. I understand that this verification is a legal obligation for ${companyName}.`,
            },
            warning: {
                title: "Article 4: Warning on False Declarations",
                content: `I acknowledge that I have been informed that any false declaration is liable to legal prosecution and may result in the immediate termination of any business relationship with ${companyName}, as well as a suspicious activity report to the competent authorities.`,
            },
        },
        signature_label: "Declarant's Signature",
    },
    de: {
        // ... (german translations)
    },
    lt: {
        header: {
            line1: "Atitikties departamentas",
            line2: "Pinigų plovimo prevencijos skyrius (AML/CFT)",
        },
        title: "Deklaracija dėl lėšų kilmės",
        reference: "Deklaracijos Nr.: {ref}",
        date: "Data: {date}",
        declarer: {
            title: "Deklaruojantis asmuo",
        },
        articles: {
            declaration: {
                title: "1 straipsnis: Garbės deklaracija",
                content: `Aš, {client_name}, garbės žodžiu pareiškiu, kad {transaction_amount} ({transaction_amount_in_words}) sumos lėšos, kurios bus naudojamos sandoryje, kurio nuoroda {transaction_ref}, yra gautos iš teisėtų šaltinių ir nėra susijusios su nusikalstama veika ar pinigų plovimu, laikantis Direktyvos (ES) 2015/849.`,
                origin_label: "Deklaruota lėšų kilmė (prašome detalizuoti):",
            },
            source_justification: {
                title: "2 straipsnis: Lėšų kilmės pagrindimas",
                content: "Lėšos gautos iš šių šaltinių: (Pažymėkite visus tinkančius langelius ir pateikite prašomą informaciją).",
                options: [
                    "Profesinės pajamos / Atlyginimai",
                    "Pajamos iš nekilnojamojo turto pardavimo",
                    "Paveldėjimas / Dovanojimas",
                    "Pajamos iš verslo ar turto perleidimo",
                    "Ilgalaikės asmeninės santaupos",
                    "Kita (nurodykite)"
                ]
            },
            commitment: {
                title: "3 straipsnis: Skaidrumo įsipareigojimas",
                content: `Įsipareigoju, ${companyName} paprašius, pateikti bet kokius patvirtinančius dokumentus (atlyginimo lapelius, mokesčių deklaracijas, notarinius pirkimo-pardavimo aktus ir kt.), patvirtinančius aukščiau nurodytą lėšų kilmę. Suprantu, kad šis patikrinimas yra teisinė ${companyName} pareiga.`,
            },
            warning: {
                title: "4 straipsnis: Įspėjimas dėl melagingų deklaracijų",
                content: `Patvirtinu, kad buvau informuotas (-a), jog už bet kokią melagingą deklaraciją gali būti taikoma teisinė atsakomybė ir tai gali lemti neatidėliotiną visų verslo santykių su ${companyName} nutraukimą bei pranešimą apie įtartiną veiklą kompetentingoms institucijoms.`,
            },
        },
        signature_label: "Deklaruojančio asmens parašas",
    },
    nl: {
        header: {
            line1: "Afdeling Naleving",
            line2: "Eenheid voor de Bestrijding van Witwassen (AML-CFT)",
        },
        title: "Verklaring over de Herkomst van Fondsen",
        reference: "Verklaring Nr: {ref}",
        date: "Datum: {date}",
        declarer: {
            title: "Declarant",
        },
        articles: {
            declaration: {
                title: "Artikel 1: Verklaring op Eer",
                content: `Ik, ondergetekende, {client_name}, verklaar op erewoord dat de fondsen ten bedrage van {transaction_amount} ({transaction_amount_in_words}) die gebruikt zullen worden in het kader van de transactie met referentie {transaction_ref}, afkomstig zijn van legitieme bronnen en niet het resultaat zijn van criminele activiteiten of het witwassen van geld, in overeenstemming met Richtlijn (EU) 2015/849.`,
                origin_label: "Aangegeven herkomst van de fondsen (gelieve te specificeren):",
            },
            source_justification: {
                title: "Artikel 2: Rechtvaardiging van de Herkomst van de Fondsen",
                content: "De fondsen zijn afkomstig uit de volgende bronnen: (Vink alle toepasselijke vakjes aan en verstrek de gevraagde details).",
                options: [
                    "Beroepsinkomsten / Salarissen",
                    "Opbrengsten uit de verkoop van onroerend goed",
                    "Erfenis / Schenking",
                    "Opbrengsten uit de verkoop van een bedrijf of activa",
                    "Persoonlijke spaargelden op lange termijn",
                    "Andere (specificeren)"
                ]
            },
            commitment: {
                title: "Artikel 3: Transparantieverplichting",
                content: `Ik verbind mij ertoe om op eenvoudig verzoek aan ${companyName} elk bewijsstuk (loonstroken, belastingaanslagen, notariële verkoopakten, enz.) te verstrekken dat de hierboven aangegeven herkomst van de fondsen bevestigt. Ik begrijp dat deze verificatie een wettelijke verplichting is voor ${companyName}.`,
            },
            warning: {
                title: "Artikel 4: Waarschuwing voor Valse Verklaringen",
                content: `Ik erken te zijn geïnformeerd dat elke valse verklaring kan leiden tot gerechtelijke vervolging en de onmiddellijke beëindiging van elke zakelijke relatie met ${companyName}, evenals een melding van verdachte transacties aan de bevoegde autoriteiten.`,
            },
        },
        signature_label: "Handtekening van de Declarant",
    }
});
