import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
  height: 48px;
  width: 500px;
  transition: box-shadow 0.2s;
  padding: 0 13px;
  display: flex;
  align-items: center;

  box-shadow: 0 20px 40px 4px ${props => props.theme.color.shadow.primary},
    0 0 0 1px ${props => props.theme.color.shadow.secondary};

  &:hover {
    box-shadow: 0 24px 44px 4px ${props => props.theme.color.shadow.primary},
      0 0 0 1px ${props => props.theme.color.shadow.secondary};
  }

  &::placeholder {
    color: ${props => props.theme.color.text.placeholder};
  }
`

const StyleInput = styled.input`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 8px;
  padding: 0;
  font-size: 1.2em;
  outline: none;
  border: none;
`

class SearchInput extends React.Component {
  render() {
    return (
      <InputWrapper>
        <span>🔍</span>
        <StyleInput
          autoFocus
          type="search"
          placeholder="What can I do for you 🎏"
          innerRef={this.props.inputRef}
          {...this.props}
        />
      </InputWrapper>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <SearchInput {...props} inputRef={ref} />
))
