
import DocumentPageClient from "@/components/documents/DocumentPageClient";
import { documentFields } from "@/lib/document-fields";

export function generateStaticParams() {
  return Object.keys(documentFields).map(slug => ({ slug }));
}

export default function DocumentPage({ params }: { params: { slug: string } }) {
  return <DocumentPageClient slug={params.slug} />;
}
