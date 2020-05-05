import styled from "styled-components";

const Topbar = styled.div<{ theme: Theme }>`
  background-color: cornflowerblue;
  box-shadow: ${({ theme }) => theme.box.shadow.middle};
  color: #fbfbfb;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  position: sticky;

  & > * {
    margin-left: ${({ theme }) => theme.atom.margin};
    margin-right: ${({ theme }) => theme.atom.margin};
  }

  & > *:not(:first-child) {
    flex-grow: 1;
  }
`

export default Topbar