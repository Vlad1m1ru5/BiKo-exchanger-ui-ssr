import Button from 'client/components/button'
import Group from 'client/components/group'
import Icon from 'client/components/icon'
import Input from 'client/components/input'
import Item from 'client/components/item'
import Page from 'client/components/page'
import React, { useEffect, useState } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import Table from 'client/templates/table'
import TopbarMenu from 'client/templates/topbar-menu'
import Warning from 'client/components/warning'
import api from 'client/api'
import svgInfo from 'assets/icons/Info.svg'
import svgSearch from 'assets/icons/Search.svg'
import { connect } from 'react-redux'
import { getDate } from 'client/utils'

interface Props {
  token: string
}

const Feed: React.FC<Props> = ({ token }) => {
  const [error, setError] = useState<Error | null>(null)
  const [filesMetadataList, setFilesMetadataList] = useState<FileMetadata[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tags, setTags] = useState<string[]>([])

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

  const getFileInfo = ({ owner, mtime, name, tags, size }: FileMetadata) => {
    const isVisible = !!tags.length
    const title = tags.join(', ')
    const modification = getDate(mtime)

    return (
    <Item>
      <span>{name}</span>
      <span>{owner}</span>
      <span>{modification}</span>
      <span>{size}</span>
      <Warning 
        isVisible={isVisible}
        title={title}
      >
        <Icon src={svgInfo} />
      </Warning>
    </Item>
  )
}
  const hasTargetTag = (fileMetadata: FileMetadata) => (
    !tags.length || 
    fileMetadata.tags.some(tag => tags.indexOf(tag) + 1)
  )

  const setFilterTags = () => {
    
  }

  const headers = ['Название файла', 'Владелец', 'Последнее изенение', 'Размер']
  const items = filesMetadataList.map(({ name, owner, mtime, size }) => {
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
            onChange={() => {}}
            type='text'
          />
          <Button onClick={setFilterTags}>
            <Icon src={svgSearch}/>
          </Button>
        </Item>
      </TopbarMenu>
      <SidebarMenu />
      <Group direction='column'>
        {isLoading && <h3>Загрузка</h3>}
        {!!error && <h3>{error.message}</h3>}
        <Table 
          headers={headers}
          items={items}
        />
      </Group>
    </Page>
  )
}

const mapStateToProps = ({ token }: Store) => ({
  token
})

export default connect(mapStateToProps)(Feed)