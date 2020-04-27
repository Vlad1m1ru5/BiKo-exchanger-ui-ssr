import React from 'react'
import Input from 'client/components/input'
import Warning from 'client/components/warning'

interface Props {
  label: string,
  onChange: action
  type: 'checkbox' | 'text'
  isInvalid: boolean
}

const LabeledInput: React.FC<Props> = ({ 
  label,
  onChange,
  type,
  isInvalid
}) => (
  <div>
    <label>
      {label}
      {isInvalid && (
        <Warning>*</Warning>
      )}<br />
      <Input 
        onChange={onChange}
        type={type}
      />
    </label>
  </div>
)

export default LabeledInput