const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { default: mongoose } = require('mongoose');
const { v1: uuid } = require('uuid');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

console.log('connecting to mongodb');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log('mongoose server connected'))
  .catch('there was an error connecting to mongoose');

mongoose.set('strictQuery', false);
const Person = require('./services/schemas/Person');
const User = require('./services/schemas/User');

/* let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]; */

const typeDefs = `

enum YesNo {
  YES
  NO
}
  
type Address {
  street: String!
  city: String!
  }


  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
    name: String!
    phone: String!
    ): Person
    createUser(
      username: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(name: String!): User

  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' } });
    },
    findPerson: async (root, args) => {
      console.log('attempting to find person: ', args);
      return Person.findOne({ name: args.name });
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const newPerson = new Person({ ...args });
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',

          }
        })
      }
      try {
        await newPerson.save();
        currentUser.friends = currentUser.friends.concat(newPerson)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invaildArgs: args.name,
            error,
          },
        });
      }
      return newPerson;
    },
    editNumber: async (root, args) => {
      let person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invaildArgs: aggs.name,
            error,
          },
        });
      }
      return person;
    },
    createUser: async (root, args) => {
      if(!args.username || !args.password){
        throw new GraphQLError('username and password required', {
          extensions: {
            code: 'MISSING_USER_INPUT'
          }
        })
      }

      const encryptedPassword = await bcrypt.hash(args.password, 10)
      console.log('encryptedPassword: ', encryptedPassword)

      const user = new User({ username: args.username, passwordHash: encryptedPassword });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invaildArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log('found user: ', user)

      const doesPasswordMatch = await bcrypt.compare(args.password, user.passwordHash)

      if (!user || !doesPasswordMatch) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

      if(!currentUser){
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const person = await Person.findOne({ name: args.name })

      if(!isFriend(person)){
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    console.log('auth: ', auth)
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      console.log('decoded token: ', decodedToken)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return {currentUser}
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
