import { Router } from "express";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/cash-on-delivery",auth)
router.post("/checkout",auth)
router.post("/webhook",auth)
router.get("/order-list",auth)
export default router;