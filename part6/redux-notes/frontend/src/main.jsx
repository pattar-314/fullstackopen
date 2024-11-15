
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import noteReducer, { appendNote } from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import { configureStore } from '@reduxjs/toolkit'
import noteService from '../services/notes.js'



const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})


console.log(store.getState())

const root = createRoot(document.getElementById('root'))



root.render(
  <Provider store={store}>
    <App />
  </Provider>
)