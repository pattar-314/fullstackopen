
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notesRouter')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/usersRouter')
const config = require('./utils/config')

mongoose.connect(config.mongoUri).then(console.info('mongoose connected'))


/* .then(() => {
  logger.info('connected to mongodb')
}).catch(err => logger.error('error connecting to mongodb: ', err.message))
 */


app.use(cors())
app.use(middleware.requestLogger)
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


/*
  "username": "tester",
  "password": "jimbob"
}

*/