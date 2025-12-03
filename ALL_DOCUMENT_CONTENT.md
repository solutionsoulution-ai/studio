# Contenu de Tous les Documents

Ce fichier regroupe l'intégralité du contenu textuel (clauses, titres, etc.) pour chaque type de document généré par l'application.

---
---

## 1. Reconnaissance de Dette (`debt-recognition-clauses.ts`)

```json
{
    "fr": {
        "header": {
            "line1": "Service Financier Européen",
            "line2": "Département Juridique et des Garanties • Unité de Formalisation des Engagements"
        },
        "title": "Reconnaissance de Dette pour un Prêt",
        "reference": "Document N°: {ref}",
        "date": "Date: {date}",
        "parties": {
            "title": "Entre les soussignés :",
            "creditor_label": "Le Créancier :",
            "debtor_label": "Le Débiteur :"
        },
        "articles": {
            "recognition": {
                "title": "Article 1 : Reconnaissance de la Dette",
                "content": "Je soussigné(e), {debtor_name}, demeurant au {debtor_address}, reconnais par la présente devoir à Capfinfy, agissant au nom de ses partenaires financiers, la somme de : {loan_amount} ({loan_amount_in_words}). Cette somme correspond au capital d'un prêt de type '{type_of_loan}' qui m'a été accordé et dont je confirme avoir reçu les fonds."
            },
            "repayment": {
                "title": "Article 2 : Modalités de Remboursement",
                "content": "Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de prêt N° {loan_contract_ref} que j'ai signé séparément. La durée de remboursement convenue est de {loan_term} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier."
            },
            "default": {
                "title": "Article 3 : Clause de Défaut",
                "content": "En cas de non-paiement d'une ou plusieurs échéances, je reconnais que le Créancier pourra se prévaloir des clauses prévues dans le contrat de prêt, y compris l'exigibilité anticipée de la totalité du capital restant dû, majoré des intérêts et pénalités applicables."
            },
            "mention": {
                "title": "Article 4 : Compréhension de l'Engagement",
                "content": "L'article L. 313-24 du Code de la consommation stipule l'importance de l'engagement. Le débiteur reconnaît avoir lu et compris l'intégralité du contrat de prêt auquel cette reconnaissance de dette se rapporte et avoir reçu un exemplaire de chaque document."
            }
        }
    },
    "en": {
        "header": {
            "line1": "European Financial Service",
            "line2": "Legal and Guarantees Department • Commitment Formalization Unit"
        },
        "title": "Acknowledgment of Debt for a Loan",
        "reference": "Document No: {ref}",
        "date": "Date: {date}",
        "parties": {
            "title": "Between the undersigned:",
            "creditor_label": "The Creditor:",
            "debtor_label": "The Debtor:"
        },
        "articles": {
            "recognition": {
                "title": "Article 1: Acknowledgment of Debt",
                "content": "I, the undersigned, {debtor_name}, residing at {debtor_address}, hereby acknowledge that I owe Capfinfy, acting on behalf of its financial partners, the sum of: {loan_amount} ({loan_amount_in_words}). This amount corresponds to the principal of a '{type_of_loan}' loan that has been granted to me and for which I confirm receipt of the funds."
            },
            "repayment": {
                "title": "Article 2: Repayment Terms",
                "content": "I undertake to repay this sum in full, along with the associated interest and fees, in accordance with the schedule and conditions defined in the loan contract No. {loan_contract_ref} which I have signed separately. The agreed repayment term is {loan_term} months, except in the case of early repayment or payment default altering the schedule."
            },
            "default": {
                "title": "Article 3: Default Clause",
                "content": "In the event of non-payment of one or more installments, I acknowledge that the Creditor may invoke the clauses provided for in the loan contract, including the early demand for the entire outstanding principal, plus applicable interest and penalties."
            },
            "mention": {
                "title": "Article 4: Understanding of Commitment",
                "content": "Article L. 313-24 of the Consumer Code stipulates the importance of the commitment. The debtor acknowledges having read and understood the entire loan contract to which this acknowledgment of debt relates and having received a copy of each document."
            }
        }
    },
    "de": {
        "header": {
            "line1": "Europäischer Finanzdienst",
            "line2": "Rechts- und Garantieabteilung • Abteilung für die Formalisierung von Verpflichtungen"
        },
        "title": "Schuldanerkenntnis für ein Darlehen",
        "reference": "Dokument Nr.: {ref}",
        "date": "Datum: {date}",
        "parties": {
            "title": "Zwischen den Unterzeichnern:",
            "creditor_label": "Der Gläubiger:",
            "debtor_label": "Der Schuldner:"
        },
        "articles": {
            "recognition": {
                "title": "Artikel 1: Schuldanerkenntnis",
                "content": "Ich, der/die Unterzeichnende, {debtor_name}, wohnhaft in {debtor_address}, erkenne hiermit an, Capfinfy, handelnd im Namen seiner Finanzpartner, die Summe von: {loan_amount} ({loan_amount_in_words}) zu schulden. Dieser Betrag entspricht dem Kapital eines '{type_of_loan}'-Darlehens, das mir gewährt wurde und dessen Erhalt ich bestätige."
            },
            "repayment": {
                "title": "Artikel 2: Rückzahlungsmodalitäten",
                "content": "Ich verpflichte mich, diesen Betrag vollständig zurückzuzahlen, zusammen mit den damit verbundenen Zinsen und Gebühren, gemäß dem Zeitplan und den Bedingungen, die im Darlehensvertrag Nr. {loan_contract_ref}, den ich separat unterzeichnet habe, festgelegt sind. Die vereinbarte Rückzahlungsfrist beträgt {loan_term} Monate, außer im Falle einer vorzeitigen Rückzahlung oder eines Zahlungsverzugs, der den Zeitplan ändert."
            },
            "default": {
                "title": "Artikel 3: Verzugsklausel",
                "content": "Im Falle der Nichtzahlung einer oder mehrerer Raten erkenne ich an, dass der Gläubiger die im Darlehensvertrag vorgesehenen Klauseln geltend machen kann, einschließlich der sofortigen Fälligstellung des gesamten ausstehenden Kapitals zuzüglich anfallender Zinsen und Strafen."
            },
            "mention": {
                "title": "Artikel 4: Verständnis der Verpflichtung",
                "content": "Artikel L. 313-24 des Verbrauchergesetzbuches unterstreicht die Bedeutung der Verpflichtung. Der Schuldner bestätigt, den gesamten Darlehensvertrag, auf den sich dieses Schuldanerkenntnis bezieht, gelesen und verstanden zu haben und eine Kopie jedes Dokuments erhalten zu haben."
            }
        }
    }
}
```

---

## 2. Attestation d'Éligibilité (`eligibility-certificate-clauses.ts`)

