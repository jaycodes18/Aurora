import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * - Vercel / local dev: base "/" (default)
 * - GitHub Pages project site: set VITE_BASE_PATH=/Aurora/ in CI (see .github/workflows/deploy.yml)
 */
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
    open: true,
  },
});
