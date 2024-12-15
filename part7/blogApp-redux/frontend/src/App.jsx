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
import blogService from './services/blogService';
import { setAllBlogs } from './reducers/blogReducer';

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = () => {

  useEffect(() => {
    if (user) {
      console.log('loggeduser1:', user)
      console.log('allusers: ', allUsers)
      setAllUserState()
      setAllBlogState()
      console.log('testy testy test')
    }

  }, [])

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser)
  const allUsers = useSelector(state => state.users.allUsers)
  const allBlogs = useSelector(state => state.blogs)
  const notification = useSelector((state) => state.notification)

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const userId = userMatch ? userMatch.params.id : null
  const chosenUser = userMatch ? [...allUsers].find(u => u.id === userMatch.params.id) : null
  const chosenBlog = blogMatch ? [...allBlogs].find(b => b.id === blogMatch.params.id) : null



  const setAllUserState = async () => {
    const allTemp = await userService.getAllUsers()
    console.log('all temp: ', allTemp)
    dispatch(setAllUsers(allTemp))
  }

  const setAllBlogState = async () => {
    const allTemp = await blogService.getAll()
    console.log('setting allBlogState: ', allTemp)
    dispatch(setAllBlogs(allTemp))
  }

  const handleNotification = (status, message) => {
    dispatch(setNotification({ status, message }));
    setTimeout(() => {
      console.log('test 1');
      dispatch(setNotification(null));
    }, 3000);
  };


  console.log('init user1: ', user)

  userMatch ? console.log('id: ', userId) : console.log('no match')

  const singleUser = userMatch ? allUsers.find(u => u.id === Number(userId)) : null
  singleUser ? console.log('singleUser: ', singleUser) : null
  allUsers.length > 0 ? console.log('all users2: ', allUsers) : null

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
  console.log('idMatch: ', idMatch)

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
        <Route path='users/:id' element={<SingleUser user={chosenUser} />} />
        <Route path='/blogs/:id' element={<SingleBlog blogInfo={chosenBlog} />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
