import Sequelize from 'sequelize';
import seqConn from '../conn';

const Book = seqConn.define(
  'books',
  {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    datepublish: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: true
  }
);

export default Book;