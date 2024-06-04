
const errorHandler = (err, req, res, next) => {
  console.error(`error: ${err.message}`)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformated id'})
  }

  next(err)
}

module.exports = {errorHandler}