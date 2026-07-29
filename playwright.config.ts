import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:4321",
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: "npm run preview -- --port 4321",
    port: 4321,
    timeout: 30000,
    reuseExistingServer: !process.env.CI,
  },
});
