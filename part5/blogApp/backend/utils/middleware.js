const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log(`Path: ${req.path}`)
  console.log(`URL: ${req.url}`)
  console.log(`Body: ${JSON.stringify(req.body)}`)
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(`there was an error: ${error.message}`)
  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({error: 'unknown endpoint'})
}

const extractToken = (req, res, next) => {
  const authorization = req.get('Authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    const token = authorization.replace('Bearer ', '')
    req.token = token
  }
  next()
}
  


const extractUser = (req, res, next) => {
  if (!req.get('token')){
    next()
  } else {
    const token = req.token  
    const userInfo = jwt.verify(token, process.env.SECRET)
    req.user = userInfo.id
    next()
  }
}

module.exports = {logger, errorHandler, unknownEndpoint, extractToken, extractUser}