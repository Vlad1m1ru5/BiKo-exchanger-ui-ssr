import React from 'react'
import Button from 'client/components/button'

interface Props {
  onClick: action 
  title: string
}

const TiteledButton: React.FC<Props> = ({
  children,
  onClick,
  title
}) => (
  <div title={title}>
    <Button onClick={onClick}>{children}</Button>
  </div>
)

export default TiteledButton