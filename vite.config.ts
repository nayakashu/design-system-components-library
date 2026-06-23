import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const entry = fileURLToPath(new URL("src/index.ts", import.meta.url));

// Library build config. Test config lives in vitest.config.ts so the two type
// surfaces stay separate.
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.json" }),
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
