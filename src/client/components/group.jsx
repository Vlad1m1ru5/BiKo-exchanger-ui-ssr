import styled from 'styled-components'

const Group = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
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