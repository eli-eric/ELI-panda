import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "dnzwr8",
  taskTimeout: 100000,
  requestTimeout: 100000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
