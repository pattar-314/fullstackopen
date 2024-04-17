import axios from 'axios'
import './main.css'
import { useEffect, useState } from 'react'
import SingleCountry from './components/singleCountry'

const App = () => {
  const [countryInput, setCountryInput] = useState('')
  const [searchList, setSearchList] = useState([])
  const [baseList, setBaseList] = useState([])

  const fetchInitialData = async () => {
    const initialData = await axios.get('http://localhost:3001/countries').catch((err) => console.log('an error occured: ', err))
    const test = initialData.data[0]
    console.log('initial data: ', test)
    setBaseList(test)
    setTimeout(() => {
      console.log('base list: ', baseList)
    }, 1000)
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const handleInput = (input) => {
    setCountryInput(input)
    console.log('input: ', input)
    runSearch(input)
  }

  const showCountry = (countryName) => {
      for( let i in baseList ) {
        if(typeof baseList[i] !== "object" ){
          console.log(baseList[i], ': is not an object')
        } else {
            const current = JSON.stringify(baseList[i].name.common).toLowerCase()
            console.log('current: ', current, ' countryName: ', countryName.toLowerCase(), ' found: ', current === countryName.toLowerCase())
            if(current === `"${countryName.toLowerCase()}"`){
              console.log('found: ', baseList[i].name.common)
              setSearchList([baseList[i]])
            }
        }
      }
        
    }
  


  const contentDisplay = () => {
    if(searchList.length > 10){
      return <p>Too many matches, specify another filter</p>
  } else if(searchList.length === 1){
    return <SingleCountry countryInfo={searchList[0]} />
  } else {
    return searchList.map((sl, index) => <p key={index}>{sl.name.common}<button onClick={() => showCountry(sl.name.common)}>show</button></p>)
  }

  }

  const runSearch = async (searchParam) => {
    if(searchParam === ''){
      setSearchList([])
      return null
    }
    console.log('pre-search base list: ', baseList)
    const stepOne = () => {
      let test = []
      for( let i in baseList ) {
        if(typeof baseList[i] !== "object" ){
          console.log(baseList[i], ': is not an object')
        } else {
            const current = JSON.stringify(baseList[i].name).toLowerCase()
            console.log('current: ', current.includes(searchParam))
            if(current.includes(searchParam)){
              console.log('adding: ', baseList[i])
              test = test.concat(baseList[i])
            }
        }
      }
        setSearchList(test)
    }
    stepOne()
  }

  //const proccessedList = countryList === null ? null : countryList.map((c) => <div key={c.name}>{c.name}</div>) 
  
    console.log('search list: ', searchList)

  return (
  <div className='country-app-wrapper'>
    <div className='country-search-wrapper'>
      find countries <input onChange={(e) => handleInput(e.target.value)} value={countryInput}  />
      {contentDisplay()}
    </div>  
  </div>
  )
}

export default App
