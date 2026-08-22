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

export interface ProjectMeta {
  slug: string;
  tech: string[];
  color: string;
  link: string;
  logos: string[];
  externalUrl?: string;
  // Capture statique (webp) servie depuis /static — remplace les anciennes
  // iframes live qui rendaient ~5 sites entiers en parallèle (gros lag).
  image?: string;
  ecosystem?: { name: string; url: string; tag: string }[];
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: "white",
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
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "RabbitMQ", "Docker"],
    externalUrl: "https://whiteashes.fr",
    image: "/projects/white.webp",
  },
  {
    slug: "enderbot",
    tech: ["TypeScript", "Node.js", "Discord.js", "Prisma", "PostgreSQL", "SvelteKit", "Tailwind", "Docker", "pnpm"],
    color: "#059669",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "PostgreSQL", "Svelte"],
    externalUrl: "https://ender.gg",
    image: "/projects/enderbot.webp",
  },
  {
    slug: "ganyu",
    tech: ["TypeScript", "Node.js", "Discord.js", "Svelte", "PostgreSQL", "Prisma", "Grafana", "Docker"],
    color: "#db2777",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "Svelte", "Docker"],
    externalUrl: "https://ganyu.fr",
    image: "/projects/ganyu.webp",
  },
  {
    slug: "takt",
    tech: ["Go", "ClickHouse", "PostgreSQL", "NATS", "SvelteKit", "Tailwind", "Docker", "Grafana", "OpenTelemetry"],
    color: "#0284c7",
    link: "https://github.com/orgs/vskstudio/repositories?q=takt",
    logos: ["Go", "ClickHouse", "SvelteKit", "Docker"],
    externalUrl: "https://taktlytics.com",
    image: "/projects/takt.webp",
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
    tech: ["Rust", "Luau", "SQLite", "Svelte"],
    color: "#dc2626",
    link: "https://github.com/vskstudio/naht",
    logos: ["Rust", "Luau", "SQLite", "Svelte"],
    externalUrl: "https://naht.dev",
    image: "/projects/naht.webp",
  },
  {
    slug: "herrscher",
    tech: ["Go", "Git", "SQLite", "Linux", "Arch", "Docker"],
    color: "#0ea5e9",
    link: "https://github.com/Herrscherd/herrscher",
    logos: ["Go", "Git", "Linux", "Docker"],
  },
  {
    slug: "wesync",
    tech: ["SvelteKit", "TypeScript", "Tailwind", "PostgreSQL", "Docker", "Vitest", "ESLint"],
    color: "#2563eb",
    link: "https://github.com/orgs/vskstudio/repositories?q=wesync",
    logos: ["SvelteKit", "TypeScript", "Tailwind", "Docker"],
    externalUrl: "https://wesync.fr",
    image: "/projects/wesync.webp",
  },
  {
    slug: "cryptobar",
    tech: ["Rust", "QML", "GTK4", "Wayland", "Hyprland", "Linux", "Arch"],
    color: "#f7931a",
    link: "https://github.com/Akayashuu/cryptobar",
    logos: ["Rust", "QML", "GTK4", "Hyprland"],
    image: "/projects/cryptobar.webp",
  },
];
