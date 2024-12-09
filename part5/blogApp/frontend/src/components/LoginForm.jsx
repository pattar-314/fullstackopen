import React, { useState } from 'react'

const LoginForm = (props) => {

  const [loginUsername, setLoginUsername] = useState(null)
  const [loginPassword, setLoginPassword] = useState(null)

  const loginSubmit = (e) => {
    try{
      e.preventDefault()
      props.handleLogin(loginUsername, loginPassword)
      props.handleNotification('notification-confirm', `${loginUsername} logged in successfully`)
    }catch(err){
      props.handleNotification('notification-deny', 'please use another username or password')
      console.error('login failed')
    }

  }

  return (
    <div className='login-form-wrapper' onSubmit={(e) => loginSubmit(e) }>
      <h1><b>log in to application</b></h1>
      <form className='login-form'>
        Username:<input onChange={(e) => setLoginUsername(e.target.value)} />
        Password:<input onChange={(e) => setLoginPassword(e.target.value)} />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm