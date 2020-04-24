import styled from 'styled-components'

/**
 * @param {{ direction }} props
 * @field {'column' | 'row'} direction
 */
const Group = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    margin-left: 5px;
    margin-right: 5px;
  }
`

export default Group