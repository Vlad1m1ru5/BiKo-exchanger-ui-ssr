import Centered from 'client/components/centered'
import Group from 'client/components/group'
import LabeledInput from 'client/components/labeled-input'
import React, { useState } from 'react';
import TiteledButton from 'client/components/titeled-button'
import actions from 'store/actions'
import { connect } from 'react-redux'
import api from 'client/api';

interface Props {
  setPath: any
  setUserName: any
  setUserPassword: any
}

interface State {
  value: string
  isInvalid: boolean
}

const Login: React.FC<Props> = ({ setPath, setUserName, setUserPassword }) => {
  const [inputName, setInputName] = useState<State>({
    value: '',
    isInvalid: false
  })

  const [inputPassword, setInputPassword] = useState<State>({
    value: '',
    isInvalid: false
  })

  const isInvalidValueInputName = (value: string) => !(value.match(/^[^_]([A-Za-z_]){1,24}$/))

  const isInvalidValueInputPassword = (value: string) => !(value.match(/^([A-Za-z\d]){4,}$/))

  const onInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const isInvalid = isInvalidValueInputName(value)

    setInputName({
      ...inputName,
      value,
      isInvalid
    })
  }

  const onInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const isInvalid = isInvalidValueInputPassword(value)

    setInputPassword({
      ...inputPassword,
      value,
      isInvalid
    })
  }

  const onClickEnter = async () => {
    const username = inputName.value
    const password = inputPassword.value

    const isInvalidName = isInvalidValueInputName(username)
    const isInvalidPassword = isInvalidValueInputPassword(password)

    if (isInvalidName) {
      setInputName({
        ...inputName,
        isInvalid: true
      })
    }

    if (isInvalidPassword) {
      setInputPassword({
        ...inputPassword,
        isInvalid: true
      })
    }

    if (!isInvalidName && !isInvalidPassword) {
      setUserName(username)
      setUserPassword(username)
      
      const path = await api.authoriseUser({ username, password })
      setPath(path)
    }
  }

  const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert(0)
  }

  return (
    <Centered>
      <h1>BIKO</h1>
      <h2>Вход</h2>
      <Group direction={'column'}>
        <LabeledInput
          isInvalid={inputName.isInvalid}
          label='Имя пользователя:'
          onChange={onInputName}
          type='text'
        />
        <LabeledInput
          isInvalid={inputPassword.isInvalid}
          label='Пароль:'
          onChange={onInputPassword}
          type='text'
        />
        <Group direction='row'>
          <TiteledButton
            onClick={onClickEnter}
            title={'Войти'}
          />
          <TiteledButton
            onClick={onClickRegister}
            title={'Создать аккаунт'}
          />
        </Group>
      </Group>
    </Centered>
  )
}

const mapDispatchToProps = {
  setPath: actions.setPath,
  setUserName: actions.setUserName,
  setUserPassword: actions.setUserPassword
}

export default connect(null, mapDispatchToProps)(Login)