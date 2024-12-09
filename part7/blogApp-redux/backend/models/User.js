const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    unique: true
  },
  blogs: {
    type: [Schema.Types.ObjectId],
    ref: 'Blog'
  }
})

UserSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString()
    delete returnedDocument.passwordHash
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})

const User = model('User', UserSchema)

module.exports = User