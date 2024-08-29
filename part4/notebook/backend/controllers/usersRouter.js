const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  console.log('test user: ', username, name, password)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/:id', async (req, res) => {
  const foundUser = await User.findById(req.params.id).populate('notes', { content: 1, important: 1 })
  res.json(foundUser)
})


usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  res.json(users)
})

module.exports = usersRouter