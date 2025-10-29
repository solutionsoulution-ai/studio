
import DocumentGenerator from "@/components/documents/DocumentGenerator";

export default function DocumentPage({ params }: { params: { slug: string } }) {
  return (
      <DocumentGenerator documentType={params.slug} />
  );
}
