import { gql } from '@apollo/client'


export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $published: Int, $genres: [String]){
    addBook(title: $title, author: $author, published: $published, genres: $genres){
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const EDIT_AUTHOR_BIRTH = gql`
  mutation changeBorn($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo){
      name
      born
      bookCount
      id
    }
  }
`
