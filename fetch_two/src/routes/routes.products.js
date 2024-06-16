const { Router } = require("express");

const ProductsRouter = Router();

ProductsRouter.get("/", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Smartphone", price: 800 },
    { id: 3, name: "Headphones", price: 150 },
  ];

  res.json({
    products: products,
  });
});

module.exports = ProductsRouter;
