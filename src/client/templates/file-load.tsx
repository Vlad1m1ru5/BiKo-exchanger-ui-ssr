import { SpecialButton } from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Label from 'client/components/label'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import React, { useState, useEffect } from 'react'
import Topbar from 'client/components/topbar'
import srcArrow from 'assets/icons/Arrow.svg'
import srcClose from 'assets/icons/Close.svg'
import { Headline } from 'client/components/fonts'
import { connect } from 'react-redux'
import { filesApi } from 'client/api'
import { setIsOpenFileLoad } from 'store/actions'

interface Props {
  setIsOpenFileLoad: action
  token: string
}

interface StagedFile {
  file: string
  name: string
}

const FileShare: React.FunctionComponent<Props> = ({
  setIsOpenFileLoad,
  token
}) => {
  const [fileReader, setFileReader] = useState<FileReader | null>(null)
  const [stagedFile, setStagedFile] = useState<StagedFile>({ file: '', name: '' })

  useEffect(() => {
    const fileReader = new FileReader()
    fileReader.onload = (fileLoadEnvet) => {
      const file = fileLoadEnvet.target?.result

      if (typeof file === 'string') {
        setStagedFile({ ...stagedFile, file })
      }
    }

    setFileReader(fileReader)
  }, [])

  const closeFileLoad = () => { setIsOpenFileLoad(false) }

  const addFileToFilesList = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = currentTarget

    if (!files?.length ||
      fileReader === null  
    ) {
      return
    }

    const file = files[0]
    const { name } = file
    setStagedFile({ ...stagedFile, name })
    fileReader.readAsDataURL(file)
  }

  const sendStagedFile = () => {
    filesApi.createFile({ ...stagedFile, token })
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
        <Prompt title='Загрузить'>
          <Label>
            <Input
              accept='.doc,.docx,.pdf'
              type='file'
              onChange={addFileToFilesList}
            />
          </Label>
        </Prompt>
        <Prompt title='Подтвердить'>
          <SpecialButton
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