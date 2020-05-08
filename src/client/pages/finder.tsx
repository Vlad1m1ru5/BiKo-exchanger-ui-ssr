import React from 'react'
import Page from 'client/components/page'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'
import { Title } from 'client/components/fonts'

const Finder: React.FC = () => {

  return (
    <Page>
      <TopbarMenu>
        <Title>Поисковик</Title>
      </TopbarMenu>
      <SidebarMenu />
    </Page>
  )
}

export default Finder