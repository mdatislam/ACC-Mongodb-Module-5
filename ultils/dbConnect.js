const { MongoClient } =require("mongodb");
require("dotenv").config();
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect()
            .then((client => {
                dbConnection = client.db("Zakia");
                return callback();
                console.log("Successfully connected to MongoDB");
            })).catch((err) => {
                return callback(err);
                console.log(err);
        })
              
    },

    getDB: function () {
        return dbConnection;
    }
}

// 2nd Method to connect MongoDb
//require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;

// let dbConnection;

// module.exports = {
//   connectDB: function (callback) {
//     const url = process.env.DB;
//     MongoClient.connect(url)
//       .then((client) => {
//         dbConnection = client.db("Atiq");
//         return callback();
//       })
//       .catch((err) => {
//         console.log(err);
//         return callback(err);
//       });
//   },
//   getDB: function () {
//     return dbConnection;
//   },
// };