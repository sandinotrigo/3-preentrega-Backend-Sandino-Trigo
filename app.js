import express from "express";
import productRouter from "./routes/products.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRouter);

const PORT = 8080;
const server = app.listen(PORT, () => console.log('Server running on port:', PORT));

server.on('error', (error) => {
  console.error(`Server error: ${error}`);
});