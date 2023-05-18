import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "products.json";
    this.codeaccumulator = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.codeaccumulator++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const products = await this.getProducts();

    const updatedProducts = [...products, newProduct];

    await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
  }

  async getProducts(limit = null) {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");

      let parsedProducts = JSON.parse(products);

      if (limit !== null) {
        parsedProducts = parsedProducts.slice(0, limit);
      }

      return parsedProducts;
    } catch (e) {
      return [];
    }
  }

  async getProductsbyId(id) {
    try {
      const products = await this.getProducts();
      const buscarId = products.find((product) => product.id === id);

      if (!buscarId) {
        throw Error("No se encontró el producto");
      }

      return buscarId;
    } catch (error) {
      console.log("Error al buscar producto por ID", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log("El producto fue eliminado correctamente");
      }
    } catch (error) {
      console.log("Error al eliminar el producto con el ID ingresado", error);
    }
  }

  async updateProduct(id, fields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...fields };
        products.splice(productIndex, 1, updatedProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log("El producto se actualizó correctamente");
      }
    } catch (err) {
      console.log("No se pudo actualizar el producto", err);
    }
  }
}

export default ProductManager;

