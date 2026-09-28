import { type FC } from 'react';
import { TextInput } from '@mantine/core';
import { z } from 'zod';

import { CreateOrEditForm } from '@/shared/ui';

import type { TagRenderFragment } from '../model';

type Props =
  | { state: 'create'; submit: (values: Omit<TagRenderFragment, 'id'>) => Promise<void> }
  | { state: 'edit'; tag: TagRenderFragment; submit: (values: TagRenderFragment) => Promise<void> };

const schema = z.object({
  name: z.string().min(5, { message: 'Минимум 5 символов ' }),
  color: z.string().min(1, { message: 'Выберите цвет' }),
});
type TSchema = typeof schema;

export const TagForm: FC<Props> = (props) => {
  const handleSubmit = async (values: z.infer<TSchema>) => {
    const submitValues = {
      name: values.name,
      color: values.color,
    };

    if (props.state === 'edit') {
      await props.submit({
        id: props.tag.id,
        ...submitValues,
      });
    } else {
      await props.submit(submitValues);
    }
  };

  return (
    <CreateOrEditForm
      state={props.state}
      schema={schema}
      submit={handleSubmit}
      initialValues={
        props.state === 'edit'
          ? {
              name: props.tag.name,
              color: props.tag.color,
            }
          : {
              name: '',
              color: '',
            }
      }
    >
      {(form) => (
        <>
          <TextInput
            withAsterisk
            label="Название тега"
            placeholder="Новый тег"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <CreateOrEditForm.ColorPicker<TSchema>
            required
            form={form}
            label="Цвет тега"
            path="color"
          />
        </>
      )}
    </CreateOrEditForm>
  );
};
