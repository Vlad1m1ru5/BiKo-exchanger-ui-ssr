import Button from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Item from 'client/components/item'
import Page from 'client/components/page'
import React, { useEffect, useState, Suspense } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import { filesApi } from 'client/api'
import svgSearch from 'assets/icons/Search.svg'
import { Subtitle, Title } from 'client/components/fonts'
import { connect } from 'react-redux'
import { getDate } from 'client/utils'
import { setOpenFileId, setIsOpenFileEditor } from 'store/actions'

const FileEditor = React.lazy(() => import('client/templates/file-editor'))
const Table = React.lazy(() => import('client/templates/table'))

interface Props {
  isOpenFileEditor: boolean
  setIsOpenFileEditor: action
  setOpenFileId: action
  token: string
  userName: string
}

interface Tags {
  applyed: string[]
  alias: string
}

const Feed: React.FC<Props> = ({
  isOpenFileEditor,
  setIsOpenFileEditor,
  setOpenFileId,
  token,
  userName
}) => {
  const [error, setError] = useState<Error | null>(null)
  const [filesMetadataList, setFilesMetadataList] = useState<FileMetadata[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tags, setTags] = useState<Tags>({
    applyed: [],
    alias: ''
  })

  useEffect(() => {
    const loadFilesMetadataList = async () => {
      try {
        const filesMetadataList = await filesApi.getFilesMetadata(token)
        setFilesMetadataList(filesMetadataList)
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
  }, [isLoading])

  const changeTagsSuper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const alias = value.replace(',', '')

    setTags({
      ...tags,
      alias
    })
  }

  const applyTags = () => {
    const willApplyTags = tags.alias
      .trim()
      .split(' ')
      .filter(tag => !!tag)

    const applyed = Array.from(new Set([ ... willApplyTags ]))

    setTags({
      ...tags,
      applyed
    })
  }

  const hasTargetTag = (fileMetadata: FileMetadata) => (
    !tags.applyed.length || 
    fileMetadata.tags.some(tag => tags.applyed.indexOf(tag) + 1)
  )

  const headers = ['Название файла', 'Владелец', 'Последнее изенение', 'Размер']
  const items = filesMetadataList
    .filter(hasTargetTag)
    .map(({ id, mtime, name, owner, size }) => {
      const lastModificationDate = getDate(mtime)  
      const master = owner === userName ? 'Я' : owner
      const onClick = () => { 
        setOpenFileId(id)
        setIsOpenFileEditor(true)
      }
      const weight = size + 'КБ'

      return { 
        onClick,
        values: {
          name,
          master,
          lastModificationDate,
          weight
        }
      }
    })

  return (
    <Page>
      <TopbarMenu>
        <Title>Лента</Title>
        <Item>
          <Input
            onChange={changeTagsSuper}
            placeholder='Тэги'
            type='text'
          />
          <Button onClick={applyTags}>
            <Icon src={svgSearch}/>
          </Button>
        </Item>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        {!!error && <Subtitle>{error.message}</Subtitle>}
        {isLoading && (
          <Subtitle>Загрузка</Subtitle>
        ) || (
          <Suspense fallback='Подождите...'>
            <Table 
              headers={headers}
              items={items}
            />
          </Suspense>
        )}
        {isOpenFileEditor && (
          <Suspense fallback='Подождите...'>
            <FileEditor/>
          </Suspense>
        )}
      </Group>
    </Page>
  )
}

const mapStateToProps = ({
  token, 
  isOpenFileEditor,
  userName
}: Store) => ({
  token,
  isOpenFileEditor,
  userName
})

const mapDispatchToProps = {
  setIsOpenFileEditor,
  setOpenFileId
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)