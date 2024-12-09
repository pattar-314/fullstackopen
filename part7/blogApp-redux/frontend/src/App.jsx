import { useState, useEffect } from 'react'
import BlogMain from './components/BlogMain'
import LoginForm from './components/LoginForm'
import axios from 'axios'
import './main.css'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import AllUsers from './components/AllUsers'
import SingleUser from './components/SingleUser'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if(user){
      console.log('loggeduser:', JSON.parse(user))
    }
    
  }, [])

  const handleNotification = (status, message) => {
    dispatch(setNotification({status, message}))
    setTimeout(() => {
      console.log('test 1')
      dispatch(setNotification(null))
    }, 3000)
  }


  const handleLogin = async (username, password) => {
    try{
      console.log('usepass', username, password)
      const loginRequest = await axios.post('/api/auth/login', { username, password })
      const loginData = loginRequest.data
      console.log('login request: ', loginData)
      window.localStorage.setItem('blogAppUser', JSON.stringify(loginData))
      dispatch(setUser(loginData))
      console.log('user works: ', user)
    } catch(err) {
      handleNotification('notification-deny', 'user login failed')
    }
    
  }

  const idMAtch = useMatch('/:id')


  return (
    <div className='app-wrapper'>
      {!notification ? null : <div className={`notification ${notification.status}`}><b>{notification.message}</b></div> }
      <Routes>
        <Route path='/' element={user ? <BlogMain user={user} handleNotification={handleNotification} /> : <LoginForm handleLogin={handleLogin} handleNotification={handleNotification} />} />
        <Route path='/users' element={<AllUsers />} />
        <Route path='users/:id' element={<SingleUser />} />
      </Routes>
      
  
    </div>

  )
}

export default App