export const profile = {
  name: "Léo Sauvage",
  location: "Hauts-de-France",
  email: "sauvageleo1@gmail.com",
  phone: "06 34 20 13 85",
  website: "sauvagel.xyz",
  github: "https://github.com/Akayashuu",
  githubUsername: "Akayashuu",
};

export const experienceLogos = ["🚀", "🌱", "🏥"];

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

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${name}/${name}-original.svg`;

export const techIcons: Record<string, string> = {
  TypeScript: devicon("typescript"),
  JavaScript: devicon("javascript"),
  "Discord.js": devicon("discordjs"),
  RabbitMQ: devicon("rabbitmq"),
  Docker: devicon("docker"),
  PostgreSQL: devicon("postgresql"),
  Grafana: devicon("grafana"),
  Prometheus: devicon("prometheus"),
  Prisma: devicon("prisma"),
  pnpm: devicon("pnpm"),
  Symfony: devicon("symfony"),
  PHP: devicon("php"),
  Electron: devicon("electron"),
  Webpack: devicon("webpack"),
  Svelte: devicon("svelte"),
  Vite: devicon("vitejs"),
  "Node.js": devicon("nodejs"),
  Composer: devicon("composer"),
  Python: devicon("python"),
  Java: devicon("java"),
  Rust: devicon("rust"),
  React: devicon("react"),
  "Vue.js": devicon("vuejs"),
  Tailwind: devicon("tailwindcss"),
  "React Native": devicon("react"),
  MySQL: devicon("mysql"),
  Sequelize: devicon("sequelize"),
  Git: devicon("git"),
  ESLint: devicon("eslint"),
  Linux: devicon("linux"),
  Nginx: devicon("nginx"),
  Redis: devicon("redis"),
  SvelteKit: devicon("svelte"),
  Kotlin: devicon("kotlin"),
  WordPress: `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/wordpress/wordpress-plain.svg`,
  Arch: devicon("archlinux"),
  "C++": devicon("cplusplus"),
  C: devicon("c"),
  // Not in devicons — using Simple Icons
  Twig: "https://cdn.simpleicons.org/symfony/AAAAAA",
  Drizzle: "https://cdn.simpleicons.org/drizzle/C5F74F",
  Biome: "https://cdn.simpleicons.org/biome/60A5FA",
  Shopify: "https://cdn.simpleicons.org/shopify/7AB55C",
  Liquid: "https://cdn.simpleicons.org/shopify/7AB55C",
  PrestaShop: "https://cdn.simpleicons.org/prestashop/DF0067",
  i18next: "https://cdn.simpleicons.org/i18next/7DC4B4",
  Cloudflare: "https://cdn.simpleicons.org/cloudflare/F38020",
  Vitest: "https://cdn.simpleicons.org/vitest/6E9F18",
  Loki: "https://cdn.simpleicons.org/grafana/F46800",
};

export interface ProjectMeta {
  slug: string;
  tech: string[];
  gradient: string;
  color: string;
  link: string;
  logos: string[];
  externalUrl?: string;
  preview?: string;
  previewScheme?: "dark" | "light";
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: "vskstudio",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "i18next", "Vitest", "Docker", "Nginx", "Cloudflare"],
    gradient: "from-sky-500 to-indigo-700",
    color: "#6366f1",
    link: "https://github.com/Akayashuu",
    logos: ["React", "TypeScript", "Vite", "Tailwind", "Docker"],
    externalUrl: "https://vskstudio.fr",
    preview: "https://vskstudio.fr/fr/",
    previewScheme: "light",
  },
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
    gradient: "from-violet-600 to-purple-800",
    color: "#7c3aed",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "RabbitMQ", "Docker"],
  },
  {
    slug: "enderbot",
    tech: ["TypeScript", "Node.js", "Discord.js", "Prisma", "PostgreSQL", "SvelteKit", "Tailwind", "Docker", "pnpm"],
    gradient: "from-emerald-600 to-teal-800",
    color: "#059669",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "PostgreSQL", "Svelte"],
    externalUrl: "https://ender.gg",
    preview: "https://ender.gg",
    previewScheme: "dark",
  },
  {
    slug: "aeroclub-electron",
    tech: ["Symfony", "PHP", "Electron", "Node.js", "Twig", "PostgreSQL"],
    gradient: "from-amber-600 to-orange-800",
    color: "#d97706",
    link: "https://github.com/Akayashuu/Aeroclub-Symfony-Electron",
    logos: ["Electron", "Symfony", "PHP", "PostgreSQL"],
  },
  {
    slug: "aeroclub-symfony",
    tech: ["Symfony", "PHP", "Twig", "Webpack", "Composer", "PostgreSQL"],
    gradient: "from-cyan-600 to-blue-800",
    color: "#0891b2",
    link: "https://github.com/Akayashuu/Aeroclub-Symfony",
    logos: ["Symfony", "PHP", "PostgreSQL"],
  },
  {
    slug: "ganyu",
    tech: ["TypeScript", "Node.js", "Discord.js", "Svelte", "PostgreSQL", "Prisma", "Grafana", "Docker"],
    gradient: "from-pink-600 to-rose-800",
    color: "#db2777",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "Svelte", "Docker"],
    externalUrl: "https://ganyu.fr",
    preview: "https://ganyu.fr",
    previewScheme: "dark",
  },
];
