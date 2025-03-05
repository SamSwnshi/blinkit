import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controllers.js";

const router = Router();

router.post("/add-category", auth, addCategory);
router.get("/get", getCategory);
router.put("/update", auth, updateCategory);
router.delete("/delete", auth, deleteCategory);

export default router;
