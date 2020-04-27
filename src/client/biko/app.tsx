import Group from 'client/components/group'
import LabeledInput from 'client/components/labeled-input'
import React, { useState } from 'react';
import styled from 'styled-components'
import TiteledButton from 'client/components/titeled-button'

interface State {
  value: string
  warning: string
}

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
  const [userName, setUserName] = useState<State>({
    value: '',
    warning: ''
  })

  const [userPassword, setUserPassword] = useState<State>({
    value: '',
    warning: ''
  })

  const onEnter = () => {}

  const onRegister = () => {}

  return (
    <Centered>
      <h1>BIKO</h1>
      <h2>Вход</h2>
      <Form>
        <LabeledInput
          label='Имя пользователя:'
          onChange={() => {}}
          type='text'
          warning={''}
        />
        <LabeledInput
          label='Пароль:'
          onChange={() => {}}
          type='text'
          warning={''}
        />
        <Group direction='row'>
          <TiteledButton
            onClick={onEnter}
            title={'Войти'}
          />
          <TiteledButton
            onClick={onRegister}
            title={'Создать аккаунт'}
          />
        </Group>
      </Form>
    </Centered>
  )
}

export default App