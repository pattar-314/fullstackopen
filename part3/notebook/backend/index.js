const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const { mongoose } = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
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

app.get('/api/notes/:id', (request, response) => {
  const foundNote = Note.findById(id).then(result => {
    console.log(`finding note ${result}`)
    response.send(result)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  })

  newNote.save().then(result => {
    console.log(`adding result ${result}`)
    response.json(result)
  })

  notes = notes.concat(newNote)
})


app.delete('/api/notes/:id', (request, response) => {
  const toDelete = Note.findByIdAndDelete(request.params.id)
  .then(result => {
    notes = notes.filter(note => note.id !== request.params.id)
    response.status(204).end()
  })
  
})


app.get('/api/notes', (request, response) => {
  const responseData = Note.find({}).then(result => {
    console.log(`result: ${result}`)
    response.json(result)
})})

app.get('/', (request, responseData) => {
  response.send('<h1>Hello World!</h1>')
})



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server running on port: ${PORT}`)