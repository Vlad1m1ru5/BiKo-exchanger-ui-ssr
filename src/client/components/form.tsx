import styled from 'styled-components'

const Form = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.atom.margin};
  }
`

export default Form