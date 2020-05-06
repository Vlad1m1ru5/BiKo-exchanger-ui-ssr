import Button from 'client/components/button'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import React from 'react'
import Title from 'client/components/title'
import Topbar from 'client/components/topbar'
import srcHamburger from 'assets/icons/Hamburger.svg'
import { setIsOpenMenu } from 'store/actions'
import { connect } from 'react-redux'

interface Props {
  setIsOpenMenu: action
}

const TopbarMenu: React.FC<Props> = ({
  children,
  setIsOpenMenu
}) => (
  <Topbar>
    <Group direction='row'>
      <Title title='Меню'>
        <Button onClick={setIsOpenMenu}>
        <Icon src={srcHamburger} />
        </Button>
      </Title>
      <h1>BIKO</h1>
    </Group>
    <Group direction='row'>
      {children}
    </Group>
  </Topbar>
)

const mapDispatchToProps = {
  setIsOpenMenu
}

export default connect(null, mapDispatchToProps)(TopbarMenu)