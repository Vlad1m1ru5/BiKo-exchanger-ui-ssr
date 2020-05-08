import 'react-pdf/dist/Page/AnnotationLayer.css';
import Button, { SpecialButton } from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Modal from 'client/components/modal'
import Prompt from 'client/components/prompt'
import React, { useState, useEffect } from 'react'
import Topbar from 'client/components/topbar'
import api from 'client/api'
import srcArrow from 'assets/icons/Arrow.svg'
import srcArrowLeft from 'assets/icons/Arrow-Left.svg'
import srcClose from 'assets/icons/Close.svg'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { Headline } from 'client/components/fonts'
import { connect } from 'react-redux'
import { setIsOpenFileEditor } from 'store/actions'

interface Pages {
  current: number
  total: number
}

interface PdfProps {
  numPages: number
}

interface Props {
  openFileId: string
  setIsOpenFileEditor: action
  token: string
}

const FileEditor: React.FC<Props> = ({
  openFileId,
  setIsOpenFileEditor,
  token
}) => {
  const [file, setFile] = useState<string>('')
  const [pages, setPages] = useState<Pages>({
    current: 1,
    total: 1
  })

  useEffect(() => {
    const loadFileById = async (id: string, token: string) => {
      const file = await api.getFileById({ id, token })
      setFile(file)
    }

    loadFileById(openFileId, token)
  }, [openFileId, token])

  const setTotalPages = ({ numPages }: PdfProps) => {
    const total = numPages
    setPages({
      ...pages,
      total
    })
  }

  return (
    <Modal>
      <Topbar>
        <Group direction='row'>
          <Headline>{openFileId}</Headline>
        </Group>
        <Group direction='row'>
          <Prompt title='Назад'>
            <Button onClick={() => {}}>
              <Icon src={srcArrowLeft}/>
            </Button>
          </Prompt>
          <Prompt title='Вперёд'>
            <Button onClick={() => {}}>
              <Icon src={srcArrow}/>
            </Button>
          </Prompt>
        </Group>
        <Group direction='row'>
          <SpecialButton 
            onClick={setIsOpenFileEditor}
            spec='danger'
          >
            <Icon src={srcClose} />
          </SpecialButton>
        </Group>
      </Topbar>
      {!!file && (
        <Document 
          file={file}
          onLoadSuccess={setTotalPages}
          options={{
            cMapUrl: 'cmaps/',
            cMapPacked: true,
          }}
        >
          <Page pageNumber={1} />
        </Document>
      )}
    </Modal>
  )
}

const mapStateToProps = ({ openFileId, token }: Store) => ({
  openFileId,
  token
})

const mapDispatchToProps = {
  setIsOpenFileEditor
}

export default connect(mapStateToProps, mapDispatchToProps)(FileEditor)