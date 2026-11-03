/* eslint.config.js — lint dos módulos JS do site estático. Rode com: npm run lint (depois de npm install). */
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules", "assets"] },
  js.configs.recommended,
  { languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { ...globals.browser } } },
  { files: ["tests/**/*.js"], languageOptions: { globals: { ...globals.node } } },
];
