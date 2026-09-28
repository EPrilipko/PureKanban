import { type ReactNode, useState } from 'react';
import { z, ZodObject } from 'zod';
import { Button } from '@mantine/core';
import { useForm, schemaResolver, type UseFormReturnType } from '@mantine/form';

interface Props<S extends ZodObject> {
  state: 'create' | 'edit';
  schema: S;
  initialValues: z.infer<S>;
  submit: (values: z.infer<S>) => Promise<void>;
  children: (form: UseFormReturnType<z.infer<S>>) => ReactNode;
}

export const CreateOrEditForm = <S extends ZodObject>({
  state,
  schema,
  submit,
  initialValues,
  children,
}: Props<S>) => {
  type FormValues = z.infer<S>;

  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: schemaResolver(schema),
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmiting(true);

    await submit(values);

    setIsSubmiting(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {children(form)}

      <Button mt="md" w="100%" h={40} loading={isSubmiting} type="submit">
        {state === 'create' ? 'Создать' : 'Обновить'}
      </Button>
    </form>
  );
};
