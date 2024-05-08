import { useEffect, useState } from 'react'
import { SearchFilter } from './components/SearchFilter'
import { PhonebookForm } from './components/PhonebookForm'
import PhonebookDirectory from './components/PhonebookDirectory'
import phonebookServices from './services/phonebookServices'
import './index.css'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)



  useEffect(() => {
    phonebookServices.readAllPersons().then((response) => {
      console.log('data: ', response)
      setPersons(response)
  }).catch((err) => handleMessage(`error getting initial data  ${err}`, 'failure'))
    console.log('persons set')
  }, [])
  
  const updatePerson = async (personInfo) => {
    const selectedPerson = persons.filter((p) => p.name === personInfo.name)[0]
    console.log('selected person: ', selectedPerson)
    const updateRequest = await phonebookServices.updatePerson(selectedPerson.id, personInfo).catch(() => handleMessage(`error updating person ${selectedPerson.name}`, 'failure'))
    console.log('updated: ', updateRequest)
    const newList = persons.map((p) => p.name !== personInfo.name ? p : updateRequest)
    console.log('newlist: ', newList)
    setPersons(newList)
  }


    const handleSubmit = (e) => {
    e.preventDefault()
    if(newName === '' || newNumber === ''){
      console.log('needed info not provided')
      handleMessage('please enter all needed information', 'failure')
      return null
    }
    const personInfo = {name: newName, number: newNumber}
    console.log('filter: ', persons.filter((p) => p.name === personInfo.name))
    const filterList = persons.filter((p) => p.name === personInfo.name)
    console.log('filter list: ', filterList)
    if(filterList.length > 0){
      updatePerson(personInfo)
      handleMessage(`person ${personInfo.newName} updated`, 'success')
      console.log('test 1')
    } else {
      phonebookServices.createPerson(personInfo).then((response) => {
      console.log('new person added: ', response)
      setPersons(persons.concat(response))
      handleMessage(`created person ${personInfo.name}`, 'success')
      
      console.log('test 2')
      }).catch((err) => handleMessage(`error creating person  ${personInfo.newName}`, 'failure'))
    }
    console.log('resetting form')
    setNewName('')
    setNewNumber('')
  }

  const handleMessage = (content, status) => {
    setMessage(content)
    setMessageStatus(status)
    setTimeout(() => {
      setMessage(null)
      setMessageStatus(null)
    }, 5000)
  }

  const deletePerson = async (id) => {
    const deleted = await phonebookServices.deletePerson(id).catch((err) => handleMessage(`error deleting person with id ${id}`, 'failure'))
    console.log('deleted: ', deleted)
    const newList = persons.filter((e) => e.id !== id)
    console.log('new list: ', newList)
    setPersons(newList)
    deleted !== undefined ? handleMessage(`person with id ${id} deleted`, 'success') : null 
  }


  const filterList = persons.filter((fb) => (fb.name.includes(filterInput) || fb.number.includes(filterInput)) )




  return (
    <div>
      <h2>Phonebook</h2>
      <Message content={message} status={messageStatus} />
      <SearchFilter filterInput={filterInput} setFilterInput={setFilterInput} />
      <PhonebookForm handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber} />
      <PhonebookDirectory filterList={filterList} deletePerson={deletePerson} />
    </div>
  )
}

export default App