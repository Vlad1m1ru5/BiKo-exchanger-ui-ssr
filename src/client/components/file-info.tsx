import styled from "styled-components";

const FileInfo = styled.div<{ theme: Theme }>`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.brand.color};
  border-top: 1px solid ${({ theme }) => theme.brand.color};
  display: flex;
  justify-content: space-evenly;
`

export default FileInfo