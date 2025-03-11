import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCart,
  getCartItems,
  updateCart,
  deleteItems,
} from "../controllers/cart.controllers.js";

const routes = Router();

routes.post("/create", auth, addToCart);
routes.get("/get", auth, getCartItems);
routes.put("/update-qty", auth, updateCart);
routes.delete("/delete-cart-item", auth, deleteItems);

export default routes;
