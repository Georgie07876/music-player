// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
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
  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/icon", "@nuxtjs/storybook"],
  runtimeConfig: {
    audiusKey: "",
    audiusSecret: "",
  },
});
