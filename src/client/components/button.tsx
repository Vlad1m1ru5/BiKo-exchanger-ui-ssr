import styled from "styled-components"

const Button = styled.button<{
  onClick: action,
  theme: Theme
}>`
  background-color: ${({ theme }) => theme.brand.background};
  border: 2px solid ${({ theme }) => theme.brand.spec.blue};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.input.shadow.active};
  cursor: pointer;
  display: flex;
  padding: 0;

  &:hover {
    box-shadow: ${({ theme }) => theme.input.shadow.hover};
  }
`

export const SpecialButton = styled(Button)<{ spec: spec, theme: Theme }>`
  border: 2px solid ${({ spec, theme }) => {
    switch (spec) {
      case 'danger':
        return theme.brand.spec.red
      case 'help':
        return theme.brand.spec.green
      default:
        return theme.brand.spec.blue
    }
  }};
`

export default Button