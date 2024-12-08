const supertest = require(supertest)
const {test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/Blog')
const helper = require('../utils/blog_helper')

const api = supertest(app)

describe('blogtests ', () => {
  beforeEach(() => {
    Blog.deleteMany({})

    const promiseList = 

  })
})

after(async () => {
  await mongoose.connection.close()
})