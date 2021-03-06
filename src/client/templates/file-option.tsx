import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Icon from 'client/components/icon'
import Prompt from 'client/components/prompt'
import { Caption } from 'client/components/fonts'
import { SpecialButton } from 'client/components/button'

import srcAdd from 'assets/icons/Add.svg'
import srcClose from 'assets/icons/Close.svg'
import srcSquare from 'assets/icons/Square.svg'
import srcSearch from 'assets/icons/Search.svg'

import { setOpenFileId, setOpenFileOption } from 'store/actions'

interface Props {
  id: string
  option: option
  setOpenFileId: action
  setOpenFileOption: action
}

const FileOption: React.FunctionComponent<Props> = ({
  id,
  option,
  setOpenFileId,
  setOpenFileOption
}) => {
  const [handleOnClick, setHandleOnClick] = useState<action>(() => {})
  const [spec, setSpec] = useState<spec>('')
  const [src, setSrc] = useState<string>('')
  const [title, setTile] = useState<string>('')

  const deleteFile = () => {}

  const readFile = () => {}
  
  const shareFile = () => {
    setOpenFileId(id)
    setOpenFileOption('share')
  }

  useEffect(() => {
    switch (option) {
      case 'delete':
        setHandleOnClick(deleteFile)
        setSpec('danger')
        setSrc(srcClose)
        setTile('Удалить')
        break
      case 'read':
      case 'share':
        setHandleOnClick(() => shareFile)
        setSpec('')
        setSrc(srcAdd)
        setTile('Поделиться')
        break
      case 'write':
        setHandleOnClick(readFile)
        setSpec('')
        setSrc(srcSearch)
        setTile('История')
        break
      default:
        return
    }
  }, [])

  return (
    <Prompt title={title}>
      <SpecialButton
        onClick={handleOnClick}
        spec={spec}
      >
        <Icon src={src} />
        <Caption>{title}</Caption>
      </SpecialButton>
    </Prompt>
  )
}

const mapDispatchToProps = {
  setOpenFileId,
  setOpenFileOption
}

export default connect(null, mapDispatchToProps)(FileOption)