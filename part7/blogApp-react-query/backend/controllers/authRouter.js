const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const authRouter = express.Router()


authRouter.post('/login', async (req, res, next) => {
  const userData = { username: req.body.username, password: req.body.password }

  const loginUser = await User.findOne({ username: userData.username })
  if (!loginUser) {
    res.status(500).send({ error: 'user not found' }).end
  } else {
    const passwordVerify = await bcrypt.compare(userData.password, loginUser.passwordHash)
    console.log('password verified: ', passwordVerify)

    if (passwordVerify) {
      const threeMonths = (((60 * 60) * 24) * 90)
      const tokenizedUser = await jwt.sign({ username: loginUser.username, id: loginUser.id }, process.env.SECRET, { expiresIn: threeMonths })
      console.log('tokenized user: ', tokenizedUser)
      res.status(200).send({ token: tokenizedUser, username: loginUser.username, name: loginUser.name }).end()
    } else {
      res.status(500).send({ error: 'user login failed' })
    }
  }


})

authRouter.post('/user', async (req, res) => {
  const userExists = await User.findOne({ username: req.body.username })
  if (userExists) {
    res.status(500).json({ error: 'user already exists' }).end()
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10)
  console.log('passHash: ', passwordHash)


  const newUserData = {
    username: req.body.username,
    name: req.body.name,
    passwordHash
  }

  const newUser = new User({ ...newUserData })
  const savedUser = await newUser.save()
  console.log('saved user: ', savedUser)
  res.status(201).json(savedUser).end()
})


authRouter.get('/user', async (req, res) => {
  const retrievedUser = await User.findById(req.body.id)
  console.log('retrieved user: ', retrievedUser)
  res.json(retrievedUser).end()
})

authRouter.put('/user', async (req, res) => {
  // validate user before making update
  const retrievedUser = await User.findOne({ username: req.body.username })
  if (retrievedUser === null) {
    res.status(500).json({ error: 'user not found' }).end()
  }
  console.log('retrieved user: ', retrievedUser)
  // check to see if user matches
  if (retrievedUser.id !== req.get('user')) {
    res.status(500).json({ error: 'users dont match' }).end()
  }
  // if user matches send update request
  const updateRequest = await User.findByIdAndUpdate(req.get('user'), req.body, { new: true })
  res.status(200).json(updateRequest).end()
})

authRouter.delete('/user', async (req, res) => {
  const userToDelete = req.get('user')
  if (userToDelete === null) {

  }

  const deletedUser = await User.findByIdAndDelete(userToDelete, { new: true })
  res.json(deletedUser)
})

module.exports = authRouter


/* {
  "name": "testy mctesterson",
  "username": "testymct",
  "password": "greensage420"
} */