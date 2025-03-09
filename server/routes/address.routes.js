import { Router } from "express";
import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controllers.js";
import auth from "../middleware/auth.js";

const routes = Router();

routes.post("/create",auth, addAddress);
routes.get("/get",auth, getAddress);
routes.put("/update",auth, updateAddress);
routes.delete("/delete",auth, deleteAddress);

export default routes;
