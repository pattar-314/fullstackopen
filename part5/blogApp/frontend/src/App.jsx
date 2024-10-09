import { useState, useEffect } from 'react'
import BlogMain from './components/BlogMain'
import LoginForm from './components/LoginForm'
import axios from 'axios'
import './main.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('blogAppUser'))
    if(loggedUser){
      setUser(loggedUser)
    }
  }, [])

  const handleNotification = (status, message) => {
    setNotification({status, message})
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }


  const handleLogin = async (username, password) => {
    try{
      console.log('usepass', username, password)
      const loginRequest = await axios.post('/api/auth/login', { username, password })
      const loginData = loginRequest.data
      console.log('login request: ', loginData)
      setUser(loginData)
      window.localStorage.setItem('blogAppUser', JSON.stringify(loginData))
    } catch(err) {
      handleNotification('notification-deny', 'user login failed')
    }
    
  }


  return (
    <div className='app-wrapper'>
      {!notification ? null : <div className={`notification ${notification.status}`}><b>{notification.message}</b></div> }
      {user ? <BlogMain user={user} handleNotification={handleNotification} /> : <LoginForm handleLogin={handleLogin} handleNotification={handleNotification} /> }
    </div>

  )
}

export default App