```json
{
    "fr": {
        "header": {
            "line1": "Département d'Analyse Financière",
            "line2": "Unité de Certification de Solvabilité"
        },
        "title": "Certificat de Solvabilité Pré-approuvée pour un projet de {project_type}",
        "reference": "Certificat N°: {ref}",
        "validity": "Valide jusqu'au: {validity_date}",
        "beneficiary": {
            "title": "Bénéficiaire du certificat :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet du Certificat",
                "content": "Capfinfy, agissant en tant qu'intermédiaire financier, certifie par la présente avoir procédé à une analyse préliminaire de la situation financière du bénéficiaire susmentionné. Sur la base des éléments déclarés et en l'état actuel de nos critères d'évaluation, le bénéficiaire est jugé éligible à un financement pour un montant maximum de :",
                "amount_label": "Montant d'éligibilité maximal"
            },
            "scope": {
                "title": "Article 2 : Portée et Limites",
                "content": "Ce certificat atteste d'une capacité de financement théorique au jour de son émission. Il est destiné à être présenté à des tiers (agents immobiliers, vendeurs, etc.) comme un élément de réassurance de la capacité du bénéficiaire à financer un projet. Il ne constitue en aucun cas une offre de prêt ferme et ne saurait engager Capfinfy ou ses partenaires prêteurs."
            },
            "validity": {
                "title": "Article 3 : Validité",
                "content": "Le présent certificat est valable 30 jours calendaires à compter de sa date d'émission, soit jusqu'au {validity_date}. Passé ce délai, une nouvelle évaluation sera nécessaire. La validité est conditionnée à l'absence de changement significatif dans la situation financière du bénéficiaire et à la vérification ultérieure des pièces justificatives originales."
            }
        }
    },
    "en": {
        "header": {
            "line1": "Financial Analysis Department",
            "line2": "Solvency Certification Unit"
        },
        "title": "Certificate of Pre-Approved Solvency for a {project_type} project",
        "reference": "Certificate No: {ref}",
        "validity": "Valid until: {validity_date}",
        "beneficiary": {
            "title": "Beneficiary of the certificate:"
        },
        "articles": {
            "object": {
                "title": "Article 1: Purpose of the Certificate",
                "content": "Capfinfy, acting as a financial intermediary, hereby certifies that it has conducted a preliminary analysis of the financial situation of the above-mentioned beneficiary. Based on the declared elements and our current evaluation criteria, the beneficiary is deemed eligible for financing up to a maximum amount of:",
                "amount_label": "Maximum Eligibility Amount"
            },
            "scope": {
                "title": "Article 2: Scope and Limitations",
                "content": "This certificate attests to a theoretical financing capacity as of its date of issue. It is intended to be presented to third parties (real estate agents, sellers, etc.) as an element of reassurance of the beneficiary's ability to finance a project. It in no way constitutes a firm loan offer and shall not bind Capfinfy or its lending partners."
            },
            "validity": {
                "title": "Article 3: Validity",
                "content": "This certificate is valid for 30 calendar days from its date of issue, i.e., until {validity_date}. After this period, a new assessment will be required. The validity is conditional on the absence of any significant change in the beneficiary's financial situation and on the subsequent verification of the original supporting documents."
            }
        }
    },
    "de": {
        "header": {
            "line1": "Finanzanalyseabteilung",
            "line2": "Abteilung für Bonitätszertifizierung"
        },
        "title": "Zertifikat über vorab genehmigte Bonität für ein {project_type}-Projekt",
        "reference": "Zertifikat Nr.: {ref}",
        "validity": "Gültig bis: {validity_date}",
        "beneficiary": {
            "title": "Begünstigter des Zertifikats:"
        },
        "articles": {
            "object": {
                "title": "Artikel 1: Zweck des Zertifikats",
                "content": "Capfinfy, handelnd als Finanzvermittler, bescheinigt hiermit, eine vorläufige Analyse der finanziellen Situation des oben genannten Begünstigten durchgeführt zu haben. Auf der Grundlage der angegebenen Elemente und unserer aktuellen Bewertungskriterien wird der Begünstigte als kreditwürdig für eine Finanzierung bis zu einem Höchstbetrag von:",
                "amount_label": "Maximaler Förderbetrag"
            },
            "scope": {
                "title": "Artikel 2: Geltungsbereich und Einschränkungen",
                "content": "Dieses Zertifikat bescheinigt eine theoretische Finanzierungskapazität zum Zeitpunkt seiner Ausstellung. Es ist dazu bestimmt, Dritten (Immobilienmaklern, Verkäufern usw.) als Sicherheit für die Fähigkeit des Begünstigten zur Finanzierung eines Projekts vorgelegt zu werden. Es stellt in keiner Weise ein verbindliches Darlehensangebot dar und bindet Capfinfy oder seine darlehensgebenden Partner nicht."
            },
            "validity": {
                "title": "Artikel 3: Gültigkeit",
                "content": "Dieses Zertifikat ist 30 Kalendertage ab Ausstellungsdatum gültig, d.h. bis zum {validity_date}. Nach diesem Zeitraum ist eine neue Bewertung erforderlich. Die Gültigkeit ist an die Bedingung geknüpft, dass sich die finanzielle Situation des Begünstigten nicht wesentlich ändert und die Originalbelege nachträglich überprüft werden."
            }
        }
    }
}
```

---

## 3. Contrat de Prêt Personnel (`loan-contract-clauses.ts`)

