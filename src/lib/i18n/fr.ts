export const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    experience: "Expérience",
    skills: "Compétences",
    projects: "Projets",
    education: "Formation",
    travels: "Voyages",
    contact: "Contact",
  },
  hero: {
    greeting: "Salut, moi c'est",
    cta: "Me contacter",
    scroll: "Scroll",
  },
  about: {
    label: "À propos",
    title: "En quelques mots",
    description:
      "Je fais du web, du mobile, et parfois des trucs juste pour le fun. J'écris surtout du <strong>TypeScript</strong> et je câble des <strong>systèmes distribués</strong> — mais je suis aussi à l'aise sur un frontend ou pour déployer des containers. Je tiens à la qualité du code (Biome, ESLint, typage strict) et j'aime quand c'est bien structuré.",
    highlights: [
      {
        title: "Backend d'abord",
        desc: "Node.js, message queues, microservices — j'aime la partie invisible",
      },
      {
        title: "Frontend aussi",
        desc: "Svelte quand je peux, React/Vue quand il faut. Tailwind partout.",
      },
      {
        title: "Mobile & natif",
        desc: "React Native pour le cross-platform, Kotlin quand il faut du natif Android",
      },
      {
        title: "Side projects",
        desc: "Bots Discord, un MMORPG textuel, des apps de gestion d'aéroclub — j'aime shipper",
      },
    ],
  },
  experience: {
    label: "Parcours",
    title: "Où j'ai travaillé",
    items: [
      {
        company: "Green Ideas",
        role: "Full Stack & Mobile / DevOps",
        period: "2024 - 2025",
        description: [
          "Modules PrestaShop custom pour des clients e-commerce",
          "App mobile cross-platform en React Native",
          "Modules Android natifs en Kotlin pour du monitoring d'onduleurs solaires",
          "Interfaces web en Vue.js",
          "Déploiement et containerisation Docker",
          "Maintenance corrective et gestion des évolutions sur des codebases existantes",
        ],
      },
      {
        company: "CH de Calais",
        role: "Développeur Full Stack",
        period: "4 mois",
        description: [
          "App de génération de tests from scratch pour un serveur EAI (front + back)",
          "Maintenance et amélioration d'une app Symfony de gestion de comptes",
          "Mise en production",
        ],
      },
    ],
  },
  skills: {
    label: "Stack",
    title: "Ce que j'utilise",
  },
  projects: {
    label: "Projets",
    title: "Ce que j'ai construit",
    items: [
      {
        name: "White",
        tagline: "MMORPG textuel sur Discord",
        description:
          "Un MMORPG textuel qui tourne entièrement sur Discord. Architecture microservices avec RabbitMQ, sharding, Drizzle ORM, et observabilité complète via Prometheus, Grafana et Loki.",
        details: {
          features: [
            "Gameplay MMORPG textuel directement dans Discord",
            "Architecture microservices — chaque service communique via RabbitMQ",
            "Sharding du bot pour la scalabilité multi-serveurs",
            "Drizzle ORM avec PostgreSQL pour l'état persistant du jeu",
            "Stack d'observabilité : Prometheus, Grafana et Loki pour les logs",
            "Déploiement Dockerisé pour tous les services",
          ],
        },
      },
      {
        name: "Enderbot",
        tagline: "Bot RPG Discord — 6000+ cartes",
        description:
          "Un bot RPG Discord avancé combinant exploration, collection de cartes (6000+ cartes de jeux vidéo, anime et manga), économie, craft et guerres multijoueur. Free-to-play, actif depuis 2017.",
        details: {
          features: [
            "Plus de 6 000 cartes collectibles issues de jeux vidéo, anime et manga",
            "Mécaniques RPG : leveling de héros, craft d'objets, système de construction",
            "Exploration à travers plusieurs lieux et biomes",
            "Système d'organisations — formez une équipe et affrontez d'autres joueurs dans les classements",
            "Économie, carte de guerre et classements compétitifs",
            "Dashboard SvelteKit avec logs, classement, bibliothèque et stats serveur",
            "API publique sur ender.gg",
            "Architecture monorepo pnpm avec Prisma et PostgreSQL",
          ],
        },
      },
      {
        name: "Aeroclub Electron",
        tagline: "App desktop — Electron + Symfony",
        description:
          "Application desktop combinant un frontend Electron avec un backend Symfony. Gestion des membres, des vols et des avions de l'aéroclub avec une interface native propulsée par PHP.",
        details: {
          features: [
            "App desktop Electron embarquant un backend Symfony complet",
            "Gestion des membres, suivi des vols et registre des avions",
            "Base de données PostgreSQL pour la persistance",
            "Templates Twig pour le rendu côté serveur dans Electron",
            "Basé sur le framework electron-symfony",
            "98 commits — projet archivé",
          ],
        },
      },
      {
        name: "Aeroclub Symfony",
        tagline: "App web pour un aéroclub",
        description:
          "Application web Symfony pour la gestion d'un aéroclub. Gestion des membres, journaux de vol et dashboard admin avec templates Twig et PostgreSQL.",
        details: {
          features: [
            "Application web Symfony complète pour la gestion d'un aéroclub",
            "Système d'inscription et de gestion des membres",
            "Journaux de vol et suivi des avions",
            "Dashboard admin avec gestion des rôles",
            "Webpack Encore pour le bundling des assets",
            "Base PostgreSQL — 2 releases (dernière : v2.0.0)",
          ],
        },
      },
      {
        name: "Ganyu.fr",
        tagline: "Bot communautaire Discord",
        description:
          "Un bot Discord pour la gestion de communauté — leveling (100+ niveaux avec rôles automatiques), économie avec récompenses quotidiennes/horaires et gacha avec système de pitié, mini-jeux, modération et messages de bienvenue personnalisés.",
        details: {
          features: [
            "Système de leveling avec 100+ niveaux — XP via texte et vocal",
            "Attribution automatique de rôles aux paliers de niveau",
            "Économie avec récompenses quotidiennes/horaires et classements serveur",
            "Système de gacha avec pitié garantie pour des rôles et récompenses exclusifs",
            "Mini-jeux intégrés jouables directement dans Discord",
            "Outils de modération : logs, auto-rôles, messages de bienvenue/départ",
            "Dashboard Svelte sur ganyu.fr avec stats temps réel",
            "API publique sur ganyu.fr/api",
          ],
        },
      },
    ],
  },
  education: {
    label: "Études",
    title: "Où j'ai étudié",
    items: [
      {
        degree: "Bachelor Développement Web",
        school: "Efficom | Lille",
        period: "2024 - 2025",
      },
      {
        degree: "Licence Informatique",
        school: "Université du Littoral Côte d'Opale | Calais",
        period: "2023 - 2024",
      },
      {
        degree: "BTS SIO (SLAM)",
        school: "Lycée Jean Bart | Dunkerque",
        period: "2021 - 2023",
      },
    ],
  },
  travels: {
    label: "Voyages",
    title: "Villes que j'ai visitées",
    cities: "villes",
    tags: {
      lived: "Habité",
      studied: "Étudié",
      worked: "Travaillé",
      visited: "Visité",
      layover: "Escale",
    } as Record<string, string>,
  },
  contact: {
    label: "Contact",
    title: "On discute ?",
    subtitle: "Ouvert aux opportunités et aux projets intéressants.",
    email: "Email",
    phone: "Téléphone",
    github: "GitHub",
    location: "Localisation",
  },
  projectPage: {
    back: "Retour aux projets",
    about: "À propos",
    features: "Fonctionnalités",
    techStack: "Stack technique",
    links: "Liens",
    github: "GitHub",
    website: "Site web",
  },
  footer: {
    madeWith: "Fait avec",
    and: "& SvelteKit",
  },
  profile: {
    title: "Développeur Full Stack",
    subtitle:
      "Je fais du backend, je ship du frontend, et je casse des trucs entre les deux",
  },
};
