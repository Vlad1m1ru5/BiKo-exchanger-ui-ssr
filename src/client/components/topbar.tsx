import styled from "styled-components";

const Topbar = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.brand.spec.blue};
  box-shadow: ${({ theme }) => theme.box.shadow.bottom};
  color: #fbfbfb;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  position: sticky;
  top: 0;

  & > * {
    margin-left: ${({ theme }) => theme.atom.margin};
    margin-right: ${({ theme }) => theme.atom.margin};
  }

  & > *:not(:first-child) {
    flex-grow: 1;
    justify-content: space-between;
  }
`

export default Topbar