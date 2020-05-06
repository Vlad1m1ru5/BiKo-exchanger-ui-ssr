import styled from 'styled-components'

export const TableWrapper = styled.table<{ theme: Theme }>`
  border-collapse: collapse;
  flex-direction: column;
  margin: ${({ theme }) => theme.atom.margin};
  width: 100%;

  * {
    border-bottom: 1px solid ${({ theme }) => theme.brand.color};
    border-top: 1px solid ${({ theme }) => theme.brand.color};
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
    cursor: pointer;
  }

  & > *:nth-child(odd) {
    background-color: ${({ theme }) => theme.brand.shade};
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