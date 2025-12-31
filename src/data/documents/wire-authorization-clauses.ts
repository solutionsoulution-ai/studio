
import type { Clauses } from "./languages";

export const wireAuthorizationClauses = (companyName: string): Clauses => ({
    fr: {
        header: {
            line1: "Service Financier",
            line2: "Unité des Opérations de Paiement",
        },
        title: "Certificat d'Autorisation de Virement",
        reference: "Autorisation N°: {ref}",
        date: "Date d'émission: {date}",
        parties: {
            issuer_label: "Émetteur de l'ordre de virement :",
            beneficiary_label: "Bénéficiaire du virement :",
        },
        articles: {
            authorization: {
                title: "Article 1 : Ordre de Virement",
                content: `Par la présente, ${companyName}, agissant en qualité de prêteur dans le cadre du contrat de prêt N° {loan_contract_ref}, autorise et ordonne irrévocablement le virement de la somme de {loan_amount} ({loan_amount_in_words}) au bénéfice de {borrower_name}.`,
            },
            bank_details: {
                title: "Article 2 : Coordonnées Bancaires du Bénéficiaire",
                bank_name_label: "Nom de la banque",
                account_holder_label: "Titulaire du compte",
                iban_label: "IBAN",
                bic_swift_label: "Code BIC / SWIFT",
            },
            source_of_funds: {
                title: "Article 3 : Déclaration sur l'Origine des Fonds",
                content: `${companyName} déclare que les fonds objet du présent virement proviennent de ses activités commerciales légitimes et de ses capitaux propres, en pleine conformité avec la réglementation en vigueur.`,
            },
            aml_compliance: {
                title: "Article 4 : Conformité Anti-Blanchiment (LCB-FT)",
                content: `Cette opération a fait l'objet de toutes les diligences requises en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme (LCB-FT), conformément à la Directive (UE) 2015/849. ${companyName} atteste que les fonds ne proviennent pas d'activités illicites et sont tracés dans sa comptabilité.`,
            },
            execution: {
                title: "Article 5 : Exécution",
                content: `Ce virement sera exécuté dans les plus brefs délais à compter de la date de la présente autorisation. Ce document fait foi et peut être présenté à toute autorité compétente comme preuve de l'instruction de paiement et de la déclaration de conformité.`,
            },
        },
    },
    en: {
        header: {
            line1: "Financial Service",
            line2: "Payment Operations Unit",
        },
        title: "Wire Transfer Authorization Certificate",
        reference: "Authorization No: {ref}",
        date: "Issue Date: {date}",
        parties: {
            issuer_label: "Issuer of the transfer order:",
            beneficiary_label: "Beneficiary of the transfer:",
        },
        articles: {
            authorization: {
                title: "Article 1: Transfer Order",
                content: `Hereby, ${companyName}, acting as lender under the loan agreement No. {loan_contract_ref}, irrevocably authorizes and orders the transfer of the sum of {loan_amount} ({loan_amount_in_words}) to the benefit of {borrower_name}.`,
            },
            bank_details: {
                title: "Article 2: Beneficiary's Bank Details",
                bank_name_label: "Bank Name",
                account_holder_label: "Account Holder",
                iban_label: "IBAN",
                bic_swift_label: "BIC / SWIFT Code",
            },
            source_of_funds: {
                title: "Article 3: Declaration on the Origin of Funds",
                content: `${companyName} declares that the funds subject to this transfer originate from its legitimate business activities and equity, in full compliance with current regulations.`,
            },
            aml_compliance: {
                title: "Article 4: Anti-Money Laundering (AML) Compliance",
                content: `This operation has been subject to all required due diligence regarding the fight against money laundering and terrorist financing (AML/CFT), in accordance with Directive (EU) 2015/849. ${companyName} certifies that the funds do not originate from illicit activities and are traced in its accounting.`,
            },
            execution: {
                title: "Article 5: Execution",
                content: `This transfer will be executed as soon as possible from the date of this authorization. This document serves as proof and may be presented to any competent authority as evidence of the payment instruction and compliance declaration.`,
            },
        },
    },
    de: {},
    lt: {},
    nl: {},
});

    