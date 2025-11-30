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
        name: "Nutri Helper",
        author: "KoolShow, Northsea_403",
        description: "Enhance nutrimatic.org",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://nutrimatic.org/*"],
        downloadURL:
          "https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js",
        updateURL:
          "https://github.com/KoolShow/nutri-helper-vue/releases/download/latest/nutri-helper.user.js",
        homepageURL: "https://github.com/KoolShow/nutri-helper-vue/",
        supportURL: "https://github.com/KoolShow/nutri-helper-vue/issues",
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js"),
        },
      },
    }),
  ],
});