```json
{
    "fr": {
        "header": {
            "line1": "Service Financier Européen",
            "line2": "Département des crédits à la consommation • Bureau des Accords de Prêt • Unité de Vérification des Engagements"
        },
        "title": "Contrat de Prêt",
        "reference": "Contrat N°: {contract_ref}",
        "location_and_date": "Fait à Lyon, le {contract_date}",
        "parties": {
            "title": "Entre les soussignés :",
            "lender_label": "Le Prêteur :",
            "borrower_label": "L'Emprunteur :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet du Contrat",
                "content": "Le Prêteur consent à l'Emprunteur, qui accepte, un {type_of_loan} amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières."
            },
            "characteristics": {
                "title": "Article 2 : Montant et Caractéristiques du Prêt",
                "amount": "Montant du capital prêté : {loan_amount} ({loan_amount_in_words} euros).",
                "taeg": "Taux d'intérêt Annuel Effectif Global (TAEG) fixe : {taeg}.",
                "term": "Durée totale du remboursement : {loan_term} mois.",
                "availability": "Date de mise à disposition des fonds : Au plus tard 10 jours après l'expiration du délai de rétractation."
            },
            "repayment": {
                "title": "Article 3 : Modalités de Remboursement",
                "intro": "L'Emprunteur s'engage à rembourser le capital et les intérêts en {loan_term} mensualités constantes. La première échéance interviendra le {start_date} et la dernière le {end_date}.",
                "monthly_payment": "Mensualité (hors assurance) : {monthly_payment}. Ce montant sera prélevé le 5 de chaque mois.",
                "total_cost": "Le coût total du crédit (intérêts) s'élève à {total_cost}.",
                "total_due": "Montant total dû : {total_due} (Capital emprunté + coût total des intérêts)."
            },
            "withdrawal": {
                "title": "Article 4 : Droit de Rétractation",
                "content": "L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception."
            },
            "default": {
                "title": "Article 5 : Défaut de Paiement",
                "content": "En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur."
            },
            "early_repayment": {
                "title": "Article 6 : Remboursement Anticipé",
                "content": "L'Emprunteur a le droit, à tout moment, de rembourser par anticipation, en totalité ou en partie, le crédit qui lui a été consenti. Conformément à notre politique commerciale, aucune indemnité de remboursement anticipé ne sera exigée, quel que soit le montant. L'Emprunteur devra simplement notifier le Prêteur de son intention par écrit afin d'organiser les modalités pratiques du remboursement."
            },
            "data": {
                "title": "Article 7 : Protection des Données Personnelles",
                "content": "Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur à l'adresse {contact_email}."
            },
            "law": {
                "title": "Article 8 : Droit Applicable et Litiges",
                "content": "Le présent contrat est soumis au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur."
            }
        },
        "signature_preamble": "Fait en deux exemplaires originaux, dont un pour chaque partie."
    },
    "de": {
        "header": {
            "line1": "Europäischer Finanzdienstleister",
            "line2": "Abteilung für Verbraucherkredite • Büro für Darlehensvereinbarungen • Abteilung für die Überprüfung von Verpflichtungen"
        },
        "title": "Darlehensvertrag",
        "reference": "Vertrag Nr.: {contract_ref}",
        "location_and_date": "Ausgestellt in Lyon, am {contract_date}",
        "parties": {
            "title": "Zwischen den Unterzeichnern:",
            "lender_label": "Der Darlehensgeber:",
            "borrower_label": "Der Darlehensnehmer:"
        },
        "articles": {
            "object": {
                "title": "Artikel 1: Vertragsgegenstand",
                "content": "Der Darlehensgeber gewährt dem Darlehensnehmer, der dies annimmt, ein Tilgungsdarlehen des Typs {type_of_loan} für den nicht-gewerblichen Gebrauch, das den Bestimmungen des Verbrauchergesetzbuches sowie den vorliegenden allgemeinen und besonderen Bedingungen unterliegt."
            },
            "characteristics": {
                "title": "Artikel 2: Betrag und Merkmale des Darlehens",
                "amount": "Geliehener Kapitalbetrag: {loan_amount} ({loan_amount_in_words} Euro).",
                "taeg": "Fester effektiver Jahreszins (TAEG): {taeg}.",
                "term": "Gesamte Rückzahlungsdauer: {loan_term} Monate.",
                "availability": "Datum der Mittelbereitstellung: Spätestens 10 Tage nach Ablauf der Widerrufsfrist."
            },
            "repayment": {
                "title": "Artikel 3: Rückzahlungsmodalitäten",
                "intro": "Der Darlehensnehmer verpflichtet sich, das Kapital und die Zinsen in {loan_term} konstanten Monatsraten zurückzuzahlen. Die erste Rate ist am {start_date} fällig und die letzte am {end_date}.",
                "monthly_payment": "Monatliche Rate (ohne Versicherung): {monthly_payment}. Dieser Betrag wird am 5. eines jeden Monats abgebucht.",
                "total_cost": "Die Gesamtkosten des Kredits (Zinsen) belaufen sich auf {total_cost}.",
                "total_due": "Gesamter geschuldeter Betrag: {total_due} (Geliehenes Kapital + Gesamtkosten der Zinsen)."
            },
            "withdrawal": {
                "title": "Artikel 4: Widerrufsrecht",
                "content": "Der Darlehensnehmer hat eine Widerrufsfrist von vierzehn (14) Kalendertagen ab dem Datum der Unterzeichnung des Kreditvertragsangebots. Um zu widerrufen, muss der Darlehensnehmer das dem Angebot beigefügte Widerrufsformular per Einschreiben mit Rückschein zurücksenden."
            },
            "default": {
                "title": "Artikel 5: Zahlungsverzug",
                "content": "Bei Nichtzahlung einer Rate zum Fälligkeitsdatum kann der Darlehensgeber die sofortige Rückzahlung des ausstehenden Kapitals zuzüglich der fälligen und unbezahlten Zinsen verlangen. Verzugsstrafen können gemäß der geltenden Gesetzgebung erhoben werden."
            },
            "early_repayment": {
                "title": "Artikel 6: Vorzeitige Rückzahlung",
                "content": "Der Darlehensnehmer hat das Recht, den ihm gewährten Kredit jederzeit ganz oder teilweise vorzeitig zurückzuzahlen. Gemäß unserer Geschäftspolitik wird keine Vorfälligkeitsentschädigung erhoben, unabhängig von der Höhe des Betrags. Der Darlehensnehmer muss den Darlehensgeber lediglich schriftlich über seine Absicht informieren, um die praktischen Modalitäten der Rückzahlung zu regeln."
            },
            "data": {
                "title": "Artikel 7: Schutz personenbezogener Daten",
                "content": "Die erhobenen Informationen sind für die Bearbeitung des Darlehensantrags erforderlich. Sie werden elektronisch verarbeitet und sind für die Abteilungen des Darlehensgebers und seiner Partner bestimmt. Gemäß der DSGVO hat der Darlehensnehmer das Recht auf Zugang, Berichtigung und Löschung seiner personenbezogenen Daten, indem er den Darlehensgeber unter der Adresse {contact_email} kontaktiert."
            },
            "law": {
                "title": "Artikel 8: Anwendbares Recht und Streitigkeiten",
                "content": "Dieser Vertrag unterliegt dem französischen Recht. Im Falle eines Rechtsstreits verpflichten sich die Parteien, eine gütliche Einigung zu suchen. Andernfalls ist das zuständige Gericht das am Wohnsitz des Darlehensnehmers."
            }
        },
        "signature_preamble": "Ausgefertigt in zwei Originalexemplaren, eines für jede Partei."
    }
}
```

---

## 4. Acte de Cautionnement Solidaire (`surety-bond-clauses.ts`)

