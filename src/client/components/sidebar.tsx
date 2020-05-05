import styled from 'styled-components'

const Sidebar = styled.div<{ isVisible: boolean, theme: Theme }>`
  position: absolute;
  margin: ${({ theme }) => theme.atom.margin};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
`

export default Sidebar