
import type { Clauses } from "./languages";

export const bankingLicenseClauses = (companyName: string, companyAddress: string): Clauses => ({
    fr: {
        authority: "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        title: "Licence d'Établissement de Crédit",
        subtitle: "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        decision: "Décision d'agrément n° {ref} du collège de l'ACPR",
        intro: "Vu le Code monétaire et financier, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), après en avoir délibéré, DÉCIDE :",
        grant_to: "Article 1 : Agrément",
        company_name: companyName,
        company_address: companyAddress,
        status: `Il est accordé à l'entité ${companyName} le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.`,
        validity: "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être modifiée, suspendue ou révoquée par l'ACPR en cas de manquement grave aux obligations légales et réglementaires.",
        location_and_date: "Fait à Paris, le {issue_date}",
        signature_label_1: "Le Gouverneur de la Banque de France",
        signature_label_2: "Le Secrétaire Général de l'ACPR",
        articles: {
            scope: {
                title: "Article 2 : Périmètre des Activités Autorisées",
                intro: `Dans le cadre de cet agrément, ${companyName} est autorisée à réaliser, à titre de profession habituelle, les opérations de banque suivantes :`,
                item1: "La réception de fonds remboursables du public, sous forme de dépôts ou autrement.",
                item2: "Les opérations de crédit, incluant, sans s'y limiter, le crédit à la consommation, le crédit immobilier, l'affacturage, et le crédit-bail.",
                item3: "La mise à disposition et la gestion de moyens de paiement, y compris les cartes de paiement et les virements."
            },
            prudential: {
                title: "Article 3 : Exigences Prudentielles",
                content: "L'établissement est tenu de respecter en permanence les exigences réglementaires européennes et nationales (CRR/CRD), notamment en matière de fonds propres (ratio de solvabilité), de liquidité (LCR/NSFR), de grands risques, et de levier financier. Il doit maintenir en permanence un niveau de fonds propres adéquat pour couvrir les risques inhérents à ses activités."
            },
            internal_control: {
                title: "Article 4 : Contrôle Interne et Gouvernance",
                content: `${companyName} doit se doter d'un système de contrôle interne robuste et d'une gouvernance d'entreprise saine, incluant une séparation claire des fonctions, des procédures de gestion des risques efficaces, et un dispositif de conformité (compliance) assurant le respect des réglementations en vigueur.`
            },
            lcbft: {
                title: "Article 5 : Lutte Contre le Blanchiment et le Financement du Terrorisme (LCB-FT)",
                content: `${companyName} doit appliquer des mesures de vigilance strictes pour la prévention du blanchiment de capitaux et du financement du terrorisme. Cela inclut l'identification et la vérification de l'identité de ses clients (KYC), le suivi de leurs opérations, et la déclaration de toute opération suspecte à l'autorité compétente (BaFin en Allemagne, TRACFIN en France).`
            },
            customer_protection: {
                title: "Article 6 : Protection de la Clientèle",
                content: "L'établissement doit garantir la protection des intérêts de sa clientèle. Il doit fournir une information claire, exacte et non trompeuse sur ses produits et tarifs, offrir un conseil adapté à la situation de ses clients, et disposer d'un système de traitement des réclamations efficace et transparent."
            },
            reporting: {
                title: "Article 7 : Obligations de Reporting",
                content: `${companyName} est assujetti à des obligations de reporting périodique auprès de l'ACPR et de la Banque de France concernant sa situation financière, ses risques, et son respect des ratios réglementaires.`
            }
        }
    },
    en: {
        authority: "Prudential Control and Resolution Authority (ACPR)",
        title: "Credit Institution License",
        subtitle: "In accordance with Articles L. 511-1 et seq. of the Monetary and Financial Code",
        decision: "Approval decision No. {ref} from the ACPR college",
        intro: "Having regard to the Monetary and Financial Code, and after examining the submitted application file, the Prudential Control and Resolution Authority (ACPR), after deliberation, DECIDES:",
        grant_to: "Article 1: Approval",
        company_name: companyName,
        company_address: companyAddress,
        status: `The entity ${companyName} is granted the status of Credit Institution, authorizing it to carry out all banking operations within the territory of the European Union.`,
        validity: "This license is granted for an indefinite period, subject to constant compliance with the conditions of its granting and the regulations in force. It may be modified, suspended, or revoked by the ACPR in the event of a serious breach of legal and regulatory obligations.",
        location_and_date: "Done in Paris, on {issue_date}",
        signature_label_1: "The Governor of the Bank of France",
        signature_label_2: "The Secretary General of the ACPR",
        articles: {
            scope: {
                title: "Article 2: Scope of Authorized Activities",
                intro: `Within the framework of this approval, ${companyName} is authorized to carry out, as a regular business, the following banking operations:`,
                item1: "Receiving repayable funds from the public, in the form of deposits or otherwise.",
                item2: "Credit operations, including, but not limited to, consumer credit, real estate loans, factoring, and leasing.",
                item3: "Providing and managing means of payment, including payment cards and transfers."
            },
            prudential: {
                title: "Article 3: Prudential Requirements",
                content: "The institution is required to permanently comply with European and national regulatory requirements (CRR/CRD), particularly regarding own funds (solvency ratio), liquidity (LCR/NSFR), large exposures, and financial leverage. It must permanently maintain an adequate level of own funds to cover the risks inherent in its activities."
            },
            internal_control: {
                title: "Article 4: Internal Control and Governance",
                content: `${companyName} must establish a robust internal control system and sound corporate governance, including a clear separation of functions, effective risk management procedures, and a compliance framework ensuring respect for current regulations.`
            },
            lcbft: {
                title: "Article 5: Anti-Money Laundering and Counter-Terrorist Financing (AML/CFT)",
                content: `${companyName} must apply strict due diligence measures for the prevention of money laundering and terrorist financing. This includes identifying and verifying the identity of its customers (KYC), monitoring their transactions, and reporting any suspicious transactions to the competent authority (e.g., TRACFIN in France).`
            },
            customer_protection: {
                title: "Article 6: Customer Protection",
                content: "The institution must guarantee the protection of its customers' interests. It must provide clear, accurate, and non-misleading information about its products and prices, offer advice adapted to its customers' situation, and have an effective and transparent claims processing system."
            },
            reporting: {
                title: "Article 7: Reporting Obligations",
                content: `${companyName} is subject to periodic reporting obligations to the ACPR and the Bank of France concerning its financial situation, its risks, and its compliance with regulatory ratios.`
            }
        }
    },
    de: {
        authority: "Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)",
        title: "Erlaubnis zum Betreiben von Bankgeschäften",
        subtitle: "Gemäß § 32 des Kreditwesengesetzes (KWG)",
        decision: "Erlaubnisbescheid Nr. {ref} der BaFin",
        intro: "Nach Prüfung des vorgelegten Antrags erteilt die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) nach Beratung folgenden Bescheid:",
        grant_to: "Artikel 1: Erlaubnis",
        company_name: companyName,
        company_address: companyAddress,
        status: `Der ${companyName} wird die Erlaubnis als Kreditinstitut erteilt, die sie berechtigt, sämtliche Bankgeschäfte im Gebiet der Europäischen Union durchzuführen.`,
        validity: "Diese Erlaubnis wird auf unbestimmte Zeit erteilt, vorbehaltlich der ständigen Einhaltung der Erlaubnisvoraussetzungen und der geltenden Vorschriften. Sie kann von der BaFin bei schwerwiegenden Verstößen gegen gesetzliche und aufsichtsrechtliche Pflichten geändert, ausgesetzt oder widerrufen werden.",
        location_and_date: "Ausgestellt in Frankfurt am Main, am {issue_date}",
        signature_label_1: "Der Präsident der BaFin",
        signature_label_2: "Der Exekutivdirektor Bankenaufsicht",
        articles: {
            scope: {
                title: "Artikel 2: Umfang der erlaubten Tätigkeiten",
                intro: `Im Rahmen dieser Erlaubnis ist ${companyName} berechtigt, gewerbsmäßig folgende Bankgeschäfte zu betreiben:`,
                item1: "Die Annahme fremder Gelder als Einlagen oder anderer unbedingt rückzahlbarer Gelder des Publikums.",
                item2: "Das Kreditgeschäft, einschließlich, aber nicht beschränkt auf Konsumentenkredite, Immobilienkredite, Factoring und Leasing.",
                item3: "Die Bereitstellung und Verwaltung von Zahlungsmitteln, einschließlich Zahlungskarten und Überweisungen."
            },
            prudential: {
                title: "Artikel 3: Aufsichtsrechtliche Anforderungen",
                content: "Das Institut ist verpflichtet, die europäischen und nationalen aufsichtsrechtlichen Anforderungen (CRR/CRD) jederzeit einzuhalten, insbesondere in Bezug auf Eigenmittel (Solvabilitätsquote), Liquidität (LCR/NSFR), Großkredite und Verschuldungsgrad. Es muss jederzeit eine angemessene Eigenmittelausstattung zur Deckung der mit seinen Tätigkeiten verbundenen Risiken aufrechterhalten."
            },
            internal_control: {
                title: "Artikel 4: Internes Kontrollsystem und Governance",
                content: `${companyName} muss über ein robustes internes Kontrollsystem und eine solide Unternehmensführung verfügen, einschließlich einer klaren Funktionstrennung, wirksamer Risikomanagementverfahren und eines Compliance-Rahmens, der die Einhaltung der geltenden Vorschriften gewährleistet.`
            },
            lcbft: {
                title: "Artikel 5: Bekämpfung von Geldwäsche und Terrorismusfinanzierung (GwG)",
                content: `${companyName} muss strenge Sorgfaltspflichten zur Verhinderung von Geldwäsche und Terrorismusfinanzierung anwenden. Dazu gehören die Identifizierung und Überprüfung der Identität seiner Kunden (KYC), die Überwachung ihrer Transaktionen und die Meldung verdächtiger Transaktionen an die zuständige Behörde (z.B. BaFin).`
            },
            customer_protection: {
                title: "Artikel 6: Kundenschutz",
                content: "Das Institut muss den Schutz der Interessen seiner Kunden gewährleisten. Es muss klare, genaue und nicht irreführende Informationen über seine Produkte und Preise bereitstellen, eine an die Situation seiner Kunden angepasste Beratung anbieten und über ein wirksames und transparentes Beschwerdemanagementsystem verfügen."
            },
            reporting: {
                title: "Artikel 7: Meldepflichten",
                content: `${companyName} unterliegt regelmäßigen Meldepflichten gegenüber der BaFin und der Deutschen Bundesbank bezüglich seiner Finanzlage, seiner Risiken und der Einhaltung der aufsichtsrechtlichen Kennzahlen.`
            }
        }
    },
    lt: {
        authority: "Prudencinės kontrolės ir pertvarkymo institucija (ACPR)",
        title: "Kredito įstaigos licencija",
        subtitle: "Pagal Pinigų ir finansų kodekso L. 511-1 ir vėlesnius straipsnius",
        decision: "ACPR kolegijos sprendimas dėl leidimo Nr. {ref}",
        intro: "Atsižvelgdama į Pinigų ir finansų kodeksą ir išnagrinėjusi pateiktą paraiškos bylą, Prudencinės kontrolės ir pertvarkymo institucija (ACPR), po svarstymo, NUSPRENDŽIA:",
        grant_to: "1 straipsnis: Leidimas",
        company_name: companyName,
        company_address: companyAddress,
        status: `Subjektui ${companyName} suteikiamas Kredito įstaigos statusas, leidžiantis vykdyti visas bankines operacijas Europos Sąjungos teritorijoje.`,
        validity: "Ši licencija suteikiama neribotam laikui, su sąlyga, kad nuolat bus laikomasi jos suteikimo sąlygų ir galiojančių teisės aktų. ACPR gali ją pakeisti, sustabdyti arba atšaukti esant rimtam teisinių ir norminių įsipareigojimų pažeidimui.",
        location_and_date: "Sudaryta Paryžiuje, {issue_date}",
        signature_label_1: "Prancūzijos banko valdytojas",
        signature_label_2: "ACPR generalinis sekretorius",
        articles: {
            scope: {
                title: "2 straipsnis: Leidžiamų veiklų apimtis",
                intro: `Pagal šį leidimą ${companyName} yra įgaliota vykdyti šias bankines operacijas kaip įprastą verslą:`,
                item1: "Grąžintinų lėšų priėmimas iš visuomenės indėlių ar kitokia forma.",
                item2: "Kredito operacijos, įskaitant, bet neapsiribojant, vartojimo kreditus, nekilnojamojo turto paskolas, faktoringą ir lizingą.",
                item3: "Mokėjimo priemonių teikimas ir valdymas, įskaitant mokėjimo korteles ir pavedimus."
            },
            prudential: {
                title: "3 straipsnis: Prudenciniai reikalavimai",
                content: "Įstaiga privalo nuolat laikytis Europos ir nacionalinių reguliavimo reikalavimų (CRR/CRD), ypač dėl nuosavų lėšų (mokumo koeficiento), likvidumo (LCR/NSFR), didelių pozicijų ir finansinio sverto. Ji privalo nuolat palaikyti tinkamą nuosavų lėšų lygį, kad padengtų su jos veikla susijusias rizikas."
            },
            internal_control: {
                title: "4 straipsnis: Vidaus kontrolė ir valdymas",
                content: `${companyName} privalo turėti tvirtą vidaus kontrolės sistemą ir patikimą įmonių valdymą, įskaitant aiškų funkcijų atskyrimą, veiksmingas rizikos valdymo procedūras ir atitikties sistemą, užtikrinančią galiojančių reglamentų laikymąsi.`
            },
            lcbft: {
                title: "5 straipsnis: Kova su pinigų plovimu ir terorizmo finansavimu (AML/CFT)",
                content: `${companyName} privalo taikyti griežtas deramo patikrinimo priemones pinigų plovimo ir terorizmo finansavimo prevencijai. Tai apima klientų tapatybės nustatymą ir patikrinimą (KYC), jų operacijų stebėseną ir pranešimą apie bet kokias įtartinas operacijas kompetentingai institucijai.`
            },
            customer_protection: {
                title: "6 straipsnis: Klientų apsauga",
                content: "Įstaiga privalo užtikrinti savo klientų interesų apsaugą. Ji privalo teikti aiškią, tikslią ir neklaidinančią informaciją apie savo produktus ir kainas, siūlyti patarimus, pritaikytus klientų situacijai, ir turėti veiksmingą bei skaidrią skundų nagrinėjimo sistemą."
            },
            reporting: {
                title: "7 straipsnis: Atskaitomybės prievolės",
                content: `${companyName} privalo periodiškai teikti ataskaitas ACPR ir Prancūzijos bankui apie savo finansinę padėtį, rizikas ir reguliavimo koeficientų laikymąsi.`
            }
        }
    },
    nl: {
        authority: "Autoriteit voor Prudentieel Toezicht en Resolutie (ACPR)",
        title: "Vergunning als Kredietinstelling",
        subtitle: "Overeenkomstig de artikelen L. 511-1 en volgende van de Monetaire en Financiële Code",
        decision: "Goedkeuringsbesluit nr. {ref} van het college van de ACPR",
        intro: "Gezien de Monetaire en Financiële Code, en na onderzoek van het ingediende aanvraagdossier, BESLUIT de Autoriteit voor Prudentieel Toezicht en Resolutie (ACPR), na beraadslaging:",
        grant_to: "Artikel 1: Goedkeuring",
        company_name: companyName,
        company_address: companyAddress,
        status: `Aan de entiteit ${companyName} wordt de status van Kredietinstelling verleend, die haar machtigt om alle bankactiviteiten op het grondgebied van de Europese Unie uit te voeren.`,
        validity: "Deze vergunning wordt voor onbepaalde tijd verleend, op voorwaarde van voortdurende naleving van de voorwaarden voor de toekenning ervan en de geldende regelgeving. Ze kan door de ACPR worden gewijzigd, opgeschort of ingetrokken in geval van een ernstige inbreuk op de wettelijke en reglementaire verplichtingen.",
        location_and_date: "Gedaan te Parijs, op {issue_date}",
        signature_label_1: "De Gouverneur van de Banque de France",
        signature_label_2: "De Secretaris-Generaal van de ACPR",
        articles: {
            scope: {
                title: "Artikel 2: Toegestane Activiteiten",
                intro: `In het kader van deze vergunning is ${companyName} gemachtigd om als vast beroep de volgende bankverrichtingen uit te voeren:`,
                item1: "Het ontvangen van terugbetaalbare gelden van het publiek, in de vorm van deposito's of anderszins.",
                item2: "Kredietverrichtingen, met inbegrip van, maar niet beperkt tot, consumentenkrediet, hypothecair krediet, factoring en leasing.",
                item3: "Het ter beschikking stellen en beheren van betaalmiddelen, met inbegrip van betaalkaarten en overschrijvingen."
            },
            prudential: {
                title: "Artikel 3: Prudentiële Vereisten",
                content: "De instelling is verplicht permanent te voldoen aan de Europese en nationale regelgevende vereisten (CRR/CRD), met name wat betreft eigen vermogen (solvabiliteitsratio), liquiditeit (LCR/NSFR), grote risico's en financiële hefboomwerking. Zij moet permanent een adequaat niveau van eigen vermogen aanhouden om de inherente risico's van haar activiteiten te dekken."
            },
            internal_control: {
                title: "Artikel 4: Interne Controle en Bestuur",
                content: `${companyName} moet zich voorzien van een robuust intern controlesysteem en een gezond ondernemingsbestuur, met inbegrip van een duidelijke scheiding van functies, doeltreffende risicobeheerprocedures en een compliance-kader dat de naleving van de geldende regelgeving waarborgt.`
            },
            lcbft: {
                title: "Artikel 5: Bestrijding van Witwassen en Financiering van Terrorisme (AML/CFT)",
                content: `${companyName} moet strikte zorgvuldigheidsmaatregelen toepassen ter voorkoming van het witwassen van geld en de financiering van terrorisme. Dit omvat de identificatie en verificatie van de identiteit van haar klanten (KYC), het toezicht op hun transacties en de melding van verdachte transacties aan de bevoegde autoriteit.`
            },
            customer_protection: {
                title: "Artikel 6: Bescherming van de Klant",
                content: "De instelling moet de bescherming van de belangen van haar klanten garanderen. Zij moet duidelijke, accurate en niet-misleidende informatie verstrekken over haar producten en tarieven, advies bieden dat is aangepast aan de situatie van haar klanten, en beschikken over een efficiënt en transparant klachtenbehandelingssysteem."
            },
            reporting: {
                title: "Artikel 7: Rapportageverplichtingen",
                content: `${companyName} is onderworpen aan periodieke rapportageverplichtingen aan de ACPR en de Banque de France met betrekking tot haar financiële situatie, haar risico's en haar naleving van de reglementaire ratio's.`
            }
        }
    }
});
