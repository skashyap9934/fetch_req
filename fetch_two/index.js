// index.js
const express = require("express");
const ProductsRouter = require("./src/routes/routes.products");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// /products Endpoint
app.use("/products", ProductsRouter);

// /shopping Endpoint
app.post("/shopping", (req, res) => {
  const shoppingItem = req.body;
  // Normally, you would save this to a database
  res.json({ message: "Item added to shopping list", item: shoppingItem });
});

// /dashboard Endpoint
app.get("/dashboard", (req, res) => {
  const dashboardData = {
    user: "John Doe",
    stats: {
      totalOrders: 25,
      totalSpent: 5000,
      favoriteProduct: "Laptop",
    },
  };
  res.json(dashboardData);
});

// /wishlist Endpoint
app.get("/wishlist", (req, res) => {
  const wishlist = [
    { id: 1, name: "Gaming Console" },
    { id: 2, name: "Electric Guitar" },
    { id: 3, name: "4K TV" },
  ];
  res.json(wishlist);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
