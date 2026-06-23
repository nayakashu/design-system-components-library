// Primitive tokens: raw values with no meaning attached.
// Consumers never reference these directly. The role layer maps them to intent.
// Changing a primitive is a breaking change only if a role rebinds; the role
// layer is the public contract, the primitive layer is an implementation detail.

export const primitive = {
  color: {
    white: "#ffffff",
    black: "#0b0d10",
    slate50: "#f7f8fa",
    slate100: "#eceef2",
    slate200: "#d9dde4",
    slate400: "#9aa2af",
    slate600: "#5b6472",
    slate800: "#2b313b",
    slate900: "#161a20",
    blue400: "#6aa3ff",
    blue500: "#3b82f6",
    blue600: "#2563eb",
    red500: "#ef4444",
    red600: "#dc2626",
    green500: "#22c55e",
    amber500: "#f59e0b",
  },
  space: {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2.5rem",
  },
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "999px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    base: 1.5,
  },
  duration: {
    fast: "120ms",
    base: "200ms",
  },
} as const;

export type Primitive = typeof primitive;
