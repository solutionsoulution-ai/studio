
import DocumentPageClient from "@/components/documents/DocumentPageClient";

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
  return <DocumentPageClient slug={params.slug} />;
}
