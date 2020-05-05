import Button from 'client/components/button'
import Icon from 'client/components/icon'
import Group from 'client/components/group'
import React from 'react'
import Title from 'client/components/title'
import Topbar from 'client/components/topbar'
import srcHamburger from 'assets/icons/Hamburger.svg'

const TopbarMenu: React.FC = ({ children}) => (
  <Topbar>
    <Group direction='row'>
      <Title title='Меню'>
        <Button onClick={() => {}}>
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

export default TopbarMenu