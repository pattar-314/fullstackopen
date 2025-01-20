const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ]
})

UserSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString()
    delete returnedDocument._id
    delete returnedDocument.passwordHash
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User