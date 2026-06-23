import { ThemeProvider as StyledThemeProvider } from "styled-components";
import type { ReactNode } from "react";
import { themes, type ThemeName, type RoleTokens } from "../tokens/roles.ts";

export interface ThemeProviderProps {
  theme?: ThemeName | RoleTokens;
  children: ReactNode;
}

// Accepts a named built-in theme or a fully custom RoleTokens object.
// Consumers theme the whole tree by binding role tokens once at the root.
export function ThemeProvider({ theme = "light", children }: ThemeProviderProps) {
  const resolved: RoleTokens = typeof theme === "string" ? themes[theme] : theme;
  return <StyledThemeProvider theme={resolved}>{children}</StyledThemeProvider>;
}
