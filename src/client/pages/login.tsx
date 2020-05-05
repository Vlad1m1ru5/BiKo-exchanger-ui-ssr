import Arrow from 'assets/icons/Arrow.svg'
import Centered from 'client/components/centered'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import LabeledInput from 'client/components/labeled-input'
import React, { useState } from 'react';
import TiteledButton from 'client/components/titeled-button'
import Topbar from 'client/components/topbar'
import actions from 'store/actions'
import api from 'client/api';
import { connect } from 'react-redux'
import { isValidName, isValidPassword } from 'client/utils'
import { useHistory } from 'react-router-dom'

interface Props {
  setAuthority: any
  setUserName: any
  setUserPassword: any
}

const Login: React.FC<Props> = ({ 
  setAuthority,
  setUserName,
  setUserPassword
}) => {
  const history = useHistory()

  const [inputName, setInputName] = useState<Input>({
    value: '',
    isInvalid: false
  })

  const [inputPassword, setInputPassword] = useState<Input>({
    value: '',
    isInvalid: false
  })

  const [error, setError] = useState<Error | null>(null)

  const changeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const isInvalid = !isValidName(value)

    setInputName({
      ...inputName,
      value,
      isInvalid
    })
  }

  const changeInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const isInvalid = !isValidPassword(value)

    setInputPassword({
      ...inputPassword,
      value,
      isInvalid
    })
  }

  const clickEnter = () => {
    const username = inputName.value
    const password = inputPassword.value

    const isInvalidName = !isValidName(username)
    const isInvalidPassword = !isValidPassword(password)

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

    if (!isInvalidName && 
        !isInvalidPassword
    ) {
      setUserName(username)
      setUserPassword(password)

      api
        .getAuthorization({ username, password })
        .then(api.getAuthentication)
        .then(setAuthority)
        .catch(setError)
    }
  }

  const clickRegister = () => {
    history.push('/auth')
  }

  return (
    <Centered>
      <Topbar>
        <h1>BIKO</h1>
      </Topbar>
      <h2>Вход</h2>
      <Group direction={'column'}>
        <LabeledInput
          isInvalid={inputName.isInvalid}
          label='Имя пользователя:'
          onChange={changeInputName}
          type='text'
        />
        <LabeledInput
          isInvalid={inputPassword.isInvalid}
          label='Пароль:'
          onChange={changeInputPassword}
          type='text'
        />
        <Group direction='row'>
          <TiteledButton
            onClick={clickEnter}
            title={'Войти'}
          ><Icon src={Arrow} /></TiteledButton>
          <TiteledButton
            onClick={clickRegister}
            title={'Создать аккаунт'}
          />
        </Group>
        {error !== null && (
          <h3>{error.message}</h3>
        )}
      </Group>
    </Centered>
  )
}

const mapDispatchToProps = {
  setAuthority: actions.setAuthority,
  setUserName: actions.setUserName,
  setUserPassword: actions.setUserPassword
}

export default connect(null, mapDispatchToProps)(Login)