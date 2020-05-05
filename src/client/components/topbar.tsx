import styled from "styled-components";

const Topbar = styled.div<{ theme: Theme }>`
  background-color: cornflowerblue;
  box-shadow: ${({ theme }) => theme.component.shadow.middle};
  color: #fbfbfb;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  position: sticky;

  & > *:not(:first-child) {
    flex-grow: 1;
  }
`

export default Topbar