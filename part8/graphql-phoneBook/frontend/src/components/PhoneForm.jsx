import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_PERSONS, EDIT_NUMBER } from '../queries'

const PhoneForm = ({setError}) => {

  const [ editPhone, result ] = useMutation(EDIT_NUMBER, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    },
    refetchQueries: [{query: ALL_PERSONS}]
  })

  useEffect(() => {
    if(result.data && result.data.editNumber === null){
      setError('Person not found')
    }
  }, [result.data])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submit = (e) => {
    e.preventDefault()
    editPhone({variables: {name, phone}})
    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>edit phone</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='name' />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='phone' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default PhoneForm