import { Book } from "../models";

export default {
  Query: {
    Books: async () => {
      return await Book.findAll().then(project =>
        project.map(({ dataValues }) => dataValues)
      );
    },
    Book: async (__, { id }) => {
      return await Book.findOne({ where: { id: id } }).then(
        ({ dataValues }) => dataValues
      );
    }
  },
  Mutation: {
    addBook: async (__, args) => {
      return await Book.findOrCreate({
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
    updateBook: async (__, args) => {
      return await Book.update(
        {
          title: args.title,
          author: args.author,
          datepublish: args.datepublish
        },
        { where: { id: args.id } }
      ).then(([project]) =>
        project === 1
          ? Book.findOne({ where: { id: args.id } }).then(
              ({ dataValues }) => dataValues
            )
          : {}
      );
    },
    deleteBook: (__, args) => {
      return Book.destroy({ where: { id: args.id } }).then(project =>
        project === 1 ? true : false
      );
    }
  }
};
