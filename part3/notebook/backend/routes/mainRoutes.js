const express = require('express')
const Note = require('../models/Note')
const router = express.Router()

router.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = Note.findById(request.params.id)
  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
})

router.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

module.exports = router