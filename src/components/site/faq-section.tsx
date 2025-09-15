import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quelles sont les exigences minimales pour un prêt ?",
    answer: "Généralement, nous recherchons des entreprises avec au moins 1 an d'activité, un score de crédit minimum de 600 et des revenus annuels constants. Cependant, notre vérificateur d'éligibilité IA peut fournir une évaluation plus personnalisée.",
  },
  {
    question: "Combien de temps dure le processus de demande ?",
    answer: "Notre vérification d'éligibilité initiale est instantanée. Un examen complet de la demande prend généralement entre 24 et 72 heures. Une fois approuvés, les fonds peuvent être déposés en aussi peu qu'un jour ouvrable.",
  },
  {
    question: "Quels types de prêts offrez-vous ?",
    answer: "VylsCapital se spécialise dans une variété d'options de financement pour les entreprises, y compris les prêts à terme, les lignes de crédit et le financement d'équipement. La meilleure option dépend des besoins spécifiques de votre entreprise et de votre situation financière.",
  },
  {
    question: "Puis-je rembourser mon prêt par anticipation ?",
    answer: "Oui, la plupart de nos produits de prêt permettent un remboursement anticipé sans pénalité. Nous croyons en la fourniture d'options flexibles qui soutiennent la santé financière de votre entreprise.",
  },
  {
    question: "De quels documents ai-je besoin pour une demande de prêt complète ?",
    answer: "Pour une demande complète, vous aurez généralement besoin de relevés bancaires récents (3-6 mois), de vos déclarations de revenus d'entreprise les plus récentes et de documents d'identification de base. Nous visons à minimiser la paperasse autant que possible.",
  },
];

export default function FaqSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center gap-3 justify-center">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">Foire Aux Questions</h2>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Vous avez des questions ? Nous avons des réponses. Trouvez des informations sur nos services et processus ci-dessous.
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
