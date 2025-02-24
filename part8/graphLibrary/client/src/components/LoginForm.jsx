import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  margin: auto;
`

const LoginForm = ({setToken, setError}) => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginMutation, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError('there was an error logging in please try again: ', error)
    }
  })


  useEffect(() => {
    if(result.data){
      navigate('/')
      setToken(result.data.login.value)
      window.localStorage.setItem('graphLibrary-user-info', result.data.login.value)
    }
  }, [result.data])

  const login = async (e) => {
    e.preventDefault()
    try {
      console.log('trying to log in')
      loginMutation({variables: {username, password}})
      
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