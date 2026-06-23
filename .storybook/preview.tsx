import type { Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "../src/theme/ThemeProvider.tsx";
import type { ThemeName } from "../src/tokens/roles.ts";

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeName) ?? "light";
  const background = theme === "dark" ? "#0b0d10" : "#ffffff";
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "2rem", background, minHeight: "100vh" }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Role-token theme binding",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
