import Button from 'client/components/button'
import Group from 'client/components/group'
import LabeledInput from 'client/components/labeled-input'
import React from 'react';
import styled from 'styled-components'

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: max-content;
`;

const Form = styled(Centered)`
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`

const App = () => {

  return (
    <Centered>
      <h1>BIKO</h1>
      <h2>Вход</h2>
      <Form>
        <LabeledInput
          label='Имя пользователя:'
          type='text'
        />
        <LabeledInput
          label='Пароль:'
          type='text'
        />
        <Group direction='row'>
          <Button title={'Войти'}/>
          <Button title={'Создать аккаунт'}/>
        </Group>
      </Form>
    </Centered>
  );
};

export default App