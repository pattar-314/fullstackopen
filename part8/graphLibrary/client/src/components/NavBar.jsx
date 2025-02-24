
import { Link, useNavigate } from 'react-router'
import styled from 'styled-components'


const StyledLink = styled(Link)`
  padding: 1em;
  color: black;
`

const NavBarWrapper = styled.div`
  background-color: #95c9da;
  display: flex;
`

const NavBar = ({setToken, token}) => {

const navigate = useNavigate()

const logout = () => {
  setToken(null)
  window.localStorage.removeItem('graphLibrary-user-info')
  navigate('/')
}

  return (
    <NavBarWrapper>
      <StyledLink to="/">authors</StyledLink>
      <StyledLink to="/books">books</StyledLink>
      {token ? 
      <><StyledLink to="/addBook">add book</StyledLink>
      <StyledLink to='/recommended'>recommended</StyledLink>
      <button onClick={logout}>logout</button></> : <StyledLink to='/login'>login</StyledLink>}
    </NavBarWrapper>
  )
}

export default NavBar