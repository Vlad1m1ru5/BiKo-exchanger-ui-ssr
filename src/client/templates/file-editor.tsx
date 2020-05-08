
import Group from 'client/components/group'
import Modal from 'client/components/modal'
import React, { useState, useEffect } from 'react'
import Topbar from 'client/components/topbar'
import api from 'client/api'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { Subtitle } from 'client/components/fonts'
import { connect } from 'react-redux'

interface Props {
  openFileId: string
  token: string
}

const FileEditor: React.FC<Props> = ({
  openFileId,
  token
}) => {
  const [file, setFile] = useState<string>('')

  useEffect(() => {
    const loadFileById = async (id: string, token: string) => {
      const file = await api.getFileById({ id, token })
      setFile(file)
    }

    loadFileById(openFileId, token)
  }, [openFileId, token])

  return (
    <Modal>
      <Topbar>
        <Group direction='row'>
          <Subtitle>{openFileId}</Subtitle>
        </Group>
      </Topbar>
      {!!file && (
        <Document file={file}>
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

export default connect(mapStateToProps)(FileEditor)