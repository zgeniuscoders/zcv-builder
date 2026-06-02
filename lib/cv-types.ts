export type SocialPlatform = 
  | 'linkedin'
  | 'github'
  | 'gitlab'
  | 'youtube'
  | 'twitter'
  | 'portfolio'
  | 'dribbble'
  | 'behance'
  | 'medium'
  | 'stackoverflow';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  missions: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  // Profile
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;

  photo: string | null;
  photoShape: 'round' | 'square';
  showPhoto: boolean;

  primaryColor: string;

  socialLinks: SocialLink[];

  skillCategories: SkillCategory[];

  experiences: Experience[];

  projects: Project[];

  education: Education[];

  references: Reference[];

  languages: Language[];
}

export const defaultCVData: CVData = {
  fullName: 'Zgenius Matondo',
  title: 'Développeur Fullstack & Ingénieur IA',
  email: 'zgeniuscoders@gmail.com',
  phone: '+243858634846',
  location: 'Kinshasa, RDC',
  summary: 'Développeur passionné avec une expertise en développement web fullstack et en intelligence artificielle. Expérience confirmée dans la création d\'applications robustes et scalables.',
  
  photo: null,
  photoShape: 'round',
  showPhoto: true,
  
  primaryColor: '#3b82f6',
  
  socialLinks: [
    { id: '1', platform: 'github', url: 'https://github.com/zgeniuscoders' },
    { id: '2', platform: 'gitlab', url: 'https://gitlab.com/zgeniuscoders' },
    { id: '3', platform: 'youtube', url: 'https://youtube.com/@zgeniuscoders' },
    { id: '4', platform: 'youtube', url: 'https://youtube.com/@codeaveczgenius' },
  ],
  
  skillCategories: [
    {
      id: '1',
      name: 'Backend & IA',
      skills: ['Python', 'Java (Spring Boot)', 'PHP (Laravel)', 'SQL', 'PostgreSQL'],
    },
    {
      id: '2',
      name: 'Frontend & Mobile',
      skills: ['TypeScript', 'Angular', 'Vue.js', 'Next.js', 'Flutter', 'Kotlin (Jetpack Compose)'],
    },
    {
      id: '3',
      name: 'DevOps & Outils',
      skills: ['Docker', 'Kubernetes', 'Linux', 'Git', 'CI/CD', 'REST API'],
    },
  ],
  
  experiences: [
    {
      id: '1',
      title: 'Développeur Fullstack',
      company: 'Orange RDC',
      startDate: 'Janv. 2026',
      endDate: 'À ce jour',
      description: 'Développement et maintenance d\'applications web et mobiles pour l\'écosystème Orange.',
      missions: [],
    },
    {
      id: '2',
      title: 'Stagiaire Développeur Web & IA',
      company: 'Orange Money RDC',
      startDate: 'Sept. 2025',
      endDate: 'Déc. 2025',
      description: 'Développement de solutions innovantes pour les services financiers mobiles.',
      missions: [
        'Application "Wallet to Bank" sous Django',
        'Solution de "Cash Reconciliation" sous Laravel/Vue.js',
        'Agent IA d\'extraction de données textuelles complexes',
      ],
    },
    {
      id: '3',
      title: 'Stagiaire Développeur Web & Mobile',
      company: 'Orange Digital Center',
      startDate: 'Févr. 2025',
      endDate: 'Août 2025',
      description: 'Contribution au développement de plateformes numériques innovantes.',
      missions: [
        'Plateforme "Ubora" en Laravel/Angular',
        'Intégration des projets "SNEL & Moi" et "REGIDESO" sous Django',
        'Contribution à l\'écosystème Max it avec OUI Designer',
      ],
    },
  ],
  
  projects: [
    {
      id: '1',
      name: 'ZBuilders',
      description: 'Plateforme no-code de création de mini-applications via un éditeur visuel.',
      technologies: ['Spring Boot', 'Next.js', 'Flutter', 'Python IA'],
    },
    {
      id: '2',
      name: 'MySelf Pay',
      description: 'Solution Fintech complète avec API de paiement et IA de détection de fraude.',
      technologies: ['Spring Boot', 'Flutter', 'Python'],
    },
  ],
  
  education: [
    {
      id: '1',
      degree: 'Licence en Mathématiques, Statistiques et Informatique',
      institution: 'Université de Kinshasa (UNIKIN)',
      startYear: '2021',
      endYear: '2025',
    },
  ],
  
  references: [
    {
      id: '1',
      name: 'Alain Mangana',
      position: '',
      company: 'Orange RDC',
    },
    {
      id: '2',
      name: 'Daniel Omotete',
      position: '',
      company: 'Orange RDC',
    },
    {
      id: '3',
      name: 'Josmard Sakasaka',
      position: 'Head of Partnership and Integration',
      company: 'Equity Bank RDC',
    },
  ],
  
  languages: [
    { id: '1', name: 'Français', level: 'Natif' },
    { id: '2', name: 'Anglais', level: 'Professionnel' },
  ],
};
