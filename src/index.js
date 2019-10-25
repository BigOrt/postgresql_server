import { ApolloServer } from "apollo-server-express"
import express from "express"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

try {
  const app = express()
  const APP_PORT = 3000

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
  });
  server.applyMiddleware({ app })
  app.listen({ port: APP_PORT }, () =>
    console.log(
      `Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
    )
  );
} catch (e) {
  console.error(e)
}
