import React from "react"
import ReactDOM from "react-dom"
import App from './components/App'

let appContainer = document.querySelector('#app')

if (!appContainer) {
  appContainer = document.createElement('div')
  appContainer.setAttribute('id', 'app')
  document.body.appendChild(appContainer)
}

ReactDOM.render(<App />, appContainer)
