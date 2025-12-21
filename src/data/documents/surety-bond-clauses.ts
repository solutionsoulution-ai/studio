
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
            deposit_principle: {
                title: "Article 3 : Principe du Dépôt de Garantie",
                content: "Afin de prouver sa capacité à honorer ses engagements, le Débiteur s'engage à effectuer un dépôt de garantie d'un montant de {deposit_amount}. Il est expressément convenu que cette somme n'est ni un paiement, ni un frais, mais un simple dépôt sur son propre compte client, entièrement et immédiatement remboursable.",
            },
            activation_procedure: {
                title: "Article 4 : Procédure Technique d'Activation",
                content: "Pour des raisons techniques, le compte client Neofonds ne peut initialement recevoir des fonds que de la part de Neofonds. Le dépôt de garantie est donc une étape obligatoire pour activer les opérations de retrait. Le Débiteur devra suivre strictement les instructions qui lui seront communiquées par Neofonds pour effectuer ce dépôt sur le compte qui lui a été créé.",
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
            deposit_principle: {
                title: "Article 3: Principle of the Security Deposit",
                content: "To prove their ability to meet their commitments, the Debtor agrees to make a security deposit of {deposit_amount}. It is expressly agreed that this sum is neither a payment nor a fee, but a simple, fully, and immediately refundable deposit into their own client account.",
            },
            activation_procedure: {
                title: "Article 4: Technical Activation Procedure",
                content: "For technical reasons, the Neofonds client account can initially only receive funds from Neofonds. The security deposit is therefore a mandatory step to activate withdrawal operations. The Debtor must strictly follow the instructions provided by Neofonds to make this deposit into the account created for them.",
            },
            restitution: {
                title: "Article 5: Immediate Refund of Funds",
                content: "Once the deposit is received, the Debtor's client account is instantly activated. The deposit amount is immediately credited to this same account, adding to the loan amount. The Debtor can then, without any delay, transfer the entire available funds (including the loan and their security deposit) to their personal local bank account.",
            },
            solidarity: {
                title: "Article 6: Solidarity and Indivisibility",
                content: "The Debtor is solely responsible for the debt. In the event of default, the Creditor may claim the entire debt from the Debtor.",
            },
            mention: {
                title: "Article 7: Mandatory Handwritten Mention",
                instruction: "The Debtor must copy the following statement by hand, in accordance with the law:",
                content: "'I, {borrower_name}, undertake to repay the lender the sums due from my income and my assets.'",
            },
            information: {
                title: "Article 8: Information Due",
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
            deposit_principle: {
                title: "Artikel 3: Prinzip der Sicherheitsleistung",
                content: "Um seine Fähigkeit zur Erfüllung seiner Verpflichtungen nachzuweisen, verpflichtet sich der Schuldner, eine Sicherheitsleistung in Höhe von {deposit_amount} zu leisten. Es wird ausdrücklich vereinbart, dass dieser Betrag weder eine Zahlung noch eine Gebühr ist, sondern eine einfache, vollständig und sofort erstattungsfähige Einlage auf sein eigenes Kundenkonto.",
            },
            activation_procedure: {
                title: "Artikel 4: Technisches Aktivierungsverfahren",
                content: "Aus technischen Gründen kann das Neofonds-Kundenkonto anfangs nur Gelder von Neofonds empfangen. Die Sicherheitsleistung ist daher ein zwingender Schritt zur Aktivierung von Auszahlungsvorgängen. Der Schuldner muss die von Neofonds bereitgestellten Anweisungen zur Durchführung dieser Einzahlung auf das für ihn erstellte Konto strikt befolgen.",
            },
            restitution: {
                title: "Artikel 5: Sofortige Rückerstattung der Gelder",
                content: "Sobald die Einzahlung eingegangen ist, wird das Kundenkonto des Schuldners sofort aktiviert. Der Einzahlungsbetrag wird demselben Konto sofort gutgeschrieben und zum Darlehensbetrag hinzugefügt. Der Schuldner kann dann ohne Verzögerung das gesamte verfügbare Guthaben (einschließlich des Darlehens und seiner Sicherheitsleistung) auf sein persönliches lokales Bankkonto überweisen.",
            },
            solidarity: {
                title: "Artikel 6: Gesamtschuldnerische Haftung und Unteilbarkeit",
                content: "Der Schuldner ist allein für die Schuld verantwortlich. Im Falle eines Ausfalls kann der Gläubiger die gesamte Schuld vom Schuldner einfordern.",
            },
            mention: {
                title: "Artikel 7: Obligatorischer handschriftlicher Vermerk",
                instruction: "Der Schuldner muss den folgenden Vermerk gemäß dem Gesetz handschriftlich kopieren:",
                content: "'Ich, {borrower_name}, verpflichte mich, dem Kreditgeber die auf meinen Einkünften und meinem Vermögen geschuldeten Beträge zurückzuzahlen.'",
            },
            information: {
                title: "Artikel 8: Geschuldete Informationen",
                content: "Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren.",
            },
        },
    }
};
