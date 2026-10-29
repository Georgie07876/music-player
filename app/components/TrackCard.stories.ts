import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import TrackCard from "./TrackCard.vue";
import type { Track } from "#shared/types/track";
import { fn } from "storybook/test";

const track: Track = {
  id: "1",
  title: "Midnight Frequencies",
  artist: "Nova Line",
  duration: 214,
};

const meta = {
  component: TrackCard,
  args: { track, onPlay: fn(), onFavorite: fn() },
} satisfies Meta<typeof TrackCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isFavorite: false } };
export const Favorite: Story = { args: { isFavorite: true } };
