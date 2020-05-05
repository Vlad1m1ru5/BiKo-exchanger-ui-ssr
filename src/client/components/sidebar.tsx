import styled from 'styled-components'

const Sidebar = styled.div<{
  isVisible: boolean,
  theme: Theme
}>`
  background-color: ${({ theme }) => theme.brand.background};
  border-radius: ${({ theme }) => theme.atom.radius};
  box-shadow: ${({ theme }) => theme.box.shadow.middle};
  position: absolute;
  margin: ${({ theme }) => theme.atom.margin};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
`

export default Sidebar