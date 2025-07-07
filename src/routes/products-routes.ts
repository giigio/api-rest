import { Router } from "express";
import { Middleware } from "../middlewares/middleware";
import { ProductsController } from "../controllers/ProductsController";

const productsRoutes = Router();
const productsController = new ProductsController();

// This middleware will be executed for every request
productsRoutes.use(Middleware);

productsRoutes.get("/", productsController.index);

// Example of Local Middleware
//app.post("/", Middleware, (req, res)....

productsRoutes.post("/", productsController.create);

export { productsRoutes };
