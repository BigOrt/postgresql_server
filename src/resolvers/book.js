export default {
  Query: {
    Books: async (__, _args, { ps }, _info) => {
      return await ps.Book.findAll().then(project =>
        project.map(({ dataValues }) => dataValues)
      );
    },
    Book: async (__, { bookId }, { ps }, _info) => {
      return await ps.Book.findOne({ where: { bookId: bookId } }).then(
        ({ dataValues }) => dataValues
      );
    }
  },
  Mutation: {
    addBook: async (__, args, { ps }) => {
      return await ps.Book.findOrCreate({
        where: { author: args.author },
        defaults: { title: args.title, datepublish: args.datepublish }
      }).then(([book, created]) => {
        console.log(
          book.get({
            plain: true
          })
        );
        console.log("created = ", created);
        return book.get();
      });
    },
    updateBook: async (__, args, { ps }) => {
      return await ps.Book.update(
        {
          title: args.title,
          author: args.author,
          datepublish: args.datepublish
        },
        { where: { id: args.id } }
      ).then(([project]) =>
        project === 1
          ? ps.Book.findOne({ where: { id: args.id } }).then(
              ({ dataValues }) => dataValues
            )
          : {}
      );
    },
    deleteBook: (__, { bookId }, { ps }) => {
      return ps.Book.destroy({ where: { bookId: bookId } }).then(project =>
        project === 1 ? true : false
      );
    }
  }
};
