const { mongoose } = require('mongoose');
const { server } = require('./app');
const { startStandaloneServer } = require('@apollo/server/standalone')
const User = require('./schemas/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()

console.log('connecting to mongoose')
mongoose.connect(process.env.MONGODB_URI).then('mongoose connected')

startStandaloneServer(server, {
  cors: true,
  listen: { port: 4000 },
  context: async ({req, res, next}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

