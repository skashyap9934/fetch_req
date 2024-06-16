// Modules
const express = require("express");
const connectDatabase = require("./database/database");
const productsRouter = require("./routes/products");
require("dotenv").config();

// Variables
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/products", productsRouter);

// For checking the production URL
app.get("/", (req, res) => {
  res.send(`<h3>Welcome to homepage</h3>`);
});

// Server
app.listen(PORT, () => {
  console.log(`Server is UP & Running at PORT ${PORT}`);
  connectDatabase();
});
