// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
  },
  integrations: [preact(), tailwind()],
  vite: {
    server: {
      proxy: {
        "/counter": "http://localhost:3000",
      },
    },
  },
});
