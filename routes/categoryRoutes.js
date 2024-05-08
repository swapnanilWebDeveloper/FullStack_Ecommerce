import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  CreateCategoryController,
  categoryController,
  deleteCategoryController,
  singleCategoryByIdController,
  singleCategoryController,
  updateCateegoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCateegoryController
);

// get All categories
router.get("/get-category", categoryController);

// single category
router.get("/single-category/:slug", singleCategoryController);

// get single category by id
router.get("/single-categoryById/:id", singleCategoryByIdController);

// delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
