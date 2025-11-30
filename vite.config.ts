import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: {
          "": "nutri-helper",
          zh: "Nutri Helper",
          en: "Nutri Helper",
        },
        description: "Enhance nutrimatic.org",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://nutrimatic.org/*"],
        downloadURL:
          "https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js",
        updateURL:
          "https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js",
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js"),
        },
      },
    }),
  ],
});
