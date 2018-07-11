import React from 'react'
import styled from 'styled-components'
import Suggestions from './Suggestions'
import starWarsNames from 'starwars-names'

const StyledContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  width: 200px;
`

export default function({ className }) {
  return (
    <StyledContainer>
      <Suggestions items={starWarsNames.all} />
    </StyledContainer>
  )
}
