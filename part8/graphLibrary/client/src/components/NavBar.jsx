
import { Link } from 'react-router'
import styled from 'styled-components'


const StyledLink = styled(Link)`
  padding: 1em;
  color: black;
`

const NavBarWrapper = styled.div`
  background-color: #95c9da;
  display: flex;
`



const NavBar = () => {
  return (
    <NavBarWrapper>
      <StyledLink to="/">authors</StyledLink>
      <StyledLink to="/books">books</StyledLink>
      <StyledLink to="/addBook">add book</StyledLink>
    </NavBarWrapper>
  )
}

export default NavBar