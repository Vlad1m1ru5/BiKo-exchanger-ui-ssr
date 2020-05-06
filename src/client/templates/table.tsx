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
    [key: string]: string
  }[]
}

const Table: React.FC<Props> = ({ headers, items }) => {
  const thsList = headers.map(header => <TableCell key={header}>{header}</TableCell>)
  const trsList = items.map((item, index) => {
    const tdsList = Object.keys(item)
      .map(key => item[key])
      .map(value => (
        <TableCell
          key={value}
        >{value}</TableCell>
      ))

    return <TableRow key={index}>{tdsList}</TableRow>
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