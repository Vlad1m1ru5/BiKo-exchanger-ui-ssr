import Box from 'client/components/box'
import Button, { SpecialButton } from 'client/components/button'
import Icon from 'client/components/icon'
import Item from 'client/components/item'
import Group from 'client/components/group'
import Menu from 'client/components/menu'
import Prompt from 'client/components/prompt'
import React from 'react'
import Sidebar from 'client/components/sidebar'
import svgArrow from 'assets/icons/Arrow.svg'
import svgArrowLeft from 'assets/icons/Arrow-Left.svg'
import svgExit from 'assets/icons/Exit.svg'
import svgFeed from 'assets/icons/Feed.svg'
import svgFinder from 'assets/icons/Finder.svg'
import svgSettings from 'assets/icons/Settings.svg'
import { connect } from 'react-redux'
import { setToken, setIsOpenMenu } from 'store/actions'
import { useHistory, Link } from 'react-router-dom'

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
  const history = useHistory()

  const goToLogin = () => {
    history.push('/login')
  }

  const clickExit = () => {
    setToken('')
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
                  Лента  
                </Item>
              </Link>
              <Link to='/finder'>
                <Item>
                  <Icon src={svgFinder}/>
                  Поисковик
                </Item>
              </Link>
              <Link to='/settings'>
                <Item>
                  <Icon src={svgSettings}/>
                  Настройки
                </Item>
              </Link>
            </Menu>
          )}
        <Box level='top'>
          <Group direction='row'>
            {!token && (
              <Prompt title='Войти'>
                <SpecialButton
                  onClick={goToLogin}
                  spec='help'  
                >
                  <Icon src={svgArrow} />
                </SpecialButton>
              </Prompt>
            ) || (
              <Prompt title='Выйти'>
                <SpecialButton
                  onClick={clickExit}
                  spec='danger'
                >
                  <Icon src={svgExit} />
                </SpecialButton>
              </Prompt>
            )}
            <Prompt title='Закрыть'>
              <Button onClick={setIsOpenMenu}>
                <Icon src={svgArrowLeft} />
              </Button>
            </Prompt>
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