import Group from 'client/components/group'
import Input from 'client/components/input'
import React from 'react';
import styled from 'styled-components'

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: min-content;
`;

const App = () => {

  return (
    <Centered>
      <h1>BIKO</h1>
      <h2>Вход</h2>
      <Input
        label='Имя пользователя:'
        type='text'
      />
      <Input
        label='Пароль:'
        type='text'
      />
      <Group direction='column'>
        <button>Privet</button>
        <button>Privet</button>
      </Group>
    </Centered>
  );
};


export default App