export const en = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    travels: "Travels",
    contact: "Contact",
  },
  hero: {
    greeting: "Hey, I'm",
    cta: "Get in touch",
    scroll: "Scroll",
  },
  about: {
    label: "About",
    title: "A bit about me",
    description:
      "I build things for the web, mobile, and sometimes just for fun. I spend most of my time writing <strong>TypeScript</strong> and wiring up <strong>distributed systems</strong> — but I'm just as comfortable putting together a frontend or deploying containers. I care about code quality (Biome, ESLint, strict types) and I like when things are well-structured.",
    highlights: [
      {
        title: "Backend first",
        desc: "Node.js, message queues, microservices — I like the plumbing side of things",
      },
      {
        title: "Frontend too",
        desc: "Svelte when I can, React/Vue when I have to. Tailwind everywhere.",
      },
      {
        title: "Mobile & native",
        desc: "React Native for cross-platform, Kotlin when I need to go native on Android",
      },
      {
        title: "Side projects",
        desc: "Discord bots, a text MMORPG, aeroclub management apps — I like to ship stuff",
      },
    ],
  },
  experience: {
    label: "Work",
    title: "Where I've worked",
    items: [
      {
        company: "VSK Studio",
        role: "CEO & Co-founder",
        period: "2025 - Present",
        description: [
          "CEO and co-founder of a custom web development studio",
          "Modern websites and web apps for clients (React, TypeScript, Docker)",
          "End-to-end project ownership: design, development, deployment and maintenance",
          "Leading the business, strategy and client relationships",
        ],
      },
      {
        company: "Green Ideas",
        role: "Full Stack & Mobile / DevOps",
        period: "2024 - 2025",
        description: [
          "Built custom PrestaShop modules for e-commerce clients",
          "Shipped a cross-platform mobile app in React Native",
          "Wrote native Android modules in Kotlin for solar inverter monitoring",
          "Built web interfaces with Vue.js",
          "Handled deployment and containerization with Docker",
          "Bug fixing, maintenance, and managing evolutions on existing codebases",
        ],
      },
      {
        company: "Calais Hospital",
        role: "Full Stack Developer",
        period: "4 months",
        description: [
          "Built a test generator app from scratch for an EAI server (both frontend and backend)",
          "Maintained and improved a Symfony app for account management",
          "Handled deployment to production",
        ],
      },
    ],
  },
  skills: {
    label: "Stack",
    title: "What I work with",
  },
  projects: {
    label: "Projects",
    title: "Things I've built",
    items: [
      {
        name: "White",
        tagline: "Text-based MMORPG on Discord",
        description:
          "A text-based MMORPG running entirely on Discord. A TypeScript microservice architecture where each service talks over RabbitMQ, with sharding for scalability, Drizzle ORM on PostgreSQL, Redis caching, and full observability (Prometheus, Grafana, Loki). All containerized with Docker.",
        details: {
          features: [
            "Text-based MMORPG gameplay directly inside Discord",
            "Microservice architecture — each service communicates through RabbitMQ",
            "Bot sharding for scalability across multiple servers",
            "Drizzle ORM with PostgreSQL for persistent game state",
            "Redis for caching and real-time queues",
            "Full observability stack: Prometheus, Grafana, and Loki for logs",
            "Dockerized deployment for all services",
          ],
        },
      },
      {
        name: "Enderbot",
        tagline: "Discord RPG bot — 6000+ cards",
        description:
          "An advanced Discord RPG bot combining exploration, card collection (6000+ cards from games, anime & manga), economy, crafting, and multiplayer warfare. A pnpm monorepo in TypeScript with Prisma on PostgreSQL and a SvelteKit + Tailwind web dashboard. Free-to-play, running since 2017.",
        details: {
          features: [
            "Over 6,000 collectible cards from video games, anime, and manga",
            "RPG mechanics: hero leveling, item crafting, building systems",
            "Exploration across multiple locations and biomes",
            "Organization system — team up with other players and compete on leaderboards",
            "Economy, war map, and competitive rankings",
            "SvelteKit + Tailwind dashboard with logs, leaderboard, library, and server stats",
            "Public API at ender.gg, deployed with Docker",
            "pnpm monorepo architecture with Prisma and PostgreSQL",
          ],
        },
      },
      {
        name: "Aeroclub Electron",
        tagline: "Desktop app — Electron + Symfony",
        description:
          "Desktop application combining an Electron frontend with a Symfony backend. Manages aeroclub members, flights and aircraft with a native-feel interface powered by PHP.",
        details: {
          features: [
            "Electron desktop app wrapping a full Symfony backend",
            "Member management, flight tracking, and aircraft registry",
            "PostgreSQL database for persistent data",
            "Twig templates for server-side rendering inside Electron",
            "Based on the electron-symfony framework",
            "98 commits — archived project",
          ],
        },
      },
      {
        name: "Aeroclub Symfony",
        tagline: "Web app for an aeroclub",
        description:
          "Symfony web application for managing an aviation club. Member management, flight logs, and admin dashboard with Twig templates and PostgreSQL.",
        details: {
          features: [
            "Full Symfony web application for aeroclub management",
            "Member registration and management system",
            "Flight logging and aircraft tracking",
            "Admin dashboard with role-based access",
            "Webpack Encore for asset bundling",
            "PostgreSQL database — 2 releases (latest v2.0.0)",
          ],
        },
      },
      {
        name: "Ganyu.fr",
        tagline: "Discord community bot",
        description:
          "A Discord bot for community management, written in TypeScript with Discord.js, Prisma and PostgreSQL — leveling (100+ levels with automatic role rewards), economy with daily/hourly rewards and a gacha with pity system, mini-games, moderation, and custom welcome messages. Svelte dashboard and public API, all deployed with Docker.",
        details: {
          features: [
            "Leveling system with 100+ levels — XP from text and voice activity",
            "Automatic role assignment at level milestones",
            "Economy with daily/hourly rewards and server leaderboards",
            "Gacha system with guaranteed pity for exclusive roles and rewards",
            "Integrated mini-games playable directly in Discord",
            "Moderation tools: logging, auto-roles, welcome/farewell messages",
            "Discord.js bot with Prisma + PostgreSQL persistence",
            "Svelte dashboard at ganyu.fr with real-time stats and public API (/api)",
          ],
        },
      },
      {
        name: "Takt",
        tagline: "Privacy-friendly, self-hosted web analytics",
        description:
          "A privacy-friendly, self-hosted web analytics platform — our alternative to Plausible. A Go core with ClickHouse for events and Postgres for relational data, a NATS JetStream ingestion pipeline, and a SvelteKit dashboard. No cookies, no personal data, GDPR-compliant with no consent banner. The core is private, but the whole ecosystem (SDKs, framework integrations, MCP) is open-source.",
        details: {
          features: [
            "Privacy by design — no cookies, no PII, GDPR-compliant with no consent banner",
            "Tracking script < 6 KB, 100% server-side enrichment",
            "Go core: HTTP ingestion → NATS JetStream → worker → ClickHouse",
            "Postgres + Ent for relational data, organizations & RBAC, session + OAuth/OIDC auth (Argon2id)",
            "Conversion goals and funnels, cluster mode (HRW sharding + KEDA autoscaling)",
            "OpenTelemetry observability → Prometheus / Grafana / Tempo / Loki",
            "SvelteKit + Tailwind dashboard, multi-site, Docker Compose deployment",
            "Open-source ecosystem: JS (@takt/core) & PHP SDKs, React/Vue/Svelte/Solid/Angular/Astro wrappers, Laravel/Symfony, a WordPress plugin and an MCP server",
          ],
        },
      },
      {
        name: "Naht",
        tagline: "Filesystem ↔ Roblox Studio sync in Rust",
        description:
          "A Rust filesystem-sync tool for Roblox Studio: it keeps your code on disk and your Studio session in lockstep in both directions at once, and when both sides change the same script it does a real 3-way merge instead of silently overwriting your work. A from-scratch alternative to Rojo and Argon, built around their failure modes.",
        details: {
          features: [
            "Bidirectional sync is the core design — a failed write pauses one path, never kills the session",
            "Real 3-way merge with a persisted base; unmergeable conflicts get git-style markers and freeze the path until resolved",
            "Last-sync state persisted to SQLite — restarts and reconnects re-diff safely instead of re-clobbering",
            "Convention over configuration; naht init --from-rojo migrates an existing project",
            "Unsyncable properties (CSG, terrain, MeshId…) are detected and reported, never silently dropped",
            "Localhost daemon + MessagePack protocol, CLI, Luau Studio plugin",
            "Animated Svelte documentation site; the Rust side is covered by tests",
          ],
        },
      },
    ],
  },
  education: {
    label: "Education",
    title: "Where I studied",
    items: [
      {
        degree: "Bachelor in Web Development",
        school: "Efficom | Lille",
        period: "2024 - 2025",
      },
      {
        degree: "Computer Science Degree",
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
    label: "Travels",
    title: "Cities I've been to",
    cities: "cities",
    tags: {
      lived: "Lived",
      studied: "Studied",
      worked: "Worked",
      visited: "Visited",
      layover: "Layover",
    } as Record<string, string>,
  },
  contact: {
    label: "Contact",
    title: "Let's talk",
    subtitle: "Open to opportunities and interesting projects.",
    email: "Email",
    phone: "Phone",
    github: "GitHub",
    location: "Location",
  },
  projectPage: {
    back: "Back to projects",
    about: "About",
    features: "Features",
    techStack: "Tech Stack",
    links: "Links",
    github: "GitHub",
    website: "Website",
    livePreview: "Live preview",
    openSite: "Open site",
    ecosystem: "Open-source ecosystem",
    ecosystemNote: "The core is private, but every SDK and integration is open-source.",
  },
  footer: {
    madeWith: "Built with",
    and: "& SvelteKit",
  },
  profile: {
    title: "Full Stack Developer",
    subtitle: "I build backends, ship frontends, and break things in between",
  },
};
