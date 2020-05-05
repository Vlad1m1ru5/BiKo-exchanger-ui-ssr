import styled from "styled-components";

const Box = styled.div<{ theme: Theme }>`
  box-shadow: ${({ theme }) => theme.box.shadow.top};
`

export default Box