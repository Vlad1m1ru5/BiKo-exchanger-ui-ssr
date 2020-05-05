import Button from 'client/components/button'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Group from 'client/components/group'
import Label from 'client/components/label'
import Page from 'client/components/page'
import React, { useState } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import Title from 'client/components/title'
import Warning from 'client/components/warning'
import srcArrow from 'assets/icons/Arrow.svg'
import { isValidEmail, isValidName, isValidPassword } from 'client/utils'
import { useHistory } from 'react-router-dom'

const Auth: React.FC = () => {
  const history = useHistory()

  const [inputName, setInputName] = useState<Input>({
    isInvalid: false,
    value: ''
  })

  const [inputEmail, setInputEmail] = useState<Input>({
    isInvalid: false,
    value: ''
  })

  const [inputPassword, setInputPassword] = useState<Input>({
    isInvalid: false,
    value: ''
  })

  const [inputPasswordDuplicate, setInputPasswordDuplicate] = useState<Input>({
    isInvalid: false,
    value: ''
  })

  const changeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const isInvalid = !isValidName(value)

    setInputName({
      ...inputName,
      isInvalid,
      value
    })
  }

  const changeInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const isInvalid = !isValidEmail(value)

    setInputEmail({
      ...inputEmail,
      isInvalid,
      value
    })
  }

  const changeInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const isInvalid = !isValidPassword(value)

    setInputPassword({
      ...inputPassword,
      isInvalid,
      value
    })
  }

  const comparePasswords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const isInvalid = value === inputPassword.value

    setInputPasswordDuplicate({
      ...inputPasswordDuplicate,
      isInvalid,
      value
    })
  }

  const clickConfirm = () => {
    if (inputName.isInvalid ||
        inputEmail.isInvalid ||
        inputPassword.isInvalid ||
        inputPasswordDuplicate.isInvalid
    ) {
      return
    }

    history.push('/login')
  }

  return (
     <Page>
      <TopbarMenu>
        <h2>Создание аккаунта</h2>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
      <Group direction='row'>
          <Label>
            Имя пользователя:&nbsp;
            <Warning isVisible={inputName.isInvalid}>*</Warning><br />
            <Input
              onChange={changeInputName}
              type='text'
            />
          </Label>
        </Group>
        <Group direction='row'>
          <Label>
            Электронная почта:&nbsp;
            <Warning isVisible={inputEmail.isInvalid}>*</Warning><br />
            <Input
              onChange={changeInputEmail}
              type='email'
            />
          </Label>
        </Group>
      <Group direction='row'>
        <Label>
          Пароль:&nbsp;
          <Warning isVisible={inputPassword.isInvalid}>*</Warning><br />
          <Input
            onChange={changeInputPassword}
            type='text'
          />
        </Label>
      </Group>
      <Group direction='row'>
        <Label>
          Повтор пароля:&nbsp;
          <Warning isVisible={inputPassword.isInvalid}>*</Warning><br />
          <Input
            onChange={comparePasswords}
            type='text'
          />
        </Label>
      </Group>
      <Title title='Подтвердить'>
        <Button onClick={clickConfirm}>
          <Icon src={srcArrow}/>
        </Button>
      </Title>
      </Group>
     </Page>
  )
}

export default Auth