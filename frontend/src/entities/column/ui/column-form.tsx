import { type FC } from 'react';
import { z } from 'zod';
import { TextInput } from '@mantine/core';

import type { ColumnRenderFragment } from '../model';

import { CreateOrEditForm } from '@/shared/ui';

type Props =
  | { state: 'create'; submit: (values: Omit<ColumnRenderFragment, 'id'>) => Promise<void> }
  | {
      state: 'edit';
      column: ColumnRenderFragment;
      submit: (values: ColumnRenderFragment) => Promise<void>;
    };

const schema = z.object({
  name: z.string().min(5, { message: 'Минимум 5 символов ' }),
  color: z.string().min(1, { message: 'Выберите цвет' }),
  maxCardsCount: z.number().min(1, { message: 'Минимум 1 колонка' }).nullable(),
  enableMaxCardsCount: z.boolean(),
});
type TSchema = typeof schema;

export const ColumnFormVisual: FC<Props> = (props) => {
  const handleSubmit = async (values: z.infer<TSchema>) => {
    const submitValues = {
      name: values.name,
      color: values.color,
      maxCardsCount: values.enableMaxCardsCount ? values.maxCardsCount : null,
    };

    if (props.state === 'edit') {
      await props.submit({
        id: props.column.id,
        ...submitValues,
      });
    } else {
      await props.submit(submitValues);
    }
  };

  return (
    <CreateOrEditForm<TSchema>
      state={props.state}
      schema={schema}
      initialValues={
        props.state === 'edit'
          ? {
              name: props.column.name,
              color: props.column.color,
              maxCardsCount: props.column.maxCardsCount || null,
              enableMaxCardsCount: !!props.column.maxCardsCount,
            }
          : {
              name: '',
              color: '',
              maxCardsCount: null,
              enableMaxCardsCount: false,
            }
      }
      submit={handleSubmit}
    >
      {(form) => (
        <>
          <TextInput
            withAsterisk
            label="Название доски"
            placeholder="Новая доска"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <CreateOrEditForm.ColorPicker<TSchema>
            required
            form={form}
            path="color"
            label="Цвет колонки"
          />

          <CreateOrEditForm.OptionalNumber<TSchema>
            form={form}
            label="Максимум карточек"
            numberPath="maxCardsCount"
            togglePath="enableMaxCardsCount"
          />
        </>
      )}
    </CreateOrEditForm>
  );
};
