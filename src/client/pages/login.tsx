import Button, { SpecialButton } from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Label from 'client/components/label'
import Page from 'client/components/page'
import Prompt from 'client/components/prompt'
import React, { useState } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import Warning from 'client/components/warning'
import api from 'client/api';
import srcAdd from 'assets/icons/Add.svg'
import srcChar from 'assets/icons/Char.svg'
import { Subtitle, Title } from 'client/components/fonts'
import { connect } from 'react-redux'
import { isValidName, isValidPassword } from 'client/utils'
import { setToken, setUserName, setUserPassword } from 'store/actions'
import { useHistory } from 'react-router-dom'

interface Props {
  setToken: action
  setUserName: action
  setUserPassword: action
}

const Login: React.FC<Props> = ({ 
  setToken,
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
        .then(setToken)
        .catch(setError)
    }
  }

  const clickRegister = () => {
    history.push('/auth')
  }

  const titleWarningInputName = `
    Имя:
    - должно содержать символы A-Z, a-z, _;
    - должно иметь от 1 до 24 символов.
  `

  const titleWarningInputPassword = `
    Пароль:
    - должен содержать символы A-Z, a-z, 0-9;
    - должен иметь от 4 символов.
  `

  return (
    <Page>
      <TopbarMenu>
        <Title>Вход</Title>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        <Group direction='row'>
          <Label>
            Имя пользователя:&nbsp;
            <Warning
              isVisible={inputName.isInvalid}
              title={titleWarningInputName}
            >*</Warning><br />
            <Input
              onChange={changeInputName}
              type='text'
            />
          </Label>
        </Group>
        <Group direction='row'>
          <Label>
            Пароль:&nbsp;
            <Warning
              isVisible={inputPassword.isInvalid}
              title={titleWarningInputPassword}
            >*</Warning><br />
            <Input 
              onChange={changeInputPassword}
              type='password'
            />
          </Label>
        </Group>
        <Group direction='row'>
          <Prompt title='Войти'>
            <SpecialButton 
              onClick={clickEnter}
              spec='help'
            >
              <Icon src={srcChar} />
            </SpecialButton>
          </Prompt>
          <Prompt title='Зарегистрироваться'>
            <Button onClick={clickRegister}>
            <Icon src={srcAdd} />
            </Button>
          </Prompt>
        </Group>
        {error !== null && (
          <Subtitle>{error.message}</Subtitle>
        )}
      </Group>
    </Page>
  )
}

const mapDispatchToProps = {
  setToken,
  setUserName,
  setUserPassword
}

export default connect(null, mapDispatchToProps)(Login)