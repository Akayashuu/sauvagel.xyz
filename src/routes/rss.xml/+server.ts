import { posts } from "$lib/data/posts";

// Le flux est prérendu comme le reste du site : un fichier statique de plus
// dans build/, pas de serveur à faire tourner pour le servir.
export const prerender = true;

const SITE = "https://sauvagel.xyz";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const items = [...posts]
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
    .map((post) => {
      const url = `${SITE}/blog/${post.meta.slug}`;
      return `    <item>
      <title>${escape(post.fr.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <description>${escape(post.fr.excerpt)}</description>
${post.meta.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Léo Sauvage — Notes de terrain</title>
    <link>${SITE}/blog</link>
    <description>Réécritures, profils de performance et décisions qu'il a fallu défaire.</description>
    <language>fr-FR</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
