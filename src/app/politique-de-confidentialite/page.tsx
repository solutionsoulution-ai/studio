
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import CtaSection from "@/components/site/cta-section";

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto py-16 md:py-24">
            <div className="prose-content lg:prose-xl mx-auto space-y-8">
              <h1>Politique de Confidentialité</h1>
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <div>
                <h2>1. Introduction et Responsable du Traitement</h2>
                <p>
                  Neofonds GmbH, société à responsabilité limitée située à Mainzer Landstraße 50, 60325 Frankfurt am Main, Deutschland ("nous", "notre", "nos"), s'engage à protéger la vie privée de ses utilisateurs ("vous", "votre"). Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits concernant vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </div>

              <div>
                <h2>2. Collecte des informations</h2>
                <p>
                  Nous collectons des informations personnelles lorsque vous utilisez notre site, notamment lorsque vous remplissez notre formulaire de demande de financement ou notre formulaire de contact. Les informations collectées incluent :
                </p>
                <ul>
                  <li><strong>Données d'identification :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, adresse postale.</li>
                  <li><strong>Données professionnelles et financières :</strong> Profession, revenus mensuels, montant et durée du prêt souhaité, motif de la demande.</li>
                  <li><strong>Données techniques :</strong> Adresse IP, type de navigateur, données de connexion, qui sont collectées automatiquement.</li>
                </ul>
              </div>

              <div>
                <h2>3. Utilisation et Finalité du Traitement des Données</h2>
                <p>
                  Les informations que nous collectons sont utilisées pour les finalités suivantes, basées sur votre consentement (matérialisé par l'envoi du formulaire) et l'exécution de mesures pré-contractuelles :
                </p>
                <ul>
                  <li><strong>Fournir nos services :</strong> Traiter et évaluer votre demande de financement pour vous proposer des offres adaptées.</li>
                  <li><strong>Communication :</strong> Vous contacter en réponse à vos demandes et vous tenir informé de l'avancement de votre dossier.</li>
                  <li><strong>Sécurité :</strong> Assurer la sécurité de notre site et prévenir la fraude.</li>
                  <li><strong>Amélioration du service :</strong> Analyser l'utilisation de notre site pour en améliorer la performance et l'ergonomie.</li>
                </ul>
              </div>

              <div>
                <h2>4. Partage et Transfert des Informations</h2>
                <p>
                  Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers sans votre consentement, sauf dans les cas suivants :
                </p>
                <ul>
                  <li>À des partenaires financiers (banques, assureurs) dans le strict cadre de l'étude de votre dossier de financement, sous réserve de confidentialité.</li>
                  <li>À des prestataires de services techniques (hébergement, maintenance) qui nous aident à exploiter notre site, sous contrat de confidentialité.</li>
                  <li>Pour nous conformer à une obligation légale, appliquer les politiques de notre site, ou protéger nos droits, notre propriété ou notre sécurité.</li>
                </ul>
                <p>Vos données sont hébergées sur des serveurs sécurisés au sein de l'Union Européenne et ne sont pas transférées en dehors, sauf si des garanties adéquates sont mises en place.</p>
              </div>
              
              <div>
                <h2>5. Sécurité et Durée de Conservation de vos Données</h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles robustes (cryptage SSL, serveurs sécurisés, accès restreint) pour préserver la sécurité de vos informations personnelles.
                </p>
                <p>
                  Vos données sont conservées pour la durée strictement nécessaire à l'étude de votre demande. En cas de refus ou d'abandon, elles sont supprimées après 6 mois. Si votre demande est acceptée, elles sont conservées pendant toute la durée de la relation contractuelle, puis archivées selon les délais légaux de prescription.
                </p>
              </div>

              <div>
                <h2>6. Vos Droits (Conformément au RGPD)</h2>
                <p>
                  Conformément à la réglementation, vous disposez des droits suivants :
                </p>
                <ul>
                  <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</li>
                  <li><strong>Droit de rectification :</strong> Corriger les données inexactes.</li>
                  <li><strong>Droit à l'effacement ("droit à l'oubli") :</strong> Demander la suppression de vos données.</li>
                  <li><strong>Droit à la limitation du traitement :</strong> Geler temporairement l'utilisation de vos données.</li>
                  <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et lisible.</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données, notamment à des fins de prospection.</li>
                </ul>
                <p>Vous pouvez exercer ces droits en nous contactant via notre <a href="/contact">formulaire de contact</a> ou par courrier à l'adresse mentionnée à l'article 1. Vous avez également le droit d'introduire une réclamation auprès de l'autorité de protection des données compétente.</p>
              </div>
              
              <div>
                <h2>7. Modifications de notre politique de confidentialité</h2>
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Si nous décidons de changer notre politique, nous publierons ces changements sur cette page avec la date de mise à jour.
                </p>
              </div>
            </div>
        </div>
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
