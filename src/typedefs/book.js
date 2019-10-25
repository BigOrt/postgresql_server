import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    Book(id: ID!): String!
    Books: String!
  }

  extend type Mutation {
    addBook(title: String!, author: String!, datepublish: String! ):Book
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    datePublish: String!
    createdAt: String!
    updatedAt: String!
  }
`