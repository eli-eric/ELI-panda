import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "dnzwr8",
  taskTimeout: 20000,
  requestTimeout: 20000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
