
const errorHandler = (err, req, res, next) => {
  console.error(`error: ${err.message}`)

  if(err.name === 'CastError'){
    return response.status(400).send({error: 'malformated id'})
  } else if (error.name === 'Validation Error'){
    return response.status(400).json({error: error.message})
  }

  next(err)
}

module.exports = {errorHandler}