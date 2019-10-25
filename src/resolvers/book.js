export default {
  Query: {
    Books: () => "Books all",
    Book: (__, { id } ) => "Book based by id "+id,
  },
  Mutation: {}
};
