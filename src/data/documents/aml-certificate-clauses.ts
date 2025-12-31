
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
                title: "Article 1 : Déclaration sur l'Honneur du Client",
                content: `Je soussigné(e), {client_name}, déclare sur l'honneur que les fonds qui seront utilisés pour le remboursement du financement objet de la transaction {transaction_ref}, ainsi que tout apport personnel, proviennent de sources légitimes et ne sont pas issus d'activités criminelles ou de blanchiment de capitaux, conformément à la directive (UE) 2015/849.`,
                origin_label: "Origine des fonds déclarée (veuillez détailler) :",
            },
            source_justification: {
                title: "Article 2 : Justification de l'Origine des Fonds du Client",
                content: `Je m'engage à justifier sur demande de l'origine des fonds par tout moyen probant. Les sources principales de mes revenus et de mon patrimoine sont :`,
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
            lender_declaration: {
                title: "Article 5 : Déclaration du Prêteur sur l'Origine des Fonds",
                content: `En sa qualité d'établissement financier régulé, ${companyName} atteste que les capitaux, objet du financement accordé au Déclarant, proviennent de ses opérations financières légitimes et sont en pleine conformité avec les cadres réglementaires européens et nationaux de lutte contre le blanchiment de capitaux et le financement du terrorisme. Notre institution s'engage à maintenir une traçabilité et une transparence absolues quant à la provenance de ses ressources financières.`
            },
            internal_control: {
                title: "Article 6 : Dispositif de Contrôle Interne",
                content: `${companyName} confirme avoir mis en place un dispositif de contrôle interne et de gestion des risques rigoureux, visant à identifier, évaluer et maîtriser les risques de non-conformité, y compris ceux liés au blanchiment de capitaux. Nos procédures internes sont régulièrement auditées et mises à jour pour s'aligner avec les meilleures pratiques du secteur financier et les évolutions réglementaires.`
            },
            cooperation: {
                title: "Article 7 : Coopération avec les Autorités",
                content: `En vertu de ses obligations légales, ${companyName} coopère pleinement avec les autorités de régulation et les cellules de renseignement financier (telles que TRACFIN). Toute transaction présentant un caractère atypique ou suspect fait l'objet d'un examen approfondi et, le cas échéant, d'une déclaration en bonne et due forme.`
            }
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
                title: "Article 1: Client's Declaration on Honor",
                content: `I, the undersigned, {client_name}, hereby declare on my honor that the funds to be used for the repayment of the financing subject to transaction {transaction_ref}, as well as any personal contribution, originate from legitimate sources and are not the proceeds of criminal activities or money laundering, in accordance with Directive (EU) 2015/849.`,
                origin_label: "Declared origin of funds (please detail):",
            },
            source_justification: {
                title: "Article 2: Justification of the Client's Funds Origin",
                content: "I commit to justifying the origin of the funds upon request by any conclusive means. The main sources of my income and assets are:",
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
            lender_declaration: {
                title: "Article 5: Lender's Declaration on the Origin of Funds",
                content: `As a regulated financial institution, ${companyName} certifies that the capital, which is the subject of the financing granted to the Declarant, originates from its legitimate financial operations and is in full compliance with the European and national regulatory frameworks for combating money laundering and the financing of terrorism. Our institution is committed to maintaining absolute traceability and transparency regarding the origin of its financial resources.`
            },
            internal_control: {
                title: "Article 6: Internal Control System",
                content: `${companyName} confirms having implemented a rigorous internal control and risk management system, aimed at identifying, assessing, and controlling non-compliance risks, including those related to money laundering. Our internal procedures are regularly audited and updated to align with the best practices of the financial sector and regulatory developments.`
            },
            cooperation: {
                title: "Article 7: Cooperation with Authorities",
                content: `Under its legal obligations, ${companyName} fully cooperates with regulatory authorities and financial intelligence units (such as TRACFIN). Any transaction of an unusual or suspicious nature is subject to a thorough review and, if necessary, a formal declaration.`
            }
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
                title: "1 straipsnis: Kliento garbės deklaracija",
                content: `Aš, {client_name}, garbės žodžiu pareiškiu, kad lėšos, kurios bus naudojamos grąžinant finansavimą pagal sandorį {transaction_ref}, taip pat bet koks asmeninis įnašas, yra gautos iš teisėtų šaltinių ir nėra susijusios su nusikalstama veika ar pinigų plovimu, laikantis Direktyvos (ES) 2015/849.`,
                origin_label: "Deklaruota lėšų kilmė (prašome detalizuoti):",
            },
            source_justification: {
                title: "2 straipsnis: Kliento lėšų kilmės pagrindimas",
                content: "Įsipareigoju, pareikalavus, pagrįsti lėšų kilmę bet kokiomis įtikinamomis priemonėmis. Pagrindiniai mano pajamų ir turto šaltiniai yra:",
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
            lender_declaration: {
                title: "5 straipsnis: Skolintojo deklaracija dėl lėšų kilmės",
                content: `Būdama reguliuojama finansų įstaiga, ${companyName} patvirtina, kad kapitalas, kuris yra Deklaruojančiajam suteikto finansavimo objektas, yra gautas iš jos teisėtų finansinių operacijų ir visiškai atitinka Europos bei nacionalines kovos su pinigų plovimu ir terorizmo finansavimu teisės aktų sistemas. Mūsų institucija įsipareigoja išlaikyti absoliutų savo finansinių išteklių kilmės atsekamumą ir skaidrumą.`
            },
            internal_control: {
                title: "6 straipsnis: Vidinės Kontrolės Sistema",
                content: `${companyName} patvirtina įdiegusi griežtą vidaus kontrolės ir rizikos valdymo sistemą, skirtą nustatyti, įvertinti ir kontroliuoti neatitikties riziką, įskaitant susijusią su pinigų plovimu. Mūsų vidaus procedūros yra reguliariai audituojamos ir atnaujinamos, kad atitiktų geriausią finansų sektoriaus praktiką ir reguliavimo pokyčius.`
            },
            cooperation: {
                title: "7 straipsnis: Bendradarbiavimas su Institucijomis",
                content: `Pagal savo teisines prievoles, ${companyName} visapusiškai bendradarbiauja su reguliavimo institucijomis ir finansinės žvalgybos padaliniais. Bet koks neįprasto ar įtartino pobūdžio sandoris yra nuodugniai tiriamas ir, prireikus, tinkamai deklaruojamas.`
            }
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
                title: "Artikel 1: Eerlijke Verklaring van de Klant",
                content: `Ik, ondergetekende, {client_name}, verklaar op erewoord dat de fondsen die gebruikt zullen worden voor de terugbetaling van de financiering onder transactie {transaction_ref}, alsmede enige persoonlijke bijdrage, afkomstig zijn van legitieme bronnen en niet het resultaat zijn van criminele activiteiten of het witwassen van geld, in overeenstemming met Richtlijn (EU) 2015/849.`,
                origin_label: "Aangegeven herkomst van de fondsen (gelieve te specificeren):",
            },
            source_justification: {
                title: "Artikel 2: Rechtvaardiging van de Herkomst van de Fondsen van de Klant",
                content: "Ik verbind mij ertoe de herkomst van de fondsen op verzoek met elk overtuigend middel te rechtvaardigen. De belangrijkste bronnen van mijn inkomsten en vermogen zijn:",
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
            lender_declaration: {
                title: "Artikel 5: Verklaring van de Kredietverstrekker over de Herkomst van Fondsen",
                content: `Als gereguleerde financiële instelling verklaart ${companyName} dat het kapitaal, dat het voorwerp is van de aan de Declarant verleende financiering, afkomstig is van haar legitieme financiële operaties en volledig in overeenstemming is met de Europese en nationale regelgevingskaders voor de bestrijding van het witwassen van geld en de financiering van terrorisme. Onze instelling verbindt zich ertoe absolute traceerbaarheid en transparantie te handhaven met betrekking tot de herkomst van haar financiële middelen.`
            },
            internal_control: {
                title: "Artikel 6: Interne Controlesysteem",
                content: `${companyName} bevestigt dat het een streng intern controle- en risicobeheersysteem heeft geïmplementeerd, gericht op het identificeren, beoordelen en beheersen van non-compliance risico's, inclusief die met betrekking tot het witwassen van geld. Onze interne procedures worden regelmatig gecontroleerd en bijgewerkt om in lijn te zijn met de beste praktijken in de financiële sector en de ontwikkelingen in de regelgeving.`
            },
            cooperation: {
                title: "Artikel 7: Samenwerking met Autoriteiten",
                content: `Krachtens haar wettelijke verplichtingen werkt ${companyName} volledig samen met regelgevende autoriteiten en financiële inlichtingeneenheden. Elke transactie van ongebruikelijke of verdachte aard wordt onderworpen aan een grondig onderzoek en, indien nodig, een formele melding.`
            }
        },
        signature_label: "Handtekening van de Declarant",
    }
});

    