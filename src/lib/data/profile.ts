export const profile = {
  name: "Léo Sauvage",
  location: "Hauts-de-France",
  email: "sauvageleo1@gmail.com",
  phone: "06 34 20 13 85",
  website: "sauvagel.xyz",
  github: "https://github.com/Akayashuu",
  githubUsername: "Akayashuu",
};

export const skills = [
  {
    category: "Backend",
    items: ["TypeScript", "Go", "Rust", "Node.js", "Bun", "JavaScript", "Symfony", "PHP", "Python", "Java", "C++", "C"],
  },
  {
    category: "Frontend",
    items: ["Svelte", "React", "Vue.js", "Tailwind", "React Native", "Liquid", "Twig", "Electron", "Discord.js"],
  },
  {
    category: "Data & ORM",
    items: ["PostgreSQL", "ClickHouse", "Redis", "SQLite", "MySQL", "Prisma", "Drizzle", "Sequelize"],
  },
  {
    category: "DevOps & Tooling",
    items: ["Docker", "Git", "RabbitMQ", "NATS", "Biome", "ESLint", "Grafana", "Linux", "Shopify", "PrestaShop", "WordPress", "Arch"],
  },
];

export interface DiagramNode {
  id: string;
  label: string;
  note?: string;
  accent?: boolean;
}

export interface Diagram {
  columns: { title: string; nodes: DiagramNode[] }[];
  edges: { from: string; to: string; label?: string }[];
}

export interface ProjectMeta {
  slug: string;
  tech: string[];
  color: string;

  link?: string;
  logos: string[];
  externalUrl?: string;

  image?: string;

  avatar?: string;
  ecosystem?: { name: string; url?: string; tag: string }[];

  since?: string;
  visibility?: "public" | "private";
  license?: string;

