
import type { Clauses } from "./languages";

export const loanContractClauses: Clauses = {
    fr: {
        title: "CONTRAT DE PRÊT PERSONNEL",
        department: "Département Juridique & Financier",
        reference: "Référence du contrat : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "Le contrat de prêt est le document juridique fondamental qui formalise les engagements entre le prêteur et l'emprunteur. Il détaille les conditions, les modalités de remboursement, les droits et les devoirs de chaque partie. Sa signature est un acte engageant qui sécurise la transaction et sert de référence légale en cas de litige."
        },
        parties: {
            title: "ENTRE LES SOUSSIGNÉS",
            lender: "LE PRÊTEUR :",
            borrower: "L'EMPRUNTEUR :",
        },
        preamble: "Il a été convenu et arrêté ce qui suit :",
        articles: {
            object: {
                title: "ARTICLE 1 : OBJET DU PRÊT",
                content: "Le Prêteur, {lender_name}, consent par les présentes à l'Emprunteur, {borrower_name}, qui accepte, un prêt d'un montant total de {loan_amount} ({loan_amount_in_words}), mis à disposition en date du {loan_date}."
            },
            usage: {
                title: "ARTICLE 2 : USAGE DES FONDS",
                content: "L'Emprunteur déclare utiliser les fonds pour le financement de son projet. Toute utilisation des fonds pour un autre objet devra faire l'objet d'un accord écrit du Prêteur."
            },
            interest: {
                title: "ARTICLE 3 : TAUX D'INTÉRÊT",
                content: "Ce prêt est consenti à un taux d'intérêt annuel fixe et nominal de {interest_rate}%."
            },
            repayment: {
                title: "ARTICLE 4 : DURÉE ET MODALITÉS DE REMBOURSEMENT",
                content: "Le prêt est remboursable en {loan_term_months} mensualités constantes de {monthly_payment} chacune, incluant capital et intérêts. La première échéance interviendra le {repayment_start_date}. Les paiements suivants seront effectués à la même date chaque mois jusqu'à remboursement complet du capital et des intérêts."
            },
            early_repayment: {
                title: "ARTICLE 5 : REMBOURSEMENT ANTICIPÉ",
                content: "L'Emprunteur a le droit de rembourser par anticipation tout ou partie du prêt à tout moment, sans pénalité. L'Emprunteur devra notifier le Prêteur de son intention par écrit au moins 30 jours avant la date du remboursement anticipé."
            },
            late_payment: {
                title: "ARTICLE 6 : PÉNALITÉS DE RETARD",
                content: "Tout retard de paiement d'une échéance entraînera, après une mise en demeure restée infructueuse pendant 10 jours, l'application de pénalités de retard calculées sur la base d'un taux égal à 1,5 fois le taux d'intérêt légal en vigueur, sur les sommes dues."
            },
            default: {
                title: "ARTICLE 7 : DÉFAUT DE PAIEMENT",
                content: "En cas de non-paiement de deux (2) échéances consécutives, et 15 jours après une mise en demeure par lettre recommandée avec accusé de réception restée sans effet, la totalité des sommes dues (capital restant dû, intérêts et pénalités) deviendra immédiatement exigible. Le Prêteur se réserve le droit d'engager toute poursuite judiciaire nécessaire au recouvrement de sa créance."
            },
            borrower_obligations: {
                title: "ARTICLE 8 : OBLIGATIONS DE L'EMPRUNTEUR",
                content: "L'Emprunteur s'engage à :\n- Fournir des informations exactes et complètes lors de la demande de prêt.\n- Notifier le Prêteur de tout changement de situation personnelle (adresse, situation professionnelle, etc.) dans un délai de 30 jours.\n- Ne pas souscrire d'autre prêt susceptible de compromettre sa capacité de remboursement sans en informer le Prêteur."
            },
            confidentiality: {
                title: "ARTICLE 9 : CONFIDENTIALITÉ",
                content: "Les Parties s'engagent à conserver la confidentialité la plus stricte sur les termes du présent contrat et sur toutes les informations échangées dans le cadre de son exécution. Cette obligation de confidentialité survivra à l'expiration du contrat."
            },
            jurisdiction: {
                title: "ARTICLE 10 : LOI APPLICABLE ET JURIDICTION",
                content: "Le présent contrat est soumis au droit français. Tout litige relatif à son interprétation ou à son exécution, qui ne pourrait être résolu à l'amiable, sera de la compétence exclusive des tribunaux de Lyon."
            }
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires originaux, dont un pour chaque partie.",
        lender_title: "Directeur Général",
        borrower_signature_instruction: "(Lu et approuvé)",
    },
    en: {
        title: "PERSONAL LOAN AGREEMENT",
        department: "Legal & Financial Department",
        reference: "Contract Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "The loan agreement is the fundamental legal document that formalizes the commitments between the lender and the borrower. It details the conditions, repayment terms, and the rights and duties of each party. Its signature is a binding act that secures the transaction and serves as a legal reference in case of dispute."
        },
        parties: {
            title: "BETWEEN THE UNDERSIGNED",
            lender: "THE LENDER:",
            borrower: "THE BORROWER:",
        },
        preamble: "The following has been agreed and concluded:",
        articles: {
            object: {
                title: "ARTICLE 1: PURPOSE OF THE LOAN",
                content: "The Lender, {lender_name}, hereby grants to the Borrower, {borrower_name}, who accepts, a loan in the total amount of {loan_amount} ({loan_amount_in_words}), made available on {loan_date}."
            },
            usage: {
                title: "ARTICLE 2: USE OF FUNDS",
                content: "The Borrower declares that the funds will be used for financing their project. Any use of the funds for another purpose must be approved in writing by the Lender."
            },
            interest: {
                title: "ARTICLE 3: INTEREST RATE",
                content: "This loan is granted at a fixed nominal annual interest rate of {interest_rate}%."
            },
            repayment: {
                title: "ARTICLE 4: TERM AND REPAYMENT TERMS",
                content: "The loan is repayable in {loan_term_months} constant monthly installments of {monthly_payment} each, including principal and interest. The first installment will be due on {repayment_start_date}. Subsequent payments will be made on the same date each month until the principal and interest are fully repaid."
            },
            early_repayment: {
                title: "ARTICLE 5: EARLY REPAYMENT",
                content: "The Borrower has the right to repay all or part of the loan early at any time, without penalty. The Borrower must notify the Lender of their intention in writing at least 30 days before the early repayment date."
            },
            late_payment: {
                title: "ARTICLE 6: LATE PAYMENT PENALTIES",
                content: "Any delay in payment of an installment will result, after a formal notice has remained unsuccessful for 10 days, in the application of late payment penalties calculated at a rate equal to 1.5 times the legal interest rate in force, on the amounts due."
            },
            default: {
                title: "ARTICLE 7: DEFAULT",
                content: "In the event of non-payment of two (2) consecutive installments, and 15 days after a formal notice by registered letter with acknowledgment of receipt has been without effect, the entire amount due (outstanding principal, interest, and penalties) will become immediately due and payable. The Lender reserves the right to take any necessary legal action to recover its debt."
            },
            borrower_obligations: {
                title: "ARTICLE 8: BORROWER'S OBLIGATIONS",
                content: "The Borrower agrees to:\n- Provide accurate and complete information when applying for the loan.\n- Notify the Lender of any change in personal situation (address, professional situation, etc.) within 30 days.\n- Not to take out another loan likely to compromise their repayment capacity without informing the Lender."
            },
            confidentiality: {
                title: "ARTICLE 9: CONFIDENTIALITY",
                content: "The Parties undertake to maintain the strictest confidentiality regarding the terms of this contract and all information exchanged in the course of its execution. This confidentiality obligation will survive the expiration of the contract."
            },
            jurisdiction: {
                title: "ARTICLE 10: APPLICABLE LAW AND JURISDICTION",
                content: "This contract is subject to French law. Any dispute relating to its interpretation or execution, which cannot be resolved amicably, will be under the exclusive jurisdiction of the courts of Lyon."
            }
        },
        signature_preamble: "Done at {location}, on {date}, in two original copies, one for each party.",
        lender_title: "CEO",
        borrower_signature_instruction: "(Read and approved)",
    },
    de: {
        title: "PRIVATDARLEHENSVERTRAG",
        department: "Rechts- und Finanzabteilung",
        reference: "Vertragsnummer: {ref}",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Der Darlehensvertrag ist das grundlegende Rechtsdokument, das die Verpflichtungen zwischen dem Darlehensgeber und dem Darlehensnehmer formalisiert. Er enthält die Bedingungen, Rückzahlungsmodalitäten sowie die Rechte und Pflichten jeder Partei. Seine Unterzeichnung ist ein verbindlicher Akt, der die Transaktion absichert und im Streitfall als rechtliche Referenz dient."
        },
        parties: {
            title: "ZWISCHEN DEN UNTERZEICHNENDEN",
            lender: "DER DARLEHENSGEBER:",
            borrower: "DER DARLEHENSNEHMER:",
        },
        preamble: "Es wurde Folgendes vereinbart und beschlossen:",
        articles: {
            object: {
                title: "ARTIKEL 1: GEGENSTAND DES DARLEHENS",
                content: "Der Darlehensgeber, {lender_name}, gewährt hiermit dem Darlehensnehmer, {borrower_name}, der annimmt, ein Darlehen in Höhe von insgesamt {loan_amount} ({loan_amount_in_words}), das am {loan_date} zur Verfügung gestellt wird."
            },
            usage: {
                title: "ARTIKEL 2: VERWENDUNG DER MITTEL",
                content: "Der Darlehensnehmer erklärt, die Mittel zur Finanzierung seines Projekts zu verwenden. Jede Verwendung der Mittel für einen anderen Zweck bedarf der schriftlichen Zustimmung des Darlehensgebers."
            },
            interest: {
                title: "ARTIKEL 3: ZINSSATZ",
                content: "Dieses Darlehen wird zu einem festen nominalen Jahreszinssatz von {interest_rate}% gewährt."
            },
            repayment: {
                title: "ARTIKEL 4: LAUFZEIT UND RÜCKZAHLUNGSMODALITÄTEN",
                content: "Das Darlehen ist in {loan_term_months} konstanten monatlichen Raten von je {monthly_payment} zurückzuzahlen, einschließlich Kapital und Zinsen. Die erste Rate ist am {repayment_start_date} fällig. Die folgenden Zahlungen erfolgen am selben Tag jedes Monats bis zur vollständigen Rückzahlung von Kapital und Zinsen."
            },
            early_repayment: {
                title: "ARTIKEL 5: VORZEITIGE RÜCKZAHLUNG",
                content: "Der Darlehensnehmer hat das Recht, das Darlehen jederzeit ganz oder teilweise ohne Vertragsstrafe vorzeitig zurückzuzahlen. Der Darlehensnehmer muss den Darlehensgeber mindestens 30 Tage vor dem Datum der vorzeitigen Rückzahlung schriftlich über seine Absicht informieren."
            },
            late_payment: {
                title: "ARTIKEL 6: VERZUGSSTRAFEN",
                content: "Jeder Zahlungsverzug einer Rate führt nach einer erfolglosen Mahnung von 10 Tagen zur Anwendung von Verzugsstrafen, die auf der Grundlage eines Satzes von 1,5-mal des gesetzlichen Zinssatzes auf die geschuldeten Beträge berechnet werden."
            },
            default: {
                title: "ARTIKEL 7: ZAHLUNGSAUSFALL",
                content: "Im Falle der Nichtzahlung von zwei (2) aufeinanderfolgenden Raten und 15 Tage nach einer erfolglosen Mahnung per Einschreiben mit Rückschein wird der gesamte geschuldete Betrag (Restkapital, Zinsen und Strafen) sofort fällig. Der Darlehensgeber behält sich das Recht vor, alle notwendigen rechtlichen Schritte zur Eintreibung seiner Forderung einzuleiten."
            },
            borrower_obligations: {
                title: "ARTIKEL 8: PFLICHTEN DES DARLEHENSNEHMERS",
                content: "Der Darlehensnehmer verpflichtet sich:\n- Genaue und vollständige Informationen bei der Beantragung des Darlehens anzugeben.\n- Den Darlehensgeber über jede Änderung der persönlichen Situation (Adresse, berufliche Situation usw.) innerhalb von 30 Tagen zu informieren.\n- Keinen weiteren Kredit aufzunehmen, der seine Rückzahlungsfähigkeit beeinträchtigen könnte, ohne den Darlehensgeber zu informieren."
            },
            confidentiality: {
                title: "ARTIKEL 9: VERTRAULICHKEIT",
                content: "Die Parteien verpflichten sich, strengste Vertraulichkeit über die Bedingungen dieses Vertrages und alle im Rahmen seiner Ausführung ausgetauschten Informationen zu wahren. Diese Vertraulichkeitspflicht besteht auch nach Beendigung des Vertrages fort."
            },
            jurisdiction: {
                title: "ARTIKEL 10: ANWENDBARES RECHT UND GERICHTSSTAND",
                content: "Dieser Vertrag unterliegt französischem Recht. Alle Streitigkeiten im Zusammenhang mit seiner Auslegung oder Ausführung, die nicht gütlich beigelegt werden können, unterliegen der ausschließlichen Zuständigkeit der Gerichte von Lyon."
            }
        },
        signature_preamble: "Ausgefertigt in {location}, am {date}, in zwei Originalexemplaren, eines für jede Partei.",
        lender_title: "Geschäftsführer",
        borrower_signature_instruction: "(Gelesen und genehmigt)",
    },
    es: {
        title: "CONTRATO DE PRÉSTAMO PERSONAL",
        department: "Departamento Legal y Financiero",
        reference: "Referencia del contrato: {ref}",
        importance: {
            title: "Importancia de este documento",
            description: "El contrato de préstamo es el documento legal fundamental que formaliza los compromisos entre el prestamista y el prestatario. Detalla las condiciones, los plazos de devolución y los derechos y deberes de cada parte. Su firma es un acto vinculante que asegura la transacción y sirve como referencia legal en caso de disputa."
        },
        parties: {
            title: "ENTRE LOS ABAJO FIRMANTES",
            lender: "EL PRESTAMISTA:",
            borrower: "EL PRESTATARIO:",
        },
        preamble: "Se ha convenido y acordado lo siguiente:",
        articles: {
            object: {
                title: "ARTÍCULO 1: OBJETO DEL PRÉSTAMO",
                content: "El Prestamista, {lender_name}, por la presente concede al Prestatario, {borrower_name}, quien acepta, un préstamo por un importe total de {loan_amount} ({loan_amount_in_words}), puesto a disposición en la fecha {loan_date}."
            },
            usage: {
                title: "ARTÍCULO 2: USO DE LOS FONDOS",
                content: "El Prestatario declara que utilizará los fondos para la financiación de su proyecto. Cualquier uso de los fondos para otro propósito deberá ser aprobado por escrito por el Prestamista."
            },
            interest: {
                title: "ARTÍCULO 3: TIPO DE INTERÉS",
                content: "Este préstamo se concede a un tipo de interés anual nominal fijo del {interest_rate}%."
            },
            repayment: {
                title: "ARTÍCULO 4: DURACIÓN Y CONDICIONES DE REEMBOLSO",
                content: "El préstamo es reembolsable en {loan_term_months} cuotas mensuales constantes de {monthly_payment} cada una, incluyendo capital e intereses. La primera cuota vencerá el {repayment_start_date}. Los pagos posteriores se realizarán en la misma fecha de cada mes hasta el reembolso total del capital y los intereses."
            },
            early_repayment: {
                title: "ARTÍCULO 5: REEMBOLSO ANTICIPADO",
                content: "El Prestatario tiene derecho a reembolsar anticipadamente la totalidad o parte del préstamo en cualquier momento, sin penalización. El Prestatario deberá notificar al Prestamista su intención por escrito al menos 30 días antes de la fecha del reembolso anticipado."
            },
            late_payment: {
                title: "ARTÍCulo 6: PENALIZACIONES POR DEMORA",
                content: "Cualquier retraso en el pago de una cuota dará lugar, tras un requerimiento formal que no haya sido atendido en 10 días, a la aplicación de penalizaciones por demora calculadas a un tipo igual a 1,5 veces el tipo de interés legal vigente, sobre las cantidades adeudadas."
            },
            default: {
                title: "ARTÍCULO 7: INCUMPLIMIENTO DE PAGO",
                content: "En caso de impago de dos (2) cuotas consecutivas, y 15 días después de un requerimiento formal por carta certificada con acuse de recibo que no haya surtido efecto, la totalidad de las sumas adeudadas (capital pendiente, intereses y penalizaciones) será inmediatamente exigible. El Prestamista se reserva el derecho de iniciar cualquier acción legal necesaria para el cobro de su deuda."
            },
            borrower_obligations: {
                title: "ARTÍCULO 8: OBLIGACIONES DEL PRESTATARIO",
                content: "El Prestatario se compromete a:\n- Proporcionar información precisa y completa al solicitar el préstamo.\n- Notificar al Prestamista cualquier cambio en su situación personal (domicilio, situación profesional, etc.) en un plazo de 30 días.\n- No contratar otro préstamo que pueda comprometer su capacidad de reembolso sin informar al Prestamista."
            },
            confidentiality: {
                title: "ARTÍCULO 9: CONFIDENCIALIDAD",
                content: "Las Partes se comprometen a mantener la más estricta confidencialidad sobre los términos de este contrato y toda la información intercambiada en el curso de su ejecución. Esta obligación de confidencialidad sobrevivirá a la expiración del contrato."
            },
            jurisdiction: {
                title: "ARTÍCULO 10: LEY APLICABLE Y JURISDICCIÓN",
                content: "Este contrato está sujeto a la legislación francesa. Cualquier litigio relativo a su interpretación o ejecución, que no pueda resolverse amistosamente, será competencia exclusiva de los tribunales de Lyon."
            }
        },
        signature_preamble: "Hecho en {location}, el {date}, en dos ejemplares originales, uno para cada parte.",
        lender_title: "Director General",
        borrower_signature_instruction: "(Leído y aprobado)",
    },
    pt: {
        title: "CONTRATO DE EMPRÉSTIMO PESSOAL",
        department: "Departamento Jurídico e Financeiro",
        reference: "Referência do contrato: {ref}",
        importance: {
            title: "Importância deste documento",
            description: "O contrato de empréstimo é o documento legal fundamental que formaliza os compromissos entre o mutuante e o mutuário. Detalha as condições, os termos de reembolso e os direitos e deveres de cada parte. A sua assinatura é um ato vinculativo que garante a transação e serve de referência legal em caso de litígio."
        },
        parties: {
            title: "ENTRE OS ABAIXO-ASSINADOS",
            lender: "O MUTUANTE:",
            borrower: "O MUTUÁRIO:",
        },
        preamble: "Ficou acordado e estabelecido o seguinte:",
        articles: {
            object: {
                title: "ARTIGO 1: OBJETO DO EMPRÉSTIMO",
                content: "O Mutuante, {lender_name}, concede pelo presente ao Mutuário, {borrower_name}, que aceita, um empréstimo no montante total de {loan_amount} ({loan_amount_in_words}), disponibilizado na data de {loan_date}."
            },
            usage: {
                title: "ARTIGO 2: UTILIZAÇÃO DOS FUNDOS",
                content: "O Mutuário declara utilizar os fundos para o financiamento do seu projeto. Qualquer utilização dos fundos para outro fim deverá ser aprovada por escrito pelo Mutuante."
            },
            interest: {
                title: "ARTIGO 3: TAXA DE JURO",
                content: "Este empréstimo é concedido a uma taxa de juro anual nominal fixa de {interest_rate}%."
            },
            repayment: {
                title: "ARTIGO 4: DURAÇÃO E TERMOS DE REEMBOLSO",
                content: "O empréstimo é reembolsável em {loan_term_months} prestações mensais constantes de {monthly_payment} cada, incluindo capital e juros. A primeira prestação vencerá em {repayment_start_date}. Os pagamentos subsequentes serão efetuados na mesma data de cada mês até ao reembolso total do capital e dos juros."
            },
            early_repayment: {
                title: "ARTIGO 5: REEMBOLSO ANTECIPADO",
                content: "O Mutuário tem o direito de reembolsar antecipadamente a totalidade ou parte do empréstimo a qualquer momento, sem penalização. O Mutuário deve notificar o Mutuante da sua intenção por escrito com pelo menos 30 dias de antecedência da data do reembolso antecipado."
            },
            late_payment: {
                title: "ARTIGO 6: PENALIDADES POR ATRASO",
                content: "Qualquer atraso no pagamento de uma prestação resultará, após uma notificação formal sem sucesso por 10 dias, na aplicação de penalidades por atraso calculadas a uma taxa igual a 1,5 vezes a taxa de juro legal em vigor, sobre os montantes em dívida."
            },
            default: {
                title: "ARTIGO 7: INCUMPRIMENTO",
                content: "Em caso de não pagamento de duas (2) prestações consecutivas, e 15 dias após uma notificação formal por carta registada com aviso de receção sem efeito, a totalidade das quantias em dívida (capital em dívida, juros e penalidades) tornar-se-á imediatamente exigível. O Mutuante reserva-se o direito de intentar qualquer ação judicial necessária para a cobrança da sua dívida."
            },
            borrower_obligations: {
                title: "ARTIGO 8: OBRIGAÇÕES DO MUTUÁRIO",
                content: "O Mutuário compromete-se a:\n- Fornecer informações exatas e completas ao solicitar o empréstimo.\n- Notificar o Mutuante de qualquer alteração na sua situação pessoal (morada, situação profissional, etc.) no prazo de 30 dias.\n- Não contrair outro empréstimo suscetível de comprometer a sua capacidade de reembolso sem informar o Mutuante."
            },
            confidentiality: {
                title: "ARTIGO 9: CONFIDENCIALIDADE",
                content: "As Partes comprometem-se a manter a mais estrita confidencialidade sobre os termos deste contrato e todas as informações trocadas no decurso da sua execução. Esta obrigação de confidencialidade sobreviverá à expiração do contrato."
            },
            jurisdiction: {
                title: "ARTIGO 10: LEI APLICÁVEL E JURISDIÇÃO",
                content: "Este contrato está sujeito à lei francesa. Qualquer litígio relativo à sua interpretação ou execução, que não possa ser resolvido amigavelmente, será da competência exclusiva dos tribunais de Lyon."
            }
        },
        signature_preamble: "Feito em {location}, em {date}, em dois exemplares originais, um para cada parte.",
        lender_title: "Diretor Geral",
        borrower_signature_instruction: "(Lido e aprovado)",
    },
    it: {
        title: "CONTRATTO DI PRESTITO PERSONALE",
        department: "Dipartimento Legale e Finanziario",
        reference: "Riferimento contratto: {ref}",
        importance: {
            title: "Importanza di questo documento",
            description: "Il contratto di prestito è il documento legale fondamentale che formalizza gli impegni tra il mutuante e il mutuatario. Dettaglia le condizioni, i termini di rimborso e i diritti e doveri di ciascuna parte. La sua firma è un atto vincolante che assicura la transazione e funge da riferimento legale in caso di controversia."
        },
        parties: {
            title: "TRA I SOTTOSCRITTI",
            lender: "IL MUTUANTE:",
            borrower: "IL MUTUATARIO:",
        },
        preamble: "Si è convenuto e stipulato quanto segue:",
        articles: {
            object: {
                title: "ARTICOLO 1: OGGETTO DEL PRESTITO",
                content: "Il Mutuante, {lender_name}, con il presente atto concede al Mutuatario, {borrower_name}, che accetta, un prestito per un importo totale di {loan_amount} ({loan_amount_in_words}), messo a disposizione in data {loan_date}."
            },
            usage: {
                title: "ARTICOLO 2: UTILIZZO DEI FONDI",
                content: "Il Mutuatario dichiara di utilizzare i fondi per il finanziamento del proprio progetto. Qualsiasi utilizzo dei fondi per un altro scopo dovrà essere approvato per iscritto dal Mutuante."
            },
            interest: {
                title: "ARTICOLO 3: TASSO DI INTERESSE",
                content: "Questo prestito è concesso a un tasso di interesse annuo nominale fisso del {interest_rate}%."
            },
            repayment: {
                title: "ARTICOLO 4: DURATA E MODALITÀ DI RIMBORSO",
                content: "Il prestito è rimborsabile in {loan_term_months} rate mensili costanti di {monthly_payment} ciascuna, comprensive di capitale e interessi. La prima rata scadrà il {repayment_start_date}. I pagamenti successivi saranno effettuati nella stessa data di ogni mese fino al completo rimborso del capitale e degli interessi."
            },
            early_repayment: {
                title: "ARTICOLO 5: RIMBORSO ANTICIPATO",
                content: "Il Mutuatario ha il diritto di rimborsare anticipatamente in tutto o in parte il prestito in qualsiasi momento, senza penali. Il Mutuatario dovrà notificare al Mutuante la propria intenzione per iscritto almeno 30 giorni prima della data del rimborso anticipato."
            },
            late_payment: {
                title: "ARTICOLO 6: PENALI DI RITARDO",
                content: "Qualsiasi ritardo nel pagamento di una rata comporterà, dopo una messa in mora rimasta senza esito per 10 giorni, l'applicazione di penali di ritardo calcolate a un tasso pari a 1,5 volte il tasso di interesse legale in vigore, sugli importi dovuti."
            },
            default: {
                title: "ARTICOLO 7: INADEMPIMENTO",
                content: "In caso di mancato pagamento di due (2) rate consecutive, e 15 giorni dopo una messa in mora tramite lettera raccomandata con avviso di ricevimento rimasta senza effetto, l'intero importo dovuto (capitale residuo, interessi e penali) diventerà immediatamente esigibile. Il Mutuante si riserva il diritto di intraprendere qualsiasi azione legale necessaria per il recupero del proprio credito."
            },
            borrower_obligations: {
                title: "ARTICOLO 8: OBBLIGHI DEL MUTUATARIO",
                content: "Il Mutuatario si impegna a:\n- Fornire informazioni accurate e complete al momento della richiesta del prestito.\n- Notificare al Mutuante qualsiasi cambiamento della situazione personale (indirizzo, situazione professionale, ecc.) entro 30 giorni.\n- Non contrarre altri prestiti che possano compromettere la propria capacità di rimborso senza informare il Mutuante."
            },
            confidentiality: {
                title: "ARTICOLO 9: RISERVATEZZA",
                content: "Le Parti si impegnano a mantenere la più stretta riservatezza sui termini del presente contratto e su tutte le informazioni scambiate nel corso della sua esecuzione. Tale obbligo di riservatezza sopravviverà alla scadenza del contratto."
            },
            jurisdiction: {
                title: "ARTICOLO 10: LEGGE APPLICABILE E FORO COMPETENTE",
                content: "Il presente contratto è soggetto alla legge francese. Qualsiasi controversia relativa alla sua interpretazione o esecuzione, che non possa essere risolta amichevolmente, sarà di competenza esclusiva dei tribunali di Lione."
            }
        },
        signature_preamble: "Fatto a {location}, il {date}, in due copie originali, una per ciascuna parte.",
        lender_title: "Amministratore Delegato",
        borrower_signature_instruction: "(Letto e approvato)",
    }
}

    