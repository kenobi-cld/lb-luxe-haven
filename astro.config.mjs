// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sanity({
    projectId: "atxrltcu",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-28",
  }), react()],
});