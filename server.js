// Step 1: Import required packages
const express = require("express");
const fs = require("fs");

// Step 2: Create express app
const app = express();

// Step 3: Define port number
const PORT = 3000;

// Step 4: Middleware to read JSON body
app.use(express.json());

// Step 5: GET API - fetch all products
app.get("/getProducts", (req, res) => {
  const data = fs.readFileSync("products.json", "utf-8");
  const products = JSON.parse(data);
  res.json(products);
});

// Step 6: POST API - add new product
app.post("/addProduct", (req, res) => {
  const newProduct = req.body;

  const data = fs.readFileSync("products.json", "utf-8");
  const products = JSON.parse(data);

  products.push(newProduct);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Product added successfully" });
});

// Step 7: DELETE API - delete product by ID
app.delete("/deleteProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = fs.readFileSync("products.json", "utf-8");
  let products = JSON.parse(data);

  products = products.filter(p => p.productId !== id);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Product deleted successfully" });
});

// Step 8: UPDATE API - update description
app.put("/updateProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = fs.readFileSync("products.json", "utf-8");
  const products = JSON.parse(data);

  const product = products.find(p => p.productId === id);

  if (product) {
    product.description =
      "Preferred by Both Vegetarians and Non Vegetarians";

    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Step 9: Start the server
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
