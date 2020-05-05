import styled from "styled-components";

const Box = styled.div<{
  level: 'bottom' | 'middle' | 'top',
  theme: Theme
}>`
  box-shadow: ${({ level, theme }) => theme.box.shadow[level]};
  width: 100%;

  & > * {
    margin: ${({ theme }) => theme.atom.margin};
  }
`

export default Box