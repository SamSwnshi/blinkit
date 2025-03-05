import { Router } from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = Router();

router.post("/create", auth, admin, createProduct);
router.get("/get", getProduct);
router.post("/get-product-by-category", getProductCategory);
router.post("/get-product-by-category-and-subcategory", getProductCategorySub);
router.post("/get-product-details,", getProductDetails);

router.put("/update-product", auth, admin, getProductUpdate);
router.delete("/delete-product", auth, admin, getProductDelete);
router.post("/search-product", auth, admin, getProductSearch);

export default router;
