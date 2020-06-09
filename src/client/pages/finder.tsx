import React, { useState, useEffect, Suspense } from 'react'
import { connect } from 'react-redux'

import Button, { SpecialButton } from 'client/components/button'
import ErrorBox from 'client/components/error-box'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Item from 'client/components/item'
import Group from 'client/components/group'
import Page from 'client/components/page'
import Prompt from 'client/components/prompt'
import { Subtitle, Title, Caption } from 'client/components/fonts'

import FileOption from 'client/templates/file-option'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'

import { filesApi } from 'client/api'

import srcAdd from 'assets/icons/Add.svg'
import srcSearch from 'assets/icons/Search.svg'

import { setIsOpenFileLoad } from 'store/actions'

const FileLoad = React.lazy(() => import('client/templates/file-load'))
const FileShare = React.lazy(() => import('client/templates/file-share'))
const Table = React.lazy(() => import('client/templates/table'))

interface Props {
  isOpenFileLoad: boolean
  openFileOption: option
  setIsOpenFileLoad: action
  token: string
}

const Finder: React.FC<Props> = ({
  isOpenFileLoad,
  openFileOption,
  setIsOpenFileLoad,
  token
}) => {
  const [error, setError] = useState<ApplicationError | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [filesOptionsList, setFilesOptionsList] = useState<FileOptions[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadFilesOptionsList = async () => {
      try {
        const filesOptionsLits = await filesApi.getFilesOptions(token)
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

  const openFileLoad = () => {
    setIsOpenFileLoad(!isOpenFileLoad)
   }

  const changeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = event.currentTarget.value
    setFileName(fileName)
  }

  const startLoadgin = () => { setIsLoading(true) }

  const getFileOptionCard = ({ id, name, options, tags }: FileOptions) => {
    const optionsButtonsList = options.map((option, index) => (
      <FileOption
        id={id}
        key={index}
        option={option}
      />
    ))

    const Options = <Group direction='column'>{optionsButtonsList}</Group>

    const tagsCaptionsList = tags.map((tag, index) => <Caption key={index}>{tag}</Caption>)
    
    const Tags = <Group direction='row'>{tagsCaptionsList}</Group>

    return {
      onClick: () => {},
      values: {
        name,
        Options,
        Tags
      }
    }
  }

  const headers = ['Имя файла', 'Опции', 'Тэги']
  const items = filesOptionsList.map(getFileOptionCard)

  return (
    <Page>
      <TopbarMenu>
        <Title>Поисковик</Title>
        <Item>
          <Prompt title='Загрузить'>
            <SpecialButton
              onClick={openFileLoad}
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
        </Item>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        {!!error && <ErrorBox><Subtitle>{error.response.data}</Subtitle></ErrorBox>}
        {isLoading && (
          <Subtitle>Загрузка...</Subtitle>
        ) || (
          <Suspense fallback='Подождите...'>
            <Table 
              headers={headers}
              items={items}
            />
          </Suspense>
        )}
        {!!openFileOption && (
          <Suspense fallback='Подождите...'>
            <FileShare />
          </Suspense>
        )}
        {isOpenFileLoad && (
          <Suspense fallback='Подождите...'>
            <FileLoad />
          </Suspense>
        )}
      </Group>
    </Page>
  )
}

const mapStateToProps = ({
  isOpenFileLoad,
  token,
  openFileOption
}: Store) => ({
  isOpenFileLoad,
  token,
  openFileOption
})

const mapDispatchToProps = {
  setIsOpenFileLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(Finder)