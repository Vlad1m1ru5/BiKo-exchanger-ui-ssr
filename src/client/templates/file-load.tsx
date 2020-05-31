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
  path: string
}

const FileShare: React.FunctionComponent<Props> = ({
  setIsOpenFileLoad,
  token
}) => {

  const closeFileLoad = () => { setIsOpenFileLoad(false) }

  const receaveFile = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { files, value } = currentTarget

    if (files === null) {
      return
    }
    const file = files[0]
    const fileReader = new FileReader()

    fileReader.readAsText(file)
    fileReader.onerror = () => { alert('Ошибка чтения файла.') }
    fileReader.onload = () => {
      const { result } = fileReader

      if (result === null) {
        throw new Error('Пустой файл.')
      }

      const matches = value.match(/(\.[a-z]+)$/g)
      const ext = matches ? matches[0].replace('.', '') : 'text'
      const file = new Blob([result], { type: `application/${ext}` })

      const formData = new FormData()
      formData.append('file', file, value)
      formData.append('tag', 'test-tag')

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
        <Headline>&nbsp;Файлы</Headline>
        <Prompt title='Загрузить'>
          <Input
            accept='.doc,.docx,.pdf'
            type='file'
            onChange={receaveFile}
          />
        </Prompt>
      </Group>
    </Modal>
  )
}

const mapStateToProps = ({ token }: Store) => ({ token })

const mapDispatchToProps = { setIsOpenFileLoad }

export default  connect(mapStateToProps, mapDispatchToProps)(FileShare)