  diagram?: Diagram;
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: "enderbot",
    since: "2017",
    visibility: "private",
    tech: ["TypeScript", "Bun", "Go", "disgo", "PostgreSQL", "Prisma", "RabbitMQ", "Redis", "SvelteKit", "Docker"],
    color: "#059669",
    logos: ["TypeScript", "Bun", "Go", "Svelte"],
    externalUrl: "https://ender.gg",
    image: "/projects/enderbot.webp",
    avatar: "/projects/avatars/enderbot.webp",
  },
  {
    slug: "karamon",
    since: "2026",
    visibility: "private",
    tech: ["Java", "Fabric", "Cobblemon", "Rust", "Svelte", "PostgreSQL", "Electron", "TypeScript", "Docker", "Cloudflare"],
    color: "#e11d48",
    logos: ["Java", "Rust", "Svelte", "Electron"],
    externalUrl: "https://karamon.fr",
    image: "/projects/karamon.webp",
    diagram: {
      columns: [
        {
          title: "Joueur",
          nodes: [
            { id: "launcher", label: "launcher", note: "Electron, Microsoft ou hors ligne", accent: true },
            { id: "site", label: "karamon.fr", note: "Svelte, wiki, boutique" },
          ],
        },
        {
          title: "Distribution",
          nodes: [
            { id: "ci", label: "CI", note: "build du pack client" },
            { id: "pack", label: "pack.json", note: "mods et assets" },
            { id: "api", label: "karamonAPI", note: "Rust, Stripe, releases" },
          ],
        },
        {
          title: "Serveur de jeu",
          nodes: [
            { id: "mc", label: "Fabric 1.21.1", note: "Cobblemon, 7 mods maison", accent: true },
            { id: "pg", label: "PostgreSQL", note: "joueurs, économie, saisons" },
          ],
        },
        {
          title: "Outils",
          nodes: [
            { id: "panel", label: "panel", note: "Rust axum, Svelte" },
            { id: "obs", label: "observability", note: "Rust" },
          ],
        },
      ],
      edges: [
        { from: "ci", to: "pack", label: "rrsync" },
        { from: "launcher", to: "pack", label: "installe" },
        { from: "site", to: "api" },
        { from: "launcher", to: "mc", label: "play.karamon.fr" },
        { from: "mc", to: "pg" },
        { from: "panel", to: "mc", label: "API Docker" },
        { from: "panel", to: "pg" },
        { from: "obs", to: "pg" },
      ],
    },
    ecosystem: [
      { name: "Karamon-launcher", url: "https://github.com/vskstudio/Karamon-launcher", tag: "Launcher" },
    ],
  },
  {
    slug: "ganyu",
    since: "2025",
    visibility: "private",
    tech: ["TypeScript", "Go", "Bun", "disgo", "Rust", "PostgreSQL", "Prisma", "RabbitMQ", "Redis", "SvelteKit"],
    color: "#db2777",
    logos: ["Go", "TypeScript", "Bun", "Svelte"],
    externalUrl: "https://ganyu.fr",
    image: "/projects/ganyu.webp",
  },
  {
    slug: "takt",
    since: "2026",
    visibility: "private",
    tech: ["Go", "ClickHouse", "PostgreSQL", "NATS", "Redis", "SvelteKit", "Bun", "OpenTelemetry", "Grafana", "Docker"],
    color: "#0284c7",
    link: "https://github.com/orgs/vskstudio/repositories?q=takt",
    logos: ["Go", "ClickHouse", "SvelteKit", "Docker"],
    externalUrl: "https://taktlytics.com",
    image: "/projects/takt.webp",
    diagram: {
      columns: [
        {
          title: "Collecte",
          nodes: [
            { id: "js", label: "takt.js", note: "2,5 ko gzip, sans cookie" },
            { id: "s2s", label: "SDK serveur", note: "PHP, Node, events achat" },
          ],
        },
        {
          title: "Ingestion",
          nodes: [
            { id: "ingest", label: "ingest", note: "Go, HTTP", accent: true },
            { id: "nats", label: "NATS JetStream", note: "file durable" },
            { id: "worker", label: "worker", note: "sharding HRW, KEDA" },
          ],
        },
        {
          title: "Stockage",
          nodes: [
            { id: "ch", label: "ClickHouse", note: "events analytiques" },
            { id: "pg", label: "Postgres + Ent", note: "comptes, sites, RBAC" },
            { id: "redis", label: "Redis", note: "cache et quotas" },
          ],
        },
        {
          title: "Lecture",
          nodes: [
            { id: "api", label: "api", note: "REST, OpenAPI, MCP", accent: true },
            { id: "dash", label: "dashboard", note: "SvelteKit, embarqué dans api" },
          ],
        },
      ],
      edges: [
        { from: "js", to: "ingest", label: "POST /api/event" },
        { from: "s2s", to: "ingest" },
        { from: "ingest", to: "nats", label: "publish" },
        { from: "nats", to: "worker", label: "pull" },
        { from: "worker", to: "ch", label: "batch INSERT" },
        { from: "ch", to: "api" },
        { from: "pg", to: "api" },
        { from: "redis", to: "api" },
        { from: "api", to: "dash" },
      ],
    },
    ecosystem: [
      { name: "@vskstudio/takt-core", url: "https://github.com/vskstudio/takt-core", tag: "SDK JS" },
      { name: "takt-core-php", url: "https://github.com/vskstudio/takt-core-php", tag: "SDK PHP" },
      { name: "takt-read", url: "https://github.com/vskstudio/takt-read", tag: "SDK API" },
      { name: "takt-react", url: "https://github.com/vskstudio/takt-react", tag: "React" },
      { name: "takt-vue", url: "https://github.com/vskstudio/takt-vue", tag: "Vue" },
      { name: "takt-svelte", url: "https://github.com/vskstudio/takt-svelte", tag: "Svelte" },
      { name: "takt-solid", url: "https://github.com/vskstudio/takt-solid", tag: "Solid" },
      { name: "takt-angular", url: "https://github.com/vskstudio/takt-angular", tag: "Angular" },
      { name: "takt-astro", url: "https://github.com/vskstudio/takt-astro", tag: "Astro" },
      { name: "takt-laravel", url: "https://github.com/vskstudio/takt-laravel", tag: "Laravel" },
      { name: "takt-symfony", url: "https://github.com/vskstudio/takt-symfony", tag: "Symfony" },
      { name: "takt-wordpress", url: "https://github.com/vskstudio/takt-wordpress", tag: "WordPress" },
      { name: "takt-examples", url: "https://github.com/vskstudio/takt-examples", tag: "Exemples" },
    ],
  },
  {
    slug: "naht",
    since: "2026",
    visibility: "public",
    license: "MIT / Apache 2.0",
    tech: ["Rust", "Luau", "SQLite", "Svelte"],
    color: "#dc2626",
    link: "https://github.com/vskstudio/naht",
    logos: ["Rust", "Luau", "SQLite", "Svelte"],
    externalUrl: "https://naht.dev",
    image: "/projects/naht.webp",
  },
  {
    slug: "herrscher",
    since: "2026",
    visibility: "public",
    license: "MIT",
    tech: ["Go", "gRPC", "NATS", "Bubble Tea", "Git", "Obsidian", "SSH", "Discord", "Linux", "Arch"],
    color: "#0ea5e9",
    link: "https://github.com/Herrscherd/herrscher",
    logos: ["Go", "NATS", "Git", "Linux"],
    ecosystem: [
      { name: "herrscher-contracts", url: "https://github.com/Herrscherd/herrscher-contracts", tag: "Ports" },
      { name: "herrscher-transport", url: "https://github.com/Herrscherd/herrscher-transport", tag: "Transport" },
      { name: "herrscher-discord-gateway", url: "https://github.com/Herrscherd/herrscher-discord-gateway", tag: "Passerelle" },
      { name: "dctl", url: "https://github.com/Herrscherd/dctl", tag: "Client Discord" },
      { name: "herrscher-claude-backend", url: "https://github.com/Herrscherd/herrscher-claude-backend", tag: "Backend" },
      { name: "herrscher-codex-backend", url: "https://github.com/Herrscherd/herrscher-codex-backend", tag: "Backend" },
      { name: "herrscher-cursor-backend", url: "https://github.com/Herrscherd/herrscher-cursor-backend", tag: "Backend" },
      { name: "herrscher-obsidian-memory", url: "https://github.com/Herrscherd/herrscher-obsidian-memory", tag: "Mémoire" },
      { name: "herrscher-llm-extractor", url: "https://github.com/Herrscherd/herrscher-llm-extractor", tag: "Mémoire" },
      { name: "herrscher-orchestrator", url: "https://github.com/Herrscherd/herrscher-orchestrator", tag: "Politique" },
      { name: "herrscher-superset-skills", url: "https://github.com/Herrscherd/herrscher-superset-skills", tag: "Playbooks" },
    ],
    diagram: {
      columns: [
        {
          title: "Bord canal",
          nodes: [
            { id: "discord", label: "Discord", note: "passerelle, via dctl" },
            { id: "tui", label: "Terminal TUI", note: "onglets, kitty ou sixel" },
            { id: "yours", label: "Ta passerelle", note: "même port neutre" },
          ],
        },
        {
          title: "Coeur agnostique",
          nodes: [
            { id: "contracts", label: "contracts", note: "ports et types neutres", accent: true },
            { id: "core", label: "daemon", note: "sessions, worktrees git", accent: true },
            { id: "coord", label: "Coordinator", note: "délégation, fan out, merge" },
          ],
        },
        {
          title: "Bord modèle",
          nodes: [
            { id: "claude", label: "Claude", note: "stream json" },
            { id: "codex", label: "Codex" },
            { id: "cursor", label: "Cursor Agent" },
          ],
        },
        {
          title: "Bord mémoire",
          nodes: [
            { id: "vault", label: "Vault Obsidian", note: "projet partagé, agent privé" },
            { id: "orch", label: "Orchestrator", note: "amorce et consolide le tour" },
          ],
        },
      ],
      edges: [
        { from: "discord", to: "contracts" },
        { from: "tui", to: "contracts", label: "port Gateway" },
        { from: "yours", to: "contracts" },
        { from: "core", to: "claude", label: "port Backend" },
        { from: "core", to: "codex" },
        { from: "core", to: "cursor" },
        { from: "coord", to: "vault", label: "port Memory" },
        { from: "coord", to: "orch" },
      ],
    },
  },
  {
    slug: "neublox",
    since: "2026",
    visibility: "private",
    tech: ["Rust", "Tauri", "MCP", "Svelte", "TypeScript", "Go", "Luau", "PostgreSQL", "Docker", "SvelteKit"],
    color: "#8b5cf6",
    logos: ["Rust", "Tauri", "MCP", "Svelte"],
    ecosystem: [
      { name: "Neublox", tag: "Coeur + app" },
      { name: "neublox-accounts", tag: "Identité" },
      { name: "neublox-extractor", tag: "Mémoire" },
      { name: "herrscher", url: "https://github.com/Herrscherd/herrscher", tag: "Châssis" },
      { name: "naht", url: "https://github.com/vskstudio/naht", tag: "Sync" },
    ],
    diagram: {
      columns: [
        {
          title: "Poste de travail",
          nodes: [
            { id: "app", label: "App Tauri", note: "Svelte, sessions et vault", accent: true },
            { id: "studio", label: "Roblox Studio", note: "plugin Luau, HTTP local" },
            { id: "files", label: "Fichiers du projet", note: "source de vérité git" },
          ],
        },
        {
          title: "Sidecars",
          nodes: [
            { id: "daemon", label: "Daemon Neublox", note: "Rust, serveur MCP unifié", accent: true },
            { id: "herrscher", label: "herrscher", note: "harness d'agents, en Go" },
            { id: "naht", label: "naht", note: "sync bidirectionnelle, Rust" },
          ],
        },
        {
          title: "Cloud",
          nodes: [
            { id: "accounts", label: "accounts-api", note: "axum, JWT, TOTP, OAuth" },
            { id: "gw", label: "neublox-gateway", note: "crédits, webhooks Stripe" },
          ],
        },
        {
          title: "Amont et données",
          nodes: [
            { id: "vendors", label: "Claude, Codex", note: "route gateway only" },
            { id: "pg", label: "Postgres", note: "public et schéma gateway" },
          ],
        },
      ],
      edges: [
        { from: "app", to: "daemon", label: "Op::Snapshot" },
        { from: "studio", to: "daemon", label: "HTTP long-poll" },
        { from: "files", to: "naht", label: "merge 3 voies" },
        { from: "app", to: "accounts", label: "HTTPS" },
        { from: "herrscher", to: "gw", label: "jeton par runtime" },
        { from: "accounts", to: "pg" },
        { from: "gw", to: "pg" },
        { from: "gw", to: "vendors", label: "débit à l'usage" },
      ],
    },
  },
  {
    slug: "cryptobar",
    since: "2026",
    visibility: "public",
    license: "MIT",
    tech: ["Rust", "QML", "GTK4", "Wayland", "Hyprland", "Linux", "Arch"],
    color: "#f7931a",
    link: "https://github.com/Akayashuu/cryptobar",
    logos: ["Rust", "QML", "GTK4", "Hyprland"],
    image: "/projects/cryptobar.webp",
  },
];
