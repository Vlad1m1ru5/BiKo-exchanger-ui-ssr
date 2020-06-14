import styled from "styled-components";

const Concealer = styled.div<{ visibility: 'hidden' | 'visible' }>`
  visibility: ${({ visibility }) => visibility};
`

export default Concealer