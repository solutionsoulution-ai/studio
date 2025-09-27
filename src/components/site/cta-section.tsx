"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FilePen } from "lucide-react";

export default function CtaSection() {
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto text-center py-16 px-4">
                <h2 className="text-3xl font-bold">Prêt à démarrer votre projet ?</h2>
                <p className="mt-2 text-lg max-w-xl mx-auto opacity-90">
                    Notre équipe est là pour vous aider à trouver la meilleure solution de financement.
                </p>
                <div className="mt-8">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/demande-de-pret">
                            <FilePen className="mr-2" />
                            Faire une demande
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}