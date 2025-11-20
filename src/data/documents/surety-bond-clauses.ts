
import type { Clauses } from "./languages";

export const suretyBondClauses: Clauses = {
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
            deposit: {
                title: "Article 3 : Dépôt de Garantie et Activation du Compte",
                content: "Afin de prouver sa capacité à honorer ses engagements et pour des raisons techniques d'activation, le Débiteur s'engage à effectuer un dépôt de garantie d'un montant de {deposit_amount}. Ce dépôt doit être effectué sur un compte client qui lui sera spécifiquement créé et communiqué par Capfinfy. Il est expressément convenu que cette somme n'est ni un paiement, ni un frais, mais un simple dépôt entièrement et immédiatement remboursable. Étant donné que le compte Capfinfy du client ne peut initialement recevoir des fonds que de la part de Capfinfy, ce dépôt est une étape technique obligatoire. Le client doit suivre strictement les instructions fournies par Capfinfy pour effectuer ce dépôt. Une fois le dépôt reçu, le compte client sera activé pour les retraits, et le Débiteur pourra alors virer sans délai l'intégralité des fonds (incluant le montant du prêt et le dépôt de garantie) vers son compte bancaire personnel.",
            },
            solidarity: {
                title: "Article 4 : Solidarité et Indivisibilité",
                content: "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur.",
            },
            mention: {
                title: "Article 5 : Mention Manuscrite Obligatoire",
                instruction: "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
                content: "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'",
            },
            information: {
                title: "Article 6 : Informations dues",
                content: "Le Créancier s'engage à informer le Débiteur de toute modification du contrat.",
            },
        },
    },
    en: {
        header: {
            line1: "Legal and Guarantees Department",
            line2: "Commitments Department • Guarantee Formalization Unit",
        },
        title: "Solidarity Surety Bond for a Loan",
        reference: "Act No: {act_ref}",
        parties: {
            title: "Between the undersigned:",
            creditor_label: "The Creditor:",
            debtor_label: "The Debtor (Borrower):",
        },
        articles: {
            object: {
                title: "Article 1: Purpose of the Commitment",
                content: "By this act, the Debtor undertakes to pay the Creditor the sums due under the '{type_of_loan}' loan agreement referenced below:",
                acknowledgment: "The Debtor declares to have a perfect understanding of the nature and extent of his obligations.",
            },
            scope: {
                title: "Article 2: Scope of the Guarantee",
                content: "The Debtor's commitment covers the payment of the principal, interest, commissions, fees and accessories, and generally, all sums that may be due under the aforementioned loan agreement. The commitment is granted for the entire term of the loan.",
            },
            deposit: {
                title: "Article 3: Security Deposit and Account Activation",
                content: "To prove their ability to meet their commitments and for technical activation reasons, the Debtor agrees to make a security deposit of {deposit_amount}. This deposit must be made to a client account that will be specifically created and communicated by Capfinfy. It is expressly agreed that this sum is neither a payment nor a fee, but a simple, fully, and immediately refundable deposit. As the client's Capfinfy account can initially only receive funds from Capfinfy, this deposit is a mandatory technical step. The client must strictly follow the instructions provided by Capfinfy to make this deposit. Once the deposit is received, the client account will be activated for withdrawals, and the Debtor can then immediately transfer the entire funds (including the loan amount and the security deposit) to their personal bank account.",
            },
            solidarity: {
                title: "Article 4: Solidarity and Indivisibility",
                content: "The Debtor is solely responsible for the debt. In the event of default, the Creditor may claim the entire debt from the Debtor.",
            },
            mention: {
                title: "Article 5: Mandatory Handwritten Mention",
                instruction: "The Debtor must copy the following statement by hand, in accordance with the law:",
                content: "'I, {borrower_name}, undertake to repay the lender the sums due from my income and my assets.'",
            },
            information: {
                title: "Article 6: Information Due",
                content: "The Creditor undertakes to inform the Debtor of any modification to the contract.",
            },
        },
    },
    de: {
        header: {
            line1: "Rechts- und Garantieabteilung",
            line2: "Abteilung für Verpflichtungen • Abteilung für die Formalisierung von Garantien",
        },
        title: "Gesamtschuldnerische Bürgschaftsurkunde für ein Darlehen",
        reference: "Urkunde Nr.: {act_ref}",
        parties: {
            title: "Zwischen den Unterzeichnern:",
            creditor_label: "Der Gläubiger:",
            debtor_label: "Der Schuldner (Darlehensnehmer):",
        },
        articles: {
            object: {
                title: "Artikel 1: Gegenstand der Verpflichtung",
                content: "Mit dieser Urkunde verpflichtet sich der Schuldner, dem Gläubiger die aus dem nachstehend genannten '{type_of_loan}'-Darlehensvertrag geschuldeten Beträge zu zahlen:",
                acknowledgment: "Der Schuldner erklärt, die Art und den Umfang seiner Verpflichtungen vollständig zu kennen.",
            },
            scope: {
                title: "Artikel 2: Umfang der Garantie",
                content: "Die Verpflichtung des Schuldners erstreckt sich auf die Zahlung des Kapitals, der Zinsen, Provisionen, Gebühren und Nebenkosten sowie allgemein aller Beträge, die aus dem oben genannten Darlehensvertrag geschuldet werden könnten. Die Verpflichtung wird für die gesamte Laufzeit des Darlehens eingegangen.",
            },
            deposit: {
                title: "Artikel 3: Sicherheitsleistung und Kontoaktivierung",
                content: "Um seine Fähigkeit zur Erfüllung seiner Verpflichtungen nachzuweisen und aus technischen Aktivierungsgründen, verpflichtet sich der Schuldner, eine Sicherheitsleistung in Höhe von {deposit_amount} zu leisten. Diese Einzahlung muss auf ein Kundenkonto erfolgen, das ihm von Capfinfy speziell eingerichtet und mitgeteilt wird. Es wird ausdrücklich vereinbart, dass dieser Betrag weder eine Zahlung noch eine Gebühr ist, sondern eine einfache, vollständig und sofort erstattungsfähige Einlage. Da das Capfinfy-Konto des Kunden anfangs nur Gelder von Capfinfy empfangen kann, ist diese Einzahlung ein zwingender technischer Schritt. Der Kunde muss die von Capfinfy bereitgestellten Anweisungen zur Durchführung dieser Einzahlung strikt befolgen. Sobald die Einzahlung eingegangen ist, wird das Kundenkonto für Abhebungen aktiviert, und der Schuldner kann dann unverzüglich das gesamte Guthaben (einschließlich des Darlehensbetrags und der Sicherheitsleistung) auf sein persönliches Bankkonto überweisen.",
            },
            solidarity: {
                title: "Artikel 4: Gesamtschuldnerische Haftung und Unteilbarkeit",
                content: "Der Schuldner ist allein für die Schuld verantwortlich. Im Falle eines Ausfalls kann der Gläubiger die gesamte Schuld vom Schuldner einfordern.",
            },
            mention: {
                title: "Artikel 5: Obligatorischer handschriftlicher Vermerk",
                instruction: "Der Schuldner muss den folgenden Vermerk gemäß dem Gesetz handschriftlich kopieren:",
                content: "'Ich, {borrower_name}, verpflichte mich, dem Kreditgeber die auf meinen Einkünften und meinem Vermögen geschuldeten Beträge zurückzuzahlen.'",
            },
            information: {
                title: "Artikel 6: Geschuldete Informationen",
                content: "Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren.",
            },
        },
    }
};
