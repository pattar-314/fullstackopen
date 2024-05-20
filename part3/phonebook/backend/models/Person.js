const { mongoose } = require("mongoose");


const Person = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

module.exports = mongoose.model('Person', Person)