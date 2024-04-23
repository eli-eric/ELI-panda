import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:5001/api/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/types/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      },
      config: {
        withHooks: true
      }
    }
  }
}

export default config
