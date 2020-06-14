import styled from "styled-components";

const Item = styled.li<{ theme: Theme }>`
  cursor: pointer;
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.atom.margin};
  }
`

export default Item