import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import srcArrow from 'assets/icons/Arrow.svg'

import Button, { SpecialButton } from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import Topbar from 'client/components/topbar'
import { Headline } from 'client/components/fonts'

import srcClose from 'assets/icons/Close.svg'

import { filesApi } from 'client/api'

import { setIsOpenFileLoad } from 'store/actions'

type State = {
  file: File | null
  value: string 
  tag: string
}

interface Props {
  setIsOpenFileLoad: action
  token: string
}

const FileShare: React.FunctionComponent<Props> = ({
  setIsOpenFileLoad,
  token
}) => {

  const [state, setState] = useState<State>({
    file: null,
    value: '',
    tag: ''
  })

  const closeFileLoad = () => { setIsOpenFileLoad(false) }

  const receaveFile = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { files, value } = currentTarget

    if (files === null) {
      return
    }
    
    const file = files[0]

    setState({ ...state, file, value })
  }

  const saveTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.currentTarget.value

    setState({ ...state, tag })
  }

  const sendFile = () => {
    const { file, value, tag } = state

    if (file === null) {
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(file)
    fileReader.onerror = () => { alert('Ошибка чтения файла.') }
    fileReader.onload = () => {
      const { result } = fileReader

      if (result === null) {
        throw new Error('Пустой файл.')
      }

      const file = new File([result], value)

      const formData = new FormData()
      formData.append('file', file, value)
      formData.append('tag', tag)

      filesApi.createFile({ formData, token })
        .then(() => { alert('Успешная загрузка файла.') })
        .catch(() => { alert('Ошибка загрузки файла.') })
    }
  }

  return (
    <Modal>
      <Topbar>
        <Group direction='row'>
          <Headline>Загрузить файл</Headline>
        </Group>
        <Group direction='row'>
          <Prompt title='Закрыть'>
            <SpecialButton
              onClick={closeFileLoad}
              spec='danger'
            >
              <Icon src={srcClose} />
            </SpecialButton>
          </Prompt>
        </Group>
      </Topbar>
      <Group direction='row'>
        <Headline>&nbsp;Файл</Headline>
        <Prompt title='Загрузить'>
          <Input
            accept='.doc,.docx,.pdf'
            type='file'
            onChange={receaveFile}
          />
        </Prompt>
        <Input
          type='text'
          onChange={saveTags}
          placeholder='Ключевые слова...'
        />
        <Button onClick={sendFile}>
          <Icon src={srcArrow} />  
        </Button>
      </Group>
    </Modal>
  )
}

const mapStateToProps = ({ token }: Store) => ({ token })

const mapDispatchToProps = { setIsOpenFileLoad }

export default  connect(mapStateToProps, mapDispatchToProps)(FileShare)