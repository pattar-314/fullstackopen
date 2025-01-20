import React, { useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const Login = ({setToken, setError}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginMutation, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError('there was an error logging in please try again: ', error)
    }
  })

  const login = async () => {
    await loginMutation({variables: {username, password}})
    if(result){
      console.log('result: ', result)
      setToken(result.login.value)
      window.localStorage.setItem('graphLibrary-user-token', result.login.value)
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      </form>
    </div>
  )
}

export default Login