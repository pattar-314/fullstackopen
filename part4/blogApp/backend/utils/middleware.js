
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

module.exports = {logger, errorHandler, unknownEndpoint}