```json
{
    "fr": {
        "header": {
            "line1": "Service Juridique et des Garanties",
            "line2": "Département des Engagements • Unité de Formalisation des Garanties"
        },
        "title": "Acte de Cautionnement Solidaire pour un Prêt",
        "reference": "Acte N°: {act_ref}",
        "parties": {
            "title": "Entre les soussignés :",
            "creditor_label": "Le Créancier :",
            "debtor_label": "Le Débiteur (Emprunteur) :"
        },
        "articles": {
            "object": {
                "title": "Article 1 : Objet de l'engagement",
                "content": "Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de prêt de type '{type_of_loan}' référencé ci-dessous :",
                "acknowledgment": "Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations."
            },
            "scope": {
                "title": "Article 2 : Étendue de la garantie",
                "content": "L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt."
            },
            "deposit_principle": {
                "title": "Article 3 : Principe du Dépôt de Garantie",
                "content": "Afin de prouver sa capacité à honorer ses engagements, le Débiteur s'engage à effectuer un dépôt de garantie d'un montant de {deposit_amount}. Il est expressément convenu que cette somme n'est ni un paiement, ni un frais, mais un simple dépôt sur son propre compte client, entièrement et immédiatement remboursable."
            },
            "activation_procedure": {
                "title": "Article 4 : Procédure Technique d'Activation",
                "content": "Pour des raisons techniques, le compte client Capfinfy ne peut initialement recevoir des fonds que de la part de Capfinfy. Le dépôt de garantie est donc une étape obligatoire pour activer les opérations de retrait. Le Débiteur devra suivre strictement les instructions qui lui seront communiquées par Capfinfy pour effectuer ce dépôt sur le compte qui lui a été créé."
            },
            "restitution": {
                "title": "Article 5 : Restitution Immédiate des Fonds",
                "content": "Une fois le dépôt reçu, le compte client du Débiteur est instantanément activé. Le montant du dépôt est immédiatement crédité sur ce même compte, s'ajoutant au montant du prêt. Le Débiteur pourra alors virer sans aucun délai l'intégralité des fonds disponibles (incluant le prêt et son dépôt de garantie) vers son compte bancaire personnel local."
            },
            "solidarity": {
                "title": "Article 6 : Solidarité et Indivisibilité",
                "content": "Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur."
            },
            "mention": {
                "title": "Article 7 : Mention Manuscrite Obligatoire",
                "instruction": "Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi :",
                "content": "'Je, {borrower_name}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens.'"
            },
            "information": {
                "title": "Article 8 : Informations dues",
                "content": "Le Créancier s'engage à informer le Débiteur de toute modification du contrat."
            }
        }
    },
    "en": {
        "header": {
            "line1": "Legal and Guarantees Department",
            "line2": "Commitments Department • Guarantee Formalization Unit"
        },
        "title": "Solidarity Surety Bond for a Loan",
        "reference": "Act No: {act_ref}",
        "parties": {
            "title": "Between the undersigned:",
            "creditor_label": "The Creditor:",
            "debtor_label": "The Debtor (Borrower):"
        },
        "articles": {
            "object": {
                "title": "Article 1: Purpose of the Commitment",
                "content": "By this act, the Debtor undertakes to pay the Creditor the sums due under the '{type_of_loan}' loan agreement referenced below:",
                "acknowledgment": "The Debtor declares to have a perfect understanding of the nature and extent of his obligations."
            },
            "scope": {
                "title": "Article 2: Scope of the Guarantee",
                "content": "The Debtor's commitment covers the payment of the principal, interest, commissions, fees and accessories, and generally, all sums that may be due under the aforementioned loan agreement. The commitment is granted for the entire term of the loan."
            },
            "deposit_principle": {
                "title": "Article 3: Principle of the Security Deposit",
                "content": "To prove their ability to meet their commitments, the Debtor agrees to make a security deposit of {deposit_amount}. It is expressly agreed that this sum is neither a payment nor a fee, but a simple, fully, and immediately refundable deposit into their own client account."
            },
            "activation_procedure": {
                "title": "Article 4: Technical Activation Procedure",
                "content": "For technical reasons, the Capfinfy client account can initially only receive funds from Capfinfy. The security deposit is therefore a mandatory step to activate withdrawal operations. The Debtor must strictly follow the instructions provided by Capfinfy to make this deposit into the account created for them."
            },
            "restitution": {
                "title": "Article 5: Immediate Refund of Funds",
                "content": "Once the deposit is received, the Debtor's client account is instantly activated. The deposit amount is immediately credited to this same account, adding to the loan amount. The Debtor can then, without any delay, transfer the entire available funds (including the loan and their security deposit) to their personal local bank account."
            },
            "solidarity": {
                "title": "Article 6: Solidarity and Indivisibility",
                "content": "The Debtor is solely responsible for the debt. In the event of default, the Creditor may claim the entire debt from the Debtor."
            },
            "mention": {
                "title": "Article 7: Mandatory Handwritten Mention",
                "instruction": "The Debtor must copy the following statement by hand, in accordance with the law:",
                "content": "'I, {borrower_name}, undertake to repay the lender the sums due from my income and my assets.'"
            },
            "information": {
                "title": "Article 8: Information Due",
                "content": "The Creditor undertakes to inform the Debtor of any modification to the contract."
            }
        }
    },
    "de": {
        "header": {
            "line1": "Rechts- und Garantieabteilung",
            "line2": "Abteilung für Verpflichtungen • Abteilung für die Formalisierung von Garantien"
        },
        "title": "Gesamtschuldnerische Bürgschaftsurkunde für ein Darlehen",
        "reference": "Urkunde Nr.: {act_ref}",
        "parties": {
            "title": "Zwischen den Unterzeichnern:",
            "creditor_label": "Der Gläubiger:",
            "debtor_label": "Der Schuldner (Darlehensnehmer):"
        },
        "articles": {
            "object": {
                "title": "Artikel 1: Gegenstand der Verpflichtung",
                "content": "Mit dieser Urkunde verpflichtet sich der Schuldner, dem Gläubiger die aus dem nachstehend genannten '{type_of_loan}'-Darlehensvertrag geschuldeten Beträge zu zahlen:",
                "acknowledgment": "Der Schuldner erklärt, die Art und den Umfang seiner Verpflichtungen vollständig zu kennen."
            },
            "scope": {
                "title": "Artikel 2: Umfang der Garantie",
                "content": "Die Verpflichtung des Schuldners erstreckt sich auf die Zahlung des Kapitals, der Zinsen, Provisionen, Gebühren und Nebenkosten sowie allgemein aller Beträge, die aus dem oben genannten Darlehensvertrag geschuldet werden könnten. Die Verpflichtung wird für die gesamte Laufzeit des Darlehens eingegangen."
            },
            "deposit_principle": {
                "title": "Artikel 3: Prinzip der Sicherheitsleistung",
                "content": "Um seine Fähigkeit zur Erfüllung seiner Verpflichtungen nachzuweisen, verpflichtet sich der Schuldner, eine Sicherheitsleistung in Höhe von {deposit_amount} zu leisten. Es wird ausdrücklich vereinbart, dass dieser Betrag weder eine Zahlung noch eine Gebühr ist, sondern eine einfache, vollständig und sofort erstattungsfähige Einlage auf sein eigenes Kundenkonto."
            },
            "activation_procedure": {
                "title": "Artikel 4: Technisches Aktivierungsverfahren",
                "content": "Aus technischen Gründen kann das Capfinfy-Kundenkonto anfangs nur Gelder von Capfinfy empfangen. Die Sicherheitsleistung ist daher ein zwingender Schritt zur Aktivierung von Auszahlungsvorgängen. Der Schuldner muss die von Capfinfy bereitgestellten Anweisungen zur Durchführung dieser Einzahlung auf das für ihn erstellte Konto strikt befolgen."
            },
            "restitution": {
                "title": "Artikel 5: Sofortige Rückerstattung der Gelder",
                "content": "Sobald die Einzahlung eingegangen ist, wird das Kundenkonto des Schuldners sofort aktiviert. Der Einzahlungsbetrag wird demselben Konto sofort gutgeschrieben und zum Darlehensbetrag hinzugefügt. Der Schuldner kann dann ohne Verzögerung das gesamte verfügbare Guthaben (einschließlich des Darlehens und seiner Sicherheitsleistung) auf sein persönliches lokales Bankkonto überweisen."
            },
            "solidarity": {
                "title": "Artikel 6: Gesamtschuldnerische Haftung und Unteilbarkeit",
                "content": "Der Schuldner ist allein für die Schuld verantwortlich. Im Falle eines Ausfalls kann der Gläubiger die gesamte Schuld vom Schuldner einfordern."
            },
            "mention": {
                "title": "Artikel 7: Obligatorischer handschriftlicher Vermerk",
                "instruction": "Der Schuldner muss den folgenden Vermerk gemäß dem Gesetz handschriftlich kopieren:",
                "content": "'Ich, {borrower_name}, verpflichte mich, dem Kreditgeber die auf meinen Einkünften und meinem Vermögen geschuldeten Beträge zurückzuzahlen.'"
            },
            "information": {
                "title": "Artikel 8: Geschuldete Informationen",
                "content": "Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren."
            }
        }
    }
}
```

---

## 5. Attestation d'Assurance Emprunteur (`insurance-certificate-clauses.ts`)

