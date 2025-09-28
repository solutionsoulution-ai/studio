
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  Euro,
  Handshake,
  Lightbulb,
  Milestone,
  Rocket,
  Target,
  Telescope,
  Users,
  UsersRound,
} from "lucide-react";
import * as React from "react";

const teamMembers = [
  { name: "Alexandre Dubois", role: "Directeur Général" },
  { name: "David Rousseau", role: "Directeur Juridique" },
  { name: "Julien Moreau", role: "Directeur Financier" },
  { name: "Benoît Leroy", role: "Directeur d'Analyse Financière" },
  { name: "Isabelle Petit", role: "Directrice des Assurances" },
];

const values = [
  {
    icon: Handshake,
    title: "Transparence",
    description:
      "Nous croyons en une communication claire et honnête à chaque étape.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous utilisons la technologie pour simplifier et améliorer les services financiers.",
  },
  {
    icon: Target,
    title: "Orientation Client",
    description:
      "Votre succès est notre priorité. Nous nous engageons à trouver la meilleure solution pour vous.",
  },
];

const timelineEvents = [
    {
        year: "2012",
        title: "Fondation et Lancement",
        description: "Vylsfond est créé avec la mission de rendre le prêt plus simple, rapide et accessible pour tous en Europe.",
        icon: Rocket
    },
     {
        year: "2015",
        title: "100 Millions d'euros prêtés",
        description: "Nous atteignons notre premier jalon majeur, démontrant la confiance de nos clients et la solidité de notre modèle.",
        icon: Euro
    },
    {
        year: "2018",
        title: "Expansion Européenne",
        description: "Nos services s'étendent à 5 nouveaux pays, affirmant notre ambition de devenir un leader européen.",
        icon: UsersRound
    },
    {
        year: "2021",
        title: "Lancement de l'IA",
        description: "Déploiement de notre technologie d'IA pour une analyse de risque plus juste et des réponses encore plus rapides.",
        icon: BrainCircuit
    },
    {
        year: "2024",
        title: "Nouveaux Produits",
        description: "Introduction du rachat de crédit et du prêt immobilier pour répondre à une demande croissante de nos clients.",
        icon: Milestone
    },
    {
        year: "2025 et au-delà",
        title: "Vers l'Avenir",
        description: "Continuer à innover pour offrir les meilleures solutions de financement, avec de nouveaux services à venir.",
        icon: Telescope
    }
]


export default function AProposPage() {
  const imageUrl =
    "https://i.postimg.cc/Hx8SZ01Q/undraw-finance-guy-avatar-vhop-removebg-preview.png";

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                À Propos de Vylsfond
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Fondée en 2012, Vylsfond est née d'une ambition simple :
                révolutionner l'accès au financement pour les particuliers et les
                entreprises en Europe.
              </p>
              <h3 className="font-bold text-xl mb-2 text-primary">
                Notre Mission
              </h3>
              <p className="mb-6 text-muted-foreground">
                Fournir à nos clients les ressources financières dont ils ont
                besoin pour atteindre leurs objectifs.
              </p>

              <h3 className="font-bold text-xl mb-2 text-primary">
                Notre Vision
              </h3>
              <p className="text-muted-foreground">
                Devenir le partenaire financier de confiance pour une
                génération d'entrepreneurs et de particuliers en Europe.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={imageUrl}
                alt="Illustration d'un conseiller financier Vylsfond"
                width={600}
                height={400}
                className="rounded-lg object-contain w-full h-auto"
                data-ai-hint="finance person"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">
                Nos Valeurs Fondamentales
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Nos actions sont guidées par trois principes clés qui
                définissent qui nous sommes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center p-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-headline">
                Notre Équipe Dirigeante
              </h2>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Rencontrez les experts passionnés qui travaillent pour
              concrétiser vos projets.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="text-center p-4 rounded-lg bg-card border"
              >
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
