import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What are the minimum requirements for a loan?",
    answer: "Typically, we look for businesses with at least 1 year in operation, a minimum credit score of 600, and consistent annual revenue. However, our AI-powered eligibility checker can provide a more personalized assessment.",
  },
  {
    question: "How long does the application process take?",
    answer: "Our initial eligibility check is instant. A full application review usually takes between 24-72 hours. Once approved, funds can be deposited in as little as one business day.",
  },
  {
    question: "What types of loans do you offer?",
    answer: "VylsCapital specializes in a variety of business financing options, including term loans, lines of credit, and equipment financing. The best option depends on your specific business needs and financial situation.",
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes, most of our loan products allow for early repayment without any prepayment penalties. We believe in providing flexible options that support your business's financial health.",
  },
  {
    question: "What documents do I need to apply for a full loan?",
    answer: "For a full application, you will typically need recent bank statements (3-6 months), your most recent business tax returns, and basic identification documents. We aim to keep the paperwork as minimal as possible.",
  },
];

export default function FaqSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center gap-3 justify-center">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">Frequently Asked Questions</h2>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We've got answers. Find information about our services and processes below.
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
