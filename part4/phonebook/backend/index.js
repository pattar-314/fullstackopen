const express = require('express')
const axios = require('axios')
const morgan = require('morgan')
const cors = require('cors')
const { mongoose } = require('mongoose')
const Person = require('./models/Person')
const { errorHandler } = require('./services/middleware')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

mongoose.connect(process.env.MONGODB_URI)


app.get('/api/info', (req, res) => {

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }


  const dateNow = new Date()

  console.log(dateNow.toISOString())
  Person.find({}).then(response => {

    res.send(`<div><p>Phonebook has info for ${response.length} people</p><p>${dateNow.toLocaleString(undefined, options)}  ${dateNow.toTimeString()}</p></div>`)

  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(result => {
    res.json(result)
  }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(response => {
    console.log('test 1:', response)
    res.json(response)
  }).catch(error => next(error))})


app.post('/api/persons', (req, res, next) => {
  console.log('body: ', req.body)
  const isPerson = Person.findOne({ name: req.body.name }).then(response => {
    console.log('isPerson: ', JSON.stringify(response))
    if(response ){
      console.log(`found person: ${JSON.stringify(response)}`)
      Person.findByIdAndUpdate(response._id, req.body, { new: true, runValidators: true, context: 'query' }).then(response => {
        console.log('update response: ', response)
        res.json(response)
      }).catch(err => next(err))
    } else {
      console.log(`there was no person ${response}`)
      const newPerson = new Person(req.body)
      newPerson.save().then(secondResponse => {
        console.log('second response: ', secondResponse)
        res.json(secondResponse)
      }).catch(err => next(err))
    }
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findOneAndUpdate(req.params.id, req.body, { new: true }).then(response => {
    res.json(response)
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const deleted = Person.findByIdAndDelete(req.params.id).then(result => {
    console.log(`delete result: ${result}`)
    res.json({ result })
    return null
  }).catch(error => next(error))
})

/* app.get('/', (req, res, next) => {

})
 */

app.use(errorHandler)

//app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)

})

