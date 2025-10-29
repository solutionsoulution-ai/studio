
import type { Clauses } from "./languages";

export const suretyBondClauses: Clauses = {
    fr: {
      "title": "Acte de Cautionnement Solidaire",
      "department": "Département Juridique & Garanties",
      "reference": "Référence : {ref}",
      "importance": {
        "title": "Importance de ce document",
        "description": "Cet acte engage une personne (la caution) à payer la dette d'un débiteur si celui-ci ne le fait pas. C'est une garantie forte pour le créancier et un engagement très important pour la caution."
      },
      "parties": { "lender_label": "Le Créancier :", "borrower_label": "Le Débiteur Principal :", "guarantor_label": "La Caution :" },
      "articles": {
          "commitment": { "title": "ARTICLE 1 : ENGAGEMENT DE LA CAUTION", "content": "La Caution, {guarantor_name}, déclare se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt consenti par {lender_name}." },
          "scope": { "title": "ARTICLE 3 : ÉTENDUE DE LA GARANTIE", "content": "L'engagement porte sur le principal, intérêts, et frais, dans la limite de {loan_amount} majoré des accessoires. La caution déclare renoncer aux bénéfices de discussion et de division." }
      },
      "handwritten_mention": {
          "title": "ARTICLE 6 : MENTION MANUSCRITE OBLIGATOIRE",
          "instruction": "(La caution doit recopier de sa main le texte suivant)",
          "content": "En me portant caution de {borrower_name} dans la limite de la somme de {loan_amount} ({loan_amount_in_words}) couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de l'engagement, je m'engage à rembourser au prêteur, {lender_name}, les sommes dues sur mes revenus et mes biens si {borrower_name} n'y satisfait pas lui-même."
      },
      "signature_preamble": "Fait à {location}, le {date}."
  },
  en: {
        "title": "Joint and Several Guarantee",
        "department": "Legal & Guarantees Department",
        "reference": "Reference: {ref}",
        "importance": {
            "title": "Importance of this document",
            "description": "This act commits a person (the guarantor) to pay a debtor's debt if the debtor fails to do so. It is a strong guarantee for the creditor and a very important commitment for the guarantor."
        },
        "parties": { "lender_label": "The Creditor:", "borrower_label": "The Principal Debtor:", "guarantor_label": "The Guarantor:" },
        "articles": {
            "commitment": { "title": "ARTICLE 1: GUARANTOR'S COMMITMENT", "content": "The Guarantor, {guarantor_name}, hereby declares to act as a joint and several guarantor for the Debtor, {borrower_name}, for the repayment of the loan granted by {lender_name}." },
            "scope": { "title": "ARTICLE 3: SCOPE OF THE GUARANTEE", "content": "The commitment covers the principal, interest, and costs, up to the limit of {loan_amount} plus incidentals. The guarantor declares to waive the benefits of discussion and division." }
        },
        "handwritten_mention": {
            "title": "ARTICLE 6: MANDATORY HANDWRITTEN MENTION",
            "instruction": "(The guarantor must handwrite the following text)",
            "content": "By acting as a guarantor for {borrower_name} up to the sum of {loan_amount} ({loan_amount_in_words}) covering the payment of principal, interest and, where applicable, penalties or late payment interest and for the duration of the commitment, I undertake to reimburse the lender, {lender_name}, the sums due on my income and my property if {borrower_name} does not satisfy them himself."
        },
        "signature_preamble": "Done at {location}, on {date}."
    }
};
