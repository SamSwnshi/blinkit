import {Router} from "express";
import auth from '../middleware/auth.js';
import {addCategory } from "../controllers/category.controllers.js"

const router = Router();

router.post("/add-category",auth,addCategory)

export default router;