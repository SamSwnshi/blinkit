import { Router } from "express";
import auth from "../middleware/auth.js";
import { cashOnDelivery, payment,getOrderDetails } from "../controllers/order.controllers.js";

const router = Router();

router.post("/cash-on-delivery",auth,cashOnDelivery)
router.post("/checkout",auth,payment)
router.post("/webhook",auth)
router.get("/order-list",auth,getOrderDetails)
export default router;