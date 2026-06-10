import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Inline le CSS (≈16 Ko gzip) dans le <head> au lieu de 2 <link> bloquants :
    // supprime 2 allers-retours réseau du chemin critique → FCP/LCP plus tôt sur
    // mobile (slow-4G). Site mono-page prérendu : le surcoût HTML est négligeable.
    inlineStyleThreshold: 102400,
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: true,
    }),
  },
};

export default config;
