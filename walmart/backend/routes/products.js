// Modules
const { Router } = require("express");
const mongoose = require("mongoose");

// Variables
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const collection = mongoose.connection.collection("products");
  const products = await collection.find().limit(11).toArray();

  res.json({ products });
});

module.exports = productsRouter;
