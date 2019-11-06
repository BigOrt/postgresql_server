import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import ps from "./conn";

const startServer = async () => {
  try {
    ps.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });

    // ps.sequelize.sync().then(() => console.log("sync.. success !"));

    const app = express();

    const APP_PORT = 4000;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
      context: { ps }
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.error(e);
  }
};

startServer();
