const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const { mongoose } = require('mongoose')
const { errorHandler } = require('./services/middleware')
const { unknownEndpoint } = require('./services/services')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(result => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB: ', error.message)
})
mongoose.set('strictQuery', false)


let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const generateId = () => {
   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
   return maxId + 1
}
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(errorHandler)

app.get('/api/notes/:id', (req, res, next) => {
  const foundNote = Note.findById(req.params.id).then(result => {
    if(result){
      res.json(result)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body
  if(body.content === undefined){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
  })

  newNote.save().then(result => {
    console.log(`adding result ${result}`)
    res.json(result)
  }).catch(err => next(err))

  notes = notes.concat(newNote)
})


app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
  .then(result => {
    notes = notes.filter(note => note.id !== req.params.id)
    res.status(204).end()
  }).catch(error => next(error))
})

app.put('/api/notes/:id', (req, res) => {
  const {content, important} = req.body

  Note.findByIdAndUpdate(req.params.id, {content, important}, {new: true, runValidators: true, context: 'query'}).then(
    updatedNote => {
      res.json(updatedNote)
    }).then(updatedNote => {
      res.json(updatedNote)
    }).catch(error => next(error))
})

app.get('/api/notes', (req, res, next) => {
  const resData = Note.find({}).then(result => {
    // console.log(`result: ${result}`)
    res.json(result)
  }).catch(error => next(error))
})

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>')
})

app.use(unknownEndpoint)
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server running on port: ${PORT}`)