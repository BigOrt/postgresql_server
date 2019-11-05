import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    Book(id: ID!): Book!
    Books: [Book!]!
  }

  extend type Mutation {
    addBook(title: String!, author: String!, datepublish: String! ):Book
    updateBook(id: ID!, title: String!, author: String!, datepublish: String!):Book
    deleteBook(id: ID!):Boolean
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    datepublish: String!
    createdAt: String!
    updatedAt: String!
  }
`