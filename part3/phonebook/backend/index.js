const express = require("express")
const axios = require("axios")
const morgan = require("morgan")
const cors = require("cors")
const { mongoose } = require("mongoose")
const Person = require("./models/Person")
require('dotenv').config()

const app = express()

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
  }).error(error => response.json({message: `an error has occured: ${error}`}))
})

app.get('/api/persons', (req, res) => Person.find({}).then(response => {
  console.log('test 1:', response)
  res.json(response)
  return response
}).catch(error => res.json({error: error})))

app.post('/api/persons', (request, response) => {

  const newPerson = new Person({...request.body})
  console.log('new person: ', newPerson)
  newPerson.save().then(newP => response.json(newP)).catch((error) => response.json({error: error}))
  console.log('add finished')
})

app.delete('/api/persons/:id', (request, response) => {
  console.log('request: ', request)
  const deleted = Person.findByIdAndDelete(request.params.id).then(result => {
    console.log(`delete result: ${result}`)
    response.json({result})
    return null
  }).catch(error => {
    console.error(`there was an error ${error}`)
    response.json({error})
  })
})

app.get('/', (request, response) => {

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})