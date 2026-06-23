import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const entry = fileURLToPath(new URL("src/index.ts", import.meta.url));

// The dts plugin generates library declaration files. It must not run during
// the Storybook build, which produces no dist/index.d.ts for api-extractor.
// The build-storybook script sets BUILD_TARGET=storybook so this gate is
// deterministic rather than relying on a Storybook-internal env var.
const isStorybook = process.env.BUILD_TARGET === "storybook";

// Library build config. Test config lives in vitest.config.ts so the two type
// surfaces stay separate.
export default defineConfig({
  plugins: [
    react(),
    ...(isStorybook
      ? []
      : [dts({ rollupTypes: true, tsconfigPath: "./tsconfig.json" })]),
  ],
  build: {
    lib: {
      entry,
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Peers stay external. The contract is that consumers bring their own
      // React and styled-components, so they are not bundled.
      external: ["react", "react-dom", "react/jsx-runtime", "styled-components"],
    },
  },
});
