

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import userService from '../services/userService'
import { Link, useMatch } from 'react-router'
import { useSelector } from 'react-redux'

const ContentWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
`

const SingleUser = () => {

  const [singleId, setSingleId] = useState('')
  const [singleUser, setSingleUser] = useState('')
  const userMatch = useMatch('/users/:id')

  const setId = async (id) => {
    setSingleId(id)
  }

  useEffect(() => {
    setId(userMatch.params.id)
  }, [])

  const userSelect = useSelector(state => state.users.allUsers)
  console.log('userselect: ', userSelect)
  const user = userSelect.find(u => {
    console.log(`userId ${u.id} matches ${singleId}: ${u.id === singleId}`)
    return u.id === singleId
  })

  console.log('userTest: ', user)

  const content = user ?
    <ContentWrapper className='single-user-wrapper'>
      <div className='single-user-name-wrapper'>{user.name}</div>
      <button onClick={userService.handleLogout}>logout</button>
       <ul>
        <h2>added blogs:</h2>
        <BlogList>{user.blogs.map((b) => <Link to={`/blogs/${b.id}`}>{b.title}</Link>)}</BlogList>
      </ul>
    </ContentWrapper>
    :
    <div>loading users</div>

  return content
}

export default SingleUser