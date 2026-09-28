import { type FC } from 'react';
import { Modal, Group, Stack, Skeleton, Tabs } from '@mantine/core'; // или '@mantine/core' в зависимости от версии
import styles from './card-modal.module.css'; // Используем те же стили для сохранения сеток

interface SkeletonProps {
  closeModal: () => void;
}

export const CardModalSkeleton: FC<SkeletonProps> = ({ closeModal }) => {
  return (
    <Modal
      opened
      onClose={closeModal}
      size="xl"
      classNames={{ header: styles.header, body: styles.body }}
      title={<Skeleton height={28} width="60%" radius="sm" />} // Скелетон для CardNameInput
      aria-busy="true"
      aria-live="polite"
    >
      <Group gap="lg" align="start">
        {/* ЛЕВАЯ СЕКЦИЯ */}
        <div className={styles.leftSection}>
          {/* Скелетон для CardDescriptionTextarea */}
          <Stack gap="xs">
            <Skeleton height={14} width={60} radius="xs" /> {/* Лейбл "Описание" */}
            <Skeleton height={60} radius="sm" /> {/* Поле ввода */}
          </Stack>

          {/* Скелетон для Табов и Активности */}
          <Tabs mt="lg" variant="pills" defaultValue="comments" classNames={{ tab: styles.tab }}>
            <Tabs.List mb="sm">
              <Skeleton height={20} width={80} mr="xl" radius="xs" /> {/* Заголовок "Активность" */}
              <Skeleton height={32} width={110} radius="xl" mr="xs" /> {/* Таб Комментарии */}
              <Skeleton height={32} width={140} radius="xl" /> {/* Таб История */}
            </Tabs.List>

            <Tabs.Panel value="comments">
              <Stack gap="lg">
                {/* Скелетон для CreateCardCommentInput */}
                <Group gap="2xs" align="start">
                  <Skeleton height={38} circle /> {/* Аватар */}
                  <Skeleton height={38} style={{ flex: 1 }} radius="sm" /> {/* Поле ввода */}
                </Group>

                {/* Скелетон для CardCommentsList (рендерим 2 фейковых комментария для визуала) */}
                <Stack gap="md">
                  {[1, 2].map((id) => (
                    <div key={id}>
                      <Group gap="2xs" mb="xs">
                        <Skeleton height={32} circle /> {/* Аватар автора */}
                        <Skeleton height={14} width={100} radius="xs" /> {/* Имя Фамилия */}
                        <Skeleton height={12} width={120} radius="xs" /> {/* Дата */}
                      </Group>
                      {/* Текст комментария с отступом мл={40} как в оригинале */}
                      <Stack gap="5xs" style={{ paddingLeft: 40 }}>
                        <Skeleton height={14} width="90%" radius="xs" />
                        <Skeleton height={14} width="40%" radius="xs" />
                      </Stack>
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* ПРАВАЯ СЕКЦИЯ */}
        <div className={styles.rightSection}>
          <Stack gap="3xs" mt="xl">
            <Skeleton height={12} width={60} radius="xs" mb="xs" /> {/* Лейбл "Действия" */}
            <Skeleton height={34} width="100%" radius="sm" /> {/* Кнопка "Теги" */}
          </Stack>
        </div>
      </Group>
    </Modal>
  );
};
