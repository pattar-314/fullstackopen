const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
    },
    passwordHash: {
        type: String,
        required: true
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

UserSchema.set('toJSON', {
    transform: (document, returnedDocument) =>{
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.passwordHash
        delete returnedDocument.__v
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User