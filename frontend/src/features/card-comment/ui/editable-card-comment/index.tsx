import { type FC } from 'react';
import { ActionIcon, Menu, Textarea } from '@mantine/core';
import { IconDots, IconSend } from '@tabler/icons-react';

import { CardComment, type CardCommentRenderFragment } from '@/entities/card-comment';

import { useEditableCardComment } from '../../libs';

import styles from './editable-card-comment.module.css';

interface Props {
  boardId: string;
  comment: CardCommentRenderFragment;
}

export const EditableCardComment: FC<Props> = ({ boardId, comment }) => {
  const { state, setState, deleteComment, updateComment } = useEditableCardComment(
    boardId,
    comment,
  );

  return (
    <div className={styles.root}>
      <CardComment
        comment={comment}
        slots={{
          content: state.type === 'update' && (
            <Textarea
              minRows={1}
              maxRows={5}
              value={state.text}
              onChange={(event) => setState({ type: 'update', text: event.target.value })}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setState({ type: 'default' });
                }
              }}
            />
          ),
          actions:
            state.type === 'default' ? (
              <Menu>
                <Menu.Target>
                  <ActionIcon className={styles.menuIcon} color="gray">
                    <IconDots size={14} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item onClick={() => setState({ type: 'update', text: comment.text })}>
                    Редактировать
                  </Menu.Item>
                  <Menu.Item onClick={deleteComment}>Удалить</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <ActionIcon color="gray" onClick={updateComment}>
                <IconSend size={14} />
              </ActionIcon>
            ),
        }}
      />
    </div>
  );
};
