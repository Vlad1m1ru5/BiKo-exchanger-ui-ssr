import React from 'react'
import Button from 'client/components/button'

interface Props {
    title: string
}

const TiteledButton: React.FC<Props> = ({ title }) => (
    <div title={title}>
        <Button />
    </div>
)

export default TiteledButton