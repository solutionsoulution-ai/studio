
import type { Clauses } from "./languages";

export const suretyBondClauses: Clauses = {
    fr: {
        header: {
            line1: "Service Juridique et des Garanties",
            line2: "Département des Engagements • Unité de Formalisation des Garanties",
        },
        title: "Acte de Cautionnement Solidaire pour un {type_of_loan}",
        reference: "Acte N°: {act_ref}",
        parties: {
            title: "Entre les soussignés :",
            creditor_label: "Le Créancier :",
            debtor_label: "Le Débiteur (Emprunteur) :",
        },
        articles: {
            object: {
                title: "Article 1 : Objet de l'engagement",
                content: "Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de {type_of_loan} référencé ci-dessous :",
                acknowledgment: "Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations.",
            },
            scope: {
                title: "Article 2 : Étendue de la garantie",
                content: "L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt.",
            },
            solidarity: {
                title: "Article 3 : Solidarité et Indivisibilité",
                content: "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur.",
            },
            mention: {
                title: "Article 4 : Mention Manuscrite Obligatoire",
                instruction: "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
                content: "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'",
            },
            information: {
                title: "Article 5 : Informations dues",
                content: "Le Créancier s'engage à informer le Débiteur de toute modification du contrat.",
            },
        },
    },
    en: {
       // English translations
    },
    de: {
        header: {
            line1: "Rechts- und Garantieabteilung",
            line2: "Abteilung für Verpflichtungen • Abteilung für die Formalisierung von Garantien",
        },
        title: "Gesamtschuldnerische Bürgschaftsurkunde für ein {type_of_loan}",
        reference: "Urkunde Nr.: {act_ref}",
        parties: {
            title: "Zwischen den Unterzeichnern:",
            creditor_label: "Der Gläubiger:",
            debtor_label: "Der Schuldner (Darlehensnehmer):",
        },
        articles: {
            object: {
                title: "Artikel 1: Gegenstand der Verpflichtung",
                content: "Mit dieser Urkunde verpflichtet sich der Schuldner, dem Gläubiger die aus dem nachstehend genannten {type_of_loan}-Vertrag geschuldeten Beträge zu zahlen:",
                acknowledgment: "Der Schuldner erklärt, die Art und den Umfang seiner Verpflichtungen vollständig zu kennen.",
            },
            scope: {
                title: "Artikel 2: Umfang der Garantie",
                content: "Die Verpflichtung des Schuldners erstreckt sich auf die Zahlung des Kapitals, der Zinsen, Provisionen, Gebühren und Nebenkosten sowie allgemein aller Beträge, die aus dem oben genannten Darlehensvertrag geschuldet werden könnten. Die Verpflichtung wird für die gesamte Laufzeit des Darlehens eingegangen.",
            },
            solidarity: {
                title: "Artikel 3: Gesamtschuldnerische Haftung und Unteilbarkeit",
                content: "Der Schuldner ist allein für die Schuld verantwortlich. Im Falle eines Ausfalls kann der Gläubiger die gesamte Schuld vom Schuldner einfordern.",
            },
            mention: {
                title: "Artikel 4: Obligatorischer handschriftlicher Vermerk",
                instruction: "Der Schuldner muss den folgenden Vermerk gemäß dem Gesetz handschriftlich kopieren:",
                content: "'Ich, {borrower_name}, verpflichte mich, dem Kreditgeber die auf meinen Einkünften und meinem Vermögen geschuldeten Beträge zurückzuzahlen.'",
            },
            information: {
                title: "Artikel 5: Geschuldete Informationen",
                content: "Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren.",
            },
        },
    }
};
