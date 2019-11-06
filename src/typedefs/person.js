import { gql } from 'apollo-server-express'

export default gql`
    type Person {
        personId: ID!
        name: String!,
        address: String!,
        phone: String!,
    }
`