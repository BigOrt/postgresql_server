export default {
  Query: {
    Borrows: async (__, _args, { ps }, _info) => {
      return await ps.Borrow.findAll();
    },
    selectPerson: async (__, args, { ps }) => {
      return await ps.Borrow.findAll({ where: { personId: args.personIds } });
    }
  },
  Mutation: {
    startBorrow: async (__, args, { ps }, _info) => {
      return await ps.Borrow.create({
        borrowId: args.borrowIds,
        personId: args.personIds,
        bookId: args.bookIds,
        takendate: args.takendate,
        broughtdate: args.broughtdate
      });
    }
  },
  Borrow: {
    persons: async ({ personId }, __, { personLoader }) => {
      return await personLoader.load(personId);
      // return await ps.Person.findAll({ where: { personId: personId } });
    },
    books: async ({ bookId }, __, { bookLoader }) => {
      return await bookLoader.load(bookId);
      // return await ps.Book.findAll({ where: { bookId: bookId } });
    }
  }
};
