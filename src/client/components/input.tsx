import React from 'react'

interface Props {
  label: string
  type: 'checkbox' | 'text'
}

const Input: React.FC<Props> = ({ label, type }) => (
  <label>
    {label} 
    <input type={type}></input>
  </label>
)

export default Input