const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const collection = mongoose.connection.collection("products");
  const products = await collection.find({}).limit(10).toArray();

  res.status(200).json({ products: products });
});

app.get("/", () => {
  res.json({ message: "Homepage" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is UP and Running");

  mongoose.connect(
    "mongodb+srv://kashyapsauravgolu:walmart-data-access@cluster0.4nkoeq1.mongodb.net/walmart?retryWrites=true&w=majority&appName=Cluster0"
  );

  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });

  mongoose.connection.on("error", () => {
    console.log("Internal Server Error");
  });
});
