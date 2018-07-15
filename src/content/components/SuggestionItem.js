import React from 'react'
import styled from 'styled-components'
import Clipboard from 'react-clipboard.js'

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

export default class SuggestionItem extends React.Component {
  render() {
    const { name, value } = this.props

    return (
      <Clipboard
        component="div"
        data-clipboard-text={value}
        button-title="click -> clipboard">
        <StyledItem>
          <span>{name}</span>
          <small>{value}</small>
        </StyledItem>
      </Clipboard>
    )
  }
}
