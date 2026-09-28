import { type FC, type ReactNode, type RefObject } from 'react';
import {
  Modal,
  Group,
  Title,
  Tabs,
  Stack,
  Button,
  Popover,
  Badge,
  Text,
  CloseButton,
  Divider,
} from '@mantine/core';
import { IconTag } from '@tabler/icons-react';

import {
  CardNameInput,
  CardDescriptionTextarea,
  CardOwnerSelect,
  CardAssigneesMultiSelect,
} from '@/features/card';
import { CreateCardCommentInput } from '@/features/card-comment';

import { TagsDropdown } from '@/features/tags';

import { useCardModal } from '../../libs';

import { CardHistoryList } from '../card-history-list';
import { CardCommentsList } from '../card-comments-list';

import styles from './card-modal.module.css';

export interface Props {
  boardId: string;
  cardId: string;
  closeModal: () => void;
}

export const CardModalVisual: FC<Props> = ({ boardId, cardId, closeModal }) => {
  const { card, tagsPopoverOpened, setTagsPopoverOpened, toggleTag } = useCardModal(
    boardId,
    cardId,
  );

  return (
    <Modal
      opened
      closeOnEscape={false}
      onClose={closeModal}
      size="xl"
      classNames={{ header: styles.header, body: styles.body }}
      title={<CardNameInput boardId={boardId} card={card} />}
    >
      <Group gap="lg" align="start">
        <div className={styles.leftSection}>
          <CardDescriptionTextarea boardId={boardId} card={card} />

          <Tabs
            mt="lg"
            variant="pills"
            defaultValue="comments"
            keepMounted={false}
            classNames={{
              tab: styles.tab,
              tabLabel: styles.tabLabel,
            }}
          >
            <Tabs.List mb="sm">
              <Title variant="label">Активность</Title>
              <Tabs.Tab value="comments">Комментарии</Tabs.Tab>
              <Tabs.Tab value="history">История изменений</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="comments">
              <Stack gap="lg">
                <CreateCardCommentInput boardId={boardId} cardId={card.id} />

                <CardCommentsList boardId={boardId} cardId={card.id} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="history">
              <CardHistoryList boardId={boardId} cardId={card.id} />
            </Tabs.Panel>
          </Tabs>
        </div>

        <div className={styles.rightSection}>
          <Stack gap="3xs">
            <Title variant="label" c="dimmed">
              Действия
            </Title>

            <CardOwnerSelect boardId={boardId} cardId={card.id} owner={card.owner} />

            <CardAssigneesMultiSelect
              boardId={boardId}
              cardId={card.id}
              assignees={card.assignees}
            />

            <Popover
              position="left"
              shadow="md"
              opened={tagsPopoverOpened}
              onChange={(opened) => setTagsPopoverOpened(opened)}
            >
              <Popover.Target>
                <MenuButton
                  label="Теги"
                  counter={card.tags.length}
                  icon={<IconTag size={16} color="gray" />}
                  onClick={() => setTagsPopoverOpened(true)}
                />
              </Popover.Target>

              <Popover.Dropdown w={400}>
                <Group justify="space-between">
                  <Title order={5}>Теги</Title>
                  <CloseButton onClick={() => setTagsPopoverOpened(false)} />
                </Group>

                <Divider mt="md" mb="md" />

                <TagsDropdown
                  boardId={card.board.id}
                  allTags={card.tags}
                  appliedTags={card.board.tags}
                  toggleTag={toggleTag}
                />
              </Popover.Dropdown>
            </Popover>
          </Stack>
        </div>
      </Group>
    </Modal>
  );
};

interface MenuButtonProps {
  counter?: number;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  ref?: RefObject<HTMLButtonElement | null>;
}

const MenuButton: FC<MenuButtonProps> = ({ counter, label, icon, ref, onClick }) => (
  <Button
    size="sm"
    variant="light"
    color="gray"
    justify="start"
    onClick={onClick}
    leftSection={icon}
    ref={ref}
    styles={{ root: { paddingRight: 7 }, label: { flex: 1 } }}
    rightSection={
      counter ? (
        <Badge circle color="gray">
          {counter}
        </Badge>
      ) : null
    }
  >
    <Text size="sm" lh="sm" c="var(--mantine-color-placeholder)">
      {label}
    </Text>
  </Button>
);
