import Button from 'client/components/button'
import { Headline } from 'client/components/fonts'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import React from 'react'
import Prompt from 'client/components/prompt'
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
      <Prompt title='Меню'>
        <Button onClick={setIsOpenMenu}>
        <Icon src={srcHamburger} />
        </Button>
      </Prompt>
      <Headline>BIKO</Headline>
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