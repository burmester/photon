import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

const dbURI = 'mongodb://localhost:27017/photon';
const Weight = mongoose.model('Weight', new mongoose.Schema({date: Date, weight: Number}));

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

export default {
  create : (weight) => {
    return Weight.create({weight: weight, date: new Date()});
  },
  find : (conditions) => {
    return Weight.find(conditions);
  },
  remove : (conditions) => {
    return Weight.remove(conditions);
  }
}
