const express = require('express')
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { extractToken, extractUser } = require('../utils/middleware')
require('dotenv').config()

const blogRouter = express.Router()

const decodeToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (decodedToken) {
    return decodedToken
  } else {
    console.error('there was an error decoding the token')
  }
}

blogRouter.get('/blogs', async (req, res, next) => {
  const foundBlogs = await Blog.find({}).populate('user', { username: 1 })
  res.json(foundBlogs)
})

blogRouter.get('/blogs/:id', async (req, res, next) => {
  const foundBlog = await Blog.findById(req.params.id).populate('user', { username: 1 })
  res.json(foundBlog)
})

blogRouter.post('/blogs', [extractToken, extractUser], async (req, res, next) => {
  console.log('test 2')
  const recievedToken = req.token
  // if there is not a token return an error
  if (!recievedToken) {
    console.log('unauthorized user')
    return res.status(500).send({ error: 'user must be logged in' }).end()
  }

  // decode token and make sure user is valid
  
  const decodedToken = decodeToken(recievedToken)

  const foundUser = await User.findById(decodedToken.id).catch(error => next(error))

  console.log('same user: ', foundUser.id === decodedToken.id)

  // check if blog already exists
  const blogExists = await Blog.findOne({ title: req.body.title })

  if(blogExists && decodedToken.id === foundUser.id) { 
    console.log('updating blog: ', blogExists)
    const updatedBlog = await Blog.findByIdAndUpdate(blogExists.id, req.body, { new: true })
    console.log('updated blog: ', updatedBlog)
    return res.json(updatedBlog)
  } else {
    // if blog does not exist save as new with current user as user then update the user to also include blog id
    console.log('creating new blog')
    const newBlog = new Blog({ ...req.body, user: decodedToken.id })
    foundUser.blogs = foundUser.blogs.concat(newBlog.id)
    console.log('updated user', foundUser)
    await foundUser.save()
    const savedBlog = await newBlog.save() 
    console.log('saved blog:', savedBlog)
    return res.status(201).json(savedBlog)
  }
})


blogRouter.delete('/blogs/:id', extractToken, async (req, res, next) => {
/*   if(req.body.override){
    console.log('override id: ', req.params.id)
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id, {new: true}).catch(error => console.log('test error: ', error))
    console.log('override success: ', deletedBlog)
    return res.json({message: 'it worked'})
  } */
  // make sure the user is correct then delete
  const decodedToken = decodeToken(req.token)
  console.log('decoded token: ', decodedToken)
  const foundUser = await User.findById(decodedToken.id).catch(error => {
    console.error('user not found: ', error)
    res.status(500).send({ error }).end()
  })

  const foundBlog = await Blog.findById(req.params.id).populate('user', { username: 1 }).catch(error => {
    console.error('blog not found: ', error)
  })
  if (foundBlog.user.id.toString() !== decodedToken.id) {
    console.log(`blog user: ${foundBlog.user.id.toString()}: decodedUser: ${decodedToken.id} equal: ${foundBlog.user.id.toString() === decodedToken.id}`)
    console.error('user not authenticated')
    res.status(500).send({ error: 'user not authenticated' }).end()
  } else {
    console.log('deleting blog')
    await Blog.findByIdAndDelete(req.params.id).then(() => {
      res.send(`blog with id ${req.params.id} deleted`)
    }).catch(err => next(err))
  }
})

module.exports = blogRouter
