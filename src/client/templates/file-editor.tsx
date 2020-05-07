import Modal from 'client/components/modal'
import React, { useState, useEffect } from 'react'
import api from 'client/api'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
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
      <h3>{openFileId}</h3>
      {!!file && (
        <Document file={file}>
          <Page pageNumber={1} />
        </Document>
      )}
    </Modal>)
}

const mapStateToProps = ({ openFileId, token }: Store) => ({
  openFileId,
  token
})

export default connect(mapStateToProps)(FileEditor)