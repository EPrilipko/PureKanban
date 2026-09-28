import { createTheme, Textarea, TextInput, Title, rem, Tabs, Input, Loader } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  spacing: {
    '3xs': rem(4),
    '2xs': rem(8),
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32),
  },
  headings: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    Loader: Loader.extend({
      defaultProps: {
        color: 'gray',
      },
    }),
    Title: Title.extend({
      styles: (_, props) => ({
        root:
          props.variant === 'label'
            ? {
                fontWeight: 600,
                fontSize: 'var(--mantine-font-size-md)',
                lineHeight: 'var(--mantine-line-height-xl)',
              }
            : {},
      }),
    }),
    Input: Input.extend({
      vars: (theme) => ({
        wrapper: {
          '--input-radius': theme.radius.sm,
        },
      }),
    }),
    TextInput: TextInput.extend({
      styles: {
        label: {
          fontWeight: 600,
          fontSize: 'var(--mantine-font-size-md)',
          lineHeight: 'var(--mantine-line-height-xl)',
        },
      },
    }),
    Textarea: Textarea.extend({
      styles: {
        label: {
          fontWeight: 600,
          fontSize: 'var(--mantine-font-size-md)',
          lineHeight: 'var(--mantine-line-height-xl)',
        },
      },
    }),

    Tabs: Tabs.extend({
      styles: (_, props) => ({
        tab:
          props.variant === 'pills'
            ? {
                borderRadius: 'var(--mantine-radius-sm)',
                padding: '0 var(--mantine-spacing-2xs)',
                border: 0,
                fontSize: 'var(--mantine-font-size-md)',
                lineHeight: 'var(--mantine-line-height-md)',
              }
            : {},
      }),
    }),
  },
});
