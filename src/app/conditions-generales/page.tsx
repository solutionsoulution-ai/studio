import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

export default function ConditionsGeneralesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="prose lg:prose-xl mx-auto">
          <h1>Conditions Générales d'Utilisation</h1>
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site VylsCapital et les conditions d'utilisation par l'Utilisateur.
          </p>

          <h2>2. Accès au site</h2>
          <p>
            L'accès au site est gratuit pour tout Utilisateur disposant d'un accès à Internet. Tous les coûts afférents à l'accès, que ce soient les frais matériels, logiciels ou d'accès à Internet, sont exclusivement à la charge de l'Utilisateur.
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          
          <h2>4. Responsabilité</h2>
          <p>
            Les informations fournies sur le site VylsCapital le sont à titre indicatif. Les résultats des simulateurs et des outils d'éligibilité ne constituent en aucun cas une offre de prêt et n'engagent pas VylsCapital. Seule une étude approfondie de votre dossier permettra de définir les conditions de financement exactes.
          </p>
          <p>
            VylsCapital ne saurait être tenu pour responsable des dommages directs ou indirects qui pourraient résulter de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données, et/ou la présence de virus sur le site.
          </p>

          <h2>5. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site VylsCapital. Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'ÉDITEUR.
          </p>

          <h2>6. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, et après une tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
          </p>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
