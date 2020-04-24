import React from 'react'
import styled from 'styled-components'


/**
 * 
 * @param {{ label, type }} param0
 * @field {string} label
 * @field {'text' | 'checkbox'} type 
 */
const Input = ({ label, type }) => (
  <label>
    {label} 
    <input type={type}></input>
  </label>
)

export default Input