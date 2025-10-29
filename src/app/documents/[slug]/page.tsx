
import DocumentGenerator from "@/components/documents/DocumentGenerator";

export function generateStaticParams() {
  return [
    { slug: 'reconnaissance-de-dette' },
    { slug: 'attestation-eligibilite' },
    { slug: 'contrat-de-pret-personnel' },
    { slug: 'acte-de-cautionnement-solidaire' },
    { slug: 'attestation-assurance-emprunteur' },
    { slug: 'notice-information-assurance' },
    { slug: 'facture' },
    { slug: 'recu-de-paiement' },
    { slug: 'document-vierge' },
  ];
}

export default function DocumentPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-muted/20">
      <div className="w-full lg:w-1/3 lg:h-screen lg:overflow-y-auto p-4">
        <DocumentGenerator documentType={params.slug} />
      </div>
      <div className="w-full lg:w-2/3 h-auto lg:h-screen lg:overflow-y-auto p-4">
        <DocumentGenerator.Preview documentType={params.slug} />
      </div>
    </div>
  );
}
