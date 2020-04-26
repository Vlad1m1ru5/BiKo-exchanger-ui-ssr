import styled from 'styled-components'

const Input = styled.input<{
  onChange: () => void,
  type: 'checkbox' | 'text'
}>`
  border-radius: ${({ type }) => type === 'text' ? '5px' : 'none'};
  height: 24;
`

export default Input