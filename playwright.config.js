import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://qainterview.pythonanywhere.com/',
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Edge',
      use: { browserName: 'chromium', channel: 'msedge' },
    },
  ],
});