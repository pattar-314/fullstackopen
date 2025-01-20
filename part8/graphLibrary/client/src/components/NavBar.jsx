
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <div>
      <Link to="/">authors</Link>
      <Link to="/books">books</Link>
      <Link to="/addBook">add book</Link>
    </div>
  )
}

export default NavBar