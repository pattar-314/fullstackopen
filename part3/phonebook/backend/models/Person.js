const { mongoose } = require("mongoose");


const Person = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

Person.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', Person)