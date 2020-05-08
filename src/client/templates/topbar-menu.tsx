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
  isOpenMenu: boolean
  setIsOpenMenu: action
}

const TopbarMenu: React.FC<Props> = ({
  children,
  isOpenMenu,
  setIsOpenMenu
}) => {
  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <Topbar>
      <Group direction='row'>
        <Prompt title='Меню'>
          <Button onClick={openMenu}>
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
}

const mapStateToProps = ({ isOpenMenu }: Store) => ({
  isOpenMenu
})

const mapDispatchToProps = {
  setIsOpenMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(TopbarMenu)