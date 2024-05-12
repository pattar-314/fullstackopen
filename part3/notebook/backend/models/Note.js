const { default: mongoose } = require("mongoose");


const Note = new mongoose.Schema({
  content: String,
  important: Boolean
})

module.exports = mongoose.model('Note', Note)

