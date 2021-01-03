const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const user = 'norbert';
const password = '***';

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${user}:${password}@clusternknodecompletete.jemcj.mongodb.net/ClusterNkNodeCompleteTemplate?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('connected to db');
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
