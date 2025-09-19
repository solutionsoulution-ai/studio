
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
    title: '5 Stratégies pour Améliorer votre Dossier de Prêt Entreprise',
    description: 'Mettez toutes les chances de votre côté. Découvrez nos conseils pour présenter un dossier de financement solide et convaincant.',
    date: '18 Juil 2024',
    author: 'Julien Moreau, Directeur Financier',
    imageUrl: 'https://picsum.photos/seed/blog-business/1200/800',
    imageAlt: "Un entrepreneur examinant des graphiques de croissance.",
    imageHint: "business analysis"
  },
  {
    slug: 'rachat-de-credit-quand-et-pourquoi-regrouper-ses-dettes',
    title: 'Rachat de Crédit : Quand et Pourquoi Regrouper ses Dettes ?',
    description: 'Le rachat de crédit peut être une solution puissante pour simplifier vos finances. Est-ce le bon moment pour vous ?',
    date: '15 Juil 2024',
    author: 'Isabelle Petit, Directrice des Assurances',
    imageUrl: 'https://picsum.photos/seed/blog-consolidation/1200/800',
    imageAlt: "Des factures et des cartes de crédit sont organisées en une seule pile ordonnée.",
    imageHint: "financial organization"
  },
  {
    slug: 'pret-immobilier-les-7-erreurs-a-eviter',
    title: 'Prêt Immobilier : Les 7 Erreurs à Éviter pour un Primo-Accédant',
    description: "L'achat de votre première maison est une étape majeure. Évitez ces pièges courants pour une expérience sereine.",
    date: '12 Juil 2024',
    author: 'Alexandre Dubois, Directeur Général',
    imageUrl: 'https://picsum.photos/seed/blog-housing/1200/800',
    imageAlt: "Un jeune couple regarde avec optimisme les plans de leur future maison.",
    imageHint: "couple planning"
  },
  {
    slug: 'le-pret-personnel-un-outil-flexible',
    title: 'Le Prêt Personnel : Un Outil Flexible pour Concrétiser vos Projets',
    description: "Un voyage, des travaux, un événement ? Découvrez comment le prêt personnel peut vous aider à réaliser vos envies sans contraintes.",
    date: '10 Juil 2024',
    author: 'David Rousseau, Directeur Juridique',
    imageUrl: 'https://picsum.photos/seed/blog-personal/1200/800',
    imageAlt: "Une personne souriante planifie un projet sur une table de travail.",
    imageHint: "project planning"
  },
  {
    slug: 'comment-ia-revolutionne-analyse-credit',
    title: "Comment l'IA Révolutionne l'Analyse de Crédit pour plus d'Équité",
    description: "La technologie n'est pas qu'un gadget. Découvrez comment l'intelligence artificielle permet une évaluation plus juste et plus rapide des dossiers.",
    date: '08 Juil 2024',
    author: 'Benoît Leroy, Directeur d\'Analyse Financière',
    imageUrl: 'https://picsum.photos/seed/blog-ai/1200/800',
    imageAlt: "Une représentation abstraite de réseaux de neurones et de flux de données.",
    imageHint: "abstract network"
  }
];
