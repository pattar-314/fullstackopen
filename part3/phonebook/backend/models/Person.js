const { mongoose } = require("mongoose");

const numberFormat = (toValidate) => {
        return /^\d{1,3}-\d*$/.test(toValidate)
      }

const Person = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: [numberFormat, 'malformatted number']
    },
  id: String
})

Person.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', Person)