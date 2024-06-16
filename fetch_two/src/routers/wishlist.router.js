const { Router } = require("express");
const mongoose = require("mongoose");
const url = require("url");

const wishlistsRouter = Router();

wishlistsRouter.get("/", async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const query = parsedURL.query;
  const { email } = query;
  const collection = mongoose.connection.collection("wishlists");
  const wishlistProducts = await collection.find({ email: email }).toArray();
  const totalCount = wishlistProducts.length;
  res.json({ products: wishlistProducts, totalCount });
});

wishlistsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = mongoose.connection.collection("wishlists");
  const product = await collection.findOne({ id: Number(id) });
  console.log("Prod", product);
  res.json({ message: product });
});

wishlistsRouter.post("/add", async (req, res) => {
  try {
    const collection = mongoose.connection.collection("wishlists");
    const product = await collection.insertOne(req.body);
    res.json({ message: product });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

wishlistsRouter.delete("/delete/item/:id", async (req, res) => {
  const { id } = req.params;
  const collection = mongoose.connection.collection("wishlists");
  if (id) {
    await collection.deleteOne({ id: Number(id) });
    return res.json({ message: `Item with ID: ${id} deleted` });
  }

  return res.json({ message: `Invalid Item ID` });
});

module.exports = { wishlistsRouter };
