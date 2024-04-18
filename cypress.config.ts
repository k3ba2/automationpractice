import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'http://www.automationpractice.pl',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
