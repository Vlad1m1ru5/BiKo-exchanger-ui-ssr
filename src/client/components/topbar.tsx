import styled from "styled-components";

const Topbar = styled.div<{ theme: Theme }>`
  background-color: cornflowerblue;
  box-shadow: ${({ theme }) => theme.component.shadow.middle};
  color: #fbfbfb;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.atom.margin};
  }

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.atom.margin};
  }
`

export default Topbar