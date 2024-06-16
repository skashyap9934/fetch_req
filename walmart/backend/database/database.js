// Modules
const mongoose = require("mongoose");
require("dotenv").config();

// Variables
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Function for getting connected to the database
function connectDatabase() {
  mongoose.connect(CONNECTION_STRING);

  // On getting connected
  mongoose.connection.on("connected", () => {
    console.log(`Database Connected`);
  });

  // On having error
  mongoose.connection.on("error", () => {
    console.log(`Internal Server Error`);
  });
}

module.exports = connectDatabase;
