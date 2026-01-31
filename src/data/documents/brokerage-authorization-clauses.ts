
import type { Clauses } from "./languages";

export const brokerageAuthorizationClauses = (companyName: string, authority: string, location: string): Clauses => ({
    fr: {
        authority: authority,
        title: "Attestation d'Immatriculation",
        subtitle: "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        intro: `L'autorité compétente, en vertu des dispositions légales en vigueur, atteste que l'entité désignée ci-après est immatriculée et autorisée à agir en tant qu'intermédiaire :`,
        company_name: companyName,
        registration_number: "Numéro d'immatriculation national unique : {ref}",
        validity: "",
        location_and_date: `Fait à ${location}, le {issue_date}`,
        signature_label_1: `Pour ${authority}, Le Président`,
        signature_label_2: "Le Directeur Exécutif",
        articles: {
            status: {
                title: "Article 1 - Catégorie d'Inscription",
                value: "Courtier en opérations de banque et en services de paiement (COBSP).",
                description: `Ce statut atteste que ${companyName} agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché.`
            },
            activities: {
                title: "Article 2 - Activités Autorisées",
                description: `${companyName} est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits.`
            },
            insurance: {
                title: "Article 3 - Assurance de Responsabilité Civile Professionnelle",
                content: `${companyName} déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément à la réglementation en vigueur. Les garanties du contrat sont conformes aux montants minimaux réglementaires.`
            },
            conduct: {
                title: "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
                content: "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
            },
            lcbft: {
                title: "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
                content: `En tant qu'intermédiaire, ${companyName} est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC).`
            },
            claims: {
                title: "Article 6 - Traitement des Réclamations",
                content: `${companyName} dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet.`
            }
        }
    },
    en: {
        authority: authority,
        title: "Registration Certificate",
        subtitle: "Intermediary in Banking Operations and Payment Services (IOBSP)",
        intro: `The competent authority, by virtue of the legal provisions in force, certifies that the entity designated below is registered and authorized to act as an intermediary:`,
        company_name: companyName,
        registration_number: "Unique national registration number: {ref}",
        validity: "",
        location_and_date: `Done in ${location}, on {issue_date}`,
        signature_label_1: `For ${authority}, The President`,
        signature_label_2: "The Executive Director",
        articles: {
            status: {
                title: "Article 1 - Registration Category",
                value: "Broker in banking operations and payment services (COBSP).",
                description: `This status certifies that ${companyName} acts as an agent for its clients and is not subject to any contractual obligation to work exclusively with one or more credit institutions. The broker seeks the most suitable contracts on the market for their client.`
            },
            activities: {
                title: "Article 2 - Authorized Activities",
                description: `${companyName} is authorized to present, propose, or assist in the conclusion of banking operations or payment services and to carry out all preparatory work and advice for their realization. This activity particularly concerns consumer credit, real estate loans, and credit consolidation.`
            },
            insurance: {
                title: "Article 3 - Professional Civil Liability Insurance",
                content: `${companyName} declares to have subscribed to an insurance contract covering it against the financial consequences of its professional civil liability with a reputable insurer, in accordance with the regulations in force. The contract guarantees comply with the minimum regulatory amounts.`
            },
            conduct: {
                title: "Article 4 - Rules of Good Conduct and Consumer Protection",
                content: "The intermediary is required to respect the rules of good conduct. They must act in an honest, fair, transparent, and professional manner, in the best interests of their clients. They must provide clear explanations and reasoned recommendations, and ensure that the proposed contract is adapted to the client's needs and financial situation."
            },
            lcbft: {
                title: "Article 5 - Anti-Money Laundering (AML/CFT) Obligations",
                content: `As an intermediary, ${companyName} is subject to due diligence obligations in the fight against money laundering and terrorist financing, and must implement procedures for identifying and knowing its customers (KYC).`
            },
            claims: {
                title: "Article 6 - Claims Handling",
                content: `${companyName} has a procedure for handling customer complaints and has appointed a competent consumer mediator in the event of an unresolved dispute, whose contact details are available on its website.`
            }
        }
    },
    de: {
        authority: "Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)",
        title: "Registrierungsbescheinigung",
        subtitle: "Vermittler von Bankgeschäften und Zahlungsdiensten",
        intro: `Die zuständige Behörde bescheinigt gemäß den geltenden gesetzlichen Bestimmungen, dass die nachstehend genannte Einheit registriert und als Vermittler zugelassen ist:`,
        company_name: companyName,
        registration_number: "Bundesweite einheitliche Registriernummer: {ref}",
        validity: "",
        location_and_date: `Ausgestellt in Frankfurt am Main, am {issue_date}`,
        signature_label_1: `Für die BaFin, Der Präsident`,
        signature_label_2: "Der Exekutivdirektor",
        articles: {
            status: {
                title: "Artikel 1 - Registrierungskategorie",
                value: "Makler für Bankgeschäfte und Zahlungsdienste (COBSP).",
                description: `Dieser Status bescheinigt, dass ${companyName} als Vertreter seiner Kunden handelt und keiner vertraglichen Verpflichtung unterliegt, ausschließlich mit einem oder mehreren Kreditinstituten zusammenzuarbeiten. Der Makler sucht für seinen Kunden die am besten geeigneten Verträge auf dem Markt.`
            },
            activities: {
                title: "Artikel 2 - Erlaubte Tätigkeiten",
                description: `${companyName} ist befugt, Bankgeschäfte oder Zahlungsdienste vorzustellen, anzubieten oder beim Abschluss zu helfen und alle vorbereitenden Arbeiten und Beratungen für deren Durchführung durchzuführen. Diese Tätigkeit betrifft insbesondere Konsumentenkredite, Immobilienkredite und Umschuldungen.`
            },
            insurance: {
                title: "Artikel 3 - Berufshaftpflichtversicherung",
                content: `${companyName} erklärt, eine Berufshaftpflichtversicherung bei einem namhaften Versicherer abgeschlossen zu haben, die sie gegen die finanziellen Folgen ihrer beruflichen Haftpflicht gemäß den geltenden Vorschriften absichert. Die Garantien des Vertrags entsprechen den gesetzlichen Mindestbeträgen.`
            },
            conduct: {
                title: "Artikel 4 - Wohlverhaltensregeln und Verbraucherschutz",
                content: "Der Vermittler ist verpflichtet, die Wohlverhaltensregeln zu beachten. Er muss ehrlich, fair, transparent und professionell im besten Interesse seiner Kunden handeln. Er muss klare Erklärungen und begründete Empfehlungen abgeben und sicherstellen, dass der vorgeschlagene Vertrag den Bedürfnissen und der finanziellen Situation des Kunden entspricht."
            },
            lcbft: {
                title: "Artikel 5 - Pflichten zur Bekämpfung der Geldwäsche (GwG)",
                content: `Als Vermittler unterliegt ${companyName} den Sorgfaltspflichten zur Bekämpfung von Geldwäsche und Terrorismusfinanzierung und muss Verfahren zur Identifizierung und Kenntnis seiner Kunden (KYC) implementieren.`
            },
            claims: {
                title: "Artikel 6 - Beschwerdebehandlung",
                content: `${companyName} verfügt über ein Verfahren zur Behandlung von Kundenbeschwerden und hat für den Fall eines ungelösten Streits einen zuständigen Verbraucherschlichter benannt, dessen Kontaktdaten auf der Website zugänglich sind.`
            }
        }
    },
    lt: {
        authority: authority,
        title: "Registracijos liudijimas",
        subtitle: "Bankininkystės operacijų ir mokėjimo paslaugų tarpininkas (IOBSP)",
        intro: "Kompetentinga institucija, vadovaudamasi galiojančiomis teisinėmis nuostatomis, patvirtina, kad toliau nurodytas subjektas yra įregistruotas ir įgaliotas veikti kaip tarpininkas:",
        company_name: companyName,
        registration_number: "Unikalus nacionalinis registracijos numeris: {ref}",
        validity: "",
        location_and_date: `Sudaryta ${location}, {issue_date}`,
        signature_label_1: `Už ${authority}, Pirmininkas`,
        signature_label_2: "Vykdomasis direktorius",
        articles: {
            status: {
                title: "1 straipsnis - Registracijos kategorija",
                value: "Bankininkystės operacijų ir mokėjimo paslaugų brokeris (COBSP).",
                description: `Šis statusas patvirtina, kad ${companyName} veikia kaip savo klientų atstovas ir nėra saistomas jokių sutartinių įsipareigojimų dirbti išskirtinai su viena ar keliomis kredito įstaigomis. Brokeris ieško klientui tinkamiausių sutarčių rinkoje.`
            },
            activities: {
                title: "2 straipsnis - Leidžiama veikla",
                description: `${companyName} yra įgaliota pristatyti, siūlyti ar padėti sudaryti banko operacijas ar mokėjimo paslaugas bei atlikti visus parengiamuosius darbus ir konsultacijas jų įgyvendinimui. Ši veikla ypač apima vartojimo kreditus, nekilnojamojo turto paskolas ir kreditų refinansavimą.`
            },
            insurance: {
                title: "3 straipsnis - Profesinės civilinės atsakomybės draudimas",
                content: `${companyName} pareiškia, kad sudarė profesinės civilinės atsakomybės draudimo sutartį, apsaugančią nuo finansinių pasekmių, su patikimu draudiku, laikantis galiojančių teisės aktų. Sutarties garantijos atitinka minimalius reguliavimo reikalavimus.`
            },
            conduct: {
                title: "4 straipsnis - Geros elgsenos taisyklės ir vartotojų apsauga",
                content: "Tarpininkas privalo laikytis geros elgsenos taisyklių. Jis turi veikti sąžiningai, teisingai, skaidriai ir profesionaliai, geriausiais savo klientų interesais. Jis turi teikti aiškius paaiškinimus ir pagrįstas rekomendacijas bei užtikrinti, kad siūloma sutartis atitiktų kliento poreikius ir finansinę padėtį."
            },
            lcbft: {
                title: "5 straipsnis - Kovos su pinigų plovimu (AML/CFT) įsipareigojimai",
                content: `Kaip tarpininkas, ${companyName} privalo laikytis deramo patikrinimo įsipareigojimų kovojant su pinigų plovimu ir terorizmo finansavimu ir turi įgyvendinti klientų identifikavimo ir pažinimo (KYC) procedūras.`
            },
            claims: {
                title: "6 straipsnis - Skundų nagrinėjimas",
                content: `${companyName} turi klientų skundų nagrinėjimo procedūrą ir yra paskyrusi kompetentingą vartotojų ginčų sprendimo subjektą neišspręsto ginčo atveju, kurio kontaktinė informacija yra prieinama jos interneto svetainėje.`
            }
        }
    },
    nl: {
        authority: authority,
        title: "Registratieattest",
        subtitle: "Tussenpersoon in Banktransacties en Betalingsdiensten (IOBSP)",
        intro: "De bevoegde autoriteit, krachtens de geldende wettelijke bepalingen, verklaart dat de hieronder genoemde entiteit is geregistreerd en gemachtigd is om op te treden als tussenpersoon:",
        company_name: companyName,
        registration_number: "Uniek nationaal registratienummer: {ref}",
        validity: "",
        location_and_date: `Gedaan te ${location}, op {issue_date}`,
        signature_label_1: `Voor ${authority}, de Voorzitter`,
        signature_label_2: "De Uitvoerend Directeur",
        articles: {
            status: {
                title: "Artikel 1 - Registratiecategorie",
                value: "Makelaar in banktransacties en betalingsdiensten (COBSP).",
                description: `Deze status bevestigt dat ${companyName} optreedt als gevolmachtigde van haar klanten en niet contractueel verplicht is om uitsluitend met een of meer kredietinstellingen samen te werken. De makelaar zoekt voor zijn klant de meest geschikte contracten op de markt.`
            },
            activities: {
                title: "Artikel 2 - Toegestane Activiteiten",
                description: `${companyName} is gemachtigd om banktransacties of betalingsdiensten voor te stellen, aan te bieden of te helpen sluiten en alle voorbereidende werkzaamheden en adviezen voor hun realisatie uit te voeren. Deze activiteit betreft met name consumentenkrediet, hypothecair krediet en krediethergroepering.`
            },
            insurance: {
                title: "Artikel 3 - Beroepsaansprakelijkheidsverzekering",
                content: `${companyName} verklaart een verzekering te hebben afgesloten die haar dekt tegen de financiële gevolgen van haar beroepsaansprakelijkheid bij een gerenommeerde verzekeraar, in overeenstemming met de geldende regelgeving. De garanties van het contract voldoen aan de minimale reglementaire bedragen.`
            },
            conduct: {
                title: "Artikel 4 - Gedragsregels en Consumentenbescherming",
                content: "De tussenpersoon is verplicht de gedragsregels na te leven. Hij moet eerlijk, loyaal, transparant en professioneel handelen, in het beste belang van zijn klanten. Hij moet duidelijke uitleg en gemotiveerde aanbevelingen geven en ervoor zorgen dat het voorgestelde contract is aangepast aan de behoeften en de financiële situatie van de klant."
            },
            lcbft: {
                title: "Artikel 5 - Verplichtingen ter bestrijding van het witwassen van geld (AML/CFT)",
                content: `Als tussenpersoon is ${companyName} onderworpen aan de due diligence-verplichtingen ter bestrijding van het witwassen van geld en de financiering van terrorisme, en moet zij procedures voor klantenidentificatie en -kennis (KYC) implementeren.`
            },
            claims: {
                title: "Artikel 6 - Klachtenbehandeling",
                content: `${companyName} beschikt over een procedure voor de behandeling van klachten van klanten en heeft een bevoegde consumentenombudsman aangesteld in geval van een onopgelost geschil, wiens contactgegevens beschikbaar zijn op haar website.`
            }
        }
    }
});
