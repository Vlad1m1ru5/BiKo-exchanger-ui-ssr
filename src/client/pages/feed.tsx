import Group from 'client/components/group'
import Page from 'client/components/page'
import React, { useEffect, useState } from 'react'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import api from 'client/api'
import { connect } from 'react-redux'

interface Props {
  token: string
}

const Feed: React.FC<Props> = ({ token }) => {
  const [filesMetadataList, setFilesMetadataList] = useState<FileMetadata[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadFilesMetadataList = async () => {
      try {
        const filesMetadataList = await api.getFilesMetadata(token)

        setFilesMetadataList(filesMetadataList)
        setError(null)
      } catch (error) {
        setError(error)
      }
    }

    loadFilesMetadataList()
  }, [])

  const getTable = (headers: string[], dataList: any[]) => {
    const thsList = headers.map((header, index) => <th key={index}>{header}</th>)

    const trsList = dataList.map((data, index) => {
      const tdsList = Object.keys(data)
        .map(dataKey => data[dataKey])
        .map((dataItem, index) => <td key={index}>{String(dataItem)}</td>)

      return <tr key={index}>{tdsList}</tr>
    }) 

    return (
      <table>
        <thead>
          <tr>
            {thsList}
          </tr>
        </thead>
        <tbody>
          {trsList}
        </tbody>
      </table>
    )
  } 

  const headers = ['Имя файла', 'Дата создания', 'Дата редактирования']
  const table = getTable(headers, filesMetadataList)

  return (
    <Page>
      <TopbarMenu>
        <h2>Лента</h2>
      </TopbarMenu>
      <Group direction='column'>
        {table}
      </Group>
      <SidebarMenu />
    </Page>
  )
}

const mapStateToProps = ({ token }: Store) => ({
  token
})

export default connect(mapStateToProps)(Feed)