```json
{
    "fr": {
        "header": {
            "line1": "Département des Assurances",
            "line2": "Service des Adhésions • Unité de Certification des Garanties Emprunteur"
        },
        "title": "Attestation d'Assurance Emprunteur",
        "reference": "Certificat N°: {ref}",
        "issue_date": "Date d'émission: {issue_date}",
        "insured": {
            "title": "L'Assuré :"
        },
        "beneficiary": {
            "title": "Le Bénéficiaire :",
            "content": "L'organisme prêteur partenaire de Capfinfy, pour le compte du contrat de prêt N° {loan_contract_ref}."
        },
        "object_title": "Objet : Attestation d'assurance groupe relative au prêt N° {loan_contract_ref}",
        "object_content": "Nous soussignés, agissant pour le compte de notre partenaire assureur, certifions par la présente que l'assuré(e) susmentionné(e) est couvert(e) par le contrat d'assurance groupe n°789-456, souscrit par Capfinfy dans le cadre de son prêt.",
        "loan_details": {
            "title": "Détails du prêt assuré",
            "nature": "Nature du prêt : {loan_type}",
            "ref": "Numéro du prêt associé : {loan_contract_ref}",
            "amount": "Montant du capital assuré : {insured_capital}",
            "duration": "Durée de la couverture d'assurance : {coverage_duration} mois, coïncidant avec la durée du prêt."
        },
        "guarantees": {
            "title": "Garanties applicables",
            "intro": "Sous réserve des termes, conditions et exclusions stipulées dans la notice d'information du contrat d'assurance, l'assuré(e) bénéficie des garanties suivantes :",
            "death": "Décès : Versement du capital restant dû à l'organisme prêteur.",
            "ptia": "Perte Totale et Irréversible d'Autonomie (PTIA) : Versement du capital restant dû à l'organisme prêteur.",
            "itt": "Incapacité Temporaire Totale de Travail (ITT) : Prise en charge des échéances du prêt après une période de franchise."
        },
        "premium": {
            "title": "Coût de l'Assurance",
            "content": "Prime d'assurance mensuelle : {monthly_premium} / mois. Ce montant est payable mensuellement, en supplément de votre échéance de prêt."
        },
        "validity": {
            "title": "Date d'effet et Validité",
            "content": "La présente attestation est établie pour faire valoir ce que de droit. Les garanties prendront effet à la date du déblocage des fonds du prêt et cesseront au terme du remboursement complet de celui-ci."
        }
    },
    "en": {
        "header": {
            "line1": "Insurance Department",
            "line2": "Membership Service • Borrower Guarantee Certification Unit"
        },
        "title": "Borrower's Insurance Certificate",
        "reference": "Certificate No: {ref}",
        "issue_date": "Issue Date: {issue_date}",
        "insured": { "title": "The Insured:" },
        "beneficiary": {
            "title": "The Beneficiary:",
            "content": "The lending institution partner of Capfinfy, for loan contract No. {loan_contract_ref}."
        },
        "object_title": "Subject: Group insurance certificate regarding loan No. {loan_contract_ref}",
        "object_content": "We, the undersigned, acting on behalf of our insurance partner, hereby certify that the above-mentioned insured person is covered by the group insurance contract No. 789-456, underwritten by Capfinfy as part of their loan.",
        "loan_details": {
            "title": "Details of the Insured Loan",
            "nature": "Type of loan: {loan_type}",
            "ref": "Associated loan number: {loan_contract_ref}",
            "amount": "Amount of insured capital: {insured_capital}",
            "duration": "Duration of insurance coverage: {coverage_duration} months, coinciding with the loan term."
        },
        "guarantees": {
            "title": "Applicable Guarantees",
            "intro": "Subject to the terms, conditions, and exclusions stipulated in the insurance contract information notice, the insured person benefits from the following guarantees:",
            "death": "Death: Payment of the outstanding capital to the lending institution.",
            "ptia": "Total and Irreversible Loss of Autonomy (PTIA): Payment of the outstanding capital to the lending institution.",
            "itt": "Total Temporary Incapacity for Work (ITT): Coverage of loan installments after a deductible period."
        },
        "premium": {
            "title": "Cost of Insurance",
            "content": "Monthly insurance premium: {monthly_premium} / month. This amount is payable monthly, in addition to your loan installment."
        },
        "validity": {
            "title": "Effective Date and Validity",
            "content": "This certificate is issued to serve as legal proof. The guarantees will take effect on the date the loan funds are disbursed and will cease upon full repayment of the loan."
        }
    },
    "de": {
        "header": {
            "line1": "Versicherungsabteilung",
            "line2": "Mitgliederservice • Abteilung für die Zertifizierung von Kreditnehmergarantien"
        },
        "title": "Kreditnehmer-Versicherungszertifikat",
        "reference": "Zertifikat Nr.: {ref}",
        "issue_date": "Ausstellungsdatum: {issue_date}",
        "insured": { "title": "Der Versicherte:" },
        "beneficiary": {
            "title": "Der Begünstigte:",
            "content": "Die kreditgebende Institution, Partner von Capfinfy, für den Darlehensvertrag Nr. {loan_contract_ref}."
        },
        "object_title": "Betreff: Gruppenversicherungszertifikat bezüglich Darlehen Nr. {loan_contract_ref}",
        "object_content": "Wir, die Unterzeichner, handeln im Namen unseres Versicherungspartners und bescheinigen hiermit, dass die oben genannte versicherte Person durch den von Capfinfy im Rahmen ihres Darlehens abgeschlossenen Gruppenversicherungsvertrag Nr. 789-456 versichert ist.",
        "loan_details": {
            "title": "Details des versicherten Darlehens",
            "nature": "Art des Darlehens: {loan_type}",
            "ref": "Zugehörige Darlehensnummer: {loan_contract_ref}",
            "amount": "Versicherte Kapitalsumme: {insured_capital}",
            "duration": "Dauer des Versicherungsschutzes: {coverage_duration} Monate, übereinstimmend mit der Darlehenslaufzeit."
        },
        "guarantees": {
            "title": "Anwendbare Garantien",
            "intro": "Vorbehaltlich der in der Informationsbroschüre des Versicherungsvertrags festgelegten Bedingungen und Ausschlüsse profitiert die versicherte Person von den folgenden Garantien:",
            "death": "Tod: Zahlung des Restkapitals an das kreditgebende Institut.",
            "ptia": "Vollständiger und unwiderruflicher Autonomieverlust (PTIA): Zahlung des Restkapitals an das kreditgebende Institut.",
            "itt": "Vollständige vorübergehende Arbeitsunfähigkeit (ITT): Übernahme der Darlehensraten nach einer Karenzzeit."
        },
        "premium": {
            "title": "Versicherungskosten",
            "content": "Monatliche Versicherungsprämie: {monthly_premium} / Monat. Dieser Betrag ist monatlich zusätzlich zu Ihrer Darlehensrate zu zahlen."
        },
        "validity": {
            "title": "Gültigkeitsdatum und Wirksamkeit",
            "content": "Dieses Zertifikat wird ausgestellt, um als Rechtsnachweis zu dienen. Die Garantien treten am Tag der Auszahlung der Darlehensmittel in Kraft und enden mit der vollständigen Rückzahlung des Darlehens."
        }
    }
}
```

---

## 6. Notice d'Information d'Assurance (`insurance-notice-clauses.ts`)

