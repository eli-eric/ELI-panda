import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "dnzwr8",
  taskTimeout: 10000,
  requestTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
