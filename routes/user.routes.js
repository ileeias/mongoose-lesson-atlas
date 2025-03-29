import express from "express";
import UserController from "../controllers/user.controller.js";
import { createUserValidator } from "../validators/models.validator.js";

const router = express.Router();
router.post("/", createUserValidator, UserController.create);
router.patch("/:id", createUserValidator, UserController.update);
router.delete("/:id", UserController.delete);

export default router;