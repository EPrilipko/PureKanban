import { z, ZodObject } from 'zod';
import { Group, Checkbox, NumberInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';

type InKeyof<S extends ZodObject> = Extract<keyof z.infer<S>, string>;

interface Props<S extends ZodObject> {
  form: UseFormReturnType<z.infer<S>>;
  numberPath: InKeyof<S>;
  togglePath: InKeyof<S>;
  label?: string;
  defaultNumber?: number;
}

export const OptionalNumber = <S extends ZodObject>({
  form,
  numberPath,
  togglePath,
  label,
  defaultNumber = 5,
}: Props<S>) => (
  <>
    <Group gap="sm" mt="md">
      <Checkbox
        label={label}
        checked={!!form.values[togglePath]}
        onChange={(event) => {
          const checked = event.target.checked;

          form.setValues({
            [togglePath]: checked,
            [numberPath]: checked ? defaultNumber : form.values[numberPath],
          } as Partial<z.infer<S>>);
        }}
      />

      <NumberInput
        w={150}
        min={1}
        disabled={!form.values.enableMaxCardsCount}
        placeholder={`${defaultNumber}`}
        key={form.key(numberPath)}
        {...form.getInputProps(numberPath)}
      />
    </Group>{' '}
  </>
);
