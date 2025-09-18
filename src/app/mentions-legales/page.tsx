import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

export default function MentionsLegalesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="prose lg:prose-xl mx-auto space-y-6">
          <h1>Mentions Légales</h1>
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site VylsCapital l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

          <div>
            <h2>1. Édition du site</h2>
            <ul className="list-none p-0">
              <li><strong>Site :</strong> VylsCapital</li>
              <li><strong>Éditeur :</strong> VylsCapital</li>
              <li><strong>Forme juridique :</strong> [Forme juridique]</li>
              <li><strong>Capital social :</strong> [Montant] euros</li>
              <li><strong>Siège social :</strong> Lyon, France</li>
              <li><strong>RCS :</strong> [Numéro RCS]</li>
              <li><strong>Numéro de TVA intracommunautaire :</strong> [Votre numéro de TVA]</li>
            </ul>
          </div>
          
          <div>
            <h2>2. Responsable de publication</h2>
            <ul className="list-none p-0">
                <li><strong>Nom :</strong> [Nom du responsable de la publication]</li>
                <li><strong>Fonction :</strong> [Fonction]</li>
            </ul>
          </div>

          <div>
            <h2>3. Hébergement</h2>
            <ul className="list-none p-0">
                <li><strong>Hébergeur :</strong> [Nom de l'hébergeur]</li>
                <li><strong>Siège social :</strong> [Adresse de l'hébergeur]</li>
            </ul>
            <p>Le stockage des données des utilisateurs est réalisé sur les centres de données de [Nom de l'hébergeur], situés en [Lieu des serveurs, ex: Union Européenne].</p>
          </div>

          <div>
            <h2>4. Nous contacter</h2>
            <ul className="list-none p-0">
              <li><strong>Par email :</strong> contact@vylscapital.com</li>
              <li><strong>Par téléphone :</strong> +33 7 56 98 67 69</li>
              <li><strong>Par courrier :</strong> Lyon, France</li>
            </ul>
          </div>

          <div>
            <h2>5. CNIL</h2>
            <p>
              Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à [Finalité du traitement].
            </p>
            <p>
              Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent. Pour exercer ce droit, veuillez nous contacter aux coordonnées indiquées ci-dessus.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
