const express = require("express")
const axios = require("axios")
const morgan = require("morgan")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const Person = require("./models/Person")
require('dotenv').config()

const app = express()



let personssdfs = [
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

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

mongoose.connect(process.env.MONGODB_URI)

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
  Person.findById(request.params.id).then(result => {
    response.json(result)
  }).error(error => res.json({message: `an error has occured: ${error}`}))
})

app.get('/api/persons', (request, response) => res.json(Persons.find({})))

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number){
    response.status(402).json({error: 'requires name and number'})
    return null
  } else if(persons.filter((p) => p.name === body.name).length > 0){
    response.status(402).json({error: 'duplicate name'})
    return null
  }

  const newPerson = new Person({...body, id: Math.floor(Math.random() * 10000 )})
  console.log('new person: ', newPerson)
  persons = persons.concat(newPerson)
  newPerson.save()
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const deleted = Person.findByIdAndDelete(request.params.id).then(result => {
    console.log(`delete result: ${result}`)
    response.json({result})
  })

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