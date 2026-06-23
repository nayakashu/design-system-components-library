import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "./ThemeProvider.tsx";
import { lightTheme, type RoleTokens } from "../tokens/roles.ts";
import { Button } from "../components/Button.tsx";
import { TextField } from "../components/TextField.tsx";
import { Badge } from "../components/Badge.tsx";
import { Icon } from "../icons/Icon.tsx";

const meta: Meta = {
  title: "Foundations/Theming",
};

export default meta;
type Story = StoryObj;

// The roles a consumer is most likely to brand. Editing one rebinds every
// component that references it, with no change to component code.
const editableRoles: Array<{ key: keyof RoleTokens["color"]; label: string }> = [
  { key: "accent", label: "accent" },
  { key: "accentHover", label: "accentHover" },
  { key: "accentText", label: "accentText" },
  { key: "background", label: "background" },
  { key: "surface", label: "surface" },
  { key: "surfaceRaised", label: "surfaceRaised" },
  { key: "text", label: "text" },
  { key: "border", label: "border" },
  { key: "danger", label: "danger" },
];

// A live theme builder. The left column edits role values. The right column
// renders real components under a custom RoleTokens object built from those
// edits. Nothing in the component code changes; only the binding does.
export const ThemeBuilder: Story = {
  render: () => {
    const [colors, setColors] = useState<RoleTokens["color"]>(lightTheme.color);
    const customTheme: RoleTokens = { ...lightTheme, color: colors };

    return (
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1.5rem" }}>
        <div style={{ display: "grid", gap: "0.5rem", alignContent: "start" }}>
          <strong style={{ fontSize: 13 }}>Edit role tokens</strong>
          {editableRoles.map(({ key, label }) => (
            <label
              key={key}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 12 }}
            >
              <input
                type="color"
                value={colors[key]}
                onChange={(e) =>
                  setColors((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
              <code>color.{label}</code>
            </label>
          ))}
          <button
            type="button"
            onClick={() => setColors(lightTheme.color)}
            style={{ marginTop: "0.5rem", fontSize: 12 }}
          >
            Reset to light
          </button>
        </div>

        <ThemeProvider theme={customTheme}>
          <div
            style={{
              background: customTheme.color.background,
              color: customTheme.color.text,
              border: `1px solid ${customTheme.color.border}`,
              borderRadius: 12,
              padding: "1.5rem",
              display: "grid",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <TextField label="Email" hint="Rebinds with the theme." />
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Badge tone="accent">Beta</Badge>
              <Badge tone="success">Stable</Badge>
              <Badge tone="danger">Breaking</Badge>
              <Icon name="info" title="Info" />
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  },
};
