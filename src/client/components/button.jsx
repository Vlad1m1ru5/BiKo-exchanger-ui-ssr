import React from 'react'
import styled from 'styled-components'

const Round = styled.div`
  border: 1px solid #000000;
  border-radius: 24px;
  height: 48px;
  width: 48px;
`

const Button = ({  title }) => {

  return (
    <Round title={title}>

    </Round>
  )
}

export default Button