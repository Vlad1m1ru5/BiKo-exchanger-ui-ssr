import styled from "styled-components"

const Button = styled.button<{ theme: Theme }>`
  background-color: transparent;
  border: 2px solid cornflowerblue;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.input.shadow.active};
  height: ${({ theme }) => theme.atom.size};
  width: ${({ theme }) => theme.atom.size};

  &:hover {
    box-shadow: ${({ theme }) => theme.input.shadow.hover};
  }
`

export default Button