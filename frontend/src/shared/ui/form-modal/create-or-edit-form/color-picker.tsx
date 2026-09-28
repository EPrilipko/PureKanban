import { z, ZodObject } from 'zod';
import { Group, ColorSwatch, Overlay, InputLabel, InputError } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { type UseFormReturnType } from '@mantine/form';

interface Props<S extends ZodObject> {
  form: UseFormReturnType<z.infer<S>>;
  path: Extract<keyof z.infer<S>, string>;
  label?: string;
  required?: boolean;
}

const COLORS = [
  '#FAFAFA',
  '#F6F0F0',
  '#F6F2F0',
  '#F6F5F0',
  '#EDF6F1',
  '#EDF2F6',
  '#F2E5FD',
  '#DADADA',
  '#F4B9B2',
  '#F5D1B5',
  '#ECE9DA',
  '#CEE1D7',
  '#BFE1FC',
  '#DBC2FB',
];

export const ColorPicker = <S extends ZodObject>({ form, path, label, required }: Props<S>) => (
  <>
    {label && (
      <InputLabel required={required} mt="md">
        Цвет колонки
      </InputLabel>
    )}

    <Group gap="xs" mb="xs">
      {COLORS.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          radius={4}
          style={{ cursor: 'pointer', width: 40, height: 40 }}
          onClick={() => form.setValues({ [path]: color } as Partial<z.infer<S>>)}
          withShadow={false}
        >
          {form.values[path] === color && (
            <>
              <IconCheck size={12} color="white" style={{ position: 'relative', zIndex: 201 }} />
              <Overlay opacity={0.2} radius={4} />
            </>
          )}
        </ColorSwatch>
      ))}
    </Group>
    {form.errors[path] && <InputError>{form.errors.color}</InputError>}
  </>
);
