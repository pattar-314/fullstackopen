import { useState } from 'react'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '310531' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(false)
  const [filterInput, setFilterInput] = useState('')



  const filterList = persons.filter((fb) => (fb.name.includes(filterInput) || fb.number.includes(filterInput)) )

  const phonebookContent = () => filterList.map((p) => <div key={p.name}>{p.name} {p.number}</div> )


  const displayAlert = () => {
    setMessage('error: Person already exists in phonebook')
    alert('error: Person already exists in phonebook')
    setTimeout(setMessage(false), 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    console.log('filter: ', persons.filter((p) => p.toString() === newPerson.toString()))
    const filterList = persons.filter((p) => p.toString() === newPerson.toString())
    console.log('filter list: ', filterList)
    if(filterList.length > 0){
      console.log('error: duplicate person')
      displayAlert()
      return null
    }
    const newPersons = [...persons, newPerson]
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }


  


  return (
    <div>
      <div>{message}</div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input className='phonebook-filter-input' onChange={(e) => setFilterInput(e.target.value)} value={filterInput} /> </div>
      
      <form onSubmit={handleSubmit} className='add-form'>
        <h1>add new</h1>
        <div>
          name: <input className='name-input' onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number: <input className='number-input' onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      
      </form>
      <h2>Numbers</h2>
        {phonebookContent()}
    </div>
  )
}

export default App