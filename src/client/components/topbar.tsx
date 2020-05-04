import styled from "styled-components";

const Topbar = styled.div<{ theme: Theme }>`
  background-color: cornflowerblue;
  color: #fbfbfb;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: ${({ theme }) => theme.atom.size};
  justify-content: center;
`

export default Topbar