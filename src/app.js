import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import viewsRouter from "./routes/views.js";
import { Server } from "socket.io";
import fs from "fs";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log("Server running on port:", PORT));

const socketServer = new Server(httpServer);
app.use(express.static("public"))
app.use("/",viewsRouter);
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname,"./views");
app.set("view engine","handlebars");
app.use(express.static(__dirname,"./public"))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);


server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});
