import styled from 'styled-components'

const Modal = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.brand.background};
  box-shadow: ${({ theme }) => theme.box.shadow.bottom};
  position: absolute;
  margin: ${({ theme }) => theme.atom.margin};
  overflow: hidden;
  top: 0;
  width: 596px;
`

export default Modal