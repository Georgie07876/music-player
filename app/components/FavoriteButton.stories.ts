import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import FavoriteButton from "./FavoriteButton.vue";
import { fn } from "storybook/test";

const meta = { component: FavoriteButton } satisfies Meta<
  typeof FavoriteButton
>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NotFavorite: Story = {
  args: { isFavorite: false, onToggle: fn() },
};
export const InFavorites: Story = {
  args: { isFavorite: true, onToggle: fn() },
};
