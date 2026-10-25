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
    blog: "Blog",
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
      "I build things for the web, mobile, and sometimes just for fun. I spend most of my time writing <strong>TypeScript</strong>, <strong>Go</strong> and <strong>Rust</strong>, and wiring up <strong>distributed systems</strong>, and I'm just as comfortable putting together a frontend or deploying containers. I care about code quality (Biome, ESLint, strict types) and I like when things are well-structured.",
    highlights: [
      {
        title: "Backend first",
        desc: "Go, Bun, message queues, microservices. I like the plumbing side of things",
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
        desc: "Discord bots, a Minecraft server, web analytics. I like to ship stuff",
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
    usedSingular: "shipped project",
    usedPlural: "shipped projects",
    note: "Counted from the projects below, not from a score I give myself.",
  },
  projects: {
    label: "Projects",
    title: "Things I've built",
    items: [
      {
        name: "Enderbot",
        tagline: "Discord RPG bot, 6000+ cards",
        description:
          "An advanced Discord RPG bot combining exploration, card collection (6000+ cards from games, anime & manga), economy, crafting, and multiplayer warfare. A Bun monorepo: a Go Discord gateway (disgo) running every shard, a TypeScript core linked over RabbitMQ and protobuf, Prisma on PostgreSQL, Redis, and a SvelteKit + Tailwind dashboard. Free-to-play, running since 2017.",
        details: {
          features: [
            "Over 6,000 collectible cards from video games, anime, and manga",
            "RPG mechanics: hero leveling, item crafting, building systems",
            "Exploration across multiple locations and biomes",
            "Organization system: team up with other players and compete on leaderboards",
            "Economy, war map, and competitive rankings",
            "SvelteKit + Tailwind dashboard with logs, leaderboard, library, and server stats",
            "Public API at ender.gg, deployed with Docker",
            "Go Discord gateway (disgo): every shard in one process, linked to the TypeScript core over RabbitMQ and protobuf",
            "Dungeons, quests and pets, with a 3D organization island (three.js) on the dashboard",
            "Bun monorepo with Prisma, PostgreSQL and Redis, observability with Prometheus, Grafana and Loki",
          ],
        },
      },
      {
        name: "Karamon",
        tagline: "French-speaking Minecraft Cobblemon server",
        description:
          "A French-speaking Minecraft Cobblemon (Pokémon in Minecraft) server, built end to end: seven in-house Fabric mods in Java on top of Cobbleverse, an Electron launcher that installs everything in one click, the karamon.fr site with a wiki and a shop, and Rust services around the game for administration and observability. Several worlds: a protected spawn, a resources world reset every night and a permanent adventure map with 48 locations.",
        details: {
          diagramCaption:
            "CI publishes the client pack, the launcher installs it and connects the player; the game server and its tools run on Docker Compose.",
          features: [
            "About 280,000 lines of Java across seven Fabric mods and around a hundred gameplay modules",
            "K menu: profile, quests, battle pass, guilds and territories, ranked seasons, leaderboards and shop",
            "Legendary raids, auction house, seasonal events and script-generated Pokémon skins",
            "Resources world reset daily, permanent adventure map with per-player loot in every chest",
            "Rust admin panel (axum, sqlx) that drives the Minecraft container through the Docker API",
            "Cross-platform Electron launcher with auto-updates and Discord Rich Presence",
            "Bilingual prerendered Svelte site, Markdown wiki and a Rust API for the Stripe shop",
          ],
          ecosystemNote:
            "The server and its mods are private, the launcher is open source.",
        },
      },
      {
        name: "Ganyu.fr",
        tagline: "Discord community bot",
        description:
          "A Discord bot for community management, with a Go Discord gateway (disgo) and a TypeScript core on Bun linked over RabbitMQ, Prisma and PostgreSQL: leveling with automatic role rewards, economy and weighted draws, mini-games and poker as a Discord Activity, tickets, moderation, and custom welcome messages. SvelteKit dashboard, all deployed with Docker.",
        details: {
          features: [
            "Leveling system with XP from text and voice activity",
            "Automatic role assignment at level milestones",
            "Economy with daily/hourly rewards and server leaderboards",
            "Weighted draws for rare roles and rewards",
            "Mini-games in Discord and the Arcade: Texas Hold'em poker as a Discord Activity, real-time WebSocket lobby",
            "Moderation tools: logging, auto-roles, welcome/farewell messages",
            "Go gateway (disgo) for every shard, TypeScript core on Bun, Prisma + PostgreSQL",
            "Custom bots for PRO servers: a Rust orchestrator runs one Docker container per server with its own token",
            "SvelteKit + Tailwind dashboard at ganyu.fr with real-time stats",
          ],
        },
      },
      {
        name: "Takt",
        tagline: "Privacy-friendly, self-hosted web analytics",
        description:
          "A privacy-friendly, self-hosted web analytics platform, our alternative to Plausible. A Go core with ClickHouse for events and Postgres for relational data, a NATS JetStream ingestion pipeline, and a SvelteKit dashboard. No cookies, no personal data, GDPR-compliant with no consent banner. The core is private, but the whole ecosystem (SDKs, framework integrations) is open-source, and a remote MCP server with OAuth 2.1 is built into the API.",
        details: {
          diagramCaption:
            "A modular monolith: a durable queue separates ingestion from writes, and reads never touch the hot path.",
          features: [
            "Privacy by design: no cookies, no PII, GDPR-compliant with no consent banner",
            "Tracking script < 6 KB, 100% server-side enrichment",
            "Go core: HTTP ingestion → NATS JetStream → worker → ClickHouse",
            "AI visibility: traffic referred by assistants and AI crawler visits, verified by IP",
            "Postgres + Ent for relational data, organizations & RBAC, session + OAuth/OIDC auth (Argon2id), passkeys and TOTP",
            "Conversion goals and funnels, cluster mode (HRW sharding + KEDA autoscaling)",
            "OpenTelemetry observability → Prometheus / Grafana / Tempo / Loki",
            "SvelteKit dashboard built with Bun and embedded in the Go binary, Docker Compose or Helm deployment",
            "Open-source ecosystem: JS (@vskstudio/takt-core), PHP and read API SDKs, React/Vue/Svelte/Solid/Angular/Astro wrappers, Laravel/Symfony and a WordPress plugin",
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
            "Bidirectional sync is the core design: a failed write pauses one path, never kills the session",
            "Real 3-way merge with a persisted base; unmergeable conflicts get git-style markers and freeze the path until resolved",
            "Last-sync state persisted to SQLite: restarts and reconnects re-diff safely instead of re-clobbering",
            "Convention over configuration; naht init --from-rojo migrates an existing project",
            "Unsyncable properties (CSG, terrain, MeshId…) are detected and reported, never silently dropped",
            "Localhost daemon + MessagePack protocol, CLI, Luau Studio plugin",
            "Animated Svelte documentation site; the Rust side is covered by tests",
          ],
        },
      },
      {
        name: "Herrscher",
        tagline: "Fleets of AI agents that survive a restart",
        description:
          "A self-hosted Go daemon that runs fleets of coding agents: every session is a channel, an agent and its own git worktree, supervised and restarted on its own, with persistent memory in an Obsidian vault recalled before every turn. Agents delegate work to each other across model vendors, and you drive them from Discord, from the terminal, or from your own gateway.",
        details: {
          diagramCaption:
            "Hexagonal: contracts is the authority, the core depends on no edge and the edges depend on no core.",
          features: [
            "Durable sessions: a channel, an agent, an isolated worktree, resumed from the backend's own token after a restart",
            "Persistent memory in an Obsidian vault, shared per project and private per agent, recalled before every turn",
            "Opt-in consolidation of a session's work into memory nodes, with aging, semantic merge and reversible archiving",
            "Multi-agent delegation across vendors: one run mixes Claude, Codex and Cursor",
            "Terminal UI with live tabs, images over the kitty protocol or sixel depending on what the terminal supports, degrading silently",
            "Plugins compiled into the binary, xcaddy style: every change to the composition is a transaction that restores the tree when the build refuses",
            "Cross-backend skills, one SKILL.md per playbook",
          ],
          ecosystemNote:
            "The daemon and all its official plugins are public: gateways, backends, memory, conversation policy.",
        },
      },
      {
        name: "Neublox",
        tagline: "An MCP hub between AI and Roblox Studio",
        description:
          "A gateway connecting an AI agent to creation tools: the agent sees Roblox Studio as a tool, not as a window. A Rust core exposed as a unified MCP server, a Tauri desktop app that ships the daemon, herrscher and naht as sidecars, and a Rust cloud for identity and usage billing. Blender is next.",
        details: {
          diagramCaption:
            "Studio and the agent talk to the daemon, the app signs in to the cloud, and only the cloud talks to model vendors.",
          features: [
            "Unified MCP server on the agent side, a Luau Studio plugin linked to the daemon over local HTTP: one surface for the AI",
            "File and Studio sync through naht, so the source of truth stays a versionable git repository",
            "Tauri app that browses and edits herrscher's markdown vault like an Obsidian: tree, backlinks, search, graph",
            "File tree, SCM and diff against HEAD read from the real git worktree, Luau highlighting through full-moon",
            "accounts-api on axum: email and password or Discord, GitHub and Google OAuth, JWT, rotating refresh with reuse detection, TOTP, revocable devices",
            "The neublox-accounts gateway sits between the client's CLI and upstream vendors, and bills the account on real usage",
            "Public build locked at compile time: gateway only route, --cmd refused, failure instead of silent degradation",
            "Gateway token minted per runtime, injected with its base URL, never persisted nor logged",
            "Releases served from our own server, closed binaries composed outside CI so their source never enters a runner",
          ],
          ecosystemNote:
            "The product is private, but it is assembled from bricks I publish: the herrscher chassis and the naht sync engine.",
        },
      },
      {
        name: "cryptobar",
        tagline: "Crypto prices in your bar, terminal and desktop",
        description:
          "A Rust tool that puts cryptocurrency prices where you are already looking: a module in your Quickshell or Waybar bar, a full braille curve in the terminal, and a GTK4 window to search, watch and configure without ever opening the config file. No API key, no daemon, and the disk cache serves the data for as long as it is fresh, so the bar can tick every five seconds without issuing a single request.",
        details: {
          features: [
            "Four surfaces from one binary: bar module, panel, braille curve in the terminal, GTK4 window",
            "A Quickshell widget that draws a real curve, a Unicode sparkline on Waybar, scroll to move between coins",
            "Full JSON output for Ags, Eww and the rest: normalised series, trend, alerts and portfolio as separate fields",
            "Read-only portfolio from public Bitcoin, Ethereum or Solana addresses, never a private key",
            "Price alerts by threshold or by change, surfaced in the bar output with nothing to recompute",
            "A real-time signal refreshes Waybar on scroll instead of waiting for the next interval",
            "Scripted, idempotent install that backs up what it modifies and never touches your bar configuration",
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
    architecture: "Architecture",
    openSource: "Open source",
    privateCode: "Private code",
    since: "Since",
    repos: "repos",
    more: "Other projects",
    next: "Next project",
    prev: "Previous project",
    ecosystem: "Open-source ecosystem",
    ecosystemNote: "The core is private, but every SDK and integration is open-source.",
  },
  ui: {
    scrollHint: "Swipe the diagram to explore it",
    essentials: "The essentials",
  },
  blog: {
    label: "Blog",
    title: "Field notes",
    subtitle:
      "What I learn in production: rewrites, performance profiles, and the decisions that had to be undone.",
    back: "Back to the blog",
    minutes: "min read",
    read: "Read",
    contents: "Contents",
    all: "All",
    search: "Search",
    searchPlaceholder: "Title, topic, tech",
    project: "Project",
    topics: "Topics",
    reset: "Show everything",
    empty: "No article matches this filter.",
    one: "article",
    many: "articles",
    featured: "Featured",
    page: "Page",
    of: "of",
    prev: "Previous",
    next: "Next",
    less: "Less",
  },
  footer: {
    privacy: "Privacy",
  },
  privacy: {
    metaTitle: "Privacy",
    title: "Privacy",
    updated: "Last updated: July 30, 2026",
    intro:
      "This personal site collects the bare minimum. No advertising, no third-party trackers, no consent-requiring cookies.",
    cookiesTitle: "Cookies",
    cookies:
      "The site sets no advertising cookies and no third-party trackers. No consent banner is therefore required.",
    analyticsTitle: "Audience measurement",
    analytics:
      "Traffic is measured with <strong>Takt</strong>, a cookieless, self-hosted analytics solution. No cookie or identifier is stored on your device, and no cross-site tracking is possible.",
    ip:
      "Your IP address is used only transiently, to derive your country and compute an anonymous visit identifier (hashed with a key rotated every day), then immediately discarded, never stored. Your browser's “Do Not Track” signal is respected.",
    rightsTitle: "Contact & rights",
    rights:
      "For any question or to exercise your rights (access, rectification, erasure), email me at",
    back: "Back to home",
  },
  profile: {
    title: "Full Stack Developer",
    subtitle: "I build backends, ship frontends, and break things in between",
  },
};
