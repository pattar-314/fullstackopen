


import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_PERSONS, LOGIN } from '../queries'

const LoginForm = ({ setError,setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('there was an error')
      setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson)
        }
      })
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])

  const submit = async (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm