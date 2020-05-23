import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setOpenFileOption } from 'store/actions'

import { filesApi, usersApi } from 'client/api'

import Button from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Item from 'client/components/item'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import Select from 'client/components/select'
import Topbar from 'client/components/topbar'
import { Headline } from 'client/components/fonts'

import srcArrow from 'assets/icons/Arrow.svg'
import srcClose from 'assets/icons/Close.svg'

interface Props {
  openFileId: string
  setOpenFileOption: action
  token: string
  userName: string
}

const FileShare: React.FunctionComponent<Props> = ({
  openFileId,
  setOpenFileOption,
  token,
  userName
}) => {
  const [options, setOptions] = useState<Option[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      const users = await usersApi.getUsers({ token, userName })
      const options = users.map(({ id, name }) => ({
        label: name,
        value: id
      }))

      setOptions(options)
    }

    loadUsers()
  }, [])

  const closeFileShare = () => setOpenFileOption('')

  const shareFile = () => {
    const id = openFileId
    const option = 'read'
    const usersIds = users.map(({ id }) => id)

    filesApi.setUsersOptionByFileId({ id, option, token, usersIds })
      .then(closeFileShare)
  }

  const setSelectedUsersIds = (values: Option[]) => {
    const users = values.map(({ label, value }) => ({
      id: value,
      name: label
    }))

    setUsers(users)
  }

  const usersNames = users
    .map(({ name }) => name)
    .join(';\n')

  return (
    <Modal>
      <Topbar>
        <Headline>Дать доступ к файлу</Headline>
        <Item>
          <Prompt title='Закрыть'>
            <Button onClick={closeFileShare}>
              <Icon src={srcClose}/>
            </Button>
          </Prompt>
        </Item>
      </Topbar>
      <Group direction='row'>
        <Headline>&nbsp;Имя пользователя</Headline>
        <Prompt title={usersNames}>
          <Select
            closeMenuOnSelect={false}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isMulti={true}
            options={options}
            onChange={setSelectedUsersIds}
            renderSelectedOptions={true}
          />
        </Prompt>
        <Prompt title='Подтвердить'>
          <Button onClick={shareFile}>
            <Icon src={srcArrow}/>
          </Button>
        </Prompt>
      </Group>
    </Modal>
  )
}

const mapStateToProps = ({ openFileId, token, userName }: Store) => ({
  openFileId,
  token,
  userName
})

const mapDispatchToProps = {
  setOpenFileOption
}

export default connect(mapStateToProps, mapDispatchToProps)(FileShare)