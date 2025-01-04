
import {  useQuery } from '@apollo/client'
import './App.css'
import styled from 'styled-components'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'
import { useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'



  const AppContainer = styled.section`
    background-color: lightgray;
  `

const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if(result.loading){
    return <AppContainer>loading...</AppContainer>
  } else {
    console.log('result: ', result.data)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <AppContainer>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </AppContainer>
  )
}

export default App
