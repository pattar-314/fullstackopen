const supertest = require('supertest')
const Note = require('../models/Note')
const User = require('../models/User')
const app = require('../app')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    user: '66cee5d06bd6918468b687ad'
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
    user: '66cee5d06bd6918468b687ad'
  }
]

const testApi = supertest(app)

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = { initialNotes, nonExistingId, notesInDb, usersInDb, testApi }