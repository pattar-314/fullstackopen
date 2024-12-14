import { useState, useEffect } from 'react';
import BlogMain from './components/BlogMain';
import LoginForm from './components/LoginForm';
import axios from 'axios';
import './main.css';
import { setUser, setAllUsers } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import AllUsers from './components/AllUsers';
import SingleUser from './components/SingleUser';
import { Route, Routes, useMatch } from 'react-router-dom';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import SingleBlog from './components/SingleBlog';
import userService from './services/userService';

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser)
  const allUsers = useSelector(state => state.users.allUsers)
  const notification = useSelector((state) => state.notification)

  const setAll = async () => {
    const allTemp = await userService.getAllUsers()
    console.log('all temp: ', allTemp)
    dispatch(setAllUsers(allTemp))
  }


  useEffect(() => {
    if (user) {
      console.log('loggeduser:', user)
      console.log('allusers: ', allUsers)
      setAll()
    }

  }, []);



  const handleNotification = (status, message) => {
    dispatch(setNotification({ status, message }));
    setTimeout(() => {
      console.log('test 1');
      dispatch(setNotification(null));
    }, 3000);
  };

  const userMatch = useMatch('/users/:id')
  const userId = userMatch ? userMatch.params.id : null

  console.log('init user: ', user)

  userMatch ? console.log('id: ', userId) : console.log('no match')

  const singleUser = userMatch ? allUsers.find(u => u.id === Number(userId)) : null
  singleUser ? console.log('singleUser: ', singleUser) : null
  allUsers ? console.log('all users: ', allUsers) : null

  const handleLogin = async (username, password) => {
    try {
      console.log('usepass', username, password);
      const loginRequest = await axios.post('/api/login', {
        username,
        password,
      });
      const loginData = loginRequest.data;
      console.log('login request: ', loginData);
      window.localStorage.setItem('blogAppUser', JSON.stringify(loginData));
      dispatch(setUser(loginData));
      console.log('user works: ', user);
    } catch (err) {
      handleNotification('notification-deny', 'user login failed');
    }
  }

  const idMatch = useMatch('/:id');

  const sUser = userMatch ? allUsers.find(u => u.id === userMatch.params.id) : null
  userMatch ? console.log('userMatch: ', userMatch) : null

  return (
    <AppContainer className='app-wrapper'>
      <Navigation />
      {!notification ? null : (
        <div className={`notification ${notification.status}`}>
          <b>{notification.message}</b>
        </div>
      )}
      <Routes>
        <Route path='/' element={user ? <BlogMain user={user} handleNotification={handleNotification} /> : <LoginForm handleLogin={handleLogin} handleNotification={handleNotification} /> } /> 
        
        <Route path='/users' element={<AllUsers />} />
        <Route path='users/:id' element={<SingleUser user={sUser} />} />
        <Route path='/blogs/:id' element={<SingleBlog />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
