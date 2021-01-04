const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const user = 'norbert';
const password = '';
const dbName = 'ClusterNkNodeCompleteTemplate';

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${user}:${password}@clusternknodecompletete.jemcj.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('connected to db');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
