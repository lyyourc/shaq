import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const appContainer = document.createElement('div')
appContainer.setAttribute('id', 'sha-qiang')
document.body.appendChild(appContainer)

ReactDOM.render(<App />, appContainer)
