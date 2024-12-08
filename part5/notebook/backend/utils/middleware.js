const logger = require('./logger')

const requestLogger = (req, res, next) => {
  console.log(`Method: ${req.method}`)
  console.log(`Path: ${req.path}`)
  console.log(`Body: ${req.body}`)
  console.log('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if(error.name === 'JsonWebTokenError'){
    return res.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError'){
    return res.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const getTokenFrom = (req) => {
  console.log('grabbing authorization: ', req.get('Authorization'))
  const authorization = req.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom
}