import express from "express";
import ProductController from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/models.validator.js";

const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProduct);
router.post("/", createProductValidator, ProductController.create);
router.patch("/:id", createProductValidator, ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;