import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * - Vercel: always `base: "/"` (served at domain root). Ignores stray `VITE_BASE_PATH`
 *   if it was set for GitHub Pages by mistake.
 * - Local / other hosts: default `/`, or set `VITE_BASE_PATH` (e.g. `/Aurora/` for GitHub Pages CI).
 */
const base = process.env.VERCEL ? "/" : (process.env.VITE_BASE_PATH ?? "/");

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
    open: true,
  },
});
