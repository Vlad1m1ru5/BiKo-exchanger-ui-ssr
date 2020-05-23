import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { SpecialButton } from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import Topbar from 'client/components/topbar'
import { Headline } from 'client/components/fonts'

import srcArrow from 'assets/icons/Arrow.svg'
import srcClose from 'assets/icons/Close.svg'

import { filesApi } from 'client/api'

import { setIsOpenFileLoad } from 'store/actions'

interface Props {
  setIsOpenFileLoad: action
  token: string
}

interface StagedFile {
  file: File | null
  name: string
}

const FileShare: React.FunctionComponent<Props> = ({
  setIsOpenFileLoad,
  token
}) => {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [stagedFile, setStagedFile] = useState<StagedFile>({ file: null, name: '' })
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    const formData = new FormData()
    setFormData(formData)
  }, [])

  useEffect(() => {
    if (stagedFile.file !== null) {
      setIsSendButtonDisabled(false)
    }
  }, [stagedFile])

  const closeFileLoad = () => { setIsOpenFileLoad(false) }

  const receaveFile = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = currentTarget

    const file = files[0]
    const { name } = file
    setStagedFile({ ...stagedFile, file, name })
  }

  const sendStagedFile = () => {
    const { file, name } = stagedFile

    if (file === null ||
        formData === null ||
        !name
    ) {
      return
    }

    formData.append('file', file, name)

    filesApi.createFile({ formData, token })
      .then(() => { alert('Успешная загрузка файла.') })
      .catch(() => { alert('Ошибка загрузки файла.') })
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
        <Headline>&nbsp;Файлы</Headline>
        <Prompt title='Загрузить'>
          <Input
            accept='.doc,.docx,.pdf'
            type='file'
            onChange={receaveFile}
          />
        </Prompt>
        <Prompt title='Подтвердить'>
          <SpecialButton
            disabled={isSendButtonDisabled}
            onClick={sendStagedFile}
            spec='help'
          >
            <Icon src={srcArrow}/>
          </SpecialButton>
        </Prompt>
      </Group>
    </Modal>
  )
}

const mapStateToProps = ({ token }: Store) => ({ token })

const mapDispatchToProps = { setIsOpenFileLoad }

export default  connect(mapStateToProps, mapDispatchToProps)(FileShare)