const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// database variable (line 19)
let db;

// making the connection to the server
const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/studentrecord")
    .then((client) => {
      console.log("Connected to database");
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(`error:${err}`);
    });
};

// returning the database if it exists
const getDB = () => {
  if (db) {
    return db;
  }
  throw "no database found or made";
};

// exporting the function for connection and database access
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
