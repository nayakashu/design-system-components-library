import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider.tsx";
import type { ThemeName } from "../tokens/roles.ts";

export function renderWithTheme(
  ui: ReactElement,
  theme: ThemeName = "light",
  options?: Omit<RenderOptions, "wrapper">,
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
