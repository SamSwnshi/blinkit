import { Router } from "express";
import {
  addSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
} from "../controllers/subCategory.controllers.js";

import auth from "../middleware/auth.js"

const router = Router();

router.post("/add-subcategory",auth, addSubCategory);
router.get("/get", getSubCategory);
router.put("/update",auth, updateSubCategory);
router.delete("/delete",auth, deleteSubCategory);

export default router;
