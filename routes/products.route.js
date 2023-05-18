import { Router } from "express";
import ProductManager from "../productsManager.js";

const productRouter = Router();
const productManager = new ProductManager();

productRouter.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.send(products);
});

productRouter.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productManager.getProductsbyId(id);
  res.send(product);
});

productRouter.post('/', async (req, res) => {
  const producto = req.body;
  await productManager.addProduct(
    producto.title,
    producto.description,
    producto.price,
    producto.thumbnail,
    producto.code,
    producto.stock
  );
  res.send({ status: 'success', msg: 'Se agregó el producto correctamente' });
});

export default productRouter;