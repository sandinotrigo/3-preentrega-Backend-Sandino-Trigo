import express from 'express';
import ProductManager from '../src/productsManager';

const productRouter = express.Router();
const productManager = new ProductManager();

productRouter.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.json(products);
});

productRouter.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await productManager.getProductsbyId(productId);
  res.json(product);
});

productRouter.post('/', async (req, res) => {
  const product = req.body;
  await productManager.addProduct(
    product.title,
    product.description,
    product.price,
    product.thumbnail,
    product.code,
    product.stock
  );
  res.json({ status: 'success', message: 'Se agregó el producto correctamente' });
});

productRouter.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const fields = req.body;

  await productManager.updateProduct(productId, fields);
  res.json({ status: 'success', message: 'Se actualizó el producto' });
});

productRouter.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  await productManager.deleteProduct(productId);
  res.json({ status: 'success', message: 'Se borró el producto' });
});

export default productRouter;
