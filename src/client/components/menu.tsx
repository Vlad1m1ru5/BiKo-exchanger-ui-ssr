import styled from "styled-components";

const Menu = styled.ul<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin-left: ${({ theme }) => theme.atom.margin};
  margin-right: ${({ theme }) => theme.atom.margin};
  width: max-content;

  & > * {
    color: ${({ theme }) => theme.brand.color};
    text-decoration: none;
  }

  & > *:hover {
    color: ${({ theme }) => theme.brand.spec.blue};
  }
`

export default Menu