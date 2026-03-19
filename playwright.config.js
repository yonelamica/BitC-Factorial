const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    screenshot: 'only-on-failure',
  },
});