import {GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLString} from 'graphql';

import {Pokemon} from './pokemon';
import {PokemonType, UserType} from './schemaTypes';
import {db} from './mongoService';

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      pokemon: {
        type: new GraphQLList(PokemonType),
        resolve: () => Pokemon
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: (root) => {
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');
              collection.find().toArray((err, docs) => {
                if (err) {
                  reject(err);
                }
                db.close();
                resolve(docs);
              });
            });
          });
        }
      },
      user: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {name}) => {
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');
              collection.find({name}).toArray((err, docs) => {
                if (err) {
                  reject(err);
                }
                db.close();
                resolve(docs.length
                  ? docs[0]
                  : null);
              });
            });
          });
        }
      }
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      upsertUser: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {name}) => {
          let toCreate = {
            name,
            caught: [],
            created: new Date().valueOf(),
            friends: []
          };
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');

              // see if the user already exists
              collection.find({name}).toArray((err, docs) => {
                if (err) {
                  db.close();
                  return reject(err);
                }

                if (docs.length) {
                  db.close();
                  return resolve(docs[0]);
                }

                // insert the user if they do not exist
                collection.insert(toCreate, (err, result) => {
                  db.close();
                  if (err) return reject(err);
                  resolve(toCreate);
                });
              });
            });
          });
        }
      },
      addFriend: {
        type: UserType,
        args: {
          user: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          },
          friend: {
            description: 'The name of the friend',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {user, friend}) => {
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');

              collection.find({
                name: {
                  $in: [user, friend]
                }
              }).toArray((err, docs) => {
                if (err || !docs.length) {
                  db.close();
                  return reject(err || 'The user was not found');
                }

                let [u, f] = () => {
                  if (docs[0].name === user) return [docs[0], docs[1]];
                  return [docs[1], docs[0]];
                };

                if (!u) {
                  db.close();
                  return reject(err || 'The user was not found');
                }

                if (!f) {
                  db.close();
                  return reject(err || 'The friend was not found');
                }

                let friends = u.friends;
                friends.push(f);

                collection.update({
                  name: u.name
                }, {
                  $set: {
                    friends: friends
                  }
                }, (err, result) => {
                  if (err) {
                    db.close();
                    return reject(err);
                  }
                  resolve(u);
                });
              });
            });
          });
        }
      },
      caughtPokemon: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          },
          pokemon: {
            description: 'The name of the Pokemon that was caught',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {name, pokemon}) => {
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');
              // find the user
              collection.find({name}).toArray((err, docs) => {
                if (err || !docs.length) {
                  db.close();
                  return reject(err || 'The user was not found');
                }

                let caught = docs[0].caught;
                const p = Pokemon.find(p => p.name === pokemon);
                if (p) caught.push(p);
                // update the user with updated caught array
                collection.update({
                  name
                }, {
                  $set: {
                    caught
                  }
                }, (err, result) => {
                  if (err) {
                    db.close();
                    return reject(err);
                  }

                  resolve({name: docs[0].name, created: docs[0].created, caught});
                });
              });
            });
          });
        }
      },
      losePokemon: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          },
          pokemon: {
            description: 'The name of the Pokemon that got lose',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {name, pokemon}) => {
          return db().then(db => {
            return new Promise((resolve, reject) => {
              let collection = db.collection('users');
              // find the user
              collection.find({name}).toArray((err, docs) => {
                if (err || !docs.length) {
                  db.close();
                  return reject(err || 'The user was not found');
                }
                let caught = docs[0].caught;
                caught = caught.filter(p => p.name !== pokemon);
                // update the user with updated caught array
                collection.update({
                  name
                }, {
                  $set: {
                    caught
                  }
                }, (err, result) => {
                  if (err) {
                    db.close();
                    return reject(err);
                  }
                  resolve({name: docs[0].name, created: docs[0].created, caught});
                });
              });
            });
          });
        }
      }
    }
  })
});

export default schema;
