import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import AutoComplete from './AutoComplete'
import starWarsNames from 'starwars-names'
import theme from '../styles/theme'

const StyledContainer = styled.div`
  position: fixed;
  top: 16%;
  left: 50%;
  transform: translate(-50%);
  color: ${props => props.theme.color.text.primary};

  & *:not(img) {
    box-sizing: border-box;
  }
`

export default function() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <AutoComplete items={starWarsNames.all} />
      </StyledContainer>
    </ThemeProvider>
  )
}
