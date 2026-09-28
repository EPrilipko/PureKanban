import { type FC } from 'react';
import { z } from 'zod';
import { TextInput } from '@mantine/core';

import type { BoardRenderFragment } from '../model';

import { CreateOrEditForm } from '@/shared/ui';

type Props =
  | { state: 'create'; submit: (values: Omit<BoardRenderFragment, 'id'>) => Promise<void> }
  | {
      state: 'edit';
      board: BoardRenderFragment;
      submit: (values: BoardRenderFragment) => Promise<void>;
    };

const schema = z.object({
  name: z.string().min(5, { message: 'Минимум 5 символов ' }),
  color: z.string().min(1, { message: 'Выберите цвет' }),
});
type TSchema = typeof schema;

export const BoardForm: FC<Props> = (props) => {
  const handleSubmit = async (values: z.infer<TSchema>) => {
    const submitValues = {
      name: values.name,
      color: values.color,
    };

    if (props.state === 'edit') {
      await props.submit({
        id: props.board.id,
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
              name: props.board.name,
              color: props.board.color,
            }
          : {
              name: '',
              color: '',
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
            label="Цвет доски"
          />
        </>
      )}
    </CreateOrEditForm>
  );
};
