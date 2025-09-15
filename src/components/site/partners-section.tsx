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
    <section id="partners" className="container mx-auto py-16 md:py-24">
      <div className="text-center mb-12">
         <div className="flex items-center gap-3 justify-center">
            <Handshake className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            Nos Partenaires de Confiance
            </h2>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Nous collaborons avec des institutions financières de premier plan pour vous offrir les meilleures conditions.
        </p>
      </div>
      <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none">
        {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center col-span-1 p-8 bg-muted/30 rounded-lg">
                <p className="text-xl font-semibold text-muted-foreground">{partner.name}</p>
            </div>
        ))}
      </div>
    </section>
  );
}
