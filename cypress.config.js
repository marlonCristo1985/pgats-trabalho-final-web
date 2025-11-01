const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'PGATS Relatório de Testes',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    saveAllAttempts: false,
    reportDir: 'cypress/reports/html', // pasta onde ficará o HTML
  },
    e2e: {
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
        // implement node event listeners here
      },
    },
  });
