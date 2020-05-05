import Box from 'client/components/box'
import Group from 'client/components/group'
import React from 'react'
import Sidebar from 'client/components/sidebar'
import { connect } from 'react-redux'

interface Props {
  authority: string
  isOpenMenu: boolean
}

const SidebarMenu: React.FC<Props> = ({
  authority,
  isOpenMenu
}) => (
  <Sidebar isVisible={isOpenMenu}>
    <Group direction='column'>
      <Box>
        {authority || 'Не авторизирован'}
      </Box>
      {!!(authority) && (
        <div>{authority}</div>
      ) || (
        <div></div>
      )}      
    </Group>
  </Sidebar>
)

const mapStateToProps = ({ authority, isOpenMenu }: Store) => ({
  authority,
  isOpenMenu
})

export default connect(mapStateToProps)(SidebarMenu)