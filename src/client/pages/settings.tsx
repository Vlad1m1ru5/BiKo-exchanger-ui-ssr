import React from 'react'
import Page from 'client/components/page'
import SidebarMenu from 'client/templates/sidebar-menu'
import TopbarMenu from 'client/templates/topbar-menu'

const Settings: React.FC = () => {

  return (
    <Page>
      <TopbarMenu>
        <h2>Настройки</h2>
      </TopbarMenu>
      <SidebarMenu />
    </Page>
  )
}

export default Settings