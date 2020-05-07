import styled from 'styled-components'

const Modal = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.brand.background};
  position: absolute;
  margin: ${({ theme }) => theme.atom.margin};
  top: 0;
`

export default Modal