import Group from 'client/components/group'
import Input from 'client/components/input'
import React from 'react';
import styled from 'styled-components'
import Button from 'client/components/button';

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: min-content;
`;

const Form = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`

const App: React.FC = () => {

  return (
    <Centered>
      <h1>BIKO</h1>
      <h2>Вход</h2>
      <Form>
        <Input
          label='Имя пользователя:'
          type='text'
        />
        <Input
          label='Пароль:'
          type='text'
        />
        <Group direction='row'>
          <Button 
            title={'Войти'}
          />
          <Button
            title={'Создать аккаунт'}
          />
        </Group>
      </Form>
    </Centered>
  );
};

export default App