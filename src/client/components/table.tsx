import styled from 'styled-components'

export const TableWrapper = styled.table<{ theme: Theme }>`
  border-collapse: separate;
  border-spacing: ${({ theme }) => theme.atom.margin};
  flex-direction: column;
  margin: ${({ theme }) => theme.atom.margin};
  width: 100%;

  * {
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
  }
`

export const TableHead = styled.thead`
  & > * {
    cursor: default;
  }
  
  &:nth-child(odd) {
    font-weight: 600;
  }
`

export const TableBody = styled.tbody<{ theme: Theme }>`
  flex-direction: column;

  & > * {
    box-shadow: ${({ theme }) => theme.box.shadow.top};
    cursor: pointer;

    &:hover {
      box-shadow: ${({ theme }) => theme.input.shadow.hover};
    }
  }
`

export const TableRow = styled.tr`
  justify-content: space-evenly;
`

export const TableCell = styled.td<{ theme: Theme }>`
  padding: ${({ theme }) => theme.atom.margin};
  text-align: center;
  white-space: nowrap;
  width: fit-content;
`