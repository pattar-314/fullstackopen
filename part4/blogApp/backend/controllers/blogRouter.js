const express = require('express')
const Blog = require('../models/Blog')

const blogRouter = express.Router()

blogRouter.get('/blogs', (req, res, next) => {
  Blog.find({}).then(response => {
    console.log('response: ', response)
    res.json(response)
  }).catch(err => {
    next(err)
  })
})

blogRouter.get('/blogs/:id', (req, res, next) => {
  Blog.findById(req.params.id).then(found => {
    res.json(found)
  }).catch(err => next(err))
})

blogRouter.post('/blogs', (req, res, next) => {
  const body = {...req.body}
  // check if blog already exists
  const blogExists = Blog.find({url: body.url}).then(response => {
    if(response.length > 0){

      Blog.findByIdAndUpdate(response[0].id, body, {new: true}).then( updateResponse => {
  
        res.json(updateResponse)
      }).catch(err => next(err))
    }else{

      const newBlog = new Blog({...body})
      newBlog.save().then(nb => {
  
        res.json(nb)
      }).catch(err => next(err))
    }
  })
})

blogRouter.delete('/blogs/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id).then(() => {
    res.send(`blog with id ${req.params.id} deleted`)
  }).catch(err => next(err ))
})

module.exports = blogRouter