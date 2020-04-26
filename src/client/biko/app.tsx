import Group from 'client/components/group'
import LabeledInput from 'client/components/labeled-input'
import React from 'react';
import styled from 'styled-components'
import Button from 'client/components/button'

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: min-content;
`

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
        <LabeledInput
          label='Имя пользователя:'
          onChange={() => {}}
          type='text'
        />
        <LabeledInput
          label='Пароль:'
          onChange={() => {}}
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
  )
}

export default App