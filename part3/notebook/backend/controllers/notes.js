

const notesRouter = require('express').Router()
const Note = require('../models/Note')


notesRouter.get('/', (req, res, next) => {
  Note.findById(req.params.id).then(
    note => {
      if(note){
        res.json(note)
      } else {
        res.status(404).end()
      }
    }).catch(err => next(err))
})


notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).then(foundNote => {
    res.json(foundNote)
  }).catch(err => next(err))
})

notesRouter.post('/', (req, res, next) => {
  const body = req.body
  const newNote = new Note(
    {
      content: body.content,
      important: body.important || false
    }
  )

  newNote.save().then( savedNote => {
    res.json(savedNote)
  }).catch(err => next(err))
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  }).catch(err => next(err))
})

notesRouter.put('/:id', (req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }).then( updatedNote => {
    res.json(updatedNote)
  }).catch(err => next(err))
})


module.exports = notesRouter

/* notesRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id).then(result => {
    if(result){
      res.json(result)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

notesRouter.post('/api/notes', (req, res, next) => {
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


notesRouter.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      notes = notes.filter(note => note.id !== req.params.id)
      res.status(204).end()
    }).catch(error => next(error))
})

notesRouter.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: 'query' }).then(
    updatedNote => {
      res.json(updatedNote)
    }).then(updatedNote => {
    res.json(updatedNote)
  }).catch(error => next(error))
})

notesRouter.get('/api/notes', (req, res, next) => {
  Note.find({}).then(result => {
    // console.log(`result: ${result}`)
    res.json(result)
  }).catch(error => next(error))
})

notesRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
 */