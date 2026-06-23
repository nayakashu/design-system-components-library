import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useTheme } from "styled-components";
import { Icon, iconNames, type IconName } from "./Icon.tsx";

const meta: Meta<typeof Icon> = {
  title: "Foundations/Icons",
  component: Icon,
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: { type: "range", min: 12, max: 64, step: 2 } },
  },
  args: { name: "check", size: 24 },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// One card in the gallery. A copy-code button reveals on hover and on keyboard
// focus, so the snippet is reachable by pointer and by keyboard alike.
function IconCard({ name, size }: { name: IconName; size: number }) {
  const theme = useTheme();
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const snippet = `<Icon name="${name}" />`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
      onFocus={() => setShown(true)}
      onBlur={() => setShown(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        border: `1px solid ${theme.color.border}`,
        borderRadius: theme.radius.md,
      }}
    >
      <Icon name={name} size={size} />
      <code style={{ fontSize: 11, color: theme.color.textMuted }}>{name}</code>

      <button
        type="button"
        onClick={copy}
        aria-label={`Copy code for ${name} icon`}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.15rem 0.4rem",
          fontSize: 10,
          fontFamily: "ui-monospace, monospace",
          color: copied ? theme.color.accentText : theme.color.text,
          background: copied ? theme.color.accent : theme.color.surfaceRaised,
          border: `1px solid ${copied ? theme.color.accent : theme.color.border}`,
          borderRadius: theme.radius.sm,
          cursor: "pointer",
          opacity: shown || copied ? 1 : 0,
          transition: `opacity ${theme.duration.fast} ease`,
        }}
      >
        <Icon name={copied ? "check" : "external-link"} size={11} />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

// The full set. Icons inherit the surrounding text color through currentColor,
// so the gallery reads correctly in either theme. Each card reveals a copy-code
// button on hover or focus that copies the JSX usage to the clipboard.
export const Gallery: Story = {
  render: (args) => {
    const theme = useTheme();
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: "0.75rem",
          color: theme.color.text,
        }}
      >
        {iconNames.map((name: IconName) => (
          <IconCard key={name} name={name} size={args.size ?? 24} />
        ))}
      </div>
    );
  },
};
