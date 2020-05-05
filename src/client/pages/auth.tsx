import Button from 'client/components/button'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import LabeledInput from 'client/components/labeled-input'
import Page from 'client/components/page'
import React, { useState } from 'react'
import TopbarMenu from 'client/templates/topbar-menu'
import Title from 'client/components/title'
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

  const clickConfirm = () => {
    history.push('\login')
  }

  return (
     <Page>
      <TopbarMenu>
        <h2>Создание аккаунта</h2>
      </TopbarMenu>
       <Group direction='column'>
       <LabeledInput
          isInvalid={inputName.isInvalid}
          label='Имя пользователя:'
          onChange={changeInputName}
          type='text'
        />
        <LabeledInput
          isInvalid={inputEmail.isInvalid}
          label='Электронная почта:'
          onChange={changeInputEmail}
          type='email'
        />
        <LabeledInput
          isInvalid={inputPassword.isInvalid}
          label='Пароль:'
          onChange={changeInputPassword}
          type='text'
        />
        <LabeledInput
          isInvalid={inputName.isInvalid}
          label='Поатор пароля:'
          onChange={changeInputName}
          type='text'
        />
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