import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UserAvatar from "./UserAvatar.vue";

const meta = { component: UserAvatar } satisfies Meta<typeof UserAvatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { initials: "NL" } };
export const LongInitials: Story = { args: { initials: "ABC" } };
