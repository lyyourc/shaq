import React from 'react'
import Downshift from 'downshift'
import fuzzaldrin from 'fuzzaldrin-plus'
import styled from 'styled-components'
import SearchInput from './SearchInput'
import SuggestionItem from './SuggestionItem'

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
        isOpen={true}
        // inputValue={'s'}
        defaultHighlightedIndex={0}
        itemToString={item => item ? item.name: ''}
        onChange={selection => this.handleSelect(selection)}>
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
                  .filter(this.props.items, inputValue, { key: 'name' })
                  .map((item, index) => (
                    <StyledSuggestionItem
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        highlight: highlightedIndex === index,
                      })}>
                      <SuggestionItem {...item} />
                    </StyledSuggestionItem>
                  ))}
              </StyledSuggestions>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }

  handleSelect() {}
}
