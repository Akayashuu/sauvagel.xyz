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
    items: ["Node.js", "TypeScript", "JavaScript", "Symfony", "PHP", "Python", "Java", "Rust", "C++", "C"],
  },
  {
    category: "Frontend",
    items: ["Svelte", "React", "Vue.js", "Tailwind", "React Native", "Liquid", "Twig", "Electron", "Discord.js"],
  },
  {
    category: "Data & ORM",
    items: ["PostgreSQL", "MySQL", "Prisma", "Drizzle", "Sequelize"],
  },
  {
    category: "DevOps & Tooling",
    items: ["Docker", "Git", "RabbitMQ", "Biome", "ESLint", "Grafana", "Linux", "Shopify", "PrestaShop", "WordPress", "Arch"],
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
  // Le lien n'existe que si du code est réellement consultable publiquement :
  // pointer un dépôt privé donne une page 404 au visiteur.
  link?: string;
  logos: string[];
  externalUrl?: string;
  // Capture statique (webp) servie depuis /static — remplace les anciennes
  // iframes live qui rendaient ~5 sites entiers en parallèle (gros lag).
  image?: string;
  // Vignette carrée du projet (son avatar public), utilisée là où la capture du
  // site serait trop large : listing du blog, en-tête d'article.
  avatar?: string;
  ecosystem?: { name: string; url?: string; tag: string }[];
  // Métadonnées factuelles, relevées sur les dépôts eux-mêmes.
  since?: string;
  visibility?: "public" | "private";
  license?: string;
  // Schéma d'architecture des gros projets : les noms de composants sont
  // techniques, donc ils vivent ici et pas dans les fichiers de traduction.
  diagram?: Diagram;
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: "white",
    since: "2021",
    visibility: "private",
    tech: [
      "TypeScript",
      "Node.js",
      "Discord.js",
      "RabbitMQ",
      "Drizzle",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Grafana",
      "Prometheus",
      "Loki",
    ],
    color: "#7c3aed",
    logos: ["TypeScript", "Discord.js", "RabbitMQ", "Docker"],
    externalUrl: "https://whiteashes.fr",
    image: "/projects/white.webp",
  },
  {
    slug: "enderbot",
    since: "2017",
    visibility: "private",
    tech: ["TypeScript", "Node.js", "Discord.js", "Prisma", "PostgreSQL", "SvelteKit", "Tailwind", "Docker", "pnpm"],
    color: "#059669",
    logos: ["TypeScript", "Discord.js", "PostgreSQL", "Svelte"],
    externalUrl: "https://ender.gg",
    image: "/projects/enderbot.webp",
    avatar: "/projects/avatars/enderbot.webp",
  },
  {
    slug: "ganyu",
    since: "2025",
    visibility: "private",
    tech: ["TypeScript", "Node.js", "Discord.js", "Svelte", "PostgreSQL", "Prisma", "Grafana", "Docker"],
    color: "#db2777",
    logos: ["TypeScript", "Discord.js", "Svelte", "Docker"],
    externalUrl: "https://ganyu.fr",
    image: "/projects/ganyu.webp",
  },
  {
    slug: "takt",
    since: "2026",
    visibility: "private",
    tech: ["Go", "ClickHouse", "PostgreSQL", "NATS", "SvelteKit", "Tailwind", "Docker", "Grafana", "OpenTelemetry"],
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
          ],
        },
        {
          title: "Lecture",
          nodes: [
            { id: "api", label: "api", note: "REST + OpenAPI", accent: true },
            { id: "dash", label: "dashboard", note: "SvelteKit" },
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
        { from: "api", to: "dash" },
      ],
    },
    ecosystem: [
      { name: "@takt/core", url: "https://github.com/vskstudio/takt-core", tag: "SDK JS" },
      { name: "takt-core-php", url: "https://github.com/vskstudio/takt-core-php", tag: "SDK PHP" },
      { name: "takt-read", url: "https://github.com/vskstudio/takt-read", tag: "SDK API" },
      { name: "takt-mcp", url: "https://github.com/vskstudio/takt-mcp", tag: "MCP" },
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
    license: "Apache 2.0",
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
    tech: ["Go", "Git", "SQLite", "Linux", "Arch", "Docker"],
    color: "#0ea5e9",
    link: "https://github.com/Herrscherd/herrscher",
    logos: ["Go", "Git", "Linux", "Docker"],
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
    tech: ["Rust", "Tauri", "Go", "SvelteKit", "TypeScript", "PostgreSQL", "Luau", "Docker", "MCP", "Linux"],
    color: "#8b5cf6",
    logos: ["Rust", "Tauri", "SvelteKit", "PostgreSQL"],
    ecosystem: [
      { name: "Neublox", tag: "Coeur + app" },
      { name: "neublox-accounts", tag: "Identité" },
      { name: "neublox-gateway", tag: "Facturation" },
      { name: "herrscher", url: "https://github.com/Herrscherd/herrscher", tag: "Châssis" },
      { name: "naht", url: "https://github.com/vskstudio/naht", tag: "Sync" },
    ],
    diagram: {
      columns: [
        {
          title: "Poste de travail",
          nodes: [
            { id: "app", label: "App Tauri", note: "Svelte, sessions et vault", accent: true },
            { id: "studio", label: "Roblox Studio", note: "plugin, client MCP stdio" },
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
        { from: "studio", to: "daemon", label: "MCP" },
        { from: "files", to: "naht", label: "merge 3 voies" },
        { from: "daemon", to: "accounts", label: "HTTPS" },
        { from: "herrscher", to: "gw", label: "jeton par runtime" },
        { from: "accounts", to: "pg" },
        { from: "gw", to: "pg" },
        { from: "gw", to: "vendors", label: "débit à l'usage" },
      ],
    },
  },
  {
    slug: "wesync",
    since: "2026",
    visibility: "private",
    tech: ["SvelteKit", "TypeScript", "Tailwind", "PostgreSQL", "Docker", "Vitest", "ESLint"],
    color: "#2563eb",
    logos: ["SvelteKit", "TypeScript", "Tailwind", "Docker"],
    externalUrl: "https://wesync.fr",
    image: "/projects/wesync.webp",
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
