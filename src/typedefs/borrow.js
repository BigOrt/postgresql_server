import { gql } from 'apollo-server-express'

export default gql`
    type Borrow {
        borrowId: ID!
        person: [Person!]!,
        book: [Book!]!
        takenDate: String!,
        broughtDate: String!
    }
`