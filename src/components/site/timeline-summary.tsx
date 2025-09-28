
import { Rocket, Milestone, UsersRound, Euro, Telescope } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const summaryEvents = [
    {
        year: "2012",
        title: "Fondation",
        icon: Rocket
    },
    {
        year: "2015",
        title: "100M€ Prêtés",
        icon: Euro
    },
    {
        year: "2018",
        title: "Expansion",
        icon: UsersRound
    },
    {
        year: "2021",
        title: "Innovation IA",
        icon: Milestone
    },
    {
        year: "2024+",
        title: "Avenir",
        icon: Telescope
    }
];

export default function TimelineSummary() {
    return (
        <section className="container mx-auto py-16 md:py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Notre parcours en bref</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    De l'idée à la réalité, les étapes qui ont fait de Vylsfond ce que nous sommes aujourd'hui.
                </p>
            </div>
            
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true" />

                <div className="relative grid grid-cols-2 md:grid-cols-5 gap-y-10">
                    {summaryEvents.map((event, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-4">
                            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4">
                                <event.icon className="w-10 h-10" />
                            </div>
                            <p className="font-bold text-primary">{event.year}</p>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 text-center">
                <Button asChild variant="outline">
                    <Link href="/a-propos">
                        Découvrir notre histoire complète
                    </Link>
                </Button>
            </div>
        </section>
    );
}
