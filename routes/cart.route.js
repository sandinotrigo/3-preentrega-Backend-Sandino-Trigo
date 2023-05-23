import express from "express";
import CartManager from "../cartsManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager();

cartRouter.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

cartRouter.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartManager.getCartById(cartId);
  res.json(cart.products);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;

  const productId = req.params.pid;

  await cartManager.addProductToCart(cartId, productId);

  res.json({ status: "success", message: "se agrego el producto correctamente" });
});

export default cartRouter;
