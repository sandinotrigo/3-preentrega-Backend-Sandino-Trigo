import express from "express";
import ProductManager from "./productsManager.js";

const app = express();
const server = app.listen(8080, () =>
  console.log("Server running on port: 8080")
);
app.use(express.urlencoded({extended:true}))
const productManager = new ProductManager(); 

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit); 
  const products = await productManager.getProducts(limit); 
  res.send(products); 
});

app.get("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id); 
  const product = await productManager.getProductsbyId(id);
  res.send(product);
});