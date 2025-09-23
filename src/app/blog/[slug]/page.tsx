

import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, MessageSquare, Phone, Send, Star } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article non trouvé | VylsCapital',
      description: "L'article que vous cherchez n'existe pas ou a été déplacé.",
    }
  }

  return {
    title: `${post.title} | VylsCapital`,
    description: post.description,
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const mockComments = [
    { name: "Léa Martin", rating: 5, comment: "Article très clair et utile ! J'ai pu renégocier mon prêt grâce à ces conseils." },
    { name: "Tom Bernard", rating: 4, comment: "Bon résumé, ça m'a aidé à mieux comprendre les enjeux du rachat de crédit." },
    { name: "Chloé Petit", rating: 5, comment: "Enfin des explications simples sur un sujet complexe. Merci !" },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-80 md:h-96 bg-muted/30">
            <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                className="object-cover"
                data-ai-hint={post.imageHint}
                priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold font-headline max-w-4xl">{post.title}</h1>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Article Content */}
        <section className="container mx-auto py-12 md:py-24 px-4">
            <div className="grid lg:grid-cols-4 gap-12">
                <article className="lg:col-span-3 prose-content lg:prose-lg max-w-none">
                    <div className="space-y-6">
                         <h2>Introduction</h2>
                        <p>
                            Dans le paysage financier actuel, il est crucial de prendre des décisions éclairées. Que vous soyez un entrepreneur cherchant à financer sa croissance, un particulier souhaitant acquérir un bien immobilier, ou simplement quelqu'un cherchant à optimiser ses finances, la compréhension des mécanismes de prêt est fondamentale. Cet article explore les stratégies clés pour {post.slug.includes('entreprise') ? 'solidifier votre dossier de prêt entreprise' : post.slug.includes('rachat') ? 'gérer intelligemment vos dettes' : 'réussir votre projet'}.
                        </p>

                        <h3>1. Comprendre les Attentes des Prêteurs</h3>
                        <p>
                            Avant toute chose, il est essentiel de se mettre à la place du prêteur. Les institutions financières évaluent principalement deux choses : votre capacité à rembourser (solvabilité) et votre fiabilité (historique de crédit). Un dossier bien préparé doit rassurer sur ces deux points.
                        </p>
                        
                        <h3>2. Les Piliers d'un Dossier Solide</h3>
                        <ul>
                            <li><strong>La Clarté du Projet :</strong> Expliquez précisément l'objet de votre demande de financement. Un projet bien défini et chiffré est toujours plus convaincant.</li>
                            <li><strong>La Stabilité Financière :</strong> Des revenus réguliers et une gestion saine de vos comptes sont des atouts majeurs. Évitez les découverts et les incidents de paiement dans les mois précédant votre demande.</li>
                            <li><strong>L'Apport Personnel :</strong> Bien qu'il ne soit pas toujours obligatoire, un apport démontre votre engagement dans le projet et votre capacité à épargner.</li>
                        </ul>

                        <blockquote>
                            "La préparation est la clé du succès. Un dossier de prêt ne fait pas exception. Prenez le temps de rassembler toutes les pièces et de peaufiner votre argumentation."
                        </blockquote>

                        <h3>3. Stratégies Avancées</h3>
                        <p>
                            Pour aller plus loin, vous pouvez également travailler sur l'optimisation de votre taux d'endettement. Si vous avez plusieurs crédits en cours, un rachat de crédit peut être une option intéressante pour réduire vos mensualités avant de solliciter un nouveau prêt. De même, un plan d'affaires détaillé pour un prêt professionnel, ou une simulation de rentabilité pour un investissement locatif, peut faire toute la différence.
                        </p>

                        <h2>Conclusion</h2>
                        <p>
                            Obtenir un financement est un marathon, pas un sprint. En suivant ces conseils et en préparant votre dossier avec soin, vous augmentez significativement vos chances de succès. N'oubliez pas que nos conseillers sont là pour vous accompagner à chaque étape.
                        </p>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
                     <Card>
                        <CardHeader>
                            <CardTitle>À propos de l'auteur</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <h4 className="font-semibold">{post.author.split(',')[0]}</h4>
                            <p className="text-sm text-primary">{post.author.split(',')[1]}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle>Prêt à vous lancer ?</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Discutons de votre projet. Nos experts sont là pour vous aider.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Button size="lg" variant="secondary" asChild className="w-full">
                                <Link href="/demande-de-pret">
                                    <Send className="mr-2" />
                                    Faire une demande
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="w-full text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
                                <Link href="/contact">
                                    <Phone className="mr-2" />
                                    Contacter un conseiller
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </section>

        {/* Comments Section */}
        <section className="bg-muted/30 py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4">
                 <div className="text-center mb-12">
                    <div className="flex items-center gap-3 justify-center">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight font-headline">Avis sur cet article</h2>
                    </div>
                </div>

                <div className="space-y-8">
                    {mockComments.map((comment, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                     <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${comment.name.replace(/\s/g, '')}`} alt={comment.name} />
                                        <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <p className="font-semibold">{comment.name}</p>
                                             <div className="flex items-center gap-0.5 mt-2 sm:mt-0">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mt-2 text-sm">"{comment.comment}"</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
