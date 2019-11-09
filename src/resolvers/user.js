import cryptorjs from "cryptorjs";
import { CRYPTOJS } from "../config";
import * as Auth from "../auth";
import { AuthenticationError } from "apollo-server-express";

const myCryptor = new cryptorjs(CRYPTOJS, "camellia-256-cbc");

export default {
  Query: {
    Users: async (__, _args, { ps, req }) => {
      //auth
      Auth.checkSignIn(req);
      return await ps.User.findAll();
    },
    me: async (__, _args, { ps, req }) => {
      Auth.checkSignIn(req);
      console.log(req.session.userId);
      return await ps.User.findOne({ where: { userId: req.session.userId } });
    }
  },
  Mutation: {
    newUser: async (__, { name, password }, { ps, req }) => {
      //need to validate

      //authentication
      Auth.checkSignOut(req);
      
      const encoded = myCryptor.encode(password);

      const user = await ps.User.findOrCreate({
        where: { name: name },
        defaults: { password: encoded }
      }).then(([user, created]) => {
        console.log(
          user.get({
            plain: true
          })
        );
        console.log("created = ", created);
        return user.get();
      });

      return user;
    },
    logIn: async (__, { name, password }, { ps, req }) => {
      Auth.checkSignOut(req);

      const user = await ps.User.findOne({ where: { name: name } });
      const mssg = "name or password incorrect !";
      if (!user) {
        throw new AuthenticationError(mssg);
      }

      const decode = myCryptor.decode(user.password) === password;
      if (!decode) {
        throw new AuthenticationError(mssg);
      }

      req.session.userId = user.userId;

      return user;
    },
    logOut: (__, _args, { req, res }) => {
      return req.session.userId ? Auth.logOut(req, res) : false;
    }
  }
};
