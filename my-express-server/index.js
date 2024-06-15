// Packages
const express = require("express");

// Variables
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Homepage",
  });
});

app.get("/products", (req, res) => {
  res.json({
    message: "Products page",
  });
});

// Server
app.listen(PORT, () => {
  console.log("Server is UP & Running");
});
