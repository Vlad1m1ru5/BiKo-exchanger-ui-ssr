import styled from 'styled-components'

const Group = styled.div<{
  direction: 'column' | 'row',
  theme: Theme
}>`
  align-items: center;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: min-content;

  & > *:not(:first-child) {
    ${({ direction, theme }) => {
      switch (direction) {
        case 'column':
          return `margin-top: ${theme.atom.margin};`
        case 'row':
        default:
          return `margin-left: ${theme.atom.margin};`
      }
    }}
  }
`

export default Group