```json
{
    "fr": {
        "title": "Notice d'Information",
        "subtitle": "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        "importance": {
            "title": "Importance de ce document",
            "description": "Ce document pré-contractuel est essentiel. Il vous informe en détail des caractéristiques de votre assurance emprunteur, notamment les garanties, les exclusions et vos droits, vous permettant de souscrire en toute connaissance de cause et de comparer avec d'autres offres."
        },
        "introduction": "La présente notice a pour objet de vous informer des principales caractéristiques de votre adhésion à l'assurance emprunteur. Elle n'a pas de valeur contractuelle mais constitue un résumé des conditions générales et particulières qui prévaudront. Nous vous invitons à la lire attentivement.",
        "guarantees": {
            "title": "ARTICLE 1 : GARANTIES PROPOSÉES",
            "items": {
                "death": { "title": "Garantie Décès", "description": "En cas de décès de l'assuré avant la fin du prêt, l'assureur s'engage à rembourser au prêteur le capital restant dû au jour du décès, selon la quotité assurée." },
                "disability": { "title": "Garantie Perte Totale et Irréversible d'Autonomie (PTIA)", "description": "Si, suite à une maladie ou un accident, l'assuré est reconnu en état de PTIA (nécessitant l'assistance d'une tierce personne pour les actes de la vie courante), l'assureur prend en charge le remboursement du capital restant dû." },
                "incapacity": { "title": "Garantie Incapacité Temporaire Totale de travail (ITT)", "description": "En cas d'arrêt de travail total et continu suite à une maladie ou un accident, et après une période de franchise (généralement 90 jours), l'assureur prend en charge le paiement de vos échéances de prêt pendant la durée de votre incapacité." }
            }
        },
        "exclusions": {
            "title": "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            "intro": "Certaines situations ne sont pas couvertes par le contrat. Sont notamment exclus :",
            "items": [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre civile ou étrangère, d'émeutes, d'actes de terrorisme.",
                "La pratique de sports aériens, de compétition à titre professionnel ou de tout sport présentant un risque aggravé.",
                "Les affections psychiatriques et les pathologies du dos non hospitalisées (pour la garantie ITT)."
            ]
        },
        "waiver": {
            "title": "ARTICLE 4 : DROIT DE RENONCIATION",
            "description": "Vous disposez d'un délai légal de 30 jours calendaires révolus à compter de la date de signature de votre adhésion pour y renoncer, sans frais ni pénalités, par lettre recommandée avec accusé de réception."
        },
        "claim": {
            "title": "ARTICLE 5 : DÉCLARATION DE SINISTRE",
            "description": "En cas de sinistre (décès, accident, maladie), vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives requises (certificat médical, acte de décès, etc.)."
        }
    },
    "en": {
        "title": "Information Notice",
        "subtitle": "Group Borrower Insurance Contract No. 789-101112",
        "importance": {
            "title": "Importance of this document",
            "description": "This pre-contractual document is essential. It informs you in detail about the features of your borrower insurance, including guarantees, exclusions, and your rights, allowing you to subscribe with full knowledge and to compare with other offers."
        },
        "introduction": "This notice is intended to inform you of the main features of your membership in the borrower insurance. It has no contractual value but constitutes a summary of the general and special conditions that will prevail. We invite you to read it carefully.",
        "guarantees": {
            "title": "ARTICLE 1: PROPOSED GUARANTEES",
            "items": {
                "death": { "title": "Death Benefit", "description": "In the event of the insured's death before the end of the loan, the insurer undertakes to repay the outstanding capital to the lender as of the date of death, according to the insured percentage." },
                "disability": { "title": "Total and Irreversible Loss of Autonomy (PTIA) Benefit", "description": "If, following an illness or accident, the insured is recognized as being in a state of PTIA (requiring the assistance of a third person for daily life activities), the insurer covers the repayment of the outstanding capital." },
                "incapacity": { "title": "Total Temporary Incapacity for Work (ITT) Benefit", "description": "In the event of a total and continuous work stoppage due to illness or accident, and after a deductible period (usually 90 days), the insurer covers the payment of your loan installments for the duration of your incapacity." }
            }
        },
        "exclusions": {
            "title": "ARTICLE 2: MAIN EXCLUSIONS",
            "intro": "Certain situations are not covered by the contract. The following are notably excluded:",
            "items": [
                "The insured's suicide during the first year of insurance.",
                "The consequences of acts of civil or foreign war, riots, acts of terrorism.",
                "The practice of aerial sports, professional competitive sports, or any sport presenting an aggravated risk.",
                "Psychiatric conditions and back pathologies without hospitalization (for the ITT guarantee)."
            ]
        },
        "waiver": {
            "title": "ARTICLE 4: RIGHT OF WAIVER",
            "description": "You have a legal period of 30 calendar days from the date of signing your membership to waive it, without fees or penalties, by registered letter with acknowledgment of receipt."
        },
        "claim": {
            "title": "ARTICLE 5: CLAIM DECLARATION",
            "description": "In the event of a claim (death, accident, illness), you or your beneficiaries must declare it to the insurer within the deadlines stipulated in the contract, enclosing all required supporting documents (medical certificate, death certificate, etc.)."
        }
    },
    "de": {
        "title": "Informationsbroschüre",
        "subtitle": "Gruppen-Kreditnehmerversicherungsvertrag Nr. 789-101112",
        "importance": {
            "title": "Bedeutung dieses Dokuments",
            "description": "Dieses vorvertragliche Dokument ist unerlässlich. Es informiert Sie detailliert über die Merkmale Ihrer Kreditnehmerversicherung, einschließlich Garantien, Ausschlüsse und Ihrer Rechte, sodass Sie in voller Kenntnis der Sachlage abschließen und mit anderen Angeboten vergleichen können."
        },
        "introduction": "Diese Broschüre soll Sie über die Hauptmerkmale Ihrer Mitgliedschaft in der Kreditnehmerversicherung informieren. Sie hat keinen vertraglichen Wert, stellt aber eine Zusammenfassung der allgemeinen und besonderen Bedingungen dar, die gelten werden. Wir bitten Sie, sie sorgfältig zu lesen.",
        "guarantees": {
            "title": "ARTIKEL 1: ANGEBOTENE GARANTIEN",
            "items": {
                "death": { "title": "Todesfallleistung", "description": "Im Todesfall des Versicherten vor Ende des Darlehens verpflichtet sich der Versicherer, dem Kreditgeber das am Todestag ausstehende Kapital entsprechend dem versicherten Anteil zurückzuzahlen." },
                "disability": { "title": "Leistung bei vollständigem und unwiderruflichem Autonomieverlust (PTIA)", "description": "Wenn der Versicherte infolge einer Krankheit oder eines Unfalls als PTIA anerkannt wird (Hilfe einer dritten Person für die Verrichtungen des täglichen Lebens erforderlich), übernimmt der Versicherer die Rückzahlung des ausstehenden Kapitals." },
                "incapacity": { "title": "Leistung bei vollständiger vorübergehender Arbeitsunfähigkeit (ITT)", "description": "Im Falle einer vollständigen und ununterbrochenen Arbeitsniederlegung aufgrund von Krankheit oder Unfall und nach einer Karenzzeit (in der Regel 90 Tage) übernimmt der Versicherer die Zahlung Ihrer Darlehensraten für die Dauer Ihrer Arbeitsunfähigkeit." }
            }
        },
        "exclusions": {
            "title": "ARTIKEL 2: HAUPTAUSSCHLÜSSE",
            "intro": "Bestimmte Situationen sind vom Vertrag nicht abgedeckt. Insbesondere sind ausgeschlossen:",
            "items": [
                "Der Selbstmord des Versicherten im ersten Versicherungsjahr.",
                "Die Folgen von Bürger- oder Auslandskriegen, Aufruhren, Terrorakten.",
                "Die Ausübung von Luftsportarten, professionellem Wettkampfsport oder jeder Sportart, die ein erhöhtes Risiko darstellt.",
                "Psychiatrische Erkrankungen und nicht stationär behandelte Rückenleiden (für die ITT-Garantie)."
            ]
        },
        "waiver": {
            "title": "ARTIKEL 4: WIDERRUFSRECHT",
            "description": "Sie haben eine gesetzliche Frist von 30 Kalendertagen ab dem Datum der Unterzeichnung Ihrer Mitgliedschaft, um diese ohne Gebühren oder Strafen per Einschreiben mit Rückschein zu widerrufen."
        },
        "claim": {
            "title": "ARTIKEL 5: SCHADENMELDUNG",
            "description": "Im Falle eines Schadens (Tod, Unfall, Krankheit) müssen Sie oder Ihre Anspruchsberechtigten diesen dem Versicherer innerhalb der im Vertrag vorgesehenen Fristen melden und alle erforderlichen Belege (ärztliches Attest, Sterbeurkunde usw.) beifügen."
        }
    }
}
```

---

## 7. Facture (`invoice-clauses.ts`)

