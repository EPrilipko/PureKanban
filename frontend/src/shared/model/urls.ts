const isDev = import.meta.env.DEV;

export const graphqlUrl = isDev ? '/graphql' : import.meta.env.VITE_GRAPHQL_URL;
export const wsUrl = isDev ? '/ws' : import.meta.env.VITE_GRAPHQL_WS_URL;
