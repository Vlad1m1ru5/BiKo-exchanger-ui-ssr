import styled from 'styled-components'

const Input = styled.input<{
  onChange: action,
  theme: Theme,
  type: 'checkbox' | 'email' | 'text'
}>`
  border-radius: ${({ type }) => type === 'text' ? '5px' : 'none'};
  border: none;
  box-shadow: ${({ theme }) => theme.input.shadow.active};
  height: ${({ theme }) => theme.atom.size};

  &:hover {
    box-shadow: ${({ theme }) => theme.input.shadow.hover};
  }
`

export default Input