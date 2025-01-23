import { useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  margin: auto;
`

const LoginForm = ({setToken, setError}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginMutation, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError('there was an error logging in please try again: ', error)
    }
  })

  const login = async (e) => {
    e.preventDefault()
    try {
      await loginMutation({variables: {username, password}})
      if(result){
        console.log('result: ', result.data.login.value)
        setToken(result.data.login.value)
        window.localStorage.setItem('graphLibrary-user-token', result.data.login.value)
      }
    } catch(error){
      setError('there was an error: ', error)
    }
    
  }

  return (
    <LoginWrapper>
      <form onSubmit={login}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button type='submit'>submit</button>
      </form>
    </LoginWrapper>
  )
}

export default LoginForm