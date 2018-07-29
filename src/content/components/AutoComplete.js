import React from 'react'
import Downshift from 'downshift'
import fuzzaldrin from 'fuzzaldrin-plus'
import styled from 'styled-components'
import { HotKeys } from 'react-hotkeys'
import SearchInput from './SearchInput'
import SuggestionItem from './SuggestionItem'
import StyledCategoryName from './styled/StyledCategoryName'
import shortcuts from '../../data/shortcuts'
import cookies from '../../data/cookies'
import { normalizeData, flattenData } from '../utils/index'

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
    props.highlight ? props.theme.color.primary : '#fff'};

  &:hover {
    color: ${props => (props.highlight ? '#fff' : props.theme.color.primary)};
  }
`

const items = normalizeData({ shortcuts, cookies })

export default class Suggestions extends React.Component {
  allItems = items

  keyMap = {
    nextSuggetion: ['ctrl+n', 'down'],
    prevSuggestion: ['ctrl+p', 'up'],
  }

  inputRef = React.createRef()

  initState = {
    highlightedIndex: 0,
    inputValue: '',
    isOpen: false,
    items: [],
  }

  state = this.initState

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const handlers = {
      nextSuggetion: () => this.handleItemHighlight(1),
      prevSuggestion: () => this.handleItemHighlight(-1),
    }

    return (
      <HotKeys keyMap={this.keyMap} handlers={handlers}>
        <Downshift
          isOpen={this.state.isOpen}
          // isOpen={true}
          // inputValue={'U'}
          highlightedIndex={this.state.highlightedIndex}
          itemToString={item => (item ? item.name : '')}
          onInputValueChange={this.handleInputValueChange}
          onStateChange={this.handleDownshiftStageChange}
          onChange={selection => this.handleSelect(selection)}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <SearchInput {...getInputProps({ ref: this.inputRef })} />

              {isOpen ? (
                <StyledSuggestions>
                  {
                    this.state.items.reduce(
                      (acc, item) => {
                        const section = (
                          <div key={item.category}>
                            <StyledCategoryName>
                              {item.category}
                            </StyledCategoryName>

                            {item.items.map(subItem => {
                              const index = acc.itemIndex++

                              return (
                                <StyledSuggestionItem
                                  {...getItemProps({
                                    key: subItem.name,
                                    index,
                                    item,
                                    highlight: highlightedIndex === index,
                                  })}>
                                  <SuggestionItem {...subItem} />
                                </StyledSuggestionItem>
                              )
                            })}
                          </div>
                        )

                        acc.sections.push(section)

                        return acc
                      },
                      { sections: [], itemIndex: 0 }
                    ).sections
                  }
                </StyledSuggestions>
              ) : null}
            </div>
          )}
        </Downshift>
      </HotKeys>
    )
  }

  handleSelect(selectedItem) {}

  handleItemHighlight = step => {
    if (!this.state.isOpen) return

    this.setState(prevState => {
      const itemsCount = flattenData(prevState.items).length - 1
      console.log('ggg', itemsCount)
      const newHighlightedIndex = prevState.highlightedIndex + step

      const highlightedIndex =
        newHighlightedIndex < 0
          ? itemsCount
          : newHighlightedIndex > itemsCount
            ? 0
            : newHighlightedIndex

      return {
        ...prevState,
        highlightedIndex,
      }
    })
  }

  handleDownshiftStageChange = (changes, downshiftState) => {
    const { isOpen } = changes

    if (isOpen != null) {
      this.toggleMenu(isOpen)
    }
  }

  toggleMenu = isOpen => {
    this.setState(prevState => ({
      ...prevState,
      isOpen,
    }))
  }

  handleInputValueChange = (inputValue = '') => {
    this.setState(prevState => {
      return {
        ...prevState,
        highlightedIndex: 0,
        items: this.fitlerItems(inputValue),
      }
    })
  }

  fitlerItems = inputValue => {
    const items = this.allItems.reduce((prev, group) => {
      const matchItems = group.items.filter(item =>
        fuzzaldrin.filter(item.name, inputValue)
      )

      if (matchItems.length > 0) {
        return [...prev, { ...group, items: matchItems }]
      }

      return prev
    }, [])

    return items
  }
}
