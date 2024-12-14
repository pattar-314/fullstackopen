

import React from 'react'
import styled from 'styled-components'
import userService from '../services/userService'

const ContentWrapper = styled.div`
  margin: auto;
`

const SingleUser = (props) => {

  console.log('props: ', props)

  return (
    <ContentWrapper className='single-user-wrapper'>
      <div className='single-user-name-wrapper'>{props.user.name}</div>
      <button onClick={userService.handleLogout}>logout</button>
       <ul>
        <h2>added blogs:</h2>
        {props.user.blogs.map((b) => <li>{b.title}</li>)}
      </ul>
    </ContentWrapper>
  )
}

export default SingleUser