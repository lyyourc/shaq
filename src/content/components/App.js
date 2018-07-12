import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import ClickOutside from 'react-onclickout'
import AutoComplete from './AutoComplete'
import starWarsNames from 'starwars-names'
import theme from '../styles/theme'

const StyledContainer = styled.div`
  position: fixed;
  top: 16%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%);
  background: #fff;
  color: ${props => props.theme.color.text.primary};
  display: ${props => props.hidden ? 'none' : 'block'};

  & *:not(img) {
    box-sizing: border-box;
  }
`

export default class App extends React.Component {
  state = {
    isHidden: true,
  }

  componentDidMount() {
    if (chrome.runtime.onMessage) {
      this.initEvents()
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ClickOutside onClickOut={() => this.handleClickOutside()}>
          <StyledContainer hidden={this.state.isHidden}>
            <AutoComplete items={starWarsNames.all} />
          </StyledContainer>
        </ClickOutside>
      </ThemeProvider>
    )
  }

  initEvents = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.command === 'toggle-app') {
        this.toggleApp()
      }
    })
  }

  toggleApp() {
    this.setState(prevState => ({ ...prevState, isHidden: !prevState.isHidden}))
  }

  handleClickOutside() {
    this.setState(prevState => ({ ...prevState, isHidden: true }))
  }
}
