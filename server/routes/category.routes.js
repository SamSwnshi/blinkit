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
router.post("/get", getCategory);
router.post("/update", auth, updateCategory);
router.post("/delete", auth, deleteCategory);

export default router;
