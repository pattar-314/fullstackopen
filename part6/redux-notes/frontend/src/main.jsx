
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer.js'
import { createStore } from 'redux'

const store = createStore(noteReducer)

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)