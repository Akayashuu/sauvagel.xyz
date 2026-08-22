import { posts } from "$lib/data/posts";
import { projectMeta } from "$lib/data/profile";

export const prerender = true;

const SITE = "https://sauvagel.xyz";

type Entry = { loc: string; changefreq: string; priority: string; lastmod?: string };

export function GET() {
  const entries: Entry[] = [
    { loc: `${SITE}/`, changefreq: "monthly", priority: "1.0" },
    ...projectMeta.map((project) => ({
      loc: `${SITE}/projects/${project.slug}`,
      changefreq: "monthly",
      priority: "0.8",
    })),
    { loc: `${SITE}/blog`, changefreq: "weekly", priority: "0.7" },
    ...[...posts]
      .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
      .map((post) => ({
        loc: `${SITE}/blog/${post.meta.slug}`,
        lastmod: post.meta.date,
        changefreq: "monthly",
        priority: "0.7",
      })),
    { loc: `${SITE}/privacy`, changefreq: "yearly", priority: "0.3" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
