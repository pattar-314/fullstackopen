

import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import styled from 'styled-components'

  
  const NavContainer = styled(Container)`
    display: flex;
    background-color: darkGray;
  `


  const NavLink = styled(Link)`
    padding: 1em;
    margin: 0 1em;
    background-color: #c1c1c1;
    color: black;
    font-weight: 200;
    text-decoration: none;
  `



const Navigation = () => {

  return (
    <Navbar>
      <NavContainer>
        <NavLink to='/'>blogs</NavLink>
        <NavLink to='/users'>users</NavLink>
      </NavContainer>
    </Navbar>
  )
}

export default Navigation