import styled from 'styled-components'

const Group = styled.div<{
  direction: 'column' | 'row',
  theme: Theme
}>`
  align-items: center;
  border-radius: ${({ theme }) => theme.atom.radius};
  display: flex;
  flex-direction: ${({ direction }) => direction};

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