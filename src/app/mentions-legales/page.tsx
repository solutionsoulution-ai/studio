import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

export default function MentionsLegalesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="prose lg:prose-xl mx-auto">
          <h1>Mentions Légales</h1>
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site VylsCapital l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

          <h2>1. Édition du site</h2>
          <p>
            Le site VylsCapital est édité par la société [Nom de votre société], société [Forme juridique] au capital de [Montant] euros, dont le siège social est situé [Adresse de votre siège social], immatriculée au Registre du Commerce et des Sociétés de [Ville] sous le numéro [Numéro RCS].
          </p>
          <p>
            Numéro de TVA intracommunautaire : [Votre numéro de TVA]
          </p>
          
          <h2>2. Responsable de publication</h2>
          <p>
            [Nom du responsable de la publication], en sa qualité de [Fonction].
          </p>

          <h2>3. Hébergement</h2>
          <p>
            Le site VylsCapital est hébergé par [Nom de l'hébergeur], dont le siège social est situé [Adresse de l'hébergeur].
          </p>
          <p>
            Le stockage des données des utilisateurs est réalisé sur les centres de données de [Nom de l'hébergeur], situés en [Lieu des serveurs, ex: Union Européenne].
          </p>

          <h2>4. Nous contacter</h2>
          <ul>
            <li>Par email : [Votre adresse e-mail de contact]</li>
            <li>Par courrier : [Votre adresse postale]</li>
          </ul>

          <h2>5. CNIL</h2>
          <p>
            Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à [Finalité du traitement]. Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
