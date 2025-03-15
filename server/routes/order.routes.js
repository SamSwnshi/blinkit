import { Router } from "express";
import auth from "../middleware/auth.js";
import { cashOnDelivery } from "../controllers/order.controllers.js";

const router = Router();

router.post("/cash-on-delivery",auth,cashOnDelivery)
router.post("/checkout",auth)
router.post("/webhook",auth)
router.get("/order-list",auth)
export default router;