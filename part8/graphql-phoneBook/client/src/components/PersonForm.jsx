import {  useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_PERSONS, CREATE_PERSON } from '../queries';




const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(CREATE_PERSON, 
    {
      refetchQueries: [ { query: ALL_PERSONS }],
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        setError(messages)
      }
    },)

  const submit = (event) => {
    event.preventDefault()

    createPerson({variables: {name, phone, street, city} })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <input onChange={(e) => setName(e.target.value)} value={name} placeholder='name' />
        <input onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='phone' />
        <input onChange={(e) => setStreet(e.target.value)} value={street} placeholder='street' />
        <input onChange={(e) => setCity(e.target.value)} value={city} placeholder='city' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default PersonForm