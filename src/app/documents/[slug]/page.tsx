
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
    { slug: 'document-vierge' },
  ];
}

export default function DocumentPage({ params }: { params: { slug: string } }) {
  return (
      <DocumentGenerator documentType={params.slug} />
  );
}
