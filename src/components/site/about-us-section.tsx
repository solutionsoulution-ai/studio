import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Target, Handshake, Lightbulb, Users, Phone } from 'lucide-react';
import { Button } from "../ui/button";
import Link from "next/link";

const teamMembers = [
    { name: "Alice Durand", role: "CEO & Fondatrice", avatar: "https://i.pravatar.cc/150?img=31" },
    { name: "Julien Mercier", role: "Directeur Financier (CFO)", avatar: "https://i.pravatar.cc/150?img=32" },
    { name: "Chloé Lambert", role: "Responsable des Opérations", avatar: "https://i.pravatar.cc/150?img=33" },
    { name: "Marc Petit", role: "Développeur Principal", avatar: "https://i.pravatar.cc/150?img=34" },
]

const values = [
    { icon: Handshake, title: "Transparence", description: "Nous croyons en une communication claire et honnête à chaque étape." },
    { icon: Lightbulb, title: "Innovation", description: "Nous utilisons la technologie pour simplifier et améliorer les services financiers." },
    { icon: Target, title: "Orientation Client", description: "Votre succès est notre priorité. Nous nous engageons à trouver la meilleure solution pour vous." },
]

export default function AboutUsSection() {
    const heroImage = PlaceHolderImages.find((img) => img.id === "about-us-hero");

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-80 bg-muted/30">
                {heroImage && (
                    <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">À Propos de VylsCapital</h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-200">
                        Notre mission : rendre le financement plus accessible, plus rapide et plus humain.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="container mx-auto py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-headline mb-4">Notre Histoire</h2>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            Fondée en 2024, VylsCapital est née d'une ambition simple : révolutionner l'accès au financement pour les particuliers et les entreprises en Europe. Frustrés par la lenteur et la complexité des systèmes bancaires traditionnels, nous avons décidé de créer une plateforme qui allie le meilleur de la technologie et une expertise humaine pour offrir des solutions de prêt rapides, transparentes et adaptées aux besoins réels de nos clients.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl mb-2 text-primary">Notre Mission</h3>
                        <p className="mb-6 text-muted-foreground">Fournir à nos clients les ressources financières dont ils ont besoin pour atteindre leurs objectifs, que ce soit pour lancer une entreprise, acheter une maison ou réaliser un projet personnel.</p>
                        
                        <h3 className="font-bold text-xl mb-2 text-primary">Notre Vision</h3>
                        <p className="text-muted-foreground">Devenir le partenaire financier de confiance pour une génération d'entrepreneurs et de particuliers en Europe, en étant le leader du financement éthique et innovant.</p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">Nos Valeurs Fondamentales</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                            Nos actions sont guidées par trois principes clés qui définissent qui nous sommes.
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
                        <h2 className="text-3xl font-bold font-headline">Notre Équipe</h2>
                    </div>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Rencontrez les experts passionnés qui travaillent pour concrétiser vos projets.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="text-center">
                            <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary/50 p-1">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h4 className="font-semibold text-lg">{member.name}</h4>
                            <p className="text-sm text-primary">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground">
                <div className="container mx-auto text-center py-16">
                    <h2 className="text-3xl font-bold">Prêt à démarrer votre projet ?</h2>
                    <p className="mt-2 text-lg max-w-xl mx-auto opacity-90">
                        Notre équipe est là pour vous aider à trouver la meilleure solution de financement.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/contact">
                                <Phone className="mr-2" />
                                Contactez-nous
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
