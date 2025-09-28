
import type { Clauses } from "./languages";

export const suretyBondClauses: Clauses = {
    fr: {
        title: "Acte de Cautionnement Solidaire",
        department: "Département Juridique & Garanties",
        reference: "Référence : {ref}",
        importance: {
            title: "Importance de ce document",
            description: "L'acte de cautionnement est un engagement extrêmement important. En le signant, la caution s'engage personnellement à rembourser la dette du débiteur principal si celui-ci ne le fait pas. C'est une garantie forte pour le prêteur, mais un risque financier significatif pour la personne qui se porte caution."
        },
        parties: {
            title: "ENTRE LES SOUSSIGNÉS",
            lender_label: "Le Créancier :",
            borrower_label: "Le Débiteur Principal :",
            guarantor_label: "La Caution :",
        },
        preamble: "Il a été préalablement exposé ce qui suit :\nLe Créancier a consenti un prêt au Débiteur Principal. La Caution, après avoir pris connaissance des termes du prêt et de la situation financière du Débiteur, consent au présent engagement de cautionnement.",
        articles: {
            commitment: {
                title: "ARTICLE 1 : ENGAGEMENT DE LA CAUTION",
                content: "Par les présentes, la Caution, {guarantor_name}, déclare se porter caution solidaire du Débiteur, {borrower_name}, pour le remboursement du prêt consenti par le Créancier, {lender_name}, et décrit à l'article 2.",
            },
            loan_details: {
                title: "ARTICLE 2 : CARACTÉRISTIQUES DU PRÊT GARANTI",
                content: "Le présent cautionnement garantit le paiement des sommes dues au titre du contrat de prêt n°{loan_contract_id}, signé le {loan_date}, d'un montant en principal de {loan_amount} pour une durée de {loan_term_months} mois.",
            },
            scope: {
                title: "ARTICLE 3 : ÉTENDUE DE LA GARANTIE",
                content: "L'engagement de la caution porte sur le paiement du principal, des intérêts conventionnels, des intérêts de retard, et de tous frais, indemnités et accessoires éventuels, dans la limite du montant total de {loan_amount} majoré des intérêts et accessoires. La caution déclare expressément renoncer au bénéfice de discussion (article 2298 du Code civil) et au bénéfice de division (article 2303 du Code civil).",
            },
            duration: {
                title: "ARTICLE 4 : DURÉE DE L'ENGAGEMENT",
                content: "Le présent engagement de cautionnement est consenti pour toute la durée du prêt, et se terminera au remboursement complet de toutes les sommes dues par le Débiteur Principal. La Caution s'engage à couvrir la dette pendant une durée maximale de {loan_term_months} mois majorée de 2 ans.",
            },
            information: {
                title: "ARTICLE 5 : INFORMATION DE LA CAUTION",
                content: "La Caution reconnaît avoir été informée par le Créancier, préalablement à la signature de cet acte, de l'adéquation de l'engagement à ses biens et revenus. De plus, le Créancier s'engage à informer la Caution de toute défaillance du Débiteur Principal dès le premier incident de paiement."
            }
        },
        handwritten_mention: {
            title: "ARTICLE 6 : MENTION MANUSCRITE OBLIGATOIRE (Art. L. 331-1 du Code de la consommation)",
            instruction: "(La caution doit recopier de sa main le texte suivant, sans modification)",
            content: "En me portant caution de {borrower_name} dans la limite de la somme de {loan_amount} ({loan_amount_in_words}) couvrant le paiement du principal, des intérêts et, le cas échéant, des pénalités ou intérêts de retard et pour la durée de l'engagement mentionnée à l'article 4, je m'engage à rembourser au prêteur, {lender_name}, les sommes dues sur mes revenus et mes biens si {borrower_name} n'y satisfait pas lui-même."
        },
        signature_preamble: "Fait à {location}, le {date}, en deux exemplaires originaux.",
        guarantor_signature_instruction: "(Précédé de la mention manuscrite et de la signature)",
        lender_title: "Directeur Juridique",
    },
    en: {
        title: "Joint and Several Guarantee",
        department: "Legal & Guarantees Department",
        reference: "Reference: {ref}",
        importance: {
            title: "Importance of this document",
            description: "The guarantee agreement is an extremely important commitment. By signing it, the guarantor personally undertakes to repay the principal debtor's debt if the latter fails to do so. It is a strong guarantee for the lender, but a significant financial risk for the person acting as guarantor."
        },
        parties: {
            title: "BETWEEN THE UNDERSIGNED",
            lender_label: "The Creditor:",
            borrower_label: "The Principal Debtor:",
            guarantor_label: "The Guarantor:",
        },
        preamble: "The following has been previously stated:\nThe Creditor has granted a loan to the Principal Debtor. The Guarantor, after having reviewed the terms of the loan and the Debtor's financial situation, consents to this guarantee commitment.",
        articles: {
            commitment: {
                title: "ARTICLE 1: GUARANTOR'S COMMITMENT",
                content: "Hereby, the Guarantor, {guarantor_name}, declares to act as joint and several guarantor for the Debtor, {borrower_name}, for the repayment of the loan granted by the Creditor, {lender_name}, and described in Article 2.",
            },
            loan_details: {
                title: "ARTICLE 2: CHARACTERISTICS OF THE GUARANTEED LOAN",
                content: "This guarantee secures the payment of the sums due under loan agreement No. {loan_contract_id}, signed on {loan_date}, for a principal amount of {loan_amount} for a term of {loan_term_months} months.",
            },
            scope: {
                title: "ARTICLE 3: SCOPE OF THE GUARANTEE",
                content: "The guarantor's commitment covers the payment of the principal, conventional interest, late payment interest, and all possible fees, indemnities, and accessories, up to the total amount of {loan_amount} plus interest and accessories. The guarantor expressly waives the benefit of discussion (Article 2298 of the Civil Code) and the benefit of division (Article 2303 of the Civil Code).",
            },
            duration: {
                title: "ARTICLE 4: DURATION OF THE COMMITMENT",
                content: "This guarantee commitment is granted for the entire duration of the loan and will terminate upon full repayment of all sums due by the Principal Debtor. The Guarantor undertakes to cover the debt for a maximum period of {loan_term_months} months plus 2 years.",
            },
            information: {
                title: "ARTICLE 5: GUARANTOR'S INFORMATION",
                content: "The Guarantor acknowledges having been informed by the Creditor, prior to signing this act, of the suitability of the commitment to their assets and income. Furthermore, the Creditor undertakes to inform the Guarantor of any default by the Principal Debtor from the first payment incident."
            }
        },
        handwritten_mention: {
            title: "ARTICLE 6: MANDATORY HANDWRITTEN MENTION (Art. L. 331-1 of the Consumer Code)",
            instruction: "(The guarantor must copy the following text by hand, without modification)",
            content: "By acting as guarantor for {borrower_name} up to the sum of {loan_amount} ({loan_amount_in_words}) covering the payment of the principal, interest and, where applicable, penalties or late payment interest and for the duration of the commitment mentioned in Article 4, I undertake to reimburse the lender, {lender_name}, the sums due from my income and my assets if {borrower_name} does not do so himself."
        },
        signature_preamble: "Done at {location}, on {date}, in two original copies.",
        guarantor_signature_instruction: "(Preceded by the handwritten mention and signature)",
        lender_title: "Legal Director",
    },
    de: {
        title: "Selbstschuldnerische Bürgschaft",
        department: "Abteilung Recht & Bürgschaften",
        reference: "Referenz: {ref}",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Die Bürgschaftsurkunde ist eine äußerst wichtige Verpflichtung. Mit ihrer Unterzeichnung verpflichtet sich der Bürge persönlich, die Schuld des Hauptschuldners zu begleichen, falls dieser dazu nicht in der Lage ist. Sie ist eine starke Sicherheit für den Kreditgeber, aber ein erhebliches finanzielles Risiko für die Person, die als Bürge auftritt."
        },
        parties: {
            title: "ZWISCHEN DEN UNTERZEICHNENDEN",
            lender_label: "Der Gläubiger:",
            borrower_label: "Der Hauptschuldner:",
            guarantor_label: "Der Bürge:",
        },
        preamble: "Vorbemerkung:\nDer Gläubiger hat dem Hauptschuldner ein Darlehen gewährt. Der Bürge stimmt dieser Bürgschaftsverpflichtung zu, nachdem er die Darlehensbedingungen und die finanzielle Lage des Schuldners geprüft hat.",
        articles: {
            commitment: {
                title: "ARTIKEL 1: VERPFLICHTUNG DES BÜRGEN",
                content: "Hiermit erklärt der Bürge, {guarantor_name}, sich als selbstschuldnerischer Bürge für den Schuldner, {borrower_name}, für die Rückzahlung des vom Gläubiger, {lender_name}, gewährten und in Artikel 2 beschriebenen Darlehens zu verpflichten.",
            },
            loan_details: {
                title: "ARTIKEL 2: MERKMALE DES BESICHERTEN DARLEHENS",
                content: "Diese Bürgschaft sichert die Zahlung der fälligen Beträge aus dem Darlehensvertrag Nr. {loan_contract_id}, unterzeichnet am {loan_date}, über einen Kapitalbetrag von {loan_amount} für eine Laufzeit von {loan_term_months} Monaten.",
            },
            scope: {
                title: "ARTIKEL 3: UMFANG DER BÜRGSCHAFT",
                content: "Die Verpflichtung des Bürgen umfasst die Zahlung des Kapitals, der vertraglichen Zinsen, der Verzugszinsen und aller möglichen Gebühren, Entschädigungen und Nebenkosten bis zum Gesamtbetrag von {loan_amount} zuzüglich Zinsen und Nebenkosten. Der Bürge verzichtet ausdrücklich auf die Einrede der Vorausklage (Artikel 2298 des Zivilgesetzbuches) und die Einrede der Teilung (Artikel 2303 des Zivilgesetzbuches).",
            },
            duration: {
                title: "ARTIKEL 4: DAUER DER VERPFLICHTUNG",
                content: "Diese Bürgschaftsverpflichtung wird für die gesamte Laufzeit des Darlehens gewährt und endet mit der vollständigen Rückzahlung aller vom Hauptschuldner geschuldeten Beträge. Der Bürge verpflichtet sich, die Schuld für einen maximalen Zeitraum von {loan_term_months} Monaten zuzüglich 2 Jahren zu decken.",
            },
            information: {
                title: "ARTIKEL 5: INFORMATION DES BÜRGEN",
                content: "Der Bürge bestätigt, vom Gläubiger vor Unterzeichnung dieser Urkunde über die Angemessenheit der Verpflichtung in Bezug auf sein Vermögen und Einkommen informiert worden zu sein. Darüber hinaus verpflichtet sich der Gläubiger, den Bürgen über jeden Zahlungsausfall des Hauptschuldners ab dem ersten Zahlungsstörungsfall zu informieren."
            }
        },
        handwritten_mention: {
            title: "ARTIKEL 6: OBLIGATORISCHER HANDSCHRIFTLICHER VERMERK (Art. L. 331-1 des Verbrauchergesetzbuches)",
            instruction: "(Der Bürge muss den folgenden Text handschriftlich und unverändert abschreiben)",
            content: "Indem ich mich für {borrower_name} bis zur Höhe von {loan_amount} ({loan_amount_in_words}) verbürge, was die Zahlung des Kapitals, der Zinsen und gegebenenfalls der Strafen oder Verzugszinsen für die in Artikel 4 genannte Dauer der Verpflichtung abdeckt, verpflichte ich mich, dem Kreditgeber, {lender_name}, die geschuldeten Beträge aus meinem Einkommen und meinem Vermögen zu erstatten, falls {borrower_name} dies nicht selbst tut."
        },
        signature_preamble: "Ausgefertigt in {location}, am {date}, in zwei Originalexemplaren.",
        guarantor_signature_instruction: "(Vorhergehender handschriftlicher Vermerk und Unterschrift)",
        lender_title: "Leiter der Rechtsabteilung",
    },
    es: {
        title: "Acta de Fianza Solidaria",
        department: "Departamento Legal y de Garantías",
        reference: "Referencia: {ref}",
        importance: {
            title: "Importancia de este documento",
            description: "El acta de fianza es un compromiso extremadamente importante. Al firmarlo, el fiador se compromete personalmente a pagar la deuda del deudor principal si este no lo hace. Es una garantía sólida para el prestamista, pero un riesgo financiero significativo para la persona que actúa como fiador."
        },
        parties: {
            title: "ENTRE LOS ABAJO FIRMANTES",
            lender_label: "El Acreedor:",
            borrower_label: "El Deudor Principal:",
            guarantor_label: "El Fiador:",
        },
        preamble: "Se expone previamente lo siguiente:\nEl Acreedor ha concedido un préstamo al Deudor Principal. El Fiador, tras haber revisado los términos del préstamo y la situación financiera del Deudor, consiente este compromiso de fianza.",
        articles: {
            commitment: {
                title: "ARTÍCULO 1: COMPROMISO DEL FIADOR",
                content: "Por la presente, el Fiador, {guarantor_name}, se declara fiador solidario del Deudor, {borrower_name}, para el reembolso del préstamo concedido por el Acreedor, {lender_name}, y descrito en el Artículo 2.",
            },
            loan_details: {
                title: "ARTÍCULO 2: CARACTERÍSTICAS DEL PRÉSTAMO GARANTIZADO",
                content: "Esta fianza garantiza el pago de las sumas adeudadas en virtud del contrato de préstamo n.º {loan_contract_id}, firmado el {loan_date}, por un importe principal de {loan_amount} por un plazo de {loan_term_months} meses.",
            },
            scope: {
                title: "ARTÍCULO 3: ALCANCE DE LA GARANTÍA",
                content: "El compromiso del fiador cubre el pago del principal, los intereses convencionales, los intereses de demora y todos los posibles gastos, indemnizaciones y accesorios, hasta el importe total de {loan_amount} más intereses y accesorios. El fiador renuncia expresamente al beneficio de excusión (artículo 2298 del Código Civil) y al beneficio de división (artículo 2303 del Código Civil).",
            },
            duration: {
                title: "ARTÍCULO 4: DURACIÓN DEL COMPROMISO",
                content: "Este compromiso de fianza se concede por toda la duración del préstamo y finalizará con el reembolso completo de todas las sumas adeudadas por el Deudor Principal. El Fiador se compromete a cubrir la deuda por un período máximo de {loan_term_months} meses más 2 años.",
            },
            information: {
                title: "ARTÍCULO 5: INFORMACIÓN DEL FIADOR",
                content: "El Fiador reconoce haber sido informado por el Acreedor, antes de firmar esta acta, de la idoneidad del compromiso con respecto a sus bienes e ingresos. Además, el Acreedor se compromete a informar al Fiador de cualquier incumplimiento del Deudor Principal desde el primer incidente de pago."
            }
        },
        handwritten_mention: {
            title: "ARTÍCULO 6: MENCIÓN MANUSCRITA OBLIGATORIA (Art. L. 331-1 del Código de Consumo)",
            instruction: "(El fiador debe copiar el siguiente texto a mano, sin modificaciones)",
            content: "Al constituirme en fiador de {borrower_name} hasta la suma de {loan_amount} ({loan_amount_in_words}), que cubre el pago del principal, los intereses y, en su caso, las penalizaciones o intereses de demora, y por la duración del compromiso mencionada en el artículo 4, me comprometo a reembolsar al prestamista, {lender_name}, las sumas adeudadas con mis ingresos y mis bienes si {borrower_name} no lo hace por sí mismo."
        },
        signature_preamble: "Hecho en {location}, el {date}, en dos ejemplares originales.",
        guarantor_signature_instruction: "(Precedido de la mención manuscrita y la firma)",
        lender_title: "Director Legal",
    },
    pt: {
        title: "Ato de Fiança Solidária",
        department: "Departamento Jurídico e de Garantias",
        reference: "Referência: {ref}",
        importance: {
            title: "Importância deste documento",
            description: "O ato de fiança é um compromisso extremamente importante. Ao assiná-lo, o fiador compromete-se pessoalmente a pagar a dívida do devedor principal caso este não o faça. É uma garantia forte para o credor, mas um risco financeiro significativo para a pessoa que atua como fiador."
        },
        parties: {
            title: "ENTRE OS ABAIXO-ASSINADOS",
            lender_label: "O Credor:",
            borrower_label: "O Devedor Principal:",
            guarantor_label: "O Fiador:",
        },
        preamble: "Foi previamente exposto o seguinte:\nO Credor concedeu um empréstimo ao Devedor Principal. O Fiador, após ter analisado os termos do empréstimo e a situação financeira do Devedor, consente neste compromisso de fiança.",
        articles: {
            commitment: {
                title: "ARTIGO 1: COMPROMISSO DO FIADOR",
                content: "Pelo presente, o Fiador, {guarantor_name}, declara-se fiador solidário do Devedor, {borrower_name}, para o reembolso do empréstimo concedido pelo Credor, {lender_name}, e descrito no Artigo 2.",
            },
            loan_details: {
                title: "ARTIGO 2: CARACTERÍSTICAS DO EMPRÉSTIMO GARANTIDO",
                content: "Esta fiança garante o pagamento das quantias devidas ao abrigo do contrato de empréstimo n.º {loan_contract_id}, assinado em {loan_date}, por um montante principal de {loan_amount} por um prazo de {loan_term_months} meses.",
            },
            scope: {
                title: "ARTIGO 3: ÂMBITO DA GARANTIA",
                content: "O compromisso do fiador abrange o pagamento do capital, juros convencionais, juros de mora e todas as possíveis taxas, indemnizações e acessórios, até ao montante total de {loan_amount} acrescido de juros e acessórios. O fiador renuncia expressamente ao benefício de excussão (artigo 2298 do Código Civil) и ao benefício da divisão (artigo 2303 do Código Civil).",
            },
            duration: {
                title: "ARTIGO 4: DURAÇÃO DO COMPROMISSO",
                content: "Este compromisso de fiança é concedido por toda a duração do empréstimo e terminará com o reembolso total de todas as quantias devidas pelo Devedor Principal. O Fiador compromete-se a cobrir a dívida por um período máximo de {loan_term_months} meses mais 2 anos.",
            },
            information: {
                title: "ARTIGO 5: INFORMAÇÃO DO FIADOR",
                content: "O Fiador reconhece ter sido informado pelo Credor, antes da assinatura deste ato, da adequação do compromisso aos seus bens e rendimentos. Além disso, o Credor compromete-se a informar o Fiador de qualquer incumprimento do Devedor Principal desde o primeiro incidente de pagamento."
            }
        },
        handwritten_mention: {
            title: "ARTIGO 6: MENÇÃO MANUSCRITA OBRIGATÓRIA (Art. L. 331-1 do Código do Consumidor)",
            instruction: "(O fiador deve copiar o seguinte texto à mão, sem modificações)",
            content: "Ao assumir o compromisso como fiador de {borrower_name} até ao montante de {loan_amount} ({loan_amount_in_words}), cobrindo o pagamento do capital, juros e, se aplicável, penalidades ou juros de mora, e pela duração do compromisso mencionada no artigo 4, comprometo-me a reembolsar ao credor, {lender_name}, as quantias devidas com os meus rendimentos e bens se {borrower_name} não o fizer."
        },
        signature_preamble: "Feito em {location}, em {date}, em dois exemplares originais.",
        guarantor_signature_instruction: "(Precedido da menção manuscrita e assinatura)",
        lender_title: "Diretor Jurídico",
    },
    it: {
        title: "Atto di Fideiussione Solidale",
        department: "Dipartimento Legale e Garanzie",
        reference: "Riferimento: {ref}",
        importance: {
            title: "Importanza di questo documento",
            description: "L'atto di fideiussione è un impegno estremamente importante. Firmandolo, il fideiussore si impegna personalmente a rimborsare il debito del debitore principale qualora quest'ultimo non lo faccia. È una garanzia forte per il creditore, ma un rischio finanziario significativo per la persona che funge da garante."
        },
        parties: {
            title: "TRA I SOTTOSCRITTI",
            lender_label: "Il Creditore:",
            borrower_label: "Il Debitore Principale:",
            guarantor_label: "Il Fideiussore:",
        },
        preamble: "Si premette quanto segue:\nIl Creditore ha concesso un prestito al Debitore Principale. Il Fideiussore, dopo aver preso visione dei termini del prestito e della situazione finanziaria del Debitore, acconsente al presente impegno di fideiussione.",
        articles: {
            commitment: {
                title: "ARTICOLO 1: IMPEGNO DEL FIDEIUSSORE",
                content: "Con il presente atto, il Fideiussore, {guarantor_name}, si dichiara fideiussore solidale del Debitore, {borrower_name}, per il rimborso del prestito concesso dal Creditore, {lender_name}, e descritto nell'Articolo 2.",
            },
            loan_details: {
                title: "ARTICOLO 2: CARATTERISTICHE DEL PRESTITO GARANTITO",
                content: "La presente fideiussione garantisce il pagamento delle somme dovute in base al contratto di prestito n. {loan_contract_id}, firmato il {loan_date}, per un importo capitale di {loan_amount} per una durata di {loan_term_months} mesi.",
            },
            scope: {
                title: "ARTICOLO 3: AMBITO DELLA GARANZIA",
                content: "L'impegno del fideiussore copre il pagamento del capitale, degli interessi convenzionali, degli interessi di mora e di tutte le eventuali spese, indennità e accessori, fino all'importo totale di {loan_amount} più interessi e accessori. Il fideiussore rinuncia espressamente al beneficio della preventiva escussione (articolo 2298 del Codice Civile) e al beneficio della divisione (articolo 2303 del Codice Civile).",
            },
            duration: {
                title: "ARTICOLO 4: DURATA DELL'IMPEGNO",
                content: "Il presente impegno di fideiussione è concesso per l'intera durata del prestito e terminerà con il rimborso completo di tutte le somme dovute dal Debitore Principale. Il Fideiussore si impegna a coprire il debito per un periodo massimo di {loan_term_months} mesi più 2 anni.",
            },
            information: {
                title: "ARTICOLO 5: INFORMAZIONI AL FIDEIUSSORE",
                content: "Il Fideiussore riconosce di essere stato informato dal Creditore, prima della firma di questo atto, dell'adeguatezza dell'impegno rispetto ai propri beni e redditi. Inoltre, il Creditore si impegna a informare il Fideiussore di qualsiasi inadempimento del Debitore Principale sin dal primo incidente di pagamento."
            }
        },
        handwritten_mention: {
            title: "ARTICOLO 6: MENZIONE MANOSCRITTA OBBLIGATORIA (Art. L. 331-1 del Codice del Consumo)",
            instruction: "(Il fideiussore deve copiare il seguente testo a mano, senza modifiche)",
            content: "Costituendomi fideiussore di {borrower_name} fino alla somma di {loan_amount} ({loan_amount_in_words}), a copertura del pagamento del capitale, degli interessi e, se del caso, delle penali o interessi di mora e per la durata dell'impegno menzionata nell'articolo 4, mi impegno a rimborsare al mutuante, {lender_name}, le somme dovute con i miei redditi e i miei beni qualora {borrower_name} non vi provvedesse egli stesso."
        },
        signature_preamble: "Fatto a {location}, il {date}, in due copie originali.",
        guarantor_signature_instruction: "(Preceduto dalla menzione manoscritta e dalla firma)",
        lender_title: "Direttore Legale",
    }
}
