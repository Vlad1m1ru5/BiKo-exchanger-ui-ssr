import styled from "styled-components";

const Caption = styled.span<{ theme: Theme }>`
  font-size: 12px;
  line-height: 16px;
  padding: ${({ theme }) => theme.atom.margin};
  white-space: pre;
`

export default Caption