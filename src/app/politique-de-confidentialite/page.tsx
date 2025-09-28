
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="prose lg:prose-xl mx-auto space-y-8">
          <h1>Politique de Confidentialité</h1>
          <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <div>
            <h2>1. Introduction</h2>
            <p>
              Vylsfond s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits concernant vos données personnelles.
            </p>
          </div>

          <div>
            <h2>2. Collecte des informations</h2>
            <p>
              Nous collectons des informations lorsque vous utilisez notre site, notamment lorsque vous remplissez notre formulaire de vérification d'éligibilité ou notre formulaire de contact. Les informations collectées peuvent inclure :
            </p>
            <ul>
              <li>Votre nom et votre adresse e-mail.</li>
              <li>Les informations financières que vous fournissez (revenu annuel, score de crédit, etc.).</li>
              <li>Des informations techniques comme votre adresse IP, votre type de navigateur, etc.</li>
            </ul>
          </div>

          <div>
            <h2>3. Utilisation des informations</h2>
            <p>
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul>
              <li>Fournir et améliorer nos services.</li>
              <li>Évaluer votre éligibilité à un prêt.</li>
              <li>Vous contacter en réponse à vos demandes.</li>
              <li>Communiquer avec vous sur nos produits et services.</li>
            </ul>
          </div>

          <div>
            <h2>4. Partage des informations</h2>
            <p>
              Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers sans votre consentement, sauf dans les cas suivants :
            </p>
            <ul>
              <li>À des partenaires de confiance qui nous aident à exploiter notre site ou à mener nos affaires, tant qu'ils acceptent de garder ces informations confidentielles.</li>
              <li>Pour se conformer à la loi, appliquer les politiques de notre site, ou protéger nos droits, notre propriété ou notre sécurité.</li>
            </ul>
          </div>
          
          <div>
            <h2>5. Sécurité de vos données</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons des technologies de cryptage pour protéger les informations sensibles transmises en ligne.
            </p>
          </div>

          <div>
            <h2>6. Vos droits</h2>
            <p>
              Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ces droits en nous contactant via notre formulaire de contact.
            </p>
          </div>
          
          <div>
            <h2>7. Modifications de notre politique de confidentialité</h2>
            <p>
              Si nous décidons de changer notre politique de confidentialité, nous publierons ces changements sur cette page. Nous vous encourageons à consulter cette page régulièrement pour rester informé.
            </p>
          </div>

          <div>
            <h2>8. Nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter via la section "Contact" de notre site.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
