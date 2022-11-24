import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "dnzwr8",
  taskTimeout: 10000,
  requestTimeout: 10000,
  env: {
    "host" : "http://172.17.0.1:5555"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
