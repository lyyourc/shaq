import React from 'react'
import Downshift from 'downshift'
import fuzzaldrin from 'fuzzaldrin-plus'
import styled from 'styled-components'
import SearchInput from './SearchInput'

const StyledSuggestions = styled.div`
  position: relative; /* fake border-top */
  top: 0px;
  max-height: 300px;
  box-shadow: 0 20px 40px 4px ${props => props.theme.color.shadow.primary},
    0 0 0 1px ${props => props.theme.color.shadow.secondary};

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.color.primary};
  }
`

const StyledSuggestionItem = styled.div`
  padding: 13px;
  cursor: pointer;
  color: ${props => (props.highlight ? '#fff' : 'iherit')};
  background: ${props =>
    props.highlight ? props.theme.color.primary : 'initial'};
`

export default class Suggestions extends React.Component {
  inputRef = React.createRef()

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    return (
      <Downshift
        defaultHighlightedIndex={0}
        onChange={selection => alert(`You selected ${selection}`)}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <SearchInput {...getInputProps({ ref: this.inputRef })} />

            {isOpen ? (
              <StyledSuggestions>
                {fuzzaldrin
                  .filter(this.props.items, inputValue)
                  .map((item, index) => (
                    <StyledSuggestionItem
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        highlight: highlightedIndex === index,
                      })}>
                      <span>{item}</span>
                    </StyledSuggestionItem>
                  ))}
              </StyledSuggestions>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}
