import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
import globals from "globals";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      "svelte/no-navigation-without-resolve": "off",
      "svelte/no-dom-manipulating": "off",
      "svelte/prefer-svelte-reactivity": "off",
      "svelte/no-at-html-tags": "off",
    },
  },
  { ignores: [".svelte-kit/", "build/", "node_modules/"] },
];
