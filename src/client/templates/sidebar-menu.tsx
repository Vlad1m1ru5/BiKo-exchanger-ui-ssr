import Box from 'client/components/box'
import Button from 'client/components/button'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import Label from 'client/components/label'
import React from 'react'
import Sidebar from 'client/components/sidebar'
import Title from 'client/components/title'
import actions from 'store/actions'
import svgArrow from 'assets/icons/Arrow.svg'
import svgExit from 'assets/icons/Exit.svg'
import svgFeed from 'assets/icons/Feed.svg'
import svgFinder from 'assets/icons/Finder.svg'
import svgSettings from 'assets/icons/Settings.svg'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface Props {
  authority: string
  isOpenMenu: boolean
  setAuthority: any
}

const SidebarMenu: React.FC<Props> = ({
  authority,
  isOpenMenu,
  setAuthority
}) => {
  const history = useHistory()

  const goToLogin = () => {
    history.push('/login')
  }

  const clickExit = () => {
    setAuthority('')
  }

  return (
    <Sidebar isVisible={isOpenMenu}>
      <Group direction='column'>
        <Box level='top'>
          <Group direction='row'>
            {authority || 'Не авторизирован'}
          </Group>
        </Box>
          {!!authority && (
            <Group direction='column'>
              <Label>
                <Icon src={svgFeed}/>
                Лента
              </Label>
              <Label>
                <Icon src={svgFinder}/>
                Поисковик
              </Label>
              <Label>
                <Icon src={svgSettings}/>
                Настройки
              </Label>
            </Group>
          )}
        <Box level='top'>
          <Group direction='row'>
            {!authority && (
              <Title title='Войти'>
                <Button onClick={goToLogin}>
                  <Icon src={svgArrow} />
                </Button>
              </Title>
            ) || (
              <Title title='Выйти'>
                <Button onClick={clickExit}>
                  <Icon src={svgExit} />
                </Button>
              </Title>
            )}
          </Group>
        </Box>
      </Group>
    </Sidebar>
  )
}

const mapStateToProps = ({ authority, isOpenMenu }: Store) => ({
  authority,
  isOpenMenu
})

const mapDispatchToProps = {
  setAuthority: actions.setAuthority
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)