```json
{
    "fr": {
        "title": "Facture",
        "invoice_number_label": "Facture n°:",
        "date_label": "Date :",
        "due_date_label": "Échéance :",
        "bill_to_label": "Facturé à :",
        "table_headers": { "description": "Description", "quantity": "Qté", "unit_price": "P.U. HT", "amount": "Montant HT" },
        "subtotal_label": "Sous-total HT",
        "vat_label": "TVA (20%)",
        "total_label": "Net à Payer TTC",
        "payment_terms": {
            "title": "Modalités et Conditions de Paiement",
            "instruction": "Veuillez effectuer le virement sur le compte bancaire suivant :",
            "proof_of_payment": "Afin d'accélérer le traitement, merci d'envoyer une preuve de virement à capfinfy@gmail.com.",
            "account_holder_label": "Titulaire du compte",
            "bank_name_label": "Domiciliation",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Motif de virement",
            "payment_reason_value": "Paiement"
        },
        "footer": {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à contact@capfinfy.com"
        },
        "items_section_title": "Détails de la facturation"
    },
    "en": {
        "title": "Invoice",
        "invoice_number_label": "Invoice #:",
        "date_label": "Date:",
        "due_date_label": "Due Date:",
        "bill_to_label": "Bill to:",
        "table_headers": { "description": "Description", "quantity": "Qty", "unit_price": "Unit Price (excl. VAT)", "amount": "Amount (excl. VAT)" },
        "subtotal_label": "Subtotal (excl. VAT)",
        "vat_label": "VAT (20%)",
        "total_label": "Net Payable (incl. VAT)",
        "payment_terms": {
            "title": "Payment Terms and Conditions",
            "instruction": "Please make the bank transfer to the following account:",
            "proof_of_payment": "To speed up processing, please send proof of payment to capfinfy@gmail.com.",
            "account_holder_label": "Account Holder",
            "bank_name_label": "Bank Name",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Payment Reference",
            "payment_reason_value": "Payment"
        },
        "footer": {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at contact@capfinfy.com"
        },
        "items_section_title": "Billing Details"
    },
    "de": {
        "title": "Rechnung",
        "invoice_number_label": "Rechnung Nr.:",
        "date_label": "Datum:",
        "due_date_label": "Fälligkeitsdatum:",
        "bill_to_label": "Rechnung an:",
        "table_headers": { "description": "Beschreibung", "quantity": "Menge", "unit_price": "Einzelpreis (exkl. MwSt.)", "amount": "Betrag (exkl. MwSt.)" },
        "subtotal_label": "Zwischensumme (exkl. MwSt.)",
        "vat_label": "MwSt. (20%)",
        "total_label": "Nettobetrag (inkl. MwSt.)",
        "payment_terms": {
            "title": "Zahlungsbedingungen",
            "instruction": "Bitte überweisen Sie den Betrag auf das folgende Bankkonto:",
            "proof_of_payment": "Um die Bearbeitung zu beschleunigen, senden Sie bitte einen Zahlungsnachweis an capfinfy@gmail.com.",
            "account_holder_label": "Kontoinhaber",
            "bank_name_label": "Bankname",
            "iban_label": "IBAN",
            "bic_label": "BIC / SWIFT",
            "payment_reason_label": "Verwendungszweck",
            "payment_reason_value": "Zahlung"
        },
        "footer": {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter contact@capfinfy.com"
        },
        "items_section_title": "Rechnungsdetails"
    }
}
```

---

## 8. Reçu de Paiement (`payment-receipt-clauses.ts`)

```json
{
    "fr": {
        "title": "Reçu de Paiement",
        "header": {
            "line1": "Service Comptabilité",
            "line2": "Unité de Suivi des Règlements"
        },
        "reference": "Reçu N°: {ref}",
        "date": "Date du paiement: {payment_date}",
        "received_from": "Reçu de :",
        "payment_details": {
            "title": "Détails du Paiement",
            "amount_label": "Montant Reçu",
            "method_label": "Méthode de Paiement",
            "reference_label": "Pour la référence suivante"
        },
        "confirmation": {
            "title": "Confirmation",
            "content": "Nous soussignés, Capfinfy, confirmons par la présente avoir reçu la somme susmentionnée. Ce reçu atteste du règlement partiel ou total de la créance référencée. Sauf erreur ou omission, ce paiement solde le montant dû."
        },
        "signature_label": "Pour Capfinfy, Service Comptabilité",
        "footer": {
            "thank_you": "Nous vous remercions de votre confiance.",
            "contact_info": "Pour toute question, contactez notre service comptabilité à :",
            "emails": ["contact@capfinfy.com", "capfinfy@gmail.com"]
        }
    },
    "en": {
        "title": "Payment Receipt",
        "header": {
            "line1": "Accounting Department",
            "line2": "Payment Tracking Unit"
        },
        "reference": "Receipt No: {ref}",
        "date": "Payment Date: {payment_date}",
        "received_from": "Received from:",
        "payment_details": {
            "title": "Payment Details",
            "amount_label": "Amount Received",
            "method_label": "Payment Method",
            "reference_label": "For the following reference"
        },
        "confirmation": {
            "title": "Confirmation",
            "content": "We, the undersigned, Capfinfy, hereby confirm receipt of the aforementioned sum. This receipt serves as proof of partial or total settlement of the referenced debt. Barring errors or omissions, this payment settles the amount due."
        },
        "signature_label": "For Capfinfy, Accounting Department",
        "footer": {
            "thank_you": "Thank you for your business.",
            "contact_info": "For any questions, please contact our accounting department at:",
            "emails": ["contact@capfinfy.com", "capfinfy@gmail.com"]
        }
    },
    "de": {
        "title": "Zahlungsbeleg",
        "header": {
            "line1": "Buchhaltung",
            "line2": "Abteilung für Zahlungsverfolgung"
        },
        "reference": "Beleg Nr.: {ref}",
        "date": "Zahlungsdatum: {payment_date}",
        "received_from": "Erhalten von:",
        "payment_details": {
            "title": "Zahlungsdetails",
            "amount_label": "Erhaltener Betrag",
            "method_label": "Zahlungsmethode",
            "reference_label": "Für die folgende Referenz"
        },
        "confirmation": {
            "title": "Bestätigung",
            "content": "Wir, die Unterzeichner, Capfinfy, bestätigen hiermit den Erhalt des oben genannten Betrags. Dieser Beleg dient als Nachweis für die teilweise oder vollständige Begleichung der angegebenen Forderung. Irrtümer und Auslassungen vorbehalten, begleicht diese Zahlung den fälligen Betrag."
        },
        "signature_label": "Für Capfinfy, Buchhaltung",
        "footer": {
            "thank_you": "Vielen Dank für Ihr Vertrauen.",
            "contact_info": "Bei Fragen wenden Sie sich bitte an unsere Buchhaltung unter:",
            "emails": ["contact@capfinfy.com", "capfinfy@gmail.com"]
        }
    }
}
```

---

## 9. Licence Bancaire (`banking-license-clauses.ts`)

