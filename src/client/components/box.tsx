import styled from "styled-components";

const Box = styled.div<{
  level: 'bottom' | 'middle' | 'top',
  theme: Theme
}>`
  box-shadow: ${({ level, theme }) => theme.box.shadow[level]};
  display: flex;
  width: 100%;

  & > * {
    margin: ${({ theme }) => theme.atom.margin};
    width: 100%;
  }
`

export default Box