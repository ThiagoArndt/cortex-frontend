import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
    },
    plugins: [react()],
    test: {
      globals: true, // Allows using Jest-like global methods (like describe, test, etc.)
      environment: "jsdom", // Simulates a browser environment
      setupFiles: "./src/__tests__/setup.ts", // Optional: Path to setup file (see below)
      exclude: [...configDefaults.exclude, "e2e/*"],
    },
  };
});
