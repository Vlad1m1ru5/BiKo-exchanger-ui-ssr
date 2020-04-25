import React from 'react'
import styled from 'styled-components'

const Label = styled.label``

const Input = styled.input`
  ${(props) => {
    switch (props.type) {
      case 'text':
        return `
          border-radius: 5px;
        `
      default:
        return
    }
  }}
`

const LabeledInput = ({ label, type }) => (
  <Label>
    {label}<br />
    <Input type={type}></Input>
  </Label>
)

export default LabeledInput