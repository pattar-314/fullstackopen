import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import './main.css'
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";


const App = () => {
  const [ token, setToken ] = useState(null)
  const [ notify, setNotify ] = useState('')

  useEffect(() => {
    try{
      const storedToken = localStorage.getItem('graphLibrary-user-token')
      setToken(storedToken)
      console.log('token set: ', storedToken)
    }catch{
      console.log('no user stored')
    }
    
  }, [])
  
  const setError = (errorContent) => {
    setNotify(errorContent)
    setTimeout(() => {
      setNotify(null)
    }, 3000)
  }
  
  return (
    <div>
      <NavBar setToken={setToken} />
      <Notify notify={notify} />
      { !token ? <LoginForm setToken={setToken} setError={setError} /> :
      <div>
        <Routes>
          <Route class='nav-link' path='/books' element={<Books />} />
          <Route class='nav-link' path='/addBook' element={<NewBook />} />
          <Route index class='nav-link' path='/' element={<Authors />} />
        </Routes>
      </div>
      }
    </div>
  );
};

export default App;
