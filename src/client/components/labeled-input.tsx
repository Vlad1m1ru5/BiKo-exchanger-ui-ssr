import React from 'react'
import Input from 'client/components/input'

interface Props {
  label: string,
  onChange: action
  type: 'checkbox' | 'text'
  warning: string
}

const LabeledInput: React.FC<Props> = ({ 
  label,
  onChange,
  type,
  warning
}) => (
  <div>
    <label>
      {label}<br />
      <Input 
        onChange={onChange}
        type={type}
      />
    </label>
    {!!warning.length && (
      <span>{warning}</span>
    )}
  </div>
)

export default LabeledInput