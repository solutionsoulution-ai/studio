
import type { Clauses } from "./languages";

export const insuranceNoticeClauses: Clauses = {
    fr: {
        title: "Notice d'Information",
        subtitle: "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        importance: {
            "title": "Importance de ce document",
            "description": "Ce document pré-contractuel est essentiel. Il vous informe en détail des caractéristiques de votre assurance emprunteur, notamment les garanties, les exclusions et vos droits, vous permettant de souscrire en toute connaissance de cause et de comparer avec d'autres offres."
        },
        introduction: "La présente notice a pour objet de vous informer des principales caractéristiques de votre adhésion à l'assurance emprunteur. Elle n'a pas de valeur contractuelle mais constitue un résumé des conditions générales et particulières qui prévaudront. Nous vous invitons à la lire attentivement.",
        guarantees: {
            title: "ARTICLE 1 : GARANTIES PROPOSÉES",
            items: {
                death: { "title": "Garantie Décès", "description": "En cas de décès de l'assuré avant la fin du prêt, l'assureur s'engage à rembourser au prêteur le capital restant dû au jour du décès, selon la quotité assurée." },
                disability: { "title": "Garantie Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Si, suite à une maladie ou un accident, l'assuré est reconnu en état de PTIA (nécessitant l'assistance d'une tierce personne pour les actes de la vie courante), l'assureur prend en charge le remboursement du capital restant dû." },
                incapacity: { "title": "Garantie Incapacité Temporaire Totale de travail (ITT)", "description": "En cas d'arrêt de travail total et continu suite à une maladie ou un accident, et après une période de franchise (généralement 90 jours), l'assureur prend en charge le paiement de vos échéances de prêt pendant la durée de votre incapacité." }
            }
        },
        exclusions: {
            title: "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            intro: "Certaines situations ne sont pas couvertes par le contrat. Sont notamment exclus :",
            items: [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre civile ou étrangère, d'émeutes, d'actes de terrorisme.",
                "La pratique de sports aériens, de compétition à titre professionnel ou de tout sport présentant un risque aggravé.",
                "Les affections psychiatriques et les pathologies du dos non hospitalisées (pour la garantie ITT)."
            ]
        },
        waiver: {
            title: "ARTICLE 4 : DROIT DE RENONCIATION",
            description: "Vous disposez d'un délai légal de 30 jours calendaires révolus à compter de la date de signature de votre adhésion pour y renoncer, sans frais ni pénalités, par lettre recommandée avec accusé de réception."
        },
        claim: {
            title: "ARTICLE 5 : DÉCLARATION DE SINISTRE",
            description: "En cas de sinistre (décès, accident, maladie), vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives requises (certificat médical, acte de décès, etc.)."
        }
    },
    en: {
        title: "Information Notice",
        subtitle: "Group Borrower Insurance Contract No. 789-101112",
        importance: {
            "title": "Importance of this document",
            "description": "This pre-contractual document is essential. It informs you in detail about the features of your borrower insurance, including guarantees, exclusions, and your rights, allowing you to subscribe with full knowledge and to compare with other offers."
        },
        introduction: "This notice is intended to inform you of the main features of your membership in the borrower insurance. It has no contractual value but constitutes a summary of the general and special conditions that will prevail. We invite you to read it carefully.",
        guarantees: {
            title: "ARTICLE 1: PROPOSED GUARANTEES",
            items: {
                death: { "title": "Death Benefit", "description": "In the event of the insured's death before the end of the loan, the insurer undertakes to repay the outstanding capital to the lender as of the date of death, according to the insured percentage." },
                disability: { "title": "Total and Irreversible Loss of Autonomy (PTIA) Benefit", "description": "If, following an illness or accident, the insured is recognized as being in a state of PTIA (requiring the assistance of a third person for daily life activities), the insurer covers the repayment of the outstanding capital." },
                incapacity: { "title": "Total Temporary Incapacity for Work (ITT) Benefit", "description": "In the event of a total and continuous work stoppage due to illness or accident, and after a deductible period (usually 90 days), the insurer covers the payment of your loan installments for the duration of your incapacity." }
            }
        },
        exclusions: {
            title: "ARTICLE 2: MAIN EXCLUSIONS",
            intro: "Certain situations are not covered by the contract. The following are notably excluded:",
            items: [
                "The insured's suicide during the first year of insurance.",
                "The consequences of acts of civil or foreign war, riots, acts of terrorism.",
                "The practice of aerial sports, professional competitive sports, or any sport presenting an aggravated risk.",
                "Psychiatric conditions and back pathologies without hospitalization (for the ITT guarantee)."
            ]
        },
        waiver: {
            title: "ARTICLE 4: RIGHT OF WAIVER",
            description: "You have a legal period of 30 calendar days from the date of signing your membership to waive it, without fees or penalties, by registered letter with acknowledgment of receipt."
        },
        claim: {
            title: "ARTICLE 5: CLAIM DECLARATION",
            description: "In the event of a claim (death, accident, illness), you or your beneficiaries must declare it to the insurer within the deadlines stipulated in the contract, enclosing all required supporting documents (medical certificate, death certificate, etc.)."
        }
    },
    de: {
        title: "Informationsbroschüre",
        subtitle: "Gruppen-Kreditnehmerversicherungsvertrag Nr. 789-101112",
        importance: {
            "title": "Bedeutung dieses Dokuments",
            "description": "Dieses vorvertragliche Dokument ist unerlässlich. Es informiert Sie detailliert über die Merkmale Ihrer Kreditnehmerversicherung, einschließlich Garantien, Ausschlüsse und Ihrer Rechte, sodass Sie in voller Kenntnis der Sachlage abschließen und mit anderen Angeboten vergleichen können."
        },
        introduction: "Diese Broschüre soll Sie über die Hauptmerkmale Ihrer Mitgliedschaft in der Kreditnehmerversicherung informieren. Sie hat keinen vertraglichen Wert, stellt aber eine Zusammenfassung der allgemeinen und besonderen Bedingungen dar, die gelten werden. Wir bitten Sie, sie sorgfältig zu lesen.",
        guarantees: {
            title: "ARTIKEL 1: ANGEBOTENE GARANTIEN",
            items: {
                death: { "title": "Todesfallleistung", "description": "Im Todesfall des Versicherten vor Ende des Darlehens verpflichtet sich der Versicherer, dem Kreditgeber das am Todestag ausstehende Kapital entsprechend dem versicherten Anteil zurückzuzahlen." },
                disability: { "title": "Leistung bei vollständigem und unwiderruflichem Autonomieverlust (PTIA)", "description": "Wenn der Versicherte infolge einer Krankheit oder eines Unfalls als PTIA anerkannt wird (Hilfe einer dritten Person für die Verrichtungen des täglichen Lebens erforderlich), übernimmt der Versicherer die Rückzahlung des ausstehenden Kapitals." },
                incapacity: { "title": "Leistung bei vollständiger vorübergehender Arbeitsunfähigkeit (ITT)", "description": "Im Falle einer vollständigen und ununterbrochenen Arbeitsniederlegung aufgrund von Krankheit oder Unfall und nach einer Karenzzeit (in der Regel 90 Tage) übernimmt der Versicherer die Zahlung Ihrer Darlehensraten für die Dauer Ihrer Arbeitsunfähigkeit." }
            }
        },
        exclusions: {
            title: "ARTIKEL 2: HAUPTAUSSCHLÜSSE",
            intro: "Bestimmte Situationen sind vom Vertrag nicht abgedeckt. Insbesondere sind ausgeschlossen:",
            items: [
                "Der Selbstmord des Versicherten im ersten Versicherungsjahr.",
                "Die Folgen von Bürger- oder Auslandskriegen, Aufruhren, Terrorakten.",
                "Die Ausübung von Luftsportarten, professionellem Wettkampfsport oder jeder Sportart, die ein erhöhtes Risiko darstellt.",
                "Psychiatrische Erkrankungen und nicht stationär behandelte Rückenleiden (für die ITT-Garantie)."
            ]
        },
        waiver: {
            title: "ARTIKEL 4: WIDERRUFSRECHT",
            description: "Sie haben eine gesetzliche Frist von 30 Kalendertagen ab dem Datum der Unterzeichnung Ihrer Mitgliedschaft, um diese ohne Gebühren oder Strafen per Einschreiben mit Rückschein zu widerrufen."
        },
        claim: {
            title: "ARTIKEL 5: SCHADENMELDUNG",
            description: "Im Falle eines Schadens (Tod, Unfall, Krankheit) müssen Sie oder Ihre Anspruchsberechtigten diesen dem Versicherer innerhalb der im Vertrag vorgesehenen Fristen melden und alle erforderlichen Belege (ärztliches Attest, Sterbeurkunde usw.) beifügen."
        }
    },
    lt: {
        title: "Informacinis pranešimas",
        subtitle: "Grupinio paskolos gavėjo draudimo sutartis Nr. 789-101112",
        importance: {
            title: "Šio dokumento svarba",
            description: "Šis ikisutartinis dokumentas yra būtinas. Jame išsamiai informuojama apie jūsų paskolos gavėjo draudimo ypatybes, įskaitant garantijas, išimtis ir jūsų teises, leidžiančias jums sudaryti sutartį turint visą informaciją ir palyginti su kitais pasiūlymais."
        },
        introduction: "Šio pranešimo tikslas - informuoti jus apie pagrindines jūsų narystės paskolos gavėjo draudime ypatybes. Jis neturi sutartinės vertės, bet yra bendrųjų ir specialiųjų sąlygų, kurios galios, santrauka. Kviečiame atidžiai jį perskaityti.",
        guarantees: {
            title: "1 STRAIPSNIS: SIŪLOMOS GARANTIJOS",
            items: {
                death: { title: "Mirties atvejo garantija", description: "Apdraustojo mirties atveju iki paskolos pabaigos draudikas įsipareigoja grąžinti skolintojui likusį kapitalą mirties dieną, pagal apdraustą dalį." },
                disability: { title: "Visiško ir negrįžtamo savarankiškumo praradimo (PTIA) garantija", description: "Jei dėl ligos ar nelaimingo atsitikimo apdraustasis pripažįstamas PTIA būsenoje (reikalaujančioje trečiojo asmens pagalbos kasdieniame gyvenime), draudikas padengia likusio kapitalo grąžinimą." },
                incapacity: { title: "Laikino visiško nedarbingumo (ITT) garantija", description: "Visiško ir nepertraukiamo darbo nutraukimo dėl ligos ar nelaimingo atsitikimo atveju, ir po franšizės laikotarpio (paprastai 90 dienų), draudikas padengia jūsų paskolos įmokas jūsų nedarbingumo laikotarpiu." }
            }
        },
        exclusions: {
            title: "2 STRAIPSNIS: PAGRINDINĖS IŠIMTYS",
            intro: "Kai kurios situacijos nėra draudžiamos pagal sutartį. Ypač neįtraukiama:",
            items: [
                "Apdraustojo savižudybė per pirmuosius draudimo metus.",
                "Pilietinio ar užsienio karo, riaušių, terorizmo aktų pasekmės.",
                "Užsiėmimas oro sportu, profesionaliomis varžybomis ar bet kokiu sportu, keliančiu padidintą riziką.",
                "Psichiatrinės ligos ir nugaros patologijos be hospitalizacijos (ITT garantijai)."
            ]
        },
        waiver: {
            title: "4 STRAIPSNIS: ATSISAKYMO TEISĖ",
            description: "Jūs turite teisę per 30 kalendorinių dienų nuo narystės pasirašymo dienos atsisakyti jos be jokių mokesčių ar baudų, išsiųsdami registruotą laišką su gavimo patvirtinimu."
        },
        claim: {
            title: "5 STRAIPSNIS: PRANEŠIMAS APIE ŽALĄ",
            description: "Įvykus draudiminiam įvykiui (mirtis, nelaimingas atsitikimas, liga), jūs arba jūsų teisių perėmėjai privalote apie tai pranešti draudikui per sutartyje numatytus terminus, pridėdami visus reikiamus patvirtinamuosius dokumentus (medicininę pažymą, mirties liudijimą ir kt.)."
        }
    },
    nl: {
        title: "Informatiebrochure",
        subtitle: "Groepsverzekeringscontract voor Kredietnemers nr. 789-101112",
        importance: {
            "title": "Belang van dit document",
            "description": "Dit precontractuele document is essentieel. Het informeert u gedetailleerd over de kenmerken van uw kredietnemersverzekering, met name de garanties, uitsluitingen en uw rechten, zodat u met volledige kennis van zaken kunt inschrijven en kunt vergelijken met andere aanbiedingen."
        },
        introduction: "Deze brochure heeft tot doel u te informeren over de belangrijkste kenmerken van uw toetreding tot de kredietnemersverzekering. Het heeft geen contractuele waarde, maar vormt een samenvatting van de algemene en bijzondere voorwaarden die van toepassing zullen zijn. Wij nodigen u uit om het aandachtig te lezen.",
        guarantees: {
            title: "ARTIKEL 1: VOORGESTELDE GARANTIES",
            items: {
                death: { "title": "Overlijdensgarantie", "description": "In geval van overlijden van de verzekerde voor het einde van de lening, verbindt de verzekeraar zich ertoe het resterende verschuldigde kapitaal op de dag van overlijden terug te betalen aan de kredietverstrekker, volgens het verzekerde quotum." },
                disability: { "title": "Garantie voor Totaal en Onomkeerbaar Verlies van Autonomie (PTIA)", "description": "Indien, als gevolg van een ziekte of een ongeval, de verzekerde wordt erkend als zijnde in een staat van PTIA (waarbij de hulp van een derde persoon nodig is voor de handelingen van het dagelijks leven), dekt de verzekeraar de terugbetaling van het resterende verschuldigde kapitaal." },
                incapacity: { "title": "Garantie voor Tijdelijke Volledige Arbeidsongeschiktheid (ITT)", "description": "In geval van een volledige en ononderbroken werkonderbreking als gevolg van een ziekte of ongeval, en na een franchiseperiode (meestal 90 dagen), dekt de verzekeraar de betaling van uw leningtermijnen gedurende uw arbeidsongeschiktheid." }
            }
        },
        exclusions: {
            title: "ARTIKEL 2: BELANGRIJKSTE UITSLUITINGEN",
            intro: "Sommige situaties worden niet gedekt door het contract. Met name uitgesloten zijn:",
            items: [
                "Zelfmoord van de verzekerde tijdens het eerste verzekeringsjaar.",
                "De gevolgen van burgerlijke of buitenlandse oorlogen, rellen, terreurdaden.",
                "De beoefening van luchtsporten, professionele wedstrijdsporten of elke sport die een verhoogd risico met zich meebrengt.",
                "Psychiatrische aandoeningen en niet-gehospitaliseerde rugpathologieën (voor de ITT-garantie)."
            ]
        },
        waiver: {
            title: "ARTIKEL 4: RECHT VAN AFSTAND",
            description: "U beschikt over een wettelijke termijn van 30 kalenderdagen vanaf de datum van ondertekening van uw toetreding om hiervan af te zien, zonder kosten of boetes, per aangetekende brief met ontvangstbevestiging."
        },
        claim: {
            title: "ARTIKEL 5: AANGIFTE VAN SCHADE",
            description: "In geval van een schadegeval (overlijden, ongeval, ziekte), moet u of uw rechtverkrijgenden dit binnen de in het contract voorziene termijnen aangeven bij de verzekeraar, met bijvoeging van alle vereiste bewijsstukken (medisch attest, overlijdensakte, enz.)."
        }
    }
};
