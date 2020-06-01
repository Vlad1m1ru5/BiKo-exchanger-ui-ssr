import styled from 'styled-components'

const Modal = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.brand.background};
  box-shadow: ${({ theme }) => theme.box.shadow.bottom};
  position: absolute;
  top: 0;
`

export default Modal