import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField.tsx";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  args: { label: "Email", placeholder: "you@example.com" },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We never share your address." } };
export const WithError: Story = { args: { error: "Enter a valid email address." } };
export const Disabled: Story = { args: { disabled: true, value: "locked@example.com" } };
