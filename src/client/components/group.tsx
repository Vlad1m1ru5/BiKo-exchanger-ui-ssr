import styled from 'styled-components'

const Group = styled.div<{ direction: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  justify-content: space-between;

  & > *:not(:first-child) {
    margin-left: 5px;
  }

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`

export default Group