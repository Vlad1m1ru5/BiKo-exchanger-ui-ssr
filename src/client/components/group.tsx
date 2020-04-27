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
    margin-left: ${({ theme }) => theme.atom.margin};
  }

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.atom.margin};
  }
`

export default Group