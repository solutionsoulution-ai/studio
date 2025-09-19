
import type { Clauses } from "./languages";

export const insuranceNoticeClauses: Clauses = {
    fr: {
        title: "Notice d'Information",
        subtitle: "Contrat d'Assurance Emprunteur Groupe n°789-101112",
        importance: {
            title: "Importance de ce document",
            description: "La notice d'information est un document pré-contractuel essentiel. Elle vous permet de comprendre en détail l'étendue des garanties proposées par l'assurance emprunteur, mais aussi et surtout ses limites et exclusions. Sa lecture attentive est indispensable pour faire un choix éclairé avant de vous engager."
        },
        introduction: "La présente notice a pour objet de vous informer des principales caractéristiques de votre assurance emprunteur. Nous vous invitons à la lire attentivement avant votre adhésion. Elle n'a pas de valeur contractuelle, seules les Conditions Générales et Particulières du contrat d'assurance prévalent.",
        guarantees: {
            title: "ARTICLE 1 : GARANTIES PROPOSÉES",
            description: "Le contrat couvre les risques suivants :",
            items: {
                death: {
                    title: "Décès",
                    description: "En cas de décès de l'assuré avant la fin du prêt, l'assureur rembourse à l'organisme prêteur le capital restant dû."
                },
                disability: {
                    title: "Perte Totale et Irréversible d'Autonomie (PTIA)",
                    description: "Si l'assuré se trouve en état de PTIA, l'assureur rembourse également le capital restant dû."
                },
                incapacity: {
                    title: "Incapacité Temporaire Totale de travail (ITT)",
                    description: "En cas d'arrêt de travail suite à une maladie ou un accident, l'assureur prend en charge le remboursement des échéances du prêt, après une franchise de 90 jours."
                }
            }
        },
        exclusions: {
            title: "ARTICLE 2 : PRINCIPALES EXCLUSIONS",
            description: "Certaines situations ne sont pas couvertes par l'assurance. Sont notamment exclus :",
            items: [
                "Le suicide de l'assuré au cours de la première année d'assurance.",
                "Les conséquences de faits de guerre, d'émeutes ou d'actes de terrorisme.",
                "La pratique de sports aériens, de sports de combat, ou de tout autre sport à titre professionnel.",
                "Les sinistres résultant d'une faute intentionnelle de l'assuré.",
                "Les affections psychiatriques et les maux de dos sans hospitalisation."
            ]
        },
        claims: {
            title: "ARTICLE 3 : DÉMARCHES EN CAS DE SINISTRE",
            description: "En cas de sinistre, vous ou vos ayants droit devez le déclarer à l'assureur dans les délais prévus au contrat, en joignant toutes les pièces justificatives demandées (certificat de décès, rapports médicaux, etc.)."
        },
        waiver: {
            title: "ARTICLE 4 : DROIT DE RENONCIATION",
            description: "Vous disposez d'un délai de 30 jours calendaires à compter de la date de signature de votre demande d'adhésion pour y renoncer, par lettre recommandée avec accusé de réception, sans frais ni pénalités."
        },
        contact: {
            title: "ARTICLE 5 : CONTACT ET RÉCLAMATION",
            description: "Pour toute question ou réclamation, vous pouvez contacter {company_name} à l'adresse suivante : {company_address}."
        },
        footer: "Ce document est un résumé non contractuel des garanties."
    },
    en: {
        title: "Information Notice",
        subtitle: "Group Borrower Insurance Contract No. 789-101112",
        importance: {
            title: "Importance of this document",
            description: "The information notice is an essential pre-contractual document. It allows you to understand in detail the scope of the guarantees offered by the borrower insurance, but also and above all its limitations and exclusions. Reading it carefully is essential to make an informed choice before committing."
        },
        introduction: "This notice is intended to inform you of the main features of your borrower insurance. We invite you to read it carefully before joining. It has no contractual value; only the General and Special Conditions of the insurance contract prevail.",
        guarantees: {
            title: "ARTICLE 1: PROPOSED GUARANTEES",
            description: "The contract covers the following risks:",
            items: {
                death: {
                    title: "Death",
                    description: "In the event of the insured's death before the end of the loan, the insurer repays the outstanding capital to the lending institution."
                },
                disability: {
                    title: "Total and Irreversible Loss of Autonomy (PTIA)",
                    description: "If the insured is in a state of PTIA, the insurer also repays the outstanding capital."
                },
                incapacity: {
                    title: "Total Temporary Incapacity for Work (ITT)",
                    description: "In case of work stoppage due to illness or accident, the insurer covers the repayment of loan installments, after a 90-day waiting period."
                }
            }
        },
        exclusions: {
            title: "ARTICLE 2: MAIN EXCLUSIONS",
            description: "Certain situations are not covered by the insurance. The following are notably excluded:",
            items: [
                "The insured's suicide during the first year of insurance.",
                "The consequences of acts of war, riots, or acts of terrorism.",
                "The practice of aerial sports, combat sports, or any other sport on a professional basis.",
                "Claims resulting from the insured's intentional fault.",
                "Psychiatric conditions and back pain without hospitalization."
            ]
        },
        claims: {
            title: "ARTICLE 3: PROCEDURES IN CASE OF A CLAIM",
            description: "In the event of a claim, you or your beneficiaries must declare it to the insurer within the time limits specified in the contract, enclosing all requested supporting documents (death certificate, medical reports, etc.)."
        },
        waiver: {
            title: "ARTICLE 4: RIGHT OF WAIVER",
            description: "You have a period of 30 calendar days from the date of signing your application form to waive it, by registered letter with acknowledgment of receipt, without costs or penalties."
        },
        contact: {
            title: "ARTICLE 5: CONTACT AND COMPLAINT",
            description: "For any questions or complaints, you can contact {company_name} at the following address: {company_address}."
        },
        footer: "This document is a non-contractual summary of the guarantees."
    },
    de: {
        title: "Informationsblatt",
        subtitle: "Gruppen-Kreditnehmerversicherungsvertrag Nr. 789-101112",
        importance: {
            title: "Bedeutung dieses Dokuments",
            description: "Das Informationsblatt ist ein wesentliches vorvertragliches Dokument. Es ermöglicht Ihnen, den Umfang der Garantien der Kreditnehmerversicherung im Detail zu verstehen, aber auch und vor allem deren Grenzen und Ausschlüsse. Ein sorgfältiges Lesen ist unerlässlich, um vor einer Verpflichtung eine informierte Entscheidung zu treffen."
        },
        introduction: "Dieses Blatt soll Sie über die Hauptmerkmale Ihrer Kreditnehmerversicherung informieren. Wir bitten Sie, es vor Ihrem Beitritt sorgfältig zu lesen. Es hat keinen vertraglichen Wert; nur die Allgemeinen und Besonderen Bedingungen des Versicherungsvertrags sind maßgebend.",
        guarantees: {
            title: "ARTIKEL 1: ANGEBOTENE GARANTIEN",
            description: "Der Vertrag deckt folgende Risiken ab:",
            items: {
                death: {
                    title: "Tod",
                    description: "Im Todesfall des Versicherten vor Ende des Darlehens erstattet der Versicherer dem Kreditinstitut das Restkapital."
                },
                disability: {
                    title: "Totaler und irreversibler Autonomieverlust (PTIA)",
                    description: "Befindet sich der Versicherte im Zustand der PTIA, erstattet der Versicherer ebenfalls das Restkapital."
                },
                incapacity: {
                    title: "Vollständige vorübergehende Arbeitsunfähigkeit (ITT)",
                    description: "Bei Arbeitsausfall aufgrund von Krankheit oder Unfall übernimmt der Versicherer die Rückzahlung der Darlehensraten nach einer Karenzzeit von 90 Tagen."
                }
            }
        },
        exclusions: {
            title: "ARTIKEL 2: HAUPTAUSSCHLÜSSE",
            description: "Bestimmte Situationen sind nicht von der Versicherung gedeckt. Insbesondere sind ausgeschlossen:",
            items: [
                "Der Selbstmord des Versicherten im ersten Versicherungsjahr.",
                "Die Folgen von Kriegshandlungen, Aufruhr oder Terrorakten.",
                "Die Ausübung von Luftsportarten, Kampfsportarten oder jeder anderen Sportart auf professioneller Basis.",
                "Schäden, die auf ein vorsätzliches Verschulden des Versicherten zurückzuführen sind.",
                "Psychiatrische Erkrankungen und Rückenschmerzen ohne Krankenhausaufenthalt."
            ]
        },
        claims: {
            title: "ARTIKEL 3: VERFAHREN IM SCHADENSFALL",
            description: "Im Schadensfall müssen Sie oder Ihre Anspruchsberechtigten diesen dem Versicherer innerhalb der im Vertrag festgelegten Fristen melden und alle angeforderten Belege (Todesurkunde, ärztliche Berichte usw.) beifügen."
        },
        waiver: {
            title: "ARTIKEL 4: WIDERRUFSRECHT",
            description: "Sie haben eine Frist von 30 Kalendertagen ab dem Datum der Unterzeichnung Ihres Beitrittsantrags, um per Einschreiben mit Rückschein ohne Kosten oder Strafen davon zurückzutreten."
        },
        contact: {
            title: "ARTIKEL 5: KONTAKT UND BESCHWERDE",
            description: "Bei Fragen oder Beschwerden können Sie {company_name} unter folgender Adresse kontaktieren: {company_address}."
        },
        footer: "Dieses Dokument ist eine nicht vertragliche Zusammenfassung der Garantien."
    },
    es: {
        title: "Nota de Información",
        subtitle: "Contrato de Seguro de Prestatario Colectivo N.º 789-101112",
        importance: {
            title: "Importancia de este documento",
            description: "La nota de información es un documento precontractual esencial. Le permite comprender en detalle el alcance de las garantías que ofrece el seguro de prestatario, pero también, y sobre todo, sus limitaciones y exclusiones. Su lectura atenta es indispensable para tomar una decisión informada antes de comprometerse."
        },
        introduction: "Esta nota tiene como objetivo informarle sobre las principales características de su seguro de prestatario. Le invitamos a leerla atentamente antes de adherirse. No tiene valor contractual; solo prevalecen las Condiciones Generales y Particulares del contrato de seguro.",
        guarantees: {
            title: "ARTÍCULO 1: GARANTÍAS PROPUESTAS",
            description: "El contrato cubre los siguientes riesgos:",
            items: {
                death: {
                    title: "Fallecimiento",
                    description: "En caso de fallecimiento del asegurado antes del final del préstamo, el asegurador reembolsa el capital pendiente a la entidad prestamista."
                },
                disability: {
                    title: "Pérdida Total e Irreversible de Autonomía (PTIA)",
                    description: "Si el asegurado se encuentra en estado de PTIA, el asegurador también reembolsa el capital pendiente."
                },
                incapacity: {
                    title: "Incapacidad Temporal Total para el trabajo (ITT)",
                    description: "En caso de baja laboral por enfermedad o accidente, el asegurador cubre el reembolso de las cuotas del préstamo, tras un período de carencia de 90 días."
                }
            }
        },
        exclusions: {
            title: "ARTÍCULO 2: PRINCIPALES EXCLUSIONES",
            description: "Ciertas situaciones no están cubiertas por el seguro. En particular, se excluyen:",
            items: [
                "El suicidio del asegurado durante el primer año de seguro.",
                "Las consecuencias de actos de guerra, disturbios o actos de terrorismo.",
                "La práctica de deportes aéreos, deportes de combate o cualquier otro deporte a nivel profesional.",
                "Los siniestros resultantes de una falta intencionada del asegurado.",
                "Las afecciones psiquiátricas y los dolores de espalda sin hospitalización."
            ]
        },
        claims: {
            title: "ARTÍCULO 3: PROCEDIMIENTOS EN CASO DE SINIESTRO",
            description: "En caso de siniestro, usted o sus beneficiarios deben declararlo al asegurador dentro de los plazos previstos en el contrato, adjuntando todos los documentos justificativos solicitados (certificado de defunción, informes médicos, etc.)."
        },
        waiver: {
            title: "ARTÍCULO 4: DERECHO DE DESISTIMIENTO",
            description: "Dispone de un plazo de 30 días naturales desde la fecha de firma de su solicitud de adhesión para desistir, mediante carta certificada con acuse de recibo, sin gastos ni penalizaciones."
        },
        contact: {
            title: "ARTÍCULO 5: CONTACTO Y RECLAMACIÓN",
            description: "Para cualquier pregunta o reclamación, puede contactar con {company_name} en la siguiente dirección: {company_address}."
        },
        footer: "Este documento es un resumen no contractual de las garantías."
    },
    pt: {
        title: "Nota Informativa",
        subtitle: "Contrato de Seguro de Mutuário em Grupo n.º 789-101112",
        importance: {
            title: "Importância deste documento",
            description: "A nota informativa é um documento pré-contratual essencial. Permite-lhe compreender em pormenor o âmbito das garantias oferecidas pelo seguro de mutuário, mas também, e acima de tudo, as suas limitações e exclusões. A sua leitura atenta é indispensável para fazer uma escolha informada antes de se comprometer."
        },
        introduction: "Esta nota tem como objetivo informá-lo sobre as principais características do seu seguro de mutuário. Convidamo-lo a lê-la atentamente antes da sua adesão. Não tem valor contratual; prevalecem apenas as Condições Gerais e Particulares do contrato de seguro.",
        guarantees: {
            title: "ARTIGO 1: GARANTIAS PROPOSTAS",
            description: "O contrato cobre os seguintes riscos:",
            items: {
                death: {
                    title: "Morte",
                    description: "Em caso de morte do segurado antes do final do empréstimo, a seguradora reembolsa o capital em dívida à instituição de crédito."
                },
                disability: {
                    title: "Perda Total e Irreversível de Autonomia (PTIA)",
                    description: "Se o segurado se encontrar em estado de PTIA, a seguradora também reembolsa o capital em dívida."
                },
                incapacity: {
                    title: "Incapacidade Temporária Total para o Trabalho (ITT)",
                    description: "Em caso de baixa médica por doença ou acidente, a seguradora assume o reembolso das prestações do empréstimo, após um período de carência de 90 dias."
                }
            }
        },
        exclusions: {
            title: "ARTIGO 2: PRINCIPAIS EXCLUSÕES",
            description: "Certas situações não estão cobertas pelo seguro. Estão nomeadamente excluídos:",
            items: [
                "O suicídio do segurado durante o primeiro ano de seguro.",
                "As consequências de atos de guerra, motins ou atos de terrorismo.",
                "A prática de desportos aéreos, desportos de combate ou qualquer outro desporto a título profissional.",
                "Os sinistros resultantes de culpa intencional do segurado.",
                "As doenças psiquiátricas и as dores de costas sem hospitalização."
            ]
        },
        claims: {
            title: "ARTIGO 3: PROCEDIMENTOS EM CASO DE SINISTRO",
            description: "Em caso de sinistro, você ou os seus beneficiários devem declará-lo à seguradora dentro dos prazos previstos no contrato, juntando todos os documentos comprovativos solicitados (certidão de óbito, relatórios médicos, etc.)."
        },
        waiver: {
            title: "ARTIGO 4: DIREITO DE RENÚNCIA",
            description: "Dispõe de um prazo de 30 dias de calendário a contar da data de assinatura do seu pedido de adesão para renunciar, por carta registada com aviso de receção, sem custos ou penalizações."
        },
        contact: {
            title: "ARTIGO 5: CONTACTO E RECLAMAÇÃO",
            description: "Para qualquer questão ou reclamação, pode contactar {company_name} no seguinte endereço: {company_address}."
        },
        footer: "Este documento é um resumo não contratual das garantias."
    },
    it: {
        title: "Nota Informativa",
        subtitle: "Contratto di Assicurazione Collettiva per Mutuatari n. 789-101112",
        importance: {
            title: "Importanza di questo documento",
            description: "La nota informativa è un documento precontrattuale essenziale. Le permette di comprendere in dettaglio la portata delle garanzie offerte dall'assicurazione per mutuatari, ma anche e soprattutto i suoi limiti ed esclusioni. Una lettura attenta è indispensabile per fare una scelta consapevole prima di impegnarsi."
        },
        introduction: "La presente nota ha lo scopo di informarla sulle principali caratteristiche della sua assicurazione per mutuatari. La invitiamo a leggerla attentamente prima di aderire. Non ha valore contrattuale; prevalgono solo le Condizioni Generali e Particolari del contratto di assicurazione.",
        guarantees: {
            title: "ARTICOLO 1: GARANZIE PROPOSTE",
            description: "Il contratto copre i seguenti rischi:",
            items: {
                death: {
                    title: "Decesso",
                    description: "In caso di decesso dell'assicurato prima della fine del prestito, l'assicuratore rimborsa il capitale residuo all'istituto di credito."
                },
                disability: {
                    title: "Perdita Totale e Irreversibile dell'Autonomia (PTIA)",
                    description: "Se l'assicurato si trova in stato di PTIA, l'assicuratore rimborsa anche il capitale residuo."
                },
                incapacity: {
                    title: "Inabilità Temporanea Totale al Lavoro (ITT)",
                    description: "In caso di interruzione del lavoro per malattia o infortunio, l'assicuratore copre il rimborso delle rate del prestito, dopo un periodo di franchigia di 90 giorni."
                }
            }
        },
        exclusions: {
            title: "ARTICOLO 2: PRINCIPALI ESCLUSIONI",
            description: "Alcune situazioni non sono coperte dall'assicurazione. Sono in particolare escluse:",
            items: [
                "Il suicidio dell'assicurato nel corso del primo anno di assicurazione.",
                "Le conseguenze di atti di guerra, sommosse o atti di terrorismo.",
                "La pratica di sport aerei, sport da combattimento o qualsiasi altro sport a titolo professionale.",
                "I sinistri derivanti da dolo dell'assicurato.",
                "Le affezioni psichiatriche e i dolori alla schiena senza ricovero ospedaliero."
            ]
        },
        claims: {
            title: "ARTICOLO 3: PROCEDURE IN CASO DI SINISTRO",
            description: "In caso di sinistro, lei o i suoi aventi diritto dovete dichiararlo all'assicuratore entro i termini previsti dal contratto, allegando tutti i documenti giustificativi richiesti (certificato di morte, referti medici, ecc.)."
        },
        waiver: {
            title: "ARTICOLO 4: DIRITTO DI RECESSO",
            description: "Ha a disposizione un termine di 30 giorni di calendario dalla data di firma della sua richiesta di adesione per recedere, tramite lettera raccomandata con avviso di ricevimento, senza spese né penali."
        },
        contact: {
            title: "ARTICOLO 5: CONTATTO E RECLAMO",
            description: "Per qualsiasi domanda o reclamo, può contattare {company_name} al seguente indirizzo: {company_address}."
        },
        footer: "Questo documento è un riassunto non contrattuale delle garanzie."
    }
}

    