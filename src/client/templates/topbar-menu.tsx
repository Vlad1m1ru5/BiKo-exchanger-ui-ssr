import Button from 'client/components/button'
import Concealer from 'client/components/concealer'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import Prompt from 'client/components/prompt'
import React, { useState, useEffect } from 'react'
import Topbar from 'client/components/topbar'
import srcHamburger from 'assets/icons/Hamburger.svg'
import { Headline } from 'client/components/fonts'
import { setIsOpenMenu } from 'store/actions'
import { connect } from 'react-redux'

interface Props {
  isOpenMenu: boolean
  setIsOpenMenu: action
  token: string
}

const TopbarMenu: React.FC<Props> = ({
  children,
  isOpenMenu,
  setIsOpenMenu,
  token
}) => {
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('hidden')

  useEffect(() => {
    const visibility = !!token ? 'visible' : 'hidden'
    setVisibility(visibility)
  }, [token])

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <Topbar>
      <Group direction='row'>
        <Concealer visibility={visibility}>
          <Prompt title='Меню'>
            <Button onClick={openMenu}>
            <Icon src={srcHamburger} />
            </Button>
          </Prompt>
        </Concealer>
        <Headline>BIKO</Headline>
      </Group>
      <Group direction='row'>
        {children}
      </Group>
    </Topbar>
  )
}

const mapStateToProps = ({ isOpenMenu, token }: Store) => ({
  isOpenMenu,
  token
})

const mapDispatchToProps = {
  setIsOpenMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(TopbarMenu)