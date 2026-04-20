import { projectMeta } from "$lib/data/profile";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = ({ params }) => {
  const index = projectMeta.findIndex((p) => p.slug === params.slug);
  if (index === -1) throw error(404, "Project not found");

  return { index, meta: projectMeta[index] };
};

export function entries() {
  return projectMeta.map((p) => ({ slug: p.slug }));
}
