import { useMutation } from '@apollo/client/react';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

import {
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  type TagRenderFragment,
  TagForm,
} from '@/entities/tag';

const CREATE_TAG_MODAL_ID = 'create-tag-modal';
const UPDATE_TAG_MODAL_ID = 'update-tag-modal';
const modalZIndex = 'calc(var(--mantine-z-index-popover) + 1)';

export const useBehavior = (boardId: string, toggleTag: (tagId: string) => Promise<void>) => {
  const [createTagMutation] = useMutation(CREATE_TAG);
  const [updateTagMutation] = useMutation(UPDATE_TAG);
  const [deleteTagMutation] = useMutation(DELETE_TAG);

  const openCreateTagModal = () =>
    modals.open({
      modalId: CREATE_TAG_MODAL_ID,
      title: 'Создать тег',
      onMouseDown: (e) => e.stopPropagation(),
      children: <TagForm state="create" submit={createTag} />,
      style: { zIndex: modalZIndex, position: 'absolute' },
    });

  const openEditTagModal = (tag: TagRenderFragment) =>
    modals.open({
      modalId: UPDATE_TAG_MODAL_ID,
      title: 'Редактировать тег',
      onMouseDown: (e) => e.stopPropagation(),
      children: <TagForm state="edit" tag={tag} submit={updateTag} />,
      style: { zIndex: modalZIndex, position: 'absolute' },
    });

  const openDeleteTagModal = (tagId: string) => {
    modals.openConfirmModal({
      title: 'Вы хотите удалить тег?',
      children: (
        <Text size="sm">Тег будуте недоступен для всех карточек доски. Вы в этом уверены?</Text>
      ),
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      onMouseDown: (e) => e.stopPropagation(),
      onConfirm: () => deleteTag(tagId),
      style: { zIndex: modalZIndex, position: 'absolute' },
    });
  };

  const createTag = async (input: Omit<TagRenderFragment, 'id'>) => {
    const createResult = await createTagMutation({
      variables: {
        input: {
          ...input,
          boardId,
        },
      },
    });
    const createdTag = createResult.data?.createTag;

    if (createdTag) {
      await toggleTag(createResult.data!.createTag.id);
    }

    modals.close(CREATE_TAG_MODAL_ID);
  };

  const updateTag = async (input: TagRenderFragment) => {
    await updateTagMutation({
      variables: {
        input: {
          boardId,
          ...input,
        },
      },
    });
    modals.close(UPDATE_TAG_MODAL_ID);
  };

  const deleteTag = async (id: string) => {
    await deleteTagMutation({
      variables: { boardId, id },
      update: (cache, result) => {
        const deletedTag = result.data?.deleteTag;

        if (deletedTag) {
          cache.evict({ id: cache.identify(deletedTag) });
          cache.gc();
        }
      },
    });
  };

  return {
    openCreateTagModal,
    openEditTagModal,
    openDeleteTagModal,
  };
};
