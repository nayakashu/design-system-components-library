import type { Meta, StoryObj } from "@storybook/react";
import { useTheme } from "styled-components";

const meta: Meta = {
  title: "Foundations/Tokens",
};

export default meta;
type Story = StoryObj;

// Renders the role layer from the active theme. Switch the theme in the toolbar
// to see the same role names rebind to different primitive values.
function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: value,
          border: "1px solid rgba(127,127,127,0.4)",
          flex: "0 0 auto",
        }}
      />
      <code style={{ fontSize: 13 }}>{name}</code>
      <code style={{ fontSize: 12, opacity: 0.6 }}>{value}</code>
    </div>
  );
}

export const ColorRoles: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <div style={{ display: "grid", gap: "0.5rem", color: theme.color.text }}>
        {Object.entries(theme.color).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} />
        ))}
      </div>
    );
  },
};
