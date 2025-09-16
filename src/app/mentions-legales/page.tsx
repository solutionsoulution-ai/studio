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
            <strong>Site :</strong> VylsCapital <br />
            <strong>Éditeur :</strong> VylsCapital <br />
            <strong>Forme juridique :</strong> [Forme juridique] <br />
            <strong>Capital social :</strong> [Montant] euros <br />
            <strong>Siège social :</strong> Lyon, France <br />
            <strong>RCS :</strong> [Numéro RCS] <br />
            <strong>Numéro de TVA intracommunautaire :</strong> [Votre numéro de TVA]
          </p>
          
          <h2>2. Responsable de publication</h2>
          <p>
            <strong>Nom :</strong> [Nom du responsable de la publication] <br />
            <strong>Fonction :</strong> [Fonction]
          </p>

          <h2>3. Hébergement</h2>
          <p>
            <strong>Hébergeur :</strong> [Nom de l'hébergeur] <br />
            <strong>Siège social :</strong> [Adresse de l'hébergeur] <br />
            Le stockage des données des utilisateurs est réalisé sur les centres de données de [Nom de l'hébergeur], situés en [Lieu des serveurs, ex: Union Européenne].
          </p>
          

          <h2>4. Nous contacter</h2>
          <ul>
            <li><strong>Par email :</strong> contact@vylscapital.com</li>
            <li><strong>Par téléphone :</strong> +33 7 56 98 67 69</li>
            <li><strong>Par courrier :</strong> Lyon, France</li>
          </ul>

          <h2>5. CNIL</h2>
          <p>
            Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à [Finalité du traitement].
          </p>
          <p>
             Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent. Pour exercer ce droit, veuillez nous contacter aux coordonnées indiquées ci-dessus.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
