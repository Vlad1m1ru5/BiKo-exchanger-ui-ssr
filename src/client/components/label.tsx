import styled from "styled-components";

const Label = styled.label<{ theme: Theme }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ theme }) => theme.atom.margin};
  margin-right: ${({ theme }) => theme.atom.margin};
`

export default Label