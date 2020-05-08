import { SpecialButton } from 'client/components/button'
import Icon from 'client/components/icon'
import Prompt from 'client/components/prompt'
import React, { useState, useEffect } from 'react'
import srcAdd from 'assets/icons/Add.svg'
import srcClose from 'assets/icons/Close.svg'
import srcHide from 'assets/icons/Hide.svg'
import srcSquare from 'assets/icons/Square.svg'
import srcSearch from 'assets/icons/Search.svg'

interface Props {
  id: string
  option: option
}

const FileOption: React.FunctionComponent<Props> = ({
  id,
  option
}) => {
  const [handleOnClick, setHandleOnClick] = useState<action>(() => {})
  const [spec, setSpec] = useState<spec>('')
  const [src, setSrc] = useState<string>('')
  const [title, setTile] = useState<string>('')

  const deleteFile = () => {}

  const printFile = () => {}
  
  const readFile = () => {}
  
  const shareFile = () => {}

  const writeFile = () => {}

  useEffect(() => {
    switch (option) {
      case 'delete':
        setHandleOnClick(deleteFile)
        setSpec('danger')
        setSrc(srcClose)
        setTile('Удалить')
        break
      case 'print':
        setHandleOnClick(printFile)
        setSpec('')
        setSrc(srcSquare)
        setTile('Распечатать')
        break
      case 'read':
        setHandleOnClick(readFile)
        setSpec('')
        setSrc(srcSearch)
        setTile('Открыть')
        break
      case 'share':
        setHandleOnClick(shareFile)
        setSpec('')
        setSrc(srcAdd)
        setTile('Поделиться')
        break
      case 'write':
        setHandleOnClick(writeFile)
        setSpec('')
        setSrc(srcHide)
        setTile('Редактирвать')
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
      </SpecialButton>
    </Prompt>
  )
}

export default FileOption