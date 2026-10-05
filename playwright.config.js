import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:5174", trace: "retain-on-failure" },
  webServer: [
    {
      command:
        "node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5174 --strictPort",
      url: "http://127.0.0.1:5174",
      env: {
        VITE_EMAILJS_SERVICE_ID: "test-service",
        VITE_EMAILJS_TEMPLATE_ID: "test-template",
        VITE_EMAILJS_PUBLIC_KEY: "test-key",
      },
    },
    {
      command:
        "node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5175 --strictPort",
      url: "http://127.0.0.1:5175",
      env: {
        VITE_EMAILJS_SERVICE_ID: "",
        VITE_EMAILJS_TEMPLATE_ID: "",
        VITE_EMAILJS_PUBLIC_KEY: "",
      },
    },
  ],
});
