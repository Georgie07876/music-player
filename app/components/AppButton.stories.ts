import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import AppButton from "./AppButton.vue";

const meta = { component: AppButton } satisfies Meta<typeof AppButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Play: Story = {
  args: { type: "button" },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Play</AppButton>',
  }),
};

export const Favorite: Story = {
  args: { type: "button" },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Favorite</AppButton>',
  }),
};
