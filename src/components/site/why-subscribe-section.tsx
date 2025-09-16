import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
    icon: LucideIcon;
    title: string;
    description: string;
};

type WhySubscribeSectionProps = {
    title: string;
    features: Feature[];
}

export default function WhySubscribeSection({ title, features }: WhySubscribeSectionProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center">
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight font-headline">{title}</h2>
          </div>
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
