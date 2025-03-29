import express from "express";
import OrderController from "../controllers/order.controller.js";
import { createOrderValidator } from "../validators/models.validator.js";

const router = express.Router();

router.post("/", createOrderValidator, OrderController.create);

export default router;