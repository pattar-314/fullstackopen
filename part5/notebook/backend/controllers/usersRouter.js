const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect )){
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).json({ token, username: user.username, name: user.name })
})

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
  const foundUser = await User.findById(req.params.id)
  res.json(foundUser)
})


usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = usersRouter

