import {MongoClient} from 'mongodb';
import Q from 'q';

const MONGODB_URL = 'mongodb://localhost:27017/pokedex';

export const db = cb => {
  let deferred = Q.defer();
  MongoClient.connect(MONGODB_URL, (err, db) => {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve(db);
  });
  return deferred.promise;
};
