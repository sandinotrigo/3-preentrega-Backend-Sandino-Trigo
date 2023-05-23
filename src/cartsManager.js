import fs from "fs";

class CartManager {
  constructor() {
    this.path = "../carts.json"
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      const cartId = this.generateUniqueId();
      const newCart = {
        id: cartId,
        products: []
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cartId);
      if (!cart) {
        throw Error("No se encontró el carrito ");
      }
      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex === -1) {
        throw Error("No se encontró el cart");
      }
      const cart = carts[cartIndex];
      cart.products.push({ id: productId });
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  }

  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default CartManager;