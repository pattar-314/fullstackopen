

import React from 'react'

const SingleUser = (props) => {
  return (
    <div className='single-user-wrapper'>
      <div className='single-user-name-wrapper'>{props.user.name}</div>
      <ul>
        Blogs:
        {props.user.blogs.map((b) => <li>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default SingleUser