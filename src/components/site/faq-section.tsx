
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const defaultFaqs = [
  {
    question: "Quelles sont les exigences minimales pour un prêt ?",
    answer: "Généralement, nous recherchons une situation financière stable et une capacité de remboursement démontrable. Chaque dossier est unique, et notre vérificateur d'éligibilité peut fournir une évaluation personnalisée.",
  },
  {
    question: "Combien de temps dure le processus de demande ?",
    answer: "Notre vérification d'éligibilité initiale est instantanée. Un examen complet de la demande prend généralement entre 24 et 72 heures. Une fois approuvés, les fonds peuvent être débloqués rapidement.",
  },
  {
    question: "Quels types de prêts offrez-vous ?",
    answer: "VylsFond se spécialise dans une variété d'options de financement, y compris les prêts immobiliers, les prêts à la consommation, les prêts auto, le rachat de crédit et les financements pour entreprises.",
  },
  {
    question: "Puis-je rembourser mon prêt par anticipation ?",
    answer: "Oui, la plupart de nos produits de prêt permettent un remboursement anticipé sans pénalité. Nous croyons en la fourniture d'options flexibles qui soutiennent votre santé financière.",
  },
  {
    question: "De quels documents ai-je besoin pour une demande de prêt complète ?",
    answer: "Pour une demande complète, vous aurez généralement besoin d'une pièce d'identité, d'un justificatif de domicile, et de justificatifs de revenus (comme des bulletins de salaire ou des avis d'imposition).",
  },
];

type Faq = {
    question: string;
    answer: string;
}

type FaqSectionProps = {
    title?: string;
    description?: string;
    faqs?: Faq[];
}

export default function FaqSection({ 
    title = "Foire aux questions",
    description = "Vous avez des questions ? Nous avons des réponses. Trouvez des informations sur nos services et processus ci-dessous.",
    faqs = defaultFaqs
}: FaqSectionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center gap-3 justify-center">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">{title}</h2>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
