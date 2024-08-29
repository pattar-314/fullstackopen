require('dotenv').config()

const PORT = process.env.PORT
const mongoUri = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

const testUsers = [
  {
    username: 'mluukkai',
    _id: 123456,
  },
  {
    username: 'hellas',
    _id: 141414,
  },
]

const testNotes = [
  {
    content: 'HTML is easy',
    important: false,
    _id: 221212,
    user: 123456
  },
  {
    content: 'The most important operations of HTTP protocol are GET and POST',
    important: true,
    _id: 221255,
    user: 141414
  },
  {
    content: 'A proper dinosaur codes with Java',
    important: false,
    _id: 221244,
    user: 141414
  },
]


module.exports = {
  mongoUri,
  PORT,
  testNotes,
  testUsers
}