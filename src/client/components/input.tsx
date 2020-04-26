import styled from 'styled-components'

const Input = styled.input<{
  onChange: () => void,
  type: 'checkbox' | 'text'
}>`
  border-radius: ${({ type }) => type === 'text' ? '5px' : 'none'};
  border: none;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  height: 24;

  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3), 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
`

export default Input