import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
  stories: ["../app/**/*.stories.@(ts|mdx)"],
};

export default config;
