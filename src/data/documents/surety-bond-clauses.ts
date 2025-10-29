
import type { Clauses } from "./languages";

export const suretyBondClauses: Clauses = {
    fr: {
      "title": "Acte de Cautionnement Solidaire",
      "department": "Département Juridique & Garanties",
      "reference": "Référence : {ref}",
      "importance": {
        "title": "Importance de ce document",
        "description": "Cet acte engage une personne (la caution) à payer la dette d'un débiteur si celui-ci ne le fait pas. C'est une garantie forte pour le créancier et un engagement juridique et financier très important pour la caution, qui met en jeu ses revenus et son patrimoine."
      },
      "parties": { "lender_label": "Le Créancier :", "borrower_label": "Le Débiteur Principal :", "guarantor_label": "La Caution :" },
      "preamble": "Le présent acte est établi en application des dispositions du Code civil relatives au cautionnement. La Caution reconnaît avoir été informée de la nature et de l'étendue de son engagement.",
      "articles": {
          "commitment": { "title": "ARTICLE 1 : ENGAGEMENT DE LA CAUTION", "content": "La Caution, {guarantor_name}, déclare par les présentes se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt d'un montant de {loan_amount} consenti par le Créancier, {lender_name}, selon contrat de prêt en date de ce jour." },
          "scope": { "title": "ARTICLE 3 : ÉTENDUE DE LA GARANTIE", "content": "L'engagement de la Caution porte sur le paiement du principal, des intérêts conventionnels et moratoires, des commissions, frais et accessoires, dans la limite maximale de {loan_amount} majoré de cinquante pourcent (50%) pour couvrir les accessoires. La caution déclare expressément renoncer aux bénéfices de discussion (obligeant le créancier à poursuivre d'abord le débiteur) et de division (permettant de diviser la dette entre plusieurs cautions)." },
          "duration": { "title": "ARTICLE 4: DURÉE DE L'ENGAGEMENT", "content": "Le présent cautionnement est consenti pour toute la durée du prêt principal et de ses suites, et se terminera uniquement après l'extinction complète de toutes les sommes dues par le Débiteur Principal au Créancier."}
      },
      "handwritten_mention": {
          "title": "ARTICLE 6 : MENTION MANUSCRITE OBLIGATOIRE (Art. L. 343-2 du Code de la consommation)",
          "instruction": "(La caution doit recopier intégralement et de sa main le texte suivant, sans omission ni rature)",
          "content": "En me portant caution de {borrower_name} dans la limite de la somme de {loan_amount} ({loan_amount_in_words}) couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de l'engagement, je m'engage à rembourser au prêteur, {lender_name}, les sommes dues sur mes revenus et mes biens si {borrower_name} n'y satisfait pas lui-même."
      },
      "signature_preamble": "Fait à {location}, le {date}, en un exemplaire original remis à la Caution après signature."
  },
  en: {
        "title": "Joint and Several Guarantee",
        "department": "Legal & Guarantees Department",
        "reference": "Reference: {ref}",
        "importance": {
            "title": "Importance of this document",
            "description": "This act commits a person (the guarantor) to pay a debtor's debt if the debtor fails to do so. It is a strong guarantee for the creditor and a very significant legal and financial commitment for the guarantor, involving their income and assets."
        },
        "parties": { "lender_label": "The Creditor:", "borrower_label": "The Principal Debtor:", "guarantor_label": "The Guarantor:" },
        "preamble": "This act is established in application of the provisions of the Civil Code relating to guarantees. The Guarantor acknowledges having been informed of the nature and extent of their commitment.",
        "articles": {
            "commitment": { "title": "ARTICLE 1: GUARANTOR'S COMMITMENT", "content": "The Guarantor, {guarantor_name}, hereby declares to act as a joint and several guarantor for the Debtor, {borrower_name}, for the repayment of the loan in the amount of {loan_amount} granted by the Creditor, {lender_name}, according to the loan agreement dated today." },
            "scope": { "title": "ARTICLE 3: SCOPE OF THE GUARANTEE", "content": "The Guarantor's commitment covers the payment of the principal, conventional and default interest, commissions, fees, and incidentals, up to the maximum limit of {loan_amount} increased by fifty percent (50%) to cover accessories. The guarantor expressly declares to waive the benefits of discussion (requiring the creditor to first pursue the debtor) and division (allowing the debt to be divided among several guarantors)." },
            "duration": { "title": "ARTICLE 4: DURATION OF COMMITMENT", "content": "This guarantee is granted for the entire duration of the main loan and its consequences, and will only terminate after the complete extinction of all sums owed by the Principal Debtor to the Creditor."}
        },
        "handwritten_mention": {
            "title": "ARTICLE 6: MANDATORY HANDWRITTEN MENTION (Art. L. 343-2 of the Consumer Code)",
            "instruction": "(The guarantor must handwrite the following text in full, without omission or alteration)",
            "content": "By acting as a guarantor for {borrower_name} up to the sum of {loan_amount} ({loan_amount_in_words}) covering the payment of principal, interest and, where applicable, penalties or late payment interest and for the duration of the commitment, I undertake to reimburse the lender, {lender_name}, the sums due on my income and my property if {borrower_name} does not satisfy them himself."
        },
        "signature_preamble": "Done at {location}, on {date}, in one original copy given to the Guarantor after signing."
    }
};
