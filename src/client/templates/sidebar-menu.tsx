import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from 'client/components/box'
import { SpecialButton } from 'client/components/button'
import Icon from 'client/components/icon'
import Item from 'client/components/item'
import Group from 'client/components/group'
import Menu from 'client/components/menu'
import Prompt from 'client/components/prompt'
import Sidebar from 'client/components/sidebar'
import { Caption, Description } from 'client/components/fonts'

import svgExit from 'assets/icons/Exit.svg'
import svgFeed from 'assets/icons/Feed.svg'
import svgFinder from 'assets/icons/Finder.svg'
import svgSettings from 'assets/icons/Settings.svg'

import { setToken, setIsOpenMenu } from 'store/actions'

interface Props {
  token: string
  isOpenMenu: boolean
  setToken: action
  setIsOpenMenu: action
  userName: string
}

const SidebarMenu: React.FC<Props> = ({
  token,
  isOpenMenu,
  setToken,
  setIsOpenMenu,
  userName
}) => {

  const clickExit = () => {
    setToken('')
    setIsOpenMenu(false)
  }

  return (
    <Sidebar isVisible={isOpenMenu}>
      <Group direction='column'>
        <Box level='top'>
          <Group direction='row'>
            {!!token && userName || 'Не авторизирован'}
          </Group>
        </Box>
          {!!token && (
            <Menu>
              <Link to='/feed'>
                <Item>
                  <Icon src={svgFeed}/>
                  <Description>Лента</Description>
                </Item>
              </Link>
              <Link to='/finder'>
                <Item>
                  <Icon src={svgFinder}/>
                  <Description>Поисковик</Description>
                </Item>
              </Link>
              <Link to='/settings'>
                <Item>
                  <Icon src={svgSettings}/>
                  <Description>Настройки</Description>
                </Item>
              </Link>
            </Menu>
          )}
        <Box level='top'>
          <Group direction='row'>
            {token && (
              <Prompt title='Выйти'>
                <SpecialButton
                  onClick={clickExit}
                  spec='danger'
                >
                  <Icon src={svgExit} />
                  <Caption>Выйти</Caption>
                </SpecialButton>
              </Prompt>
            )}
          </Group>
        </Box>
      </Group>
    </Sidebar>
  )
}

const mapStateToProps = ({ token, isOpenMenu, userName }: Store) => ({
  token,
  isOpenMenu,
  userName
})

const mapDispatchToProps = {
  setToken,
  setIsOpenMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)