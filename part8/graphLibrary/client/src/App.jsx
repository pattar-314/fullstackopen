import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import { Route, Routes,} from "react-router-dom";
import './main.css'
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommended from "./components/Recommended";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "./queries";


const App = () => {
  const [ token, setToken ] = useState(null)
  const [ notify, setNotify ] = useState('')
  const [ books, setBooks ] = useState([])
  const [genreList, setGenreList] = useState([]);


    const bookQuery = useQuery(GET_ALL_BOOKS);

    useEffect(() => {
      if(bookQuery.data){
        const bookData = bookQuery.data.allBooks
        setBooks(bookData)
      }
    }, [bookQuery.data])
  

  useEffect(() => {
    try{
      const storedToken = localStorage.getItem('graphLibrary-user-info')
      setToken(storedToken)
      console.log('token set: ', storedToken)
    }catch{
      console.log('no user stored')
    }
    
  }, [token])

  
  const setError = (errorContent) => {
    setNotify(errorContent)
    setTimeout(() => {
      setNotify(null)
    }, 3000)
  }
  
  return (
    <div>
      <NavBar setToken={setToken} token={token} />
      <Notify notify={notify} />
      <div>
        <Routes>
          <Route class='nav-link' path='/books' element={<Books books={books} setBooks={setBooks} genreList={genreList} setGenreList={setGenreList} />} />
          <Route class='nav-link' path='/recommended' element={<Recommended books={books} /> } />
          <Route class='nav-link' path='/addBook' element={<NewBook />} />
          <Route class='nav-link' path='/login' element={<LoginForm setError={setError} setToken={setToken} />}/>
          <Route index class='nav-link' path='/' element={<Authors token={token} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
