import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import './main.css'

const App = () => {
  



  return (
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route class='nav-link' path='/books' element={<Books />} />
          <Route class='nav-link' path='/addBook' element={<NewBook />} />
          <Route class='nav-link' path='/' element={<Authors />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
