import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createStore } from 'redux'


  const counterReducer = (state = 0, action) => {
    switch(action.type){
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'ZERO':
        return 0
      default:
        return state
    }
  }


export const store = createStore(counterReducer)

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />) 
}

renderApp()
store.subscribe(renderApp)

