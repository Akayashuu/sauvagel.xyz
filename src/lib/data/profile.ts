export const profile = {
  name: "Léo Sauvage",
  location: "Hauts-de-France",
  email: "sauvageleo1@gmail.com",
  phone: "06 34 20 13 85",
  website: "sauvagel.xyz",
  github: "https://github.com/Akayashuu",
  githubUsername: "Akayashuu",
};

export const experienceLogos = ["🌱", "🏥"];

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
};

export const projectMeta = [
  {
    slug: "white",
    tech: [
      "TypeScript",
      "Discord.js",
      "RabbitMQ",
      "Docker",
      "Drizzle",
      "PostgreSQL",
      "Grafana",
      "Prometheus",
    ],
    gradient: "from-violet-600 to-purple-800",
    color: "#7c3aed",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "RabbitMQ", "Docker"],
  },
  {
    slug: "enderbot",
    tech: ["TypeScript", "Discord.js", "Prisma", "PostgreSQL", "pnpm"],
    gradient: "from-emerald-600 to-teal-800",
    color: "#059669",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Discord.js", "PostgreSQL"],
    externalUrl: "https://ender.gg",
  },
  {
    slug: "aeroclub-electron",
    tech: ["Symfony", "PHP", "Electron", "PostgreSQL", "Twig", "Node.js"],
    gradient: "from-amber-600 to-orange-800",
    color: "#d97706",
    link: "https://github.com/Akayashuu/Aeroclub-Symfony-Electron",
    logos: ["Electron", "Symfony", "PHP", "PostgreSQL"],
  },
  {
    slug: "aeroclub-symfony",
    tech: ["Symfony", "PHP", "PostgreSQL", "Twig", "Webpack", "Composer"],
    gradient: "from-cyan-600 to-blue-800",
    color: "#0891b2",
    link: "https://github.com/Akayashuu/Aeroclub-Symfony",
    logos: ["Symfony", "PHP", "PostgreSQL"],
  },
  {
    slug: "ganyu",
    tech: ["TypeScript", "Svelte", "Grafana", "Docker"],
    gradient: "from-pink-600 to-rose-800",
    color: "#db2777",
    link: "https://github.com/Akayashuu",
    logos: ["TypeScript", "Svelte", "Docker", "Grafana"],
    externalUrl: "https://ganyu.fr",
  },
];
