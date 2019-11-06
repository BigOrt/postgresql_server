export default (sequelize, DataType) => {
  const Book = sequelize.define(
    "books",
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false
      },
      title: {
        type: DataType.STRING
      },
      author: {
        type: DataType.STRING
      },
      datepublish: {
        type: DataType.STRING
      }
    },
    {
      timestamps: true
    }
  );

  return Book;
};
