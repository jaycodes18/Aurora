import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages URL uses the repo slug (currently Aurora): https://jaycodes18.github.io/Aurora/
export default defineConfig({
  plugins: [react()],
  base: "/Aurora/",
  server: {
    port: 3000,
    open: "/Aurora/",
  },
});
