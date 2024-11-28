import ReactDOM from 'react-dom/client'
// import store from './services/store'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from "@reduxjs/toolkit";
import blogSlice from './reducers/blogReducer'
import notificationSlice from './reducers/notificationReducer'
import userSlice from './reducers/userReducer'


const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    user: userSlice
  }
})



const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render( 
  <Provider store={store}>
    <App />
  </Provider>
 )
}

renderApp()

store.subscribe(renderApp)