
const env = process.env.NODE_ENV || 'development';
const mongoUrl = require('../env/' + env).DB_URL;

const mongoClient = require('mongodb').MongoClient;

const db = {
  get users() {
    return users;
  },

  get calories() {
    return calories;
  }
}

let users, calories;

const dbReadyPromise = mongoClient.connect(mongoUrl)
  .then((database) => {
    users = database.collection('users');
    calories = database.collection('caloriesss');

    return db;
  })
  .catch(e => {throw e;});

module.exports = {
  dbReady: dbReadyPromise,
  db: db
};
