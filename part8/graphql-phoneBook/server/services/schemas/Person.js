const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  phone: {
    type: String,
    minLength: 5,
    default: undefined
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person