import express from "express";
import CategoryController from "../controllers/category.controller.js";
import { createCategoryValidator } from "../validators/models.validator.js";

const router = express.Router();

router.post("/", createCategoryValidator, CategoryController.create);

export default router;