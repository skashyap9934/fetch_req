const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/database");
const userRouter = require("./routers/user.router");
const productsRouter = require("./routers/products.router");
const { wishlistsRouter } = require("./routers/wishlist.router");
const bagsRouter = require("./routers/bags.router");
require("dotenv").config();

const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://walmart-clone-frontend.vercel.app/",
    methods: ["GET", "POST", "DELETE"],
  })
);

const temp = express.Router();

temp.get("/", async (req, res) => {
  const collection = mongoose.connection.collection("products");
  const products = await collection.find().limit(11).toArray();
  res.json({ products: products });
});

app.use("/user", userRouter);
app.use("/products", temp);
app.use("/wishlist", wishlistsRouter);
app.use("/bag", bagsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to HomePage" });
});

app.listen(PORT, () => {
  console.log(`Server is UP & Running at PORT ${PORT}`);
  connectToDatabase();
  console.log(`Connected to the database successfully`);
});
