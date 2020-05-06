import styled from "styled-components";

const Page = styled.div<{ theme: Theme }>`
  position: relative;

  & > *:last-child {
    margin-top: ${({ theme }) => theme.atom.margin};
  }
`

export default Page