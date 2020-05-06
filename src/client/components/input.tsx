import styled from 'styled-components'

const Input = styled.input<{
  onChange: action,
  theme: Theme,
  type: 'checkbox' | 'email' | 'password' | 'text'
}>`
  border-radius: ${({ type }) => type === 'checkbox' ? 'none' : '5px'};
  border: none;
  box-shadow: ${({ theme }) => theme.input.shadow.active};
  height: ${({ theme }) => theme.atom.size};
  padding-left: ${({ theme }) => theme.atom.margin};

  &:hover {
    box-shadow: ${({ theme }) => theme.input.shadow.hover};
  }
`

export default Input