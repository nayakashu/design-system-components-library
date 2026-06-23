import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge.tsx";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Stable" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "success", "danger", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { tone: "neutral", children: "Neutral" } };
export const Accent: Story = { args: { tone: "accent", children: "Beta" } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="success">Stable</Badge>
      <Badge tone="warning">Deprecated</Badge>
      <Badge tone="danger">Breaking</Badge>
    </div>
  ),
};
