import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SCRATCH = process.argv[2];
const VIOLET = "#9b7dfb";
const TURQ = "#40d6c8";
const GROUND = "#09090b";

/* ---- monogramme : le carré rangé, le carré déréglé ---- */
const mark = (stroke = 2.6) => `
  <rect x="5.2" y="5.2" width="13" height="13" fill="none" stroke="${VIOLET}" stroke-width="${stroke}"/>
  <rect x="13.8" y="13.8" width="13" height="13" fill="none" stroke="${TURQ}" stroke-width="${stroke}"
        transform="rotate(13 20.3 20.3)"/>`;

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="Léo Sauvage">${mark()}</svg>`;
writeFileSync("static/logo.svg", logo);
writeFileSync(
  "static/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="7" fill="${GROUND}"/>${mark(2.4)}</svg>`
);

/* ---- grille déréglée, déterministe, partagée par toutes les images ---- */
function grid({ w, h, step, seedStr, axis = "y" }) {
  let s = 2166136261;
  for (const ch of seedStr) { s ^= ch.charCodeAt(0); s = Math.imul(s, 16777619); }
  const rnd = () => { s = Math.imul(s ^ (s >>> 15), 2246822507); return ((s >>> 0) % 10000) / 10000; };
  const out = [];
  for (let y = step / 2; y < h; y += step) {
    for (let x = step / 2; x < w; x += step) {
      const t = axis === "y" ? y / h : x / w;
      const chaos = Math.pow(t, 1.35) * 1.6;
      const n = rnd();
      const size = step * 0.46 * (1 + (n - 0.5) * chaos * 0.8);
      const rot = ((n - 0.5) * chaos * 1.2 * 180) / Math.PI;
      const a = (0.11 + Math.pow(t, 1.35) * 0.3).toFixed(3);
      const c = n > 0.965 ? TURQ : VIOLET;
      out.push(
        `<rect x="${(x - size / 2).toFixed(1)}" y="${(y - size / 2).toFixed(1)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" fill="none" stroke="${c}" stroke-opacity="${n > 0.965 ? 0.55 : a}" stroke-width="1.2" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`
      );
    }
  }
  return out.join("");
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function og({ seed, eyebrow, title, subtitle }) {
  const W = 1200, H = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>
  ${grid({ w: W, h: H, step: 34, seedStr: seed })}
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <defs><linearGradient id="veil" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="${GROUND}" stop-opacity="0.55"/>
    <stop offset="1" stop-color="${GROUND}" stop-opacity="0.92"/>
  </linearGradient></defs>
  <g transform="translate(84 176) scale(1.9)">${mark(2.2)}</g>
  <text x="152" y="212" font-family="JetBrains Mono" font-size="21" letter-spacing="4.2" fill="${TURQ}">${esc(eyebrow.toUpperCase())}</text>
  <text x="84" y="330" font-family="Space Grotesk" font-weight="700" font-size="96" letter-spacing="-4" fill="#fafafa">${esc(title)}</text>
  <text x="84" y="392" font-family="Space Grotesk" font-size="32" fill="#a1a1aa">${esc(subtitle)}</text>
  <text x="84" y="546" font-family="JetBrains Mono" font-size="22" letter-spacing="2" fill="#71717a">sauvagel.xyz</text>
</svg>`;
}

mkdirSync(`${SCRATCH}/svg`, { recursive: true });
const fonts = ["--use-font-file", `${SCRATCH}/space-grotesk-latin.ttf`, "--use-font-file", `${SCRATCH}/jetbrains-mono-latin.ttf`];
const render = (name, svg, out, extra = []) => {
  const p = `${SCRATCH}/svg/${name}.svg`;
  writeFileSync(p, svg);
  execFileSync("resvg", [...fonts, ...extra, p, out]);
  console.log("écrit", out);
};

mkdirSync("static/og", { recursive: true });
render("og-home", og({ seed: "leo-sauvage", eyebrow: "Développeur full-stack", title: "Léo Sauvage", subtitle: "TypeScript, Go, Rust et systèmes distribués" }), "static/og/home.png");

const PROJECTS = [
  { slug: "white", title: "White", sub: "TypeScript · RabbitMQ · PostgreSQL · Docker" },
  { slug: "enderbot", title: "Enderbot", sub: "TypeScript · Discord.js · Prisma · SvelteKit" },
  { slug: "ganyu", title: "Ganyu", sub: "TypeScript · Svelte · PostgreSQL · Grafana" },
  { slug: "takt", title: "Takt", sub: "Go · ClickHouse · NATS · SvelteKit" },
  { slug: "naht", title: "Naht", sub: "Rust · Luau · SQLite · Svelte" },
  { slug: "herrscher", title: "Herrscher", sub: "Go · SQLite · Docker · Linux" },
  { slug: "neublox", title: "Neublox", sub: "Rust · Tauri · MCP · SvelteKit" },
  { slug: "wesync", title: "WeSync", sub: "SvelteKit · TypeScript · PostgreSQL · Docker" },
  { slug: "cryptobar", title: "cryptobar", sub: "Rust · Quickshell · Waybar · GTK4" },
];
for (const p of PROJECTS) {
  render(`og-${p.slug}`, og({ seed: p.slug, eyebrow: "Projet", title: p.title, subtitle: p.sub }), `static/og/${p.slug}.png`);
}

/* ---- blog ---- */
render("og-blog", og({ seed: "blog", eyebrow: "Blog", title: "Notes de terrain", subtitle: "Réécritures, profils de perf et décisions défaites" }), "static/og/blog.png");

const POSTS = [
  { slug: "enderbot-passerelle-go", title: "Passerelle Go", sub: "Enderbot · discord.js -> disgo · profil de perf" },
];
for (const p of POSTS) {
  render(`og-blog-${p.slug}`, og({ seed: p.slug, eyebrow: "Article", title: p.title, subtitle: p.sub }), `static/og/blog-${p.slug}.png`);
}

/* ---- icônes d'application ---- */
const appIcon = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}"><rect width="32" height="32" rx="7" fill="${GROUND}"/>${mark(2.4)}</svg>`;
for (const s of [180, 192, 512]) {
  render(`icon-${s}`, appIcon(s), `static/icon-${s}.png`, ["--width", String(s), "--height", String(s)]);
}
render("favicon-32", appIcon(32), "static/favicon.png", ["--width", "32", "--height", "32"]);
