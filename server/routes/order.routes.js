import { Router } from "express";
import auth from "../middleware/auth.js";
import { cashOnDelivery, payment,getOrderDetails,webhook } from "../controllers/order.controllers.js";

const router = Router();

router.post("/cash-on-delivery",auth,cashOnDelivery)
router.post("/checkout",auth,payment)
router.post("/webhook",webhook)
router.get("/order-list",auth,getOrderDetails)
export default router;