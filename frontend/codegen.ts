import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlUrl = process.env.VITE_GRAPHQL_URL;
if (!graphqlUrl) {
  throw new Error(`Missing GRAPHQL_URL env variable`);
}

const config: CodegenConfig = {
  overwrite: true,
  schema: graphqlUrl,
  documents: ['src/**/*api.ts'],
  config: {
    useTypeImports: true,
  },
  generates: {
    'generated/': {
      preset: 'client',
      plugins: ['fragment-matcher'],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
