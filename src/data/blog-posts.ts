
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: '5-strategies-pour-ameliorer-votre-dossier-de-pret-entreprise',
    title: '5 stratégies pour améliorer votre dossier de prêt entreprise',
    description: 'Mettez toutes les chances de votre côté. Découvrez nos conseils pour présenter un dossier de financement solide et convaincant.',
    date: '18 Juil 2024',
    author: 'Julien Moreau, Directeur Financier',
    imageUrl: 'https://i.postimg.cc/cJzS4fKP/austin-distel-w-D1-LRb9-Oe-Eo-unsplash.jpg',
    imageAlt: "Un entrepreneur examinant des graphiques de croissance.",
    imageHint: "business analysis"
  },
  {
    slug: 'rachat-de-credit-quand-et-pourquoi-regrouper-ses-dettes',
    title: 'Rachat de crédit : quand et pourquoi regrouper ses dettes ?',
    description: 'Le rachat de crédit peut être une solution puissante pour simplifier vos finances. Est-ce le bon moment pour vous ?',
    date: '15 Juil 2024',
    author: 'Isabelle Petit, Directrice des Assurances',
    imageUrl: 'https://i.postimg.cc/kgn9jJ3Y/samuel-regan-asante-u-Rcbqai-Kk-Ko-unsplash.jpg',
    imageAlt: "Des factures et des cartes de crédit sont organisées en une seule pile ordonnée.",
    imageHint: "financial organization"
  },
  {
    slug: 'pret-immobilier-les-7-erreurs-a-eviter',
    title: 'Prêt immobilier : les 7 erreurs à éviter pour un primo-accédant',
    description: "L'achat de votre première maison est une étape majeure. Évitez ces pièges courants pour une expérience sereine.",
    date: '12 Juil 2024',
    author: 'Alexandre Dubois, Directeur Général',
    imageUrl: 'https://i.postimg.cc/kG03FCNs/hiveboxx-de-X-KChubo-Y-unsplash.jpg',
    imageAlt: "Un jeune couple regarde avec optimisme les plans de leur future maison.",
    imageHint: "couple planning"
  },
  {
    slug: 'le-pret-personnel-un-outil-flexible',
    title: 'Le prêt personnel : un outil flexible pour concrétiser vos projets',
    description: "Un voyage, des travaux, un événement ? Découvrez comment le prêt personnel peut vous aider à réaliser vos envies sans contraintes.",
    date: '10 Juil 2024',
    author: 'David Rousseau, Directeur Juridique',
    imageUrl: 'https://i.postimg.cc/Dz6hVtFf/walls-io-8mxs2-EDYGKQ-unsplash.jpg',
    imageAlt: "Une personne souriante planifie un projet sur une table de travail.",
    imageHint: "project planning"
  },
  {
    slug: 'comment-ia-revolutionne-analyse-credit',
    title: "Comment l'IA révolutionne l'analyse de crédit pour plus d'équité",
    description: "La technologie n'est pas qu'un gadget. Découvrez comment l'intelligence artificielle permet une évaluation plus juste et plus rapide des dossiers.",
    date: '08 Juil 2024',
    author: 'Benoît Leroy, Directeur d\'Analyse Financière',
    imageUrl: 'https://i.postimg.cc/FzBFMwyk/google-deepmind-La-Kw-LAmcn-Bc-unsplash.jpg',
    imageAlt: "Une représentation abstraite de réseaux de neurones et de flux de données.",
    imageHint: "abstract network"
  }
];
