import { posts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = ({ params }) => {
  const index = posts.findIndex((p) => p.meta.slug === params.slug);
  if (index === -1) throw error(404, "Post not found");

  return { index, meta: posts[index].meta };
};

export function entries() {
  return posts.map((p) => ({ slug: p.meta.slug }));
}
