import styled from 'styled-components'

const Group = styled.div<{
  direction: 'column' | 'row',
  theme: Theme
}>`
  align-items: center;
  display: flex;
  flex-direction: ${({ direction }) => direction};

  & > * {
    ${({ direction, theme }) => {
      switch (direction) {
        case 'column':
          return `
            margin-top: ${theme.atom.margin};
            margin-bottom: ${theme.atom.margin};
          `
        case 'row':
        default:
          return `
            margin-left: ${theme.atom.margin};
            margin-right: ${theme.atom.margin};  
          `
      }
    }}
  }
`

export default Group