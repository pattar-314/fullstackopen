const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];



/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `

  type Book {
    title: String!
    published: Int
    author: String!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCountHard: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(    
      title: String!
      published: Int
      author: String!
      id: ID
      genres: [String]
      ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCountHard: () => {
      let authorList = [];
      books.map((b) =>
        authorList.includes(b.author)
          ? null
          : (authorList = authorList.concat(b.author))
      );
      return authorList.length;
    },
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let toReturn = books
      if(args.author){
        return toReturn.filter(b => b.author === args.author)
      } 
      if (args.genre){
        return toReturn.filter(b => b.genres.includes(args.genre))
      }
      return toReturn
    },
    allAuthors: () => {
      const authorTemp = authors.map(a => {
        const updatedAuthor = {...a, bookCount: books.filter(b => b.author === a.name).length}
        return updatedAuthor
      })

      return new Set(authorTemp) 
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if(!authors.find(a => a.name === args.author)){
        authors = authors.concat({name: args.author, id: uuid()})
        console.log('authors: ', authors)
      } 
      if(books.find(b => b.title === args.title)){
        console.log('no duplicates allowed')
        return null
      } else {
        const newBook = {...args, id: uuid()}
        books = books.concat(newBook)
        return newBook
      }
    },
    editAuthor: (root, args) => {
      if(!authors.find(a => a.name === args.name)){
        return null
      }
      const authorToMod = authors.find(a => a.name === args.name)
      const moddedAuthor = {...authorToMod, born: args.born}
      authors = authors.map(a => a.name === args.name ? moddedAuthor : a)
      return moddedAuthor
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

