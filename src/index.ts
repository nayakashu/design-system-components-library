// Public entry point. This barrel is the versioned library-to-consumer contract.
// Anything exported here is part of the 1.x surface. Internal modules stay out.

export { primitive } from "./tokens/primitives.ts";
export type { Primitive } from "./tokens/primitives.ts";

export {
  lightTheme,
  darkTheme,
  themes,
} from "./tokens/roles.ts";
export type { RoleTokens, ThemeName } from "./tokens/roles.ts";

export { ThemeProvider } from "./theme/ThemeProvider.tsx";
export type { ThemeProviderProps } from "./theme/ThemeProvider.tsx";

export { Button } from "./components/Button.tsx";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button.tsx";

export { TextField } from "./components/TextField.tsx";
export type { TextFieldProps } from "./components/TextField.tsx";

export { Badge } from "./components/Badge.tsx";
export type { BadgeProps, BadgeTone } from "./components/Badge.tsx";

export { Icon, iconNames } from "./icons/Icon.tsx";
export type { IconProps, IconName } from "./icons/Icon.tsx";
