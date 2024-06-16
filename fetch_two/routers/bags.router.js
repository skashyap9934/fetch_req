const { Router } = require("express");
const mongoose = require("mongoose");
const url = require("url");

const bagsRouter = Router();

bagsRouter.get("/", async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const query = parsedURL.query;

  const { email } = query;

  const collection = mongoose.connection.collection("bags");
  const bagsProducts = await collection.find({ email: email }).toArray();
  const totalCount = bagsProducts.length;

  let totalCost = 0;
  bagsProducts.forEach(
    (product) => (totalCost += Number(product.price) * product.quantity)
  );

  res.json({ products: bagsProducts, totalCount, totalCost });
});

bagsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = mongoose.connection.collection("bags");
  const product = await collection.findOne({ id: Number(id) });
  res.json({ message: product });
});

bagsRouter.post("/add", async (req, res) => {
  try {
    const collection = mongoose.connection.collection("bags");
    const product = await collection.insertOne(req.body);
    res.json({ message: product });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

bagsRouter.patch("/update/:id", async (req, res) => {
  const collection = mongoose.connection.collection("bags");
  const { id } = req.params;
  await collection.updateOne({ id: Number(id) }, { $set: req.body });
  res.json({ message: "Updated" });
});

bagsRouter.delete("/delete", async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const query = parsedURL.query;

  const { email } = query;

  const collection = mongoose.connection.collection("bags");
  const bagProducts = await collection.deleteMany({ email: email });

  res.json({ message: "Products removed from bag." });
});

bagsRouter.delete("/delete/item/:id", async (req, res) => {
  const { id } = req.params;
  const collection = mongoose.connection.collection("bags");
  if (id) {
    await collection.deleteOne({ id: Number(id) });
    return res.json({ message: `Item with ID: ${id} deleted` });
  }

  return res.json({ message: `Invalid Item ID` });
});

module.exports = bagsRouter;
