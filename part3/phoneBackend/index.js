const express = require("express")
const axios = require("axios")

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

app.get('/', (request, response) => {

})

app.get('/api/persons/:id', (request, response) => response.json(persons.filter((p) => p.id === Number(request.params.id))))

app.get('/api/persons', (request, response) => response.json(persons))

app.post('/api/persons', (request, response) => {
  persons = persons.concat(request.body)
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {

  const newList = persons.filter((p) => p.id !== Number(request.params.id) )
  console.log('newList:', newList)
  persons = newList
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})