import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    spacing: Record<'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {}), string>;
  }

  export interface TitleProps {
    variant?: 'label' | (string & {});
  }

  export interface SelectProps {
    variant?: 'default' | 'filled' | 'unstyled' | 'pointer-filled';
  }
}
