const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI).catch(error => console.log('there was an error connecting to mongo: ', error))
console.log('connecting to mongo')

app.use(cors())
app.use(express.json())
// app.use('static', './dist')
app.use(middleware.logger)
app.use('/api', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


app.listen(process.env.PORT, () => {
  console.log(`server running on port: ${process.env.PORT}`)
})

module.exports = app