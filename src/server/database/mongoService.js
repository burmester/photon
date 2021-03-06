import {MongoClient} from 'mongodb';

const isProduction = process.env.NODE_ENV === 'production';
const MONGODB_URL = isProduction && process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost:27017/pokedex';

export const db = cb => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGODB_URL, (err, db) => {
      if (err) {
        console.log('Could not connect to database, have you started it?', err);
        return reject(err);
      }
      return resolve(db);
    });
  });
};
