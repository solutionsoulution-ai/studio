
import type { Clauses } from "./languages";

export const paymentReceiptClauses: Clauses = {
    fr: {
        title: "Reçu de Paiement",
        header: {
            line1: "Service Comptabilité",
            line2: "Unité de Suivi des Règlements",
        },
        reference: "Reçu N°: {ref}",
        date: "Date du paiement: {payment_date}",
        received_from: "Reçu de :",
        payment_details: {
            title: "Détails du Paiement",
            amount_label: "Montant Reçu",
            method_label: "Méthode de Paiement",
            reference_label: "Pour la référence suivante",
        },
        confirmation: {
            title: "Confirmation",
            content: "Nous soussignés, Capfinfy, confirmons par la présente avoir reçu la somme susmentionnée. Ce reçu atteste du règlement partiel ou total de la créance référencée. Sauf erreur ou omission, ce paiement solde le montant dû.",
        },
        signature_label: "Pour Capfinfy, Service Comptabilité",
    },
    en: {
        title: "Payment Receipt",
        header: {
            line1: "Accounting Department",
            line2: "Payment Tracking Unit",
        },
        reference: "Receipt No: {ref}",
        date: "Payment Date: {payment_date}",
        received_from: "Received from:",
        payment_details: {
            title: "Payment Details",
            amount_label: "Amount Received",
            method_label: "Payment Method",
            reference_label: "For the following reference",
        },
        confirmation: {
            title: "Confirmation",
            content: "We, the undersigned, Capfinfy, hereby confirm receipt of the aforementioned sum. This receipt serves as proof of partial or total settlement of the referenced debt. Barring errors or omissions, this payment settles the amount due.",
        },
        signature_label: "For Capfinfy, Accounting Department",
    }
};
