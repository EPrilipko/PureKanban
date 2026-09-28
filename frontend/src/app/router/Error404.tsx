import { Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title order={1}>Страница не найдена!</Title>
      <Text>Что-то пошло не так</Text>

      <Button onClick={() => navigate('/', { replace: true })}>Вернуться</Button>
    </>
  );
};
