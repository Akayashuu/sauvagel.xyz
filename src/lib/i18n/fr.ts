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
        company: "VSK Studio",
        role: "CEO & Co-fondateur",
        period: "2025 - Présent",
        description: [
          "CEO et co-fondateur d'un studio de développement web sur-mesure",
          "Sites et applications web modernes pour des clients (React, TypeScript, Docker)",
          "Pilotage des projets de A à Z : conception, développement, déploiement et maintenance",
          "Direction de l'activité, de la stratégie et de la relation client",
        ],
      },
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
          "Un MMORPG textuel qui tourne entièrement sur Discord. Architecture microservices en TypeScript où chaque service communique via RabbitMQ, avec sharding pour la scalabilité, Drizzle ORM sur PostgreSQL, cache Redis et observabilité complète (Prometheus, Grafana, Loki). Le tout containerisé en Docker.",
        details: {
          features: [
            "Gameplay MMORPG textuel directement dans Discord",
            "Architecture microservices — chaque service communique via RabbitMQ",
            "Sharding du bot pour la scalabilité multi-serveurs",
            "Drizzle ORM avec PostgreSQL pour l'état persistant du jeu",
            "Redis pour le cache et les files d'attente temps réel",
            "Stack d'observabilité : Prometheus, Grafana et Loki pour les logs",
            "Déploiement Dockerisé pour tous les services",
          ],
        },
      },
      {
        name: "Enderbot",
        tagline: "Bot RPG Discord — 6000+ cartes",
        description:
          "Un bot RPG Discord avancé combinant exploration, collection de cartes (6000+ cartes de jeux vidéo, anime et manga), économie, craft et guerres multijoueur. Architecture monorepo pnpm en TypeScript avec Prisma sur PostgreSQL, et un dashboard web SvelteKit + Tailwind. Free-to-play, actif depuis 2017.",
        details: {
          features: [
            "Plus de 6 000 cartes collectibles issues de jeux vidéo, anime et manga",
            "Mécaniques RPG : leveling de héros, craft d'objets, système de construction",
            "Exploration à travers plusieurs lieux et biomes",
            "Système d'organisations — formez une équipe et affrontez d'autres joueurs dans les classements",
            "Économie, carte de guerre et classements compétitifs",
            "Dashboard SvelteKit + Tailwind avec logs, classement, bibliothèque et stats serveur",
            "API publique sur ender.gg, déployée en Docker",
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
          "Un bot Discord pour la gestion de communauté, écrit en TypeScript avec Discord.js, Prisma et PostgreSQL — leveling (100+ niveaux avec rôles automatiques), économie avec récompenses quotidiennes/horaires et gacha avec système de pitié, mini-jeux, modération et messages de bienvenue personnalisés. Dashboard Svelte et API publique, le tout déployé en Docker.",
        details: {
          features: [
            "Système de leveling avec 100+ niveaux — XP via texte et vocal",
            "Attribution automatique de rôles aux paliers de niveau",
            "Économie avec récompenses quotidiennes/horaires et classements serveur",
            "Système de gacha avec pitié garantie pour des rôles et récompenses exclusifs",
            "Mini-jeux intégrés jouables directement dans Discord",
            "Outils de modération : logs, auto-rôles, messages de bienvenue/départ",
            "Bot Discord.js avec persistance Prisma + PostgreSQL",
            "Dashboard Svelte sur ganyu.fr avec stats temps réel et API publique (/api)",
          ],
        },
      },
      {
        name: "Takt",
        tagline: "Analytics web privacy-friendly, self-hosted",
        description:
          "Une plateforme d'analytics web privacy-friendly et self-hosted — notre alternative à Plausible. Cœur en Go avec ClickHouse pour les events et Postgres pour le relationnel, pipeline d'ingestion NATS JetStream et dashboard SvelteKit. Sans cookies, sans données personnelles, conforme RGPD sans bannière. Le cœur est privé, mais tout l'écosystème (SDK, intégrations framework, MCP) est open-source.",
        details: {
          features: [
            "Privacy by design — pas de cookies, pas de PII, RGPD sans bannière de consentement",
            "Script de tracking < 6 Ko, enrichissement 100 % côté serveur",
            "Cœur Go : ingestion HTTP → NATS JetStream → worker → ClickHouse",
            "Postgres + Ent pour le relationnel, organisations & RBAC, auth sessions + OAuth/OIDC (Argon2id)",
            "Objectifs et entonnoirs de conversion, mode cluster (sharding HRW + autoscaling KEDA)",
            "Observabilité OpenTelemetry → Prometheus / Grafana / Tempo / Loki",
            "Dashboard SvelteKit + Tailwind, multi-sites, déploiement Docker Compose",
            "Écosystème open-source : SDK JS (@takt/core) & PHP, wrappers React/Vue/Svelte/Solid/Angular/Astro, Laravel/Symfony, plugin WordPress et serveur MCP",
          ],
        },
      },
      {
        name: "Naht",
        tagline: "Sync filesystem ↔ Roblox Studio en Rust",
        description:
          "Un outil Rust de synchronisation de fichiers pour Roblox Studio : il garde ton code sur le disque et ta session Studio alignés dans les deux sens à la fois, et quand les deux côtés modifient le même script il fait un vrai merge 3-way au lieu d'écraser ton travail. Une alternative repensée à Rojo et Argon, construite autour de leurs modes de défaillance.",
        details: {
          features: [
            "Synchronisation bidirectionnelle au cœur du design — un écrit qui échoue met une voie en pause, ne tue jamais la session",
            "Vrai merge 3-way avec base persistée ; les conflits non fusionnables sont marqués façon git et gèlent le chemin jusqu'à résolution",
            "État de dernière synchro persisté en SQLite — restarts et reconnexions re-diffent sans tout réécraser",
            "Convention plutôt que configuration ; naht init --from-rojo migre un projet existant",
            "Propriétés non synchronisables (CSG, terrain, MeshId…) détectées et signalées, jamais perdues silencieusement",
            "Démon localhost + protocole MessagePack, CLI, plugin Studio en Luau",
            "Site de doc animé en Svelte ; côté Rust couvert par des tests",
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
    livePreview: "Aperçu en direct",
    openSite: "Ouvrir le site",
    ecosystem: "Écosystème open-source",
    ecosystemNote: "Le cœur est privé, mais tous les SDK et intégrations sont open-source.",
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
