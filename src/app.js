import express from "express";
import productRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;
const server = app.listen(PORT, () => console.log("Server running on port:", PORT));

server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});
