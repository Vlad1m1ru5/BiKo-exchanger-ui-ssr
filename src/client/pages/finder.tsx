import Box from 'client/components/box'
import Button, { SpecialButton} from 'client/components/button'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Group from 'client/components/group'
import React, { useState, useEffect } from 'react'
import Page from 'client/components/page'
import Prompt from 'client/components/prompt'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import api from 'client/api'
import srcAdd from 'assets/icons/Add.svg'
import srcSearch from 'assets/icons/Search.svg'
import { Subtitle, Title } from 'client/components/fonts'
import { connect } from 'react-redux'
import { setIsOpenFileEditor }from 'store/actions'

interface Props {
  setIsOpenFileEditor: action
  token: string
}

const Finder: React.FC<Props> = ({
  setIsOpenFileEditor,
  token
}) => {
  const [error, setError] = useState<Error | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [filesMetadataList, setFilesMetadataList] = useState<FileMetadata[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadFilesMetadataList = async () => {
      try {
        const filesMetadataList = await api.getFilesMetadata(token)
        const fielsMetadataListByFilename = filesMetadataList
          .filter(({ name }) => name.match(fileName))

        setFilesMetadataList(fielsMetadataListByFilename)
        setError(null)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoading) {
      loadFilesMetadataList()
    }

    return () => {
      setIsOpenFileEditor(false)
    }
  }, [setIsLoading])

  const loadFile = () => { }

  const changeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = event.currentTarget.value
    setFileName(fileName)
  }

  const startLoadgin = () => { setIsLoading(true) }

  const cards = filesMetadataList.length ?
    filesMetadataList.map(({ id, name }) => (
      <Box key={id} level='top'>
        <Group direction='column'>
          name
        </Group>
      </Box>
    )) :
    ''

  return (
    <Page>
      <TopbarMenu>
        <Title>Поисковик</Title>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        <Group direction='row'>
          <Prompt title='Загрузить'>
            <SpecialButton
              onClick={loadFile}
              spec='help'
            >
              <Icon src={srcAdd} />
            </SpecialButton>
          </Prompt>
          <Input 
            onChange={changeFileName}
            placeholder='Имя файла'
            type='text'
          />
          <Prompt title='Поиск'>
            <Button onClick={startLoadgin}>
              <Icon src={srcSearch} />
            </Button>
          </Prompt>
        </Group>
        <Group direction='column'>
          {!!error && <Subtitle>{error.message}</Subtitle>}
          {isLoading && (
            <Subtitle>Загрузка...</Subtitle>
          ) || (
            <Group direction='row'>
              {cards}
            </Group>
          )}
        </Group>
      </Group>
    </Page>
  )
}

const mapStateToProps = ({ token }: Store) => ({
  token
})

const mapDispatchToProps = {
  setIsOpenFileEditor
}

export default connect(mapStateToProps, mapDispatchToProps)(Finder)