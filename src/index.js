import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import ps from "./models";
import Dataloader from "dataloader";
import { batchBooks, batchPersons } from "./dataloaders";

const startServer = async () => {
  try {
    await ps.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        // ps.sequelize.sync().then(() => console.log(" ==>  Sync models ... success !"));
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });

    const app = express();

    const APP_PORT = 4000;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
      context: {
        ps,
        bookLoader: new Dataloader(keys => batchBooks(keys, ps)),
        personLoader: new Dataloader(keys => batchPersons(keys, ps))
      }
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
