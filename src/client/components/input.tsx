import React from 'react'

interface Props {
  label: string
  type: 'checkbox' | 'text'
}

const Input: React.FC<Props> = ({ label, type }) => (
  <div>
    <label>
      {label}<br />
      <input type={type}></input>
    </label>
  </div>
)

export default Input