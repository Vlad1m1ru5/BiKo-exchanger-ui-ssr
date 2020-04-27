import React from 'react'
import Button from 'client/components/button'

interface Props {
  onClick: action 
  title: string
}

const TiteledButton: React.FC<Props> = ({
  onClick,
  title
}) => (
  <div title={title}>
    <Button 
      onClick={onClick}
    />
  </div>
)

export default TiteledButton