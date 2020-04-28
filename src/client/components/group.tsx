import styled from 'styled-components'

const Group = styled.div<{
  direction: 'column' | 'row',
  theme: Theme
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  justify-content: flex-start;

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

  & > *:not(:last-child) {
    ${({ direction, theme }) => {
      switch (direction) {
        case 'column':
          return `margin-bottom: ${theme.atom.margin};`
        case 'row':
        default:
          return `margin-right: ${theme.atom.margin};`
      }
    }}
  }
`

export default Group