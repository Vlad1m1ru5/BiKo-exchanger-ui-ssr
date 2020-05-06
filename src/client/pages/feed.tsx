import Button from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Item from 'client/components/item'
import Page from 'client/components/page'
import React, { useEffect, useState, Suspense } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import Table from 'client/templates/table'
import TopbarMenu from 'client/templates/topbar-menu'
import api from 'client/api'
import svgSearch from 'assets/icons/Search.svg'
import { connect } from 'react-redux'
import { getDate } from 'client/utils'

interface Props {
  token: string
}

interface Tags {
  applyed: string[]
  alias: string
}

const Feed: React.FC<Props> = ({ token }) => {
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
        const filesMetadataList = await api.getFilesMetadata(token)

        setFilesMetadataList(filesMetadataList)
        setError(null)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFilesMetadataList()
  }, [])

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
    .map(({ name, owner, mtime, size }) => {
      const modificationDate = getDate(mtime)   
      const weight = size + 'КБ'

      return {
        name,
        owner,
        modificationDate,
        weight
      }
    })

  return (
    <Page>
      <TopbarMenu>
        <h2>Лента</h2>
        <Item>
          <Input
            onChange={changeTagsSuper}
            type='text'
          />
          <Button onClick={applyTags}>
            <Icon src={svgSearch}/>
          </Button>
        </Item>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        {isLoading && <h3>Загрузка</h3>}
        {!!error && <h3>{error.message}</h3>}
        <Suspense fallback='Подождите...'>
          <Table 
            headers={headers}
            items={items}
          />
        </Suspense>
      </Group>
    </Page>
  )
}

const mapStateToProps = ({ token }: Store) => ({
  token
})

export default connect(mapStateToProps)(Feed)