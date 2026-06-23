import type { Meta, StoryObj } from "@storybook/react";
import { useTheme } from "styled-components";
import { primitive } from "./primitives.ts";
import { lightTheme, darkTheme } from "./roles.ts";

const meta: Meta = {
  title: "Foundations/Color palette",
};

export default meta;
type Story = StoryObj;

function Chip({
  name,
  value,
  textColor,
  borderColor,
}: {
  name: string;
  value: string;
  textColor: string;
  borderColor: string;
}) {
  return (
    <div
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        overflow: "hidden",
        fontSize: 12,
      }}
    >
      <div style={{ background: value, height: 56 }} />
      <div style={{ padding: "0.4rem 0.5rem", color: textColor }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <code style={{ opacity: 0.7 }}>{value}</code>
      </div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "0.75rem",
      }}
    >
      {children}
    </div>
  );
}

// The primitive palette: raw values with no meaning attached. Consumers never
// reference these directly. They exist to be bound by the role layer.
export const Primitives: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <div style={{ color: theme.color.text }}>
        <p style={{ maxWidth: "44rem", color: theme.color.textMuted }}>
          Primitive color tokens. Raw values with no meaning attached. The role
          layer binds these to intent. This palette is the same in every theme.
        </p>
        <Grid>
          {Object.entries(primitive.color).map(([name, value]) => (
            <Chip
              key={name}
              name={name}
              value={value}
              textColor={theme.color.text}
              borderColor={theme.color.border}
            />
          ))}
        </Grid>
      </div>
    );
  },
};

// The role palette side by side. The same role names resolve to different
// primitives under each theme. This is the contract a component depends on.
export const RolesByTheme: Story = {
  render: () => {
    const theme = useTheme();
    const roles = Object.keys(lightTheme.color) as Array<keyof typeof lightTheme.color>;
    return (
      <div style={{ color: theme.color.text, overflowX: "auto" }}>
        <p style={{ maxWidth: "44rem", color: theme.color.textMuted }}>
          Role tokens resolved under each theme. Component code references the
          role name on the left, and the theme decides the value.
        </p>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: theme.color.textMuted }}>
              <th style={{ padding: "0.4rem 0.75rem" }}>Role</th>
              <th style={{ padding: "0.4rem 0.75rem" }}>Light</th>
              <th style={{ padding: "0.4rem 0.75rem" }}>Dark</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role} style={{ borderTop: `1px solid ${theme.color.border}` }}>
                <td style={{ padding: "0.4rem 0.75rem" }}>
                  <code>color.{role}</code>
                </td>
                <td style={{ padding: "0.4rem 0.75rem" }}>
                  <Cell value={lightTheme.color[role]} border={theme.color.border} />
                </td>
                <td style={{ padding: "0.4rem 0.75rem" }}>
                  <Cell value={darkTheme.color[role]} border={theme.color.border} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

function Cell({ value, border }: { value: string; border: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          background: value,
          border: `1px solid ${border}`,
        }}
      />
      <code style={{ opacity: 0.75 }}>{value}</code>
    </span>
  );
}
