const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = () => {
  mongoose.connect(`${process.env.CONNECTION_STRING}`);
};

module.exports = connectToDatabase;
