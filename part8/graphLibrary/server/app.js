const { ApolloServer, gql } = require("@apollo/server");
const { v1: uuid } = require("uuid");
const Book = require("./schemas/Book");
const Author = require("./schemas/Author");
const { GraphQLError } = require("graphql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require("./schemas/User");
require('dotenv').config()

/*
let authors = [
  {
    name: "Robert Martin",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
  },
  {
    name: "Sandi Metz", // birthyear not known
  },
];

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


/*
let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

  you can remove the placeholder query once your first one has been implemented 


const updateAuthor = async (a, u) => {
  let authorRequest = await Author.findOne({ name: a.name });
  if (!authorRequest) {
    console.log("no author found: ", a.name);
    let newAuthor = new Author({ ...a, ...u });
    console.log("new author test: ", newAuthor);
    return console.log(
      "create author created author: ",
      await newAuthor.save()
    );
  }
  const updatedAuthor = { ...a, ...u };
  return console.log("updated author: ", await updatedAuthor.save());
};



const createBook = async (b) => {
  const bookRequest = await Book.findOne({ title: b.title });
  console.log("book request: ", bookRequest);
  if (!bookRequest) {
    const newBook = new Book({ ...b });
    console.log("create book created book: ", newBook);

    let authorRequest = await Author.findOne({ name: b.author });
    console.log("author name: ", authorRequest);

    if (!authorRequest) {
      console.log(
        "createBooks updated author: ",
        await updateAuthor({ name: b.author }, { books: [newBook.id] })
      );

      return console.log("saved book", await newBook.save());
    }

    console.log("author request: ", authorRequest);
    authorRequest.books = authorRequest.books.push(newBook.id);
    await authorRequest.save();
    console.log("updated book 2: ", await newBook.save());
  } 
  
};

const populate = () => {
  const populatedBooks = books.forEach((b) => {
    createBook(b);
  });
};

// populate()

// Book.deleteMany()
// 
// 
// 
 */

const typeDefs = `

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
    books: [String]
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }


  type Query {
    me: User
    book: Book!
    author: Author!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(    
      title: String!
      published: Int
      author: String!
      genres: [String]
      ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
`;

const resolvers = {
  Query: {
    me: async (root, args, context) => context.currentUser,
    bookCount: async () => {
      console.log("counting books");
      const bookQuantity = await Book.collection.countDocuments();
      console.log("book count: ", bookQuantity);
      return bookQuantity;
    },
    book: async (root, args) => {
      let bookRes = await Book.findOne({ title: args.title });
      let authorReq = await Author.findById(bookRes.id);
      return { ...bookRes, author: authorReq };
    },
    author: async (root, args) => {
      let authorReq = await Author.findOne({name: args.name})
      console.log('author response: ', authorReq)
      return authorReq
    },
    authorCount: async () => {
      const countReq = await Author.collection.countDocuments()
      console.log('author count:', countReq)
      return countReq
    },
    allBooks: async (root, args) => {
      console.log('args: ', args)
      if(args.author){
        const foundAuthor = await Author.findOne({name: args.author})
        console.log('found author: ', foundAuthor)
        const foundBooks = await Book.find({author: foundAuthor.id}).populate('author')
        console.log('found books: ', foundBooks)
        return foundBooks
      } else if(args.genre){
        const foundBooks = await Book.find({genres: [args.genre]}).populate('author')
        console.log('found books: ', foundBooks)
        return foundBooks
      } else {
        const foundBooks = await Book.find({}).populate('author')
        console.log('found books: ', foundBooks)
        return foundBooks;
      }
      
    },
    allAuthors: async () => {
      const authorReq = await Author.find({})
      console.log('author req: ', authorReq)
      return authorReq
  },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new Error('must be logged in to add book')
      }
      let authorExists = await Author.findOne({ name: args.author });
      let bookExists = await Book.findOne({title: args.title})
      if(bookExists){
        throw new GraphQLError('book already exists', {
          extensions: {
            code: 'BOOK_MUST_BE_UNIQUE',
            invalidArgs: ['title']
          }
        })
        
      }

      console.log("author exists?: ", authorExists);

      if (authorExists) {
        console.log("found author");
        const newBook = await new Book({ ...args, author: authorExists._id });
        authorExists.books.push(newBook._id);
        console.log("updated author: ", authorExists);
        console.log("updated book:", newBook);
        await authorExists.save();
        await newBook.save();
        return newBook.populate('author')
      } else {
        let newBook = new Book({ ...args})
        let newAuthor = new Author({ name: args.author, books: [newBook._id] });
        newBook.author = newAuthor._id
        console.log("author not found")
        console.log("newbook: ", newBook)
        console.log('newAuthor: ', newAuthor)
        await newAuthor.save();
        await newBook.save();
        return await newBook.populate('author')
      }
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new Error('must be logged in to edit author')
      }
      console.log('args: ', args)
      let authorToMod = await Author.findOne({ name: args.name }).catch(
        (error) => console.log("error updating author: ", error)
      );
      console.log('authorPre: ', authorToMod)
      authorToMod.born = Number(args.setBornTo)
      console.log('modAuthor: ', authorToMod)
      
      return await authorToMod.save();
    },
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash
      })
      console.log('new user: ', newUser)
      try {
        return await newUser.save()
      } catch(error){
        throw new GraphQLError('user saving failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const loginUser = await User.findOne({username: args.username})
      const isVerified = await bcrypt.compare( args.password, loginUser.passwordHash )
      if(isVerified){
        const token = jwt.sign(loginUser.toJSON(), process.env.JWT_SECRET)
        return {userInfo: {username: loginUser.username, favoriteGenre: loginUser.favoriteGenre}, value: token}
      } else {
        console.log('verification failed: ', isVerified)
        throw new GraphQLError('login failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [...args]
          }
        })
      }
    }
  },
  Author: {
    bookCount: (root, args) => {
      return root.books.length
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = { server };
