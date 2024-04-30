const express = require("express")
const axios = require("axios")
const morgan = require("morgan")

const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (reqest, response) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateNow = new Date()

  console.log(dateNow.toISOString())

  response.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${dateNow.toLocaleString(undefined, options)}  ${dateNow.toTimeString()}</p></div>`)   

})

app.get('/api/persons/:id', (request, response) => {
  const foundPerson = persons.filter((p) =>  p.id === Number(request.params.id))
  if(foundPerson.length < 1){
    console.log('could not find person with that id')
    response.status(404).json({error: 'person not found'})
  } else {
    response.json(foundPerson[0])
  }
})

app.get('/api/persons', (request, response) => response.json(persons))

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number){
    response.status(402).json({error: 'requires name and number'})
    return null
  } else if(persons.filter((p) => p.name === body.name).length > 0){
    response.status(402).json({error: 'duplicate name'})
    return null
  }
  const newPerson = {...body, id: Math.floor(Math.random() * 10000 )}
  console.log('new person: ', newPerson)
  persons = persons.concat(newPerson)
  if(response.status === 404){
    console.log('could not add person')
    response.json({error: 'could not add person'})
  }
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {

  const newList = persons.filter((p) => p.id !== Number(request.params.id) )
  console.log('newList:', newList)
  persons = newList
  response.json(persons)
})

app.get('/', (request, response) => {

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})