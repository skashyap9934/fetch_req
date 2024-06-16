const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/database");
const userRouter = require("./routers/user.router");
const productsRouter = require("./routers/products.router");
const { wishlistsRouter } = require("./routers/wishlist.router");
const bagsRouter = require("./routers/bags.router");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://walmart-clone-frontend.vercel.app/",
  })
);
app.use("/user", userRouter);
app.use("/products", productsRouter);
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
