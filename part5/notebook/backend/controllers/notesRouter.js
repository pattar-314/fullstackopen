
const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const { getTokenFrom } = require('../utils/middleware')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})


notesRouter.get('/:id', async (req, res) => {
  const foundNote = await Note.findById(req.params.id)
  if(foundNote){
    res.json(foundNote)
  }else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log('new user id: ', user.id)
  console.log('body:', body)
  console.log('user: ', user)
  const newNote = new Note(
    {
      content: body.content,
      important: body.important || false,
      user: user.id
    }
  )

  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  console.log('test 1: ', req.body)
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
  console.log('updated note: ', updatedNote)
  res.json(updatedNote)
})


module.exports = notesRouter

/* notesRouter.get('/api/notes/:id', async (req, res, next) => {
  Note.findById(req.params.id).then(result => {
    if(result){
      res.json(result)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

notesRouter.post('/api/notes', async (req, res, next) => {
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


notesRouter.delete('/api/notes/:id', async (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      notes = notes.filter(note => note.id !== req.params.id)
      res.status(204).end()
    }).catch(error => next(error))
})

notesRouter.put('/api/notes/:id', async (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: 'query' }).then(
    updatedNote => {
      res.json(updatedNote)
    }).then(updatedNote => {
    res.json(updatedNote)
  }).catch(error => next(error))
})

notesRouter.get('/api/notes', async (req, res, next) => {
  Note.find({}).then(result => {
    // console.log(`result: ${result}`)
    res.json(result)
  }).catch(error => next(error))
})

notesRouter.get('/', async (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
 */