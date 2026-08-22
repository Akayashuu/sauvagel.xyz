import adapter from "@sveltejs/adapter-static";

const config = {
  kit: {
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
