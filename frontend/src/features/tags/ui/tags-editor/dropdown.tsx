import { useMemo, type FC } from 'react';
import {
  Stack,
  Button,
  Flex,
  isLightColor,
  darken,
  Text,
  Menu,
  ActionIcon,
  type MantineColor,
  Checkbox,
} from '@mantine/core';
import { IconDots, IconTrash, IconEdit } from '@tabler/icons-react';

import { useUser } from '@/entities/session';
import { type TagIdFragment, type TagRenderFragment } from '@/entities/tag';

import { useBehavior } from '../../libs';

interface Props {
  boardId: string;
  allTags: TagIdFragment[];
  appliedTags: TagRenderFragment[];
  toggleTag: (tagId: string) => Promise<void>;
}

export const TagsDropdown: FC<Props> = ({ boardId, allTags, appliedTags, toggleTag }) => {
  const { canEditBoard } = useUser();
  const canEditTags = canEditBoard(boardId);

  const { openCreateTagModal, openEditTagModal, openDeleteTagModal } = useBehavior(
    boardId,
    toggleTag,
  );

  return (
    <>
      <Stack gap="sm">
        {appliedTags.map((tag) => (
          <Tag
            canEdit={canEditTags}
            key={tag.id}
            tag={tag}
            allTags={allTags}
            openEditTagModal={openEditTagModal}
            openDeleteTagModal={openDeleteTagModal}
            toggleTag={toggleTag}
          />
        ))}
      </Stack>

      {canEditTags && (
        <Button mt="lg" w="100%" onClick={openCreateTagModal}>
          Создать новый тег
        </Button>
      )}
    </>
  );
};

interface TagProps {
  canEdit: boolean;
  tag: TagRenderFragment;
  allTags: TagIdFragment[];
  openEditTagModal: (tag: TagRenderFragment) => void;
  openDeleteTagModal: (tagId: string) => void;
  toggleTag: (tagId: string) => Promise<void>;
}

const Tag: FC<TagProps> = ({
  canEdit,
  tag,
  allTags,
  openEditTagModal,
  openDeleteTagModal,
  toggleTag,
}) => {
  const tagIsActive = allTags.some((t) => t.id === tag.id);

  const actionIconBg = useMemo(() => darken(tag.color, 0.6), [tag.color]);

  const textColor = useMemo(
    () => (isLightColor(tag.color) ? 'black' : 'white') as MantineColor,
    [tag.color],
  );

  const toggleTagHandler = () => {
    toggleTag(tag.id);
  };

  return (
    <Flex gap="md" justify="space-between" align="center">
      {canEdit && <Checkbox checked={tagIsActive} onChange={toggleTagHandler} />}

      <Flex bdrs="md" bg={tag.color} p="3xs" flex={1} justify="space-between">
        <Text c={textColor}>{tag.name}</Text>

        {canEdit && (
          <Menu
            withinPortal
            withOverlay
            overlayProps={{ opacity: 0.3 }}
            position="bottom-end"
            shadow="sm"
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color={actionIconBg}>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown onMouseDown={(e) => e.stopPropagation()}>
              <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => openEditTagModal(tag)}>
                Редактировать тег
              </Menu.Item>

              <Menu.Item
                leftSection={<IconTrash size={14} />}
                onClick={() => openDeleteTagModal(tag.id)}
              >
                Удалить тег
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};
