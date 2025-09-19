
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../ui/button";

export default function BlogSummarySection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">Nos Derniers Articles</h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Suivez nos conseils d'experts pour prendre les meilleures décisions financières.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
             <Card key={post.slug} className="flex flex-col group hover:border-primary transition-all overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 w-full">
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
                      <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="pt-2 text-xs">{post.date} &bull; {post.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-3 flex-grow">
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-4">
                       <Button variant="link" asChild className="p-0 text-sm">
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
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/blog">Voir tous les articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
