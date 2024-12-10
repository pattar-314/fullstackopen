

import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import styled from 'styled-components'


const Navigation = () => {

  const NavLink = styled.Link

  return (
    <Navbar>
      <Container>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
      </Container>
    </Navbar>
  )
}

export default Navigation