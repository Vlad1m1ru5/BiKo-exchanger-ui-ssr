import Box from 'client/components/box'
import Button, { SpecialButton } from 'client/components/button'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import FileOption from 'client/templates/file-option'
import Group from 'client/components/group'
import React, { useState, useEffect } from 'react'
import Page from 'client/components/page'
import Prompt from 'client/components/prompt'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import api from 'client/api'
import srcAdd from 'assets/icons/Add.svg'
import srcSearch from 'assets/icons/Search.svg'
import { Subtitle, Title, Description, Caption } from 'client/components/fonts'
import { connect } from 'react-redux'

interface Props {
  token: string
}

const Finder: React.FC<Props> = ({
  token
}) => {
  const [error, setError] = useState<Error | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [filesOptionsList, setFilesOptionsList] = useState<FileOptions[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadFilesOptionsList = async () => {
      try {
        const filesOptionsLits = await api.getFilesOptions(token)
        const fielsOptionsListByFileName = filesOptionsLits
          .filter(({ name }) => name.match(fileName))

        setFilesOptionsList(fielsOptionsListByFileName)
        setError(null)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoading) {
      loadFilesOptionsList()
    }

  }, [isLoading])

  const loadFile = () => { }

  const changeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = event.currentTarget.value
    setFileName(fileName)
  }

  const startLoadgin = () => { setIsLoading(true) }

  const getFileOptionCard = ({ id, name, options, tags }: FileOptions) => {
    const tagsCaptionsList = tags.map((tag, index) => (
      <Caption key={index}>{tag}</Caption>
    ))

    const optionsButtonsList = options.map((option, index) => (
      <FileOption
        id={id}
        key={index}
        option={option}
      />
    ))

    return (
      <Box key={id} level='top'>
        <Group direction='column'>
          <Description>{name}</Description>
          <Group direction='row'>{optionsButtonsList}</Group>
          <Group direction='row'>{tagsCaptionsList}</Group>
        </Group>
      </Box>
    )
  }

  const cards = filesOptionsList.length ?
    filesOptionsList.map(getFileOptionCard) :
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

export default connect(mapStateToProps)(Finder)