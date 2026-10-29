// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
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
    "/api/trending": { swr: 60 },
    "/api/search": { swr: 60 },
    "/api/tracks/**": { swr: 300 },
  },
  image: {
    domains: [
      "v.monophonic.digital",
      "audius-01.staked.cloud",
      "audius-02.staked.cloud",
      "audius-03.staked.cloud",
      "audius-04.staked.cloud",
      "audius-discovery-1.altego.net",
      "audius-discovery-3.altego.net",
      "cn2.mainnet.audiusindex.org",
      "cn3.mainnet.audiusindex.org",
    ],
    ipx: {
      http: {
        maxAge: 2592000,
        ignoreCacheControl: true,
      },
    },
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