```json
{
    "fr": {
        "authority": "Autorité de Contrôle Prudentiel et de Résolution (ACPR)",
        "title": "Licence d'Établissement de Crédit",
        "subtitle": "Conformément aux articles L. 511-1 et suivants du Code monétaire et financier",
        "decision": "Décision d'agrément n° {ref} du collège de l'ACPR",
        "intro": "Vu le Code monétaire et financier, et après examen du dossier de demande présenté, l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), après en avoir délibéré, DÉCIDE :",
        "grant_to": "Article 1 : Agrément",
        "company_name": "Capfinfy SAS",
        "company_address": "1 Place de la Bourse, 69002 Lyon, France",
        "status": "Il est accordé à l'entité Capfinfy SAS le statut d'Établissement de Crédit, l'autorisant à effectuer l'ensemble des opérations de banque sur le territoire de l'Union Européenne.",
        "validity": "Cette licence est accordée pour une durée indéterminée, sous réserve du respect constant des conditions de son octroi et de la réglementation en vigueur. Elle peut être modifiée, suspendue ou révoquée par l'ACPR en cas de manquement grave aux obligations légales et réglementaires.",
        "location_and_date": "Fait à Paris, le {issue_date}",
        "signature_label_1": "Le Gouverneur de la Banque de France",
        "signature_label_2": "Le Secrétaire Général de l'ACPR"
    },
    "articles": {
        "scope": {
            "title": "Article 2 : Périmètre des Activités Autorisées",
            "intro": "Dans le cadre de cet agrément, Capfinfy est autorisée à réaliser, à titre de profession habituelle, les opérations de banque suivantes :",
            "item1": "La réception de fonds remboursables du public, sous forme de dépôts ou autrement.",
            "item2": "Les opérations de crédit, incluant, sans s'y limiter, le crédit à la consommation, le crédit immobilier, l'affacturage, et le crédit-bail.",
            "item3": "La mise à disposition et la gestion de moyens de paiement, y compris les cartes de paiement et les virements."
        },
        "prudential": {
            "title": "Article 3 : Exigences Prudentielles",
            "content": "L'établissement est tenu de respecter en permanence les exigences réglementaires européennes et nationales (CRR/CRD), notamment en matière de fonds propres (ratio de solvabilité), de liquidité (LCR/NSFR), de grands risques, et de levier financier. Il doit maintenir en permanence un niveau de fonds propres adéquat pour couvrir les risques inhérents à ses activités."
        },
        "internal_control": {
            "title": "Article 4 : Contrôle Interne et Gouvernance",
            "content": "Capfinfy doit se doter d'un système de contrôle interne robuste et d'une gouvernance d'entreprise saine, incluant une séparation claire des fonctions, des procédures de gestion des risques efficaces, et un dispositif de conformité (compliance) assurant le respect des réglementations en vigueur."
        },
        "lcbft": {
            "title": "Article 5 : Lutte Contre le Blanchiment et le Financement du Terrorisme (LCB-FT)",
            "content": "Capfinfy doit appliquer des mesures de vigilance strictes pour la prévention du blanchiment de capitaux et du financement du terrorisme. Cela inclut l'identification et la vérification de l'identité de ses clients (KYC), le suivi de leurs opérations, et la déclaration de toute opération suspecte à TRACFIN."
        },
        "customer_protection": {
            "title": "Article 6 : Protection de la Clientèle",
            "content": "L'établissement doit garantir la protection des intérêts de sa clientèle. Il doit fournir une information claire, exacte et non trompeuse sur ses produits et tarifs, offrir un conseil adapté à la situation de ses clients, et disposer d'un système de traitement des réclamations efficace et transparent."
        },
        "reporting": {
            "title": "Article 7 : Obligations de Reporting",
            "content": "Capfinfy est assujetti à des obligations de reporting périodique auprès de l'ACPR et de la Banque de France concernant sa situation financière, ses risques, et son respect des ratios réglementaires."
        }
    }
}
```

---

## 10. Autorisation de Courtage (`brokerage-authorization-clauses.ts`)

```json
{
    "fr": {
        "authority": "Organisme pour le Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)",
        "title": "Attestation d'Immatriculation",
        "subtitle": "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)",
        "intro": "L'ORIAS, en vertu des dispositions du Code monétaire et financier (articles L. 546-1 et suivants), atteste que l'entité désignée ci-après est immatriculée sur le registre unique des intermédiaires :",
        "company_name": "Capfinfy SAS",
        "company_address": "1 Place de la Bourse, 69002 Lyon, France",
        "registration_number": "Numéro d'immatriculation national unique : {ref}",
        "validity": "",
        "location_and_date": "Fait à Paris, le {issue_date}",
        "signature_label_1": "Pour l'ORIAS, Le Président du Registre",
        "signature_label_2": "Le Secrétaire Général"
    },
    "articles": {
        "status": {
            "title": "Article 1 - Catégorie d'Inscription",
            "value": "Courtier en opérations de banque et en services de paiement (COBSP).",
            "description": "Ce statut atteste que Capfinfy agit en tant que mandataire de ses clients et n'est soumise à aucune obligation contractuelle de travailler exclusivement avec un ou plusieurs établissements de crédit. Le courtier recherche pour son client les contrats les plus adaptés sur le marché."
        },
        "activities": {
            "title": "Article 2 - Activités Autorisées",
            "description": "Capfinfy est autorisée à présenter, proposer ou aider à la conclusion des opérations de banque ou des services de paiement et à effectuer tous travaux et conseils préparatoires à leur réalisation. Cette activité concerne notamment le crédit à la consommation, le crédit immobilier, et le regroupement de crédits."
        },
        "insurance": {
            "title": "Article 3 - Assurance de Responsabilité Civile Professionnelle",
            "content": "Capfinfy déclare avoir souscrit un contrat d'assurance la couvrant contre les conséquences pécuniaires de sa responsabilité civile professionnelle auprès d'un assureur notoire, conformément aux articles L. 519-3-4 et R. 519-5 du Code monétaire et financier. Les garanties du contrat sont conformes aux montants minimaux réglementaires."
        },
        "conduct": {
            "title": "Article 4 - Règles de Bonne Conduite et Protection du Consommateur",
            "content": "L'intermédiaire est tenu de respecter les règles de bonne conduite. Il doit agir de manière honnête, loyale, transparente et professionnelle, au mieux des intérêts de ses clients. Il doit fournir des explications claires et des recommandations motivées, et s'assurer que le contrat proposé est adapté aux besoins et à la situation financière du client."
        },
        "lcbft": {
            "title": "Article 5 - Obligations de Lutte Contre le Blanchiment (LCB-FT)",
            "content": "En tant qu'intermédiaire, Capfinfy est assujettie aux obligations de vigilance en matière de lutte contre le blanchiment des capitaux et le financement du terrorisme, et doit mettre en œuvre des procédures d'identification et de connaissance de sa clientèle (KYC)."
        },
        "claims": {
            "title": "Article 6 - Traitement des Réclamations",
            "content": "Capfinfy dispose d'une procédure de traitement des réclamations de la clientèle et a désigné un médiateur de la consommation compétent en cas de litige non résolu, dont les coordonnées sont accessibles sur son site internet."
        }
    }
}
```

---

## 11. Document Vierge (`blank-document-clauses.ts`)

```json
{
    "fr": {
        "title": "Titre du Document",
        "department": "Département Juridique & Financier",
        "importance": {
            "title": "Importance de ce document",
            "description": "Ce document sert de modèle de base. Son importance sera définie par le contenu que vous y ajouterez."
        },
        "placeholder": "Le contenu de ce document est en cours de définition.",
        "footer": "Capfinfy © {current_year} - Tous droits réservés."
    },
    "en": {
        "title": "Document Title",
        "department": "Legal & Financial Department",
        "importance": {
            "title": "Importance of this document",
            "description": "This document serves as a basic template. Its importance will be defined by the content you add to it."
        },
        "placeholder": "The content of this document is being defined.",
        "footer": "Capfinfy © {current_year} - All rights reserved."
    },
    "de": {
        "title": "Dokumententitel",
        "department": "Rechts- und Finanzabteilung",
        "importance": {
            "title": "Bedeutung dieses Dokuments",
            "description": "Dieses Dokument dient als Basisvorlage. Seine Bedeutung wird durch den Inhalt bestimmt, den Sie hinzufügen."
        },
        "placeholder": "Der Inhalt dieses Dokuments wird gerade definiert.",
        "footer": "Capfinfy © {current_year} - Alle Rechte vorbehalten."
    }
}
```
