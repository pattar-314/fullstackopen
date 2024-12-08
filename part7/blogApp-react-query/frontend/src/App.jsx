import { useContext, useEffect, useReducer } from 'react'
import BlogMain from './components/BlogMain'
import LoginForm from './components/LoginForm'
import axios from 'axios'
import './main.css'
import notificationReducer from './reducers/notificationReducer'
import { NotificationContext, UserContext } from './services/blogService'
import Notification from './components/Notification'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('blogAppUser'))
    if(loggedUser){
      userDispatch({type: 'SET_USER', payload: loggedUser})
    }
  }, [])

  const handleNotification = (status, message) => {
    notificationDispatch({type: 'SET_NOTIFICATION', payload: {status, message}})
    setTimeout(() => {
      console.log('test 2')
      notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }, 3000)
  }


  const handleLogin = async (username, password) => {
    try{
      console.log('usepass', username, password)
      const loginRequest = await axios.post('/api/auth/login', { username, password })
      const loginData = loginRequest.data
      console.log('login request: ', loginData)
      userDispatch({type: 'SET_USER', payload: loginData})
      window.localStorage.setItem('blogAppUser', JSON.stringify(loginData))
    } catch(err) {
      handleNotification('notification-deny', 'user login failed')
    }
    
  }
  

  return (
    <div className='app-wrapper'>
      <NotificationContext.Provider value={[notification, notificationDispatch]}><Notification /></NotificationContext.Provider>
      {user ? <BlogMain user={user} userDispatch={userDispatch} handleNotification={handleNotification} /> : <LoginForm handleLogin={handleLogin} handleNotification={handleNotification} /> }
    </div>

  )
}

export default App