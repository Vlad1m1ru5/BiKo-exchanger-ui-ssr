import Button from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Item from 'client/components/item'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import React, { useState, useEffect } from 'react'
import Select from 'client/components/select'
import Topbar from 'client/components/topbar'
import api from 'client/api'
import srcArrow from 'assets/icons/Arrow.svg'
import srcClose from 'assets/icons/Close.svg'
import { Headline } from 'client/components/fonts'
import { connect } from 'react-redux'
import { setOpenFileOption } from 'store/actions'

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
      const users = await api.getUsers({ token, userName })
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

    api
      .setUsersOptionByFileId({ id, option, token, usersIds })
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

  const usersCount = users.length

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
        Имя пользователя:&nbsp;
        <Prompt title={usersNames}>
          <Select
            closeMenuOnSelect={false}
            controlShouldRenderValue={false}
            isMulti={true}
            options={options}
            onChange={setSelectedUsersIds}
            placeholder={usersCount}
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