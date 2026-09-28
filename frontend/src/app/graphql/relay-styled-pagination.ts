import { type FieldPolicy } from '@apollo/client';
import { relayStylePagination as apolloPolicy } from '@apollo/client/utilities';

export function relayStyledPagination(): FieldPolicy {
  const basePolicy = apolloPolicy(false);

  return {
    keyArgs: (args) => {
      if (!args) return false;
      const { first: _, after: __, ...rest } = args.input!;
      return JSON.stringify(rest);
    },

    read(existing, options) {
      return basePolicy.read!(existing, { ...options, args: options.args!.input });
    },

    merge(existing, incoming, options) {
      return (basePolicy.merge as CallableFunction)!(existing, incoming, {
        ...options,
        args: options.args!.input,
      });
    },
  };
}
