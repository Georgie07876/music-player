// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      title: "Open Music Player",
      htmlAttrs: { lang: "en" },
    },
  },
  routeRules: {
    "/favorites": { ssr: false },
    "/playlists": { prerender: true },
  },
  image: {
    domains: [
      "v.monophonic.digital",
      "audius-01.staked.cloud",
      "audius-02.staked.cloud",
      "audius-discovery-1.altego.net",
      "val002.open-audio-validator.com",
      "cn2.mainnet.audiusindex.org",
    ],
  },
  icon: {
    serverBundle: "local",
    clientBundle: {
      icons: [
        "mdi:play",
        "mdi:pause",
        "mdi:skip-previous",
        "mdi:skip-next",
        "mdi:volume-high",
        "mdi:volume-off",
        "mdi:heart",
        "mdi:heart-outline",
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/storybook",
    "@nuxt/image",
  ],
  runtimeConfig: {
    audiusKey: "",
    audiusSecret: "",
  },
});
