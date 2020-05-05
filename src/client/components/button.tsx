import styled from "styled-components"

const Button = styled.button<{
  onClick: action,
  theme: Theme
}>`
  background-color: transparent;
  border: 2px solid cornflowerblue;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.input.shadow.active};
  cursor: pointer;
  display: flex;
  padding: 0;

  &:hover {
    box-shadow: ${({ theme }) => theme.input.shadow.hover};
  }
`

export default Button