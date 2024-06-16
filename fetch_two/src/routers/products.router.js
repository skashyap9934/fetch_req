const { Router } = require("express");
const mongoose = require("mongoose");
const url = require("url");

require("dotenv").config();

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const query = parsedURL.query;

  const { page, limit, order, category } = query;

  const categoryQuery = category
    ? { $exists: true, $eq: category }
    : { $exists: true, $ne: category };

  const collection = mongoose.connection.collection("products");
  const products = await collection
    .find({ category: categoryQuery })
    .skip(Number(page - 1) * Number(limit ?? 20))
    .limit(Number(limit ?? 20))
    .toArray();

  let sortedData = products;
  if (order) {
    if (order === "desc")
      sortedData = products.sort((a, b) => a.rating - b.rating);
    else sortedData = products.sort((a, b) => b.rating - a.rating);
  }

  const totalCount = await collection.countDocuments();

  return res.status(200).json({
    products: sortedData,
    totalCount,
    limit: Number(limit) || 20,
    page: Number(page) || 1,
  });
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const collection = mongoose.connection.collection("products");
  const product = await collection.find({ id: Number(id) }).toArray();

  res.status(200).json({ product: product });
});

module.exports = productsRouter;
