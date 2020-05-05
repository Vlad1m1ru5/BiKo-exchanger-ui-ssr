import React from 'react'
import Sidebar from 'client/components/sidebar'
import { connect } from 'react-redux'

interface Props {
  isOpenMenu: boolean
}

const SidebarMenu: React.FC<Props> = ({ isOpenMenu }) => (
  <Sidebar isVisible={isOpenMenu}>
    Menu
  </Sidebar>
)

const mapStateToProps = ({ isOpenMenu }: Store) => ({
  isOpenMenu
})

export default connect(mapStateToProps)(SidebarMenu)