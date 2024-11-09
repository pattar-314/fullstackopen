
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer.js'
import { combineReducers, createStore } from 'redux'
import filterReducer from './reducers/filterReducer.js'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})


const store = createStore(reducer)
console.log(store.getState())

const root = createRoot(document.getElementById('root'))



root.render(
  <Provider store={store}>
    <App />
  </Provider>
)