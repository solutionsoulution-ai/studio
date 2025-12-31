
import type { Clauses } from "./languages";

export const amlCertificateClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Département de Conformité",
            line2: "Unité de Lutte Contre le Blanchiment d'Argent (LCB-FT)",
        },
        title: "Certificat de Non-Blanchiment de Capitaux",
        reference: "Certificat N°: {ref}",
        date: "Date: {date}",
        declarer: {
            title: "Déclarant",
        },
        articles: {
            declaration: {
                title: "Article 1 : Déclaration sur l'Origine des Fonds",
                content: `Je soussigné(e), {client_name}, déclare sur l'honneur que les fonds d'un montant de {transaction_amount} ({transaction_amount_in_words}) utilisés dans le cadre de la transaction référencée {transaction_ref} proviennent de sources légitimes et ne sont pas issus d'activités criminelles ou de blanchiment de capitaux, conformément à la directive (UE) 2015/849.`,
                origin_label: "Origine des fonds déclarée :",
            },
            commitment: {
                title: "Article 2 : Engagement de Transparence",
                content: `Je m'engage à fournir à ${companyName}, sur simple demande, tout document justificatif (bulletins de salaire, avis d'imposition, acte de vente, etc.) attestant de l'origine des fonds déclarée ci-dessus.`,
            },
            warning: {
                title: "Article 3 : Avertissement sur les Fausses Déclarations",
                content: `Je reconnais avoir été informé(e) que toute fausse déclaration est passible de poursuites judiciaires et peut entraîner la résiliation immédiate de toute relation d'affaires avec ${companyName}, ainsi qu'une déclaration de soupçon auprès des autorités compétentes.`,
            },
        },
        signature_label: "Signature du Déclarant",
    },
    en: {
        header: {
            line1: "Compliance Department",
            line2: "Anti-Money Laundering Unit (AML/CFT)",
        },
        title: "Certificate of Non-Money Laundering",
        reference: "Certificate No: {ref}",
        date: "Date: {date}",
        declarer: {
            title: "Declarant",
        },
        articles: {
            declaration: {
                title: "Article 1: Declaration on the Origin of Funds",
                content: `I, the undersigned, {client_name}, hereby declare on my honor that the funds amounting to {transaction_amount} ({transaction_amount_in_words}) used in the transaction referenced {transaction_ref} originate from legitimate sources and are not the proceeds of criminal activities or money laundering, in accordance with Directive (EU) 2015/849.`,
                origin_label: "Declared origin of funds:",
            },
            commitment: {
                title: "Article 2: Commitment to Transparency",
                content: `I undertake to provide ${companyName}, upon request, with any supporting documents (payslips, tax notices, deeds of sale, etc.) that verify the origin of the funds declared above.`,
            },
            warning: {
                title: "Article 3: Warning on False Declarations",
                content: `I acknowledge that I have been informed that any false declaration is liable to legal prosecution and may result in the immediate termination of any business relationship with ${companyName}, as well as a suspicious activity report to the competent authorities.`,
            },
        },
        signature_label: "Declarant's Signature",
    },
    de: {
        // ...
    },
    lt: {
        header: {
            line1: "Atitikties departamentas",
            line2: "Pinigų plovimo prevencijos skyrius (AML/CFT)",
        },
        title: "Pinigų neplovimo sertifikatas",
        reference: "Sertifikato Nr.: {ref}",
        date: "Data: {date}",
        declarer: {
            title: "Deklaruojantis asmuo",
        },
        articles: {
            declaration: {
                title: "1 straipsnis: Deklaracija dėl lėšų kilmės",
                content: `Aš, {client_name}, garbės žodžiu pareiškiu, kad {transaction_amount} ({transaction_amount_in_words}) sumos lėšos, naudojamos sandoryje, kurio nuoroda {transaction_ref}, yra gautos iš teisėtų šaltinių ir nėra susijusios su nusikalstama veika ar pinigų plovimu, laikantis Direktyvos (ES) 2015/849.`,
                origin_label: "Deklaruota lėšų kilmė:",
            },
            commitment: {
                title: "2 straipsnis: Skaidrumo įsipareigojimas",
                content: `Įsipareigoju, ${companyName} paprašius, pateikti bet kokius patvirtinančius dokumentus (atlyginimo lapelius, mokesčių deklaracijas, pirkimo-pardavimo sutartis ir kt.), patvirtinančius aukščiau nurodytą lėšų kilmę.`,
            },
            warning: {
                title: "3 straipsnis: Įspėjimas dėl melagingų deklaracijų",
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
        title: "Certificaat van Niet-Witwassen van Geld",
        reference: "Certificaat Nr: {ref}",
        date: "Datum: {date}",
        declarer: {
            title: "Declarant",
        },
        articles: {
            declaration: {
                title: "Artikel 1: Verklaring over de Herkomst van de Fondsen",
                content: `Ik, ondergetekende, {client_name}, verklaar op erewoord dat de fondsen ten bedrage van {transaction_amount} ({transaction_amount_in_words}) die worden gebruikt in het kader van de transactie met referentie {transaction_ref}, afkomstig zijn van legitieme bronnen en niet het resultaat zijn van criminele activiteiten of het witwassen van geld, in overeenstemming met Richtlijn (EU) 2015/849.`,
                origin_label: "Aangegeven herkomst van de fondsen:",
            },
            commitment: {
                title: "Artikel 2: Transparantieverplichting",
                content: `Ik verbind mij ertoe om op eenvoudig verzoek aan ${companyName} elk bewijsstuk (loonstroken, belastingaanslagen, verkoopakten, enz.) te verstrekken dat de hierboven aangegeven herkomst van de fondsen bevestigt.`,
            },
            warning: {
                title: "Artikel 3: Waarschuwing voor Valse Verklaringen",
                content: `Ik erken te zijn geïnformeerd dat elke valse verklaring kan leiden tot gerechtelijke vervolging en de onmiddellijke beëindiging van elke zakelijke relatie met ${companyName}, evenals een melding van verdachte transacties aan de bevoegde autoriteiten.`,
            },
        },
        signature_label: "Handtekening van de Declarant",
    }
});
