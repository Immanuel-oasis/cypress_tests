const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    specPattern: 'cypress/projects/**/*.{ts,js,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
