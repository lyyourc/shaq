import React from 'react'
import Downshift from "downshift"
import fuzzaldrin from 'fuzzaldrin-plus'
import SearchInput from './SearchInput'

export default class Suggestions extends React.Component {
  render() {
    return (
      <Downshift onChange={selection => alert(`You selected ${selection}`)}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <SearchInput {...getInputProps()} />

            {isOpen ? (
              <div>
                {fuzzaldrin
                  .filter(this.props.items, inputValue)
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: fuzzaldrin.wrap(item, inputValue),
                        }}
                      />
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}
