import React from 'react'

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableWrapper,
} from 'client/components/table'

interface Props {
  headers: string[]
  items: {
    onClick: action
    values: { [key: string]: any }
  }[]
}

const Table: React.FC<Props> = ({ headers, items }) => {
  const thsList = headers.map(header => <TableCell key={header}>{header}</TableCell>)
  const trsList = items.map((item, index) => {
    const { onClick, values } = item

    const tdsList = Object.keys(values)
      .map((key, index) => (
        <TableCell key={index}>{values[key]}</TableCell>
      ))

    return (
      <TableRow
        key={index}
        onClick={onClick}
      >{tdsList}</TableRow>)
  })

  return (
    <TableWrapper>
      <TableHead>
        <TableRow>{thsList}</TableRow>
      </TableHead>
      <TableBody>
        {trsList}
      </TableBody>
    </TableWrapper>
  )
}

export default Table