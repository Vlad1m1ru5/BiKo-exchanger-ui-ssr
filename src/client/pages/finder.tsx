import React from 'react'
import { connect } from 'react-redux'
import Page from 'client/components/page'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'

const Finder: React.FC = () => {

  return (
    <Page>
      <TopbarMenu>
        <h2>Поисковик</h2>
      </TopbarMenu>
      <SidebarMenu />
    </Page>
  )
}

export default Finder