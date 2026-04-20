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
          "A text-based MMORPG running entirely on Discord. Microservice architecture with RabbitMQ, sharding, Drizzle ORM, and full observability via Prometheus, Grafana and Loki.",
        details: {
          features: [
            "Text-based MMORPG gameplay directly inside Discord",
            "Microservice architecture — each service communicates through RabbitMQ",
            "Bot sharding for scalability across multiple servers",
            "Drizzle ORM with PostgreSQL for persistent game state",
            "Full observability stack: Prometheus, Grafana, and Loki for logs",
            "Dockerized deployment for all services",
          ],
        },
      },
      {
        name: "Enderbot",
        tagline: "Discord RPG bot — 6000+ cards",
        description:
          "An advanced Discord RPG bot combining exploration, card collection (6000+ cards from games, anime & manga), economy, crafting, and multiplayer warfare. Free-to-play, running since 2017.",
        details: {
          features: [
            "Over 6,000 collectible cards from video games, anime, and manga",
            "RPG mechanics: hero leveling, item crafting, building systems",
            "Exploration across multiple locations and biomes",
            "Organization system — team up with other players and compete on leaderboards",
            "Economy, war map, and competitive rankings",
            "SvelteKit dashboard with logs, leaderboard, library, and server stats",
            "Public API at ender.gg",
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
          "A Discord bot for community management — leveling (100+ levels with automatic role rewards), economy with daily/hourly rewards and a gacha with pity system, mini-games, moderation, and custom welcome messages.",
        details: {
          features: [
            "Leveling system with 100+ levels — XP from text and voice activity",
            "Automatic role assignment at level milestones",
            "Economy with daily/hourly rewards and server leaderboards",
            "Gacha system with guaranteed pity for exclusive roles and rewards",
            "Integrated mini-games playable directly in Discord",
            "Moderation tools: logging, auto-roles, welcome/farewell messages",
            "Svelte dashboard at ganyu.fr with real-time stats",
            "Public API at ganyu.fr/api",
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
