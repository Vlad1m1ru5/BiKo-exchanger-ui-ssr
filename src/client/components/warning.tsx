import styled from "styled-components"

const Warning = styled.div<{
  isVisible: boolean,
  title: string
}>`
  color: indianred;
  display: inline-block;
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
`

export default Warning