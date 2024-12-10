

import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import styled from 'styled-components'


const Navigation = () => {

  const NavLink = styled.Link`
    padding: 1em;
    background-color: #373e51;
  `

  const NavContainer = styled.Container`
    background-color: darkGray;
    height: min-content;
  `

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