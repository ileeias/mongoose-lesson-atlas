import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProduct);
router.post("/", ProductController.create);
router.patch("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;