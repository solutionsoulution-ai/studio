import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Users, Scaling, Award } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Réponse Rapide via IA",
    description: "Notre technologie d'IA analyse votre profil pour vous donner une réponse de principe en quelques minutes seulement.",
  },
  {
    icon: Users,
    title: "Conseils d'Experts",
    description: "Nos conseillers financiers vous accompagnent à chaque étape pour trouver la solution la mieux adaptée à votre projet.",
  },
  {
    icon: Scaling,
    title: "Solutions Flexibles",
    description: "Nous proposons des conditions de prêt et des modalités de remboursement flexibles pour s'adapter à votre situation.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center">
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight font-headline">Pourquoi Nous Choisir ?</h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Chez VylsCapital, nous combinons technologie et expertise humaine pour vous offrir une expérience de prêt inégalée.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
