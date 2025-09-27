

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | VylsFond',
  description: 'Conseils et actualités sur le financement, les prêts et la gestion financière pour les particuliers et les entreprises.',
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto py-16 md:py-24 px-4">
           <div className="text-center mb-16">
              <div className="flex items-center gap-3 justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Notre Blog</h1>
              </div>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos experts partagent leurs analyses et conseils pour vous aider à naviguer dans le monde du financement.
              </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col group hover:border-primary transition-all overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                </Link>
                 <div className="flex flex-col flex-grow p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="leading-tight group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="pt-2">{post.date} &bull; {post.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-4 flex-grow">
                      <p className="text-muted-foreground">{post.description}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-6">
                      <Button variant="link" asChild className="p-0">
                          <Link href={`/blog/${post.slug}`}>
                            Lire la suite
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                    </CardFooter>
                 </div>
              </Card>
            ))}
          </div>

        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
