
import { Handshake } from "lucide-react";

const partners = [
  { name: "Global Finance" },
  { name: "Innovate Capital" },
  { name: "Secure Funds" },
  { name: "Equity Partners" },
  { name: "VentureNet" },
  { name: "Trust Capital" },
];

export default function PartnersSection() {
  return (
    <section className="bg-background py-16 md:py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none text-center">
            <div className="flex items-center gap-3 justify-center">
                <Handshake className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight font-headline">
                    Nos partenaires de confiance
                </h2>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
                Nous collaborons avec des institutions financières de premier plan pour vous offrir les meilleures conditions.
            </p>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:mx-0 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.name} className="col-span-1 flex justify-center">
                 <p className="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
