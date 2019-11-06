import Sequelize from 'sequelize';

const seq = new Sequelize('postgres://ihivgppk:ksSTLbCKftrLmg08sqk6rwNt8nZdoHQR@salt.db.elephantsql.com:5432/ihivgppk');

const ps = {
    sequelize: seq,
    Book: seq.import('./models/book'),
}

// Object.keys(ps).forEach((modelName) => {
//     if ('associate' in ps[modelName]) {
//       console.log(ps[modelName].associate(ps));
//     }
//   });

export default ps;